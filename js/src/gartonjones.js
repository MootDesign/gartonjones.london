jQuery(function () {
	jQuery(window).load(function () {
		jQuery("img.lazy").lazyload();
		jQuery('.perfect-scrollbar').perfectScrollbar();
	});

	// this is for the single developments only
	// load images after 5 seconds
	jQuery(function () {
		jQuery("img.lazy").lazyload({
			event: "sporty"
		});
	});

	jQuery(document).ready(function () {
		jQuery('#grid').scroll(function () {
			jQuery("img.lazy").lazyload();
		});

		jQuery('#strips').scroll(function () {
			jQuery('img.lazy').lazyload();
		});
	});

	if (jQuery('body').hasClass('single-developments')) {
		jQuery(window).bind("load", function () {
			var timeout = setTimeout(function () {
				jQuery("img.lazy").trigger("sporty")
			}, 5000);
		});
	}
});

jQuery(document).ready(function ($) {
	$(document).foundation('reflow');

	// check if the cookie policy is set
	checkCookiePolicy();

	// after 2 seconds the quick request should drop down
	$(window).load(function () {
		if ($('#register').length > 0 && $('body').hasClass('page-child')) {
			$('#register').addClass('visible');

			$('#register .title').click(function () {
				$(this).parent().find('.the-content').slideToggle();
			});
		}

		setTimeout(function () {
			$('#register .title').trigger('click');
		}, 2000);

		if ($('body').hasClass('blog') || $('body').hasClass('page-child'))
			return false;

		if ($('body').hasClass('single-developments') && $('body').find('#timetable').length > 0) {
			setTimeout(function () {
				$('#register .title').trigger('click');
			}, 7000);
		} else if (!$('body').hasClass('single-developments')) {
			setTimeout(function () {
				$('#register .title').trigger('click');
				// $( '.quick-request-link' ).trigger( 'click' );
			}, 2000);
		}
	});

	if ($('#myholder').length > 0) {
		$windowHeight = $(window).height();

		var $top = $windowHeight / 2 - 400;
		if ($top < -100) {
			$top = 0;
		}
		// set coverflow height according to the window height
		$('#myholder').css('margin-top', $top);

		if ($windowHeight < 600) {
			$('.bottomlogo2 img').hide();
		}
	}

	// for the single prop views
	// responsive bus view
	if ($('body').hasClass('single-post')) {
		var busW = 550;
		var rentW = 41;
		var sellW = 37.5;
		var clickW = 91;
		var slideW = 67;
		var descW = 935;

		var bus = $('#bus > a');
		var rent = bus.find('.text-rent');
		var sell = bus.find('.text-sell');
		var click = bus.find('.text-click');
		var slide = bus.find('.cycle-slideshow');
		var desc = $('.desc');

		var ratio = 1;

		function busSize() {
			if (desc.width() < 600) {
				ratio = 100 / 600 * desc.width() / 100;
			}

			bus.width(busW * ratio);
			rent.width(rentW * ratio);
			sell.width(sellW * ratio);
			click.width(clickW * ratio);
			slide.width(slideW * ratio);
		}

		busSize();

		$(window).resize(function () {
			busSize();
		});
	}

	//Deferred loading
	$('.load-me').on('loadme', function () {
		var $this = $(this);
		if ($this.hasClass('loaded')) return;

		var src = $this.data('src');

		// console.log( "Deferred: ", this.tagName, src );
		if (this.tagName.toLowerCase() == "video") {
			// if window is mobile size, just don't load the video
			if ($(window).width() < 767) {
				return false;
			}
			var video = document.createElement('video');
			video.id = this.id;
			video.src = src;
			video.setAttribute('type', 'video/mp4');
			// video.setAttribute('class', '');

			if ($this.hasClass('autoplay')) {
				video.setAttribute('autoplay', 'autoplay');
				video.setAttribute('loop', 'loop');
			}

			$(this).parent().append(video);
			$(this).remove();
		} else if (this.tagName.toLowerCase() == "audio") {
			var $source = $('<source>');
			$source.attr('src', src).attr('type', 'audio/mpeg');

			$this.append($source);
		} else {
			$this.attr('src', src);
		}

		$this.addClass('loaded').removeClass('load-later');
	});

	// console.log( "Content to be loaded: ", $( '.load-me' ).length );
	// load this things after window load :)
	$(window).load( function() {
		$('.load-me').each(function () {
			if ($(this).hasClass('load-later')) return;

			$(this).trigger('loadme');
		});
	});

	// load the background images lazyly too
	$(window).load( function() {
		$('.lazy-background').each( function() {
			// the data-background-url contains the bakcground url. LOL
			$bckUrl = $(this).data('background-url');

			// put it as a css background image
			$(this).css({
				backgroundImage: 'url(' + $bckUrl + ')'
			});
		});
	});

	var isiPad = navigator.userAgent.match(/iPad/i) !== null;

	// Top menu open / close
	jQuery('#mtrigger').click(function (e) {
		e.preventDefault();
		jQuery('.slmenu').toggleClass('visible').toggle('fast', 'swing');

		if (jQuery('.slmenu').hasClass('visible') && !jQuery('#menugrayout').is(':visible'))
			jQuery('#menugrayout').fadeIn('fast');

		if (!jQuery('.slmenu').hasClass('visible') && !jQuery('#menugrayout').hasClass('no-close')) {
			jQuery('#menugrayout').fadeOut('fast');
		}

		showClose(500, '#menu');
		jQuery('nav .right .hideme').fadeToggle();

		jQuery('#changethis').toggleText('Menu', 'CLOSE');

	});

	// Footer open / close
	jQuery('.clickarea').click(function (e) {
		e.preventDefault();
		if ($(window).width() > 767) {
			jQuery('.offinfo').toggle('slow');

			/*
			 * in contact-us page the footer is visible by default, so I don't have to show the
			 * shadow on the first click
			 */
			if (!jQuery('#footer-inner').hasClass("expanded")) {
				jQuery('#menugrayout').fadeToggle('slow');
			}

			jQuery('.back-footer-office').fadeToggle('slow');

			jQuery('.bottomlogo img').fadeToggle('slow');

			jQuery('#footer-inner').removeClass("expanded");
		} else {
			jQuery('.offinfo').not($(this).nextAll('.offinfo')).hide('slow');
			jQuery(this).nextAll('.offinfo').toggle('slow');
		}
	});

	jQuery('.c-panel .fa.more').click(function (e) {
		e.preventDefault();
		var speed = (jQuery('.quick-links-content').length > 0 && !jQuery('.fa.more').hasClass('open')) ? 0 : 400;
		jQuery('.c-panel .fa.more').toggleClass('open');
		jQuery('#more-results').slideToggle(speed);

		return false;
	});

	//close open content if scanlines are clicked
	jQuery('#menugrayout').click(function (e) {
		e.preventDefault();
		//TODO: Add no-close class to avoid menugrayout close on click
		if (jQuery(this).hasClass('no-close')) return;

		if (jQuery('.slmenu').is(":visible")) {
			jQuery('.slmenu').toggleClass('visible').toggle('slow');
		}
		if (jQuery('.offinfo').is(":visible")) {
			jQuery('.offinfo').toggle('slow');
		}
		if (jQuery('#quickview').is(":visible")) {
			jQuery('#quickview').fadeOut('slow');
			jQuery('#contentabout').fadeTo(500, 1);
		}

		jQuery('#changethis').toggleText('Menu', 'CLOSE');

		if (jQuery('.close-me').length > 0)
			jQuery('.close-me').trigger('click');

		jQuery('#menugrayout').fadeOut();
	});

	// sound controls
	jQuery('.sound-control').click(function (e) {
		e.preventDefault();

		if (jQuery(this).hasClass('off')) {
			jQuery(this).addClass('on').removeClass('off');
			jQuery(this).find('.state').text('on');
			jQuery('video, audio').each(function () {
				jQuery(this).prop('muted', false);
				Cookies.set('muted', false);
			});
		} else if (jQuery(this).hasClass('on')) {
			jQuery(this).addClass('off').removeClass('on');
			jQuery(this).find('.state').text('off');
			jQuery('video, audio').each(function () {
				jQuery(this).prop('muted', true);
				Cookies.set('muted', true);
			});
		}
	});

	// if the cookie is set to muted, let it be muted :)
	if (Cookies.get('muted') == "true") {
		jQuery('.sound-control').removeClass('on').addClass('off');
		jQuery('.sound-control').find('.state').text('off');

		jQuery('video, audio').each(function () {
			jQuery(this).prop('muted', true);
		});
	}


	if (jQuery('body').find('#parallax').length > 0 || jQuery('body').find('#tablet-parallax').length) {
		jQuery('.back-to-top').remove();
	}

	// Scroll to top
	jQuery('.back-to-top').click(function (e) {
		e.preventDefault();

		jQuery("html, body").animate({
			scrollTop: 0
		}, "slow"); // for normal pages
		jQuery('#grid').animate({
			scrollTop: 0
		}, "slow"); // for the grid layout
		jQuery('#strips').animate({
			scrollTop: 0
		}, "slow"); // and this is for the a-z list layout
	});

	/**
	 * To show the parallaxes, I will change the original link to parallax link
	 * This will ensure if JS is turned off on the browser, the client will see
	 * the page normally, and won't be stucked on parallax
	 */
});

