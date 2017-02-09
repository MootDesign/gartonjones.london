var referenceHeight = 900;

aRCDescript = [ {
	srcString : '#layouts .story',
	fitting : resizeables.fillModes.NONE,
	multiLayout : true
},  {
	srcString : '#scaling .story',
	fitting : resizeables.fillModes.FIT_PARENT,
}];

var arrowTimeout = null;

/* */

var optimizationSlide = {
	pause : function() {
			jQuery("#optimization .fastLayer").stop(true,false);
	},
	resume : function() {

		jQuery("#optimization .fastLayer").animate({
			'margin-top' : '500px'
		}, 400, 'easeInOutCubic').animate({
			'margin-top' : '0px'
		}, 400, 'easeOutCubic', optimizationSlide.resume);
	}
};

function createLayers(){

	for(var i=0; i<10; i++){

		var layer = jQuery("<div class='fastLayer'><div><div></div></div></div>");

		layer.css({
			left: Math.random()*1750-350,
			top: Math.random()*860-200
		});

		var q = Math.random();
		layer.find('>div').attr({
			alt: q*6+1
		});

		var size = q*270+30;
		layer.find('>div>div').css({
			width: size,
			height: size,
			'border-radius': size,
			'-webkit-filter': 'blur('+q*15+'px)',
			background: 'rgba(255, 255, 255, .3)'
		});

		jQuery('#more .popularResolution').append(layer);

		var animatedCopy = layer.clone();

		jQuery('#animated .popularResolution').append(animatedCopy);

		(function(animatedCopy){

			var paused = true,
				progress = 0,
				initialPosition = animatedCopy.position(),
				speedKoeff = Math.random(),
				initialPhase = Math.random()*Math.PI*2,
				amplitude = Math.random()*100+100;

			setInterval(function(){
				if(paused) return;

				var angle = progress*speedKoeff+initialPhase;
				animatedCopy.css('left',initialPosition.left+Math.sin(angle)*amplitude);
				animatedCopy.css('top',initialPosition.top+Math.cos(angle)*amplitude);

				progress += 0.1;

			},17);

			animatedCopy.data({
				resume: function(){
					paused = false;
				},
				pause: function(){
					paused = true;
				}
			});

		})(animatedCopy);

	}
}


