(function($){
	//Stamp duty formula
	$(document).ready(function() {
		function number_format( stampDuty ) {
			var comma1 = stampDuty.toFixed(2);
			var comma2 = '';
			var flag = false;
			var checklength = comma1.length;

			for (i = 0; i < comma1.length; i++) {
			    if (checklength == 8) {
			        if (i === 2) {
			            comma2 += ',' + comma1[i];
			        } else {
			            comma2 += comma1[i];
			        }

			    } else if (checklength == 9) {
			        if (i === 3) {
			            comma2 += ',' + comma1[i];
			        } else {
			            comma2 += comma1[i];

			        }
			    } else {
			        if (comma1[i] === '.') {
			            flag = true;
			        }
			        if ((i % 3) === 1 && flag === false) {
			            comma2 += ',' + comma1[i];
			        } else if ((i % 3) !== 1 && flag === false) {
			            comma2 += comma1[i];
			        } else {
			            comma2 += comma1[i];
			        }
			    }
			}

			return comma2;
		}

	    if ($('#calcprice').length <= 0) return;

	    document.getElementById('calcprice').onclick = function() {

	        var getValue = document.getElementById('price_house').value;
	        var reg = new RegExp(" ", "g");
	        var step = getValue.replace(reg, "");
	        var step2 = step.replace(/[&\/\\#,+()$~%.'":*?<>{}A-Za-z£$]/g, "");
	        var forcalc = parseInt(step2);
	        var stampDuty;

	        if (forcalc <= 125000.01) {
	            stampDuty = 0;
	            stampDuty2 = (forcalc) * 0.03
	        } else if (forcalc > 125000.01 && forcalc <= 250000.00) {
	            stampDuty = (forcalc - 125000) * 0.02;
	            stampDuty2 = ((forcalc - 125000) * 0.05) + 3750;
	        } else if (forcalc >= 250000.01 && forcalc <= 925000.00) {
	            stampDuty = ((forcalc - 250000) * 0.05) + 2500;
	            stampDuty2 = ((forcalc - 250000) * 0.08) + 10000;
	        } else if (forcalc >= 925000.01 && forcalc <= 1500000.00) {
	            stampDuty = ((forcalc - 925000) * 0.1) + 36250;
	            stampDuty2 = ((forcalc - 925000) * 0.13) + 64000;
	        } else if (forcalc >= 1500000.01) {
	            stampDuty = ((forcalc - 1500000) * 0.12) + 93750;
	            stampDuty2 = ((forcalc - 1500000) * 0.15) + 138750;
	        }

			comma2 = number_format( stampDuty );

	        document.getElementById('result').innerHTML = '£ ' + comma2;

	    };
	});

	/*
	 * Change "other developments" view style
	 *
	 * Coverflow / List / Map View
	 */
	$( '#change-view li' ).click( function() {
      $('#back-button').show();
      
	  var id = $( this ).data( 'id' );
	  var $div = $( id );

	  $( '#change-view li' ).removeClass( 'active' );
	  $( this ).addClass( 'active' );

	  $( '.show-me' ).hide();
	  $div.show();

	  if( $div.data( 'map' ) && ! $div.data( 'initialized' ) ) {
		    $('#back-button').hide();

			initGMap( "mapview", $div.data( 'lat' ), $div.data( 'lon' ), true, false, 13 );

            console.log('lat: ' + $div.data('lat') + ' | lon: ' + $div.data('lon') );
			$div.data( 'initialized', 1 );
	  }
	});

	/**
	 * The strips
	 */
	$( document ).on( 'mouseenter', '.the-strips li', function() {
	  $( '#bg img' ).removeClass( 'active' );
	  $( '#bg .' + $( this ).data( 'image') ).addClass( 'active' );
	});

	$( document ).ready( function() {
		$( '#overlay-boxes .box1' ).delay(1000).transition( { y: '-200%' }, 800, function() { $( this ).hide(); } );
    	$( '#overlay-boxes .box2' ).delay(1000).transition( { y: '200%' }, 800, function() { $( this ).hide(); } );

    	$( '#register .title' ).click( function() {
    		// $( this ).next().slideToggle(); 
    		// $( '#register .the-content' ).slideToggle();
    	});
	});

	$( window ).load( function() {
		$( '#myholder' ).addClass( 'show-me' );
	});

	$( window ).load( function() {
		setTimeout( function() {
			var $content = $( '#register' ).find( '.the-content' );
			console.log( jQuery( window ).height() - jQuery( $content ).offset().top - 74 )
			$content.css({
				maxHeight: jQuery( window ).height() - jQuery( $content ).offset().top - 74 // 74 is the footer height
			});

			//Show perfect scrollbar
			if( ! $content.hasClass( 'ps-container') ) {
				$content.perfectScrollbar();
			} else {
				$content.perfectScrollbar('update');
			}
		}, 1000 );
	});

})(jQuery);