function vmap(lat, lon, content) {
	//point = new google.maps.LatLng(51.52098748772112, -0.14747858047485352);
	point = new google.maps.LatLng(lat, lon);

	map = new google.maps.Map(document.getElementById("mapholder"), {
		center: new google.maps.LatLng(0, 0),
		zoom: 16,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		// panControlOptions: {
		// 	position: google.maps.ControlPosition.LEFT_BOTTOM
		// },
		// mapTypeControl: true,
		// mapTypeControlOptions: {
		// 	style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
		// 	position: google.maps.ControlPosition.LEFT_BOTTOM
		// },
		// zoomControlOptions: {
		// 	style: google.maps.ZoomControlStyle.SMALL,
		// 	position: google.maps.ControlPosition.LEFT_BOTTOM
		// },
		// streetViewControl: true
		mapTypeControl: true,
		mapTypeControlOptions: {
			style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
			position: google.maps.ControlPosition.BOTTOM_CENTER
		},
		zoomControl: true,
		zoomControlOptions: {
			position: google.maps.ControlPosition.LEFT_CENTER
		},
		scaleControl: true,
		streetViewControl: true,
		streetViewControlOptions: {
			position: google.maps.ControlPosition.LEFT_BOTTOM
		}
	});

	var bni_style = [
		{
			featureType: "road.arterial",
			stylers: [
				{
					hue: "#a99959"
				},
				{
					visibility: "on"
				},
				{
					saturation: 0
				}
			]
		},
		{
			featureType: "landscape.man_made",
			stylers: [
				{
					visibility: "on"
				},
				{
					hue: "#342F1F"
				},
				{
					saturation: 40
				}
			]
		},
		{
			stylers: [
				{
					visibility: "on"
				},
				{
					hue: "#a99959"
				},
				{
					saturation: -65
				},
				{
					lightness: -7
				}
			]
		}
	];

	// var image = new google.maps.MarkerImage ('/wp-content/themes/new_theme/img/gj-marker-double.png');

	var image = {
		url: '/wp-content/themes/new_theme/img/gj-marker-double.png',
		// This marker is 20 pixels wide by 32 pixels high.
		size: new google.maps.Size(42, 76),
		scaledSize: new google.maps.Size(21, 38)
	};

	var marker = new google.maps.Marker({
		position: point,
		map: map,
		animation: google.maps.Animation.DROP,
		icon: image
	});

	if (content) {
		var infowindow = new google.maps.InfoWindow();

		infowindow.setContent(content.html());
		infowindow.open(map, marker);
	}

	map.setCenter(point);
	// map.setOptions({styles: bni_style});

	google.maps.event.addListenerOnce(map, 'idle', function () {
		var map_gradient = document.createElement('div');
		map_gradient.setAttribute('id', 'map-gradient');
		jQuery('#heading div').first().append(map_gradient);
		jQuery('.gmnoprint').css('z-index', '92');
	});
}



