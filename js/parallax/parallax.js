/*
 * Depends on jquery, jquery.mousewheel and jquery.custom.
 *
 * An important limitation: while the layers with velocities less than unity
 * (moving slower than the viewer)
 * Are only being placed directly inside the slide,
 * Rather than in the depths of the layout.
 *
 * Copyright (c) 2013 Hot Dot Licensed MIT
 * http://hotdot.pro/
 * */

var paraSample = {}, utilLib = {},

	windowWidth,
	windowHeight,
	windowAspect,
	baseFontSize,
	para,
	wheelstep,
	aRCDescript,
/*
 * Stores images which, though not visible,
 * But will be loaded when the page loads
 */
	hiddenImagesContainer,

	iPadMode = navigator.userAgent.match(/iP/i),
	supportsTouchEvents =
		('ontouchstart' in document.documentElement) || ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone|ZuneWP7/i.test(navigator.userAgent) );

/* */

(function(nmspc) {

	var alertFallback = false;
	if ( typeof console === "undefined" || typeof console.log === "undefined") {
		alert('oh no');
		console = {};
		if (alertFallback) {
			console.log = function(msg) {
				alert(msg);
			};
		} else {
			console.log = function() {
			};
		}
	}

	/* */

	nmspc.DEVICE_TYPES = {
		iPad : 'iPad',
		iPhone: 'iPhone',
		android : 'android',
		desktop : 'desktop',
		wPhone : 'wPhone'
	}

	nmspc.BROWSERS = {
		safari: 'Safari',
		chrome: 'Chrome'
	}

	nmspc.OS_TYPES = {
		mac: 'Mac OS',
		win: 'Windows'
	}

	nmspc.deviceDescription = {
		type : undefined,
		browser : undefined,
		touchCapable : false
	}

	nmspc.deviceDescription.type = nmspc.DEVICE_TYPES.desktop;

	if (navigator.userAgent.indexOf('iPad') > -1) {
		nmspc.deviceDescription.type = nmspc.DEVICE_TYPES.iPad;
	} else if (navigator.userAgent.indexOf('iPhone') > -1) {
		nmspc.deviceDescription.type = nmspc.DEVICE_TYPES.iPhone;
	} else if (navigator.userAgent.indexOf('Android') > -1) {
		nmspc.deviceDescription.type = nmspc.DEVICE_TYPES.android;
	} else if (navigator.userAgent.indexOf('Windows Phone') > -1) {
		nmspc.deviceDescription.type = nmspc.DEVICE_TYPES.wPhone;
	}

	if (navigator.userAgent.indexOf('Chrome') > -1 ){
		nmspc.deviceDescription.browser = nmspc.BROWSERS.chrome;
	} else if (navigator.userAgent.indexOf('Safari') > -1) {
		nmspc.deviceDescription.browser = nmspc.BROWSERS.safari;
	}

	nmspc.deviceDescription.os = undefined;

	if (navigator.userAgent.indexOf('Mac OS') > -1 ){
		nmspc.deviceDescription.os = nmspc.OS_TYPES.mac;
	} else if (navigator.userAgent.indexOf('Windows') > -1 ){
		nmspc.deviceDescription.os = nmspc.OS_TYPES.win;
	}

	if (( typeof Touch == "object") || ('ontouchstart' in document.documentElement)) {
		nmspc.deviceDescription.touchCapable = true;
	}

	/* */

	nmspc.debu = window.location.href.indexOf('?debug') > -1;
	var jQuerydebWindow;

	nmspc.debLog = function(str) {
        console.log( str );
		if (!jQuerydebWindow)
			return;
		jQuerydebWindow.prepend(jQuery('<p>' + str + '</p>'));
	}

	jQuery(function() {

		if (nmspc.debu) {

			jQuerydebWindow = jQuery('<div></div>').css({
				position : 'fixed',
				top : 0,
				right : 0,
				display : 'inline-block',
				width : 300,
				'min-height' : 100,
				font : '12px sans-serif',
				color : 'rgba(255,255,255,.8)',
				'background-color' : 'rgba(0,0,0,.5)',
				'z-index' : 999,
				'max-height' : '50%',
				'overflow-y' : 'scroll'
			});
			jQuery('body').append(jQuerydebWindow);

		}

		nmspc.debLog(nmspc.deviceDescription.type);
		nmspc.debLog('Standard-touch-capable: ' + nmspc.deviceDescription.touchCapable);

	})

})(utilLib);


(function(arg){

	if(!window.Modernizr) return;

	if(window.Modernizr.csstransforms3d){
		paraSample.bestTranslateType = 'translate3d';
	} else if(window.Modernizr.csstransforms){
		paraSample.bestTranslateType = 'translate';
	} else {
		paraSample.bestTranslateType = 'left';
	}

	// translate3d, left, translate

	var translateType,
		transformString;

	arg.applyHorizontalShift = function(value, jQuerydiv, translateType){

		translateType = translateType || paraSample.bestTranslateType;

		var tag = jQuerydiv.get()[0].tagName;
		// if( window.innerWidth < 1900 && tag.toLowerCase() == "img" ) {
		// 	var ratio = jQuerydiv.parent().parent()[0].dataset.ratio;
		// 	if( ratio && ratio > 0 ) {
		// 		// ratio = 1 - ratio;
		// 		ratio = 0.5 + ( 1 - ratio );
				// console.log( ratio, Math.exp(ratio) );
				// value /= Math.exp(ratio);
				// console.log( "ratio", ratio );
				// var $parent = jQuerydiv.parent().parent().parent() )
				// console.log( jQuerydiv.attr( 'src' ), ratio );
				// value /= ratio;
		// 	}
		// }

		if (value=='' || translateType != 'left') {

			if (value==''){
				transformString = '';
			} else if (translateType === 'translate3d') {
				transformString = 'translate3d(' + value + 'px, 0px, 0px)';
			} else if (translateType === 'translate') {
				transformString = 'translate(' + value + 'px, 0px)';
			} else if (translateType === 'translateX') {
				transformString = 'translateX(' + value + 'px)';
			} else
				return;

			jQuerydiv.css({

				WebkitTransform : transformString,
				MozTransform : transformString,
				Transform : transformString,
				msTransform : transformString,
				OTransform : transformString,
				transform : transformString

			});

		}

		if (value=='' || translateType == 'left') {

			jQuerydiv.css('left', value);

		}

	}

})(paraSample);


