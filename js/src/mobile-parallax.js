(function($) {
	'use strict';

	function mobileChangePage() {
		// when loaded, we need to check if we need to scroll down to any of the content
		$('#submenu .submenu-area a').each(function () {
			if ( window.location.hash == $( this ).data('id') ) {
				$(this ).trigger('click');
				$('.submenu-trigger').trigger('click');
			}
		});
	}

	$(window).load(function () {
		// make sure none of the crap gets loaded for mobile
		$( 'article h1, article h2, article h3, article div' ).removeClass( 'fade-me animate-me to-bottom to-top' );

		mobileChangePage();
	});

	$(document).on('mobileChangePage', 'body', function () {
		setTimeout(function() {
			mobileChangePage();
		}, 100 );
	});

	$( document ).ready( function() {
		$('.submenu-trigger').click(function() {
			$('.submenu-area').toggleClass('open');
			$('#submenu .hamburger').toggleClass('open');
		});

		$('.submenu-area a').click(function (e) {
			if ($(this).attr('href').indexOf('http') === -1) {
				e.preventDefault();
			}
				
			$('.submenu-area').toggleClass('open');
			$('#submenu .hamburger').toggleClass('open');

			var scrollToLink = 0;

			if ($($(this).attr('href')).length > 0) {
				scrollToLink = $($(this).attr('href')).offset().top;
			} else {
				// just go to the bottom of the page :)
				scrollToLink = $('body').height();
			}

			$('html, body').animate({
				scrollTop: scrollToLink - 80
			}, 600);
		});
	});

	$(window).scroll(function () {
		// hide the goto
		if ($(window).scrollTop() > 0) {
			$('.hide-on-scroll').fadeOut();
		} else {
			$('.hide-on-scroll').fadeIn();
		}
	});
})(jQuery);