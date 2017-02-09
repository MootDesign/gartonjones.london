<style type="text/css">
	#big-menu #worth .the-strips ul li .bedrooms {
    width: 145px !important;
}
</style>
<div id="big-menu" class="close-me">
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

		<div id="worth" class="content no-search no-title">
			<div id="bg">
				<img class="calculator load-me" data-src="<?php echo wp_get_attachment_image_src( 63793, 'full' )[0]; ?>" />
				<img class="nine-elms load-me" data-src="<?php echo get_template_directory_uri() ?>/img/properties/nine-elms-point.jpg" />
			</div>
			<div class="the-strips">
			  <ul>
				<li data-image="nine-elms" class="strip-cgt property-worth">
					<h3>CGT Valuation</h3>

					<p class="big">
						As of April 2015, a capital gains tax (CGT) will apply to any profit made on the value of your property if you are a foreign investor and you sell after this time. 

						<a class="toggle-content-link" style="color: #ac9857; font-size: 22px; line-height: 40px">Read&nbsp;more</a>
					</p>
					<div class="toggle-content" style="display: none;">
					<p class="fade-me animate-me to-top show">
						Garton Jones can provide valuations to support this requirement that will be acceptable to the UK HMRC, if supported with comparable sales evidence. As such, if you require a valuation that can be used, either now, or at a later date, don't hesitate to ask one of our team for further information and details of the small charge we make for this service 		
					</p>
					
					<div class="center-me" style="text-align: center">
						<?php
							if (get_field('how_much_text')) {
								echo '<div class="how-much-text">' . get_field('how_much_text') . '</div>';
							}
						?>

						<!-- <a href="#" class="book-valuation confirm" data-popup="1" data-id="#worth-popup">Book a CGT Valuation</a> -->
					</div>
					</div>
					<div class="gform-popup center-me" align="center">
							<?php echo do_shortcode( '[gravityform id="27" title="false" ajax="false" description="false"]' ); ?>
							<span class="disclaimer">We do not share the information you provide with any third parties.</span>
						</div>
				</li>
				<li data-image="nine-elms" class="strip-sales property-worth">
					<h3>Sales / Rental Valuation</h3>

					<p class="big">
						Whether you are looking to sell or rent your property in central London, conducting an independent property valuation is an essential step in the process.
						<a class="toggle-content-link" style="color: #ac9857; font-size: 22px; line-height: 40px !important;">Read&nbsp;more</a>
					</p>
					<div class="toggle-content" style="display: none;">
					<p class="fade-me animate-me to-top show">
						Our experienced agents can estimate the value of your property based on the current market, similar properties we have recently sold or let and the current demand from potential buyers or tenants.
					</p>
					<p class="fade-me animate-me to-top show">
						This estimation can give you a good indication of what to expect if you decide to put your property on the market – be it to sell or rent.
					</p>
					<p class="fade-me animate-me to-top show" style="margin-bottom: 30px;">
						So to request a free property valuation by one of our expert valuers, please fill in the form and we will be in touch shortly to book a date and time convenient for you when we can come and assess your property.
					</p>	
					<div class="center-me" style="text-align: center">
						<?php
							if (get_field('how_much_text')) {
								echo '<div class="how-much-text">' . get_field('how_much_text') . '</div>';
							}
						?>
					</div>
					</div>
					<!--<a class="hide-upper-section" align="center" style="color: #ac9857; font-size: 22px;">Show&nbsp;less</a>-->
					<div class="gform-popup center-me" align="center">
							<?php echo do_shortcode( '[gravityform id="25" title="false" ajax="false" description="false"]' ); ?>
							<span class="disclaimer">We do not share the information you provide with any third parties.</span>
						</div>

				</li>
				<li data-image="nine-elms" class="strip-investments property-worth">
					<h3>Sales / Rental Valuation</h3>

					<div class="text-box">
						<h4>Title</h4>
						<p>Your off-plan investment property options</p>
					</div>
				</li>
			</ul>
		</div>
	</div>
</div>
