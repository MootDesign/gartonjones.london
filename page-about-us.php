<?php
$GLOBALS['custom_body_class'] = 'unloaded about-us-parallax';
require_once( 'mobile.php' );
$detect = new Mobile_Detect();
get_header();
?>


<style>
	#overlay-boxes>div{background:#fff;position:fixed;width:100%;height:50%;z-index:7}#overlay-boxes .box1{top:0}#overlay-boxes .box2{top:50%}
	article .links {
		margin-bottom: 20px;
	}
</style>

<?php // if the page is tablet, don't load the parallax
if ( ! $detect->isMobile() && ! $detect->isTablet() ) :

?>
	<img class="loadBackground" src="<?php echo get_template_directory_uri(); ?>/img/parallax/bck.png">

	<div class='preloaderCont'>
		<span class='ending'><img src="<?php echo get_template_directory_uri(); ?>/img/parallax/gartonjones.svg" style="max-width: auto; width: 100%;" /></span><span class='starting'><img src="<?php echo get_template_directory_uri(); ?>/img/parallax/preload.svg" width="505" height="50" style="width: 505px; height: 50px;" /></span>
	</div>

	<div id="overlay-boxes">
		<div class="box1"></div>
		<div class="box2"></div>
	</div>

  <a class="parallax-arrow right-arrow hide-for-touch hide-me">
	<img src="<?php echo get_template_directory_uri() ?>/img/arrow-right-big.png" />
  </a>

  <a class="parallax-arrow left-arrow hide-for-touch hide-me">
	<img src="<?php echo get_template_directory_uri() ?>/img/arrow-left-big.png" />
  </a>

	<div class="parallax-menu" style="display: none">
		<ul class="submenu leftmenu">
			<li>
				<a href="#about" data-title="About Us"><span>About Us</span></a>
			</li>
			<li>
				<a href="#team" data-title="Meet the Team"><span>Meet the Team</span></a>
			</li>
			<li>
				<a href="#offices" data-title="Our Offices"><span>Our Offices</span></a>
			</li>
			<li>
				<a href="#social" data-title="Social Media"><span>Social Media</span></a>
			</li>
			<li>
				<a href="<?php echo home_url('/developments-intro/#developments'); ?>" data-title="Specialist Developments"><span>Specialist Developments</span></a>
			</li>
			<li>
				<a href="<?php echo home_url('/developments-intro/#video'); ?>" data-title="Development Videos"><span>Development Videos</span></a>
			</li>
		</ul>
	</div>

	<div id="parallax"  class="no-resize">
	<?php
	  $bg = get_field( 'custom_background' );
	  if( isset( $bg['url' ] ) ) {
		$bg = $bg[ 'url' ];
	  } else {
		$bg = get_template_directory_uri() . "/img/parallax/bck.png";
	  }

	  $credits = get_option( '_gj_parallax_credits', array() );
			$credits = @$credits[ get_the_ID() ];

	?>
		<img alt=".1" class="parallaxBackground" src="<?php echo $bg ?>">

		<div id="logo">
			<img src="<?php echo get_template_directory_uri(); ?>/img/parallax/gartonjones.svg" style="position: absolute; width: 90%; height: auto;top: 50%; transform: translate( -50%, -50%); left: 50%;" />
		</div>

		<div id="about">
			<div class='para-totalCenterAlign countWidth'>

				<div class="fastLayer" style="right: 0; width: 100%; height: 100%;">
					<div alt="1.5" class="fastInner">
						<img src="<?php echo get_template_directory_uri(); ?>/img/parallax/l-1.png" style="position: absolute; min-width: 100%; min-height: 100%; top: 0; left: 0" />
					</div>
				</div>

			<!-- Queen -->
				<div class="fastLayer" style="left: 0; width: 100%; height: 100%;">
					<div alt="1.8" class="fastInner">
						<img class="queen layer" src="<?php echo wp_get_attachment_image_src( 63621, 'full' )[0]; ?>" style="left: 12%; position: absolute; height: 100%; bottom: -20px"/>
					</div>
				</div>

			<!-- Dog pee flipped -->
				<div class="fastLayer" style="bottom: 42%; left: 31%">
					<div alt="1.8" class="fastInner dog-no-pee lazy-background" data-background-url="<?php echo get_template_directory_uri(); ?>/img/parallax/dognopee6.png" data-frames="85">
					</div>
				</div>

			<!-- Car -->
			<div class="div-relative">
				<div class="fastLayer" style="bottom: 75px; left: 0;">
					<div alt="0.8" class="fastInner" style="display: inline-block; overflow: visible; position: absolute; left: 0px; -webkit-transform: translate3d(149.075185981939px, 0px, 0px); transform: translate3d(149.075185981939px, 0px, 0px);">
						<img class="car layer" data-audio="<?php echo get_template_directory_uri(); ?>/mp3/car.mp3" src="http://gj.mootexpress.com/wp-content/uploads/car-flipped.png" style="max-height: 200px" data-audio="http://gj.mootexpress.com/wp-content/themes/new_theme/mp3/car.mp3">
						<img src="http://gj.mootexpress.com/wp-content/uploads/wheel.png" class="rotate-me" style="max-height: 64px; position: absolute; left: 14.5%; top: 58%; transform: rotate(0deg);">
						<img src="http://gj.mootexpress.com/wp-content/uploads/wheel2.png" class="rotate-me" style="max-height: 64px; position: absolute; right: 22%; top: 57%; transform: rotate(68deg);">
					</div>
				</div>
			</div>

			<!-- Letterbox -->
				<div class="fastLayer" style="left: 0; width: 100%; height: 100%;">
					<div alt="2.5" class="fastInner">
						<img src="<?php echo get_template_directory_uri(); ?>/img/parallax/letterbox.png" style="left: 12%; bottom: 7%; position: absolute; max-height: 350px;" class="layer letterbox" />
					</div>
				</div>

				<div class="fastLayer" style="right: 0; width: 100%; height: 100%;">
					<div alt="2.9" class="fastInner">
						<img src="<?php echo get_template_directory_uri(); ?>/img/parallax/l0.png" style="position: absolute; min-width: 100%; min-height: 100%; top: 0; left: 0;" />
					</div>
				</div>

				<div class="fastLayer" style="right: 0; width: 100%; height: 100%;">
					<div alt="4" class="fastInner">
						<img src="<?php echo get_template_directory_uri(); ?>/img/parallax/l1.png" style="position: absolute; min-width: 100%; min-height: 100%; top: 0; left: 0;" />
					</div>
				</div>

				<div class="fastLayer" style="right: 0; width: 100%; height: 100%;">
					<div alt="5" class="fastInner">
						<img class="red-thingy" src="<?php echo get_template_directory_uri(); ?>/img/parallax/big_r_speckle.png" style="position: absolute; min-width: 26%; min-height: 25%; top:0; left: 0;" />
					</div>
				</div>

				<div class="fastLayer" style="right: 0; width: 100%; height: 100%;">
					<div alt="5.4" class="fastInner">
						<img src="<?php echo get_template_directory_uri(); ?>/img/parallax/big_y_speckle.png" style="position: absolute; min-width: 46%; min-height: 45%; bottom:0; right: 0;" />
					</div>
				</div>

				<!-- Content About -->
				<article alt="2" class="show-me">
					<h1 class="fade-me animate-me to-bottom">About Us</h1>
					<div class="main fade-me animate-me to-top">
						<p class=" to-left">
							Garton Jones is an independent, family run, estate agents specialising in the sale, rental and management of residential property in Central London.
						</p>
						<p class=" to-right">
							We are known for specialising in the marketing of modern and new build, luxury apartments and we have a versatile portfolio of properties to offer from studio flats to some of London's finest Penthouses
						</p>
						<p><a class="toggle-content-link">Read more</a></p>
						<div class="divider fade-me animate-me to-top"></div>
						<div class="toggle-content" style="display: none;">
							<div class="description fade-me animate-me to-scale" style="">
								<p>
									Through a network of associates, we have access to much of London's residential property portfolio and therefore, what you will see on our website today is just a small proportion of what we have to offer.
								</p>
								<p>
									Come and visit us in one of our stylish offices in the heart of Westminster, in Nine Elms or at Chelsea Bridge Wharf to discuss your requirements with a member of our highly experienced team, who are all knowledgable in both the local sales and rental markets otherwise we look forward to receiving your request from this site.
								</p>
							</div>

							<style>
								.about-logos img:first-child {
									width: 55px !important;
								}

								.about-logos img:nth-child(2) {
									width: 130px !important;
								}

								.yoshkidiv {
									overflow: hidden;
									width: 130px;
									height: 136px;
									margin-top: -40px;
									vertical-align: middle;
								}

								@media screen and ( max-width: 400px ) {
									.yoshkidiv {
										margin-top: 0;
									}
								}
							</style>
						</div>
					</div>
					<script>
					function myFunction() {
					    window.location.href = 'https://www.tpos.co.uk/';
					}
					</script>
					<div class="about-logos" style="margin-top: 10px;">
						<img src="<?php echo get_template_directory_uri(); ?>/img/parallax/about/logo-1-1.png" style="width: 55px;" alt="">
						<img src="<?php echo get_template_directory_uri(); ?>/img/parallax/about/logo-2-1.png" onclick="myFunction()" style="width: 132px!important;" alt="">
						<script type="text/javascript" src="http://yoshki.com/yoshki-library.js"></script>
						<img src="http://yoshki.com/TSI/validation/130/0/logo.png" class="badgenopopup" />

						<p style="font-size: 12px; margin-right: 72px; margin-top: -21px; color: #fff!important;"><a style="color: #fff!important" href="https://www.tpos.co.uk/">www.tpos.co.uk</a></p>

						<div class="about-disclaimer">
							Disclaimer Garton Jones endeavour to maintain accurate depictions of properties in Virtual 
							Tours, Floor Plans and descriptions, however, these are intended only as a guide and 
							purchasers must satisfy themselves by personal inspection.
							<br><br>
							Garton Jones © <?php echo date('Y'); ?> Privacy Policy
						</div>
					</div>
				</article>

		<?php
		  $credits_text = @$credits[ "about" ];
		  if( empty( $credits_text ) ) $credits_text = '';
		?>
		  <div class="credits" style="position: absolute;bottom: 73px; right: 20px"><?php echo stripslashes( wpautop( $credits_text ) ) ?></div>
			</div>
		</div>

		<div id="team" class="fly-perspective">
			<div class='para-totalCenterAlign countWidth'>

			<!-- London -->
				<div class="fastLayer" style="left: 0; width: 100%; height: 100%;">
					<div alt="1.3" class="fastInner">
						<div style="position: absolute; left: -28%; max-height: 70%; top: 2%;">
							<img src="<?php echo get_template_directory_uri(); ?>/img/parallax/gjlondon3.png"/>
							<img src="<?php echo get_template_directory_uri(); ?>/img/parallax/wheel.png" class="wheel z360" />
						</div>
					</div>
				</div>

			<!-- The bus -->
				<div class="fastLayer" style="left: 0; width: 100%; height: 100%;">
					<div alt="1.5" class="fastInner">
						<img src="<?php echo get_template_directory_uri(); ?>/img/parallax/bus.png" style="position: absolute; left: -29%; bottom: 140px;" class="bus layer" data-audio="<?php echo get_template_directory_uri(); ?>/mp3/bus.mp3" />
					</div>
				</div>

			<!-- Guy 2 -->
				<div class="fastLayer" style="left: 0; width: 100%; height: 100%;">
					<div alt="1.5" class="fastInner">
						<img src="<?php echo get_template_directory_uri(); ?>/img/parallax/guy2.png" style="position: absolute; left: -40%; bottom: 57px;" class="guy2 layer" data-audio="<?php echo get_template_directory_uri(); ?>/mp3/laugh.mp3" />
					</div>
				</div>

			<!-- Guy 1 -->
				<div class="fastLayer" style="left: 0; width: 100%; height: 100%">
					<div alt="1.7" class="fastInner">
						<img src="<?php echo get_template_directory_uri(); ?>/img/parallax/guy1.png" style="position: absolute; left: -36%; bottom: 57px;" class="guy1 layer" data-audio="<?php echo get_template_directory_uri(); ?>/mp3/laugh.mp3" />
					</div>
				</div>

			<!-- Fish & Chips -->
				<div class="fastLayer" style="left: 0; width: 100%; height: 100%;">
					<div alt="2.6" class="fastInner">
						<img class="layer" src="<?php echo get_template_directory_uri(); ?>/img/parallax/fish-chips.png" style="position: absolute; left: -80%; bottom: 190px;" />
					</div>
				</div>

			<!-- Flag -->
				<div class="fastLayer" style="left: 0; width: 100%; height: 100%;top: 38px;">
					<div alt="3.0" class="fastInner">
						<img class="layer load-me" data-src="<?php echo get_template_directory_uri(); ?>/img/parallax/ukflag2.gif" style="position: absolute; top: 30px; left: 259px; max-height: 260px;; height: 50%;" />
					</div>
				</div>

			<!-- Horse Guards -->
				<div class="fastLayer" style="left: 0; width: 100%; height: 100%;">
					<div alt="3.4" class="fastInner">
						<img class="layer" src="<?php echo get_template_directory_uri(); ?>/img/parallax/horseguard.png" style="position: absolute; left: -302px; top: 10%; height: 73%;" data-audio="<?php echo get_template_directory_uri(); ?>/mp3/horse1.mp3" data-audio-right="<?php echo get_template_directory_uri(); ?>/mp3/horse2.mp3" class="horse" />
					</div>
				</div>

			<!-- Guard -->
				<div class="fastLayer" style="left: 0; width: 100%; height: 100%;">
					<div alt="5" class="fastInner">
						<img class="layer" src="<?php echo get_template_directory_uri(); ?>/img/parallax/guard.png" style="position: absolute; left: 28%; max-height: 79%; bottom: 85px;" />
					</div>
				</div>

				<div class="fastLayer" style="width: 100%; height: 100%; left: 0; top: 0;">
					<div alt="6.2" class="fastInner">
						<img src="<?php echo get_template_directory_uri(); ?>/img/parallax/l1.png" style="min-width: 100%; min-height: 100%; position: absolute; left: 0; top: 0;" />
					</div>
				</div>

				<div class="fastLayer" style="width: 100%; height: 100%; left: 0; top: 0;">
					<div alt="6.2" class="fastInner">
						<img src="<?php echo get_template_directory_uri(); ?>/img/parallax/l1.png" style="min-width: 100%; min-height: 100%; position: absolute; left: 0; top: 0;" />
					</div>
				</div>

				<!-- Content Team -->
				<article alt="2" class="show-me">
					<div class="fly-me animate-me" data-revert="away">
						<h1>Meet the Team</h1>
						<div class="main" style="line-height: 28px !important;">
							<p>
								All of our property consultants are local experts who specialise in both sales and rentals. They have in depth knowledge of the properties we have available and through experience, may also be aware of a suitable property that may not be visible on this website. 
							</p>
							<p>Please select an office</p>
							<div class="links">
								<a href="<?php echo home_url( '/offices/westminster/team/' ); ?>" class="fade-me animate-me to-rotate" data-delay="600">Westminster & St James’s</a>
								<a href="<?php echo home_url( '/offices/nine-elms/team/' ); ?>" class="fade-me animate-me to-rotate" data-delay="750">Nine Elms & Vauxhall</a>
								<a href="<?php echo home_url( '/offices/nine-elms/team/' ); ?>" class="fade-me animate-me to-rotate" data-delay="750">South Bank</a>
								<a href="<?php echo home_url( '/offices/victoria-and-pimlico/team/' ); ?>" class="fade-me animate-me to-rotate" data-delay="750">Victoria & Pimlico</a>
							</div>
							<div class="description">
								<p>
									 In most cases, we can also advise you on the current market value, over the phone, if you are wanting to sell or rent your property or properties.  We are happy to discuss individual properties as well as portfolios. 
								</p>
								<p>
									We know our market very well and are skilled negotiators with many years of experience. 
								</p>
								<p>
									Talk to us, we are here to listen and to help you with your requirements, whether you are looking to sell, buy or to rent a property in Central London. 
								</p>
							</div>

							<img src="<?php echo get_template_directory_uri(); ?>/img/parallax/symbol.png" style="margin-top: 15px;" />
						</div>
					</div>
				</article>

		<?php
		  $credits_text = @$credits[ "team" ];
		  if( empty( $credits_text ) ) $credits_text = '';
		?>

		  <div class="credits" style="position: absolute;bottom: 73px; right: 20px"><?php echo stripslashes( wpautop( $credits_text ) ) ?></div>

			</div>
		</div>

		<div id="offices">
			<div class='countWidth para-totalCenterAlign'>

			<!-- Dog pee -->

				 <div class="fastLayer" style="bottom: 55%; left: 0;">
					<div alt="1" class="fastInner dog-pee dog-pee-right lazy-background" data-background-url="<?php echo get_template_directory_uri(); ?>/img/parallax/dognopee6.png" data-frames="68" data-audio="<?php echo get_template_directory_uri(); ?>/mp3/dog.mp3">
					</div>
				</div>

		<!--  Lamp post -->
		<div class="fastLayer" style="top: 0; left: 0; width: 100%; height: 100%;">
					<div alt="1" class="fastInner">
			<img src="<?php echo get_template_directory_uri(); ?>/img/parallax/lamp-post.png" style="position: absolute; max-height: 80%; bottom: 247px; left: 34%;" class="lamp-post layer" />
					</div>
				</div>

			<!-- Phonebox -->
				<div class="fastLayer" style="top: 0; left: 0; width: 100%; height: 100%;">
					<div alt="2" class="fastInner">
						<img src="<?php echo get_template_directory_uri(); ?>/img/parallax/phonebox3.png" style="position: absolute; max-height: 80%; bottom: 130px; left: 17%;" data-audio="<?php echo get_template_directory_uri(); ?>/mp3/phone.mp3" class="phone layer" data-limit="1" />
					</div>
				</div>

			<!-- Pigeon on the ground -->
				<div class="fastLayer" style="top: 0; left: 0; width: 100%; height: 100%;">
					<div alt="2.8" class="fastInner">
						<img class="layer" src="<?php echo get_template_directory_uri(); ?>/img/parallax/pigeon1.png" style="position: absolute; bottom: 110px; left: 14%;width:9%" />
					</div>
				</div>

			<!-- Two pigeons -->
				<div class="fastLayer" style="top: 0; left: 0; width: 100%; height: 100%;">
					<div alt="4" class="fastInner">
						<img class="layer" src="<?php echo get_template_directory_uri(); ?>/img/parallax/pigeon3.png" style="position: absolute; bottom: 210px; left: 25%; max-height: 200px;" />
					</div>
				</div>

			<!-- Pigeon flying -->
				<div class="fastLayer" style="top: 0; left: 10px; width: 100%; height: 100%;">
					<div alt="5.6" class="fastInner">
						<img class="layer" src="<?php echo get_template_directory_uri(); ?>/img/parallax/pigeon2.png" style="position: absolute; bottom: 252px; left: 14%; max-height: 220px;" />
					</div>
				</div>

				<!-- Content Offices -->
				<article alt="2" class="show-me">
					<h1 class="fade-me to-bottom animate-me">Our Offices</h1>
					<div class="main">
						<p class="description fade-me animate-me" style="text-align:center !important; width:90% !important;">
							All of our offices are located within walking distance of transport services or we can arrange parking for you, if you prefer to visit us by car. Alternatively, we can come to you, just tell us where and when. 
						</p>
						<div class="description fade-me animate-me">
							<p style="text-align: center;margin-top: 20px;">
								We do love our customers to visit us when you are able to as we have everything to hand. You will find our offices very relaxed and you can expect to be looked after, we are not in a rush. 
							</p>
						</div>

						<style type="text/css">
							#parallax .offices a.westminster, #tablet-parallax .offices a.westminster {
    							top: 10px!important;
    							left: 70px!important;
							}
							#parallax .offices a.nine, #tablet-parallax .offices a.nine {
    							top: 10px!important;
    							left: 320px!important;
							}
							#parallax .offices a.south, #tablet-parallax .offices a.south {
    							top: 240px;
   								left: 70px;
							}
							#parallax .offices a.chelsea, #tablet-parallax .offices a.chelsea {
    							top: 180px;
    							left: 290px;
							}							
							#parallax .offices a.chelsea, #tablet-parallax .offices a.chelsea {
    							top: 240px;
    							left: 320px;
							}
							#parallax .offices a.victoria, #tablet-parallax .offices a.victoria {
    							top: 120px;
    							left: 190px;
							}	
							#parallax .divider, #tablet-parallax .divider {
    							margin-top: 5.5em!important;
							}


						</style>

						<div class="offices">
							<a href="<?php echo home_url( '/offices/westminster/' ); ?>" class="westminster fade-me animate-me to-screen delay-005"><img src="<?php echo wp_get_attachment_image_src( 63626, 'full' )[0]; ?>" /></a>
							<a href="<?php echo home_url( '/offices/nine-elms/' ); ?>" class="nine fade-me animate-me to-screen delay-01"><img src="<?php echo wp_get_attachment_image_src( 63623, 'full' )[0]; ?>" /></a>
							<a href="<?php echo home_url( '/offices/south-bank/' ); ?>" class="south fade-me animate-me to-screen delay-015"><img src="<?php echo wp_get_attachment_image_src( 63625, 'full' )[0]; ?>" /></a>
							<a href="<?php echo home_url( '/offices/chelsea-bridge-wharf/' ); ?>" class="chelsea fade-me animate-me to-screen delay-02"><img src="<?php echo wp_get_attachment_image_src( 63622, 'full' )[0]; ?>" /></a>
							<a href="<?php echo home_url( '/offices/victoria-and-pimlico/' ); ?>" class="victoria fade-me animate-me to-screen delay-02"><img src="<?php echo wp_get_attachment_image_src( 2724073, 'full' )[0]; ?>" /></a>
						</div>

						<div class="divider fade-me to-top animate-me"></div>

					</div>
				</article>

		<?php
		  $credits_text = @$credits[ "offices" ];
		  if( empty( $credits_text ) ) $credits_text = '';
		?>
		  <div class="credits" style="position: absolute;bottom: 73px; right: 20px"><?php echo stripslashes( wpautop( $credits_text ) ) ?></div>

			</div>
		</div>

		<div id="social">
	  <div class="fastLayer" style="bottom  : 0; left: 0; width: 100%; height: 100%; pointer-events:none">
		<div alt="1" class="fastInner">
		  <img src="<?php echo get_template_directory_uri(); ?>/img/parallax/about-guys.png" style="position: absolute; max-height: 80%; bottom: 0; right: 0%;" class="about-guys layer" />
		</div>
	  </div>
			<div class='countWidth para-totalCenterAlign' style="transform: translateX(-15%);">
				<article alt="2" class="show-me">
					<h1 class="fade-me to-bottom animate-me" style="margin-top: 10%; margin-bottom: 2%;">Social Media</h1>
					<div class="main">
						<p class="description fade-me animate-me" style="line-height: 26px !important; margin-bottom: 30px;">
							Our social channels are something that we are very passionate about, which is why we have a strong presence across an array of platforms. These platforms include; Facebook, Twitter, LinkedIn, Instagram, and our very own development specific microsites.
						</p>
					</div>
					<div class="about-socials">
						<a target="_blank" href="https://www.facebook.com/pages/Garton-Jones-Real-Estate/558753517497591" class="fade-me animate-me to-screen"><img src="<?php echo wp_get_attachment_image_src( 90942, 'full' )[0]; ?>" /></a>
						<a target="_blank" href="https://twitter.com/GartonJonesLDN" class=" fade-me animate-me to-screen delay-005"><img src="<?php echo wp_get_attachment_image_src( 90946, 'full' )[0]; ?>" /></a>
						<a target="_blank" href="https://www.linkedin.com/pub/kieran-chalker/35/416/b9" class=" fade-me animate-me to-screen delay-01"><img src="<?php echo wp_get_attachment_image_src( 90945, 'full' )[0]; ?>" /></a>
						<a target="_blank" href="https://instagram.com/" class=" fade-me animate-me to-screen delay-015"><img src="<?php echo wp_get_attachment_image_src( 90944, 'full' )[0]; ?>" /></a>
						<a target="_blank" href="http://gartonjonesnineelmslane.com" class=" fade-me animate-me to-screen delay-02"><img src="<?php echo wp_get_attachment_image_src( 90943, 'full' )[0]; ?>" /></a>
					</div>
				</article>

		<?php
		  $credits_text = @$credits[ "social" ];
		  if( empty( $credits_text ) ) $credits_text = '';
		?>

		  <div class="credits" style="position: absolute;bottom: 73px; right: 20px"><?php echo stripslashes( wpautop( $credits_text ) ) ?></div>

			</div>

		</div>

	</div>

	<div id="videos" class="video-full">
		<video id="west2nine" preload="auto" muted class="hyperlapse">
			<source src="<?php echo get_template_directory_uri(); ?>/videos/w2n.mp4" type="video/mp4" />
		</video>
	</div>

	<div style='display:none'>
		Placed here just to make the preloader busy.

	</div>

