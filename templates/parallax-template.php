<?php
// Detect if we are on tablet
require_once( get_template_directory() . '/mobile.php' );

$detect = new Mobile_Detect();

if ( ! $detect->isTablet() ) :

?>

<div class='preloaderCont'>
	<span class='ending'><img src="<?php echo get_template_directory_uri(); ?>/img/parallax/gartonjones.svg" style="max-width: auto; width: 100%;" /></span><span class='starting'><img src="<?php echo get_template_directory_uri(); ?>/img/parallax/preload2.svg" width="505" height="50" style="width: 505px; height: 50px;" /></span>

</div>

<!--  -->
<?php
//Change the "main" query
$post = get_post( get_field( 'parallax_page_id') );

?>
<a class="parallax-arrow right-arrow hide-for-touch hide-me">
	<img src="<?php echo get_template_directory_uri() ?>/img/arrow-right-big.png" />
</a>

<a class="parallax-arrow left-arrow hide-for-touch hide-me">
	<img src="<?php echo get_template_directory_uri() ?>/img/arrow-left-big.png" />
</a>

<div class="parallax-menu">
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
			<a href="<?= $href; ?>" data-title="<?= $title; ?>"><?= $title ?></a>
		</li>
			<?php

			endwhile;
		endif;
	?>

	</ul>
</div>

<div id="parallax" class="ignore-hashtag on-load no-resize">
	<img alt=".1" class="parallaxBackground" src="<?php echo get_template_directory_uri() ?>/img/union-jack-v1.png" /><!-- Background picture -->

	<div id="logo">
			<?php
				$tube = get_field( 'tube-sign' );
				if( ! empty( $tube ) ) :
			?>
			<img class="" src="<?php echo $tube ?>" style="position: absolute; width: 485px; height: 400px; top: 60%; left: 50%; transform: translate( -50%, -50% );" />
			<?php endif; ?>
		<img src="<?php echo get_template_directory_uri(); ?>/img/parallax/gartonjones.svg" style="position: absolute; width: 90%; height: auto;top: 50%; transform: translate( -50%, -50%); left: 50%;" />
	</div>

			<?php

			$credits = get_option( '_gj_parallax_credits', array() );
			$credits = @$credits[ get_the_ID() ];
			if ( have_rows( 'slide' ) ):
				while ( have_rows( 'slide' ) ): the_row();
					$slide_id = get_sub_field( 'slide_id' );
					// $slide_title = get_sub_field( 'slide_title' );
					$slide_title = '';

					$credits_text = @$credits[ $slide_id ];
					if( empty( $credits_text ) ) $credits_text = 'Credits to go here';
					$credits_text = stripslashes( wpautop( $credits_text ) );
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

							$speed = get_sub_field( 'speed' );

							$to_animate = $type == 'Animated Text';
							if ( $type == 'Text' || $type == 'Animated Text' ) {
								$has_article = true;

								// $sub_field = $type == 'Text' ? 'text' : 'html';
								$message = get_sub_field( 'text' );
								@list( $first, $content ) = explode( "<hr />", $message );

								$animated_class = ( $to_animate ) ? "animated-text" : "";
echo <<< ARTICLE
							<div style="$style;" class="fastLayer">
								<article alt="$speed" class="show-me $class $animated_class">
									<div class="main">
ARTICLE;

										if( $to_animate ) {
                      // $message = htmlspecialchars_decode( $message );
                      // $letters = str_split( $message );
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
                        // echo '<span>' . join( '</span><span>', $letters ) . '</span>';
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

						if( $to_animate ) :
					?>
							<div id="mouse">
								<span class="divider2"></span>
								<a href="#home" class="scroll-down">
                 View <?php the_title(); ?>
               	</a>
							</div>
					<?php
						endif;

								continue;
							} else if ( $type == 'Image' ) {
								$img = get_sub_field( 'image' );

								$content = '<img src="' . $img["url"] . '" alt="" class="' . $img['alt'] . '" data-width="' . $img['width'] . '" data-height="' . $img['height'] . '"/>';
							} else if ( $type == 'Html' ) {
								$content = get_sub_field( 'html' );
							} else {
								$content = ''; // make sure content is set
							}

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

			<div class="credits" style="position: absolute;bottom: 53px; right: 20px"><?php echo $credits_text ?></div>
		</div>

	</div><!-- end of parallax slide -->

	<?php
				endwhile;
			endif;

			wp_reset_postdata();
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

<?php if( isset( $_GET[ 'section' ] ) ) : ?>
var scrollToSlide = '<?php echo $_GET[ 'section' ] ?>';
<?php endif; ?>
</script>
<?php

else :


	wp_enqueue_script( 'tablet-parallax' );
	wp_enqueue_style( 'tablet-parallax-style' );

	//Change the "main" query
	$post = get_post( get_field( 'parallax_page_id') );

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
			<div id="page-<?= $i++ ?>" data-id="<?= $slide_id ?>">

				<?php
					if ( have_rows( 'inside' ) ):
						while( have_rows( 'inside' ) ): the_row();


							// get type of item
							$type = get_sub_field( 'type' );

							$style = get_sub_field( 'style' );

							$class = get_sub_field( 'class' );

							if ( $type == 'Text' ) {
								$has_article = true;

								$content = get_sub_field( 'text' );
								@list( $first, $content ) = explode( "<hr />", $content );
echo <<< ARTICLE
			<article alt="2" class="show-me $class">
				<!-- <h1 class="">$slide_title</h1> -->
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
					<a href="<?= $href; ?>" data-title="<?= $title; ?>"><?= $title ?></a>
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

wp_enqueue_script( 'audio-script', get_template_directory_uri() . '/js/single/about-us.min.js' );
wp_enqueue_style( 'parallax-css' );
wp_enqueue_style( 'parallax-mini-css' );
wp_enqueue_script( 'parallax-config' );

wp_enqueue_style('fontawesome', '//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css' );

wp_enqueue_script('timelinelite', 'https://cdnjs.cloudflare.com/ajax/libs/gsap/1.9.0/TimelineLite.min.js', array('jquery'), true );
wp_enqueue_script('tweenmax', 'https://cdnjs.cloudflare.com/ajax/libs/gsap/1.9.0/TweenMax.min.js', array('jquery'), true );