function vsv(lat, lon) {
	var fenway = new google.maps.LatLng(lat, lon);

	// Note: constructed panorama objects have visible: true
	// set by default.
	var panoOptions = {
		position: fenway,
		addressControlOptions: {
			position: google.maps.ControlPosition.BOTTOM_CENTER
		},
		pov: {
			heading: 1, // php if (get_field('svhd')){ the_field('svhd'); } else { echo 1; } ,
			pitch: 1
		},

		linksControl: false,
		panControl: false,
		zoomControlOptions: {
			style: google.maps.ZoomControlStyle.SMALL
		},

		enableCloseButton: false
	};

	var panorama = new google.maps.StreetViewPanorama(
		document.getElementById('mapholder'), panoOptions);
}

jQuery.fn.extend({
	toggleText: function (a, b) {
		var isClicked = false;
		var that = this;

		setTimeout(function (that) {
			if (!jQuery('.slmenu').hasClass('visible')) {
				that.text(a);
			} else {
				that.text(b);
			}
		}, 100, this);
	}
});

jQuery('#changethis').toggleText('Menu', 'CLOSE');

//Left subitems menu
jQuery(document).ready(function () {
	jQuery('.submenu li.subitems').each(function () {
		$li = jQuery(this).prev();

		$li.click(function () {
			//Close all the active menus
			jQuery('.submenu > li.show').not(this).each(function () {
				toggleSubmenu(jQuery(this));
			});

			toggleSubmenu(jQuery(this));

			return false;
		});
	});

	//There is some active subitems?
	$active = jQuery('.submenu li.subitems a.active');

	if ($active.length > 0) {
		toggleSubmenu($active.parents('li.subitems').prev());
	}

	//The active main menu has subitems?
	$active = jQuery('.submenu > li a.active');
	if ($active.length > 0) {
		if ($active.parents('li').next().hasClass('subitems')) toggleSubmenu($active.parents('li'));
	}
});

