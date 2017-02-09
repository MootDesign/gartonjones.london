<?php
/**
* The Template for displaying all single posts
*
* @package WordPress
* @subpackage Twenty_Fourteen
* @since Twenty Fourteen 1.0
*/
// $GLOBALS['images'] = get_option( "_gj-backgrounds-0", array() );

wp_enqueue_style( 'news-css' );

get_header(); ?>

<?php require_once( 'includes/news-common.php' ); ?>

<div id="parallax-wrapper">
	<div id="news-row" class="row fullWidth switch-me">
		<div class="page-title columns small-12 medium-12 active"><h2>News</h2></div>
		
		<div class="clearfix"></div>

		<div class="columns hide-for-small-only hide-for-medium-only large-1">&nbsp;</div>

		<div class="columns medium-8 active content-here" data-order="1">
			<div id="strips" class="the-strips">
				<ul>
					<?php
					$li = "";

					$args = array(
						'post_type' => 'news',
						'post_status'       => 'publish',
						'posts_per_page' => -1,
					);
					
					gj_get_posts( $args );
					?>
				</ul>
			</div>
		</div>

		<div class="columns medium-3 large-2 featured sidebar-here" data-order="2">
			<div class="articles-categories">
				<h2>Articles by Category</h2>
				<?php 
					$args = array(
						'use_desc_for_title' => 0,
						'taxonomy' => 'news_categories',
						'title_li' => ''
					);			
					
					echo '<ul>';
					wp_list_categories($args);
					echo '</ul>';

				?>
				
			</div>
				
			<div class="stay-in-touch">
				<h2 style="text-align: center;">Stay in touch</h2>

				<ul>
					<li><a href="https://www.linkedin.com/pub/kieran-chalker/35/416/b9"><img src="<?php echo get_template_directory_uri() ?>/img/news/linked-in.png" alt="Linked In"></a></li>
					<li><a href="https://www.facebook.com/pages/Garton-Jones-Real-Estate/558753517497591"><img src="<?php echo get_template_directory_uri() ?>/img/news/facebook.png" alt="Facebook"></a></li>
					<li><a href="https://twitter.com/GartonJonesLDN"><img src="<?php echo get_template_directory_uri() ?>/img/news/twitter.png" alt="Twitter"></a></li>
					<li><a href="mailto:cary@gartonjones.com"><img src="<?php echo get_template_directory_uri() ?>/img/news/email.png" alt="Email"></a></li>
				</ul>
			</div>

			<div>
				<h2 style="margin-bottom: 10px;">Featured Posts</h2>

				<ul class="featured">

					<?php
					$args = array(
						'post_type' => 'news',
						'orderby' => 'post_title',
						'post_status'       => 'publish',
						'posts_per_page' => 3,
						'meta_query' => array(
							array(
								'key' => 'featured',
								'type' => 'numeric',
								'value' => 1,
							)
						)
					);

					$fnews = get_posts( $args );

					foreach( $fnews as $key => $post ) {
						$title = get_the_title( $post->ID );
						$permalink = get_permalink( $post->ID );
					    $feat_image = wp_get_attachment_url( get_post_thumbnail_id($post->ID) );
					    ?>
						<li>
							<a href="<?php echo $permalink; ?>"><img src="<?php echo $feat_image; ?>"></a>
							<a href="<?php echo $permalink; ?>"><?php echo $title; ?></a>
							<div class="clearfix"></div>
						</li>
					    <?php
					}

					?>
				</ul>
			</div>

			<div class="featured-development">
				<h2>Featured Developments</h2>

				<ul class="featured">
					<?php
					$args = array(
						'post_type' => 'developments',
						'orderby' => 'post_title',
						'post_status'       => 'publish',
						'posts_per_page' => -1,
						'meta_key'		=> 'featured',
						'meta_value'	=> true
					);

					$fdevelopments = get_posts( $args );

					foreach( $fdevelopments as $index => $post ) {
						$title = get_the_title( $post->ID );
						$permalink = get_permalink( $post->ID );
						$feat_image = wp_get_attachment_url( get_post_thumbnail_id($post->ID) );
						if ( !$feat_image )
							$feat_image = get_field( 'custom_background' )['url'];
						?>
						<li>
							<a href="<?php echo $permalink; ?>"><img class="load-me" data-src="<?php echo $feat_image; ?>"></a>
							<a href="<?php echo $permalink; ?>"><?php echo $title; ?></a>
							<div class="clearfix"></div>
						</li>
						<?php
					}
					?>
				</ul>
			</div>

			<?php
				if( dynamic_sidebar() ) {
					dynamic_sidebar( 'primary' );
				}
			?>
		</div>

		<div class="columns hide-for-small-only hide-for-medium-only large-1">&nbsp;</div>
	</div>
</div>
<?php
wp_reset_query();
?>
<?php

wp_enqueue_style( 'parallax-css' );
wp_enqueue_style( 'parallax-mini-css' );

get_footer();
