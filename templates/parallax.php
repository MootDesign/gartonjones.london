<?php
/**
 * Template Name: Parallax template
 *
 * The template that let you use the features of the quick links
 */

// Detect if we are on tablet
require_once( get_template_directory() . '/mobile.php' );

$custom_body_class = 'unloaded';

//Gravity form signature
gravity_form_enqueue_scripts(1, true);

// get custom background
$background = ( get_field( 'custom_background' ) ) ? get_field( 'custom_background' )['url'] : get_template_directory_uri() . "/img/union-jack-v1.png";

get_header();

?>
<style>
    #overlay-boxes>div{background:#fff;position:fixed;width:100%;height:50%;z-index:7}#overlay-boxes .box1{top:0}#overlay-boxes .box2{top:50%}
</style>

<?php


$detect = new Mobile_Detect();

// parallax Desktop
if ( ! $detect->isMobile() && ! $detect->isTablet() ) :

 ?>

	<img class="loadBackground" src="<?= $background ?>" />

	<div id="overlay-boxes">
		<div class="box1"></div>
		<div class="box2"></div>
	</div>

	<div class='preloaderCont'>
		<?php
			if( is_page( 58855 ) ) {
				?>
					<img src="<?php echo get_template_directory_uri(); ?>/img/parallax/westminster-tube.png" alt="" style="width: 485px; height: 400px; position: absolute; top: 70%; left: 50%; transform: translate( -50%, -50% ); z-index: 1;" />
				<?php
			} elseif( is_page( 63581 ) ) {
				?>
					<img src="<?php echo get_template_directory_uri(); ?>/img/parallax/nine-elms-tube.png" alt="" style="width: 485px; height: 400px; position: absolute; top: 70%; left: 50%; transform: translate( -50%, -50% ); z-index: 1;" />
				<?php
			} elseif( is_page( 63586 ) || is_page( 63775 ) ) {
				?>
					<img src="<?php echo get_template_directory_uri(); ?>/img/parallax/south-bank-tube.png" alt="" style="width: 485px; height: 400px; position: absolute; top: 70%; left: 50%; transform: translate( -50%, -50% ); z-index: 1;" />
				<?php
			} elseif( is_page( 63584 ) ) {
				?>
					<img src="<?php echo get_template_directory_uri(); ?>/img/parallax/chelsea-tube.png" alt="" style="width: 485px; height: 400px; position: absolute; top: 70%; left: 50%; transform: translate( -50%, -50% ); z-index: 1;" />
				<?php
			}
			elseif( is_page( 2711502 ) ) {
				?>
					<img src="<?php echo get_template_directory_uri(); ?>/img/parallax/victoria-tube.png" alt="" style="width: 485px; height: 400px; position: absolute; top: 70%; left: 50%; transform: translate( -50%, -50% ); z-index: 1;" />
				<?php
			}
		?>
		<span class='ending'><img src="<?php echo get_template_directory_uri(); ?>/img/parallax/gartonjones.svg" style="max-width: auto; width: 100%;" /></span><span class='starting'><img src="<?php echo get_template_directory_uri(); ?>/img/parallax/preload.svg" width="505" height="50" style="width: 505px; height: 50px;" /></span>

	</div>

  <a class="parallax-arrow right-arrow hide-for-touch hide-me">
  	<img src="<?php echo get_template_directory_uri() ?>/img/arrow-right-big.png" />
  </a>

  <a class="parallax-arrow left-arrow hide-for-touch hide-me">
  	<img src="<?php echo get_template_directory_uri() ?>/img/arrow-left-big.png" />
  </a>

	<div class="parallax-menu" style="display: none">
		<!-- <h2 id="menu-title" class="menu-title"><?php the_field( 'parallax_menu_title' ); ?></h2> -->
		<ul class="submenu leftmenu">

		<?php
			if ( have_rows( 'parallax_menu' ) ):
				while( have_rows( 'parallax_menu' ) ): the_row();

					$href = get_sub_field( 'href' );
					$title = get_sub_field( 'title' );

					if ( $href == '---' ) {
						echo '<li>&nbsp;</li>';
						continue;
					}
				?>

			<li>
				<a href="<?= $href; ?>" data-title="<?= $title; ?>"><span><?= $title ?></span></a>
			</li>
				<?php

				endwhile;
			endif;
		?>

		</ul>
	</div>

	<div id="parallax">
		<img alt=".1" class="parallaxBackground" src="<?= $background ?>" /><!-- Background picture -->

		<div id="logo">
			<?php
				if( is_page( 58855 ) ) {
					?>
						<img class="parallaxBackground" src="<?php echo get_template_directory_uri(); ?>/img/parallax/westminster-tube.png" style="position: absolute; width: 485px; height: 400px; top: 60%; left: 50%; transform: translate( -50%, -50% );" />
					<?php
				} elseif( is_page( 63581 ) ) {
					?>
						<img class="parallaxBackground" src="<?php echo get_template_directory_uri(); ?>/img/parallax/nine-elms-tube.png" style="position: absolute; width: 485px; height: 400px; top: 60%; left: 50%; transform: translate( -50%, -50% );" />
					<?php
				} elseif( is_page( 63586 ) || is_page( 63775 ) ) {
					?>
						<img class="parallaxBackground" src="<?php echo get_template_directory_uri(); ?>/img/parallax/south-bank-tube.png" style="position: absolute; width: 485px; height: 400px; top: 60%; left: 50%; transform: translate( -50%, -50% );" />
					<?php
				} elseif( is_page( 63584 ) ) {
					?>
						<img class="parallaxBackground" src="<?php echo get_template_directory_uri(); ?>/img/parallax/chelsea-tube.png" style="position: absolute; width: 485px; height: 400px; top: 60%; left: 50%; transform: translate( -50%, -50% );" />
					<?php
				}
				elseif( is_page( 2711502 ) ) {
				?>
					<img class="parallaxBackground" src="<?php echo get_template_directory_uri(); ?>/img/parallax/victoria-tube.png" style="position: absolute; width: 485px; height: 400px; top: 60%; left: 50%; transform: translate( -50%, -50% );" />
				<?php
			}
			?>
			<img src="<?php echo get_template_directory_uri(); ?>/img/parallax/gartonjones.svg" style="position: absolute; width: 90%; height: auto;top: 50%; transform: translate( -50%, -50%); left: 50%;" />
		</div>

		<?php if ( have_rows( 'slide' ) ):
			while ( have_rows( 'slide' ) ): the_row();
				$slide_id = get_sub_field( 'slide_id' );
				$slide_title = get_sub_field( 'slide_title' );

