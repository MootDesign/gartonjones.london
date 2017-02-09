<?php
/**
 * The Template for displaying all single posts
 *
 * @package WordPress
 * @subpackage Twenty_Fourteen
 * @since Twenty Fourteen 1.0
 */

get_header(); ?>

	<?php

$GLOBALS[ '_menu' ] = 'Developments';

			if ( have_posts() ) :
				// Start the Loop.

                $class = "row-news";
				while ( have_posts() ) : the_post();

                    echo '<div class="row fullWidth ' . $class . '">';

                    get_template_part( 'templates/one-column', 'mews' );

                    echo '</div>';

//                    $class = "";
                endwhile;
				// Previous/next post navigation.
			else :
				// If no content, include the "No posts found" template.
				get_template_part( 'content', 'none' );

			endif;
		?>
<!--end content-->

<script>
 jQuery(document).ready(function(){
 jQuery('#functions').css('height', jQuery('#desc').height()+'px');
 });
  </script>

<div class="row" style="margin-bottom:100px;"></div>

<?php
//get_sidebar( 'content' );
//get_sidebar();
get_footer();
