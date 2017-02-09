(function($) {

	// $(document).ready( function() {
	// 	$( '#register .title' ).click( function() {
	// 		$( this ).parent().find( '.the-content' ).slideToggle();
	// 	});
	// });

	// the content sometimes smaller then the show more is showing.
	// make it scrollable nicely
	$( window ).load( function() {
		$( '#register .the-content' ).perfectScrollbar();
	});

 //Toggle register content
	$( '.quick-request-link' ).click( function() {
		var $this = $( this );
		var $register = $('#register');
		var $content = $register.find( '.the-content' );

		$register.toggleClass( 'open' );

		if ( $register.hasClass('open') && !$content.data('height') )
			$content.data( 'height', $content.height() );
		
			var currentHeight = ( $register.hasClass( 'open' ) ) ? $content.data( 'height' ) : 0;

		$content.height( currentHeight );
	});

	setTimeout( function() {
		$('.quick-request-link').trigger('click');
		$('.quick-request-link').trigger('click');
	}, 200 );

	var i = true;

	$( '.toggle-radio' ).click( function() {
		if ( i ) {
			$('.the-content').data('original-height', $('.the-content').height());
			i = false;
		}

		// we don't need to fire the event anymore
		if ( $( '.radio-would' ).is( ':visible' ) ) {
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

	$(document).ready(function() {
		$('.radio-status').click( function() {
			var value = $( this ).val(); // let || sale

			$( '.max-price p' ).addClass( 'hidden' );
			$( '.max-price p.' + value ).removeClass( 'hidden' );

		});
	});

	$(window).load(function() {
		$( '#register' ).addClass( 'visible' );
	});

	$( document ).ready( function() {
		var TOUCH = false;
		var DRAG = false;
		var clientX;
		$( '#refine-inputs .dropdown' ).data('X', 0);
		$( '#refine-inputs .dropdown' ).on('mousedown touchstart', function(e) {
			TOUCH = true;
			clientX = e.clientX;
			if ( e.type == 'touchstart' ) {
				clientX = e.originalEvent.touches[0].pageX;
			}
		}).on('mousemove touchmove', function(e) {
			DRAG = true;
			if ( TOUCH && DRAG ) {
				e.preventDefault();

				eventsClientX = e.clientX;
				if ( e.type == 'touchmove' ) {
					eventsClientX = e.originalEvent.touches[0].pageX;
				}

				if ( $( this ).data( 'X' ) > 0 && eventsClientX - clientX > 0 ) {
					return false;
				}

				if ( $( this ).data( 'X' ) < $( '#refine-inputs' ).width() - $( this ).width() && eventsClientX - clientX < 0 ) {
					return false;
				}

				

				var calculation = parseInt( $( this ).data( 'X' ) ) + eventsClientX - clientX;
				$( this ).css({
					transform: 'translateX( ' + calculation + 'px )'
				});
				$( this ).data( 'X', calculation );

				clientX = e.clientX;
				if ( e.type == 'touchmove' ) {
					clientX = e.originalEvent.touches[0].pageX;
				}
			}
		}).on('mouseup touchend', function() {
			DRAG = false;
			TOUCH = false;
		});

		// $( '#refine-inputs .dropdown' ).on( 'touchmove', function(e) {
		// 	console.log( e );
		// } )

		// $( '#refine-inputs .dropdown' ).swipe( {
		// 	//Generic swipe handler for all directions
		// 	swipeLeft: function(event, direction, distance, duration, fingerCount) {
		// 		console.log( event );
		// 		console.log( distance );

		// 	},
		// 	//Default is 75px, set to 0 for demo so any distance triggers swipe
		// 	threshold:0
		// });
		
		$('.show-change-view').click( function() {
			$('#change-view').toggleClass('open');
		});

		$( '#change-view' ).click( function() {
			$('#change-view').toggleClass('open');
		});
	});
})(jQuery);