<?php
// mobile parallax
elseif ( $detect->isMobile() && ! $detect->isTablet() ) :

	wp_enqueue_script( 'mobile-parallax' );
	wp_enqueue_style( 'mobile-parallax-style' );

?>
<!-- mobile submenu -->
<div id="submenu">
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
			<li><a href="#page-1" data-id="#about">About Us</a></li>
			<li><a href="#page-2" data-id="#team">Meet the Team</a></li>
			<li><a href="#page-3" data-id="#offices">Our Offices</a></li>
			<li><a href="#page-4" data-id="#social">Social Media</a></li>
			<li>
				<a href="<?php echo home_url('/developments-intro/#developments'); ?>" data-title="Specialist Developments"><span>Specialist Developments</span></a>
			</li>
			<li>
				<a href="<?php echo home_url('/developments-intro/#video'); ?>" data-title="Development Videos"><span>Development Videos</span></a>
			</li>
		</ul>
	</div>
</div>

<div id="mobile-parallax">
	<div id="pages">
		<div id="page-1" data-id="about">
			<!-- Content About -->
			<article>
				<h1>About Us</h1>
				<div class="main">
					<p>
						Garton Jones is an independent, family run, estate agents specialising in the sale, rental and management of residential property in Central London.
					</p>
					<p style="margin-top:30px">
						We are known for specialising in the marketing of modern and new build, luxury apartments and we have a versatile portfolio of properties to offer from studio flats to some of London's finest Penthouses
					</p>
					<div class="divider"></div>
					<div class="description">
						<p>
							Through a network of associates, we have access to much of London's residential property portfolio and therefore, what you will see on our website today is just a small proportion of what we have to offer. 
						</p>
						<p>
							Come and visit us in one of our stylish offices in the heart of Westminster, in Nine Elms or at Chelsea Bridge Wharf to discuss your requirements with a member of our highly experienced team, who are all knowledgable in both the local sales and rental markets otherwise we look forward to receiving your request from this site.
						</p>
					</div>

					<style>
						.about-logos img:first-child {
							width: 55px !important;
						}

						.about-logos img:nth-child(2) {
							width: 132px !important;
						}

						.yoshkidiv {
							overflow: hidden;
							width: 132px;
							height: 136px;
							margin-top: -40px;
							vertical-align: middle;
						}
					</style>
					<div class="about-logos">
						<img src="<?php echo get_template_directory_uri(); ?>/img/parallax/about/logo-1-1.png" style="width: 55px;" alt="">
						<img src="<?php echo get_template_directory_uri(); ?>/img/parallax/about/logo-2-1.png" style="width: 132px;" alt="">
						<script type="text/javascript" src="http://yoshki.com/yoshki-library.js"></script>
						<img src="http://yoshki.com/TSI/validation/130/0/logo.png" class="badgenopopup" />
					</div>

					<div class="about-disclaimer">
						Disclaimer Garton Jones endeavour to maintain accurate depictions of properties in Virtual 
						Tours, Floor Plans and descriptions, however, these are intended only as a guide and 
						purchasers must satisfy themselves by personal inspection.
						<br><br>
						Garton Jones © <?php echo date('Y'); ?> Privacy Policy
					</div>
				</div>
			</article>
		</div>

		<div id="page-2" data-id="team">
			<article>
				<div data-revert="away">
					<h1>Meet the Team</h1>
					<div class="main">
						<p>
							 All of our property consultants are local experts who specialise in both sales and rentals. They have in depth knowledge of the properties we have available and through experience, may also be aware of a suitable property that may not be visible on this website. 
						</p>
						<p>Please select an office</p>
						<div class="links">

							<a href="<?php echo home_url( '/offices/westminster/team/' ); ?>" data-delay="600">Westminster & St James’s</a>
							<a href="<?php echo home_url( '/offices/nine-elms/team/' ); ?>" data-delay="750">Nine Elms & Vauxhall</a>
							<a href="<?php echo home_url( '/offices/nine-elms/team/' ); ?>" data-delay="900">South Bank</a>
							<a href="<?php echo home_url( '/offices/victoria-and-pimlico/team/' ); ?>" data-delay="900">Victoria & Pimlico</a>
						</div>
						<div class="description" style="margin: 30px auto !important;">
							<p>
								In most cases, we can also advise you on the current market value, over the phone, if you are wanting to sell or rent your property or properties.  We are happy to discuss individual properties as well as portfolios.
							</p>
							<p>
								We know our market very well and are skilled negotiators with many years of experience. 
							</p>
							<p>
								Talk to us, we are here to listen and to help you with your requirements, whether you are looking to sell, buy or to rent a property in Central London.
							</p>
						</div>
					</div>
				</div>
			</article>
		</div>

		<div id="page-3" data-id="offices">
			<!-- Content Offices -->
			<article alt="2">
				<h1>Our Offices</h1>
				<div class="main">
					<p class="description">
						All of our offices are located within walking distance of transport services or we can arrange parking for you, if you prefer to visit us by car. Alternatively, we can come to you, just tell us where and when.
					</p>
					<div class="description">
						<p style="text-align: center;margin: 20px auto;">
							We do love our customers to visit us when you are able to as we have everything to hand. You will find our offices very relaxed and you can expect to be looked after, we are not in a rush.
						</p>
					</div>

					<!--<div class="offices">
						<a href="<?php echo home_url( '/offices/westminster/' ); ?>" class="westminster"><img class="load-me" data-src="<?php echo wp_get_attachment_image_src( 63626, 'full' )[0]; ?>" /></a>
						<a href="<?php echo home_url( '/offices/nine-elms/' ); ?>" class="nine"><img class="load-me" data-src="<?php echo wp_get_attachment_image_src( 63623, 'full' )[0]; ?>" /></a>
						<a href="<?php echo home_url( '/offices/south-bank/' ); ?>" class="south"><img class="load-me" data-src="<?php echo wp_get_attachment_image_src( 63625, 'full' )[0]; ?>" /></a>
						<a href="<?php echo home_url( '/offices/chelsea-bridge-wharf/' ); ?>" class="chelsea"><img class="load-me" data-src="<?php echo wp_get_attachment_image_src( 63622, 'full' )[0]; ?>" /></a>
					</div>-->

					<div class="links">
							<a href="<?php echo home_url( '/offices/westminster/#westminster' ); ?>" data-delay="600">Westminster & St James’s</a>
							<a href="<?php echo home_url( '/offices/nine-elms/#nine-elms' ); ?>" data-delay="750">Nine Elms & Vauxhall</a>
							<a href="<?php echo home_url( '/offices/nine-elms/#nine-elms' ); ?>" data-delay="900">South Bank</a>
							<a href="<?php echo home_url( '/offices/chelsea-bridge-wharf/#chelsea-bridge-wharf' ); ?>" data-delay="900">Chelsea Bridge Wharf</a>
							<a href="<?php echo home_url( '/offices/victoria-and-pimlico/#victoria-pimlico' ); ?>" data-delay="900">Victoria & Pimlico</a>
						</div>

					<div class="divider fade-me to-top animate-me"></div>

				</div>
			</article>
		</div>

		<div id="page-4">
			<article alt="2">
				<h1 style="margin-bottom: 2%;">Social Media</h1>
				<div class="main">
					<p class="description" style="line-height: 24px !important; margin-bottom: 30px;">
						Our social channels are something that we are very passionate about, which is why we have a strong presence across an array of platforms. These platforms include; Facebook, Twitter, LinkedIn, Instagram, and our very own development specific microsites.
					</p>
				</div>
				<div class="about-socials">
					<a target="_blank" href="https://www.facebook.com/pages/Garton-Jones-Real-Estate/558753517497591"><img class="load-me" data-src="<?php echo wp_get_attachment_image_src( 90942, 'full' )[0]; ?>" /></a>
					<a target="_blank" href="https://twitter.com/GartonJonesLDN"><img class="load-me" data-src="<?php echo wp_get_attachment_image_src( 90946, 'full' )[0]; ?>" /></a>
					<a target="_blank" href="https://www.linkedin.com/pub/kieran-chalker/35/416/b9"><img class="load-me" data-src="<?php echo wp_get_attachment_image_src( 90945, 'full' )[0]; ?>" /></a>
					<a target="_blank" href="https://instagram.com/"><img src="<?php echo wp_get_attachment_image_src( 90944, 'full' )[0]; ?>" /></a>
					<a target="_blank" href="http://gartonjonesnineelmslane.com"><img class="load-me" data-src="<?php echo wp_get_attachment_image_src( 90943, 'full' )[0]; ?>" /></a>
				</div>
			</article>
		</div>
	</div>
