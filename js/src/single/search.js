jQuery(document).ready(function( $ ) {
	$( '.ser h2,.ser sehp' ).click( function() {
		 $('.optionsholder').removeClass( 'visible' );

		 $holder = $( this ).parent().find( '.optionsholder' );
		 console.log($holder);
		 if( $holder.hasClass( 'visible' ) ) {
		 } else {
		 	if ( $( '#wording' ).length ) {
				var pos = $holder.closest( '#wording' ).position();
				$holder.css( 'top', - $holder.height() / 2 + pos.top );
			}

			$holder.addClass( 'visible' );
		 }
	});

		$( '.ser .opti' ).click( function () {
			 var name = $( this ).closest( '.ser' ).attr( "data-field" );
			 var value = $( this ).attr( 'data-value' );
			 $( this ).closest( '.ser' ).find( '> .sehp' ).html( $( this ).html() );

			 $( 'input[name="' + name + '"]' ).val( value );
			 $( this ).closest( '.optionsholder' ).removeClass( 'visible' );
		});


		$( '.ser1 .sel1 .opti' ).click( function() {
				var val = $( this ).attr( 'data-value' );

				if( val === undefined ) {
						$( '.ser5 .opti' ).show();
				} else {
						$( '.ser5 .opti' ).hide();
						$( '.ser5 .opti.loc-' + val ).show();
						$( '.ser5 .opti.show-all' ).show();
				}
		});

		$('.search-menu a').click( function(){
			$('.search-menu a').removeClass( 'active' );
			$( this ).addClass( 'active' );
			$( 'input[name="status"]' ).val( jQuery(this).attr('data-value') );

			$( '#max-price option' ).addClass( 'hidden' );
			$( '#max-price option.' + $( this ).data( 'value' ) ).removeClass( 'hidden' );

			$( '.search-description' ).html( $( '.search-menu a.active' ).data( 'value' ) == 'sale' ? "Search properties for Sale" : "Search properties to Let" );
		});

		$( '#property' ).on( 'keypress keyup focus', function() {
			// if( $( this ).length < 3 ) return;

			var $list = $( this ).next();
			var search = $( this ).val().toLowerCase();
			var fuzzy = search.split('').join('.*?');
			var re = new RegExp(fuzzy);

			$list.addClass( 'visible' );
			$list.find( 'li' ).each( function() {
				var text = $( this ).html().toLowerCase();

				var visible = re.exec(text);
				if( visible ) {
					$( this ).show();
				} else {
					$( this ).hide();
				}
			});
		});

		$( '#property' ).focusout(function() {
			setTimeout( function() {
				$( this ).next().removeClass( 'visible' );
			}, 500 );
		}).focusin(function() {
			if( $( this ).val() !== '' ) $( this ).next().addClass( 'visible' );
		});

		$( '.autocomplete-list li' ).click( function() {
			$( '#property' ).val( $( this ).html() );

			$( '.autocomplete-list' ).removeClass( 'visible' );
		});
		
		$( '.close' ).click( function(e) {
			e.preventDefault();

			$( this ).parents( '.optionsholder' ).removeClass( 'visible' );
		});

	$( '.input-text' ).click( function() {
		$( '.input-text' ).removeClass( 'checked' );
		$( this ).addClass( 'checked' );
	});
});
