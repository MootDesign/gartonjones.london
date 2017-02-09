(function($) {
	$(document).ready(function() {
		//Toggle register content
		$( '#register .title' ).click( function() {
			var $this = $( this );
			var $register = $('#register');
			var $content = $this.parent().find( '.the-content' );

			$this.parent().toggleClass( 'open' );
			
			if( $( this ).parent().attr( 'id' ) != "register" ) return;

			if ( $register.hasClass('open') && !$content.data('height') )
				$content.data( 'height', $content.height() );

			var currentHeight = ( $register.hasClass( 'open' ) ) ? $content.data( 'height' ) : 0;

			//Switch the gallery view
			if( ! $( '#register' ).hasClass( 'open') ) {
			} else {
			}

			$content.height( currentHeight );
		});

		setTimeout( function() {
			$('#register .title').trigger('click');
			$('#register .title').trigger('click');
		}, 200 );

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
				var maxHeight = window.innerHeight - $( '#register' ).position().top - $( '#footer' ).outerHeight() - $( '#register .view-other' ).outerHeight() - 200 - $( '.view-other' ).outerHeight();
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
	});

	$(window).load(function() {
		$( '#register' ).addClass( 'visible' );
	});
})(jQuery);