jQuery(function( $ ){
	var angle = 0;
	var defaultWidth = 1900;

	// center the background
	// when the parallax is initialized
	$('#parallax').on('init', function() {
		// for about us pages, initialize the nice scroller
		$( '.about-us-parallax #parallax article' ).perfectScrollbar();
		$( '#property article .main' ).css("max-height", "60%").perfectScrollbar();
		console.log( 'perfectScrollbar called' )
		
		if( window.innerWidth < defaultWidth && ! $( '#parallax' ).hasClass( 'no-resize' ) ) {
			console.log( "resize" );
			var ratio = window.innerWidth / defaultWidth;
			var hratio = window.innerHeight / 930;

			if( ratio > 1 ) ratio -= 1;
			// ratio = Math.exp( ratio );
			// if( ratio < 1 ) ratio += 1;
			// console.log( "Ratio", window.innerWidth / 1800, ratio );

			$( '.fastLayer' ).each( function() {
				var left = this.style.left;
				var right = this.style.right;

				var percentage = left.indexOf( '%' ) > 0;
				var rpercentage = right.indexOf( '%' ) > 0;

				var $this = $( this );
				var $parent = $this.parent();

				left = parseFloat( left );
				right = parseFloat( right );
				if( left ) {
					// if( $parent.hasClass( 'add' ) || left < 0 ) {
					if( left < 0 ) {
						left /= ratio;
					} else {
						left *= ratio;
					}
				}

				if( right ) {
					// if( $parent.hasClass( 'add' ) || right < 0 ) {
					if( right > 0 ) {
						right /= ratio;
					} else {
						right *= ratio;
					}
				}

				// if( ! $parent.hasClass( 'ignore' ) && ! $parent.hasClass( 'full-height-img' ) ) {
					if( ! isNaN( left ) )
						this.style.left = left + ( percentage ? '%' : 'px' );

					if( ! isNaN( right ) )
						this.style.right = right + ( rpercentage ? '%' : 'px' );

				// }

				//Scale the image
				$this.find( 'img' ).each(function(){
					var $img = $( this );
					var width = ( $img.data( 'width' ) || $img.width() ) * ratio;
					var height = ( $img.data( 'height' ) || $img.height() ) * hratio;

					if( ! $parent.hasClass( 'full-height-img' ) ) {
						if( height > 0 ) $img.css( 'max-height', height );
					} else {
						// if( width > 0 ) $img.css( 'width', width );
					}
				});

				this.dataset.ratio = ( ! $parent.hasClass( 'full-height-img' ) ) ? ratio : ratio;
			});
		}

		var background = $( '.parallaxBackground' );
		var backgroundHeihgt = $( '.parallaxBackground' ).height();
		var windownHeight = $( '#parallax' ).hasClass( 'on-load' ) ? $( '#parallax' ).height() : $( window ).height();
		background.css({
			marginBottom: - ( ( backgroundHeihgt - windownHeight ) /2 ) + 15
		});
		console.log( 'move background by: ' + ( - ( backgroundHeihgt - windownHeight ) / 2 ) );
	});

	var $stories = $( '#parallax .animate-me' );

	if( window.innerWidth < 1920 ) {
		var ratio = 2600 / window.innerWidth;

		$( '.fastLayer' ).each( function() {
			var $this = $( this );
			var left = this.style.left;

			if( left.indexOf( '%' ) > 0 ) {
				var vleft = parseFloat( left );
				vleft = ( vleft < 0 ) ? ( vleft / ratio ) : ( vleft * ratio );

				this.style.left = ( vleft ) + '%';
				// console.log( left, this.style.left, ratio );
				// console.log( left, this.style.left, $this.attr( 'style' ) );
			}
			// $this.attr( 'alt', alt );
		});
	}

  createLayers();
  optimizationSlide.resume();

	$('#parallax').on('finishedMove', function(amount) {
		para.setDuration(3500);

		if( para.currentSlideI > 0 ) {
			$( '.parallax-menu' ).stop( true, false).fadeIn();
		} else {
			$( '.parallax-menu' ).stop( true, false).fadeOut();
		}

		$('#animated .popularResolution .fastLayer').each(function(){
			$(this).data('resume')();
		});

		optimizationSlide.resume();

		//Shakeable item?
		if( Dog.$shake.length > 0 ) {
			/*
			* I can't use the CSS3 animation as I need to append the x and y translation
			* on the page scroll.
			*/
			var interval = setInterval( function() {
				var a = Math.sin( angle ) * 0.6;
				$( 'img.shake-me' ).transition( { rotate:  a + 'deg' }, 48 );

				angle += 0.1;
			}, 50 );

			Dog.$shake.data( 'interval', interval );
		}

		// if( $( '.swap-me' ).length > 0 ) {
		// 	var $img = $( '.swap-me img' );
		//
		// 	$img.first().fadeOut();
		// 	$img.last().fadeIn();
		// }
		
		isContentTooLong();
	});

	$('#parallax').on('startedMove', function() {

		$('#animated .popularResolution .fastLayer').each(function(){
			$(this).data('pause')();
		});

		if( Dog.$shake.length > 0 ) {
			clearInterval( Dog.$shake.data( 'interval' ) );
		}
		optimizationSlide.pause();
	});

	function isContentTooLong() {
		// if we don't have the article, don't do this
		if ( ! $('#parallax > div').eq(para.currentSlideI).find('article').length > 0) {
			return false;
		}

		var currentParalax = $( '#parallax > div' ).eq(para.currentSlideI);
		var windowH = $( window ).height();
		var article = currentParalax.find('article');
		var articleT = article.offset().top;
		var articleH = article.height();

		console.log( 'windowH: ' + windowH );
		console.log( 'articleT: ' + articleT );
		console.log( 'articleH: ' + articleH );

		if ( windowH - 78 - articleT - articleH < 0 ) {
			article.height( windowH - 78 - articleT ).find('.main').perfectScrollbar();
		}
	}

	/**
	 * Dog information
	 */
	var Dog = {
		$e: $( '.dog-pee, .the-bus, .dog-no-pee' ),
		$shake: $( 'img.shake-me' )
	};

	$( '#parallax' ).on( 'init', function( e ) {
		setTimeout( function() {
			if( $('#parallax' ).hasClass( 'no-scroll' ) ) return;

			if( $( '#parallax' ).hasClass( '.ignore-hashtag' ) ) {
      	$( '.parallax-menu' ).fadeIn();
			}

			//
			if( $( '#slide-here' ).length > 0 || typeof( scrollToSlide ) != "undefined" ) {
				autoSlideParallax();
			} else {
				if( para.currentSlideI === 0 ) {
					para.closerRight();
				}
			}
		}, 200 );

        adjustElementsSize();
	});

    $( window ).resize( function() {
        clearTimeout( $( this ).data( 'timeout' ) );

        var timeout = setTimeout( function() {
            adjustElementsSize();
        }, 200 );

        $( this ).data( 'timeout', timeout );
    });

	//On finishedMove start the timeout for the arrow
	$( '#parallax' ).on( 'startedMove', function() {
//        //Remove the active class from the left menu
//        $( '.submenu li' ).removeClass( 'active' );

		//I don't need the arrow... yet
		$( '.parallax-arrow ' ).addClass( 'hide-me' );

		// $( '.parallax-menu' ).stop( true, false ).fadeOut();

		clearTimeout( arrowTimeout );
	});

	$( '#parallax' ).on( 'finishedMove', function( e ) {
		console.log('Parallax is on: ' + para.currentSlideI + ' page');
        //Remove the active class from the left menu
//        $( '.submenu li' ).removeClass( 'active' );

        //Set the active menu
//        var li = $( '.submenu li' ).get( para.currentSlideI );
//        $( li ).addClass( 'active' );

		arrowTimeout = setTimeout( function() {
			if( para.currentSlideI < para.slidesCount - 1 ) {
				$( '.right-arrow' ).removeClass( 'hide-me' );
			}

			if( para.currentSlideI > 0 ) {
				$( '.left-arrow' ).removeClass( 'hide-me' );
			}
		}, 1500 );
	});

	$( '.right-arrow' ).click( function() {
		para.closerRight();
	});
	$( '.left-arrow' ).click( function() {
		para.closerLeft();
	});

	//Hidden items
	$hidden = $( '.show-me' );

	var transformProperty = Modernizr.prefixed( 'transform' );
	var fn = ( $hidden.length > 0 ) ? animateContentOnScroll : shittyAnimations;
	$( '#parallax' ).on( 'scrollChange', animateContentOnScroll );

	function animateContentOnScroll() {
        Dog.$e.each( function( i ) {
            var $this = $( this );

            /**
             * - frames contains the number of the frames used to create the dogpee "animation".
             * - frameWidth is the window width divided by the number of the frames.
             *   			this size is used to calculate the current visible frame in according to the dog position.
             *				just divide the current left position by it and we'll get a number between 0 and (frames - 1).
             *				Round it and we got the frame to show up :)
             */
            var frameWidth = $( window ).width() / $( this ).data( 'frames' );
            var frames = $this.data( 'frames' ) - 1;
						var fromRight = $this.hasClass( 'dog-pee-right' );

            var offset = $this.offset().left;
						var left = getMatrixM41( this );

            if( offset > 0 && offset <= windowWidth ) {
                var frame = Math.floor( offset / frameWidth );

                //I need to "swap" the animation, so left = 0 -> frame = Dog.frames
                frame = frames - frame;
                $this.data( 'frame', frame + 1 );

								//Stop the animation when scroll backwards...
								var lastFrame = $this.data( 'lastFrame' );
								if( lastFrame && lastFrame > frame && ! $this.hasClass('can-reverse') ) {
										frame = lastFrame;
								}

                //The new background top position
                var bgTop = - $this.height() * frame;

                //Apply to the "dog"
                $this.css( 'background-position', '-200px ' + bgTop + 'px' ).data( 'lastFrame', frame );
            }
        });

				//Wheel
				$( '.rotate-me' ).each( function() {
					var $this = $( this );
					var frames = 90;
					var frameWidth = $( window ).width() / frames;

          var offset = $this.offset().left;

          if( offset >= 0 && offset <= windowWidth ) {
						var frame = Math.floor( offset / frameWidth );

						//The new rotation angle
						var angle = ( 360 / frames ) * frame;
						$this.stop(true, false).transition( { rotate: angle + 'deg' }, 100 );
					}
				});

				//Shake me - Borris
				$( 'img.shake-me' ).each( function() {
					var $this = $( this );
					var frames = 90;
					var frameWidth = $( window ).width() / frames;

					//The maximum vertical scroll
					var maxScroll = ( window.innerHeight - $this.height() ) / frames;
          var offset = $this.offset().left;

          if( offset >= 0 && offset <= windowWidth ) {
						$this.addClass( 'stop-shake' );

						var frame = frames - Math.floor( offset / frameWidth );

						//The new rotation angle
						// $this.stop(true, false).transition( { rotate: angle + 'deg' }, 100 );
						// var angle = ( 180 / frames ) * frame;
						var x = maxScroll * frame;
						$this.stop(true, false).transition( { x: -x, y: x }, 0 );
						// console.log( "Borris", frame, angle, x );
					}
				});

        animateVisibleContent();
	}

	function shittyAnimations() {
		$stories.each( function ( i ) {
			var $story = $( this );
			var offset = $story.offset().left;
			var value = 0, xVal = 1;
			var xPos = windowWidth / 2;
			var half = $story.width() / 2;
			var end = $story.data( 'end' );
			var start = $story.data( 'start' );
			var property = $story.data( 'transform' ) ? transformProperty : $story.data( 'style' );
			var opacityMultiplier = $story.data( 'opacity' ) || 1.5;

			offset += half;
			if( offset >= 0 && offset <= windowWidth + half ) {
				xVal = ( offset - xPos ) / xPos;

				value = xVal * ( end - start );
			}

			if( ! $story.data( 'style' ) ) {
				this.style[property] = $story.data( 'transform' ) + "(" + ( end - value ) + $story.data( 'unit' ) + ")";
			} else {
				this.style[property] = ( end - value ) + $story.data( 'unit' );
			}
			// console.log( $story.data( 'transform' ) + "(" + ( end - value ) + $story.data( 'unit' ) + ")" );
			this.style[ 'opacity' ] = 1 - Math.abs( xVal ) * opacityMultiplier;
		});
	}

	// the only call to the parallax system you need to make
//    $(window).bind("load", function() {
    $(document).ready( function() {
		if( $( '#parallax' ).length <= 0 && $( '#parallax-wrapper' ).hasClass( 'no-ready' ) ) return;

        $( '#overlay-boxes > div' ).width( $( window ).width() ).height( $( window ).height() / 2 );
        $( '#overlay-boxes > .box2' ).css( 'top', $( window ).height() / 2 );

        setTimeout( function() {
            //Hide the "boxes"
			if( !$( '#parallax' ).hasClass( 'on-load' ) ) {
	            $( '#overlay-boxes .box1' ).delay(800).transition( { y: '-200%' }, 800, function() { $( this ).hide(); } );
	            $( '#overlay-boxes .box2' ).delay(800).transition( { y: '200%' }, 800, function() { $( this ).hide(); } );
			}


			if( $( '#parallax' ).length > 0 ) {
	          	startAllParaSystems();
			}
        }, 500 );
    });

		$(window).load( function() {
			$( '#skip' ).fadeOut();

			if( $( '#parallax' ).hasClass( 'on-load' ) ) {
				$( "html, body" ).scrollTop(0);

				$( '#overlay-boxes .box1' ).delay(800).transition( { y: '-200%' }, 800, function() { $( this ).hide(); } );
				$( '#overlay-boxes .box2' ).delay(800).transition( { y: '200%' }, 800, function() { $( this ).hide(); } );

				jQuery('.' + loaderClass).delay(300).animate({
					'opacity' : 0
				}, preloader.fillingTime, function() {
					jQuery(this).remove();
				});

				$('.preloaderCont').animate({
					'opacity' : 0,
					/*left: "-"+preloader.jQueryslide.width()+"px"*/
				}, preloader.fillingTime, function() {
					jQuery(this).remove();
				});

				autoSlideParallax();
			}
		});


	function countWidth() {
		var windowWidth = $( window ).width();
		$( '.countWidth' ).width( windowWidth ).css({ height: '100%' });

	}

	/*
	 * I need to call this function when the latest function between init and window load
	 * is executed.
	 */
	var isDone = 2;
	function autoSlideParallax() {
		isDone--;
		// console.log( "done?", isDone );
		if( isDone > 0 ) return;

		var id = ( typeof( scrollToSlide ) == "undefined" ) ? 'slide-here' : scrollToSlide;
		// var $divs =  $( '#' + id ).parent().find( '> div' );
		var $divs =  $( '#parallax > div' );


		/**
		* I can't use $( '#slide-here' ).index() function as
		* into the parallax <div> there could be other
		* elements, such as <img> before the <div> content.
		* And so, the index could be wrong
		*/
		$divs.each( function( index ) {
			// console.log( this.id, id );
			if( this.id == id ) {
				index -= 1;
				console.log( "paras", index );
				setTimeout( function() {
					for( i = 0; i <= index; i++ ) {
						console.log( "para", i );

						setTimeout(function() {
							para.closerRight();
						}, 50);
					}
				}, 2100 );
			}
		});
	}

    /*
     * Adjust elements size in according to current screen size
     *
     * The new size will be calculated related to 1440x900 ( iMac laptop ), as we
     * defined our position and size for it.
     * Bigger resolutions will be ignored
     */
    function adjustElementsSize() {
			var $div = $( '.shake-me' );
			$div.css( { left: $div.next().width() });

        return;
//        console.log( windowHeight, referenceHeight );

        // if( windowHeight < referenceHeight ) {
        //     var heightRatio =  windowHeight / referenceHeight;
				//
        //     //Get all the images
        //     $( '#parallax > div img.layer' ).each( function() {
        //         var $img = $( this );
        //         var ratio = $img.width() / $img.height();
				//
        //         if( ! isNaN( ratio ) ) {
        //             $img.height( $img.height() * heightRatio );
        //             $img.width( $img.height() * ratio );
				//
        //             console.log( $img.attr( 'src' ), $img.height(), ratio );
        //         }
        //     });
        // } else {
        //     jQuery( '#parallax > div img' ).css( { width: '', height: '' } );
        // }
    }

	countWidth();

	$( window ).resize( function() {
		countWidth();
	});

	if( $( 'article' ).hasClass( 'animated-text' ) ) {
		$('#parallax').on('finishedMove', function(amount) {
			// console.log( para.currentSlideI, para.slidesCount );
			if( para.currentSlideI == para.slidesCount - 1 ) {
				setTimeout( function() {
					if( $( 'article .main' ).hasClass( 'visible' ) ) return;
					$( 'article .main, #mouse' ).addClass( 'visible' );

					var tl = new TimelineLite;
					var chars = $( 'article .main span');

					tl.staggerFrom(chars, 0.6, {opacity:0, scale:0, y:80, rotationX:90, transformOrigin:"left center",  ease:Back.easeOut}, 0.005, "+=0");
				}, 100 );
			}
		});
	}
});