/* */

paraSample.preloaderEnabled = true;

paraSample.settings = {

	removeScrollbar:
		utilLib.deviceDescription.type != utilLib.DEVICE_TYPES.wPhone,

	disableAutoHashChange: utilLib.deviceDescription.type == utilLib.DEVICE_TYPES.android,

	touchNotScrollMode:
		(utilLib.deviceDescription.type != utilLib.DEVICE_TYPES.desktop)
		&& utilLib.deviceDescription.touchCapable,

	mousewheelSlowness: {
		windows: 15,
		mac: 60
	},

	pauseSideAnimationsWhenMoving: true

}

function parallax(param) {

	/* settings */

	var parallaxID = "parallax",
		overflowsParentClass = "overflowsSlide",
		wrapsWindowWidthClass = 'wrapsWindowWidth',
		paralaxBackgroundClass = 'parallaxBackground',

	/* Disables the scrollbar at all */
	scrollbarFullyRemoved = param.removeScrollbar;

	/*
	 * You can specify the type of animation and parallax layers
	 * And the property being animated.
	 *
	 * The following evaluation
	 * Compatibility settings
	 * In the form of a table.
	 *
	 * No animation virtual scrolling:
	 *
	 *              X     JQuery     CSS3
	 * left      |	o  |    o    |    o    |
	 * translate |	o  |    ?    |    o    |
	 *
	 * With animated virtual scrolls:
	 *
	 *              X     JQuery     CSS3
	 * left      |	o  |    x    |    x    |
	 * translate |	o  |    x    |    x    |
	 *
	 *
	 *  */


	var animationTypes = {
		NONE : 0,
		JQ_EASED : 1,
		CSS3_EASED : 2,
		SUPER_EASED : 3,
		EASED : 4
	}, shiftPropertyTypes = {
		LEFT : 'left',
		TRANSLATEX : 'translateX',
		TRANSLATE : 'translate',
		TRANSLATE3D : 'translate3d'
	};

	var layerAnimationType = animationTypes.NONE,
//		scrollValueAnimationType = animationTypes.EASED,
        scrollWheelValueAnimationType = animationTypes.EASED,
		scrollValueAnimationType = animationTypes.SUPER_EASED,
		parallaxLeftAnimationType = animationTypes.NONE;

	var layerShiftProperty = param.layerShiftProperty || 'left',
		parallaxShiftProperty = param.parallaxShiftProperty ||  'left';

	//http://easings.net/ru
//	var scrollEasing = 'easeOutExpo', scrollAnimationDuration = 1500;
	var scrollEasing = 'easeInOutSine', scrollAnimationDuration = 3500;

	/* End of settings, start working code */

	var para_cached = this;

	var windowWidth;

	var slides = {
		jQuerysrc : undefined,
		array : [],
		singleSlideWidth : 0
	};


	var scroll = {
		add : function() {
		},
		get : function() {
		},
		delta : 0,
		cur : 0,
		previous : 0,
		maxLimit : 0,
		firstStep : 0,
		jQuerysrc : undefined,
		startWindowWidth : 0,
		resizeModifier : 1,
		minimalStep : 0
	};

	para_cached.scroll = scroll;

	this.currentSlideI = 0;

	this.mouseWheelTarget = jQuery('#parallax');

	this.findLayerWrapper = function(src) {

		for (var i = 0, s = slides.array[0]; i < slides.array.length; i++, s = slides.array[i]) {
			for (var j = 0, l = s.layers[0]; j < s.layers.length; j++, l = s.layers[j]) {
				if (src == l.jQuerysrc[0]) {
					return l;
				}
			}
		}
	};

	var slideChangeModel = 'onBorder';

	function layer(jQuerysrc, prnt) {

		//jQuerysrc.parent().css('display','');

		var hasParalaxBackgroundClass = jQuerysrc.hasClass(paralaxBackgroundClass);

		this.jQuerysrc = jQuerysrc;
		this.prnt = prnt;
		this.spd = +jQuerysrc.attr('alt');

		if (hasParalaxBackgroundClass) {
			jQuerysrc.css('min-height', '100%');
		}

		var slowness = 1 - this.spd, extraSpeed = this.spd - 1;

		var halfWindowWidth, halfParentWidth, preCalculatedPosition, halfWidth;

		var hasOverflowMarker = jQuerysrc.hasClass(overflowsParentClass), isSmallAndSlow;

		var relLeftBorder = 0, relRightBorder;

		if (layerAnimationType == animationTypes.CSS3_EASED) {
			CSS3setupAdjust(layerShiftProperty, this.jQuerysrc);
		}

		this.applyWindowSize = function() {

			if (!hasParalaxBackgroundClass) {
				jQuerysrc.attr('style', '');
			} else {

				paraSample.applyHorizontalShift('', jQuerysrc);
				jQuerysrc.css({
					width : ''
				});
				// Opera:
				// switching positioning
				// Layer relative to absolute
				// Destroys layout.
				var usingOpera = navigator.userAgent.indexOf('Opera') > -1;
				if (!usingOpera) {
					jQuerysrc.css({
						position : ''
					});
				}
			}

			halfWindowWidth = windowWidth / 2;
			halfParentWidth = this.prnt.width / 2;

			/*var isTestSlide = false&&jQuerysrc.parent().is('#intro');*/

			if (hasParalaxBackgroundClass) {

				this.width = jQuerysrc.width();
				var minWidth = this.spd * (this.prnt.prnt.width - windowWidth) + windowWidth;

				if (this.width < minWidth) {
					this.width = minWidth;
					jQuerysrc.width(this.width);
				}

			} else {

				// A bug in the (sic!) Of chromium.
				// The element <img alt = "5.5" class = 'test-subject' src = "/ static / img / mainPage / intro / 4.png" />
				// Has the right to change its height.
				// At this point, the program changes the pitch of Chromium in accordance with the rule
				// Width but leaves unchanged.
				// Try to cure a slight shaking condition of the item.
				jQuerysrc.css('position','absolute');
				/*(if(isTestSlide){
					console.log(jQuerysrc,jQuerysrc.width());
				}*/
				this.width = jQuerysrc.width();
				jQuerysrc.css('position','');
				/*if(isTestSlide){
					console.log(jQuerysrc,jQuerysrc.width());
				}*/
			}

			halfWidth = this.width / 2;
			relRightBorder = prnt.width - this.width;

			isSmallAndSlow = this.spd <= 1 && this.width < this.prnt.width;
			this.overflowsParent = hasOverflowMarker || hasParalaxBackgroundClass || !isSmallAndSlow;

			this.jQuerysrc.css('left', '');

			// Moz:
			// If this layer is positioned an absolute time,
			// Even considering reseta css ('left', '')
			// .css ('Left') will give a numerical value,
			// Not contained in any of the cascading style sheets.
			var cssLeft = jQuerysrc.css('left');

			/*
			 * In Opera can not switch the positioning of the background layer,
			 * But it is possible to determine that the css-left = auto, with an absolute.
			 * FF can be switched in positioning of the layer,
			 * But it is impossible to determine what css-left = auto, with an absolute.
			 * Solution: for Opera always maintain absolute positioning,
			 * For other browsers - turn off during the determination of css-left = auto.
			 */
			jQuerysrc.css({
				display : 'inline-block',
				overflow : 'visible',
				position : 'absolute'
			});

			// Moz:
			// Elements positioning not-static
			// Give numerical value even with no left style.
			if (cssLeft == 'auto') {
				this.left = halfParentWidth - halfWidth;
			} else {
				this.left = parseInt(cssLeft, 10);
			}

			if (layerShiftProperty !== shiftPropertyTypes.LEFT) {
				this.jQuerysrc.css('left', '0px');
			}

			if (this.spd === 0) {
				preCalculatedPosition = halfWindowWidth - halfWidth;
			} else if (this.spd > 0 && this.spd < 1) {
				preCalculatedPosition = (halfWindowWidth - halfWidth) * (1 - this.spd) + this.left * this.spd;
			} else {
				preCalculatedPosition = this.left;
			}

		};

		/*
		 Formulas for calculating raw:

		 spd = 0
		 halfWindowWidth-halfWidth+inScroll
		 spd: (0,1)
		 (halfWindowWidth-halfWidth+inScroll)*(1-this.spd)+this.left*this.spd
		 spd > 1
		 this.left-inScroll*(this.spd-1)
		 */

		this.parallaxLeft = function(inScroll) {

			if (this.spd == 0) {
				this.currentLeft = preCalculatedPosition + inScroll;
			} else if (this.spd > 0 && this.spd < 1) {
				this.currentLeft = preCalculatedPosition + inScroll * slowness;
			} else {
				this.currentLeft = preCalculatedPosition - inScroll * extraSpeed;
			}
			return this.currentLeft
		}

		this.adjust = function(inScroll) {

			var left = this.parallaxLeft(inScroll);

			/*
			 Layers in the foreground (very fast)
			 let go abroad slide
			 */

			if (!this.overflowsParent) {

				var leftBorder = relLeftBorder, rightBorder = relRightBorder;

				if (left < leftBorder) {
					left = leftBorder;
				} else if (left > rightBorder) {
					left = rightBorder;
				}

			}

			if (layerAnimationType == animationTypes.CSS3_EASED || layerAnimationType == animationTypes.NONE) {

				paraSample.applyHorizontalShift(left, this.jQuerysrc, layerShiftProperty);
			} else if (layerAnimationType == animationTypes.JQ_EASED) {
				jqueryAnimateShift(this.jQuerysrc, left);
			}

		};

		return this;
	}

	function slide(jQuerysrc, masterSlide, prnt) {

		this.masterSlide = masterSlide;
		this.layers = [];
		this.jQuerysrc = jQuerysrc;
		this.initialLeft = 0;
		this.left = 0;
		this.width = 0;
		this.jQueryaxis = {};
		this.prnt = prnt;
		var children = this.jQuerysrc.children();

		var windowWidth_cache;

		this.childrenVisible = true;

		this.adjust = function() {

			this.left = this.initialLeft - this.prnt.jQuerysrc.scroll;

			var right = this.left + this.width;

			var toTheLeftOfScreen = this.left < 0 && right < 0, toTheRightOfScreen = this.left > windowWidth_cache && right > windowWidth_cache;

			if ((toTheLeftOfScreen || toTheRightOfScreen)
				&& !param.noSlideHideOptimization) {
				if (this.childrenVisible) {
					children.hide();
					this.childrenVisible = false;
				}
			} else {
				if (!this.childrenVisible) {

					children.show();
					this.childrenVisible = true;
				}

				/* The transition to a subsidiary layers */

				var scrollPosition = -this.left;

				for (var i = 0, l = this.layers[0], len = this.layers.length; i < len; i++, l = this.layers[i]) {
					l.adjust(scrollPosition);
				}
			}

		}
		var slide = this;

		this.applyWindowSize = function() {

			windowWidth_cache = windowWidth;
			this.jQuerysrc.css('display', '');
			if (masterSlide) {
				this.width = this.prnt.width;
				this.initialLeft = 0;

			} else {
				this.width = windowWidth;
				this.initialLeft = this.prnt.width;
				this.jQuerysrc.css('width', this.width);

			}

		}
		this.applyWindowSize();

		this.applyWindowSizeToChildren = function() {

			children.show();

			for (var i = 0, j = slide.layers.length; i < j; i++) {
				slide.layers[i].applyWindowSize();
			};
		}

		this.initChildren = function() {

			var layerChildren;

			if (masterSlide) {
				layerChildren = this.jQuerysrc.children('[alt]');
			} else {
				layerChildren = jQuery('*[alt]', this.jQuerysrc);
			}

			children.show();

			layerChildren.each(function() {

				var jQuerylayer = jQuery(this)

				if (jQuerylayer.attr('alt') == '1') {
					jQuerylayer.css({
						position : 'absolute'
					});
					slide.jQueryaxis = jQuerylayer;

				} else {
					var wrapped = new layer(jQuerylayer, slide);
					slide.layers.push(wrapped);
				}
			});
		}
		this.initChildren();

		return this;

	}


	this.init = init;
	function init() {

		slides.jQuerysrc = jQuery('#' + parallaxID);
		slides.jQuerysrc.scroll = 0;

		if (scrollbarFullyRemoved) {
			jQuery('html').css('overflow', 'hidden');
		} else {
			jQuery('html').css({
				'overflow-x' : 'scroll',
				'overflow-y' : 'hidden'
			});
		}

		slides.jQuerysrc.children('div').css({
			height : '100%',
			position : 'relative',
			float : 'left'
			// overflow : 'hidden'
		});

		slides.jQuerysrc.css({
			width : '100%',
			height : '100%',
			'overflow-x' : 'visible',
			position : 'fixed'
		});

		if (parallaxLeftAnimationType === animationTypes.CSS3_EASED) {
			CSS3setupAdjust(parallaxShiftProperty, slides.jQuerysrc);
		}

		initSlides();

		applyWindowSize();

		applyWindowSizeToParallaxLayers();

		refreshSlides();

		//jQuery('body').bind('mousewheel', onMouseWheel);

		jQuery('.' + paralaxBackgroundClass).css('z-index', 'auto');

		slides.jQuerysrc.trigger('init');

	}

	function initSlides() {

		/* ordinary slides */

		slides.array = [];

		slides.jQuerysrc.find('> div').each(function() {
			var jQueryslide = jQuery(this);
			if (jQueryslide.attr('alt'))
				return;
			var p = new slide(jQueryslide, false, slides);

			slides.array.push(p);
		});

		para_cached.slidesCount = slides.array.length;

		/* Parallax itself acts as a slide
		 * Relative to the background parallax */

		var p = new slide(slides.jQuerysrc, true, slides);
		slides.array.push(p);
	}

	function applyWindowSize() {

		windowWidth = jQuery(window).innerWidth();

		slides.singleSlideWidth = windowWidth;

		scroll.minimalStep = windowWidth / 1000 / 15;

		slides.width = 0;

		for (var i = 0, l = slides.array.length; i < l; i++) {
			var s = slides.array[i];
			s.applyWindowSize();
			if (!s.masterSlide) {
				slides.width += s.width;
			}
		}

		slides.jQuerysrc.width(slides.width);
		scroll.maxLimit = slides.width - windowWidth;

		initScrollbar();

	}

	function applyWindowSizeToParallaxLayers() {
		for (var i = 0, s = slides.array[i]; i < slides.array.length; i++, s = slides.array[i]) {

			s.applyWindowSizeToChildren();
		}


		slides.jQuerysrc.trigger('engineRebuild', slides.jQuerysrc.scroll);
		//customEventEngine.call(para_cached, 'engineRebuild', slides.jQuerysrc.scroll);
	}

	var intervalID, stepToBe;

	// User personally made smoothed scrolling
	function stepF() {

		stepToBe = (scroll.cur - slides.jQuerysrc.scroll) / 15;

		if (Math.abs(stepToBe) > scroll.minimalStep) {
			slides.jQuerysrc.scroll += stepToBe;

			refreshSlidesAndFireListeners();

		} else if (scroll.doingNextMove) {
			scroll.doingNextMove = false;


			slides.jQuerysrc.trigger('finishedMove', slides.jQuerysrc.scroll);
			slides.jQuerysrc.removeClass('disable-hover');

		}

	}

	var straightScrollSwitch = false;

	function straightScroll() {

		slides.jQuerysrc.scroll = scroll.cur;

		refreshSlidesAndFireListeners();

		straightScrollSwitch = false;
	}

	var lastSlideI = 0, currentSlideI = 0, rawScroll = 0;

	function trackSlideChange() {

		rawScroll = scroll.cur / slides.singleSlideWidth;

		if(slideChangeModel == 'onBorder'){

			// Change occurs
			// On the border of the slide
			while (rawScroll <= lastSlideI - .5) {
				para.currentSlideI--;
				lastSlideI = para.currentSlideI;
			}

			while (rawScroll >= lastSlideI + .5) {
				para.currentSlideI++;
				lastSlideI = para.currentSlideI;
			}

		} else {

			// Change occurs
			// In the center of the adjacent slide
			while (rawScroll <= lastSlideI - 1) {
				para.currentSlideI--;
				lastSlideI = para.currentSlideI;
			}

			while (rawScroll >= lastSlideI + 1) {
				para.currentSlideI++;
				lastSlideI = para.currentSlideI;
			}
		}
	}

	function getScrollPositionAndAnimateEverything() {
        var animationType = ( para.isWheel ) ? scrollWheelValueAnimationType : scrollValueAnimationType;
//        var animationType = scrollValueAnimationType;

		scroll.cur = scroll.get();
		scroll.delta = Math.abs(slides.jQuerysrc.scroll - scroll.cur);

		scroll.doingNextMove = true;

			slides.jQuerysrc.trigger('startedMove', slides.jQuerysrc.scroll);
			slides.jQuerysrc.addClass('disable-hover');

		if (false)
			alert('getScrollPositionAndAnimateEverything : .cur: ' + scroll.cur + ', jQuerysrc.scroll: ' + slides.jQuerysrc.scroll);

		if (straightScrollSwitch) {

			straightScroll();

		} else if (animationType == animationTypes.EASED) {
//            slides.jQuerysrc.stop(true, false);
//            console.log( intervalID );

			if ( ! intervalID )
				intervalID = setInterval(stepF, 17);

		} else if (animationType == animationTypes.SUPER_EASED) {
            clearInterval( intervalID );
            intervalID = null;

			if (scroll.delta > 70) {

				scroll.firstStep = true;

				slides.jQuerysrc.stop(true, false).animate({
					scroll : scroll.cur
				}, {
					step : function(now, fx) {

						/* wild hack */
						if (scroll.firstStep) {
							fx.start = slides.jQuerysrc.scroll;
							scroll.firstStep = false;
							return;
						}

						refreshSlidesAndFireListeners();
						slides.jQuerysrc.scroll = now;

					},
                    complete: function() {
                        slides.jQuerysrc.trigger('finishedMove', slides.jQuerysrc.scroll);
                        slides.jQuerysrc.removeClass('disable-hover');
                    },
					duration : scrollAnimationDuration,
					easing : scrollEasing
				});
			} else {

				slides.jQuerysrc.stop(true, false);
				slides.jQuerysrc.scroll = scroll.cur;
				refreshSlidesAndFireListeners();
			}
		} else if (animationType == animationTypes.JQ_EASED) {

			slides.jQuerysrc.stop().animate({
				scroll : scroll.cur
			}, {
				step : function(now, fx) {
					slides.jQuerysrc.scroll = now;
					refreshSlidesAndFireListeners();

				},
				duration : scrollAnimationDuration,
				easing : scrollEasing
			});

		} else {
			straightScroll();
		}

		trackSlideChange();

  	para.isWheel = false;

		console.log( scrollAnimationDuration );
	}

	function refreshSlidesAndFireListeners(){

		refreshSlides();


		slides.jQuerysrc.trigger('scrollChange', slides.jQuerysrc.scroll);
		//customEventEngine.call(para_cached, 'scrollChange', slides.jQuerysrc.scroll);

	}

	function refreshSlides() {

		if (parallaxLeftAnimationType == animationTypes.CSS3_EASED || parallaxLeftAnimationType == animationTypes.NONE) {
			paraSample.applyHorizontalShift(-slides.jQuerysrc.scroll, slides.jQuerysrc, parallaxShiftProperty);
		} else if (parallaxLeftAnimationType == animationTypes.JQ_EASED) {
			jqueryAnimateShift(slides.jQuerysrc, -slides.jQuerysrc.scroll);
		}


		for (var i = 0, s = slides.array[0], len = slides.array.length; i < len; i++, s = slides.array[i]) {
			s.adjust();
		}



		/*
		 for(var l in scrollListeners){

		 scrollListeners[l](slides.jQuerysrc.scroll);
		 }*/

	}

	function initScrollbar() {

		var scrollListenerTarget;

		var firstInit = scroll.jQuerysrc ? false : true;

		if (!firstInit) {
			scroll.jQuerysrc.remove();
		} else {
			startWindowWidth = windowWidth;
		}

		if (param.touchNotScrollMode) {

			/*
			 jQuery('html').css('overflow','hidden');
			 jQuery('body').css('overflow','hidden');*/

			var dummy = jQuery('<div/>').css({
				position : 'absolute',
				display : 'hidden'
			});

			if (firstInit)
				jQuery('body').append(dummy);

			scroll.jQuerysrc = jQuery('<div/>').css({
				width : slides.width,
			});

			var touchStart = 0;
			time = {
				start : 0,
				end : 0
			};

			var delta, speed = {
				cur : 0,
				max : 15,
				min : .1
			};

			if (firstInit) {

				slides.jQuerysrc[0].addEventListener("touchmove", function(e) {


					if (e.touches.length > 1)
						return;

					e.preventDefault();

					time.end = new Date().getTime();

					var deltaTime = time.end - time.start;

					delta = e.touches[0].screenX - touchStart;

					speed.cur = delta * delta / 15 * (delta < 0 ? -1 : 1);

					scroll.add(-speed.cur);

					touchStart = e.touches[0].screenX;

					time.start = time.end;

				});

				slides.jQuerysrc[0].addEventListener("touchstart", function(e) {

					//e.preventDefault();


				time.start = new Date().getTime();

					touchStart = e.touches[0].screenX;

					scroll.stop();

				});

			}

			var maxScroll = slides.width - windowWidth, minScroll = 0;

			scroll.add = function(delta) {

				if (scroll.cur + delta > maxScroll) {
					scroll.cur = maxScroll
				} else if (scroll.cur + delta < minScroll) {
					scroll.cur = minScroll;
				} else {
					scroll.cur += delta;
				}

				getScrollPositionAndAnimateEverything();
			}

			scroll.stop = function() {
				scroll.cur = slides.jQuerysrc.scroll;
			}

			scroll.get = function() {
				return scroll.cur;
			}
		} else {

			var scrollTarget;

			if (!scrollbarFullyRemoved) {

				scroll.jQuerysrc = jQuery('<div/>').css({
					width : slides.width,
					height : '1px'
				});

				jQuery('body').append(scroll.jQuerysrc);

				scrollTarget = window;
			}

			scroll.get = function() {

				if (scrollbarFullyRemoved) {
					return scroll.cur;
				}

				return jQuery(scrollTarget).scrollLeft();
			}

			scroll.add = function(delta) {

				if (scrollbarFullyRemoved) {

					var newScroll = scroll.cur + delta;

					if (newScroll < 0) {
						newScroll = 0;
					} else if (newScroll > scroll.maxLimit) {
						newScroll = scroll.maxLimit;
					}

					scroll.cur = newScroll;
					getScrollPositionAndAnimateEverything();
					return;
				}
				jQuery(scrollTarget).scrollLeft(jQuery(scrollTarget).scrollLeft() + delta);
			}
			if (firstInit && !scrollbarFullyRemoved) {
				jQuery(scrollTarget).on('scroll', getScrollPositionAndAnimateEverything);
			}
		}

		para_cached.add = scroll.add;

		para_cached.width = slides.width;
	}


	this.toSlide = function(index) {
		if (index > -1 && index < slides.array.length) {
			this.to(windowWidth * index);
		}
	};

	this.to = function(value) {
		scroll.add(value - scroll.get());
	};

	function closerGeneric(left) {
		var cur = scroll.get(), roun = left ? Math.floor : Math.ceil, curIndex = cur / slides.singleSlideWidth, dest = roun(cur / slides.singleSlideWidth);

		if (cur % slides.singleSlideWidth === 0) {
			dest += left ? (-1) : 1;
		}
		dest *= slides.singleSlideWidth;

		para_cached.to(dest);
	}


	this.closerLeft = function() {
		closerGeneric(true);
	};

	this.closerRight = function() {
		closerGeneric(false);
	};

	this.setDuration = function( value ) {
		scrollAnimationDuration = value;
	};

	function CSS3setupAdjust(shiftProperty, jQuerydiv) {

		var transiTrailer = scrollAnimationDuration + 'ms ease-in-out 1ms';

		if (shiftProperty == shiftPropertyTypes.LEFT) {

			transi = 'left ' + transiTrailer;

		} else if (shiftProperty == shiftPropertyTypes.TRANSLATE || shiftProperty == shiftPropertyTypes.TRANSLATEX || shiftProperty == shiftPropertyTypes.TRANSLATE3D) {

			transi = '-webkit-transform ' + transiTrailer;

		}

		jQuerydiv.css({
			WebkitTransition : transi,
			MozTransition : transi,
			OTransition : transi,
			msTransition : transi,
			transition : transi
		});

	}

	function jqueryAnimateShift(jQuerydiv, value) {

		jQuerydiv.stop(false).animate({
			left : value + 'px',
		}, scrollAnimationDuration, scrollEasing);
	}


	/* Feedback */

	var absScroll, relativeScroll;

	this.onResizeSlides = function() {

		absScroll = scroll.get();
		relativeScroll = absScroll / windowWidth;

		applyWindowSize();

	}

	this.onResizeLayers = function() {

		applyWindowSizeToParallaxLayers();

		refreshSlidesAndFireListeners();

		var newScroll = relativeScroll * windowWidth;

		straightScrollSwitch = true;

		scroll.add(newScroll - scroll.get());
	}
}

