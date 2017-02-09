<?php
/**
 *  The Template for displaying all single pages
 *
 * @package WordPress
 * @subpackage Twenty_Fourteen
 * @since Twenty Fourteen 1.0
 */

wp_enqueue_script( 'sticky', get_template_directory_uri() . '/js/jquery.sticky.min.js', array( 'jquery' ), '20160211', false );

get_header();


while ( have_posts() ) : the_post();
?>
<script src="http://code.jquery.com/jquery-1.11.1.min.js"></script><script src="http://code.jquery.com/ui/1.11.1/jquery-ui.min.js"></script>
<script type="text/javascript" src="http://www.occfinance.com/intellicalc/intellicalc.aspx?aid=AFF-1582974"></script>

<script type="text/javascript">
	(function($) {
		$(document).ready(function() {
			form = $( '.gj-form_wrapper' );
			if ( form !== undefined ) {
				$( '#news-info' ).prepend(form);

				$( '.news-content' ).find( '.news-info-link' ).removeClass( 'hide' );
			}

			$( '.sticky-wrapper' ).sticky({topSpacing:0});
		});

		$(document).on('opened.fndtn.reveal, opened', '[data-reveal]', function () {
			var modal = $(this);
			modal.find( '.button-close' ).addClass( 'open' )
				.find( '.bg' ).addClass( 'open' );
		});
	})(jQuery);
</script>

<div class="row fullWidth single-page" style="margin-bottom: 100px;">
	<div class="columns hide-for-small-only hide-for-medium-only large-1">&nbsp;</div>

	<div class="columns medium-8 active content-here" data-order="1">
		<div class="well">
			<?php
				// if there is a parent page, show it on top
				if ( $parent = wp_get_post_parent_id( $post->ID ) ) {
					?>
						<h4 class="category"><?php echo get_the_title($parent); ?></h4>
					<?php
				}
			?>
			<h1><?php the_title(); ?></h1>

			<?php require_once('includes/socials.php'); ?>
		</div>

		<div class="entry-content">
			<?php if (has_post_thumbnail( $post->ID ) ): ?>
				<?php $image = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ), 'single-post-thumbnail' ); ?>
				<img data-src="<?php echo $image[0]; ?>" class="load-me">
			<?php else: ?>
				<img src="<?php echo get_template_directory_uri(); ?>/img/default.png" alt="" />
			<?php endif; ?>

			<?php the_content(); ?>

		</div>
	</div>

	<div class="columns medium-4 large-4 featured sidebar-here" data-order="2">
		 <div class="side2">
			 <?php if( have_rows('side_pri_nav') ): ?>
				<ul class="submenu">
					<?php while( have_rows('side_pri_nav') ): the_row(); ?>
					<li>
						<?php $page = get_sub_field( 'page' ); ?>
						<a href="<?php echo get_permalink( $page->ID ); ?>">
							<?php echo $page->post_title; ?>
						</a>
					</li>
					<?php endwhile; ?>
				</ul>
			 <?php endif; ?>

			 <?php
				global $post;
			 ?>

			 <?php if( have_rows('sidebar_sec_nav') ): ?>
				<ul class="submenu">
					<?php while( have_rows('sidebar_sec_nav') ): the_row(); ?>
					<li>
						<?php $page = get_sub_field( 'page' ); ?>
						<a href="<?php echo get_sub_field( 'link' ) ?>">
							<?php echo get_sub_field( 'link_title' ); ?>
						</a>
					</li>
					<?php endwhile; ?>
				</ul>
			 <?php endif; ?>
		</div>

		<div class="sticky-wrapper">
			<div id="page-info" style="padding-bottom: 1px; !important;">
				<h2 style="color: white; font-size: 38px; margin-bottom: -5px;">Quick Request</h2>
				<?php //echo do_shortcode( '[gravityform id="22" title="false" description="false" ajax="true"]' ); ?>
				<?php
					
					$url = 'http://' . $_SERVER['SERVER_NAME'] . $_SERVER['REQUEST_URI'];

					if (strpos($url,'furnishing-interior-design') !== false) {
						echo do_shortcode( '[gravityform id="22" title="false" ajax="true" description="false"]' ); 
					}

					if (strpos($url,'tax-advice') !== false) {
						echo do_shortcode( '[gravityform id="36" title="false" ajax="true" description="false"]' );
					}

					if (strpos($url,'financial-advice') !== false) {
						echo do_shortcode( '[gravityform id="37" title="false" ajax="true" description="false"]' );
					}

					if (strpos($url,'refer-a-friend') !== false) {
						echo do_shortcode( '[gravityform id="47" title="false" ajax="true" description="false"]' );
					}

					if (strpos($url,'mortgages') !== false) {
						echo do_shortcode( '[gravityform id="48" title="false" ajax="true" description="false"]' );
					}

					if (strpos($url,'ostc-fx') !== false) {
						echo do_shortcode( '[gravityform id="38" title="false" ajax="true" description="false"]' );
					}

					if (strpos($url,'marketing-your-property') !== false) {
						echo do_shortcode( '[gravityform id="39" title="false" ajax="true" description="false"]' );
					}

					if (strpos($url,'cookies') !== false) {
						echo do_shortcode( '[gravityform id="49" title="false" ajax="true" description="false"]' );
					}
				?>
				<span class="disclaimer">We do not share the information you provide with any third parties.</span>
			</div>
		</div>
		<?php 

			if (strpos($url,'mortgages') !== false) {
						echo "<script type='text/javascript'>intellicalc.Step1(750);</script>";
					}

			?>
	</div>	
	<div class="columns hide-for-small-only hide-for-medium-only large-1">&nbsp;</div>
</div>

<?php
endwhile;

wp_enqueue_style( 'news-css' );
wp_enqueue_style( 'single-news' );
wp_enqueue_style('fontawesome', '//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css' );

get_footer();
