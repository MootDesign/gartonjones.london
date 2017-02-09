<?php
/**
 * Template Name: AJAX List Wrapper
 *
 * The template that let you use the features of the quick links
 */

	get_header();

	// from $_GET we need the query vars
	$getBeds = $_GET['beds'];
	$getSearch = $_GET['search'];
	$getPrice = $_GET['max-price'];
	$getStatus = $_GET['status'];
	$getProperty = $_GET['property'];
	$getRiver = $_GET['river-view'];

	$getPostType = $_GET['type'];

	// set up the query
	$args = array();

	if ( ! empty( $getPostType ) ) {
		$args['post_type'] = $getPostType;
	}
	$args['posts_per_page'] = -1;

	// the Query
	$the_query = new WP_Query( $args );

	if ( $the_query->have_posts() ) {

		?>
			<ul id="list-ajax">
		<?php

			while ( $the_query->have_posts() ) {
				$the_query->the_post();

				get_template_part( 'templates/ajax/list', 'none' );
			}

		?>
			</ul>
		<?php
	}

	// restore original Post Data
	wp_reset_postdata();
?>

<?php
	get_footer();
?>