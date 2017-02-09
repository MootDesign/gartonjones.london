$( document ).ready( function() {
    $( '#popup-properties ul > .link' ).click( function() {
        $( '#popup-properties ul > .link' ).removeClass( 'active' );

        $( this ).addClass( 'active' );
    });
});

var _hide = false;

function showSearchBox() {
    $( '#searcher' ).fadeIn();
    $( '#searcher' ).css( 'margin-top', $( '#searcher' ).height() / 2 );

    $( '.row.mb50.mt8p' ).addClass( 'disabled' ); //animate( { opacity: 0.6 }, 'slow' );

    //Disable 3d model interactions
    animation.check = false;
    
    document.addEventListener( 'click', hideSearchBox, false );

    _hide = false;

    return false;
}

function hideSearchBox( e ) {
    $search = $( '#searcher' );
    if( ! $search.is( ':visible' ) ) return;
    if( ! _hide ) {
        _hide = true;
        return;
    }

    $e = $( e.srcElement );
    if( !( $e == $search || $e.parents( '#searcher' ).length > 0 ) ) {
        $( '.row.mb50.mt8p' ).removeClass( 'disabled' );

        $search.fadeOut();

        //Disable 3d model interactions
        animation.check = true;

        document.removeEventListener( 'click', hideSearchBox, false );
    }
}

function developmentFullScreen() {
    var text = "Full Screen";

    $page = $( this );
    if( ! $( '#page-1' ).hasClass( 'fullscreen' ) ) {
        _fullscreenOpen();

        text = "Close Full Screen";
    } else {
        _fullscreenClose();
    }

    $( '.dev-submenu a.fullscreen' ).html( text );
}

function _fullscreenOpen() {
    $div = $( '#page-1' );
    $div.detach();
    $div.addClass( 'fullscreen' );
    $div.height( $( 'body' ).height() - $( 'body > *:visible' ).height() );

    $( '.row.mt8p' ).hide();

    $( 'body' ).append( $div );
}

function _fullscreenClose() {
    $div = $( '#page-1' );

    //Insert before page-2
    $div.detach().insertBefore( '#page-2' );

    $div.removeClass( 'fullscreen' );

    $( '.row.mt8p' ).show();
}