?>

<!-- parallax slide -->
<div id="<?= $slide_id ?>" class="parallax-item">
	<div class='para-totalCenterAlign countWidth'>
			<?php
				$has_article = false; // we need to initialise on every single row.

				if ( have_rows( 'inside' ) ):
					while( have_rows( 'inside' ) ): the_row();


						// get type of item
						$type = get_sub_field( 'type' );

						$style = get_sub_field( 'style' );

						$class = get_sub_field( 'class' );

						$to_animate = $type == 'Animated Text';

						$speed = get_sub_field( 'speed' );


						if ( $type == 'Text' || $type == 'Animated Text' ) {
								$has_article = true;

								// $sub_field = $type == 'Text' ? 'text' : 'html';
								$message = get_sub_field( 'text' );
								@list( $first, $content ) = explode( "<hr />", $message );

								$animated_class = ( $to_animate ) ? "animated-text" : "";

								// speed doesn't exists in a lot of article 
								if ( empty( $speed ) )
									$speed = 2;
echo <<< ARTICLE
							<div style="$style;" class="fastLayer">
								<article alt="$speed" class="show-me $class $animated_class">
									<h1 class="">$slide_title</h1>
									<div class="main">
ARTICLE;

								if( $to_animate ) {
									$words = explode( " ", $message );

									foreach( $words as $word ) {
										$big = stripos( $word, "<strong>" );
										$small = stripos( $word, "<em>" );

										$word = strip_tags( $word );
										$word = str_replace( '/>', '', $word );

										$is_special = false;
										$letters = str_split( $word );

										$class = "";
										if( $big !== false ) $class = "big";
										
										if( $small !== false ) $class = "small";
										
										echo '<span class="' . $class . '">';
										$char = "";
										
										foreach( $letters as $letter ) {
											$char .= $letter;
											if( $letter == "&" ) $is_special = true;
											
											if( $is_special && $letter == ";" ) $is_special = false;

											if( $is_special ) {
												continue;
											}

											echo '<span>' . $char . '</span>';
											$char = "";
										}
										echo '</span><span>&nbsp;</span>';
									}
								} else {
echo <<< MAIN
											$first
											<div class="divider fade-me animate-me to-top show"></div>
											<div class="description">
												$content
											</div>
MAIN;
								}

								$url = get_template_directory_uri();
echo <<< ARTICLE
									</div>
								</article>

							</div>
ARTICLE;

								continue;

						} else if ( $type == 'Image' ) {
							$img = get_sub_field( 'image' );

							$content = '<img src="' . $img["url"] . '" alt="" class="' . $img['alt'] . '" data-width="' . $img['width'] . '" data-height="' . $img['height'] . '"/>';
						} else if ( $type == 'Html' ) {
							$content = get_sub_field( 'html' );
						} else if ( $type == 'Credit' ) {
							$content = get_sub_field( 'credit' );
echo <<< CREDIT
						<div class="fastLayer" style="width: 100%; height: 100%; left: 0; top: 0; position: relative;">
							<article alt="2" class="show-me credit $class" style="top: auto; bottom: 55px; background: black; width: auto;">
								<div>
									$content
								</div>
							</article>
						</div>
CREDIT;
						} else {
							$content = ''; // make sure content is set
						}

						$speed = get_sub_field( 'speed' );

						?>
		<div class="<?= $class; ?>">
			<div class="fastLayer" style="<?= $style; ?>">
				<div alt="<?= $speed; ?>" class="fastInner">
					<?= $content; ?>
				</div>
			</div>
		</div>
						<?php
					endwhile;

				endif;

				if( ! $has_article ) :
