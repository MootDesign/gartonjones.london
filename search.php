<?php
/**
 * The Template for displaying all single posts
 *
 * @package WordPress
 * @subpackage Twenty_Fourteen
 * @since Twenty Fourteen 1.0
 */

get_header();

wp_enqueue_style( 'search-result-css' );
?>

    <h1 class="page-title text-center"><?php printf( __( 'Search Results for: %s', 'twentythirteen' ), get_search_query() ); ?></h1>
<?php
			if ( have_posts() ) :
				// Start the Loop.

        $gj_query = $wp_query;
        $GLOBALS['_grid_style'] = 'height: 82vh;overflow-y: scroll;overflow-x: hidden;';

        include('includes/grid.php');
			else :
				// If no content, include the "No posts found" template.
				get_template_part( 'content', 'none' );

			endif;
		?>
<?php
//get_sidebar( 'content' );
//get_sidebar();
get_footer();
