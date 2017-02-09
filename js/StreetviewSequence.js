/*globals $, _, Power0, google, TweenLite, __scope__, jQuery */

(function(parentScope) {
    'use strict';

    var $ = jQuery;

    /**
     * Create a <code>StreetviewSequence</code> object.
     * @constructor
     * @param {string|jQuery} container The container to which the animation canvas will be appended.
     * @param {Object} options
     * @param {string} [options.domain] Scheme + host which to pass the query parameters. Useful when using a proxy to generate signed URLs for high resolution imagery.
     * @param {number} [options.duration=1] Duration of the animation.
     * @param {Ease} [options.easeHeading=Power0.easeIn] Greensock easing method used for heading skew.
     * @param {Ease} [options.easePitch=Power0.easeIn] Greensock easing method used for pitch skew.
     * @param {Ease} [options.easeRoute=Power0.easeIn] Greensock easing method used for route waypoint selection.
     * @param {number} [options.headingSkewEnd=options.headingSkewStart] Heading at which to end the animation (horizontal).
     * @param {number} [options.headingSkewStart=0] Heading at which to start the animation (horizontal).
     * @param {number} [options.height=150] (Intrinsic) height of the animation canvas in pixels.
     * @param {string} [options.key] Google API key.
     * @param {google.maps.LatLng} [options.location] Location at which to place the stationary panorama.
     * @param {boolean} [options.loop=false] Whether or not the animation should loop.
     * @param {number} [options.pitchSkewEnd=options.pitchSkewStart] Pitch at which to end the animation (vertical).
     * @param {number} [options.pitchSkewStart=0] Pitch at which to start the animation (vertical).
     * @param {google.maps.google.maps.DirectionsResult} [options.route] Maps directions result for route stepping.
     * @param {boolean} [options.sensor=false] Indicates whether or not the request came from a device using
     * a location sensor (e.g. a GPS) to determine the location sent in this request. This value must be either true or false.
     * @param {number} [options.totalFrames=75] Total number of frames to be used for animation.
     * @param {number} [options.width=300] (Intrinsic) height of the animation canvas in pixels.
     * @return {jQuery.Deferred.Promise}
     */
    parentScope.StreetviewSequence =  function (container, options) {
        var $canvas;
        var $container;
        var canvas;
        var ctx;
        var defaults = {
            duration: 1,
            easeHeading: Power0.easeIn,
            easePitch: Power0.easeIn,
            easeRoute: Power0.easeIn,
            headingSkewStart: 0,
            height: 150,
            loop: false,
            pitchSkewStart: 0,
            sensor: false,
            totalFrames: 75,
            width: 300
        };
        var headingCache = {};
        var images;
        var imagesLoadedCount;
        var publicMethods;
        var streetViewPanoramaDfd;
        var streetViewService;
        var tween;

        function _init() {
            _.defaults(options, defaults);
            $canvas = $('<canvas />');
            $container = (container instanceof jQuery) ? container : $(container);
            $container.append($canvas);
            canvas = $canvas.get(0);
            ctx = canvas.getContext('2d');
            images = [];
            imagesLoadedCount = 0;
            streetViewPanoramaDfd = $.Deferred();
            streetViewService = new google.maps.StreetViewService();

            canvas.height = options.height;
            canvas.width = options.width;

            if ('undefined' === typeof options.headingSkewEnd) {
                options.headingSkewEnd = options.headingSkewStart;
            }

            if ('undefined' === typeof options.pitchSkewEnd) {
                options.pitchSkewEnd = options.pitchSkewStart;
            }

            tween = TweenLite.to(
                { currentTime: 0 },
                options.duration / 1000,
                {
                    currentTime: options.duration,
                    onComplete: ended,
                    onReverseComplete: ended,
                    onUpdate: draw,
                    paused: true
                }
            );

            loadImages();
        }

        /**
         * Calculate the current value of an ease based on it's progress
         * given a start and end point.
         * @param {number} p Raw linear progress of ease
         * @param {Ease} ease Ease function used for completion ratio calculation
         * @param {number} start Starting eased value
         * @param {number} end Ending eased value
         * @return {number}
         */
        function calcScalar(p, ease, start, end) {
            var delta;

            delta = end - start;

            return start + delta * ease.getRatio(p);
        }

        /**
         * Draw the current frame onto the animation canvas. Current frame is derived
         * from the animation progress and the total amount of frames.
         */
        function draw() {
            var p = tween.progress();
            var idx = Math.round(p * (options.totalFrames - 1));
            images[idx].done(function (img) {
                ctx.drawImage(img, 0, 0);
            });
        }

        /**
         * If <code>options.loop</code> is set to false, trigger an <code>ended</code>
         * event. If true, the animation is then reversed, and thus, loops.
         */
        function ended() {
            if (!options.loop) {
                $canvas.trigger('ended');
                return;
            }

            if (tween.reversed()) {
                tween.restart();
            } else {
                tween.reverse();
            }
        }

        /**
         * As of Google Maps Javascript API V3 3.16, a literal lat/lng object and a <code>google.maps.LatLng</code> object
         * are accepted as location points. This facade makes this easier to manage.
         * @see https://developers.google.com/maps/documentation/javascript/3.exp/reference#LatLngLiteral
         * @param {Object|google.maps.LatLng} latLng google.maps.LatLng object or a literal lat/lng object.
         * @return {number}
         */
        function getLng(latLng) {
            return ('function' === typeof latLng.lng) ? latLng.lng() : latLng.lng;
        }

        /**
         * As of Google Maps Javascript API V3 3.16, a literal lat/lng object and a <code>google.maps.LatLng</code> object
         * are accepted as location points. This facade makes this easier to manage.
         * @see https://developers.google.com/maps/documentation/javascript/3.exp/reference#LatLngLiteral
         * @param {Object|google.maps.LatLng} latLng google.maps.LatLng object or a literal lat/lng object.
         * @return {number}
         */
        function getLat(latLng) {
            return ('function' === typeof latLng.lat) ? latLng.lat() : latLng.lat;
        }

        /**
         * For the given <code>options.location</code>, retrieve the necessary information to
         * build a Street View Image URL. Note that the only information used from the API request
         * is a <code>heading</code> that faces the street.
         * @return {jQuery.Deferred.Promise} Promise of a deferred object which eventually resolves with the necessary
         * information to generate a Street View Image API URL.
         */
        function getPanoramaData() {
            var key;

            key = options.location;
            if ('undefined' === typeof headingCache[key]) {
                headingCache[key] = getStreetHeading(options.location)
                    .then(function (heading) {
                        return {
                            location: options.location,
                            heading: heading,
                            pitch: 0
                        };
                    })
                ;
            }

            return headingCache[key];
        }

        /**
         * Retrieve the Street View Panorama information for a given point on the route based on the given
         * progress, <code>p</code>. From the Street View Panorama API response, we are given the original
         * panorama location, the proper heading (facing down the street), and the proper pitch (vertically centered).
         * @param {number} p Progress through the list of street view images.
         * @return {jQuery.Deferred.Promise} Promise of a deferred object which eventually resolves with the necessary
         * information to generate a Street View Image API URL.
         */
        function getRouteData(p) {
            var location;
            var locationDfd;
            var panoResponseHandler;
            var pathIndex;
            var path;

            path = options.route.routes[0].overview_path;

            locationDfd = $.Deferred();
            pathIndex = calcScalar(p, options.easeRoute, 0, path.length - 1);
            location = path[Math.round(pathIndex)];

            panoResponseHandler = function (result, status) {
                if (google.maps.StreetViewStatus.OK !== status) {
                    locationDfd.reject({
                        error: new Error('Unable to get location panorama'),
                        status: status
                    });
                    return;
                }
                locationDfd.resolve({
                    location: result.location.latLng,
                    heading: result.tiles.centerHeading,
                    pitch: result.tiles.originPitch
                });
            };

            streetViewService.getPanoramaByLocation(location, 50, panoResponseHandler);
            return locationDfd.promise();
        }

        /**
         * Get a street-facing heading for a given location accompanied with whether or not the location
         * is indoors.
         * @param {google.maps.LatLng} location
         * @return {jQuery.Deferred.Promise} Promise of a deferred object which eventually resolves with a heading and
         * a boolean value indicated whether or not the location is indoor.
         */
        function getStreetHeading(location) {
            var dfd = new $.Deferred();

            streetViewService.getPanoramaByLocation(location, 50, function (data, status) {
                if (google.maps.StreetViewStatus.OK !== status) {
                    dfd.reject({
                        error: new Error('StreetViewStatus is not OK'),
                        status: status
                    });
                    return;
                }

                if (0 === data.links.length) {
                    dfd.reject({
                        error: new Error('Nearby panorama not found')
                    });
                    return;
                }

                dfd.resolve(data.links[0].heading, '' === data.links[0].description);
            });

            return dfd.promise();
        }

        /**
         * Build a Street View Image API URL.
         * @param {object} options
         * @param {string} [options.domain=window.location.protocol + '//maps.googleapis.com'] Scheme + host which to pass the query parameters. Useful when using a proxy to generate signed URLs for high resolution imagery.
         * @param {number} options.height Image height in pixels.
         * @param {string} [options.key] Google Maps Javascript V3 API key.
         * @param {boolean} options.sensor Indicates whether or not the request came from a device using a location sensor (e.g. a GPS) to determine the location sent in this request. This value must be either true or false.
         * @param {number} options.width Image width in pixels.
         * @return {string} Street View Image API URL
         */
        function getStreetViewImageURL(options) {
            var PATH = '/maps/api/streetview';
            var domain;
            var parameters = {};
            var resource;

            domain = ('undefined' !== typeof options.domain) ? options.domain : window.location.protocol + '//maps.googleapis.com';

            if ('undefined' !== typeof options.key) {
                parameters.key = options.key;
            }
            parameters.sensor = options.sensor;
            parameters.size = options.width + 'x' + options.height;
            parameters.location = getLat(options.location) + ',' + getLng(options.location);
            if ('undefined' !== typeof options.heading) {
                parameters.heading = options.heading;
            }
            if ('undefined' !== typeof options.pitch) {
                parameters.pitch = options.pitch;
            }
            if ('undefined' !== typeof options.client) {
                parameters.client = options.client;
            }

            resource = domain + PATH + '?' + $.param(parameters);

            return resource;
        }

        /**
         * Increment the total count of loaded images, and notify the returned deferred
         * object of the total load progress. If the total loaded count is equal
         * to the total number of frames, the deferred object is resolved.
         * Every image used in the animation has its <code>onload</code>
         * event bound to this function.
         */
        function imageOnLoad() {
            imagesLoadedCount += 1;
            streetViewPanoramaDfd.notify(imagesLoadedCount / options.totalFrames);
            if (imagesLoadedCount === options.totalFrames) {
                streetViewPanoramaDfd.resolve(publicMethods);
            }
        }

        /**
         * Build the array of images used for animation.
         */
        function loadImages() {
            var i;
            var locationDataRetriever;
            var locationOnDataHandlerGenerator;
            var locationOnFailHandlerGenerator;
            var locationPromise;
            var p;

            locationOnDataHandlerGenerator = function (p) {
                return function (locationData) {
                    var currentLocationData = _.clone(locationData);
                    var image;

                    currentLocationData.heading += calcScalar(p, options.easeHeading, options.headingSkewStart, options.headingSkewEnd);
                    currentLocationData.pitch += calcScalar(p, options.easePitch, options.pitchSkewStart, options.pitchSkewEnd);
                    currentLocationData.sensor = options.sensor;
                    currentLocationData.key = options.key;
                    currentLocationData.height = options.height;
                    currentLocationData.width = options.width;
                    currentLocationData.client = options.client;
                    currentLocationData.domain = options.domain;

                    image = new Image();
                    image.onload = imageOnLoad;
                    image.src = getStreetViewImageURL(currentLocationData);
                    return image;
                };
            };

            locationOnFailHandlerGenerator = function () {
                return function () {
                    imageOnLoad();
                    return new Image();
                };
            };

            locationDataRetriever = ('undefined' === typeof options.route) ? getPanoramaData : getRouteData;

            for (i = 0; i < options.totalFrames; i += 1) {
                p = (i / (options.totalFrames - 1));
                locationPromise = locationDataRetriever(p)
                    .then(locationOnDataHandlerGenerator(p), locationOnFailHandlerGenerator(p))
                ;
                images.push(locationPromise);
            }
        }

        /**
         * Pause the animation.
         */
        function pause() {
            tween.pause();
        }

        /**
         * Play the animation.
         */
        function play() {
            tween.resume();
        }

        _init();

        //-- Expose:
        publicMethods = {
            getStreetHeading: getStreetHeading,
            getStreetViewImageURL: getStreetViewImageURL,
            pause: pause,
            play: play
        };

        return streetViewPanoramaDfd.promise();
    };
}('undefined' !== typeof __scope__ ? __scope__ : window));
