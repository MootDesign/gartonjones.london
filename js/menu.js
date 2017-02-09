/**
 * Menu.js
 *
 * This script is used to manage the interaction with the website main menu
 */ 
(function($) {
	
	$( document ).ready( function() {
		/**
		 * Show the menu
		 */
		$( '#mtrigger a' ).click( function() {
			$( '.site-menu' ).addClass( 'visible' );
		});

		/**
		 * This routine take care about the menu items animation.
		 */
		$( '.site-menu .menu-item' ).click( function() {
			//There is any selected item?
			if( $( '.big-menu-item' ).length > 0 ) {
				destroyBigItem( $( this ) );
			} else {
				flipItem( $( this ) );
			}
		});

		/**
		 * Close the menu
		 */
		$( '.site-menu .close-me' ).click( function() {
			if( $( '.big-menu-item' ).length > 0 ) {
				//Revert the menu position & size
				$( '.site-menu .menu-list' ).removeClass( 'zoomed' ).transition( { scale: 1, y: 0, x: 0 }, 200, 'linear' );			

				$( '.big-menu-item' ).data( 'origin' ).css( { opacity: 1 } );
				$( '.big-menu-item' ).remove();
			}

			$( '.site-menu' ).removeClass( 'visible' );
		});

		//Close the big menu item
		$( 'body' ).on( 'click', '.big-menu-item', function () {
			if( $( this ).hasClass( 'loading' ) ) return;

			destroyBigItem( true );
		});

		/**
		 * Open the link
		 */
		$( 'body' ).on( 'click', '.big-menu-item a', function() {
			var $big = $( '.big-menu-item' );

			$big.addClass( 'loading' );
			$big.find( '*' ).fadeOut( function() {
				$( this ).remove();
			});

			$big.transition( { 
								height: $(window).height(), 
								y: -$big.position().top
							 }, 
			 function() {
			 	$( this ).transition( {
					width: $(window).width(),
					x: -$( this ).position().left
				});
			 }
		    );

			return false;
		});

		/*
		 * The menu items that has a video tag, play it on mouse hover
		 */
		 $( '.site-menu .menu-item.has-video' ).mouseenter( function() {
		 	var $this = $( this );
		 	$video = $this.find( 'video' );

	 		//Center the video in the div
	 		$video.css( { left: ( $this.width() - $video.width() ) / 2 } );
		 	$video.addClass( 'play' );

		 	//Dom element
	 		var element = $video.get();
	 		element[0].play();
		 }).mouseleave( function() {
		 	var $this = $( this );
		 	var $video = $this.find( 'video' );

		 	//Dom element
	 		var element = $video.get();
	 		element[0].pause();
	 		element[0].currentTime = 0;

			$video.removeClass( 'play' );		 	
		 });
	});

	/*
	 * For the clicked item:
	 *		1) Clone and hide it
	 *		2) Scale the menu "menu-list" element
	 *		3) Flip the cloned item
	*/
	var flipItem = function( $this ) {
		// 1) Clone the current item
		$clone = $( '<div>' ).append( $this.html() );

		//Set the classes
		$clone.addClass( 'big-menu-item menu-item-' + $this.index() ).data( 'origin', $this );
		$clone.find( 'video' ).remove();

		//Get the parent offset to get the right absolute position
		var ulOffset = $this.parent().offset();
		var position = $this.position();

		//Overlay to the current one
		$clone.css( { 
						top: position.top + ulOffset.top, 
						left: position.left + ulOffset.left,
						width: $this.outerWidth(),
						height: $this.outerHeight() 
					} );

		//Hide the original one
		$this.css( { opacity: 0 } );

		//Add the clone to the document
		$( 'body' ).append( $clone );

		// 2) Scale the menu-list element
		var nsize = { width: $this.outerWidth() * 0.8, height: $this.outerHeight() * 0.8 };
		var translate = { 
							x: ( $this.outerWidth() - nsize.width ) / 2,
							y: ( $this.outerHeight() - nsize.height ) / 2
						}
		if( $this.offset().top < 100 ) translate.y *= -1;
		if( $this.offset().left < jQuery( document ).width() / 2 ) translate.x *= -1;

		console.log( translate );
		$( '.site-menu .menu-list' ).addClass( 'zoomed' ).transition( { scale: 0.8, y: translate.y, x: translate.x }, 200, 'linear' );			

		flipIt( $clone, -90 );
	}

	/*
	 * Make the flip animation
	 *
	 * @param $clone item to flip
	 * @param itemToFlip (optional ) boolean/object. If boolean just exit to the loop after the big item is been destroyed.
	 					 							 Object is the next jquery item to be selected
	 */
	var flipIt = function( $clone, angle, itemToFlip ) {
		$clone.toggleClass( 'flip' ).transition( { perspective: '1000px', rotateX: angle + 'deg'}, 200, 'linear', function() {
			$( this ).toggleClass( 'visible' );
		} );

		setTimeout( function( $e, angle, itemToFlip ) {
			$e.transition( { rotateX: ( angle * -1 ) + 'deg' }, 0 );
			$e.transition( { rotateX: '0deg' }, 200, 'linear', function() {
				$( this ).addClass( 'active' );
			} );

/*			if( itemToFlip != undefined ) {
				var $big = $( '.big-menu-item' );
				var $origin = $( $big.data( 'origin' ) );
				$origin.show();

				$big.remove();
				flipItem( itemToFlip );
			}
*/		}, 200, $clone, angle, itemToFlip );

		if( itemToFlip != undefined ) {
			setTimeout( function( itemToFlip ) {
				var $big = $( '.big-menu-item' );
				$big.data( 'origin' ).css( { opacity: 1 } );

				$big.remove();

				//Is it object?
				if( typeof( itemToFlip ) == 'object' ) {
					flipItem( itemToFlip );
				}
			}, 400, itemToFlip );
		}

	}

	/*
	 * Destroy the big menu item, if the parameter is true, just destroy it ( so without select another one )
	 */
	var destroyBigItem = function( next ) {
		//Revert the menu position & size
		$( '.site-menu .menu-list' ).removeClass( 'zoomed' ).transition( { scale: 1, y: 0, x: 0 }, 200, 'linear' );			

		//Unflip it
		flipIt( $( '.big-menu-item' ), 90, next );
	}

})(jQuery);