/**
 * Parallax template... add random effects to the items
 */
(function($) {
    /**
     * Left menu
     */
    $( '.submenu li a' ).click( function() {
        $( '.submenu li' ).removeClass( 'active' );

        $( this ).parent().addClass( 'active' );

				if( $( '#parallax' ).hasClass( 'ignore-hashtag' ) && $( this ).attr( 'href' )[0] == "#" ) {
					$( '.submenu li a' ).click( function() {
						var index = $( $( this ).attr( 'href' ) ).index() - 1;
						var dist = index - para.currentSlideI;
				console.log( index, dist );
						for(i = 0; i < Math.abs( dist ); i++ ) {
							if( dist < 0 )
								para.closerLeft();
							else
								para.closerRight();
						}
					});

					return false;
				}
    });

    if( ! $( 'body' ).hasClass( 'page-template-parallax' ) ) return;

    //Get all the parallaxes
    $( 'article' ).each( function() {
        var $this = $( this );
				if( $this.hasClass( 'no-random' ) ) return;

        /**
         * 0 - to-position
         * 1 - fly-me
         */
        var animation = Math.round( Math.random() );
				animation = 0;

//        console.log( $this, animation );
        if( animation === 0 ) {
            //Avoid to use 2 times the same animation
            var dir = Math.round( Math.random() );

            $this.find( 'h1, .main, h2, h3, .divider, .description' ).each( function() {
                /*
                 * Direction:
                 *
                 * 0 - top
                 * 1 - bottom
                 */
                var c = ( dir === 0 ) ? "to-top" : "to-bottom";
                dir = ( dir === 0 ) ? 1 : 0;

                $( this ).addClass( 'fade-me animate-me' ).addClass( c );
            });
        } else {
            // var $div = $( '<div>' );
            // $div.append( $this.children() );
            // $this.children().detach();

            $this.closest( '.parallax-item' ).addClass( 'fly-me animate-me show' ).data( 'revert', 'away' );

            $this.html( "" ).append( $div );

            $this.closest( 'article' ).closest( 'div' ).addClass( 'fly-perspective' );
        }
    });
})(jQuery);

