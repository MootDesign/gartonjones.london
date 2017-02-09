<?php
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
						<p>
							Through a network of associates, we have access to much of London's residential property portfolio. What you will see on our website today is just a small proportion of what we have to offer. 
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
						<h2>Please select an</h2>
						<div class="links">
							<a href="<?php echo home_url( 'offices/westminster/team/' ); ?>" class="fade-me animate-me to-rotate" data-delay="600">Westminster</a>
							<a href="<?php echo home_url( '/offices/nine-elms/team/' ); ?>" class="fade-me animate-me to-rotate" data-delay="750">Nine Elms</a>
							<a href="<?php echo home_url( '/offices/nine-elms/team/' ); ?>" class="fade-me animate-me to-rotate" data-delay="750">South Bank</a>
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

					<div class="offices">
						<a href="<?php echo home_url( '/offices/westminster/' ); ?>" class="westminster fade-me animate-me to-screen delay-005"><img class="load-me" data-src="<?php echo wp_get_attachment_image_src( 63626, 'full' )[0]; ?>" /></a>
						<a href="<?php echo home_url( '/offices/nine-elms/' ); ?>" class="nine fade-me animate-me to-screen delay-01"><img class="load-me" data-src="<?php echo wp_get_attachment_image_src( 63623, 'full' )[0]; ?>" /></a>
						<a href="<?php echo home_url( '/offices/south-bank/' ); ?>" class="south fade-me animate-me to-screen delay-015"><img class="load-me" data-src="<?php echo wp_get_attachment_image_src( 63625, 'full' )[0]; ?>" /></a>
						<a href="<?php echo home_url( '/offices/chelsea-bridge-wharf/' ); ?>" class="chelsea fade-me animate-me to-screen delay-02"><img class="load-me" data-src="<?php echo wp_get_attachment_image_src( 63622, 'full' )[0]; ?>" /></a>
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