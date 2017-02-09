<?php
/**
 *  The Template for displaying all single posts
 *
 * @package WordPress
 * @subpackage Twenty_Fourteen
 * @since Twenty Fourteen 1.0
 */
wp_enqueue_style( 'swiper-css', get_template_directory_uri() . '/css/idangerous.swiper.css'  );

wp_enqueue_script( 'swiper', get_template_directory_uri() . '/js/idangerous.swiper-2.1.min.js', array( 'jquery' ), '20131209', false  );
wp_enqueue_script( 'swiper-2', get_template_directory_uri() . '/js/idangerous.swiper.3dflow.min.js', array( 'jquery' ), '20131209', false );
wp_enqueue_script( 'google-maps', 'http://maps.google.com/maps/api/js?v=3&sensor=false', array( 'jquery' ), '20131209', false );

wp_enqueue_script( 'sticky', get_template_directory_uri() . '/js/jquery.sticky.min.js', array( 'jquery' ), '20160211', false );

get_header();

while ( have_posts() ) : the_post();

	$form_title = get_field('form_text');

	if ( ! $form_title ) {
		$form_title = get_the_title();
	}

	$office_email = get_field('office_email');
	switch ($office_email) {
		case 'Westminster Office':
			$phone = '020 3811 3868';
			break;
		
		case 'Nine Elms Office':
			$phone = '020 3811 7660';
			break;

		default:
			$phone = '';
			break;
	}
?>

<?php if ($phone) { ?>
	<div id="call-the-office">Call <span class="InfinityNumber clickable"><?= $phone; ?></span></div>
<?php } ?>