</div>
<?php


// tablet parallax
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
		<div id="page-1" data-id="about" style="background: url('<?php echo get_template_directory_uri(); ?>/img/parallax/about/01-about-us.png'); ?>">
			<div class="background-top"></div>
			<style>
				@media screen and ( orientation:portrait ) {
					#page-1 {
						background-image: url('<?php echo get_template_directory_uri(); ?>/img/parallax/about/portrait-01-b.png') !important;
					}

					#page-1 .background-top {
						background-image: url('<?php echo get_template_directory_uri(); ?>/img/parallax/about/portrait-01-t.png');
					}
				.about-portrait-section{
				margin-left: 40px;
				 
				}
				}
			</style>
			<!-- Content About -->
			<article class="show-me">
				<h1 class="fade-me animate-me to-bottom">About Us</h1>
				<div class="main fade-me animate-me to-top">
					<p class=" to-left">
						Garton Jones is an independent, family run, estate agents specialising in the sale, rental and management of residential property in Central London.
					</p>
					<p class=" to-right" style="margin-top:30px">
						We are known for specialising in the marketing of modern and new build, luxury apartments with a versatile portfolio of properties to offer from studio flats to detached houses.
					</p>
					<div class="divider fade-me animate-me to-top"></div>
					<div class="description fade-me animate-me to-scale">
						<p class="about-portrait-section" style="margin-top: 20px;">
							Through a network of associates, we have access to much of London's residential property portfolio. What you will see on our website today is just a small proportion of what we have to offer. 
						</p>
						<p class="about-portrait-section">
							Come and visit us in one of our stylish offices in the heart of Westminster, in Nine Elms or at Chelsea Bridge Wharf to discuss your requirements with a member of our highly experienced team, who are all knowledgable in both the local sales and rental markets otherwise we look forward to receiving your request from this site.
						</p>
					</div>

					<style>
						.about-logos img:first-child {
							width: 55px !important;
						}

						.about-logos img:nth-child(2) {
							width: 132px !important;
						}

						.yoshkidiv {
							overflow: hidden;
							width: 132px;
							height: 136px;
							margin-top: -40px;
							vertical-align: middle;
						}
					</style>
					<div class="about-logos">
						<img src="<?php echo get_template_directory_uri(); ?>/img/parallax/about/logo-1-1.png" style="width: 55px;" alt="">
						<img src="<?php echo get_template_directory_uri(); ?>/img/parallax/about/logo-2-1.png" style="width: 132px;" alt="">
						<script type="text/javascript" src="http://yoshki.com/yoshki-library.js"></script>
						<img src="http://yoshki.com/TSI/validation/130/0/logo.png" class="badgenopopup" />
					</div>

					<div class="about-disclaimer">
						Disclaimer Garton Jones endeavour to maintain accurate depictions of properties in Virtual 
						Tours, Floor Plans and descriptions, however, these are intended only as a guide and 
						purchasers must satisfy themselves by personal inspection.
						<br><br>
						Garton Jones © <?php echo date('Y'); ?> Privacy Policy
					</div>
				</div>
			</article>
		</div>

		<div id="page-2" data-id="team" style="background: url('<?php echo get_template_directory_uri(); ?>/img/parallax/about/02-meet-the-team.png'); ?>">
			<div class="background-top"></div>
			<style>
				@media screen and ( orientation:portrait ) {
					#page-2 {
						background-image: url('<?php echo get_template_directory_uri(); ?>/img/parallax/about/portrait-02-b.png') !important;
					}

					#page-2 .background-top {
						background-image: url('<?php echo get_template_directory_uri(); ?>/img/parallax/about/portrait-02-t.png');
					}
				}
			</style>
			<article class="show-me">
				<div class="fly-me animate-me" data-revert="away">
					<h1>Meet the Team</h1>
					<div class="main">
						<p>
							  All of our property consultants are local experts who specialise in both sales and rentals. They have in depth knowledge of the properties we have available and through experience, may also be aware of a suitable property that may not be visible on this website.
						</p>
						<h2>Please select an office</h2>
						<div class="links">
							<a href="<?php echo home_url( 'offices/westminster/team/' ); ?>" class="fade-me animate-me to-rotate" data-delay="600">Westminster & St James’s</a>
							<a href="<?php echo home_url( '/offices/nine-elms/team/' ); ?>" class="fade-me animate-me to-rotate" data-delay="750">Nine Elms & Vauxhall</a>
							<a href="<?php echo home_url( '/offices/nine-elms/team/' ); ?>" class="fade-me animate-me to-rotate" data-delay="750">South Bank</a>
							<a href="<?php echo home_url( '/offices/victoria-and-pimlico/team/' ); ?>" class="fade-me animate-me to-rotate" data-delay="750">Victoria & Pimlico</a>
						</div>
						<div class="description" style="margin: 30px auto !important;">
							<div class="about-portrait-section">
                            <p>
								In most cases, we can also advise you on the current market value, over the phone, if you are wanting to sell or rent your property or properties.  We are happy to discuss individual properties as well as portfolios. 
							</p>
							<p>
								We know our market very well and are skilled negotiators with many years of experience.
							</p>
							<p>
								Talk to us, we are here to listen and to help you with your requirements, whether you are looking to sell, buy or to rent a property in Central London.
							</p>
                            </div>
						</div>


						<img src="<?php echo get_template_directory_uri(); ?>/img/parallax/symbol.png" style="margin-top: 15px;" />
					</div>
				</div>
			</article>
		</div>

		<div id="page-3" data-id="offices" style="background: url('<?php echo get_template_directory_uri(); ?>/img/parallax/about/03.png'); ?>">
			<div class="background-top"></div>
			<style>
				@media screen and ( orientation:portrait ) {
					#page-3 {
						background-image: url('<?php echo get_template_directory_uri(); ?>/img/parallax/about/portrait-03-b.png') !important;
					}
            
					#page-3 .background-top {
						background-image: url('<?php echo get_template_directory_uri(); ?>/img/parallax/about/portrait-03-t.png');
					}
				}
			</style>

			<!-- Content Offices -->
			<article alt="2" class="show-me">
				<h1 class="fade-me to-bottom animate-me">Our Offices</h1>
				<div class="main">
					<p class="description fade-me animate-me">
						All of our offices are located within walking distance of transport services or we can arrange parking for you, if you prefer to visit us by car. Alternatively, we can come to you, just tell us where and when.
					</p>
					<div class="description fade-me animate-me">
						<p style="text-align: center;margin: 20px auto;">
							We do love our customers to visit us when you are able to as we have everything to hand. You will find our offices very relaxed and you can expect to be looked after, we are not in a rush. 
						</p>
					</div>

					<p>Please select an office</p>
							<div class="links">
								<a href="<?php echo home_url( '/offices/westminster/team/' ); ?>" class="fade-me animate-me to-rotate" data-delay="600">Westminster & St James’s</a>
								<a href="<?php echo home_url( '/offices/nine-elms/team/' ); ?>" class="fade-me animate-me to-rotate" data-delay="750">Nine Elms & Vauxhall</a>
								<a href="<?php echo home_url( '/offices/nine-elms/team/' ); ?>" class="fade-me animate-me to-rotate" data-delay="750">South Bank</a>
								<a href="<?php echo home_url( '/offices/victoria-and-pimlico/team/' ); ?>" class="fade-me animate-me to-rotate" data-delay="750">Victoria & Pimlico</a>
							</div>

					<div class="divider fade-me to-top animate-me"></div>

				</div>
			</article>
		</div>

		<div id="page-4" data-id="social" style="background: url('<?php echo get_template_directory_uri(); ?>/img/parallax/about/04.png'); ?>">
			<article alt="2" class="show-me">
				<h1 class="fade-me to-bottom animate-me" style="margin-bottom: 2%;">Social Media</h1>
				<div class="main">
					<p class="description fade-me animate-me" style="line-height: 24px !important; margin-bottom: 30px;">
						Our social channels are something that we are very passionate about, which is why we have a strong presence across an array of platforms. These platforms include; Facebook, Twitter, LinkedIn, Instagram, and our very own development specific microsites.
                        
					</p>
				</div>
				<div class="about-socials">
					<a target="_blank" href="https://www.facebook.com/pages/Garton-Jones-Real-Estate/558753517497591" class="fade-me animate-me to-screen"><img class="load-me" data-src="<?php echo wp_get_attachment_image_src( 90942, 'full' )[0]; ?>" /></a>
					<a target="_blank" href="https://twitter.com/GartonJonesLDN" class=" fade-me animate-me to-screen delay-005"><img class="load-me" data-src="<?php echo wp_get_attachment_image_src( 90946, 'full' )[0]; ?>" /></a>
					<a target="_blank" href="https://www.linkedin.com/pub/kieran-chalker/35/416/b9" class=" fade-me animate-me to-screen delay-01"><img class="load-me" data-src="<?php echo wp_get_attachment_image_src( 90945, 'full' )[0]; ?>" /></a>
					<a target="_blank" href="https://instagram.com/" class=" fade-me animate-me to-screen delay-015"><img class="load-me" data-src="<?php echo wp_get_attachment_image_src( 90944, 'full' )[0]; ?>" /></a>
					<a target="_blank" href="http://gartonjonesnineelmslane.com" class=" fade-me animate-me to-screen delay-02"><img src="<?php echo wp_get_attachment_image_src( 90943, 'full' )[0]; ?>" /></a>
				</div>
			</article>
		</div>
	</div>

	<div id="controls">
		<button class="control-left"><img src="<?php echo get_template_directory_uri(); ?>/img/arrow-left-white-small.png" alt="Left"></button>
		<button class="control-right"><img src="<?php echo get_template_directory_uri(); ?>/img/arrow-right-white-small.png" alt="Right"></button>
	</div>

	<div class="parallax-menu">
		<ul class="submenu leftmenu">
			<li>
				<a href="#about" data-title="About Us"><span>About Us</span></a>
			</li>
			<li>
				<a href="#team" data-title="Meet the Team"><span>Meet the Team</span></a>
			</li>
			<li>
				<a href="#offices" data-title="Our Offices"><span>Our Offices</span></a>
			</li>
			<li>
				<a href="#social" data-title="Social Media"><span>Social Media</span></a>
			</li>
			<li>
				<a href="<?php echo home_url('/developments-intro/#developments'); ?>" data-title="Specialist Developments"><span>Specialist Developments</span></a>
			</li>
			<li>
				<a href="<?php echo home_url('/developments-intro/#video'); ?>" data-title="Development Videos"><span>Development Videos</span></a>
			</li>
		</ul>
	</div>
</div>


<?php
endif;

wp_enqueue_style( 'parallax-css' );
wp_enqueue_script( 'parallax-config' );

get_footer();
