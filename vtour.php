<?php
/**
 * Template Name: Vtour 360 template
 *
 * This template includes the tour files by referring to an ACF field, passed on the backend.
 */

//CSS
wp_enqueue_style( 'single-style' );
wp_enqueue_style( 'team', get_template_directory_uri() . '/css/the-team.css' );
wp_enqueue_script( 'single-development' );
wp_enqueue_script( 'team', get_template_directory_uri() . '/js/min/single/the-team.min.js', array(), '20160228', true );

get_header();

// TODO put condition if the file does not exists
if ( get_field( 'vtour_location' ) ) {
	$vtour = get_field( 'vtour_location' );
}

?>

<style>
	@-ms-viewport { width:device-width; }
	@media only screen and (min-device-width:800px) { html { overflow:hidden; } }
	html { height:100%; }
	body { height:100%; overflow:hidden; margin:0; padding:0; font-family:Arial, Helvetica, sans-serif; font-size:16px; color:#FFFFFF; background-color:#000000; }

    .mb50.mt8p {
        margin: 0 !important;
        height: 93% !important;
        width: 100% !important;
        max-width: 100% !important;
        position: relative;
        perspective: 1100px;
    }

    iframe {
        width: 100%;
        height: 100%;
        border: none;
    }

    .parallax {
        z-index: 999 !important;
    }
</style>

<script src="<?php echo get_template_directory_uri(); ?>/js/single/tour.min.js"></script>

<script type="text/javascript">
(function($){
	/**
	* The strips
	*/
	$(document).ready(function() {
		$( '.the-strips li' ).mouseenter( function() {
			$( '#bg img' ).removeClass( 'active' );
			$( '#bg .' + $( this ).data( 'image') ).addClass( 'active' );
		});

		var current_office = "<?php echo the_title(); ?>";

		$( '.view-offices' ).click(function() {
			if ( $(this).text() != 'Back to ' + current_office ) {
				$link_text = $(this).text();
				$(this).text('Back to ' + current_office );
			} else {
				$(this).text($link_text);
			}

			$( '.the-wrapper' ).toggleClass('active');
			$( '.the-wrapper' ).find('#bg img').removeClass('active');

			$( '.custom-footer-text' ).fadeToggle();
		});
	});
})(jQuery);
</script>

<div class="row fullWidth mb50 mt8p">

	<?php 
		$filename = get_template_directory() . '/' . $vtour;

		if (file_exists($filename)) {
		    require_once( $filename );
		}
	?>

<?php
	wp_enqueue_style( 'strip' );

	get_footer();