?>
					<article alt="2" class="show-me">
						<h1 class=""><?= $slide_title; ?></h1>
					</article>
<?php
				endif;
?>

	</div>
</div><!-- end of parallax slide -->

<?php
			endwhile;
		endif;
		?>

</div>

<script>
jQuery(document).ready(function($){
	$( '.div-relative .car' ).each( function(i) {
		var $this = $( this );
		if( $this.data( 'audio' ) ) return;

		this.dataset.audio = '<?php echo get_template_directory_uri(); ?>/mp3/car.mp3';
	});
});
</script>
<?php

// parallax Mobile
elseif ( $detect->isMobile() && ! $detect->isTablet() ) :

	wp_enqueue_script( 'mobile-parallax' );
	wp_enqueue_style( 'mobile-parallax-style' );

?>
<style>
    html, body {
        height: auto !important;
        overflow-y: auto !important;
    }
    form {
    	display: block!important;
    	position: relative!important;
    }
</style>
<!-- mobile submenu -->
<div id="submenu" class="submenu">
	<div class="submenu-trigger">
		<span class="hide-on-scroll">Go to</span>
		<div class="hamburger">
			<span></span>
			<span></span>
			<span></span>
		</div>
	</div>

	<div class="submenu-area">
		<ul>

		<?php
			if ( have_rows( 'slide' ) ):
				$i = 1;
				
				if (is_page('services')) { ?>
					<li><a href="#page-1">Sales</a></li>
					<li><a href="#page-2">Lettings &amp; Management</a></li>
					<li><a href="#valuation">Sales / Rental Valuation</a></li>
					<li><a href="#page-3">Portfolio Management</a></li>
					<li><a href="#page-4">Off-Plan Investments</a></li>
					<li><a href="#cgt-valuation">CGT Valuation</a></li>
					<li><a href="#page-5">Services</a></li>
					
				<?php } else {
					while( have_rows( 'slide' ) ): the_row();
						$title = get_sub_field( 'slide_title' );
						$slide_id = get_sub_field( 'slide_id' );
					?>
						<li><a href="#page-<?php echo $i; ?>" data-id="#<?php echo $slide_id; ?>"><?php echo $title; ?></a></li>
					<?php
						$i++;
					endwhile;
				}
			endif;

			// reset the i value
			$i = 1;
		?>
		</ul>
	</div>
</div>

	<div id="mobile-parallax">
<?php

	if ( have_rows( 'slide' ) ):
		while ( have_rows( 'slide' ) ): the_row();
			$slide_id = get_sub_field( 'slide_id' );
			$slide_title = get_sub_field( 'slide_title' );
	?>
		<div id="page-<?= $i++ ?>" data-id="<?= $slide_id ?>">

			<?php
				if ( have_rows( 'inside' ) ):
					while( have_rows( 'inside' ) ): the_row();


						// get type of item
						$type = get_sub_field( 'type' );

						$style = get_sub_field( 'style' );

						$class = get_sub_field( 'class' );

						if ( $type == 'Text' || $type == 'Animated Text' ) {
							$has_article = true;

							$content = get_sub_field( 'text' );
							@list( $first, $content ) = explode( "<hr />", $content );

echo <<< ARTICLE
			<article alt="2" class="$class">
				<h1 class="">$slide_title</h1>
				<div class="main">
					$first
					<div class="divider show"></div>
					<div class="description">
						$content
					</div>
				</div>
			</article>
ARTICLE;
						}
					endwhile;
				endif;
			?>
		</div>
		<?php

		endwhile;
	endif;

	?>
	</div>

	<?php