/*
 * Download
 */

var preloader = {
	disable : undefined,
	start : undefined,
	onLoad : function() {
	},
	jQueryslide : undefined,
	visuals : undefined,
	fillVisuals : function() {
	},
	fillingTime : 1400,
	delayBeforeLoadCheck : 0,
	targetLogoWidth : 0
};

var loaderClass = 'loadBackground';

preloader.fillVisuals = function(fillAmount, callback) {

	if (!callback)
		callback = function() {
		};

	jQuery(function() {
		preloader.visuals.loaded/*.stop(false, false)*/.animate({
			'width' : preloader.targetLogoWidth * fillAmount
		}, {
			duration : preloader.fillingTime,
			queue : false
		});
		preloader.visuals.unloaded/*.stop(false, false)*/.animate({
			'width' : (1 - fillAmount) * preloader.targetLogoWidth
		}, {
			duration : preloader.fillingTime,
			queue : false,
			complete : callback
		});
	});

}

preloader.disable = function(param) {

	if (param && param.rough) {

		jQuery('.' + loaderClass).remove();
		preloader.jQueryslide.remove();

	} else {
		if( ! jQuery( '#parallax' ).hasClass( 'on-load' ) ) {
			jQuery('.' + loaderClass).delay(300).animate({
				'opacity' : 0
			}, preloader.fillingTime, function() {
				jQuery(this).remove();
			});

			preloader.jQueryslide.animate({
				'opacity' : 0,
				/*left: "-"+preloader.jQueryslide.width()+"px"*/
			}, preloader.fillingTime, function() {
				jQuery(this).remove();
			});
		}
	}

	jQuery(document.body).removeClass('unloaded');

};

