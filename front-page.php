<?php
/**
* The Template for displaying all single posts
*
* @package WordPress
* @subpackage Twenty_Fourteen
* @since Twenty Fourteen 1.0
*/

get_header(); 

// Detect if we are on tablet
require_once( get_template_directory() . '/mobile.php' );

$detect = new Mobile_Detect();
?>

<script>
	jQuery(document).ready(function(){
		jQuery('#scanlines, #grad3').fadeIn('slow');
	});
</script>

<div id="mapholder">
	<div class="dot-contact">
		<div></div>
	</div>

	<div class="fullscreen-bg">
		<?php
			// if we are on mobile phone, don't load the coverflow
			if ( ! $detect->isMobile() || $detect->isTablet()) {
		?>
			<video id="video1" class="fullscreen-bg__video" loop autoplay="autoplay" loop="loop" preload="auto" <?php echo ( @$isiPad ) ? 'poster="<?php echo get_template_directory_uri(); ?>/videos/gjintro.png"' : '' ?> muted>
				<source src="<?php echo get_template_directory_uri(); ?>/videos/gjintro.mp4" type="video/mp4" />
			</video>
		<?php
			}
		?>
	</div>
</div>

<?php
		if ( have_posts() ) :
			// Start the Loop.
			while ( have_posts() ) : the_post();
?>
<?php 
	if ( ! $detect->isMobile()) {
?>
	<div class="row row-home">
		<div class="small-12 medium-6 large-3 columns">
			<a href="#" class="search-popup" style="color:#fff;">Search<br>Properties</a>
			<span class="v-line"></span>
			<span class="h-line"></span>
		</div>
		<div class="small-12 medium-6 large-3 columns">
			<a href="/about-us" style="color:#fff;">About</a>
			<span class="v-line"></span>
			<span class="h-line"></span>
		</div>
		<div class="small-12 medium-6 large-3 columns">
			<a href="/news/" style="color:#fff;">News</a>
			<span class="h-line"></span>
		</div>
		<div class="small-12 medium-6 large-3 columns">
			<a href="/payments/#payments-to-garton-jones" style="color: #fff">Payments to<br>Garton Jones</a>
		</div>
	</div>
<?php 
	}
?>
<?php
  $sbg = get_field( 'custom_background', 17082 );
  $url = $sbg[ 'url' ];

  $style = "style=\"background: url('" . $url . "' )\"";
  $video = "";
  if( $sbg[ 'mime_type' ] == "video/mp4" ) :
    $style = "";
$video =<<< VIDEO
  <div id="search-video" class="hide-for-small video-full">
		<video id="video-search" loop class="load-me autoplay" data-src="$url">
		</video>
	</div>
VIDEO;
  endif;
?>
	<div id="search-popup" class="close-me">
		<?php echo $video ?>
		<div class="button-close">
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

		<?php require_once( 'template_search_new.php' ); ?>
	</div>

	<?php 	endwhile;
				// Previous/next post navigation.
			else :
				// If no content, include the "No posts found" template.
				get_template_part( 'content', 'none' );
			endif;
	?>
<?php

	wp_enqueue_script( 'search-js' );

	get_footer();

	if ( $detect->isMobile()) {
?>

<script>
	jQuery(document).ready(function( $ ) {
		setTimeout(function() {
			$( '#search-popup' ).addClass( 'visible' );
				showShade( 100 ,true);
				//showClose( 1000, '#search-popup' );
				$( '#search-popup .button-close' ).hide();
	
				var v = document.getElementById( 'video-search' );
				v.play();
		}, 1000);
	});
</script>

<?php 
	}
?>