function toggleSubmenu($this) {
	$next = $this.next();

	$this.toggleClass('show');

	var h = ($this.hasClass('show')) ? ($next.find('ul').outerHeight() + 20) : 0;
	$next.animate({
		height: h
	}, 'slow');
}
// footer quick links
jQuery(document).ready(function () {

	jQuery('.c-panel-link a').click(function (e) {
		e.preventDefault();

		if (jQuery('.quick-links-content').length > 0 && !jQuery('.fa.more').hasClass('open') &&
			!jQuery(this).hasClass('close')) {
			jQuery('.fa.more').trigger('click');
		}

		// jQuery( '.c-panel' ).slideToggle();
		if (jQuery('.c-panel').is(':visible')) {
			jQuery('.c-panel').slideUp();
			jQuery('#more-results').slideUp();
			jQuery('.css-big-plus, .css-plus').removeClass('close');
		} else {
			jQuery('.c-panel').slideDown();
			jQuery('#more-results').slideDown();
			jQuery('.css-big-plus, .css-plus').addClass('close');
		}

		jQuery('.c-panel').promise().done(function () {
			if ( jQuery( '.c-panel' ).is(':visible') && jQuery(window).width() > 767 ) {
				jQuery('.clickarea').css('pointer-events', 'none');
			} else {
				jQuery('.clickarea').css('pointer-events', '');
			}
		});

		return false;
	});

});

// form accordian for quick links
jQuery(document).ready(function () {
	jQuery('#toggle-form').click(function () {
		jQuery('#field_11_5, #field_11_6, #field_11_10, #field_11_8').slideToggle();
	});
});

