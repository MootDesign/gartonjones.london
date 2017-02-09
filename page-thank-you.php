<?php get_header(); ?>

<div class="content-wrapper" style="text-align: center; margin-top: 100px;">
	<h1><?php the_title(); ?></h1>

	<div class="content">
		<?php the_content(); ?>
		<a onclick="window.history.back();">Back to Page</a>
	</div>
	<!--  href="javascript:history.go(-1)" //return false; Old go back code -->
	<footer style="margin-top: 100px;">
		<div class="row thankyou-bottom-links">
			<?php if ( $feat1 = get_field('featured_1') ) { ?>
				<?php
					if ( has_post_thumbnail( $feat1->ID ) ) {
						$image = wp_get_attachment_image_src( get_post_thumbnail_id( $feat1->ID ), 'medium' )[0];
					} else if ( get_field('custom_background', $feat1->ID) ) {
						$image = get_field('custom_background', $feat1->ID)['url'];
					} else {
						$image = 'http://placehold.it/320x240';
					}
				?>
				<div class="medium-3 columns">
					<a href="<?php echo get_the_permalink($feat1->ID); ?>">
						<img src="<?php echo $image; ?>" alt="">
					</a>
					<a href="<?php echo get_the_permalink($feat1->ID); ?>" class="thank-you-link"><?php echo $feat1->post_title; ?></a>
				</div>
			<?php } ?>
			
			<?php if ( $feat2 = get_field('featured_2') ) { ?>
				<?php
					if ( has_post_thumbnail( $feat2->ID ) ) {
						$image = wp_get_attachment_image_src( get_post_thumbnail_id( $feat2->ID ), 'medium' )[0];
					} else if ( get_field('custom_background', $feat2->ID) ) {
						$image = get_field('custom_background', $feat2->ID)['url'];
					} else {
						$image = 'http://placehold.it/320x240';
					}
				?>
				<div class="medium-3 columns">
					<a href="<?php echo get_the_permalink($feat2->ID); ?>">
						<img src="<?php echo $image; ?>" alt="">
					</a>
					<a href="<?php echo get_the_permalink($feat2->ID); ?>" class="thank-you-link"><?php echo $feat2->post_title; ?></a>
				</div>
			<?php } ?>
			
			<?php if ( $feat3 = get_field('featured_3') ) { ?>
				<?php
					if ( has_post_thumbnail( $feat3->ID ) ) {
						$image = wp_get_attachment_image_src( get_post_thumbnail_id( $feat3->ID ), 'medium' )[0];
					} else if ( get_field('custom_background', $feat3->ID) ) {
						$image = get_field('custom_background', $feat3->ID)['url'];
					} else {
						$image = 'http://placehold.it/320x240';
					}
				?>
				<div class="medium-3 columns">
					<a href="<?php echo get_the_permalink($feat3->ID); ?>">
						<img src="<?php echo $image; ?>" alt="">
					</a>
					<a href="<?php echo get_the_permalink($feat3->ID); ?>" class="thank-you-link"><?php echo $feat3->post_title; ?></a>
				</div>
			<?php } ?>
			
			<?php if ( $feat4 = get_field('featured_4') ) { ?>
				<?php
					if ( has_post_thumbnail( $feat4->ID ) ) {
						$image = wp_get_attachment_image_src( get_post_thumbnail_id( $feat4->ID ), 'medium' )[0];
					} else if ( get_field('custom_background', $feat4->ID) ) {
						$image = get_field('custom_background', $feat4->ID)['url'];
					} else {
						$image = 'http://placehold.it/320x240';
					}
				?>
				<div class="medium-3 columns">
					<a href="<?php echo get_the_permalink($feat4->ID); ?>">
						<img src="<?php echo $image; ?>" alt="">
					</a>
					<a href="<?php echo get_the_permalink($feat4->ID); ?>" class="thank-you-link"><?php echo $feat4->post_title; ?></a>
				</div>
			<?php } ?>
		</div>
	</footer>
</div>

<?php get_footer(); ?>
