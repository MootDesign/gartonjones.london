jQuery(document).ready(function() {
		jQuery( '.ser' ).click( function() {
			 jQuery('.optionsholder').removeClass( 'visible' ).addClass( 'optionsholder' );

			 $holder = jQuery( this ).find( '.optionsholder' );
			 if( $holder.hasClass( 'visible' ) ) {
			 } else {
						var pos = $holder.closest( '#wording' ).position();

						$holder.css( 'top', - $holder.height() / 2 + pos.top );

						$holder.removeClass( 'hidden' ).addClass( 'visible' );
			 }
		});

		jQuery( '.ser .opti' ).click( function () {
			 var name = jQuery( this ).closest( '.ser' ).attr( "data-field" );
			 var value = jQuery( this ).attr( 'data-value' );
			 jQuery( this ).closest( '.ser' ).find( '> .sehp' ).html( jQuery( this ).html() );

			 jQuery( 'input[name="' + name + '"]' ).val( value );
		});


		jQuery( '.ser1 .sel1 .opti' ).click( function() {
				var val = jQuery( this ).attr( 'data-value' );

				if( val === undefined ) {
						jQuery( '.ser5 .opti' ).show();
				} else {
						jQuery( '.ser5 .opti' ).hide();
						jQuery( '.ser5 .opti.loc-' + val ).show();
						jQuery( '.ser5 .opti.show-all' ).show();
				}
		});

		jQuery('.search-menu a').click( function(){
			jQuery('.search-menu a').removeClass( 'active' );
			jQuery( this ).addClass( 'active' );
			jQuery( 'input[name="status"]' ).val( jQuery(this).attr('data-value') );
		});
});
