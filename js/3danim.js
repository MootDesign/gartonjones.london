jQuery( document ).ready( function( $ ) {
    $( '#wording .tdot' ).on( 'click', function() {
        $( '#quickview' ).show();

        var iframe = $( this ).attr( 'data-iframe' );

        $div = $( iframe );
        $div.css( { 'margin-left': - ( $div.width() / 2 ) } );

//         if( window.outerWidth > 800 && ! isiPad ) {
//             showUsingCoolAnimation( iframe );
//         } else {
            parallaxAnimate( iframe );
//            parallaxAnimate( iframe.replace( '#', '' ) );
//         }

        $( '#menugrayout' ).fadeIn( 'fast' );
    });
});

