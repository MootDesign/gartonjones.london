var isiPad = navigator.userAgent.match(/iPad/i) != null;
var krpanoLook = {};

jQuery(document).ready(function( $ ){
    setTimeout( function() {
        jQuery( '.close-me' ).removeClass( 'hidden' );

        if( isiPad ) {
            jQuery( '#pano' ).height( jQuery( '#pano' ).parent().outerHeight() );
        }
    }, 1000 );
});

function toggleMapView() {
    var h = ( jQuery('#office-map .content').hasClass( 'show-me' ) ) ? 300 : 0;

    jQuery( '#office-map .content' ).animate( { height: h }, 'fast', function() {
        $title = jQuery( '#office-map .close-me .title' );

        var visible = jQuery('#office-map .content').hasClass( 'show-me' );

        $title.html( visible ? $title.attr( 'data-title' ) : 'Close' );
        jQuery( '#office-map .close-me .arrow' ).html( ! visible ? '&#9650' : '&#9660' );
    });

    jQuery('#office-map .content').toggleClass( 'show-me' );
}

function closeMapView( div ) {
    toggleMapView();

    var krpano = document.getElementById("krpanoSWFObject");

    var fov = Number( krpano.get("view.fov") );
    fov += 100.0;
    krpano.set("view.fov", fov);

    krpano.call("looktohotspot('loader');js(blurEffect());wait(1);loadscene(get(startscene),null,MERGE);js(removeBlur())");

    //Change the title
    setTimeout( function( div ) {
        $div = jQuery( div );
        jQuery( '.close-me .title' ).html( $div.find( '.title .office' ).html() );


        jQuery( '.close-me .title' ).attr( 'data-title', jQuery( '.close-me .title' ).html() );
    }, 1000, div );
}

function _centerDiv( $div ) {
    //Center
    $div.css( { marginLeft: - $div.outerWidth() / 2,
                top: '50%',
                marginTop: - $div.outerHeight() / 2 } );

    $div.css( { opacity: 1 } );
}

function showSpot( item ) {
    $div = jQuery( "#" + item );

    $div.hide().transition({
        scale: 0,
    }, 0 );

    _centerDiv( $div );

    $div.show().addClass( 'zactive' ).transition({
        scale: 1,
        opacity: 1
    }, 'slow', 'easeInOutExpo' );

    jQuery( 'html' ).css( { overflow: 'hidden' } );

    if( ! jQuery( 'body' ).hasClass( 'single-2d' ) ) {
      jQuery( 'body' ).addClass( 'no-overflow' );
    }

    // jQuery( '.mt8p' ).transition( { scale:3.5, opacity: 0 }, 'slow', 'easeInOutExpo', function() {
    //     jQuery( this ).addClass( 'zoomed' );
    //
    //     jQuery( this ).hide();
    //
    //     setTimeout( function() {
    //         jQuery( 'html' ).css( { overflow: 'auto' } );
    //         jQuery( 'body' ).removeClass( 'no-overflow' );
    //     }, 100 );
    // });

    // jQuery( '.mt8p' ).transition( { scale:3.5 }, 'slow', 'linear', function() {
    //     jQuery( this ).addClass( 'zoomed' );
    //
    //     setTimeout( function() {
    //         jQuery( 'html' ).css( { overflow: 'auto' } );
    //         jQuery( 'body' ).removeClass( 'no-overflow' );
    //     }, 50 );
    // });

    showShade(0, true);
}

function showTeamPopup( id ) {
    var krpano = document.getElementById("krpanoSWFObject");
    krpanoLook = {
      fov: Number( krpano.get("view.fov") ),
      hlook: Number( krpano.get("view.hlookat") ),
      vlook: Number( krpano.get("view.vlookat") )
    };

    // krpano.call("js(blurEffect());wait(0.15);js(removeBlur())");
// jQuery( '#menugrayout' ).delay(150).fadeIn();

    //If doesn't exists show the blank one + the "SPOT ID"
    var div = id;
    var $div = jQuery( '#' + div );
    if( $div.length <= 0 ) {
      div = 'blank';
      jQuery( '#blank h2' ).html( id );
    }

    krpano.call("looktohotspot('" + id + "');js(blurEffect());wait(0);js(showSpot('" + div + "'))");

    showCloseButton(div);
}

function showCloseButton(div) {
    // open the close button
    setTimeout( function() {
        jQuery( '#' + div ).find( '.button-close' ).addClass('open').find( '.bg' ).addClass('open');
    }, 900 );
}

function blurEffect() {
    jQuery( '.mt8p' ).addClass( 'blur' );
}

function removeBlur() {
  jQuery( '.mt8p' ).removeClass( 'blur' );
}

function moveThroughDoor() {
var krpano = document.getElementById("krpanoSWFObject");
krpano.call("looktohotspot('door'); js(blurEffect()); wait(1); loadscene(get(startscene),null, MERGE); js(removeBlur())");
}

//Close the parallax window
jQuery( 'body' ).on( 'click', '.button-close', function() {
    if ( jQuery( this ).parents( '#team-wrapper' ).length > 0 ) {
        return false;
    }

  var closest = jQuery( this ).data( 'close' ) || '.parallax';

  jQuery( this ).removeClass('open').closest( closest ).transition({
      scale: 0,
      opacity: 0
  }, 'slow', 'easeInOutExpo', function() {

    hideShade();
    removeBlur();
    
    var krpano;
    //Restore krpano View
    if ( krpano = document.getElementById("krpanoSWFObject") ) {
        // console.log('lookto(' + krpanoLook.hlook + ', ' + krpanoLook.vlook + ', ' + krpanoLook.fov + ')');
        krpano.call('lookto(' + krpanoLook.hlook + ', ' + krpanoLook.vlook + ', ' + krpanoLook.fov + ')');
    }
  } );
});

jQuery( 'html, body' ).scroll( function() {
    
})