// parallax Tablet
else :

wp_enqueue_script( 'tablet-parallax' );
wp_enqueue_style( 'tablet-parallax-style' );

?>

<div id="overlay-boxes">
	<div class="box1"></div>
	<div class="box2"></div>
</div>

<div id="tablet-parallax">
	<div id="pages">

	<?php 

	$i = 1;

	if ( have_rows( 'slide' ) ):
		while ( have_rows( 'slide' ) ): the_row();
			$slide_id = get_sub_field( 'slide_id' );
			$slide_title = get_sub_field( 'slide_title' );
	?>

	<?php 
		if ( get_sub_field( 'tablet_background_bottom' ) ) {
			$bottomImage = get_sub_field( 'tablet_background_bottom' )['url'];
		} else {
			$bottomImage = get_sub_field( 'tablet_background' )['url'];
		}

		if ( get_sub_field( 'tablet_background_top' ) ) {
			$topImage = get_sub_field( 'tablet_background_top' )['url'];
		} else {
			$topImage = '';
		}
	?>
		
		<div id="page-<?= $i++ ?>" data-id="<?= $slide_id ?>" style="background: url( '<?php echo get_sub_field( 'tablet_background' )['url']; ?>' );">
			<div class="background-top"></div>

			<style>
				@media screen and ( orientation:portrait ) {
					#page-<?php echo ( $i - 1 ); ?> {
						background-image: url('<?php echo $bottomImage; ?>') !important;
					}

					#page-<?php echo ( $i - 1 ); ?> .background-top {
						background-image: url('<?php echo $topImage; ?>');
					}
				}
			</style>

			<?php
				if ( have_rows( 'inside' ) ):
					while( have_rows( 'inside' ) ): the_row();


						// get type of item
						$type = get_sub_field( 'type' );

						$style = get_sub_field( 'style' );

						$class = get_sub_field( 'class' );

						if ( $type == 'Text' || $type == 'Animated Text' ) {
							$has_article = true;

							$content = get_sub_field( 'text' );
							@list( $first, $content ) = explode( "<hr />", $content );
echo <<< ARTICLE
			<article alt="2" class="show-me $class">
				<h1 class="">$slide_title</h1>
				<div class="main">
					$first
					<div class="divider fade-me animate-me to-top show"></div>
					<div class="description">
						$content
					</div>
				</div>
			</article>
ARTICLE;
						}
					endwhile;
				endif;
			?>
		</div>
		<?php
		endwhile;
	endif;
			?>

	</div>

	<div id="controls">
		<button class="control-left"><img src="<?php echo get_template_directory_uri(); ?>/img/arrow-left-white-small.png" alt="Left"></button>
		<button class="control-right"><img src="<?php echo get_template_directory_uri(); ?>/img/arrow-right-white-small.png" alt="Right"></button>
	</div>

	<div class="parallax-menu">
		<ul class="submenu leftmenu">

		<?php
			if ( have_rows( 'parallax_menu' ) ):
				while( have_rows( 'parallax_menu' ) ): the_row();

					$href = get_sub_field( 'href' );
					$title = get_sub_field( 'title' );

					if ( $href == '---' ) {
						echo '<li>&nbsp;</li>';
						continue;
					}
				?>

			<li>
				<a href="<?= $href; ?>" data-title="<?= $title; ?>"><span><?= $title ?></span></a>
			</li>
				<?php

				endwhile;
			endif;
		?>

		</ul>
	</div>
</div>

<?php

endif;

$php = get_field( 'include_php_file' );
$inc = dirname( __FILE__ ) . '/../includes/' . $php . '.php';
if( ! empty( $php ) && file_exists( $inc ) ) {
  require_once( $inc );
}

wp_enqueue_script('timelinelite', 'https://cdnjs.cloudflare.com/ajax/libs/gsap/1.9.0/TimelineLite.min.js', array('jquery'), true );
wp_enqueue_script('tweenmax', 'https://cdnjs.cloudflare.com/ajax/libs/gsap/1.9.0/TweenMax.min.js', array('jquery'), true );

wp_enqueue_script( 'audio-script', get_template_directory_uri() . '/js/single/about-us.min.js' );
wp_enqueue_style( 'parallax-css' );
wp_enqueue_script( 'parallax-config' );

get_footer();
