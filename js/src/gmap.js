var _xhr, _markers = new Array();
var map;
var json;

jQuery(window).resize(function() {
  setTimeout(function() {
    $marker = jQuery('.marker-details');
    if (!$marker.hasClass('zactive')) return;

    _centerDiv($marker);
  }, 300);
});

/*
 * This function show the marker to the desidered coordinates.
 * And also execute ajax call to show all the others visible ones...
 */
function initGMap(mapId, lat, lon, streetViewControl, maker, zoom) {
  //point = new google.maps.LatLng(51.52098748772112, -0.14747858047485352);
  if (mapId === undefined) mapId = "map";
  if (streetViewControl === undefined) streetViewControl = true;
  if (maker === undefined) maker = true;
  if (zoom === undefined) zoom = 15;
  latitude = lat;
  longitude = lon;

  point = new google.maps.LatLng(latitude, longitude);

  mapId = document.getElementById( mapId );
  var mapTypeId = mapId.dataset.tilt ? google.maps.MapTypeId.SATELLITE : google.maps.MapTypeId.ROADMAP;
  var mapTilt = mapId.dataset.tilt ? parseInt( mapId.dataset.tilt ) : 0;
  if( mapId.dataset.tilt ) zoom = 14;

  // console.log( latitude, longitude, mapTypeId, mapTilt );
  var mapOptions = {
    center: new google.maps.LatLng(latitude, longitude),
    zoom: zoom,
    mapTypeId: mapTypeId,
    tilt: mapTilt,
    panControlOptions: {
      position: google.maps.ControlPosition.LEFT_CENTER
    },
    mapTypeControl: true,
    zoomControlOptions: {
      style: google.maps.ZoomControlStyle.SMALL,
      position: google.maps.ControlPosition.LEFT_CENTER
    },
    mapTypeControlOptions: {
      style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
      position: google.maps.ControlPosition.LEFT_BOTTOM
    },
  };

  map = new google.maps.Map(mapId, mapOptions);
  map.objectDiv = mapId;

  //house marker
  var image = new google.maps.MarkerImage('/wp-content/themes/new_theme/img/gj-marker-double.png');

  if (maker) {
    var marker = new google.maps.Marker({
      position: point,
      map: map,
      animation: google.maps.Animation.DROP,
      icon: image
    });
  }

  var bni_style = [{
    featureType: "road.arterial",
    stylers: [{
      hue: "#a99959"
    }, {
      visibility: "on"
    }, {
      saturation: 0
    }]
  }, {
    featureType: "landscape.man_made",
    stylers: [{
      visibility: "on"
    }, {
      hue: "#342F1F"
    }, {
      saturation: 40
    }]
  }, {
    stylers: [{
      visibility: "on"
    }, {
      hue: "#a99959"
    }, {
      saturation: -65
    }, {
      lightness: -7
    }]
  }];

  map.setCenter(point);
  // map.setOptions({
  //   styles: bni_style
  // });

  google.maps.event.addListener(map, 'idle', function() {
    gmapShowMarkers(map);
  });

  google.maps.event.addListenerOnce(map, 'idle', function() {
    var map_gradient = document.createElement('div');
    map_gradient.setAttribute('id', 'map-gradient');

    jQuery('#map div').first().append(map_gradient);
    jQuery('.gmnoprint').css('z-index', '92');
  });
}

function gmapShowMarkers(map) {
  var bounds = map.getBounds();

  var ne = bounds.getNorthEast();
  var sw = bounds.getSouthWest();

  //Abort previous request
  if (_xhr) _xhr.abort();

  _xhr = jQuery.ajax({
    type: "post",
    url: ajaxData.ajaxurl,
    data: {
      action: ajaxData.action || 'get_gmap_markers',
      ne: [ne.lat(), ne.lng()],
      sw: [sw.lat(), sw.lng()],
      nonce: ajaxData.nonce,
      category: ajaxData.category,
      type: map.objectDiv.dataset.type || ajaxData.type,
      data: ajaxData.data,
      letter: ajaxData.letter,
      development: ajaxData.development || ''
    },
    error: function(xhr, error) {
      console.log(xhr, error);
    },
    success: function(response) {
      var $spinner = jQuery( '#spinner' );
      if( $spinner.length > 0 ) $spinner.removeClass( 'visible' );

      // var json;
      console.log( ne, sw, response );

      //Set all markers to be removed
      var existings = []; //new Array();
      for (i = 0; i < _markers.length; i++) {
        _markers[i].remove = 1;

        existings.push(_markers[i]._details.postID);
      }

      try {
        json = jQuery.parseJSON(response);

        for (i = 0; i < json.length; i++) {
          var point = json[i];

          //Check if the marker already exists
          var id = existings.indexOf(point.id);
          var marker;
          if (id < 0) {
            var image = new google.maps.MarkerImage(point.icon);

            marker = new google.maps.Marker({
              position: new google.maps.LatLng(point.lat, point.lng),
              map: map,
              animation: google.maps.Animation.DROP,
              optimized:false,
              icon: image
            });

            marker._details = {
              postID: point.id,
              title: point.title,
              thumbnail: point.image,
              content: point.content
            };

            //Infowindow
            var content = "";

            if( point.video === "" || point.video === undefined ) {
              content += '<img src="' + point.image + '" />';
              content += '<br />';
              if ( point.link != '' ) {
                content += '<a class="point-link" href="' + point.link + '" target="_blank">'
              }
              content += '<span>' + point.title + '</span>';
              if ( point.link != '' ) {
                content += '</a>';
              }
              content += '<br />';

              if (point.price) {
                
                console.log(point.price);

                if (parseInt(point.price) < 80000) {
                  point.price += ' Per Week';
                }

                content += '<span>£' + point.price + '</span><br />';
              }
              
              if( point.sales_link != '' && point.sales_link ) {
                content += '<br><a target="_blank" class="map-title point-link" href="' + point.sales_link + '">View all Sales Properties</a>';
              }

              if ( point.lettings_link != '' && point.sales_link ) {
                content += '<br><a target="_blank" class="map-title point-link" href="' + point.lettings_link + '">View All Rental Properties</a>';
              }

              if ( point.category ) {
                content += '<br><span class="map-category">' + point.category + '</span>';
              }
            } else {
              content += '<iframe title="YouTube video player" class="youtube-player" type="text/html" width="480" height="390" src="' + point.video + '" frameborder="0"></iframe>';
            }
            var infowindow = new google.maps.InfoWindow({
              content: content
            });
            marker._infoWindow = infowindow;
            marker.somethingIwant = point;

            _markers.push(marker);

            google.maps.event.addListener(marker, 'click',
              function() {
                  this._infoWindow.open(map, this);
              });
          } else {
            marker = _markers[id];

            marker.remove = 0;
          }
        }
      } catch (err) {
      }

      /*
       * remove null items form the Array.
       */
      for( i = _markers.length - 1; i >= 0; i-- ) {
        if( _markers[i].remove == 1 ) {
          _markers[i].setMap( null );

          _markers.splice(i, 1);
        }
      }
    }
  });
}

function showMarkerDetails(marker, show) {
  if (show === undefined) show = true;

  $marker = jQuery('#markerDetails');

  $marker.find('#content .title p').html(marker._details.title);
  $marker.find('#content p.text').html(marker._details.content);
  $marker.find('.photo img').attr('src', marker._details.thumbnail);

  $marker.css({
    opacity: 0
  }).show();

  $marker.find('#content').css({
    height: $marker.height() - 20
  });
  $marker.find('.photo').css({
    maxHeight: $marker.height() - 20
  });

  if (show) {
    $marker.show();
  }
}