jQuery(function() {
	return;
	var jQuerymedia = jQuery('html').find('img,video');

	var lc = 0;
	jQuerymedia.on('load', function() {
		lc++;
		utilLib.debLog('loadEvent() fired. Total fired: ' + lc + '\n Still need to load ' + (jQuerymedia.length - lc));
//		console.log(this);
	});
	jQuerymedia.on('error', function() {
		lc++;
		utilLib.debLog('errorEvent() fired.');
//		console.log(this);
	});
});

preloader.init = function(){
	preloader.visuals = {
		loaded : jQuery('.preloaderCont .ending'),
		unloaded : jQuery('.preloaderCont .starting')
	};
	preloader.jQueryslide = jQuery('.preloaderCont');
	preloader.targetLogoWidth = .9 * jQuery(window).innerWidth();
}

preloader.start = function() {

	preloader.init();

//	var jQuerymedia = jQuery('html').find('img,video');
	var jQuerymedia = jQuery('#parallax').find('img,video');

	var mediaCount = jQuerymedia.length;

	var local_onContentLoad = this.onContentLoad;

	var loaded = 0;

	preloader.visuals.loaded
	.add(preloader.visuals.unloaded)
		.css('opacity', 0);

	var jQuerysubCont = jQuery('.preloaderCont .subCont');

	// var imageAspect = preloader.visuals.loaded.find('img').width() / preloader.visuals.loaded.find('img').height();
	// TODO: Debug why is this happening... we can get the height, but not the width.
	var imageAspect = 505 / 50;

		// console.log(preloader.visuals.loaded.find('img'));

		// console.log( preloader.visuals.loaded.find('img').width() ); // 0
		// console.log( preloader.visuals.loaded.find('img').height() ); // 50
		// console.log( imageAspect );

	preloader.visuals.loaded.find('img')
	.add(preloader.visuals.unloaded.find('img'))
	.add(preloader.visuals.unloaded)
		.css('width', preloader.targetLogoWidth);



	jQuerysubCont
	.add(preloader.visuals.loaded.find('img'))
	.add(preloader.visuals.unloaded.find('img'))
		.css('height', preloader.targetLogoWidth / imageAspect);



	function getFilesToLoadCount() {

		var a = jQuerymedia.filter(function() {

			// Reason: one of the browsers have not found complete svg-image
			if (this.src && this.src.indexOf('svg') > -1) {
				return false;
				// video
				/*READY_STATE http://www.w3schools.com/tags/av_prop_readystate.asp*/
			} else if (this.readyState !== undefined && this.readyState >= 3) {
				return false;
			} else if (this.complete) {
				return false;
			}

			//console.log(this);
			return true;

		});

        // console.log( "A", a );

		return a.length;
	}

	setTimeout(earlyCachedDetection, preloader.delayBeforeLoadCheck);

	function earlyCachedDetection() {

		var alreadyLoaded = getFilesToLoadCount();

		if (alreadyLoaded === 0) {

			utilLib.debLog('No need to load.');

			preloader.onLoad();
			preloader.disable({
				'rough' : true
			});

			return;

		} else {

			preloader.visuals.loaded.add(preloader.visuals.unloaded).animate({
				'opacity' : 1
			}, 300);
			a();
		}
	}

	function a() {
		var notLoaded = getFilesToLoadCount();

		var loadedPart = (mediaCount - notLoaded ) / mediaCount;

		if (notLoaded === 0) {

			utilLib.debLog('Finished loading');

			preloader.fillVisuals(loadedPart, preloader.onLoad);

		} else {

			setTimeout(a, 1000);

			utilLib.debLog('Still need to load ' + notLoaded);

			preloader.fillVisuals(loadedPart);

		}
	}

};


