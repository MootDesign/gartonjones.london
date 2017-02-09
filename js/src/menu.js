/**
 * Menu.js
 *
 * This script is used to manage the interaction with the website main menu.
 *
 * When I click on menu item, all the Items, except the clicked on, will be scaled. While the active one is flipped and show its sub-menu.
 * To have a better effect we don't scale each single item, but all the container. Before do it we clone the current menu item and hide it.
 * So after we scale all the site-menu element :)
 */
(function($) {

	$( document ).ready( function() {
	var lastScrollTop = 45, delta = 5;
	
	// parallax first page force
	$( '#navigation-menu .first a' ).each( function() {
		if ( $( this ).attr( 'href' ).indexOf( 'news-parallax' ) > -1 ) {
			$( this ).attr( 'href', '/news-parallax/#news' );
		} else if ( $( this ).attr( 'href' ).indexOf( 'knowledge-parallax' ) > -1 ) {
			$( this ).attr( 'href', '/knowledge-parallax/#knowledge' );
		}
	});

	$(window).scroll(function(event){
	
	});
		/**
		 * The flip animation is done.
		 *
		 * @param $e is the item who sent the event
		 */
		$( 'body' ).on( 'flipComplete', function( e, element ) {
			//Has the "menu" sub items?
			var $element = $( '.big-menu-item' ).data( 'origin' );
			var hasSubItems = $element.find( 'ul > li' ).length > 0;

			// //No subitem open the "url" defined in the back-end
			if( ! hasSubItems ) {
				var link = $element.data( 'url' );

				// cokkie skip each parallax...
				var skipParallax
				if ( Cookies.get('_gj_skip_parallax') ) {
					skipParallax = JSON.parse( Cookies.get('_gj_skip_parallax') );
				} else {
					skipParallax = {}
				}

				if ( link == '/knowledge/' && ( ! skipParallax.knowledge ) ) {
					link = '/knowledge-intro/#knowledge';

					skipParallax.knowledge = true;
				}

				Cookies.set('_gj_skip_parallax', JSON.stringify( skipParallax )) ;

				if( link !== "" ) {
					openTheLink( link );

					return false;
				}
			}

			// only check for the parallax links if it wasn't set to be skipped before
			if ( ! Cookies.get( 'skip-parallax' ) || Cookies.get( 'skip-parallax' ) == 0 ) {
				// if the cookies is set to not to skip the parallax, we need to divert the url
				$( '.big-menu-item' ).find( 'ul > li a' ).each( function() {
					var title = $( this ).data( 'title' );

					switch( title ) {
						case 'News':
							$( this ).attr( 'href', '/news-parallax/#news' );
							console.log( this )
							break;
						case 'Blog':
							$( this ).attr( 'href', '/news-parallax/#blog' );
							break;
						case 'Press':
							$( this ).attr( 'href', '/news-parallax/#press' );
							break;
						case 'All about London':
							$( this ).attr( 'href', '/knowledge-parallax/#knowledge' );
							break;
						case 'Video':
							$( this ).attr( 'href', '/developments-parallax/#video' );
							break;
					}
				});
			}
		});

		// on mobile we need to adjust the height to the screen height
		// minimum height has to be 60px
		if ( $( window ).width() < 767 ) {
			var windowH = $( window ).height();
			var headerH = $( '.top-bar' ).height();
			var footerH = $( '.site-footer' ).height();

			var menuH = ( windowH - headerH - footerH ) / 8;

			$( '.site-menu .menu-list .menu-item' ).css({
				height: menuH
			}).data( 'menuH', menuH );
		}

		$( window ).resize( function() {
			// on mobile we need to adjust the height to the screen height
			// minimum height has to be 60px
			if ( $( window ).width() < 767 ) {
				var windowH = $( window ).height();
				var headerH = $( '.top-bar' ).height();
				var footerH = $( '.site-footer' ).height();

				var menuH = ( windowH - headerH - footerH ) / 8;

				$( '.site-menu .menu-list .menu-item' ).css({
					height: menuH
				}).data( 'menuH', menuH );
			} else {
				$( '.site-menu .menu-list .menu-item' ).css({
					height: ''
				});
			}

			// resize the menu holder as well
			var menuH = $( window ).height() - $( '.top-bar' ).height() - $( '.site-footer' ).height();
			$( '#menu' ).css({
				height: menuH
			})
		});


		$( '#mobilemenutrigger a' ).click( function() {
			$( this ).find( '.hamburger' ).toggleClass( 'close' );
			$( '#mtrigger a#changethis' ).trigger( 'click' );
		});

		/**
		 * Show the menu
		 */
		$( '#mtrigger a#changethis, .show-menu' ).click( function() {
			// hide the pigeon
			setTimeout( function() {
				$( '#register' ).toggle();
			}, 250 );

			// apply position: fixed through a class on the menu so it doesn't scroll up & down on some pages
			$( '.top-bar' ).toggleClass( 'expanded' );

			var $site = $( '.site-menu' );

			var isOpen = $site.hasClass( 'visible' );

	      //Hide the bottomlogo2 and show the top one when is
	      //Store if it was visible before hide it
	      var $blogo = $( '.bottomlogo2 img' );
	      var $tlogo = $( '.toplogo' );

	      if( $blogo.data( 'isVisible' ) === undefined ) {
	          $blogo.data( 'isVisible', $blogo.is( ':visible' ) );
	      }

	        if( ! isOpen ) {
				//Calculate the right height
				var height = document.documentElement.clientHeight;
				var navHeight = $( '.top-bar' ).height();

				if ( $( window ).width() < 767 ) {
					height = height - navHeight;
				} else {
					height = height - ( navHeight * 2 ) - 12; // - $( '#foot' ).height();
				}

				$site.height( height ).toggleClass( 'visible' ).css( 'top', navHeight);

				$tlogo.addClass( 'visible' );
				$blogo.fadeOut();

				$( '#foot .gradient' ).fadeOut();

				//Toggle Menu/Close
				$( '#changethis' ).html( "close" );

				showClose( 500, '#menu' );
			} else {
		        $( '.site-menu .button-close' ).trigger( 'click' );

				if( $blogo.data( 'isVisible' ) ) {
					$blogo.fadeIn();
					$tlogo.removeClass( 'visible' );
				}

				$( '#foot .gradient' ).fadeIn();
		      	$( this ).html( "menu" );
			}

			//Toggle Menu/Close
			return false;
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

		$( '.site-menu .menu-item a' ).click( function() {
			var link = $( this ).attr( 'href' );

			openTheLink( link );

			$( '#mobilemenutrigger a' ).trigger('click');

			$( 'body' ).trigger( 'mobileChangePage' );
		});

		/**
		 * Close the menu
		 */
		$( '.site-menu .button-close' ).click( function() {
			// show the bloody pigeon
			setTimeout( function() {
				$( '#register' ).toggle();
			}, 250 );
			
			var delay = 600;

			$( '#menu .button-close, #menu .button-close *' ).removeClass( 'open' );

			if( $( '.big-menu-item' ).length > 0 ) {
				destroyBigItem( true );

				delay = 600;
			}

			setTimeout( function() {
				$( '.site-menu' ).removeClass( 'visible' );
                $( '#changethis' ).html( "menu" );
			}, delay );
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
			var link = $( this ).attr( 'href' );

			destroyBigItem( true );

			openTheLink( link );

			return false;
		});

		/*
		 * The menu items that has a video tag, play it on mouse hover
		 */
		// play it only if we are not on mobile
		if ( $( window ).width() > 768 ) {
			 $( '.site-menu .menu-item.has-video' ).mouseenter( function() {
			 	var $this = $( this );
			 	$video = $this.find( 'video' );

		 		if( $( this ).hasClass( 'menu-item-7' ) ) {
		 			$video.css( { left: 'auto', right: 0 } );
		 		} else {
			 		//Center the video in the div
			 		$video.css( { left: ( $this.width() - $video.width() ) / 2 } );
		 		}

			 	$video.addClass( 'play' );

			 	//Dom element
		 		var element = $video.get();
		 		element[0].play();
		 		element[0].currentTime = 0;
			 }).mouseleave( function() {
			 	var $this = $( this );
			 	var $video = $this.find( 'video' );

			 	//Dom element
		 		var element = $video.get();
		 		element[0].pause();
		 		element[0].currentTime = 0;

				$video.removeClass( 'play' );
			 });

			 $( '.site-menu .menu-item.has-music' ).mouseenter( function() {
			 	var $this = $( this );
			 	$music = $this.find( 'audio' );

			 	$music.addClass( 'play' );

			 	//Dom element
		 		var element = $music.get();
		 		element[0].play();
		 		element[0].currentTime = 0;
			 }).mouseleave( function() {
			 	var $this = $( this );
			 	var $music = $this.find( 'audio' );

			 	//Dom element
		 		var element = $music.get();
		 		element[0].pause();
		 		element[0].currentTime = 0;

				$music.removeClass( 'play' );
			 });
		}
	});

	/**
	 * Zoom the "big box" and open the url
	 */
	 var openTheLink = function( link ) {
		var $big = $( '.big-menu-item' );

		$big.addClass( 'loading' );
		$big.fadeOut('slow', function() {
			$(this).remove();
		});

        //Same page, do nothing...
        if( link != window.location ) {
            // $( 'body' ).fadeOut( 'slow', function() {
            // NOTE: Fade out the menu-list instead of the body
            // Body would cause a glitch, where the bck image would fade last, and not together with the rest of the elements. Looks like a Flash
        	$('.menu-list').fadeOut( 'slow', function() {
                //Close the menu first

                window.location.href = link;

                // NOTE: Checking, if the page contains an ID symbol. Usually this means, that it can be accessed from the same page
                if (link.search('#') != -1 ) {
			        $( '.site-menu .button-close' ).trigger( 'click' );
	                $( this ).delay(1000).fadeIn(); // NOTE: if we click the link to the same page, the body goes blank. This should fix it.
	            }
            });


        } else {
	        $( '.site-menu .button-close' ).trigger( 'click' );
	    }
	};

	/*
	 * For the clicked item:
	 *		1) Clone and hide it
	 *		2) Scale the menu "menu-list" element
	 *		3) Flip the cloned item
	*/
	var flipItem = function( $this ) {
		if ( $( window ).width() < 767 ) {
			// first make sure no menu item is opened

			if ( $this.find( 'ul li' ).length == 0 ) {
				window.location.assign( $this.data('url') );
			}

			$( '.site-menu .menu-list .menu-item' ).children( 'h3' ).show();
			$( '.site-menu .menu-list .menu-item' ).children( 'ul' ).hide();
			$( '.site-menu .menu-list .menu-item' ).animate({
				height: parseInt( $( '.site-menu .menu-list .menu-item' ).data( 'menuH' ) )
			}, 600 );

			if ( $this.hasClass( 'open-menu' ) ) {
				$( '.site-menu .menu-list .menu-item' ).removeClass( 'open-menu' );
				return false;
			}
			
			$( '.site-menu .menu-list .menu-item' ).removeClass( 'open-menu' );

			$( $this ).finish().animate({
				height: 285
			}, 600, function() {
				$this.addClass( 'open-menu' )
			} );

			setTimeout( function() {
				$this.children( 'h3' ).fadeOut();
				$this.children( 'ul' ).fadeIn();
			}, 500 );

			return false;
		}

		// 1) Clone the current item
		$clone = $( '<div>' ).append( $this.html() );

		//Set the classes
		$clone.addClass( 'big-menu-item menu-item-' + $this.index() ).data( 'origin', $this );
		$clone.find( 'video' ).remove();

		//Get the background-image
		$clone.css( 'background-image', $this.css( 'background-image' ) );

		//Get the parent offset to get the right absolute position
		var ulOffset = $this.parent().offset();
		var position = $this.position();


		//If a corner element? If so, adjust the left position and void the "gap" with the rest of the menu
		//Left corner items
		if( ( $this.index() ) % 4 === 0 ) {
			/*
			 * The menu final menu size will be 80% of the original one.
			 * So I have to scale the clone left position by the same amount.
			 */
			 var widthDiff = $( '.site-menu .menu-list' ).width();
			 widthDiff -= $( '.site-menu .menu-list' ).width() * 0.89;

			 var nleft = widthDiff / 2;
			//  console.log( "n", nleft );

			 //Store the value in the data, because I need to animate it for a smooth movement
			 $clone.data( 'x', nleft );
		}

		//Right corner items
		if( ( $this.index() + 1 ) % 4 === 0 ) {
			/*
			 * The menu final menu size will be 80% of the original one.
			 * So I have to scale the clone left position by the same amount.
			 */
			 var nleft = position.left * 0.925;

			 $clone.data( 'x', nleft - position.left );
		}

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
						};
		if( $this.offset().top < 100 ) translate.y *= -1;
		if( $this.offset().left < jQuery( document ).width() / 2 ) translate.x *= -1;

		if ( $( window ).width() > 767 ) {
			$( '.site-menu .menu-list' ).addClass( 'zoomed' ).transition( { scale: 0.8, y: translate.y, x: translate.x }, 200, 'linear' );
		} else {
			$( '.site-menu .menu-list' ).addClass( 'zoomed' );
			// need to make the original menu height big
			$( '.big-menu-item' ).css({
				top: $this.offset().top + $this.height() + 35
 			});
			$this.animate({
				height: 285
			}, 375 );
		}
		flipIt( $clone, -90 );

		var close = '<div class="button-close" style="top: 5px; right: 5px;"><div class="circle-arc"><svg width="100%" viewBox="0 0 100 100"><path d="M 50 50 m -43 0 a 43 43 0 1 1 86 0 a 43 43 0 1 1 -86 0"></path></svg></div><div class="bg"><div></div></div><div class="line l-0"></div><div class="line l-1"></div></div>';

		if ( $( window ).width() < 767 ) {
			$clone.append( close );

			showClose( 600, '.big-menu-item' );
		}
	};

	/*
	 * Make the flip animation
	 *
	 * @param $clone item to flip
	 * @param itemToFlip (optional ) boolean/object. If boolean just exit to the loop after the big item is been destroyed.
	 					 							 Object is the next jquery item to be selected
	 */
	var flipIt = function( $clone, angle, itemToFlip ) {
		//Apply the translate only if the "big menu item" is not flip yet.
		var translateX = parseInt( $clone.data( 'x' ) ) * ( angle < 0 );

		/*
		 * Make half animation. When angle:
		 *	< 0: I'm flipping the main face
		 *	> 0: the back ( the menu )
		 */
		if ( $( window ).width() > 767 ) {
			$clone.toggleClass( 'flip' ).transition( { perspective: '1000px', rotateX: angle + 'deg', x: translateX }, 200, 'linear', function() {
				$( this ).toggleClass( 'visible' );
			});
		} else {
			// $clone.toggleClass( 'flip' ).transition( {}, 200, 'linear', function() {
				$clone.toggleClass( 'visible' );
				

				if ( $clone.height() == 285 ) {
					$clone.css({ height: $clone.data( 'height' )  });
				} else {
					$clone.data( 'height', $clone.height() );
					$clone.css({ height: 285 });
					$( 'body' ).trigger( 'flipComplete', $( this ) );
				}

				$clone.addClass( 'active' );
			// });
		}

		/**
		 * Complete the rotation
		 */
		if ( $( window ).width() > 767 ) {
		
			setTimeout( function( $e, angle, itemToFlip ) {
				var eventType = ( itemToFlip === undefined ) ? "flipComplete" : "";

				$e.transition( { rotateX: ( angle * -1 ) + 'deg' }, 0 );
				$e.transition( { rotateX: '0deg' }, 200, 'linear', function() {
					$( this ).addClass( 'active' );

					/*
					 * Send the flipComplete event, so if need to do same manupilation just listen it :)
					 */
					if( eventType ) {
						$( 'body' ).trigger( 'flipComplete', $( this ) );
					}
				} );
			}, 200, $clone, angle, itemToFlip );

		}

		/**
		 * itemToFlip is empty when no other menu item if flipped.
		 * So, if isn't :
		 *		1) I have to return the old selected item in its original position ( unflipping it )
		 *		2) destroy the "big-menu-item" ( I need just one of it )
		 *		3) flip the new item :)
		 */
		if( itemToFlip !== undefined ) {
			setTimeout( function( itemToFlip ) {
				var $big = $( '.big-menu-item' );
				$big.data( 'origin' ).css( { opacity: 1 } );

				$big.remove();

				//Is it object?
				if( typeof( itemToFlip ) == 'object' ) {
					flipItem( itemToFlip );
				}

				$( 'body' ).trigger( 'flipDestroyes' );
			}, 400, itemToFlip );
		}

	};

	/*
	 * Destroy the big menu item, if the parameter is true, just destroy it ( so without select another one )
	 */
	var destroyBigItem = function( next ) {
		//Revert the menu position & size
		$( '.site-menu .menu-list' ).removeClass( 'zoomed' ).transition( { scale: 1, y: 0, x: 0 }, 200, 'linear' );

		if ( $( window ).width() < 767 ) {
			var windowH = $( window ).height();
			var headerH = $( '.top-bar' ).height();
			var footerH = $( '.site-footer' ).height();

			var menuH = ( windowH - headerH - footerH ) / 8;


			$( '.site-menu .menu-list .menu-item' ).animate({
				height: menuH
			}, 200 ).data( 'menuH', menuH );
		}

		//Unflip it
		flipIt( $( '.big-menu-item' ), 90, next );
	};

	$(document).ready(function() {
		// $( '.to-worth.slide' ).click( function() {
		// 	$( '#big-menu' ).addClass( 'open' );

		// 	var scrollTop = $(this).data('scroll-to');
		// 	scrollTop = $( scrollTop ).position().top;

		// 	$('#worth .the-strips').animate({
		// 		scrollTop: scrollTop
		// 	});

		// 	$( '#big-menu' ).find('.button-close').addClass('open');
		// });
		// $( '#big-menu .button-close' ).click( function() {
		// 	$( '#big-menu' ).removeClass( 'open' );
		// });
		//
		$( '#big-menu' ).find( '.button-close' ).click(function() {
			$( this ).removeClass( 'open' );
			$( '#big-menu' ).removeClass( 'open' );
		});

		//Property search popup
		$( '.search-popup' ).click( function() {
			$( '#search-popup' ).addClass( 'visible' );
			showShade( 100 ,true);
			showClose( 1000, '#search-popup' );

			var v = document.getElementById( 'video-search' );
			v.play();
		});
	});
})(jQuery);

jQuery( document ).ready( function() {
(function($){
	var ANIMATION_DELAY = 200;
	var SPAN_DELAY = 100;
	var FAT_SPEED = 900;
	var interval = 0, timeout = 0;
	var $activeItem;

	var animateNavigationMenu = function( $menu ) {
		var middle = $menu.find( '.first' ).width() / 2;
		var $li = $menu.find( '.first li' );
		var length = Math.floor( $li.length / 2 );

		/*
		 * When the # of items is odd, I don't have any item on the center,
		 * so I have to adjust the position in according to the middle ( class ) one.
		 */
		var isEven = $li.length % 2 === 0;
		if( isEven ) {
			var $middle = $( $li.get( length ) );
			middle += ( $middle.position().left - middle ) + ( $middle.outerWidth() / 2 );
		}

		//Translate the item into the middle, and after remove the
		//translation to have a nice animation :)
		$li.each( function( index ) {
			var $this = $( this );
			var position = $this.position();

			var center = middle - ( $this.outerWidth() / 2 );
			// position.left *= ( position.left < center ) ? -1 : -1;
			center -= position.left;

			var translate = "translateX( " + center + "px)";
			$this.css({
			    "webkitTransform": translate,
			    "MozTransform": translate,
			    "msTransform": translate,
			    "OTransform": translate,
			    "transform": translate
			});

			var delayIndex = length - index;
			var delay = ANIMATION_DELAY * Math.abs( delayIndex );

			setTimeout( function( $this, index ) {
				$this.addClass( 'visible' );
				if( index === 0 ) $this.addClass( 'middle' );

				$this.css({
				    "webkitTransform": "",
				    "MozTransform": "",
				    "msTransform": "",
				    "OTransform": "",
				    "transform": ""
				});
			}, delay, $this, delayIndex );
		});

		/*
		 * Calculate the width of the line
		 */
		var lineWidth = $menu.find( '.first' ).outerWidth();
		lineWidth -= $li.first().outerWidth() / 2;
		lineWidth -= $li.last().outerWidth() / 2;

		// 14 is the size of half circle
		setTimeout( function( $menu, lineWidth ) {
			$menu.find( '.line' ).addClass( 'visible' ).width( lineWidth ).css( { marginLeft: -lineWidth / 2 - 5 } );
		}, ANIMATION_DELAY * ( length + 1 ), $menu, lineWidth );

		//Show the labels
		setTimeout( function( $li ) {
			$li.each( function( index ) {
				var $span = $( this ).find( 'span' );

				setTimeout( function() {
					$span.addClass( 'visible' );
				}, index * SPAN_DELAY, $span );
			});

			setTimeout( function() {
				animateSecondNavigationMenu();
			}, ANIMATION_DELAY );
		}, ANIMATION_DELAY * ( length + 2 ), $li );
	};

	var animateSecondNavigationMenu = function() {
		var $li = $( '#navigation-menu .second li' );
		if( $li.length <= 0 ) return;

		$li.each( function( index ) {
			setTimeout( function( $li ) {
				$li.addClass( 'visible' );
			}, index * ( SPAN_DELAY * 2 ), $( this ) );
		});

		var lineWidth = $li.parent().outerWidth();
		lineWidth -= $li.last().outerWidth() / 2;

		var thinWidth = $( '#navigation-menu .second' ).outerWidth();
		thinWidth -= $li.last().outerWidth() / 2;
		thinWidth -= $( '#navigation-menu .second .line-thin' ).position().left;

		setTimeout( function( lineWidth ) {
			$( '#navigation-menu .second .line-fat' ).addClass( 'visible' );
			$( '#navigation-menu .second .street-sign + li a' ).trigger( 'click' );

			setTimeout( function( thinWidth ) {
				$( '#navigation-menu .second .line-thin' ).addClass( 'visible' ).width( thinWidth );
			}, FAT_SPEED, thinWidth );
		}, SPAN_DELAY * $li.length + FAT_SPEED, lineWidth );
	};

	var updateThinAndFatLine = function() {
		var $e = $( '#navigation-menu .second' );
		var $li = $( '#navigation-menu .second li' );
		var thinWidth = $e.outerWidth();

		thinWidth -= $li.last().outerWidth() / 2;
		thinWidth -= $( '#navigation-menu .second .line-thin' ).position().left;

		$( '#navigation-menu .second .line-thin' ).addClass( 'resize' ).width( thinWidth );

		var w = $activeItem.position().left - $( '#navigation-menu .second .line-fat' ).position().left + $activeItem.outerWidth() / 2;
		$( '#navigation-menu .second .line-fat' ).width( w - 10 );
	};

	$( document ).ready( function() {
		$( '.navigation-menu .second a' ).click( function() {
			var $this = $( this );
			var noUpdateWidth = false;

			//Remove all the active items and close the subitems
			$( '#navigation-menu .second a' ).removeClass( 'active full' );
			$( '#navigation-menu .second li' ).removeClass( 'active full' );

			if( ! $this.parent().hasClass( 'sub-item' ) ) {
				if( $( '#navigation-menu .second li.open' ).length > 0 ) {
					$( '#navigation-menu .second li' ).removeClass( 'open' );

					noUpdateWidth = true;
				}
			}

			//Set the full circle to all the
			if( $( this ).closest( '.navigation-menu' ).hasClass( 'noall' ) ) {
				$( this ).closest( '.second' ).find( 'a' ).removeClass( 'full' );
				$( this ).parent().addClass( 'full' );
			} else {
				var index = $this.parent().index();
				for( i = 0; i < index; i++ ) {
					var li = $( '#navigation-menu .second li' ).get( i );

					$( li ).find( 'a' ).addClass( 'full' );
				}
			}

			//Has a subitems?
			if( ! $this.parent().hasClass( 'sub-item' ) &&
			 		$this.parent().next().hasClass( 'sub-item' ) ) {
				var index = $this.parent().index();
				var $li = $( '#navigation-menu .second li' );

				for( i = index + 1; i < $li.length; i++ ) {
					var li = $li.get( i );

					if( ! $( li ).hasClass( 'sub-item' ) ) break;
					$( li ).addClass( 'open' );
				}

				noUpdateWidth = true;
			}

			$this.addClass( 'active' );

			if( ! noUpdateWidth ) {
				var w = $( this ).parent().position().left - $( '#navigation-menu .second .line-fat' ).position().left + $( this ).parent().outerWidth() / 2;
				var v = $( this ).parent().hasClass( 'sub-item' ) ? 3 : 10;
				$( '#navigation-menu .second .line-fat' ).width( w - v );
			} else {
				clearInterval( interval );
				clearTimeout( timeout );
				interval = setInterval( updateThinAndFatLine, 10 );

				timeout = setTimeout( function() {
					clearInterval( interval );

					$( '#navigation-menu .second .line-fat' ).removeClass( 'resize' );

					$active = $( '#navigation-menu li a.active' ).parent();
					var w = $active.position().left - $( '#navigation-menu .second .line-fat' ).position().left + $active.outerWidth() / 2;
					$( '#navigation-menu .second .line-fat' ).width( w - 10 );

					setTimeout( function() {
						var $active = $( '#navigation-menu li a.active' ).parent();
						var $next = $active.next();
						// if( $next.hasClass( 'sub-item' ) ) {
						// 	$next.find( 'a' ).trigger( 'click' );
						// }
					}, 10);

				}, 500 );
			}

			$activeItem = $( '#navigation-menu li a.active' ).parent();

			return false;
		});
	});

	/**
	 * The page with the parallax I'm have to check if it is visible, otherwise I
	 * have to set the bar a static, not fixed.
	 */
	$( document ).ready( function() {
		if( $( '#parallax-wrapper' ).length > 0 ) {
			if( $( '#parallax' ).length <= 0 ) {
				$( '#navigation-menu' ).addClass( 'relative' );
			}
		}

		if( $( '#navigation-menu' ).hasClass( 'onload' ) ) {
			setTimeout( function() {
				$( '.navigation-menu' ).each( function() {
					animateNavigationMenu( $( this ) );
				});
			}, 500 );
		}
	});

	$( window ).load( function() {
		if( ! $( '#navigation-menu' ).hasClass( 'onload' ) ) {
			$( '.navigation-menu' ).each( function() {
				animateNavigationMenu( $( this ) );
			});
		}

		// animateSecondNavigationMenu();
	});
})(jQuery);
});

jQuery( document ).ready( function() {
(function($){
	var DELAY = 100;
	var TITLE_DELAY = 300;
	var DURATION = 1000;
	var LINE_DURATION = 200;

	var showTheTubeLine = function() {
			$( '#back-history .tube' ).each( function( i ) {
				var $this = $( this );
				var width = $this.closest( '.items' ).outerWidth() - $( this ).position().left;
				if( $this.hasClass( 'tube-last' ) ) {
					width /= 2;
				}

				$( this ).delay( DURATION + i * LINE_DURATION ).animate( { width: width }, LINE_DURATION, 'linear' );
			});
	};

	$( '#back-button' ).click( function() {
		$( '#back-history' ).addClass( 'visible' );

		$( '#back-history .items' ).each( function( i ) {
			var $this = $( this ).find( '.shade' );
			var w = $this.data( 'width' );

			$this.delay( DELAY * ( i + 1 ) ).animate( {width: w }, DURATION, 'easeOutExpo' );
		});

		setTimeout( function() {
			$( '#back-history .items' ).each( function( i ) {
				setTimeout( function( $this ) {
					if( $this.find( '.button-close' ).length > 0 ) {
						$this.find( '.button-close' ).addClass( 'open' );

						showTheTubeLine();
					} else {
						$this.find( 'a' ).addClass( 'visible' );
					}
				}, TITLE_DELAY * i, $( this ) );
			});
		}, DURATION * 1 ); // ( $( '#back-history .items' ).length - 4 ) );
	});

	$( '.items.blank' ).click( function() {
		$( '#back-history .button-close' ).trigger( 'click' );
	});

	$( '#back-history .show-menu' ).click( function() {
		$( '#mtrigger' ).trigger( 'click' );
		$( '#back-history .button-close' ).trigger( 'click' );
	});

	$( '#back-history .button-close' ).click( function() {
		var $items = $( '#back-history .items' );
		var length = $items.length - 2;
		var delay = DURATION + 0.4 * ( length + 1 ) * TITLE_DELAY;

		for( i = length; i >= 0; i-- ) {
			setTimeout( function( $this ) {
				$this.find( 'a' ).removeClass( 'visible' );
			}, DURATION + TITLE_DELAY * ( length - i - 1 ), $( $items.get( i ) ) );

			setTimeout( function( $this ) {
				$this.find( '.tube' ).animate( {width: 0}, LINE_DURATION / 2, 'linear' );
			}, DURATION / 2 + TITLE_DELAY * 1, $( $items.get( i ) ) );
			// }, DURATION / 2 + TITLE_DELAY * ( length - i - 1 ), $( $items.get( i ) ) );
		}

		$items = $( '#back-history .items' );
		length = $items.length;
		for( i = length; i >= 0; i-- ) {
				var item = $items.get( i );
				var $item = $( item ).find( '.shade' );
				$item.delay( delay + DELAY * ( length - i ) ).animate( {width: 0}, DURATION / 2, 'easeOutExpo' );
		}

		setTimeout( function() {
			$( '#back-history' ).removeClass( 'visible' );
		}, DURATION + DELAY * length );
	});

	$( window ).load( function() {
		var totalWidth = 0;
		$( '#back-history .items' ).each( function( i ) {
			var $this = $( this ).find( '.shade' );
			var w = $this.width();

			$this.data( 'width', w ).css( { width: 0 } );

			totalWidth += w - 2;
		});

		var blankWidth = $( '#back-history ' ).width() - totalWidth;
		$( '#back-history .items.blank' ).width( blankWidth ).find( '.shade' ).data( 'width', blankWidth ).css( { width: 0 } );

		$( '#back-button' ).addClass( 'visible' );
	});
})(jQuery);
});