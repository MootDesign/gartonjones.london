(function($) {
	'use strict';

	function loadData( page, ele, find ) {
	    $.ajax({    
	        type: "GET",
	        url: page,             
	        dataType: "html",                   
	        success: function(response){  
	        	ele.find( '.show-more' ).remove();

	        	// first scroll the page to top
	        	$('.back-to-top').trigger('click');

	        	setTimeout( function() {
	        		// then hide the properties
		        	ele.children().fadeOut('fast');

		        	setTimeout( function() {
		        		// at last remove them all & put in the new ones
						ele.children().remove();

						ele.append( $( response ).find( find ) );

						ele.trigger( 'showNewGrid' );
						setTimeout( function() {
						    $( '.lazy' ).lazyload();
						}, 500 );
		        	}, 300);
	        	}, 100);
	        }
	    });
	}

	$( document ).ready( function() {
		// make sure the link is works after ajaxing in
		$( document ).on( 'click', '#grid .show-more a', function( e ) {
			e.preventDefault();

			loadData( $( this ).attr( 'href' ), $( '#grid' ), '.ajax-grid' );
		});

		$( document ).on( 'click', '#strips .show-more a', function( e ) {
			e.preventDefault();

			loadData( $( this ).attr( 'href' ), $( '#strips ul' ), '.the-strips ul li' );
		});
	});
})(jQuery);