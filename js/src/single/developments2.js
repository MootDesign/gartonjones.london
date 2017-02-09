var $e;
(function ($) {
	'use strict';
	var $content = $( '#main-parallax .content' );

	var activeSlide = 0, $activeSlide = $( '#main-parallax > .content' ).first();
	var isScrolling = false, scrollingTimeout1, scrollingTimeout2;
	var noScroll = true;
	var isDragging = false, dragStart = 0;
	var maxHeightOffset = 150;
	var $lastItem = null;
	var scrollTo;
	var contentHeight;

	//Scroll to the section
	$( '#dots li' ).click( function() {
		activeSlide = $( this ).index();
		$activeSlide = $( $( '#main-parallax .content' ).get( activeSlide ) );

		$( '#main-parallax .content' ).removeClass( 'active' );
		$activeSlide.addClass( 'active' );

		var index = $( this ).index();
		var top = contentHeight * index;
		$( '#main-parallax' ).stop( true, false ).transition( { y: -top }, 1000, 'easeInExpo', function() {
			if( activeSlide == 1 || $activeSlide.hasClass( 'has-parallax' ) ) {
				setTimeout( function() {
					animateTheAboutImages();
				}, 200 );

				$( '.parallax-menu .submenu li.active a' ).trigger('click');
			}

			if( scrollTo !== undefined ) {
				var $e = $( '.the-strips .' + scrollTo );
				var top = $e.position().top;

				$e.closest( '.the-strips' ).delay(100).animate( { scrollTop: top } );
			}

			scrollTo = undefined;
			showTheSearchButton();
		});
	});

	//Adjust height on resize
	$( window ).resize( function() {
		setParallaxContentHeight();
		setUpGallery();

		//About
		setUpTheAboutSlides();

		//Re-scroll to the active item
		$( '#dots li.active' ).trigger( 'click' );
	});

	//Animate the translate-me
	$( '.translate-me' ).mousemove( function( e ) {
		var x = ( e.clientX / window.innerWidth ) - 0.5;
		var y = ( ( e.pageY - $( this ).offset().top ) / window.innerHeight );

		var tx = - x * 30;
		var ty = - y* 30;
//        console.log( x, y );

//        $( this ).css( 'transform', 'translate(' + tx + 'px, ' + ty + 'px)' );
		$( this ).stop( true, false ).transition( { x: tx, y: ty }, 0, 'easeOutSine' );

	});

	//Gallery next & left arrow
	$( '#gallery .arrows > .arrow-right' ).click( function() {
		var $current = $( '#gallery .current' );
		var current = $( '#gallery .current' ).index();


//
//        //Get the next ones
//        var $next = $current.next();
//        if( $next.length <= 0 ) $next = $( '#gallery .image' ).first();
//
//        //Hide to left
//        $current.removeClass( 'current' ).addClass( 'to-left' );
//
//        //Show the next one
//        $next.addClass( 'current' ).removeClass( 'to-right to-left' );
	});

	//Gallery next & left arrow
	$( '#gallery .arrows > div' ).click( function() {
		scrollTheGallery( $( this ).hasClass( 'arrow-right' ) ? 1 : -1 );
	});

	$( '#gallery .images' ).mousedown( function( e ) {
		isDragging = true;
		dragStart = e.clientX;
	}).mouseup( function( e ) {
		isDragging = false;
	}).mousemove( function( e ) {
		if( ! isDragging ) return false;

		var dir = dragStart - e.clientX;
		if( Math.abs( dir ) > 10 ) {
			e.preventDefault();

			//Do the scroll
			var c = ( dir > 0 ) ? 'right' : 'left';
			$( '#gallery .arrows .arrow-' + c ).trigger( 'click' );

			isDragging = false;
		}

		return false;
	});
	$( '#gallery .images .image, #gallery .images img' ).on( 'dragstart', function( e ) {
		e.preventDefault();

		return false;
	});

	//Zoom the current image
	$( 'body' ).on( 'click', '#gallery .current, .example-gallery .columns', function() {
		//Load the big image
		big = new Image();
		var bigImg =  $( this ).find( 'img' ).data( 'big' );

		big.onload = function() {
			$this = $( this );
			$this.addClass( 'big-image current' ).hide();
			$( 'body' ).append( $this );

			//Scale the big image to the original small ones
/*
			if( ! $this.parent().hasClass( 'columns' ) ) {
				$current = $( '#gallery .current' );
			} else {
				$current = $this._source;
			}
*/
			var $current = this._source;
			var width = $this.width();
			var scaleX = $current.width() / $this.width();
			var scaleY = $current.height() / $this.height();

			if( $current.hasClass( 'columns' ) ) {
				scaleX = scaleY = 0;

				$current = $current.find( 'img' );
			}

			$this.transition( { x: "-50%", y: "-50%", scale: [scaleX, scaleY] }, 0 ).data( 'scale', [scaleX, scaleY] ).show();

			//The original image could be not in the middle of the page, so to avoid
			//glitch transition I need to set the new image in the same position of the
			//original one
//            var ty = $this.position().top - $current.position().top;
//            var tx = $this.position().left - $current.position().left;
//            console.log( $current.position(), $this.position(), ty );
//            $this.transition( { y: - ( window.innerHeight / 4 ) + ty }, 0 );

			//Zoom the image
			$this.transition( { x: "-50%", y: "-50%", scale: 1 }, 'fast', 'easeOutSine', function() {
				var $this = $( this );

				//Show the close button
				var $button = $( '.button-close-me' );
				$button.css( { left: $this.position().left + $this.width() - $button.outerWidth() - 10,
								top: $this.position().top + 10
							 }
						   );

				$button.addClass( 'visible' );

				adjustBigControls();
			});

			//Show the shade
			$( '#big-shade' ).fadeIn();

//            noScroll = true;
		};
		big._source = $( this );
		big.dataset.id = $( this ).find( 'img' ).data( 'id' );
		big.src = bigImg;
	});

	/*
	 * Close the big image
	 */
	$( '#big-shade, body > .button-close-me' ).click( function() {
		var scale = $( '.big-image' ).data( 'scale' );
		$( 'body > .big-image' ).transition( { x: "-50%", y: "-50%", scale: scale }, 'fast', function() {
			$( '.big-image' ).remove();
		});

		$( '#gallery .arrows' ).fadeIn();
		$( '#big-shade' ).fadeOut();
		$( '#big-controls' ).removeClass( 'visible' ).fadeOut();
		$( 'body > .button-close-me' ).removeClass( 'visible' );

//        noScroll = false;
	});

	//Allow the gallery items to be draggable
//    $( '#gallery' );

	//Show the more text
	$( '.read-more' ).click( function() {
		var $content = $( this ).closest( '.content' );
		var $more = $content.find( '.more-text' );

		showShade();
		$more.removeClass( 'close' ).addClass( 'visible' );
	});

	//Animate the scrolling of the a href=#xxx tag...
	$( 'article.parallax a' ).click( function() {
		var href = $( this ).attr( 'href' );

		if( $(this).data( 'popup' ) == 1 ) {
		  // console.log( "pop" );
		  //Show shade after the the popup animation is complete, just to avoid glitchy animations...
		  showShade( 500, true );

			var $popup = $( $( this ).data( 'id') );
			if( $popup.data( 'center' ) ) {
				$popup.css( { marginLeft: - $popup.outerWidth() / 2,
											marginTop: - $popup.outerHeight() / 2
									});
			}
		  $popup.addClass( 'visible' );

			if( $popup.find( 'video' ) ) {
				var video = $popup.find( 'video' ).get();

				video[0].play();
			}

		  return false;
		}

		if( href[0] == "#" ) {
			var $li = $( '#dots li.class-' + href.substr(1) );
			$li.trigger( 'click' );
		if( $(this).data( 'scroll' ) )
		scrollTo = $(this).data( 'scroll' );

			return false;
		}
	});

	/**
	 *  Big controls ( when the image is zoomed )
	 *
	 */
	$( '#big-controls > div' ).click( function() {
		//Get the next/prev image
		var $this = $( this );
		var $big = $( '.big-image.current' );
		var sourceId = $big.data( 'id' );
		var $source = $( '#gallery .images .image-' + sourceId );
		var $image = ( $this.hasClass( 'arrow-left' ) ) ? $source.prev() : $source.next();

		//Nothing?
		if( $image.length <= 0 && $this.hasClass( 'arrow-left' ) ) $image = $source.closest( '.images' ).find( '.image' ).last();
		if( $image.length <= 0 && ! $this.hasClass( 'arrow-left' ) ) $image = $source.closest( '.images' ).find( '.image' ).first();
		//Disable the left/right arrow to avoid strange scrolling issues until the big image is loaded
		$( '#big-controls' ).addClass( 'no-events' );

		//Get the big image
		//Load the big image
		var big = new Image();
		var bigImg =  $image.find( 'img' ).data( 'big' );

		big.onload = function() {
			var $this = $( this );

			//Add the to-left, to-right class
			$this.addClass( 'big-image' ).addClass( ( this._direction > 0 ) ? 'to-right' : 'to-left' );

			//current big image
			var $current = $( '.big-image.current' );

			//Add the new image
			$( 'body' ).append( $this );

			//Push the current image to left/right
			setTimeout( function( dir, $current, $this ) {
				$current.addClass( 'animate' ).addClass( ( dir < 0 ) ? 'to-right' : 'to-left' ).removeClass( 'current' );
				$this.addClass( 'animate current' ).removeClass( 'to-right to-left' );
			}, 100, this._direction, $current, $this );

			//Destroy the old image
			setTimeout( function( $current ) {
				$current.remove();

				//Adjust the controls
				adjustBigControls();
			}, 600, $current );
		};

		big._source = $image;
		big._direction = ( $this.hasClass( 'arrow-left' ) ) ? -1 : 1;
		big.dataset.id = $image.find( 'img' ).data( 'id' );
		big.src = bigImg;
	});

	//Toggle register content
	$( '#register .title' ).click( function() {
		var $this = $( this );
		var $content = $this.parent().find( '.the-content' );

		$this.parent().toggleClass( 'open' );
		if( $( this ).parent().attr( 'id' ) != "register" ) return;

		// check the height when open
//		var currentHeight = $content.height();
			var currentHeight = ( $this.parent().hasClass( 'open' ) ) ? $content.data( 'height' ) : $content.find( 'h3' ).outerHeight() + 6;

//        var height = ( $this.parent().hasClass( 'open' ) ) ? $content.data( 'height' ) : 0;
		//Switch the gallery view
		if( ! $( '#register' ).hasClass( 'open') ) {
			showTheGallery3D();
		} else {
			showTheGallerySingle();
		}

		$content.height( currentHeight );
	});

	function setParallaxContentHeight() {
		//Set the height of each session
		contentHeight = window.innerHeight -
										 $( 'nav.top-bar' ).outerHeight() -
										 $( '#footer' ).outerHeight();

		$( '.size-me' ).height( contentHeight );
		$( '.full-img div' ).height( contentHeight ).width( window.innerWidth );
		$( '#main-parallax div.content' ).height( contentHeight );
										//  - $( '#sub-menu' ).outerHeight() );

//        $( '.parallax .shadow' ).css( { top: ( $( '#main-parallax #home .text' ).offset().top - 60 ) + "px" }  );
		// $( '.parallax .shadow' ).css( { top: 250 }  );

		// $( '#main-parallax > .empty' ).height( $( '.site-footer' ).height() + 40 );
	}

	/**
	 * Adjust the position/size of the big controls
	 */
	function adjustBigControls() {
		//Hide the small ones
		$( '#gallery .arrows' ).fadeOut();

		//Adjust the controls to current image size and show them
		var $controls = $( '#big-controls' );
		var width = $( '.big-image.current' ).width();

		$controls.width( width + 200 ).removeClass( 'no-events' ).addClass( 'visible' ).fadeIn();
	}

	function showTheSearchButton() {
		// if( isScrolling ) {
		// 	return;
		// }
		//
		console.log( "active", $activeSlide );
		if( activeSlide === 0 ) {
		  $( '#register' ).removeClass( 'visible open' );
		} else if( activeSlide == 1 ) {
			//Always open the register your interest form on the first slide
			if( ! $( '#register' ).hasClass( 'open' ) )
				$( '.parallax #register .title' ).first().trigger( 'click' );

		} else {
		  //As the form occupy too much space, we close it when we aren't on the first slide
		  if( $( '#register' ).hasClass( 'open' ) )
			  $( '.parallax #register .title' ).first().trigger( 'click' );
		}

		$( '#backtop' ).removeClass( 'visible' );

		if( $activeSlide.hasClass( 'no-title' ) ) {
		  $( '#register' ).removeClass( 'visible open' );
		  $( '.view-other' ).removeClass( 'visible' );
		  $( '#backtop' ).addClass( 'visible' );

		  // $( '.the-title' ).fadeOut();
		} else {
		  $( '#register' ).addClass( 'visible' );
		  $( '.view-other' ).addClass( 'visible' );

		  // $( '.the-title' ).fadeIn();
		}

		if( $activeSlide.hasClass( 'no-form' ) ) {
		  $( '#register' ).removeClass( 'visible open' );
		}

		if( $activeSlide.hasClass( 'no-backtop' ) ) {
		  $( '#backtop' ).removeClass( 'visible' );
		}

		if( $activeSlide.hasClass( 'show-filters') ) {
		  $( '#change-view' ).addClass( 'visible' );
		} else {
		  $( '#change-view' ).removeClass( 'visible' );
		}

		//Don't show the search apartments button in the last "slide"
		if( $( '.parallax .content.active' ).hasClass( 'no-search' ) ) return;

		if( activeSlide > 0 )
		  $( '#main-parallax > .search-button' ).addClass( 'visible' );
	}

	function scrollTheGallery( dir ) {
		var $current = $( '#gallery .images .current' );
		var current = $current.index() + dir;

//        if( current < 0 ) return false;
//        if( current >= $( '#gallery .images .image' ).length  ) return false;
//        if( current < 0 ) current = $( '#gallery .images .image' ).length - 1;
		if( current >= $( '#gallery .images .image' ).length  ) current = 0;

		//Remove the "before-" and "after-##" class from each element
		$( '#gallery .images .image' ).each( function() {
			var $this = $( this );

			$this.removeClass (function (index, css) {
				return (css.match (/\b(before-|after-)\S+/g) || []).join(' ');
			}).removeClass( 'current before after' );

			//The new class will be index - currentId
			var id = $this.index() - current;

			/**
			 * If the next position is after-4 I swap it with before-4, and viceversa,
			 * to allow infinite scroll.
			 * I can't swap the -3 class, due to the opacity the swap will be visible by the use :(
			 */
			if( Math.abs( id ) > 3 ) {
				var sign = ( id > 0 ) ? -1 : 1;
				id = $( '#gallery .images .image' ).length + id * sign;
				id *= sign;
			}

			var c = ( id < 0 ) ? "before before-" : "after after-";
			if( id === 0 ) c = "current id-";

			$this.addClass( c + Math.abs( id ) );
		});

		//Change the text
		$( '#image-desc li' ).removeClass( 'active' );
		var li = $( '#image-desc li' ).get( current );
		$( li ).addClass( 'active' );
	}

	/**
	 * Show the 3D gallery
	 */
	function showTheGallery3D() {
		$( '#gallery .images .image' ).removeClass( 'hidden' );
		$( '#gallery .arrows' ).removeClass( 'single' );
	}

	function showTheGallerySingle() {
		$( '#gallery .images .image' ).addClass( 'hidden' );
		$( '#gallery .arrows' ).addClass( 'single' );
	}

	/**
	 * Scroll the about content
	 */
	$( '#about .parallax-menu a, #map' ).click( function() {
		//TODO: SCROLL THE CONTENT
		var $this = $( this );

		//Darker bg?
		if( $this.data( 'darker' ) ) {
			$( ".parallax .shadow" ).addClass( 'darker' );
		} else {
			$( ".parallax .shadow" ).removeClass( 'darker' );
		}

		//Google map?
		if( $this.data( 'map' ) == 1 ) {
		  //Add the google maps "map"
		  var $location = $( '#mapholder' );

		  if( ! $location.data( 'initialized' ) ) {
			//Adjust the spacing reserved to the list
			var listHeight = $( '#location-map .the-list' ).outerHeight();
			var height = $( '#location-map' ).height();

			$( '#location-map #mapholder' ).height( height - listHeight );
		  }

		  $( '#location-map' ).addClass( 'visible');

		  //Show shade after the the popup animation is complete, just to avoid glitchy animations...
		  showShade( 600, true );

		  setTimeout( function() {
			if( ! $location.data( 'initialized' ) ) {
			  vmap( $location.data( 'latitude' ), $location.data( 'longitude' ), $( '#mapholder' ).next( '.map-info') );

			  $location.data( 'initialized', 1 );
			} else {
			  $location.fadeIn('fast');
			}
		  }, 600, $location);

		  return false;
		}

		var index = $( this ).parent().index() - 1;
		var slide = $( '#about .slides .slide' ).get( index );
		var x = slide.offsetLeft;

		//Remove the class "show" to all animatable items
		$( '.show-me .animate-me' ).removeClass( 'show' );
		$( '#about .slides' ).stop( true, false ).transition( { x: -x }, 1000, 'easeInExpo', function() {
			setTimeout( function() {
				animateVisibleContent();
			}, 100 );
		});

		$( '.parallax-menu li' ).removeClass( 'active' );
		$this.parent().addClass( 'active' );

		animateTheAboutImages();

		return false;
	});

	/**
	 * Scroll the split-me content
	 */
	$( 'body' ).on( 'click', '.slide .dots li', function() {
		var $this = $( this );
		var $scrollable = $this.closest( '.slide' ).find( '.scrollable' );
		var $ul = $this.parent();

		var index = $this.index();
		var cpp = $ul.data( 'cpp' ); //Columns per page
		var to = $this.index() * cpp;
		var toIndex = $this.index();
		var from = $ul.find( '.active' ).index();

		//Get all the visible items
		var $columns = $scrollable.find( '> .columns' );
		// console.log( index );
		$columns.each( function( i ) {
			var pos = 100 * ( i + 1 );
			var $col = $( this );
			var delay = i;

			//Invert the delay
			if( from > toIndex ) {
				var max = from * cpp + 1;
				delay = (  max - i );
				// console.log( max, i, delay );
			}
			delay *= 200;

			if( i >= to ) {
				if( i < to + cpp )
					pos = cpp * 100 * index;
				else
					pos = 0;

				//first items
				if( i >= 0 && i < cpp ) pos = 0;
			}

			$col.delay( delay ).stop( true, false ).transition( { x: ( - pos ) + '%', marginLeft: 0 }, 1000, 'easeInOutExpo' );
		});

		$ul.find( 'li' ).removeClass( 'active' );
		$this.addClass( 'active' );
	});

	/**
	 *  Animate the label for the contact form
	 */
	$( '#contact input[type="text"], #contact input[type="email"], #contact input[type="tel"], #contact textarea' ).focusin( function() {
		$( this ).closest( 'li' ).find( 'label' ).addClass( 'focused' );
	}).focusout( function() {
		if ( ! $( this ).val().length ) {
			$( this ).closest( 'li' ).find( 'label' ).removeClass( 'focused' );
		}
	});

	/**
	 *  Set up the gallery "3D" effect in accordin to current screen size
	 */
	function setUpGallery() {
		var ratio = 16/9;

		$( '#gallery .image' ).height( $( '#gallery .current' ).width() / ratio );
		var mLeft = ( $( '#gallery .current' ).width() - $( '#gallery .images' ).width() ) / 2;
		var mTop = ( $( '#gallery .current' ).height() - $( '#gallery .images' ).height() ) / 2;

		$( '#gallery .image' ).css( { marginLeft: mLeft, top: - mTop } );
	}

	function setUpTheAboutSlides() {
		if( ! $( '#about .slides' ) ) return;

		var width = 0;
		$( '#about .slides .slide' ).each( function() {
			width += $( this ).width();
		});

		$( '#about .slides' ).width( width + 20 );

		//Set up the images
		$( '.the-about-content #images .image, .move-me' ).each( function() {
			var $this = $( this );

			//Which slide is the owner of current image
			var data = $this.data( 'alt' ).split( ',' );
			var x = window.innerWidth * ( data[0] + 1 );

			//Translate the items next to this slide
			$this
				.transition( { x: x, opacity: 1 }, 0 )
				.data( 'speed', data[1] )
				.delay( data[2] );
		});

		/*
		 * As the client can upload their own images for the facilites page, they ( probably )
		 * will not care too much about using the right proprtion. And if so, the table will
		 * be a mess, and each row could have a different height.
		 * So to avoid this I just fix the max sizes of the image using px unit, and the % one will not works
		 */
		var tableWidth = $( '#about .keyfacts' ).width();
		var tableHeight = $( '#about .keyfacts' ).height();
		var maxWidth = ( tableWidth / 4 ) - 20;
		var maxHeight = ( tableHeight / 4 ) - 30;

		$( '#about .facilities img' ).css( { maxWidth: maxWidth, maxHeight: maxHeight } );
	}

	function centerTheAboutSlides() {
		//Adjust the width of the keyfacts scrollable content
		$( '.keyfacts .scrollable' ).width( getTotalWidth( $('.keyfacts .scrollable .page' ) ) + 40 );
		$( '.keyfacts .scrollable .page' ).width( $( '.slide .keyfacts' ).width() );

		//Set the content, if doesn't cover the "button"
		$( '.slides .slide-content, .center-me' ).each( function() {
			var $this = $( this );
			var top = ( $this.parent().outerHeight() - $this.outerHeight() ) / 2;

			// console.log( top, $this.height() );
			var min = $( this ).hasClass( 'text' ) ? 110 : 0;
			top = Math.max( min, top );

			//Set the arrows position, if there is any
			var $arrows = $( this ).next( '.arrows' );
			if( $arrows.length > 0 ) {
			  var w = ( $( this ).width() / 2 );

			  $arrows.find( '.arrow-left' ).transition({x: - w - 60 }, 0 );
			  $arrows.find( '.arrow-right' ).transition({x: w + 30 }, 0 );
			  $arrows.find( 'div' ).addClass( 'visible' );
			}

			$this.css( { top: top } );
		});
	}

	/**
	 * Check all the elements that have the "split-me" class.
	 * Check if their height match the parent one, otherwise split the content
	 * in multiple columns.
	 *
	 * Add the "split-me" class and the data-column value to the interested item.
	 * The value in data-column is the minimum column we want to split our content.
	 * So if by default we want at least 2 columnt the code will split the
	 * column in 2 even if the content fits in one...
	 *
	 * data-column is the number of the columns per "page"
	 *
	 * The script will use the paragraph <p> as split point
	 */
	function splitTheContent() {
		$( '.split-me' ).each( function() {
			var $this = $( this );
			var minColumn = $this.data( 'columns' ) || 2;

			//Max height that the column can occupy
			var maxHeight = $this.closest( '.slide-content' ).height() - maxHeightOffset;

			//The height I'm using
			var height = $this.height();

			//The split-me will be destroyed at the end
			var $scrollable = $this.closest( '.scrollable' );

			//Is too bigger?
			if( height > maxHeight ) {
				//Get all the paraghraps
				$this.data( 'max', maxHeight );

				splitTheParagraphs( $this, $this.data( 'class' ) );

				//Remove the old column
				$this.closest( '.columns' ).remove();
			}

			//Done set the width of the scrollable
			var $columns = $scrollable.find( '> .columns' );

			//Calculate the new percentage of each column, to maintain the same with
			var padding = parseInt( $columns.first().css( 'padding-left' ) );
			var width = $columns.first().outerWidth(); //Each column use the same width

			//Is full column
			var isFullWidth = $columns.first().hasClass( 'medium-12' );
			var fullWidth = ( isFullWidth ) ? width : width * 2;
			var halfWidth = fullWidth / 2;

			//Each minColumn + 1 I need to add padding to avoid that the items are visible when scrolling...
			var totalColumns = $columns.length;
			$columns.each( function( i ) {
				if( $( this ).hasClass( 'medium-12' ) ) totalColumns++;
				if( i > 0 && ( i % minColumn ) === 0 ) {
//                    var $padded = $scrollable.find( '> .columns:nth-child(' + ( minColumn + 1 ) + 'n+1)' );

					$( this ).addClass( 'padding' );
				}
			});

			//New width
			var $padded = $scrollable.find( '.columns.padding' );
			var total = getTotalWidth( $columns ) + ( maxHeightOffset * $padded.length );   //+10 to have enough space and avoid new line break

			$scrollable.find( '> .columns' ).each( function() {
			  var w = halfWidth;

			  if( $( this ).hasClass( 'medium-12' ) ) {
				w = fullWidth;
			  }

			  $( this ).css( { width: w } );
			});
			$scrollable.width( total + 10 );

			//Add the dots to allow the content scrolling
			var pages = Math.ceil( totalColumns / minColumn );
			var $ul = $scrollable.closest( '.slide' ).find( 'ul.dots' );

			for( i = 0; i < pages; i++ ) {
				var $li = $( '<li>' );
				$ul.append( $li );
			}
			$ul.data( 'cpp', minColumn );    //Columns per page
			$ul.find( 'li' ).first().addClass( 'active' );
		});
	}

	function splitTheParagraphs( $source, className ) {
		var $column = $( '<div>' ).addClass( 'columns' ).addClass( className );

		//Add the column to the scrollable element
		$source.closest( '.scrollable' ).append( $column );

		//
		if( $lastItem ) {
			if( $lastItem.prop( 'tagName' ) == "H4" ) {
				$lastItem.detach();

				$column.append( $lastItem );
			}

			$lastItem = null;
		}

		$source.find( '> div > *' ).each( function() {
			var $p = $( this );

			var maxHeight = $p.closest( '.split-me' ).data( 'max' );

			//Check the new height I'm going to occupy
			if( $p.outerHeight() + $column.outerHeight() <= maxHeight ) {
				$p.detach();

				$column.append( $p );
			} else {
				splitTheParagraphs( $source, className );

				return false;
			}

			$lastItem = $p;
		});
	}

	function setTheActiveSlide() {
		return;

		var top = $( '#main-parallax' ).scrollTop();
		isScrolling = true;

		if( top > 0 ) {
			$( 'nav.top-bar' ).addClass( 'opaque' );
		} else {
			$( 'nav.top-bar' ).removeClass( 'opaque' );
		}

		//Check which div is visible
		$content.each( function( k ) {
			var $this = $( this );
			// var index = $( this ).index() - 1;
			var index = k;

			var minTop = $( '#main-parallax' ).scrollTop() + window.innerHeight / 3;
//console.log( k, minTop, $this.offset().top );

			var visible = ( $this.offset().top <= minTop ) &&
							( $this.offset().top + $this.height() >= minTop );

			// console.log( visible, $this.position().top, minTop );
			if( visible ) {
				$activeSlide = $( $( '#main-parallax > .content' ).get( index ) );

				if( activeSlide != index ) {
					var li = $( '#dots li' ).get( index );

					$( '#dots li' ).removeClass( 'active' );
					$( li ).addClass( 'active' );

					//Active the item in the menu
					$( '#sub-menu li' ).removeClass( 'active' );
					$( '#sub-menu a[href="#' + $activeSlide.attr( 'id' ) + '"]' ).parent().addClass( 'active' );
					// var menu = $( '#sub-menu ul li' ).get( k );
					// $( menu ).addClass( 'active' );

					$content.removeClass( 'active' );
					$( this ).addClass( 'active' );
				}

				activeSlide = index;
			}
		});

		//Hide the search button
		$( '#main-parallax > .search-button' ).removeClass( 'visible' );
//        $( '.parallax #register' ).removeClass( 'visible' );

		clearTimeout( scrollingTimeout1 );
		clearTimeout( scrollingTimeout2 );

		//I need to know when the scrolling is done

		/*
		 * I need to show the "Search apartments button" only when
		 * the scroll is done...
		 * To be sure of that I execute 2 deferred timeouts.
		 * The first set the scrolling to false.
		 * The second ones check if it still false, just show the button.
		 *
		 * So after the first timeout nothing happens, I can be sure that
		 * the scroll is done
		 */
		scrollingTimeout1 = setTimeout( function() {
			isScrolling = false;

			scrollingTimeout2 = setTimeout( function() {
				showTheSearchButton();
			}, 300);
		}, 100 );
	}

	/**
	 * The scrollTop end callback is executed twice, as I'm applying the animation to html and body,
	 */
	var oldSlide;
	function animateTheAboutImages() {
		var currentSection = $( '.parallax-menu .active' ).index() - 1;

		$( '.the-about-content #images .image, img.move-me' ).each( function() {
			if( ! $( this ).closest( '.content' ).hasClass( 'active' ) ) return;

			var $this = $( this );
			if( $this.hasClass( 'load-me' ) ) {
			  currentSection = 0;
			  var visible = isElementInViewport( $this.closest('li') );
			  // console.log( visible );
			  if( ! visible ) return;
			}

			//Translate all the images
			var data = $this.data( 'alt' ).split( ',' );
			var speed = data[1] * 1000;
			var delay = data[2] * 1000;

//            if( data[0] != currentSection ) {
//                speed /= 1.5;
////                delay /= 2;
//            }

			var easing = ( data[0] == currentSection ) ? "easeOutExpo" : "easeInExpo";
			var x = window.innerWidth * data[0] - window.innerWidth * currentSection;

			$this.stop( true, false ).delay( delay ).transition( { x: x }, speed * 2 );
		});
	}

	function requestFullScreen(element) {
		// Supports most browsers and their versions.
		var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullscreen;

		if (requestMethod) { // Native full screen.
			requestMethod.call(element);
		} else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
			var wscript = new ActiveXObject("WScript.Shell");
			if (wscript !== null) {
				wscript.SendKeys("{F11}");
			}
		}
	}

	function centerForm() {
	  $( '#forms' ).css( 'margin-top', - $( '#forms' ).height() / 2 );
	}

	function initThePage() {
		//Register & Search button
		var $theRegister = $( '#register > .the-content' );
		var cheight = $theRegister.height();
		var height = window.innerHeight - $( '#register' ).position().top - $( '#footer' ).outerHeight() - $( '#register .view-other' ).outerHeight() - 40 - $( '.view-other' ).outerHeight();

		height = Math.min( height, cheight );
		if( height < cheight ) {
		  $( '#register .the-content' ).perfectScrollbar();
		}

		//The popup has the visibile class on page load only an error occourred.
		if( $( '#worth-popup' ).hasClass( 'visible' ) ) {
			$( '#worth-popup' ).css( { marginLeft: - $( '#worth-popup' ).outerWidth() / 2,
																	marginTop: - $( '#worth-popup' ).outerHeight() / 2
																});
			$( '#worth-popup .gform_wrapper form' ).height( $( '#worth-popup' ).height() );
			$( '#worth-popup .gform_wrapper form' ).perfectScrollbar();

			showShade( 0, true );
		}
			// NOTE: we need the auto height, but will have to save the current height
		$theRegister.data( 'height', height ).height( 0 );

		showTheSearchButton();

		//Set the height of each slide
		setParallaxContentHeight();

		//The gallery
		setUpGallery();
		scrollTheGallery( 0 );

		//About parallax
		setUpTheAboutSlides();
		splitTheContent();
		centerTheAboutSlides();

		//
		// setTheActiveSlide();

		//Slide text
		var $slideText = $( '#slide-text' );
		setInterval( function() {
		  var $active = $slideText.find( '.active' );
		  var $next = $active.next();
		  if( $next.length <= 0 ) $next = $slideText.find( 'li' ).first();

		  $active.removeClass( 'active' );
		  $next.addClass( 'active' );
		}, 4000 );

		$( window ).scrollTop( 0 );
		$( '#main-parallax' ).scroll( function( e ) {
			// setTheActiveSlide();
		});

		$( '.full-screen' ).click( function() {
			var $this = $( this );

			if( ! isFullScreen() ) {
				requestFullScreen( document.body );
				$this.addClass( 'exit' );
			} else {
				if (document.exitFullscreen) {
				  document.exitFullscreen();
				} else if (document.msExitFullscreen) {
				  document.msExitFullscreen();
				} else if (document.mozCancelFullScreen) {
				  document.mozCancelFullScreen();
				} else if (document.webkitExitFullscreen) {
				  document.webkitExitFullscreen();
				}

				$this.removeClass( 'exit' );
			}

			return false;
		});
	}

	/**
	 * Scroll the fact sheet content
	 */
	$( '.pager li, .pager-arrows .arrow' ).click( function() {
	  var $this = $( this );
	  var currentPage = $this.index();

	  $this.find( '.arrows' ).stop( true, false ).fadeIn();
	  if( $this.hasClass( 'arrow' ) ) {
		var dir = $this.hasClass( 'arrow-left' ) ? -1 : 1;
		currentPage = $( '.pager li.active' ).index() + dir;
	  }

	  //No left?
	  if( currentPage <= 0 ) {
		currentPage = 0;

		$( '.page-arrows .arrow-left' ).stop( true, false ).fadeOut();
	  }

	  if( currentPage >= $( '.pager li' ).length ) {
		currentPage = $( '.pager li' ).length - 1;

		$( '.page-arrows .arrow-right' ).stop( true, false ).fadeOut();
	  }

	  //Scroll into the page
	  var li = $( '.pager li' ).get( currentPage );
	  $( '.pager li' ).removeClass( 'active' );
	  $( li ).addClass( 'active' );

	  $( '.keyfacts .scrollable .page' ).each( function( i ) {
		var $page = $( this );
		$page.removeClass( 'to-screen from-screen' ).addClass( 'show' );
		if( i < currentPage ) {
		  $page.addClass( 'from-screen' ).removeClass( 'show' );
		}

		if( i > currentPage ) {
		  $page.addClass( 'to-screen' ).removeClass( 'show' );
		}
	  });
	});

	//Show the tooltip
	$( 'table.facilities td' ).mouseenter( function( e ) {
	  var $this = $( this );

	  // $( '#facilities-bg img' ).removeClass( 'visible' );
	  // $( '#facilities-tooltip' ).hide();

	  // $( '#facilities-bg img' ).stop( true, false ).transition( {opacity: 0, scale: 1}, 400 );

	  var src = this.dataset.src;
	  if( src === "" ) {
		//remove the lighter class to the body
		$( '.parallax .shadow' ).removeClass( 'lighter' );

		return;
	  }

	  //Apply the lighter class to the body
	  // $( '.parallax .shadow' ).addClass( 'lighter' );

	  //Show the bg image
	  // var $img = $( '#facilities-bg .active' ).next();
	  // if( $img.length <= 0 ) {
	  //   $img = $( '#facilities-bg img' ).first();
	  // }

	  // $( '#facilities-bg img' ).removeClass( 'active' );
	  // $img.attr( 'src', src ).addClass( 'visible active' );

	  // $img.stop( true, false ).transition( {opacity: 1}, 400, function() {
		// $img.transition( { scale: 1.6 }, 90000, 'linear' );
	  // } );

	  //Show the tooltip
	  $( '#image-tip' ).hide();
	  $( '#video-tip' ).hide();

	  if( $this.data( 'video' ) == 1 ) {
		var video = document.getElementById( 'video-tip' );

		//Add/setup the video source
		var $source = $( '#facilities-tooltip video source' );

		if( $source.length <= 0 ) {
		  $source = $( '<source>' );
		  $( '#facilities-tooltip video' ).append( $source );
		}
		var oldSrc = $source.attr( 'src' );

		if( src != oldSrc ) {
		  $source.attr( 'src', src ).attr( 'type', 'video/mp4' );

		  video.onloadeddata = function() {
				video.currentTime = 0;
				video.play();
		  };
		} else {
		  video.play();
		}
		video.style.display = 'block';
	  } else {
		var $img = $( '#image-tip' );

		$img.attr( 'src', src );
		$img.show();
	  }

	  var left = e.pageX + 30, top = e.pageY - $( '#facilities-tooltip' ).height() + 20;
	  $( '#facilities-tooltip span' ).html( $this.find( '.tooltip-text' ).html() );
	  $( '#facilities-tooltip' ).stop( true, false ).addClass( 'visible' ).css( { left: left, top: top } ).show();

	}).mousemove( function( e ) {
	  if( ! $( '#facilities-tooltip' ).hasClass( 'visible' ) ) return;

	  var left = e.pageX + 30, top = e.pageY - $( '#facilities-tooltip' ).height() + 20;

	  $( '#facilities-tooltip' ).css( { left: left, top: top } ).show();
	}).mouseleave( function() {
	  $( '#facilities-bg img' ).removeClass( 'visible' );

	  //remove the lighter class to the body
	  $( '.parallax .shadow' ).removeClass( 'lighter' );

	  $( '#facilities-tooltip' ).removeClass( 'visible' ).hide();

	  setTimeout( function() {
		if( $( '#facilities-tooltip' ).hasClass( 'visible' ) ) return;

		var video = document.getElementById( 'video-tip' );

		video.pause();
		video.currentTime = 0;
	  }, 100 );

	  $( '#facilities-bg img' ).stop( true, false ).transition( {opacity: 0, scale: 1}, 400 );
	});

	/**
	 * The strips
	 */
	$( '.the-strips li' ).mouseenter( function() {
	  $( '#bg img' ).removeClass( 'active' );
	  $( '#bg .' + $( this ).data( 'image') ).addClass( 'active' );
	});

	/**
	 * Back to top "link"
	 */
	//  $( '#backtop a' ).click( function() {
	//    $( '#dots li' ).first().trigger( 'click' );
	 //
	//    return false;
	//  });

	/*
	 * Change "other developments" view style
	 *
	 * Coverflow / List / Map View
	 */
	$( '#change-view li' ).click( function() {
	  var id = $( this ).data( 'id' );
	  var $div = $( id );

	  $( '#change-view li' ).removeClass( 'current' );
	  $( this ).addClass( 'current' );

	  $( '#devview > div, #myDiv-fluidwidth' ).hide();
	  $div.show();

	  if( $div.data( 'map' ) && ! $div.data( 'initialized' ) ) {
		initGMap( "mapview", $div.data( 'lat' ), $div.data( 'lon' ), true, true );

		$div.data( 'initialized', 1 );
	  }
	});

	//Document ready
	$( document ).ready( function() {
		setTimeout( function() {
		  if( $( '#register' ).length > 0 ) {
				initThePage();
			} else {
				setParallaxContentHeight();
			}
		}, 500 );
	});

	//Render is ready
	$( window ).load( function() {
		//Use this to bypass chrome blurry text. It happens when using transform: translate
		centerForm();

		//Show the content
		setTimeout( function() {
			$( '#vertical-boxes .box1' ).transition( { x: "-100%" } );
			$( '#vertical-boxes .box2' ).transition( { x: "100%" } );
			$( '#loadingText' ).removeClass( 'show' ).addClass( 'to-screen' );

			$( '.parallax .shadow' ).addClass( 'visible' );
			// $( '#register' ).addClass( 'visible' );

			setTimeout( function() {
				$( '#main-parallax' ).find( '#home .text' ).addClass( 'visible' );
				// $( '#register' ).find( '.title' ).first().trigger( 'click' );
				// $( '.property-worth .title' ).trigger( 'click' );

			}, 800 );

		}, 200 );
	});

	//Exit from fullscreen, and set the right icon
	document.addEventListener("keydown", function(e) {
	  if (e.keyCode == 13) {
		$( '.full-screen' ).removeClass( 'exit' );
	  }
	}, false);

	// Form events...
	$( document ).ready(function() {
		var i = true;

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

		// We need to look, if someone types anything in the form, the radio would slide down automatically
		$( '#gform_14' ).find( 'input, select, textarea' ).focus(function(){
			// $( '.toggle-radio' ).trigger( "click" );
		});

		$( '.property-worth .title' ).click( function() {
			if ( $( '.stamp-duty' ).hasClass( 'open' ) ) {
				$( '.stamp-duty' ).toggleClass('open').find( '.form-content' ).slideUp();
			}

			$( this ).parent().toggleClass('open').find( '.form-content' ).slideToggle();
		});

		$( '.stamp-duty .title' ).click( function() {
			if ( $( '.property-worth').hasClass( 'open' ) ) {
				$( '.property-worth' ).toggleClass('open').find( '.form-content' ).slideUp();
			}

			$( this ).parent().toggleClass('open').find( '.form-content' ).slideToggle();
		});
	});

	//Parallax the history strips images
	$( '#history .the-strips' ).scroll( function() {
		animateTheAboutImages();
	});

	$( '#filter-view ul a' ).click( function() {
		$('#filter-view ul li').removeClass('active');
		$(this).parent().addClass('active');

//		$( this + '.active' ).html( $( this ).html() );
		var category = $( this ).data( 'category' );

		$( '#devview .the-strips li' ).each( function() {
			var $this = $( this );
			var height = $this.data( 'height' );
			var opacity = 1;

			if( ! $this.data( 'height' ) ) {
				height = $this.outerHeight();
				$this.data( 'height', height );
			}

			if( category && category !== "" && $this.data( 'category' ) != category ) {
				height = 0;
				opacity = 0;
			} else {
				$this.show();
			}
console.log( category, height );
			$this.stop( true, false ).animate( {height: height, opacity: opacity}, 'slow', function() {
				if( $this.height() === 0 ) $this.hide();
			});
		});
	});

	$( 'a.scroll-down' ).click( function() {
    // $( '#main-parallax-wrapper' ).transition( { y: - contentHeight - 62 }, 1000, 'easeInExpo' );
    $( '#main-parallax-wrapper' ).transition( { y: - contentHeight }, 1000, 'easeInExpo' );

    return false;
  });


		$('#main-parallax').on('finishedMove', function(amount) {
			if( para.currentSlideI == 1 ) {
				setTimeout( function() {
					if( $( 'article .main' ).hasClass( 'visible' ) ) return;
					$( 'article .main, #mouse' ).addClass( 'visible' );

					var tl = new TimelineLite;
					var chars = $( 'article .main span');

					$( 'article .main' ).addClass( 'visible' );

					tl.staggerFrom(chars, 0.6, {opacity:0, scale:0, y:80, rotationX:90, transformOrigin:"left center",  ease:Back.easeOut}, 0.005, "+=0");
				}, 100 );
			}
		});
})(jQuery);

