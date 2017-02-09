jQuery(document).ready(function () {
	jQuery('.switchers a').click(function () {
		jQuery('.switchers a').removeClass('active');
		$this = jQuery(this);
		$this.addClass('active');

		jQuery('.xactive').hide();
		jQuery('#' + $this.data('id')).removeClass('hide').show().addClass('xactive');

		jQuery( 'body' ).attr( 'class', jQuery( 'body' ).attr( 'class' ).replace( /.tab-[^ ]*/, '' ) );
		jQuery( 'body' ).addClass( 'tab-' + $this.data( 'id' ) );

        // if the element has data-id, only then make the script work on it.
		if ( $this.attr( 'data-id' ) ) {
			return false;
		}
	});

	jQuery('.switchers a.icon-map').click(function () {
		if (!jQuery("#map").hasClass('initialized')) {
			initGMap("map", true, true);

			jQuery("#map").addClass('initialized');
		}

		return false;
	});

	jQuery('.switchers a.icon-360').trigger( 'click' );
});