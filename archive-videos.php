<?php
/**
 * The Template for displaying all single posts
 *
 * @package WordPress
 * @subpackage Twenty_Fourteen
 * @since Twenty Fourteen 1.0
 */
wp_enqueue_style( 'page-developments', get_template_directory_uri() . '/css/page-developments.css' );
get_header(); ?>

	<div id="videogrid" class="switch-me">
		<h1>Garton Jones Videos</h1>

		<ul id="grid" class="responsive-grid show-me <?php echo @$GLOBALS['_grid_class'] ?>" style="<?php echo $showGrid; ?><?php echo @$GLOBALS['_grid_style'] ?>">

		<?php
		if ( have_posts() ) :
			while( have_posts() ) : the_post();
		?>
	
			<?php
				$thumb = wp_get_attachment_image_src( get_post_thumbnail_id(get_the_ID()), array( 600, 400 ) );
				$url = $thumb['0'];

				if ( empty( $url ) )
					$url = get_field( 'custom_background' )['url'];
			?>

			<li class="item video-grid" data-type="<?php  ?>">
				<div class="image-wrapper">
					<a href="#" onclick="showClose();" data-reveal-id="video-<?php echo get_the_ID(); ?>"><img class="" src="<?php echo $url ?>" alt=""></a>
				</div>
				<div class="bg"></div>
				<div class="play-button"></div>
				<div class="info">
					<h3 style="color: white;"><?php the_title(); ?></h3>
					<div class="address">
						<?php the_excerpt(); ?>
					</div>
					<?php if ( get_field( 'development_page' ) ) { ?>
						<a href="<?php echo get_field( 'development_page' ); ?>" class="more-video">Show more info</a>
					<?php } ?>
				</div>
			</li>
		<?php
			endwhile;
		endif;

		?>
		</ul>
	</div>

		<?php
		wp_reset_query();

		if ( have_posts() ) :
			while( have_posts() ) : the_post();

			// here comes the popups
		?>
			<div id="video-<?php echo get_the_ID(); ?>" class="reveal-modal" data-reveal aria-hidden="true" role="dialog">
				<a class="close-reveal-modal" aria-label="Close" style="top: 0; right: 0;">
					<div class="button-close " style="top: -22px; right: -22px;">
						<div class="circle-arc">
							<svg width="100%" viewBox="0 0 100 100">
								<path d="M 50 50 m -43 0 a 43 43 0 1 1 86 0 a 43 43 0 1 1 -86 0"></path>
							</svg>
						</div>
						<div class="bg">
							<div></div>
						</div>
						<div class="line l-0"></div>
						<div class="line l-1"></div>
					</div>
				</a>

				<?php
					$youtube = get_field( 'youtube' );
					$video = get_field( 'video' );
				?>

				<div class="videoWrapper">
					<?php if ( ! empty( $youtube ) ) { ?>
						<iframe width="1280" height="720" src="https://www.youtube.com/embed/1Vr1jexrjWs?rel=0" frameborder="0" allowfullscreen></iframe>
					<?php } else if ( ! empty( $video ) ) { ?>
						<video controls>
							<source src="<?php echo $video['url']; ?>">
						</video>
					<?php } ?>
				</div>

				<?php get_template_part( 'includes/socials', ''); ?>
			</div>
		<?php
			endwhile;
		endif;
		?>

<?php
get_footer();