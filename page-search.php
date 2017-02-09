<?php

/**
 * The Template for displaying all single posts
 *
 * @package WordPress
 * @subpackage Twenty_Fourteen
 * @since Twenty Fourteen 1.0
 */

get_header();
?>

<style>
	@media screen and ( max-width: 767px ) {
		.hello-search {
			margin-top: 130px;
		}
	}
</style>

<div class="hello-search">
	<?php
		require_once( "template_search_new.php" );
	?>
</div>

<?php
// wp_enqueue_style( 'search-css', get_template_directory_uri() . '/css/development-search.css' );

get_footer();
