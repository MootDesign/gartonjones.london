var $e;
(function ($) {
	'use strict';
	$( '.change-view li, .show-latest' ).click( function() {
	  var id = $( this ).data( 'id' );
	  var $div = $( id );

	  $( '#change-view li' ).removeClass( 'active' );
	  $( this ).addClass( 'active' );

	  // $( '#devview > div, #myDiv-fluidwidth' ).hide();
	  $( '#myDiv-fluidwidth' ).hide();
	  $( '#myVideo-fluidwidth' ).hide();
	  $( this ).closest( '.parallax' ).find( '.switch-me' ).hide();
	  $div.show();

	  if( $div.data( 'map' ) && ! $div.data( 'initialized' ) ) {
			initGMap( $div.data( 'dest' ) || "mapview", $div.data( 'lat' ), $div.data( 'lon' ), true, false, 12 );

			$div.data( 'initialized', 1 );
	  }

		var noFilter = $( this ).data( 'nofilter' ) === 1;
		if( noFilter ) {
			$( '#filter-view' ).fadeOut();
		} else {
			$( '#filter-view' ).fadeIn();
		}

		if( $( this ).closest( '.parallax' ).attr( 'id' ) == 'videos' ) {
			if( $( this ).data( 'info' ) == 1 ) {
				$( '#developments-categories .info' ).slideDown( 'fast' );
				// $( '#developments-categories .info' ).addClass( 'visible' );
			} else {
				$( '#developments-categories .info' ).slideUp( 'fast' );
				// $( '#developments-categories .info' ).removeClass( 'visible' );
			}
		}
	});

	function recreate_coverflow( letter ) {
	  if( ! _recreate_coverflow ) return;

	  //Destroy the active coverflows
	  _coverflows.forEach( function( coverflow ) {
	    jQuery( '#' + coverflow.dest ).fadeOut( 'fast', function() {
	      jQuery( this ).html( '' );

	      _recreate_coverflow_data( coverflow, letter );
	    });
	  });

	  _recreate_coverflow = false;
	}

	function _recreate_coverflow_data( coverflow, letter ) {
	  var dest = document.getElementById( coverflow.dest );
	  var parent = document.createElement( 'ul' );
	  var cat = document.createElement( 'ul' );
	  var empty = true;

	  parent.id = coverflow.id;
	  parent.classList.add( 'coverflow-me' );
	  parent.style.display = 'none';
	  parent.dataset.dest = coverflow.dest;
	  cat.dataset.cat = '+ Category one';

	  parent.appendChild( cat );
	  letter = letter.toLowerCase();
	  coverflow.data.forEach( function( item ) {
	    if( ( letter === '' || item.letter == letter ) && ( ajaxData.filter === '' || ajaxData.filter == item.marker || ajaxData.filter == item.type ) ) {
	      // console.log( item.type, item.marker );
	      var data = document.createElement( 'ul' );
	      var html = '<li data-type="link" data-url="' + item.link + '"></li><li data-thumbnail-path="' + item.img + '"></li>' +
	      '<li data-thumbnail-text="">' +
	      '<div class="flowWrapper" style="float: left; width: 100%; height: auto; padding-top: 5px">' +
	      	'<p class="largeLabel"><a href="' + item.link + '">' + item.title + '</a></p>' +
	      		'<ul class="options" style="display: none"><li></li></ul>' +
	      		'</p></div></li>';

	      data.innerHTML = html;
	      cat.appendChild( data );

	      empty = false;
	    }
	  } );

	  dest.appendChild( parent );

	  if( ! empty ) {
	    generateCoverflow();
	    jQuery( '#' + coverflow.dest ).show();
	  }
	}
})(jQuery);