/*
 * Parallax + content template
 */
(function($){
	var contentHeight;

	if( $( '#parallax-wrapper' ).length > 0 ) {
		jQuery( document ).ready( function( $ ) {
		  // if( $( '#overlay-boxes' ).length <= 0 ) return;

		  contentHeight = window.innerHeight -
		                   $( 'nav.top-bar' ).outerHeight() -
		                   $( '#navigation-menu' ).outerHeight() -
		                   $( '#footer' ).outerHeight();

			$( '.size-me' ).height( contentHeight );
		});

	  // $( '#parallax' ).width( window.innerWidth * ( $( '#parallax .parallax-item' ).length + 1 ) );
	  $( 'a.scroll-down' ).click( function() {
			var index = $( $( this ).attr( 'href' ) ).index();

	    // $( '#parallax-wrapper' ).transition( { y: - contentHeight - 62 }, 1000, 'easeInExpo' );
	    $( '#parallax-wrapper' ).transition( { y: - contentHeight * index }, 1000, 'easeInExpo' );
			if( $( this ).data( 'second' ) ) {
				$( '#navigation-menu' ).addClass( 'double' );
				$( '#navigation-menu .second' ).removeClass( 'hidden' );
				$( '#devview' ).css( { marginTop: 76 } );
			}

			if( $( '#video1' ).length > 0 ) {
	    	playVideo( 'video1' );
			}

	    return false;
	  });

		$( '.socials > a' ).click( function() {
			$( this ).next().toggleClass( 'active' );
		});
	}
})(jQuery);

function parallaxContentScroll() {
	
}
