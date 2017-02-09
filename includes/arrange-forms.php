<?php
	wp_enqueue_style( 'offices', get_template_directory_uri() . '/css/offices-parallax.css' );
	wp_enqueue_script( 'offices', get_template_directory_uri() . '/js/src/offices.js');
?>
<style type="text/css">
	#big-menu #worth .the-strips > ul > li .mr select {
		width: 300px !important;
	}
.the-strips>ul>li .bedrooms {
    width: 144px !important;
}
.gform-popup .gform_wrapper_original_id_17 .gform_body .budget select, .gform-popup .gform_wrapper_original_id_17 .gform_body .beds select {
    width: 140px !important;
    height: 28px;
    background: white;
    border: 0;
    color: #ab9756;
    margin: 0;
    font-size: 14px;
    padding-left: 10px;
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
			</div>
			<div class="the-strips">
			  <ul>
				<li class="strip-valuation property-worth">
					<h3>Arrange a Valuation</h3>

					<div class="center-me" style="text-align: center">

						<div class="gform-popup">
						<?php
							$url = 'http://' . $_SERVER['SERVER_NAME'] . $_SERVER['REQUEST_URI'];


							if (strpos($url,'westminster') !== false) {
								echo do_shortcode( '[gravityform id="25" title="false" ajax="true" description="false"]' ); 
							}

							if (strpos($url,'nine-elms') !== false) {
								echo do_shortcode( '[gravityform id="30" title="false" ajax="true" description="false"]' );
							}

							if (strpos($url,'chelsea-bridge-wharf') !== false) {
								echo do_shortcode( '[gravityform id="31" title="false" ajax="true" description="false"]' );
							}

							if (strpos($url,'south-bank') !== false) {
								echo do_shortcode( '[gravityform id="32" title="false" ajax="true" description="false"]' );
							}

							if (strpos($url,'victoria-and-pimlico') !== false) {
								echo do_shortcode( '[gravityform id="45" title="false" ajax="true" description="false"]' );
							}

							?>
							
							<span class="disclaimer">We do not share the information you provide with any third parties.</span>
						</div>

					</div>
				</li>
				<li class="strip-enquire property-worth">
					<h3>Enquire Online</h3>
					
					<div class="center-me" style="text-align: center">

						<div class="gform-popup">
							
							<?php
							$url = 'http://' . $_SERVER['SERVER_NAME'] . $_SERVER['REQUEST_URI'];

							if (strpos($url,'westminster') !== false) {
								echo do_shortcode( '[gravityform id="17" title="false" ajax="true" description="false" field_values="office2=Westminster and St James’s"]' );
							}

							if (strpos($url,'nine-elms') !== false) {
								echo do_shortcode( '[gravityform id="17" title="false" ajax="true" description="false" field_values="office2=Nine Elms and Vauxhall"]' );
							}

							if (strpos($url,'chelsea-bridge-wharf') !== false) {
								echo do_shortcode( '[gravityform id="17" title="false" ajax="true" description="false" field_values="office2=Chelsea Bridge Wharf"]' );
							}

							if (strpos($url,'south-bank') !== false) {
								echo do_shortcode( '[gravityform id="17" title="false" ajax="true" description="false" field_values="office2=South Bank"]' );
							}

							if (strpos($url,'victoria-and-pimlico') !== false) {
								echo do_shortcode( '[gravityform id="17" title="false" ajax="true" description="false" field_values="office2=Victoria and Pimlico"]' );
							}

							?>
						</div>
					</div>
				</li>
			</ul>
		</div>
	</div>
</div>