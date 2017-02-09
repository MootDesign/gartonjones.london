(function( $ ){
  $(document).ready( function() {
    var windowHash = window.location.hash;

    var isMobile = ($('#mobile-parallax').length > 0) ? true : false;

    // if it is mobile phone, wait less for the form to come in
    var timeout = (isMobile) ? 700 : 3000;

    if ( windowHash == '#cgt-valuation' ) {
      $( window ).load( function() {
        setTimeout( function() {
          $( '#big-menu ul li' ).hide();
          $( '#big-menu ul li.strip-cgt' ).show();
          showClose( 500, '#big-menu' );
          $( '#big-menu' ).addClass( 'open' );
        }, timeout );
      });
    } else if ( windowHash == '#valuation' ) {
      $( window ).load( function() {
        setTimeout( function() {

          $( '#big-menu ul li' ).hide();
          $( '#big-menu ul li.strip-sales' ).show();

          showClose( 500, '#big-menu' );
          $( '#big-menu' ).addClass( 'open' );
        }, timeout );
      });
    }

    $( '.submenu li a' ).click( function(e) {
      if (
        $( this ).attr( 'href' ).indexOf( 'wp-content' ) > -1 ||
        $( this ).attr( 'href' ).indexOf( 'http' ) > -1
       ) {
        e.preventDefault();
        window.open( $( this ).attr( 'href' ) );
      }

      if(
         $( this ).attr( 'href' ) != "#cgt-valuation" &&
         $( this ).attr( 'href' ) != "#valuation"
        )
            return true;

      $( '#big-menu ul li' ).hide();

      if( $( this ).attr( 'href' ) == "#cgt-valuation" ) {
        $( '#big-menu ul li.strip-cgt' ).show();
        showClose( 500, '#big-menu' );

      } else {
        $( '#big-menu ul li.strip-sales' ).show();
        showClose( 500, '#big-menu' );
      }

      $( '#big-menu' ).addClass( 'open' );

      return false;
    });

    // when clicking on the menu and you are on the services page,
    // bring up the two form.
    $('.menu-item-landlord-services a').click(function() {
      if ($(this).attr('href') == '/services/#cgt-valuation') {
        $( '#big-menu ul li' ).hide();
        $( '#big-menu ul li.strip-cgt' ).show();
        showClose( 500, '#big-menu' );
        $( '#big-menu' ).addClass( 'open' );
      } else if ($(this).attr('href') == '/services/#valuation') {
        $( '#big-menu ul li' ).hide();
        $( '#big-menu ul li.strip-sales' ).show();
        showClose( 500, '#big-menu' );
        $( '#big-menu' ).addClass( 'open' );
      }
    });
  });
})(jQuery);
