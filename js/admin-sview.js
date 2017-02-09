var key = 'AIzaSyDosc7irSGR_cv-kJb6iHNcFk9S4EM7nyI';
var gUrl = 'https://maps.googleapis.com/maps/api/streetview?size=640x640&fov=90&heading=235&pitch=10&';
var path;
var currentFrame = 0;
var $coords, startRoute = 3, endRoute = 1;


jQuery( document ).ready( function($) {
  $( 'a#sview').click( function() {
    console.log( "Start downloading" );

    calculateRoute();

    return false;
  })
});

function calculateRoute() {
  $coords = jQuery( '.gmaps-coords' );
  var $origin = jQuery( $coords[ startRoute ] );
  var $dest = jQuery( $coords[ endRoute ] );
  var origin = $origin.val().split(",");
  var destination = $dest.val().split(",");

  var directionsService = new google.maps.DirectionsService();
  var directionsRoute = directionsService.route({
      origin: new google.maps.LatLng(origin[0], origin[1]),
      destination: new google.maps.LatLng(destination[0], destination[1]),
      travelMode: google.maps.TravelMode.DRIVING
  }, function (DirectionsResult, DirectionsStatus) {
      path = DirectionsResult.routes[0].overview_path;

     downloadImage();
  });
}

function downloadImage() {
  var url = gUrl + 'location=' + path[currentFrame].k + ',' + path[currentFrame].B;

  jQuery.ajax({
      type : "post",
      url: ajaxurl,
      data:  {
          action: 'grab_sview_image',
          url: url,
          frame: currentFrame,
          from: startRoute,
          to: endRoute
      },
      success: function( r ) {
        console.log( "Done", currentFrame, r );

        currentFrame += 1;

        if( currentFrame > path.length || path[ currentFrame ] == undefined ) {
          endRoute++;
          return;

          if( endRoute == startRoute ) endRoute++;

          if( endRoute >= $coords.length ) {
            startRoute++;

            endRoute = 0;
            currentFrame = 0;
          }

          if( startRoute >= $coords.length ) {
            alert( "Done" );

            return;
          }

          console.log( "Next route", startRoute, endRoute );

          calculateRoute();
        }

        setTimeout( function() {
          downloadImage();
        }, 100 );
      }
    });

}