var SimpleLazy = {
	$_items: null,

	init: function () {
		this.$_items = jQuery('.quick-links-content #wording > .row').children();

		setTimeout(function () {
			SimpleLazy.onScroll();
		}, 500);

		this.isFF = navigator.sayswho.toLowerCase().indexOf('firefox') >= 0;

		jQuery(document).scroll(this.onScroll);
	},

	onScroll: function (e) {
		//        jQuery( '.quick-links-content #wording' ).css( { top: - jQuery( document ).scrollTop() } );
		jQuery('.quick-links-content #wording').stop(true, false).transit({
			y: -jQuery(document).scrollTop()
		}, 0);

		/*
		 * There is some issue with ff, probably due a some shit css rules, and so it ignore "fixed" position.
		 * This hack just move all the body in according to scroll position
		 */
		if (SimpleLazy.isFF) {
			jQuery('.page-template-templatesquicklinks-php').css({
				marginTop: jQuery(document).scrollTop()
			});
		}

		setTimeout(function () {
			var j = 0;

			SimpleLazy.$_items.each(function (i) {
				var visible = SimpleLazy.isVisible(jQuery(this));
			});
		}, 100);
	},

	/*
	 * In according to current page scroll value, check if the item is visible
	 */
	isVisible: function ($item) {
		//Page scroll value
		var scroll = jQuery(document).scrollTop();
		var height = window.outerHeight;
		var top = $item.position().top + 85;
		var windowScroll = (height + scroll - 200);


		var visible = top <= windowScroll;

		if (visible && !$item.hasClass('visible')) {
			$item.removeClass('hide-to-top').addClass('visible show-from-bottom');

		}

		//The div is no longer visible ( is above of displayed content )
		scroll += 85;
		var isAbove = top <= scroll;

		if (isAbove) {
			var opacity = (scroll - top) / scroll;

			$item.css({
				opacity: 0.6 - Math.abs(opacity)
			});
		} else {
			if ($item.hasClass('visible'))
				$item.css('opacity', '');
		}

		scroll -= 100;
		isAbove = top <= scroll;

		if (isAbove && !$item.hasClass('hide-to-top')) {
			$item.addClass('hide-to-top').removeClass('visible');
		}

		top += 50;
		if (top > windowScroll) {
			$item.removeClass('visible').removeClass('show-from-bottom').removeClass('hide-to-top');
		}

		return visible;
	}
};

jQuery(document).ready(function () {
	var $ql = jQuery(".quick-links-content");

	$ql.find('.property-image').each(function () {
		jQuery(this).attr('src', jQuery(this).data('src'));
	});
	//
	// if( ! jQuery( 'html' ).hasClass( 'touch' ) ) {
	//     SimpleLazy.init();
	//     var width = $ql.width();
	//
	//     $ql.css( { marginLeft: - width / 2, left: '50%' } );
	//
	//     setTimeout( function() {
	//         $ql.animate( { top: -30, opacity: 1 }, 'slow', function() {
	//             jQuery( '.more-options li.subitems' ).css( { height: 'auto' } );
	//
	//             jQuery( '.div-empty, .scroll-me > .row' ).height( $ql.outerHeight() + jQuery( '.more-options' ).outerHeight() );
	//             jQuery( '.more-options li.subitems' ).css( { height: 0 } );
	//         });
	//     }, 500 );
	//
	// } else {
	//     $ql.show();
	//
	//     //In portrait mode check if the "Contact Us now" div fix in the page
	//     jQuery( document ).resize( function() {
	//         setTimeout( function() {
	//             var $cus = jQuery( '.page-template-templatesquicklinks-php .wiref3' );
	//
	//             //Remove the height attribute in landscape
	//             if( document.body.clientWidth > document.body.clientHeight ) {
	//                 $cus.css( 'height', '' );
	//             } else {
	//                 if( $cus.position().top + $cus.outerHeight() > document.body.clientHeight ) {
	//                     $cus.height( document.body.clientHeight - $cus.position().top - 50 );
	//                 }
	//             }
	//
	//         }, 500 );
	//     });
	// }
});

navigator.sayswho = (function () {
	var ua = navigator.userAgent,
		tem,
		M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
	if (/trident/i.test(M[1])) {
		tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
		return 'IE ' + (tem[1] || '');
	}
	if (M[1] === 'Chrome') {
		tem = ua.match(/\bOPR\/(\d+)/);
		if (tem !== null) return 'Opera ' + tem[1];
	}
	M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
	if ((tem = ua.match(/version\/(\d+)/i)) !== null) M.splice(1, 1, tem[1]);
	return M.join(' ');
})();

jQuery(document).ready(function () {
	if (jQuery('body.single-post, body.single-2d').length > 0) {
		jQuery(document).scroll(function () {
			jQuery('#heading').css({
				top: -jQuery(document).scrollTop() / 8
			});
		});
	}
});

//Swiper
jQuery(document).ready(function ($) {
	if ($('body').hasClass('single-post')) {
		swiper = new Swiper('.swiper-container', {
			slidesPerView: 1,
			loop: true,
			shadow: false,
			//3D Flow:
			tdFlow: {
				rotate: 30,
				stretch: 10,
				depth: 100,
				modifier: 1,
				shadows: false
			}
		});
		$('#lh2').on('click', function (e) {
			e.preventDefault();
			swiper.swipePrev();
		});
		$('#rh2').on('click', function (e) {
			e.preventDefault();
			swiper.swipeNext();
		});
	}
});