//Stamp duty formula
jQuery( document ).ready( function( $ ) {
	if( $( '#calcprice' ).length <= 0 ) return;

	document.getElementById('calcprice').onclick = function () {

			var getValue = document.getElementById('price_house').value;
			var reg = new RegExp(" ", "g");
			var step = getValue.replace(reg, "");
			var step2 = step.replace(/[&\/\\#,+()$~%.'":*?<>{}A-Za-z£$]/g, "");
			var forcalc = parseInt(step2);
			var stampDuty;
			var flag;

			if (forcalc <= 125000.01) {
					stampDuty = 0;
			}
			else if (forcalc > 125000.01 && forcalc <= 250000.00) {
					stampDuty = (forcalc - 125000) * 0.02;
			}
			else if (forcalc >= 250000.01 && forcalc <= 925000.00) {
					stampDuty = ((forcalc - 250000) * 0.05) + 2500;
			}
			else if (forcalc >= 925000.01 && forcalc <= 1500000.00) {
					stampDuty = ((forcalc - 925000) * 0.1) + 36250;
			}
			else if (forcalc >= 1500000.01) {
					stampDuty = ((forcalc - 1500000) * 0.12) + 93750;
			}
			var comma1 = stampDuty.toFixed(2);
			var comma2 = '';
			flag = false;
			var checklength = comma1.length;

			for (i = 0; i < comma1.length; i++)
			{
					if (checklength == 8) {
							if (i === 2) {
									comma2 += ',' + comma1[i];
							}
							else {
									comma2 += comma1[i];
							}

					}
					else if (checklength == 9) {
							if (i === 3) {
									comma2 += ',' + comma1[i];
							}
							else {
									comma2 += comma1[i];

							}
					}
					else {
							if (comma1[i] === '.') {
									flag = true;
							}
							if ((i % 3) === 1 && flag === false) {
									comma2 += ',' + comma1[i];
							}
							else if ((i % 3) !== 1 && flag === false) {
									comma2 += comma1[i];
							}

							else {
									comma2 += comma1[i];
							}

					}
			}
			document.getElementById('result').innerHTML = '£ ' + comma2;

	};
});
