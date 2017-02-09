var _xhr, _markers = new Array();

jQuery( window ).resize( function() {
    setTimeout( function() {
        $marker = jQuery( '.marker-details' );
        if( ! $marker.hasClass( 'zactive' ) ) return;

        _centerDiv( $marker );
    }, 300 );
});

/*
*/
function initGMap( mapId, streetViewControl, maker ) {

	//point = new google.maps.LatLng(51.52098748772112, -0.14747858047485352);
    if( mapId == undefined ) mapId = "map" ;
    if( streetViewControl == undefined ) streetViewControl = true;
    if( maker == undefined ) maker = true;


    zoom = 15;
    latitude = 51.495852;
    longitude = -0.129198;

	point = new google.maps.LatLng(latitude, longitude);

	var map = new google.maps.Map(document.getElementById( mapId ), {
		center: new google.maps.LatLng(latitude, longitude),
		zoom: zoom,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		panControlOptions: {
			position: google.maps.ControlPosition.RIGHT_BOTTOM
		},
		mapTypeControl: true,
		zoomControlOptions: {
			style: google.maps.ZoomControlStyle.SMALL,
			position: google.maps.ControlPosition.RIGHT_BOTTOM
		},
    mapTypeControlOptions: {
			style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
			position: google.maps.ControlPosition.LEFT_BOTTOM
		},
		streetViewControl: streetViewControl
	});

    //house marker
	var image = new google.maps.MarkerImage ('/img/gjmaps.png');

    if( maker ) {
        var marker = new google.maps.Marker({
            position: point,
            map: map,
            animation: google.maps.Animation.DROP,
            icon: image
        });
    }

	var bni_style = [
		{
			featureType: "road.arterial",
			stylers: [
				{ hue: "#a99959" },
				{ visibility: "on" },
				{ saturation: 0 }
			]
		},
		{
			featureType: "landscape.man_made",
			stylers: [
				{ visibility: "on" },
				{ hue: "#342F1F" },
				{ saturation: 40 }
			]
		},
		{
			stylers: [
				{ visibility: "on" },
				{ hue: "#a99959" },
				{ saturation: -65 },
				{ lightness: -7 }
			]
		}
	];

	map.setCenter(point);
	map.setOptions({styles: bni_style});

	google.maps.event.addListener(map, 'idle', function() {
        gmapShowMarkers( map );
    });

	google.maps.event.addListenerOnce(map, 'idle', function() {
	    var map_gradient = document.createElement('div');
		map_gradient.setAttribute('id', 'map-gradient');

		jQuery('#map div').first().append(map_gradient);
		jQuery('.gmnoprint').css('z-index','92');
	});
}

function gmapShowMarkers( map ) {
       var bounds = map.getBounds();

        var ne = bounds.getNorthEast();
        var sw = bounds.getSouthWest();

        //Abort previous request
        if( _xhr ) _xhr.abort();

        _xhr = jQuery.ajax({
            type : "post",
            url: _ajaxurl,
            data:  {
                action: 'get_gmap_markers',
                ne: [ ne.lat(), ne.lng() ],
                sw: [ sw.lat(), sw.lng() ],
                nonce: _nonce
            },
            success: function( response ) {
                var json;

                try {
                    json = jQuery.parseJSON( response );
                } catch( err ) {
                    return;
                }

                //Set all markers to be removed
                var existings = new Array();
                for( i = 0; i < _markers.length; i++ ) {
                    _markers[ i ].remove = 1;

                    existings.push( _markers[ i ]._details.postID );
                }

                for( i = 0; i < json.length; i++ ) {
                    var point = json[ i ];

                    //Check if the marker already exists
                    var id = existings.indexOf( point.id );
                    if( id < 0 ) {
                        var image = new google.maps.MarkerImage ( point.icon );

                        var marker = new google.maps.Marker({
                            position: new google.maps.LatLng( point.lat, point.lng ),
                            map: map,
                            animation: google.maps.Animation.DROP,
                            icon: image
                        });

                        marker._details = {
                                            postID: point.id,
                                            title:  point.title,
                                            thumbnail: point.image,
                                            content: point.content
                        }

                        _markers.push( marker );
                    } else {
                        marker = _markers[ id ];

                        marker.remove = 0;
                    }

                     google.maps.event.addListener(marker, 'click', function() {
                        showMarkerDetails( this );
                     });
                }

                //Remove no longer visible markers
                for( i = 0; i < _markers.length; i++ ) {
                    if( _markers[ i ].remove == 1 ) {
                        _markers[ i ].setMap( null );

                        //Remove marker from array
                        _markers[ i ] = null;
                        _markers.splice( i, 1 );
                    }
                }
            }
        });
}

function showMarkerDetails( marker, show ) {
    if( show == undefined ) show = true;

    $marker = jQuery( '#markerDetails' );

    $marker.find( '#content .title p').html( marker._details.title );
    $marker.find( '#content p.text').html( marker._details.content );
    $marker.find( '.photo img').attr( 'src', marker._details.thumbnail );

    $marker.css( { opacity: 0 } ).show();

    adjustScrollArea( true );

    $marker.find( '#content' ).css( { height: $marker.height() - 20 } );
    $marker.find( '.photo' ).css( { maxHeight: $marker.height() - 20 } );

    if( show ) {
        parallaxAnimate( '#markerDetails' );
    }
}