/*

	resizeables.js

  * Please provide
  * Relevant global variables
  * WindowWidth, windowHeight, windowAspect
  * Call before resizeables.adjust ()
 */

var resizeables = {

	engineCreator: undefined,

	engine: undefined,

	initFromDescript: function(d){
		resizeables.engine.getContainersFromDescript(d);
	},
	init: function(){
		resizeables.engine.findContainers();
	},
	adjust: function(){
		resizeables.engine.adjust();
	},
	fillModes: {
		FILL_PARENT : 'fillParent',
		FIT_PARENT : 'fitParent',
		FIT_PARENT_WIDTH : 'fitParentWidth',
		NONE: 'none'
	},
	orientations: {
		LANDSCAPE : 'landscape',
		PORTRAIT : 'portrait'
	},
	criticalReadabilityClass: 'criticalReadability',

	/* The minimum allowable slider
	 * Font size .criticalReadability */
	minimalReadableFontSize: 11
};



	/* Window.innerWidth and window.innerHeight
	 * Car coder at 100% zoom. */

resizeables.reference = {w:1280, h:923};

resizeables.engineCreator = function(){

	var list = [],
		l,
		obj = resizeables;

	this.findContainers = function(){

		for (var fm in obj.fillModes) {
			jQuery('.' + obj.fillModes[fm]).each(function() {
				var a = new aRContainer(jQuery(this), obj.fillModes[fm]);
				list.push(a);
			});
		}
		l = list.length;
	}

	this.getContainersFromDescript = function(d){

		for (var aRCIndex in d) {
			var aRCData = d[aRCIndex];
			aRCData.jQuerysrc = jQuery(aRCData.srcString);
			var aRC = new aRContainerGeneric(aRCData);
			list.push(aRC);
		}
		l = list.length;
	}

	this.adjust = function() {
		for (var i = 0, arc = list[i]; i < l; i++, arc = list[i]) {
			arc.adjust();
		}
	}

	function aRContainer(jQuerysrc, fillMode) {
		return new aRContainerGeneric({
			jQuerysrc : jQuerysrc,
			fitting : fillMode
		});
	}

	function aRContainerGeneric(src) {

		var jQuerysrc = src.jQuerysrc,
			fitting = src.fitting,
			multiLayout = src.multiLayout,
			initialDim,
			initialDimRelative,
			aspect,
			baseFontSize,
			versionB;

		this.recollectMetrics = function() {

			if(fitting!=obj.fillModes.NONE){
				jQuerysrc.css({
					width : '',
					height : '',
					'font-size' : ''
				});
			}

			initialDim = {
				w : jQuerysrc.outerWidth(true),
				h : jQuerysrc.outerHeight(true)
			};
			aspect = initialDim.w / initialDim.h;
			initialDimRelative = {
				w : initialDim.w / resizeables.reference.w,
				h : initialDim.h / resizeables.reference.h
			};
			baseFontSize = parseInt(jQuerysrc.css('font-size'), 10);

		};

		versionB = true;//src.versionB;

		if(versionB){
			jQuerysrc.css('display','inline-block');
		}

		this.recollectMetrics();

		criticalElements = jQuerysrc.find('.' + obj.criticalReadabilityClass);
		this.parent = jQuerysrc.parent();

		var currentOrientation, lastOrientation = 'none';

		function updateOrientation() {
			currentOrientation = windowAspect > layoutSwitchThreshold ? obj.orientations.LANDSCAPE : obj.orientations.PORTRAIT;
		}

		var layoutSwitchThreshold = 1;
		if (src.layoutSwitchThreshold) {
			layoutSwitchThreshold = src.layoutSwitchThreshold;
		}

		this.adjust = function() {

			if (multiLayout) {

				updateOrientation();

				if (currentOrientation != lastOrientation) {

					jQuerysrc.addClass(currentOrientation).removeClass(lastOrientation);

					this.recollectMetrics();

					lastOrientation = currentOrientation;
				}

			}

			if(fitting==obj.fillModes.NONE) return;

			var anchorDim = 'w', complementDim = 'h';

			if (fitting === obj.fillModes.FILL_PARENT) {
				if (aspect > windowAspect) {
					anchorDim = 'h';
				}
			} else if (fitting === obj.fillModes.FIT_PARENT) {
				if (aspect < windowAspect) {
					anchorDim = 'h';
				}
			}

			if(anchorDim=='h'){
				complementDim = 'w';
			}

			var widthToBe, heightToBe, fontSizeToBe;

			var dimToBe = {
				h: 0,
				w: 0
			};

			var windowDim = {
				h: windowHeight,
				w: windowWidth
			};

			var marginNameTranslation = {
				h: 'margin-left',
				w: 'margin-top'
			};

			dimToBe[anchorDim] =
				windowDim[anchorDim]*
				(fitting === obj.fillModes.FILL_PARENT || versionB ?
					1
					: initialDimRelative[anchorDim]
				);

			dimToBe[complementDim] =
				dimToBe[anchorDim];

			if(complementDim=='h'){
				dimToBe[complementDim] /= aspect;
			} else {
				dimToBe[complementDim] *= aspect;
			}


			if(dimToBe[complementDim]>windowDim[complementDim]){

				var remargin =
					-(dimToBe[complementDim] - windowDim[complementDim]) / 2;

				var complementMargin = marginNameTranslation[anchorDim],
					anchorMargin = marginNameTranslation[complementDim];

				jQuerysrc.css(anchorMargin,'');
				jQuerysrc.css(complementMargin,remargin);
			}

			fontSizeToBe = dimToBe.h/initialDim.h;




			jQuerysrc.width(dimToBe.w);
			jQuerysrc.height(dimToBe.h);

			fontSizeToBe *= baseFontSize;
			jQuerysrc.css('font-size', fontSizeToBe);

			// Here we make sure to have specially marked labels
			// Size was not less than the threshold [obj.minimalReadableFontSize]
			for (var i = 0, l = criticalElements.length;
					 i < l;
					 i++) {

				jQueryce = jQuery(criticalElements[i]);

				jQueryce.css('font-size', '');

				var calculatedFontSize = parseInt(jQueryce.css('font-size'), 10);

				if (calculatedFontSize < obj.minimalReadableFontSize) {
					jQueryce.css('font-size', obj.minimalReadableFontSize + 'px');
				}
			}
		}
	}

	return this;
};

