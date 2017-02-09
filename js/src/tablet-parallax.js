(function($) {

'use strict';

// check for tablet parallax
$( document ).ready( function() {
	if ( $( '#tablet-parallax' ).length ) {
		// we can execute any functions now, related to the parallax
		tabletParallax.init();
		setUpGallery();

		var isDragging = false, dragStart = 0;


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
	 *  Set up the gallery "3D" effect in accordin to current screen size
	 */
	function setUpGallery() {
		var ratio = 16/9;

		$( '#gallery .image' ).height( $( '#gallery .current' ).width() / ratio );
		var mLeft = ( $( '#gallery .current' ).width() - $( '#gallery .images' ).width() ) / 2;
		var mTop = ( $( '#gallery .current' ).height() - $( '#gallery .images' ).height() ) / 2;

		$( '#gallery .image' ).css( { marginLeft: mLeft, top: - mTop } );
	}
});

$( window ).ready( function() {
	$( '#overlay-boxes .box1' ).delay(800).transition( { y: '-200%' }, 800, function() { $( this ).hide(); } );
	$( '#overlay-boxes .box2' ).delay(800).transition( { y: '200%' }, 800, function() { $( this ).hide(); } );
});

var tabletParallax = {
	controls: '#controls',

	init: function() {
		var $this = this;

		this.$mainW = $( '#tablet-parallax' ); // Main Wrapper
		this.$controls = $( this.controls );

		this.pages = this.$mainW.find( '#pages' ).children( 'div' );

		// set the first page as active
		this.$active = this.pages.first()
		this.$active.addClass( 'active' );

		for ( var i = 0; i < this.pages.length; i++ ) {
			// for each page, we need to set up the initial layout, which is the easiest using transform, so after we can animate everyting with ease
			var translateX = ( i ) * 100;

			if ( $( 'body' ).hasClass( 'single-developments' ) ) {
				this.pages.eq( i ).css({
					transform: 'translateY(' + translateX + '% )'
				})
				.data( 'translateX', translateX ); // save it so we have easy access to the value
			} else {
				this.pages.eq( i ).css({
					transform: 'translateX(' + translateX + '% )'
				})
				.data( 'translateX', translateX ); // save it so we have easy access to the value
			}
		}

		this.move();
		this.$controls.trigger( 'moveParallax' );
		this.swipe();

		this.articleHeight();

		this.animateVisibleContent();
		this.paralaxMenu();
		this.secondaryNavigation();

		$( window ).resize( function() {
			$this.articleHeight();
		});
	},
	move: function() {
		var $this = this;

		this.$controls.find( '.control-right' ).click( function() {
			// move to the next slide
			
			if ( $this.pages.last().data( 'translateX' ) == 0 )
				return;
			
			$this.pages.each( function() {
				var translateX = $( this ).data( 'translateX' );
				translateX -= 100;

				if ( $( 'body' ).hasClass( 'single-developments' ) ) {
					$( this ).css({
						transform: 'translateY(' + translateX + '% )'
					})
					.data( 'translateX', translateX );
				} else {
					$( this ).css({
						transform: 'translateX(' + translateX + '% )'
					})
					.data( 'translateX', translateX );
				}
			});

			$this.$active.removeClass( 'active' );
			$this.$active = $this.$active.next();
			$this.$active.addClass( 'active' );

			$this.$controls.trigger( 'moveParallax' );
		});

		this.$controls.find( '.control-left' ).click( function() {
			// move to the previous slide
			
			if ( $this.pages.first().data( 'translateX' ) == 0 )
				return;
			
			$this.pages.each( function() {
				var translateX = $( this ).data( 'translateX' );
				translateX += 100;

				if ( $( 'body' ).hasClass( 'single-developments' ) ) {
					$( this ).css({
						transform: 'translateY(' + translateX + '% )'
					})
					.data( 'translateX', translateX );
				} else {
					$( this ).css({
						transform: 'translateX(' + translateX + '% )'
					})
					.data( 'translateX', translateX );
				}
			});

			$this.$active.removeClass( 'active' );
			$this.$active = $this.$active.prev();
			$this.$active.addClass( 'active' );

			$this.$controls.trigger( 'moveParallax' );
		});

		// hide the controls, once we reach one of the boundaries
		this.$controls.on( 'moveParallax', function() {
			if ( $this.pages.first().data( 'translateX' ) == 0 ) {
				$this.$controls.addClass( 'hide-left' );
			} else {
				$this.$controls.removeClass( 'hide-left' );
			}

			if ( $this.pages.last().data( 'translateX' ) == 0 ) {
				$this.$controls.addClass( 'hide-right' )
			} else {
				$this.$controls.removeClass( 'hide-right' );
			}

			$this.animateVisibleContent();
		});
	},
	swipe: function() {
		var $this = this;

		//Enable swiping...
		$( 'body' ).not('.page-id-90060').swipe( {
			//Generic swipe handler for all directions
			swipeLeft: function( e ) {
				console.log( e.target );
				$this.$controls.find( '.control-right' ).trigger( 'click' );
			},

			swipeRight: function( e ) {
				console.log( e );
				$this.$controls.find( '.control-left' ).trigger( 'click' );
			},

			// default is 75px...
			threshold: 50
		});
	},
	animateVisibleContent: function() {
		var $this = this;

		/**
		 * check if the hidden items are visible, if so show it
		 */
		$( '.show-me' ).each( function() {
			//Animatable elements
			var $animatables = $( this ).find( '.animate-me' );

			if ( $( this ).parents( '[id^=page-]' ).hasClass( 'active' ) ) {
				setTimeout( function() {

					//In some cases I can't use delay, for examples on link, otherwise the color change will takes a lot...
					$animatables.each( function() {
						var $this = $( this );

						//remove the reverted animation
						$this.removeClass( $this.data( 'revert' ) );

						//I have to do it only the first time
						if( $this.data( 'delay' ) ) {

							//Still running the timeout?
							if( $this.data( 'timeout' ) != 1 ) {
								setTimeout( function( $e ) {
									$e.addClass( 'show' );
								}, $this.data( 'delay' ), $this );
							}

							$this.data( 'timeout', 1 );
						} else {
							$this.addClass( 'show' );
						}
					});

				}, 500 );

				// $animatables.addClass( 'show' );

			} else {
				// $animatables.removeClass( 'show' ).data( 'timeout', '' );
				$animatables.data( 'timeout', '' );

				$animatables.each( function() {
					if( $( this ).data( 'revert' ) ) {
						$( this ).addClass( $( this ).data( 'revert' ) );
					} else {
						$( this ).removeClass( 'show' );
					}
				});
			}
		});
	},
	articleHeight: function() {
		if ( this.$mainW.parents('.size-me').length )
			return;

		var $this = this;
		var headerH = $( '.top-bar' ).height();
		var navH = $( '#navigation-menu' ).height();
		var navT = $( '#navigation-menu' ).offset().top;
		var footerH = $( '#foot' ).height();
		var windowH = $( window ).height();

		$this.$mainW.find( 'article' ).each( function() {
			$( this ).css({
				maxHeight: windowH - footerH - headerH - navH - 10,
			});

			// position articles so they are not behind the nav menu
			var marginT = 0;
			if ( $( this ).offset().top < navT + navH ) {
				marginT = ( navH + navT - $( this ).offset().top ) / 2 + 15;
			}

			$( this ).css({
				marginTop: marginT
			});
		});

	},
	paralaxMenu: function() {
		var $this = this;

		$( '.parallax-menu a,  a.bouncy' ).click( function() {
			var searchId = $( this ).attr( 'href' ).replace( '#', '' );

			var prevPages = $this.$active.prevAll();
			var nextPages = $this.$active.nextAll();
			var goTo = 0;

			// search the previous pages
			prevPages.each( function() {
				if ( $( this ).data( 'id' ) == searchId ) {
					goTo = -1;
					return false;
				}
			});

			// search the next pages
			if ( goTo != -1 ) {
				nextPages.each( function() {
					if ( $( this ).data( 'id' ) == searchId ) {
						goTo = 1;
						return false;
					}
				});
			}

			if ( goTo != 0 ) { // it should be 0 only if we click to the current page

				if ( goTo == 1 )
					$( $this.$controls.find( '.control-right' ).trigger( 'click' ) );

				if ( goTo == -1 )
					$( $this.$controls.find( '.control-left' ).trigger( 'click' ) );

				if ( $this.$active.data( 'id' ) != searchId ) {

					var menuSteps = setInterval( function() {
						if ( goTo == 1 )
							$( $this.$controls.find( '.control-right' ).trigger( 'click' ) );

						if ( goTo == -1 )
							$( $this.$controls.find( '.control-left' ).trigger( 'click' ) );

						if ( $this.$active.data( 'id' ) == searchId )
							clearInterval( menuSteps );
					}, 800 );
				}
			}
		});
	},
	secondaryNavigation: function() {
		var $this = this;
		$( '.navigation-menu .second li a, .devview' ).click( function() {
			// get the href tag
			var href = $( this ).attr( 'href' );

			// when href = # or nothing, the script will terminate
			if ( href.length < 2 )
				return false;

			// search for the page.
			//  first start with the pages located next to the current
			if ( $this.$active.nextAll( href ).length > 0 ) {
				// move next until the active page will be with the id href
				while ( $this.$active.attr( 'id' ) != href.substring( 1 ) ) {
					$this.$controls.find( '.control-right' ).trigger( 'click' );
				}
			} else if ( $this.$active.prevAll( href ).length > 0 ) {
				// move backwards until the active page will be with the id href
				while ( $this.$active.attr( 'id' ) != href.substring( 1 ) ) {
					$this.$controls.find( '.control-left' ).trigger( 'click' );
				}
			}
		});
	}
}

$( window ).load( function() {
	setTimeout( function() {
		$( '.parallax-menu a' ).each( function() {
			if ( window.location.hash == $( this ).attr( 'href' ) ) {
				$( this ).trigger( 'click' );
				return false;
			}
		});

		// on knowledge we dont have a menu, so we need to go there manually :)
		// if ( window.location.hash == '#knowledge' ) {
		// 	$( '.control-right' ).trigger( 'click' );
		// }
	}, 500 );
});

})(jQuery);