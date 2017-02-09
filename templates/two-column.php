<?php
/**
 * Template Name: Two Column template
 *
 * @package WordPress
 * @subpackage Twenty_Fourteen
 * @since Twenty Fourteen 1.0
 */

get_header(); ?>

<div id="quickview" class="row hide">

	<div class="small-12 medium-12 large-12 videopop">
		<?php if ( get_field( 'media' ) ) {
			the_field( 'media' );
		} ?>
		<div class="closeit">
			- Back
		</div>
	</div>

</div>


<div class="row fullWidth <?php echo gj_has_dog_animation() ? "dog-row" : "" ?>">
	<div class="medium-1 large-1 columns">
		&nbsp;
	</div>
	<div id="row-bg" class="medium-10 large-10 columns <?php echo ! gj_has_dog_animation() ? "bggold" : "" ?>" style="margin-bottom:70px; margin-top: 7%;">
		<div class="row">
			<div class="small-12 medium-4 large-3 columns fade-me-in" id="side">
				<h1><?php the_title(); ?></h1>

<!--                <hr class="sidesep">-->

                 <?php
                    global $post;

                    if( is_singular() ) {
                        $menu = ( isset( $GLOBALS[ '_menu' ] ) ) ? $GLOBALS[ '_menu' ] : get_the_title( $post->post_parent );
                        $pmenu = get_field( 'parent_menu' );
                        if( ! empty( $pmenu ) ) $menu = $pmenu;

                        gj_add_submenu(  $menu );
                    }
                 ?>

				<?php if ( have_rows( 'side_pri_nav' ) ) : // Primary Navigation ?>
                    <hr class="sidesep">

					<ul class="submenu">
						<?php while( have_rows( 'side_pri_nav' ) ) : the_row();
							// save vars
							$page = get_sub_field( 'page' );
						?>
							<li><a href="<?php echo $page->guid; ?>"><?php echo $page->post_title; ?></a></li>

						<?php endwhile; ?>
					</ul>
				<?php endif; ?>

				<?php if ( have_rows( 'side_sec_nav' ) ) : // Secondary Navigation ?>
                    <hr class="sidesep">

					<ul class="subsubmenu">
						<?php while( have_rows( 'side_sec_nav' ) ) : the_row();
							// save vars
							$page = get_sub_field( 'page' ); ?>
							<li><a href="<?php echo $page->guid; ?>"><?php echo $page->post_title; ?></a></li>
						<?php endwhile; ?>
					</ul>
				<?php endif; ?>

			</div>
			<div class="small-12 medium-8 large-6 columns fade-me-in" id="wording">
				<?php 
				// Primary content
				if ( get_field( 'pri_content' ) ) : // Primary Content
					$pri_content = get_field( 'pri_content' );
					$pri_content = str_replace( '<p>', '<h2>', $pri_content );
					$pri_content = str_replace( '</p>', '</h2>', $pri_content );

					echo $pri_content;

				endif;
				?>
				<div class="row">
					<div class="small-12 medium-6 large-6 columns">

						<?php if ( get_field( 'sec_content_1' ) ) { // Secondary Content, Column 1
							the_field( 'sec_content_1' );
						} ?>

					</div>
					<div class="small-12 medium-6 large-6 columns">

						<?php if ( get_field( 'sec_content_2' ) ) { // Secondary Content, Column 2
							the_field( 'sec_content_2' );
						} ?>

						<div class="clearfix"></div>

						<?php if ( get_field( 'media' ) ) { // Media ?>
							<div class="gjplay"></div>
						<? } ?>

					</div>
				</div>
			</div>
			<div class="small-0 medium-0 large-3 columns wiref hide-for-medium-down fade-me-in">
				<?php if( ! gj_has_dog_animation() ): ?>
					<img src="http://gartonjones.mootexpress.com/img/horse.png" />
				<?php else: ?>
					<img src="<?php echo get_template_directory_uri() ?>/img/dog.png" style="margin-top:35px;margin-left:-135px" />
				<?php endif; ?>
			</div>


		</div>
	</div>
	<div class="medium-1 large-1 columns">
		&nbsp;
	</div>
</div>

<?php if( gj_has_dog_animation() ) : ?>
	<video id="dog-animation" class="dog-pee" preload="auto" <?php echo ( $isiPad ) ? 'poster="/img/londonhd.png"' : '' ?> muted>
		<source src="/img/video/bulldog3.mp4" type="video/mp4" />
	</video>
<?php endif; ?>


<?php

get_footer();