resizeables.engine = new resizeables.engineCreator();




function adjustFontSize() {

	var diminishing = {
		w : window.innerWidth / resizeables.reference.w,
		h : window.innerHeight / resizeables.reference.h
	};

	jQuery('body').css('font-size', baseFontSize * Math.min(diminishing.w, diminishing.h));
}

/* ex-sample.js */



/* * Auxiliary Controls
 */

function wheelStep(windowWidth) {
	var deno = paraSample.settings.mousewheelSlowness.windows;
	if(utilLib.deviceDescription.os == utilLib.OS_TYPES.mac){
		deno = paraSample.settings.mousewheelSlowness.mac;
	}
	return windowWidth / deno;
}

function onMouseWheel(event, delta) {
	para.isWheel = true;
	para.add(-delta * wheelstep);

	event.preventDefault();
	event.stopPropagation();

};

jQuery(document).on( 'keydown', '#body', scrollParallax );
function scrollParallax( e ) {
	if( jQuery( '#parallax' ).length <= 0 ) {
		jQuery( document ).off( scrollParallax );
	}
	if (e.keyCode == '37') {
		para.closerLeft();
		e.preventDefault();
	} else if (e.keyCode == '39' || e.keyCode == '32') {
		para.closerRight();
		e.preventDefault();
	}

}