<script type="text/javascript">
	(function($) {
		$(document).ready(function() {
			// form = $( '.gj-form_wrapper' ).last();
			form = $( '#news-info' ).last();
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


<div id="parallax-wrapper">
	<div id="news-row" class="row fullWidth switch-me">
		<div class="columns hide-for-small-only hide-for-medium-only large-1">&nbsp;</div>

		<div class="columns medium-8 active content-here" data-order="1">			
			<div id="strips" class="the-strips">
				<div class="well">
			        <h4 class="category"><?php echo wp_get_post_terms($post->ID, 'news_categories')[0]->name ?></h4>

					<h1><?php the_title(); ?></h1>

					<small><?php the_date( 'j F Y' ); ?></small>

					<?php require_once('includes/socials.php'); ?>

					<a href="<?php echo home_url('/news/'); ?>"><span style="font-size: 25px;line-height: 16px;vertical-align: text-top;padding-top: 1px;display: inline-block;">‹</span> Back to News</a>
				</div>

				<div class="entry-content">
					<?php the_content(); ?>
				</div>
		
				<hr class="hide-for-small-only" style="max-width: none;">

				<div class="show-for-small-only" style="padding: 5px; border: 1px solid #ccc; margin: 0 5px; background: #AC9857;">
					<h3 style="color: white; padding: 0 10px; text-transform: uppercase;"><?php echo $form_title; ?></h3>
					<?php echo do_shortcode( '[gravityform id="17" title="false" description="true" ajax="true"]' ); ?>
					<span class="disclaimer" style="color: #e1e1e1 !important;">We do not share the information you provide with any third parties.</span>
				</div>

				<div class="entry-content" style="margin-top: 20px;">
					
					<h2>You may also be interested in</h2>
		
				</div>

				<div class="well interesting-properties">
					<div class="entry-content">
						<ul class="grid-view">
							<?php 
								$id = get_field('interested_post_1')->ID;
								$link = get_permalink( $id );
								$feat_image = wp_get_attachment_url( get_post_thumbnail_id( $id ) );
								$title = get_the_title( $id );
							?>
							<li>
								<a href="<?= $link ?>">
									<div class="image-wrapper">
										<img class="load-me" data-src="<?= $feat_image ?>" alt="">
									</div>

									<h3><?= $title ?></h3>
								</a>

								<ul class="submenu leftmenu">
									<li class="item">
										<a href="<?= $link ?>" data-title="Read more">Read more</a>
									</li>
								</ul>
							</li>
							<?php 
								$id = get_field('interested_post_2')->ID;
								$link = get_permalink( $id );
								$feat_image = wp_get_attachment_url( get_post_thumbnail_id( $id ) );
								$title = get_the_title( $id );
							?>
							<li>
								<a href="<?= $link ?>">
									<div class="image-wrapper">
										<img class="load-me" data-src="<?= $feat_image ?>" alt="">
									</div>

									<h3><?= $title ?></h3>
								</a>

								<ul class="submenu leftmenu">
									<li class="item">
										<a href="<?= $link ?>" data-title="Read more">Read more</a>
									</li>
								</ul>
							</li>
							<?php 
								$id = get_field('interested_post_3')->ID;
								$link = get_permalink( $id );
								$feat_image = wp_get_attachment_url( get_post_thumbnail_id( $id ) );
								$title = get_the_title( $id );
							?>
							<li>
								<a href="<?= $link ?>">
									<div class="image-wrapper">
										<img class="load-me" data-src="<?= $feat_image ?>" alt="">
									</div>

									<h3><?= $title ?></h3>
								</a>

								<ul class="submenu leftmenu">
									<li class="item">
										<a href="<?= $link ?>" data-title="Read more">Read more</a>
									</li>
								</ul>
							</li>
						</ul>
					</div>
				</div>

				<div class="entry-content">
					<h2>Related developments</h2>
				</div>

				<div class="well related-developments">
					<div class="entry-content">
						<ul class="grid-view">
							<?php
								$id = get_field('featured_development_1');
								$title = get_the_title( $id );
								$link = get_permalink( $id );
								$feat_image = wp_get_attachment_url( get_post_thumbnail_id( $id ) );
								if ( !$feat_image )
									$feat_image = get_field( 'custom_background', $id )['url'];
							?>
							<li>
								<a href="<?= $link ?>">
									<div class="image-wrapper">
										<img class="load-me" data-src="<?= $feat_image ?>" alt="">
									</div>

									<h3><?= $title ?></h3>

								</a>

								<ul class="submenu leftmenu">
									<li class="item">
										<a href="<?= $link ?>" data-title="Read more">Read more</a>
									</li>
								</ul>
							</li>
							<?php
								$id = get_field('featured_development_2');
								$title = get_the_title( $id );
								$link = get_permalink( $id );
								$feat_image = wp_get_attachment_url( get_post_thumbnail_id( $id ) );
								if ( !$feat_image )
									$feat_image = get_field( 'custom_background', $id )['url'];
							?>
							<li>
								<a href="<?= $link ?>">
									<div class="image-wrapper">
										<img class="load-me" data-src="<?= $feat_image ?>" alt="">
									</div>

									<h3><?= $title ?></h3>

								</a>

								<ul class="submenu leftmenu">
									<li class="item">
										<a href="<?= $link ?>" data-title="Read more">Read more</a>
									</li>
								</ul>
							</li>
							<?php
								$id = get_field('featured_development_3');
								$title = get_the_title( $id );
								$link = get_permalink( $id );
								$feat_image = wp_get_attachment_url( get_post_thumbnail_id( $id ) );
								if ( !$feat_image )
									$feat_image = get_field( 'custom_background', $id )['url'];
							?>
							<li>
								<a href="<?= $link ?>">
									<div class="image-wrapper">
										<img class="load-me" data-src="<?= $feat_image ?>" alt="">
									</div>

									<h3><?= $title ?></h3>

								</a>

								<ul class="submenu leftmenu">
									<li class="item">
										<a href="<?= $link ?>" data-title="Read more">Read more</a>
									</li>
								</ul>
							</li>
						</ul>
					</div>
				</div>
			</div>

		</div>

		<div class="columns medium-4 large-2 featured sidebar-here" data-order="2" style="margin-top: 30px;">
			<div class="stay-in-touch">
				<h2 style="text-align: center;">Stay in touch</h2>

				<ul>
					<li><a href="https://www.linkedin.com/pub/kieran-chalker/35/416/b9"><img src="<?php echo get_template_directory_uri() ?>/img/news/linked-in.png" alt="Linked In"></a></li>
					<li><a href="https://www.facebook.com/pages/Garton-Jones-Real-Estate/558753517497591"><img src="<?php echo get_template_directory_uri() ?>/img/news/facebook.png" alt="Facebook"></a></li>
					<li><a href="https://twitter.com/GartonJonesLDN"><img src="<?php echo get_template_directory_uri() ?>/img/news/twitter.png" alt="Twitter"></a></li>
					<li><a href="mailto:cary@gartonjones.com"><img src="<?php echo get_template_directory_uri() ?>/img/news/email.png" alt="Email"></a></li>
				</ul>
			</div>

			<div class="sticky-wrapper hide-for-small-only">
				<div id="news-info" style="margin-bottom: 25px; max-width: 100%;">
					<?php wp_reset_postdata(); ?>
					<h3><?php echo $form_title; ?></h3>
					<?php echo do_shortcode( '[gravityform id="17" title="false" description="true" ajax="true"]' ); ?>
					<span class="disclaimer">We do not share the information you provide with any third parties.</span>
				</div>
			</div>
		</div>

		<div class="columns hide-for-small-only hide-for-medium-only large-1">&nbsp;</div>
	</div>
</div>

<?php
endwhile;

wp_enqueue_style( 'single-news' );
wp_enqueue_style('fontawesome', '//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css' );

get_footer();