function isElementInViewport(el) {

	//special bonus for those using jQuery
	if (typeof jQuery === "function" && el instanceof jQuery) {
		el = el[0];
	}

	var rect = el.getBoundingClientRect();

	return (
		rect.top >= 0 &&
		rect.left >= 0 &&
		rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
		rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
	);
}

function isElementVisible(el) {

	//special bonus for those using jQuery
	if (typeof jQuery === "function" && el instanceof jQuery) {
		el = el[0];
	}

	var rect = el.getBoundingClientRect();

	return (
		rect.top >= 0 &&
		rect.left >= 0 //&&
		// rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
		// rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
	);
}

function showPopup(id) {
	jQuery('#' + id).addClass('visible');
	showShade(500, true);
}


// resize the svg
(function ($) {
	$(document).ready(function () {
		if ($('body').hasClass('home')) {
			var scaleTo = $('.row-home').width();
			var scaleThis = $('.grafity').width();

			var scaling = 100 / scaleThis * scaleTo / 80;
			var prevTransform = $('.grafity').css('transform');
			$('.grafity').css('transform', prevTransform + ' scale(' + scaling + ')');
			// console.log('grafity scaling to: ' + scaling );
		}
	});
})(jQuery);

(function ($) {
	$(window).load(function () {
		if ($('#video1').length) {
			var windowHeight = $(window).height();
			var videoHeight = $('#video1').height();

			var marginTop = (windowHeight - videoHeight) / 2;

			$('#video1').css({
				//marginTop: marginTop
			});
		}
	});
})(jQuery);

/**
 * Add the class .show on load
 */
// function showOnload() {
jQuery(document).ready(function () {
	jQuery('.show-onload').each(function () {
		jQuery(this).addClass('show');
	});
});
// }
// showOnload();

