var $e;
jQuery( document ).ready( function() {
(function ($) {
	'use strict';
	var _recreate_coverflow = false;

	$( '.change-view li, .show-latest' ).click( function() {
      $('#back-button').show();
      
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
		    $('#back-button').hide();

			initGMap( $div.data( 'dest' ) || "mapview", $div.data( 'lat' ), $div.data( 'lon' ), true, false, 14 );

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

		if( id.indexOf( '#coverflow' ) >= 0 ) {
			_recreate_coverflow = true;

			recreate_coverflow( ajaxData.development || '' );
		}

		if( id.indexOf( '#bg' ) >= 0 ) {
			$( '#navigation-menu .second a.active' ).trigger( 'click' );
		}

		if ( id == '#devgrid' ) {
			reflow_grid('fast');
		}
	});

	$( '#filter-view ul a, #navigation-menu .second a, #responsive-dev-menu a' ).click( function() {
		$('#filter-view ul li').removeClass('active');
		$(this).parent().addClass('active');

		var category = $( this ).data( 'category' ) || $( this ).data( 'href' );

		if( $( '#strips' ).is( ':visible' ) ) {
			$( '#devview .the-strips li' ).each( function() {
				var $this = $( this );
				var height = $this.data( 'height' );
				var opacity = 1;

				if( ! $this.data( 'height' ) ) {
					height = $this.outerHeight();

					if( height > 1 ) {
						$this.data( 'height', height );
					}
				}
				
				if( category && category !== "" && $this.data( 'category' ) != category.toLowerCase() ) {
					height = 0;
					opacity = 0;
				} else {
					$this.show();
				}

				$this.stop( true, false ).animate( {height: height, opacity: opacity}, 'slow', function() {
					if( $this.height() <= 1 ) $this.hide();
				});
			});
		}

		if( ! category ) {
			$( '#devview #grid li' ).removeClass( 'hide-me' );
		} else {
			$( '#devview #grid li' ).addClass( 'hide-me' );
			$( '#devview #grid li[data-category="' + category + '"]' ).removeClass( 'hide-me' );
			$( '#devview #grid li[data-category="' + category.toLowerCase() + '"]' ).removeClass( 'hide-me' );
		}

		$( '#devview .responsive-grid' ).trigger( 'reflow' );

		ajaxData.development = category;

		if( $( '#mapview' ).is( ':visible' ) ) {
			gmapShowMarkers(map);
		}

		_recreate_coverflow = $( '#coverflow' ).is( ':visible' );
		recreate_coverflow( category );
	});

	function recreate_coverflow( category ) {
	  if( ! _recreate_coverflow ) return;

	  //Destroy the active coverflows
		category = category || '';
		category = category.replace( '&', '&amp;' );
	  _coverflows.forEach( function( coverflow ) {
	    jQuery( '#' + coverflow.dest ).fadeOut( 'fast', function() {
	      jQuery( this ).html( '' );

	      _recreate_coverflow_data( coverflow, category );
	    });
	  });

	  _recreate_coverflow = false;
	}

	function _recreate_coverflow_data( coverflow, category ) {
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
	  coverflow.data.forEach( function( item ) {
			// console.log( category, item.category );
	    if( ( category === '' || item.category == category ) ) {
	      var data = document.createElement( 'ul' );
	      var html = '<li data-type="link" data-url="' + item.link + '"></li><li data-thumbnail-path="' + item.img + '"></li>' +
	      '<li data-thumbnail-text="">' +
	      '<div class="flowWrapper" style="float: left; width: 100%; height: auto; padding-top: 5px">' +
	      	'<p class="largeLabel"><a href="' + item.link + '">' + item.title + '</a><span class="category">' + item.category + '</span><span>' + item.intro_text + '</span></p>' +
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

	/**
	 * The strips
	 */
	$( document ).on( 'mouseenter', '.the-strips li', function() {
	  $( '#bg img' ).removeClass( 'active' );
	  $( '#bg .' + $( this ).data( 'image') ).addClass( 'active' );
	});

	$( '.toggle-radio' ).click( function() {
		if ( i ) {
			$('.the-content').data('original-height', $('.the-content').height());
			i = false;
		}

		// we don't need to fire the event anymore
		if ( $( '.radio-would' ).is( ':visible' ) ) {
			// return;
			// $( this ).text( 'I would like to:' ).addClass('no-arrow');
			$( this ).text( 'Show More' );

			$('.the-content').height( $('.the-content').data('original-height') );

			$( '.radio-would' ).slideToggle( 400 );


		} else {
			$( this ).text( 'Show Less' );

			$( '.radio-would' ).slideToggle( 400 );


			// NOTE: update form height...
			var maxHeight = window.innerHeight - $( '#register' ).position().top - $( '#footer' ).outerHeight() - $( '#register .view-other' ).outerHeight() - 65 - $( '.view-other' ).outerHeight();
			var updateInterval = setInterval( function() {
				var updateHeight = $( '.the-content' ).data( 'height' ) + $( '.radio-would' ).height() + 5;
				if( updateHeight > maxHeight ) updateHeight = maxHeight;

					$( '.the-content' ).height( updateHeight );
					// TODO: remove debug
					// console.log(updateHeight);
			}, 50 );

		}

			// when the animation is complete, stop the interval
			$( '.radio-would' ).promise().done(function() {
				clearInterval( updateInterval );

				// update the content data('height')
				// make sure that we are after the interval
				setTimeout( function(){
					$( '.the-content' ).data( 'height', $( '.the-content' ).height() );
					// TODO: remove debug

					//Show perfect scrollbar
					if( ! $( '#register .the-content' ).hasClass( 'ps-container') ) {
						$( '#register .the-content' ).perfectScrollbar();
					} else {
						$( '#register .the-content' ).perfectScrollbar('update');
					}

					// console.log( 'last: ' + $( '.the-content' ).height());

				}, 500);
			});

	});

	var showTheGridItem = function( e, index, $grid ) {
		if( $( e ).hasClass( 'visible' ) ) return;

		var scrollTop = $( window ).scrollTop() + $grid.scrollTop();
		var height = $( 'body' ).height();
    // var y = getMatrixM41( e[0] );
		var y = getMatrixM41( e.get(0) );
		var isVisible = ( y <= scrollTop + height - $grid.outerHeight() / 3.5 );

    // console.log( isVisible, y, scrollTop, height, $grid.outerHeight() / 3.5 );

		if( isVisible ) {
			var $img = $( e ).find( 'img' );
			$img.attr( 'src', $img.data( 'src' ) );

			$( e ).addClass( 'visible' );
			$( e ).delay( 50 * index ).animate( { opacity: 1 }, 'slow' );
		}
	};

	var minWidth = 300, cellWidth = 450, ratio = 1.5;
	var resizeInterval = 300;
	var openItems = [];

	var $grid = $( '.responsive-grid' );

	var get_cell_width = function( items ) {
		//30px is the width of the scrollbar
    // return ( window.innerWidth - 15 ) / items;
		return ( $( '#grid' ).width() ) / items;
	};

	var reflow_grid = function( speed ) {
		var resizeInterval = 300;

  		var items = Math.round( window.innerWidth / cellWidth );
  		var width = get_cell_width( items );
  		speed = speed || 400;

  		/*
  		 * I don't want cell smaller than the minimum size.
  		 */
  		if( width < minWidth && items > 1 ) {
  			items--;
  			width = get_cell_width( items );
  		}
  		var height = width / ratio;

  		var position = { x: 0, y: 0 };
  		var currentItem = 0;
  		$( '.responsive-grid .item' ).each( function( i ) {
  			var $this = $( this );

  			if( $this.hasClass( 'clone' ) ) {
  				$original = $this.data( 'original' );

  				var style = $original.attr( 'style' );
  				var re = /rotateX[^;]*/;

  				style = style.replace( re, '' );
  				$this.attr( 'style', style ).show();

  				var $data = $this.find( '.back .data' );
  				$data.css( { marginTop: ( $this.find( '.back' ).outerHeight() - $data.outerHeight() ) / 2 } );

  				return;
  			}

  			if( $this.hasClass( 'hide-me' ) ) {
  				$this.stop( true, false ).delay( currentItem * 50 ).transition( { scale: 0, opacity: 0 } );

  				return;
  			}

  			if( currentItem > 0 && ( currentItem % items ) === 0 ) {
  				position.x = 0;
  				position.y += height;
  			}

  			// $this.data( 'position', position );
  			this.dataset.positionX = position.x;
  			this.dataset.positionY = position.y;
  			// console.log( $( this ).data( 'position' ) );
  			$this.transition( { x: position.x, y: position.y, width: width, height: height, scale: 1, opacity: 1 }, speed,
  			function() {
  				showTheGridItem( this, $( this ).index(), $( this ).closest( '.responsive-grid' ) );
  			} );

  			position.x += width;
  			currentItem++;
  		});

      $( '.show-more' ).transition( { x: '-50%', y: position.y + height + 50 }, speed );
  	};
	
})(jQuery);
});