function onResize() {

	para.onResizeSlides();

	// Splitting onResize parallax and a sequence of functions
	// Being caused by engine avtomasshtabiruemyh containers.
	// OnResizeLayers depends on the results of (approval requires verification)
	// Because onResizeLayers follows after.

	nonParaResize();

	para.onResizeLayers();

}




function nonParaResize() {

	windowWidth = jQuery(window).innerWidth();
	windowHeight = jQuery(window).innerHeight();
	windowAspect = windowWidth / windowHeight;

	wheelstep = wheelStep(windowWidth);

	adjustFontSize();
	resizeables.adjust();

}


var hashProcessingSystem = {

	doNotApplyHashFromAddressLine : false,

	userLock : false,

	lastSlideI : 0,

	applyHashFromAddressLine : function() {

		var addr = self.location.toString(), selectedSlide = addr.slice(addr.indexOf('#') + 1);
		if (selectedSlide == undefined)
			return;

		for (var h in hashProcessingSystem.addrMap) {
			if (selectedSlide == hashProcessingSystem.addrMap[h] && h != hashProcessingSystem.lastSlideI) {
				hashProcessingSystem.userLock = true;
				para.toSlide((+h));

				// Written by: Greg
				var hashName = addr.match(/#.*/);
				hashName = hashName[0];
				hashName = hashName.substring( 1 );
//				console.log( hashName );
				// changeMenuTitle( hashName );

				return;
			}
		}
	},

	trackHashChange : function trackHashChange() {

		if (paraSample.settings.disableAutoHashChange) return;

		// Value para.currentSlideI not correspond to the current offset,
		// And end. Hence, after the user has entered a hash
		// And began the transition, the value will change only once.
		if (para.currentSlideI != hashProcessingSystem.lastSlideI) {

			hashProcessingSystem.lastSlideI = para.currentSlideI;

			if (hashProcessingSystem.userLock) {
				hashProcessingSystem.userLock = false;
				return;
			} else {
				hashProcessingSystem.doNotApplyHashFromAddressLine = true;
			}

			var infoString = 'trackHashChange : Changing hash. ';
			if (hashProcessingSystem.doNotApplyHashFromAddressLine) {
				infoString += ' Has doNotApplyHashFromAddressLine.';
			}
			if (hashProcessingSystem.userLock) {
				infoString += ' Has userHashLock.';
			}

			window.location.hash = hashProcessingSystem.addrMap[para.currentSlideI];

			// call custom function
			// written by: Greg
			// changeMenuTitle( hashProcessingSystem.addrMap[para.currentSlideI] );

		}
	}
}

function changeMenuTitle( hashName ) {
	var menuTitle = document.getElementById( 'menu-title' );
//	console.log( 'menuTitle: ' + menuTitle );

	switch( hashName ) {
		case '':
			menuName = 'About';
			break;
		case 'team':
			menuName = 'Team';
			break;
		case 'offices':
			menuName = 'Offices';
			break;
		default:
			menuName = '';
	}
	menuTitle.innerHTML = menuName;

}

jQuery(window).on('hashchange', function(e) {

	e.preventDefault();

	if (hashProcessingSystem.doNotApplyHashFromAddressLine) {
		//tdLib.debLog('jq.window.onhashchange : doNotApplyHashFromAddressLine, so returning.');
		hashProcessingSystem.doNotApplyHashFromAddressLine = false;
		return;
	}

	hashProcessingSystem.applyHashFromAddressLine();

	return false;

});


// The user starts this feature

function startAllParaSystems() {

	if(Modernizr.history
		&& window.history.state
		&& window.history.state.mediaIsLoaded){
			utilLib.debLog('All media is cached. Skipping preloader');
			paraSample.preloaderEnabled = false;

	}
	debugging = self.location.toString().indexOf('xe') > -1;
	var parallaxParams = {
		removeScrollbar : paraSample.settings.removeScrollbar,
		touchNotScrollMode : paraSample.settings.touchNotScrollMode
	}
	if (Modernizr.csstransforms3d) {
		parallaxParams.layerShiftProperty = 'translate3d';
		parallaxParams.parallaxShiftProperty = 'translate3d';
	}
	para = new parallax(parallaxParams);
	baseFontSize = parseInt(jQuery('body').css('font-size'));
	hiddenImagesContainer = jQuery('.preloadedImages');



	jQuery('#parallax').on('init', function(){

		// para.mouseWheelTarget.bind('mousewheel', onMouseWheel);
		jQuery(window).on('resize', onResize);
		hashProcessingSystem.addrMap =
		jQuery('#parallax>div').map(function(i){return i==0?'':jQuery(this).attr('id')});

		if( jQuery( '#parallax' ).hasClass( 'ignore-hashtag' ) ) {
			hashProcessingSystem.doNotApplyHashFromAddressLine = true;
		}

		hashProcessingSystem.applyHashFromAddressLine();
		preloader.disable();

	});

	if( ! jQuery( '#parallax' ).hasClass( 'ignore-hashtag' ) ) {
		jQuery('#parallax').on('scrollChange', function(amount) {

			hashProcessingSystem.trackHashChange();
		});
	}

	function onPreloaderLoad(){

		if(Modernizr.history){

			jQuery('a').on('click',function (args) {

				var href = jQuery(this).attr('href');
				if(href=='' || href =='#') return;

				window.history.pushState({
					mediaIsLoaded: 'true'
				}, 'mediaIsLoaded');

			});

		};

		resizeables.initFromDescript(aRCDescript);

		nonParaResize();

		if (parallax) {
			para.init();
		}

	}

	if(paraSample.preloaderEnabled){
		preloader.onLoad = onPreloaderLoad;
	} else {
			preloader.init();
			onPreloaderLoad();
	}

	if(paraSample.preloaderEnabled){
		preloader.start();
	}

};
