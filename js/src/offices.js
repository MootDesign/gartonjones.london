(function($) {
	$( '.arrange-valuation-form' ).click( function() {
		$( '#big-menu .the-strips > ul > li' ).hide();

		$( '#big-menu ul li.strip-valuation' ).show();
		showClose( 500, '#big-menu' );

		$( '#big-menu' ).addClass( 'open' );

		return false;
	});

	$( '.enquire-online-form' ).click( function() {
		$( '#big-menu .the-strips > ul > li' ).hide();

		$( '#big-menu ul li.strip-enquire' ).show();
		showClose( 500, '#big-menu' );

		$( '#big-menu' ).addClass( 'open' );

		return false;
	})
})(jQuery);