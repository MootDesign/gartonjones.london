<?php
wp_enqueue_style('css-grid', get_template_directory_uri() . '/css/grid.css' );

get_header();

$ids = $_COOKIE['_gj_shortlist'];
if( ! empty( $ids ) ) {
	$ids = unserialize( stripslashes( $ids ) );
}

if( count( $ids ) > 0 ) {
	$args = array(
		'post_type' => 'post',
		'post_status'    => 'publish',
		'post__in' => $ids,
		'posts_per_page' => -1,
	);

	$gj_query = new WP_Query( $args );

	// require_once( 'includes/grid.php' );
	get_template_part( 'includes/grid', 'none' );
} else {
?>
<div id="notice">
    <h2>
        Currently you have no saved properties
    </h2>
</div>
<?php
}

get_footer();
