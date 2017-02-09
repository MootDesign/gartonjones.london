<?php
/**
 * The Template for displaying all single posts
 *
 * @package WordPress
 * @subpackage Twenty_Fourteen
 * @since Twenty Fourteen 1.0
 */

get_header();

require_once( 'mobile.php' );
$detect = new Mobile_Detect();

if ( ! $detect->isMobile() ) {
?>

<div id="videos" class="video-full video-start-me" style="position: absolute; top: 45px;">
	<video id="video" preload="auto" muted  class="start-me active load-me">
		<source class="load-me" data-src="<?php echo get_template_directory_uri(); ?>/videos/contact-phonebox-720.mp4" type="video/mp4" />
	</video>
</div>

<?php } ?>

<div class="video-box" style="max-width: 676px!important">
	<div class="office-choser">
		<h2>Please select one of our offices<br>that you would like to contact</h2>

		<div class="wrapper tube-signs" style="max-width: 600px; margin: 0 auto;">
			<div class="small-6 medium-4 columns">
				<a href="#westminster" class="bring-contact-form" >
					<img class="load-me" data-src="<?php echo get_template_directory_uri(); ?>/img/contact-tube-westminster-double.png" style="width: 140px;" alt="">
				</a>
				<ul>
					<li><span class="InfinityNumber clickable">0207 340 0480</span></li>
					<li><a href="#westminster" class="bring-contact-form">+ Contact the Office</a></li>
					<li><a href="<?php echo home_url( '/contact-us/westminster/?show=map' ); ?>">+ View on Map</a></li>
					<li><a href="<?php echo home_url( '/offices/westminster/' ); ?>">+ Learn More</a></li>
					<li><a href="<?php echo home_url( '/offices/westminster/team/' ); ?>">+ Meet the Team</a></li>
				</ul>
			</div>
			<div class="small-6 medium-4 columns">
				<a href="#nine-elms" class="bring-contact-form">
					<img class="load-me" data-src="<?php echo get_template_directory_uri(); ?>/img/contact-tube-nine-elms-double.png" style="width: 140px;" alt="">
				</a>
				<ul>
					<li><span class="InfinityNumber clickable">020 7735 1888</span></li>
					<li><a href="#nine-elms" class="bring-contact-form">+ Contact the Office</a></li>
					<li><a href="<?php echo home_url( '/contact-us/nine-elms/?show=map' ); ?>">+ View on Map</a></li>
					<li><a href="<?php echo home_url( '/offices/nine-elms/' ); ?>">+ Learn More</a></li>
					<li><a href="<?php echo home_url( '/offices/nine-elms/team/' ); ?>">+ Meet the Team</a></li>
				</ul>
			</div>
			<div class="small-6 medium-4 columns">
				<a href="#victoria-and-pimlico" class="bring-contact-form">
					<img class="load-me" data-src="<?php echo get_template_directory_uri(); ?>/img/contact-tube-victoria-double.png" style="width: 140px;" alt="">
				</a>
				<ul>
					<li><span class="InfinityNumber clickable">020 7730 5007</span></li>
					<li><a href="#victoria-and-pimlico" class="bring-contact-form">+ Contact the Office</a></li>
					<li><a href="<?php echo home_url( '/contact-us/victoria-and-pimlico/?show=map' ); ?>">+ View on Map</a></li>
					<li><a href="<?php echo home_url( '/offices/victoria-and-pimlico/' ); ?>">+ Learn More</a></li>
					<li><a href="<?php echo home_url( '/offices/victoria-and-pimlico/team/' ); ?>">+ Meet the Team</a></li>
				</ul>
			</div>
			<div class="small-6 medium-4 columns">
				<a href="#south-bank" class="bring-contact-form">
					<img class="load-me" data-src="<?php echo get_template_directory_uri(); ?>/img/contact-tube-south-bank-double.png" style="width: 140px;" alt="">
				</a>
				<ul>
					<li><span class="InfinityNumber clickable">0207 7735 1888</span></li>
					<li><a href="#south-bank" class="bring-contact-form">+ Contact the Office</a></li>
					<li><a href="<?php echo home_url( '/contact-us/south-bank/?show=map' ); ?>">+ View on Map</a></li>
					<li><a href="<?php echo home_url( '/offices/south-bank/' ); ?>">+ Learn More</a></li>
					<li><a href="<?php echo home_url( '/offices/nine-elms/team/' ); ?>">+ Meet the Team</a></li>
				</ul>
			</div>
			<div class="small-6 medium-4 columns">
				<a href="#chelsea-bridge-wharf" class="bring-contact-form">
					<img class="load-me" data-src="<?php echo get_template_directory_uri(); ?>/img/contact-tube-chelsea-bridge-wharf-double.png" style="width: 140px;" alt="">
				</a>
				<ul>
					<li><span class="InfinityNumber clickable">0207 7622 8800</span></li>
					<li><a href="#chelsea-bridge-wharf" class="bring-contact-form">+ Contact the Office</a></li>
					<li><a href="<?php echo home_url( '/contact-us/chelsea-bridge-wharf/?show=map' ); ?>">+ View on Map</a></li>
					<li><a href="<?php echo home_url( '/offices/chelsea-bridge-wharf/' ); ?>">+ Learn More</a></li>
				</ul>
			</div>
			<div style="clear: both;"></div>
		</div>
	</div>

	<div class="office-chosen hide">
		<h2>Contact us</h2>

		<a class="back-link" href="#back" style="position: absolute; top: -22px; right: 22px;">
			<div class="button-close open">
			    <div class="circle-arc">
			      <svg width="100%" viewBox="0 0 100 100">
			        <path d="M 50 50 m -43 0 a 43 43 0 1 1 86 0 a 43 43 0 1 1 -86 0"></path>
			      </svg>
			    </div>
			    <div class="bg" style="opacity: 1;">
			      <div></div>
			    </div>
			    <div class="line l-0"></div>
			    <div class="line l-1"></div>
			</div>
		</a>

		<div class="active-office medium-4 columns">
			<img class="office-image" src="<?php echo get_template_directory_uri(); ?>/img/contact-tube-.png" style="width: 140px;" alt="">

			<span class="office-name"></span>

			<address class="office-address"></address>

			<span class="office-phone InfinityNumber clickable">Call<br></span>
			<a href="" class="office-email">Email</a>
		</div>
		 <div class="contact-form medium-8 columns">
			<div id="westminster" class="hide">
				<h3>Westminster &amp; St James’s Office</h3>
				<?php echo do_shortcode( '[gravityforms id=4 title=false field_values="office_name=Westminster and St James’s&copy=kieran@gartonjones.com" ajax="true"]' ); ?>
			</div>
			<div id="nine-elms" class="hide">
				<h3>Nine Elms &amp; Vauxhall Office</h3>
				<?php echo do_shortcode( '[gravityforms id=4 title=false field_values="office_name=Nine Elms and Vauxhall&copy=kieran@gartonjones.com,riaan@gartonjones.com" ajax="true"]' ); ?>
			</div>
			<div id="victoria-and-pimlico" class="hide">
				<h3>Victoria & Pimlico Office</h3>
				<?php echo do_shortcode( '[gravityforms id=4 title=false field_values="office_name=Victoria and Pimlico&copy=kieran@gartonjones.com,riaan@gartonjones.com" ajax="true"]' ); ?>
			</div>
			<div id="south-bank" class="hide">
				<h3>South Bank Office</h3>
				<?php echo do_shortcode( '[gravityforms id=4 title=false field_values="office_name=South Bank&copy=greg@mootdesign.com" ajax="true"]' ); ?>
			</div>
			<div id="chelsea-bridge-wharf" class="hide">
				<h3>Chelsea Bridge Wharf Office</h3>
				<?php echo do_shortcode( '[gravityforms id=4 title=false field_values="office_name=Chelsea Bridge Wharf" ajax="true"]' ); ?>
			</div>
		</div>
		<div class="clearfix"></div>
		<div class="small-offices">
			<a class="westminster medium-6 columns bring-contact-form" href="#westminster">
				<img class="load-me" data-src="<?php echo get_template_directory_uri(); ?>/img/contact-tube-westminster.png" alt="">
			</a>
			<a class="nine-elms medium-6 columns bring-contact-form" href="#nine-elms">
				<img class="load-me" data-src="<?php echo get_template_directory_uri(); ?>/img/contact-tube-nine-elms.png" alt="">
			</a>
			<a class="victoria-and-pimlico medium-6 columns bring-contact-form" href="#victoria-and-pimlico">
				<img class="load-me" data-src="<?php echo get_template_directory_uri(); ?>/img/contact-tube-victoria.png" style="width: 140px; height: 115px;" alt="">
			</a>
			<a class="south-bank medium-6 columns bring-contact-form" href="#south-bank">
				<img class="load-me" data-src="<?php echo get_template_directory_uri(); ?>/img/contact-tube-south-bank.png" alt="">
			</a>
			<a class="chelsea-bridge-wharf medium-6 columns bring-contact-form" href="#chelsea-bridge-wharf">
				<img class="load-me" data-src="<?php echo get_template_directory_uri(); ?>/img/contact-tube-chelsea-bridge-wharf.png" alt="">
			</a>
		</div>
	</div>
</div>

<?php
get_footer();