jQuery(window).load(function () {
	(function ($) {
		var minWidth = 300,
			cellWidth = 450,
			ratio = 1.5;
		var resizeInterval = 300;
		var openItems = [];

		var $grid = $('.responsive-grid');

		var get_cell_width = function (items) {
			//30px is the width of the scrollbar
			// return ( window.innerWidth - 15 ) / items;
			return ($('#grid').width()) / items;
		};

		var reflow_grid = function (speed) {
			var items = Math.round(window.innerWidth / cellWidth);
			var width = get_cell_width(items);
			speed = speed || 400;

			/*
			 * I don't want cell smaller than the minimum size.
			 */
			if (width < minWidth && items > 1) {
				items--;
				width = get_cell_width(items);
			}
			var height = width / ratio;

			var position = {
				x: 0,
				y: 0
			};
			var currentItem = 0;
			$('.responsive-grid .item').each(function (i) {
				var $this = $(this);

				if ($this.hasClass('clone')) {
					$original = $this.data('original');

					var style = $original.attr('style');
					var re = /rotateX[^;]*/;

					style = style.replace(re, '');
					$this.attr('style', style).show();

					var $data = $this.find('.back .data');
					$data.css({
						marginTop: ($this.find('.back').outerHeight() - $data.outerHeight()) / 2
					});

					return;
				}

				if ($this.hasClass('hide-me')) {
					$this.stop(true, false).delay(currentItem * 50).transition({
						scale: 0,
						opacity: 0
					});

					return;
				}

				if (currentItem > 0 && (currentItem % items) === 0) {
					position.x = 0;
					position.y += height;
				}

				// $this.data( 'position', position );
				this.dataset.positionX = position.x;
				this.dataset.positionY = position.y;
				// console.log( $( this ).data( 'position' ) );
				$this.transition({
						x: position.x,
						y: position.y,
						width: width,
						height: height,
						scale: 1,
						opacity: 1
					}, speed,
					function () {
						showTheGridItem(this, $(this).index(), $(this).closest('.responsive-grid'));
					});

				position.x += width;
				currentItem++;
			});

			$('#grid .show-more').transition({
				x: '-50%',
				y: position.y + height + 20
			}, speed);
		};

		var showTheGridItem = function (e, index, $grid) {
			if ($(e).hasClass('visible')) return;

			var scrollTop = $(window).scrollTop() + $grid.scrollTop();
			var height = $('body').height();
			// var y = getMatrixM41( e[0] );
			var y = getMatrixM41(e.get(0));
			var isVisible = (y <= scrollTop + height - $grid.outerHeight() / 3.5);

			// console.log( isVisible, y, scrollTop, height, $grid.outerHeight() / 3.5 );

			if (isVisible) {
				var $img = $(e).find('img');
				$img.attr('src', $img.data('src'));

				$(e).addClass('visible');
				$(e).delay(50 * index).animate({
					opacity: 1
				}, 'slow');
			}
		};

		var closeOpenedItems = function () {
			openItems.forEach(function ($item) {

				$item.transition({
					rotateX: '-92deg'
				}, 100, 'linear', function () {

					var $original = $(this).data('original');

					$original.show().transition({
						rotateX: '92deg'
					}, 0).transition({
						rotateX: '0deg'
					}, 100, 'linear');
					$original.removeClass('flipped');
					$(this).remove();
					// $original.transition( { x: position.x, y: position.y, rotateX: '92deg' }, 0 ).transition( { rotateX: '0deg' }, 200, 'linear' );
				});
			});
		};

		var openItem = function (e) {
			if ($(e).hasClass('no-flip')) {
				$(e).removeClass('no-flip');

				return;
			}

			closeOpenedItems();

			var position = {
				x: e.dataset.positionX,
				y: e.dataset.positionY
			};

			$(e).transition({
				rotateX: '-92deg'
			}, 200, 'linear', function () {
				$(this).hide();

				//Duplicate the item
				var $d = $(this).clone();
				$d.attr('z-index', 1);
				$d.find('.front').hide();

				$d.find('.back').show();
				$d.data('original', $(this));
				$d.addClass('clone').show();
				openItems.push($d);

				$grid.append($d);

				// TODO: The plugin override the translate position, so I need to get it from the item
				var $data = $d.find('.back .data');
				// console.log( $d.find( '.back' ), $d.find( '.back' ).outerHeight(), $data.outerHeight(), 2 );
				$data.css({
					marginTop: ($d.find('.back').outerHeight() - $data.outerHeight()) / 2
				});

				$d.transition({
					x: position.x,
					y: position.y,
					rotateX: '92deg'
				}, 0).transition({
					rotateX: '0deg'
				}, 200, 'linear', function () {
					$(this).find('.button-close').addClass('open');
				});
			});
		};

		$(document).ready(function () {
			$('body').on('click', '.responsive-grid .item .fees, .icons .fees, #grid .fees', function () {
				$(this).closest('.item').addClass('no-flip');

				var $fees = $('#fees');
				$fees.css({
					marginLeft: -$fees.outerWidth() / 2,
					marginTop: -$fees.outerHeight() / 2
				});
				$fees.addClass('visible');

				showClose(500, $('#fees'));
				showShade();
			});

			$(document).on('click', '.responsive-grid .item, #grid .item', function (event) {
				if ($(this).hasClass('video-grid')) {
					// play the video automagically
					if ($(this).find('a').each(function () {
						if ($(this).data('revealId')) {
							var popupId = '#' + $(this).data('revealId');
							$(popupId).find('video').get(0).play();
						}
					}));
				}
				
				if ($(this).hasClass('no-back') || $(this).hasClass('video-grid') || $(this).hasClass('no-flip')) {
					return false;
				}

				url = $(this).find('.link a').attr('href');

				if ($(this).parents('article#developments').length > 0) {
					// window.open(url, '_blank')
					window.location.assign($(this).find('.link a').attr('href'));
					return false;
				}

				if ($('body').hasClass('single-developments')) {
					// window.open(url, '_blank')
					window.location.assign($(this).find('.link a').attr('href'));
					return false;
				}

				// no flipping on grid view :)
				// window.open(url, '_blank')
				window.location.assign($(this).find('.link a').attr('href'));
				return false;

				$(this).addClass('flipped');

				//Need to wait that the function .fees apply the classe, if clicked on it...
				setTimeout(function (e) {
					openItem(e);
				}, 50, this);
			});

			$(document).on('click', '.more-video', function () {
				var win = window.open($(this).attr('href'), '_blank');
				win.focus();
			});

			// $( '.responsive-grid .item' ).not( '.clone' ).not( '.no-back' ).not('.video-grid').click( function( event ) {


			// });

			$('body').on('click', '.responsive-grid .back .button-close', function () {
				closeOpenedItems();
			});

			$grid.on('reflow', function () {
				closeOpenedItems();

				reflow_grid('slow');
			}).scroll(function () {
				$('.responsive-grid .item').not('.visible').each(function (i) {
					showTheGridItem($(this), i, $grid);
				});
			});

			reflow_grid();

			if ($('body').hasClass('touchevents')) {
				$('.responsive-grid .item').addClass('visible');
			}
		});

		$('#grid').on('showNewGrid', function () {
			reflow_grid();
		});

		$(window).load(function () {
			var $rg = $('.responsive-grid');
			// $rg.height( $( 'body' ).height() + $( '#foot' ).height() * 4 );
		}).resize(function () {
			clearTimeout(resizeInterval);

			resizeInterval = setTimeout(function () {
				reflow_grid();
			}, 100);
		});

		$('.refine-arrow').click(function () {
			if ($(window).width() < 768) {
				$(this).parents('.refined-search').toggleClass('open')
			} else if ($(window).width() < 910) {
				$(this).parents('.refined-search').find('.table-cell.text-center').slideToggle();
			}
		});

		/**
		 * News tabs on mobile
		 */
		// if ( $( '#news-row' ).length ) {
		//   var nRow = $( '#news-row' );

		//   var titles = nRow.find( '.page-title' );
		//   var columns = nRow.find( '.columns' ).not('.page-title');

		//   var i = 1;

		//   titles.each( function() {
		//     $( this ).data( 'order', i++ );
		//   });

		//   if ( $( window ).width() < 768 ) {
		//     titles.first().addClass( 'active' );
		//     columns.eq(1).addClass( 'active' );
		//   }

		//   titles.click( function() {
		//     if ( $( window ).width() < 768 ) {
		//       titles.removeClass( 'active' );
		//       $( this ).addClass( 'active' );

		//       // get the order
		//       var tabOrder = $( this ).data( 'order' );

		//       columns.each( function() {
		//         if ( $( this ).data( 'order' ) == tabOrder ) {
		//           // remove active from all, and make the found one active
		//           columns.removeClass( 'active' );
		//           $( this ).addClass( 'active' );
		//         }
		//       });
		//     }
		//   });

		//   $( window ).resize( function() {
		//     var nRow = $( '#news-row' );

		//     var titles = nRow.find( '.page-title' );
		//     var columns = nRow.find( '.columns' ).not('.page-title');

		//     if ( $( window ).width() > 768 ) {
		//       titles.removeClass( 'active' );
		//       columns.removeClass( 'active' );
		//     } else {
		//       if ( ! titles.hasClass( 'active' ) ) {
		//         titles.first().addClass( 'active' );
		//         columns.eq(1).addClass( 'active' );
		//       }
		//     }
		//   });
		// }

		$(document).ready(function () {
			$('.single-post .photos.linx, .single-post .map.linx, .single-post .streetview.linx').click(function () {
				if ($(window).width() > 768) {
					$('#details').animate({
						'marginTop': $('#heading').height() - $('#navigation-menu').height() - $('.top-bar').height()
					}, 400);
					$('#register.open .title').trigger('click');
					$('.back-to-details').fadeIn();
				}
			});

			oneTimeOnly = true;
			$(document).on('opened.fndtn.reveal', '[data-reveal]', function () {
				var modal = $(this);

				if (oneTimeOnly && modal.parents('body.single-post.safari').length > 0 && modal.attr('id') == 'worth-popup') {
					modal.css('top', parseInt(modal.css('top')) - parseInt(modal.height()));
					console.log(parseInt(modal.css('top')) - parseInt(modal.height()));
					oneTimeOnly = false;

					setTimeout(function () {
						oneTimeOnly = true;
					}, 500);
				}
			});

			$(".toggle-content-link").click(function () {
				$(this).parent().nextAll(".toggle-content").slideDown();
				$(this).hide();
				$(this).parents(".main").first().css("max-height", "300px").perfectScrollbar()
			});
		});

		$('.single .to-worth').click( function() {
			if ($(window).width() < 767) {
				$('html, body').animate({
					scrollTop: 0
				}, 400);
			}
		});
	})(jQuery);
});