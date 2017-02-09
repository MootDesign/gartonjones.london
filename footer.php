<style type="text/css">
@media screen and (min-width: 768px) {
.office {
    width: 18%!important;
}
	@media screen and (min-width: 1280px) {
.office {
    width: 18%!important;
    margin-left: 5px;
    min-width: 160px !important;
    text-align: center;
}
</style>
<?php
			if( is_page( 'properties-for' ) || is_page( 'offices' ) || is_page_template( 'templates/quicklinks-new.php' ) || is_single( 'developments' ) || is_page_template( 'templates/refined-search.php' ) ) {
				?>

				<style type="text/css">
					@media screen and (min-width: 1280px) {
						.office {
    						width: 33%!important;
    						margin-left: 5px;
    						min-width: 160px !important;
    						text-align: center;
						}
					}
				</style>
				<?php
			}
		?>

<?php
			if( is_single()) {
				?>

				<style type="text/css">
					@media screen and (min-width: 1280px) {
						.office {
    						width: 33%!important;
    						margin-left: 5px;
    						min-width: 160px !important;
    						text-align: center;
						}
					}
				</style>

				<?php
			}
?>
<?php
	// add custom javascript from pages
	if ( get_field('js') ) {
		$script = get_field('js');
?>
		<script type="text/javascript">
			(function($){
				$(document).ready(function() {
					<?php echo html_entity_decode( $script, ENT_QUOTES ); ?>
				});
			})(jQuery);
		</script>
<?php
	}

	global $getOnlyOffice;

	$show_only_current_office = ( ( is_home() && isset( $_GET['property'] ) && ! empty( $_GET[ 'property' ] ) ) || is_singular( 'post' ) || is_singular( 'developments' ) || ! empty( $_GET['office'] ) || ! empty( $getOnlyOffice ) );
?>

<?php if( ! is_front_page() ) { ?>
	<div id="back-button">

		<svg
		   width="38"
		   height="38"
		   viewBox="0 0 38.000001 38.000001"
		>
		  <g
		     transform="translate(0,-1014.3622)">
		    <g
		       id="g6736"
		       transform="matrix(1.0146239,0,0,1.0146321,-772.40667,843.97789)">
		      <path
		         id="path3300"
		         style="fill:#231f20;fill-opacity:1;fill-rule:nonzero;stroke:none"
		         d="m 783.71181,192.86439 -7.47477,-7.47477 7.47477,-7.48501 -1.76298,-1.76639 -9.24799,9.23776 9.24799,9.2514 1.76298,-1.76299" />
		      <path
		         id="path3322"
		         style="fill:#231f20;fill-opacity:1;fill-rule:nonzero;stroke:none"
		         d="m 797.47467,186.65474 -1.25148,0 c 0,4.47395 -1.81072,8.52506 -4.75016,11.47132 -2.93603,2.93944 -6.98373,4.75017 -11.47133,4.75017 -4.48759,0 -8.52506,-1.81073 -11.47814,-4.75017 -2.93603,-2.94626 -4.75016,-6.99737 -4.75016,-11.47132 0,-4.48759 1.81413,-8.5387 4.75016,-11.47815 2.95308,-2.93603 6.99055,-4.75016 11.47814,-4.76039 4.4876,0.0102 8.5353,1.82436 11.47133,4.76039 2.93944,2.93945 4.75016,6.99056 4.75016,11.47815 l 2.50296,0 c 0,-10.35284 -8.37502,-18.72786 -18.72445,-18.73809 -10.33919,0.0102 -18.72785,8.38525 -18.72785,18.73809 0,10.33578 8.38866,18.72445 18.72785,18.72445 10.34943,0 18.72445,-8.38867 18.72445,-18.72445 l -1.25148,0" />
		    </g>
		  </g>
		</svg>

		<span>Back</span>
	</div>

	<div id="back-history">
	<div class="items">
			<div class="shade"></div>
			<div class="tube tube-first"></div>
			<div class="item show-menu">
				<span class="content">
					<a href="#">
						<span>Menu</span>
					</a>
				<span>
			</div>
	</div ><?php
			$items = $GLOBALS['_history_'];
			$count = count( $items );
			$i = 0;
			foreach( $items as $item ) :
				$title = get_the_title( $item );
                $link = get_permalink( $item );
                if (!$title && term_exists($item, 'news_categories')) {
                    $title = get_term_by( 'id', $item, 'news_categories' )->name;
                    $link = get_term_link($item, 'news_categories');
                }
                if (term_exists($item, 'post_tag')) {
                    $title = get_tag($item)->name;
                    $link = get_term_link($item, 'post_tag');
                }
				$latest = ++$i == $count; 
	?><div class="items">
		<div class="shade"></div>
		<div class="tube <?php echo $latest ? 'tube-last' : '' ?>"></div>
		<div class="item">
			<span class="content">
				<a href="<?php echo $link; ?>" class="<?php echo $latest ? 'active' : '' ?>">
					<span  class="<?php echo ( $item == 1825 || is_singular( 'developments' ) ) ? 'full' : '' ?>"><?php echo  trim_text(ucwords( $title ), 2); ?></span>
				</a>
			<span>
		</div>
	</div ><?php endforeach; ?><div class="items close">
		<div class="shade"></div>
		<div class="item">
			<span class="content">
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
		</span>
		</div>
	</div ><div class="items blank">
		<div class="item">
			<div class="shade"></div>
		</div>
	</div>
	</div>
<?php } ?>

<div id="foot" class="site-footer show-for-small-up">
	<div id="bottom-bar">
		<div class="sound-control on">
			<div class="sound-visualizer"><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div>
			<span class="text">Sound</span>
			<span class="state">on</span>
		</div>

		<a href="#" class="back-to-top">Back to top</a>
		
		<div class="office-plus text-center"><div class="c-panel-link"><a href="#" class="css-plus" style="text-align:center;">&nbsp;</a></div></div>
	</div>

    <?php
    $pid = get_the_ID();

    if (! is_single()) {
        if (! is_archive()) {

         $show = strtolower( get_field( 'show_logo_on' ) );
        ?>
        <div class="show-for-medium-up gradient gradient-<?php
			 	// if background is set, use darker gradient, else the light
			 	echo (isset( $GLOBALS[ 'bg-image' ] ) && $GLOBALS[ 'bg-image' ] == true ) ? 'dark' : 'light';
			 ?>">
           <?php if( $show == "bottom" ) : ?>
            <div class="row text-center show-for-medium-up bottomlogo2 hide-for-touch">
               <a href="/"><img src="<?php echo get_template_directory_uri() ?>/img/bottom-logo-big.png" alt="Garton Jones" /></a>
            </div>
          <?php endif; ?>
        </div>

          <?php
        }
    }

      if ( get_field('footer_text') ) {
        ?>
          <div class="custom-footer-text">
            <?php the_field( 'footer_text' ); ?>
          </div>
        <?php
      }

      ?>
     <div id="footer" class="row fullWidth">
  		<div id="footer-inner">
		<div id="offices-btn" class="columns small-12 medium-3 hide-for-medium-up"><span id="offices-btn-text">Contact Us</span><span id="arrow">&#9660;</span></div>
		<?php
			$offices = array(
				'Chelsea Bridge Wharf',
				'Westminster',
				'Nine Elms',
				'Victoria and Pimlico',
				'Southbank'
			);

			if( $show_only_current_office || is_page( 'properties-for' ) || is_page_template( 'templates/quicklinks-new.php' ) )  {
				if( is_home() && isset( $_GET[ 'property' ] ) ) {
					$cat = get_term_by( 'name', $_GET[ 'property' ], 'category' );
					
					if ($cat) {
						$parent = get_the_category_by_ID( $cat->parent );
					
						$GLOBALS[ '_where_' ] = $parent;
					} else {
						$show_only_current_office = false;
					}

				} elseif ( is_single() ) {
					$id = get_queried_object_id();
					$categories = get_the_category( $id );
					$parent = is_array( $categories ) ? $categories[0] : $categories;
					if( $parent->parent != 0 ) {
						$parent = get_the_category_by_ID( $parent->parent );
					}

					$GLOBALS[ '_where_' ] = is_object( $parent ) ? $parent->name : $parent;
				}

		        if( isset( $GLOBALS['_postcode_' ] ) ) {
					$postcode = $GLOBALS[ '_postcode_' ];

					$options = array(
						'Chelsea Bridge Wharf' => 'chelseabridgewharf',
						'Westminster' => 'westminster',
						'Nine Elms' => 'nineelms',
						'Victoria and Pimlico' => 'victoriaandpimlico',
						'Southbank' => 'southbank'
					);

					$parent = "";
	  				foreach( $options as $key => $office ) {
						$option = get_option( 'gj_' . $office . '_postcodes', '' );

						if( stripos( $option, $postcode ) !== false ) {
							$parent = strtolower( $key );
							break;
						}
					}
				} else {
					$parent = strtolower( $GLOBALS[ '_where_' ] );
				}

				if ( get_field( 'query_office' ) ) {
					$options = array(
						'Chelsea Bridge Wharf' => 'chelsea bridge wharf',
						'Westminster' => 'westminster',
						'Nine Elms' => 'nine elms',
						'Victoria and Pimlico'=> 'victoria and pimlico',
						'Southbank' => 'southbank'
					);

					$parent = $options[ get_field( 'query_office' )];
				}

				if( $_GET['office'] ) {
					$parent = $_GET['office'];
					$GLOBALS[ '_where_' ] = $parent;
				}

				if ( !empty( $getOnlyOffice ) ) {
					$parent = $getOnlyOffice;
					$GLOBALS[ '_where_' ] = $parent;
				}
			}
		?>

		<?php 
			$only_office = '';
		?>
		<?php
			$url = 'http://' . $_SERVER['SERVER_NAME'] . $_SERVER['REQUEST_URI'];


			if (strpos($url,'team') !== false) {

					if (strpos($url,'westminster') !== false) {
						?>
							<div class="columns medium-3 large-3">&nbsp;</div>
							<div class="columns medium-3 large-3">&nbsp;</div>
						<?php
					}
					if (strpos($url,'victoria-and-pimlico') !== false) {
						?>
							<div class="columns medium-2 large-2">&nbsp;</div>
							<div class="columns medium-3 large-3">&nbsp;</div>
						<?php
					}
					if (strpos($url,'nine-elms') !== false) {
						?>
							<div class="columns medium-3 large-3">&nbsp;</div>
							<div class="columns medium-3 large-3">&nbsp;</div>
						<?php
					}
			}
			else {


			if( $show_only_current_office || is_page( 'properties-for' ) || is_page_template( 'templates/quicklinks-new.php' ) && (strpos($url,'team') !== true) ) : 
				$only_office = ' only-office';
		?>
				<div class="columns medium-2 large-2">&nbsp;</div>
				<div class="columns medium-2 large-2">&nbsp;</div>

		<?php 
		endif; 

		}

		?>

<div class="footer-wrapper">
		<?php
			

			foreach( $offices as $index => $office ) :
				if( ( $show_only_current_office || is_page( 'properties-for' ) || is_page_template( 'templates/quicklinks-new.php' ) ) && strtolower( $parent ) != strtolower( $office ) ) 
					continue;
				if ($office == "Westminster") {

					$office_name = "Westminster and St James’s";
				}
				else if ($office == "Nine Elms") {

					$office_name = "Nine Elms and Vauxhall";
				}
				else {
					$office_name = $office;
				}
				$office = strtolower( str_replace( ' ', '', $office ) );
				$office_link = strtolower( str_replace( ' ', '-', $office_name ) );
				$menu_html = '<div class="office small-12 medium-2 large-2 columns text-center' . $only_office . '"><a class="clickarea">' .  $office_name . '<br /><span class="InfinityNumber clickable">' . get_option( 'gj_' . $office . '_tel', '') .'</span><span class="back-footer-office">Back</span></a>';

				if ($office == "victoriaandpimlico") { $menu_html = '<div class="office small-12 medium-2 large-2 columns text-center' . $only_office . '"><a class="clickarea">' .  $office_name . '<br /><span class="InfinityNumber clickable">020 7730 5007</span><span class="back-footer-office">Back</span></a>'; }

					echo $menu_html;


				if ($office == "Westminster & St James’s") {

					$office_name = "Westminste";
				}
				else if ($office == "Nine Elms & Vauxhall") {

					$office_name = "Nine Elms";
				}
				else {
					$office_name = $office;
				}
				
				?><div class="offinfo off1 hidden">
					<span class="mailskype" style="display: inline-block; margin-top: 4px;">
						<?php 
						if ($office == "victoriaandpimlico") { ?>

							<a href="mailto:gws@gartonjones.com"><img src="<?php echo get_template_directory_uri(); ?>/img/mail-footer-double.png" style="width: 20px; margin-right: 3px;" alt="mail"></a>
						<?php
						}

						else {?>

						<a href="mailto:<?php echo get_option( 'gj_' . $office . '_mail', '') ?>"><img src="<?php echo get_template_directory_uri(); ?>/img/mail-footer-double.png" style="width: 20px; margin-right: 3px;" alt="mail"></a>

						<?php
						}
						?>


						<a href="skype:<?php echo get_option( 'gj_' . $office . '_skype', '') ?>?call"><img src="<?php echo get_template_directory_uri(); ?>/img/skype-footer-double.png" style="width: 20px; margin-left: 3px;" alt="skype"></a>
					</span>
					<hr class="sidesep">
					<ul>
						<?php if ($office_link == 'southbank') { ?>
							<li><a class="bring-contact-form" href="/contact-us/#south-bank">+ Contact the Office</a></li>
							<li><a href="/contact-us/south-bank/?show=map">+ View on Map</a></li>
						<?php } else { ?>
							<?php
							if ($office == "victoriaandpimlico") { ?>
							<li><a class="bring-contact-form" href="/contact-us/#victoria-and-pimlico">+ Contact the Office</a></li>
							<li><a href="/contact-us/victoria-and-pimlico/?show=map">+ View on Map</a></li>
							<?php
							}
							else if ($office == "westminster") { ?>
							<li><a class="bring-contact-form" href="/contact-us/#westminster">+ Contact the Office</a></li>
							<li><a href="/contact-us/westminster/?show=map">+ View on Map</a></li>
							<?php
							}
							else if ($office == "nineelms") { ?>
							<li><a class="bring-contact-form" href="/contact-us/#nine-elms">+ Contact the Office</a></li>
							<li><a href="/contact-us/nine-elms/?show=map">+ View on Map</a></li>
							<?php
							}
							else {
							?>
							<li><a class="bring-contact-form" href="/contact-us/#<?php echo urldecode( $office_link) ?>">+ Contact the Office</a></li>
							<li><a href="/contact-us/<?php echo urldecode( $office_link) ?>/?show=map">+ View on Map</a></li>
							<?php } ?>						
						<?php } ?>
						<?php if ($office_link == 'southbank') { ?>
							<li><a href="/offices/south-bank/">+ Learn more</a></li>
						<?php } else { ?>
							
							<?php
							if ($office == "victoriaandpimlico") { ?>
							<li><a href="/offices/victoria-and-pimlico/">+ Learn more</a></li>
							<?php
							}
							else if ($office == "westminster") { ?>
							<li><a href="/offices/westminster/">+ Learn more</a></li>
							<?php
							}
							else if ($office == "nineelms") { ?>
							<li><a href="/offices/nine-elms/">+ Learn more</a></li>
							<?php
							}
							else {
							?>
							<li><a href="/offices/<?php echo urldecode( $office_link) ?>">+ Learn more</a></li>
							<?php } ?>									
						<?php } ?>
						<?php 
							if ($office_link != 'chelsea-bridge-wharf' && $office_link != 'southbank') 
							{ 
						?>
							<?php 

							if ($office == "victoriaandpimlico") { ?>

							<li><a href="/offices/victoria-and-pimlico/team/">+ Meet the Team</a></li>

							<?php
							}
							else if ($office == "westminster") { ?>

							<li><a href="/offices/westminster/team/">+ Meet the Team</a></li>

							<?php
							}
							else if ($office == "nineelms") { ?>

							<li><a href="/offices/nine-elms/team/">+ Meet the Team</a></li>

							<?php
							}

							else {

							?>
							<li><a href="/offices/<?php echo urldecode( $office_link) ?>/team/">+ Meet the Team</a></li>
							<?php } ?>
						<?php } ?>
					</ul>
				</div>
			</div>
		<?php endforeach; ?>


		<?php if( $show_only_current_office || is_page( 'properties-for' ) || is_page_template( 'templates/quicklinks-new.php' ) ) : ?>
				<div class="columns medium-2 large-2">&nbsp;</div>
				<div class="columns medium-2 large-2">&nbsp;</div>
		<?php endif; ?>

<?php if( is_single() || is_page_template( 'templates/quicklinks-new.php' ) || ! is_page_template( 'templates/quicklinkss.php' ) ): ?>
	  <div class="c-panel">
		<?php

		if (strpos($url,'team') !== false) {

					if (strpos($url,'westminster') !== false) {
						?>
							<div class="columns medium-3 large-3">&nbsp;</div>
							<div class="columns medium-3 large-3">&nbsp;</div>
						<?php
					}
					if (strpos($url,'victoria-and-pimlico') !== false) {
						?>
							<div class="columns medium-2 large-2">&nbsp;</div>
							<div class="columns medium-3 large-3">&nbsp;</div>
						<?php
					}
					if (strpos($url,'nine-elms') !== false) {
						?>
							<div class="columns medium-3 large-3">&nbsp;</div>
							<div class="columns medium-3 large-3">&nbsp;</div>
						<?php
					}
			}
			else {

			 if( $show_only_current_office || is_page( 'properties-for' ) || is_page_template( 'templates/quicklinks-new.php' ) ) : ?>
					<div class="columns medium-3 large-3">&nbsp;</div>
					<div class="columns medium-3 large-3">&nbsp;</div>
			<?php 

			endif; 
			}
			?>


			<?php
				foreach( $offices as $office ) :
					if( ( $show_only_current_office || is_page( 'properties-for' ) || is_page_template( 'templates/quicklinks-new.php' ) ) && $parent != strtolower( $office ) ) continue;

					$officeUrl = sanitize_url_parameter( $office );

					if( $officeUrl == 'nine-elms' ) {
						$officeUrl = 'nineelmslane';
					}

					if( $officeUrl == 'victoriaandpimlico' ) {
						$officeUrl = 'victoria-and-pimlico';
					}
			?>
		  <div class="office small-12 medium-1 large-1 columns text-center <?php echo $only_office ?>">
		    <hr class="sidesep">
			  <div class="c-panel-box">
			  	<?php if ( ! is_single() || is_singular( 'developments' ) ) { ?>
			      <ul>
			          <li>
			              <a href="<?php echo home_url( 'property-sales/properties-for-sale-' . $officeUrl  ) ?>">
                       Properties for Sale in <?php echo $office ?>
		                  </a>
		              </li>
			      </ul>
			    <?php } ?>
			    <?php if ( ! is_single() || is_singular( 'developments' ) ) { ?>
			      <ul>
			          <li>
			              <a href="<?php echo home_url( 'property-lettings/properties-for-rent-' . $officeUrl ) ?>">
                       Properties for Rent in <?php echo $office ?>
                          </a>
                      </li>
			      </ul>
			    <?php } ?>
			  </div>
		  </div>
			<?php
				endforeach;
			?>

			<?php if( $show_only_current_office || is_page( 'properties-for' ) || is_page_template( 'templates/quicklinks-new.php' ) ) : ?>
					<div class="columns medium-3 large-3">&nbsp;</div>
					<div class="columns medium-3 large-3">&nbsp;</div>
			<?php endif; ?>

			<div class="columns medium-1 large-1">&nbsp;</div>

	  </div>
		<?php if( ! is_singular( 'developments' ) && ! is_page_template('vtour.php') && ($show_only_current_office || is_page( 'properties-for' ) || is_page_template( 'templates/quicklinks-new.php') ) ) : ?>
			
			<div id="more-results" style="clear: both; display: none;">
				<?php
					// get the categories
					$categories = get_the_category();
					$offices = array( 
						'Westminster',
						'Nine Elms',
						'Southbank',
						'Victoria and Pimlico',
						'Chelsea Bridge Wharf'
					);

					for ($i=0; $i < count( $categories ); $i++) { 
						$officeName = $categories[$i]->name;
						if ( in_array( $officeName , $offices ) ) {
							break;
						}
					}

					if ( empty( $officeName ) ) {
						$officeName = get_field( 'query_office' );
					}

					// generate the slug for the link
					switch ($officeName) {
						case 'Westminster':
							$officeSlug = 'westminster';
							break;
						
						case 'Nine Elms':
							$officeSlug = 'nineelmslane';
							break;

						case 'Southbank':
							$officeSlug = 'southbank';
							break;

						case 'Chelsea Bridge Wharf':
							$officeSlug = 'chelsea-bridge-wharf';
							break;

						case 'Victoria and Pimlico':
							$officeSlug = 'victoria-and-pimlico';
							break;
					}

					$status = get_field( 'status' );
					if ( empty( $status ) ) {
						$status = get_field( 'query_sales_lettings' );
					}

					// sales or lettings?
					if ( $status == 'sale' ) {
						$statusUrl = 'sales';
						$status = 'sale';
					} else if ( $status == 'let' ) {
						$statusUrl = 'lettigns';
						$status = 'rent';
					}

/*
Houses for sale in Westminster
Flats for sale in Westminster
Westminster apartments for sale
1 bedroom houses for sale in Westminster
2 bedroom houses for sale in Westminster
3 bedroom houses for sale in Westminster
4 bedroom houses for sale in Westminster
5 bedroom houses for sale in Westminster
Studio flats for sale in Westminster
1 bedroom flats for sale in Westminster
2 bedroom flats for sale in Westminster
3 bedroom flats for sale in Westminster
*/

/*
/property-sales/houses-for-sale-westminster/
/property-sales/flats-for-sale-westminster/
/property-sales/apartments-for-sale-westminster/
/property-sales/1-bedroom-houses-for-sale-westminster/
/property-sales/2-bedroom-houses-for-sale-westminster/
/property-sales/3-bedroom-houses-for-sale-westminster/
/property-sales/4-bedroom-houses-for-sale-westminster/
/property-sales/5-bedroom-houses-for-sale-westminster/
/property-sales/studio-flats-for-sale-westminster/
/property-sales/1-bedroom-flats-for-sale-westminster/
/property-sales/2-bedroom-flats-for-sale-westminster/
/property-sales/3-bedroom-flats-for-sale-westminster/
 */

$quicklinks = array(
	'/property-' . $statusUrl . '/homes-for-' . $status . '-' . $officeSlug . '/' 				=> 'Homes for ' . $status . ' in ' . $officeName,
	'/property-' . $statusUrl . '/flats-for-' . $status . '-' . $officeSlug . '/' 				=> 'Flats for ' . $status . ' in ' . $officeName,
	'/property-' . $statusUrl . '/apartments-for-' . $status . '-' . $officeSlug . '/' 			=> $officeName . ' apartments for ' . $status . '',
	'/property-' . $statusUrl . '/1-bedroom-homes-for-' . $status . '-' . $officeSlug . '/' 	=> '1 bedroom homes for ' . $status . ' in ' . $officeName,
	'/property-' . $statusUrl . '/2-bedroom-homes-for-' . $status . '-' . $officeSlug . '/' 	=> '2 bedroom homes for ' . $status . ' in ' . $officeName,
	'/property-' . $statusUrl . '/3-bedroom-homes-for-' . $status . '-' . $officeSlug . '/'	=> '3 bedroom homes for ' . $status . ' in ' . $officeName,
	'/property-' . $statusUrl . '/4-bedroom-homes-for-' . $status . '-' . $officeSlug . '/'	=> '4 bedroom homes for ' . $status . ' in ' . $officeName,
	'/property-' . $statusUrl . '/5-bedroom-homes-for-' . $status . '-' . $officeSlug . '/'	=> '5 bedroom homes for ' . $status . ' in ' . $officeName,
	'/property-' . $statusUrl . '/studio-flats-for-' . $status . '-' . $officeSlug . '/' 		=> 'Studio flats for ' . $status . ' in ' . $officeName,
	'/property-' . $statusUrl . '/1-bedroom-flats-for-' . $status . '-' . $officeSlug . '/' 	=> '1 bedroom flats for ' . $status . ' in ' . $officeName,
	'/property-' . $statusUrl . '/2-bedroom-flats-for-' . $status . '-' . $officeSlug . '/' 	=> '2 bedroom flats for ' . $status . ' in ' . $officeName,
	'/property-' . $statusUrl . '/3-bedroom-flats-for-' . $status . '-' . $officeSlug . '/' 	=> '3 bedroom flats for ' . $status . ' in ' . $officeName,
	'/property-' . $statusUrl . '/luxury-apartments-for-' . $status . '-' . $officeSlug . '/'	=> 'luxury apartments for ' . $status . ' in ' . $officeName,
);
?>
<ul style="max-width: 400px; margin: 0 auto; text-align: center;">
	<?php
		foreach ($quicklinks as $url => $title) {
			/*if ($officeSlug == 'chelsea-bridge-wharf')
				break;*/
			?>

				<li style="width: 100%;"><a href="<?php echo $url; ?>"><?php echo $title; ?></a></li>

			<?php
		}
	?>
</ul>

			</div>

			<?php if( $show_only_current_office || is_page( 'properties-for' ) || is_page_template( 'templates/quicklinks-new.php' ) ) : ?>
					<div class="columns medium-2 large-2">&nbsp;</div>
					<div class="columns medium-2 large-2">&nbsp;</div>
			<?php endif; ?>

			<div class="columns medium-1 large-1">&nbsp;</div>

		</div>
		<?php endif; ?>
  <?php endif; ?>


  		<?php if( $show_only_current_office || is_page( 'properties-for' ) || is_page_template( 'templates/quicklinks-new.php' ) ) : ?>
			</div>
		<?php endif; ?>
</div>
  <div class="footclose hide">
       Close
  </div>

  <div class="credit"><a target="_blank" href="http://mootdesign.com">Site by Moot</a></div>

  <div class="cookies hide">
  	We use <a href="<?= home_url( '/cookies/ ' ); ?>">cookies</a>
  	<div class="button-close open small">
  		<div class="line l-0"></div>
  		<div class="line l-1"></div>
  	</div>
  </div>

  </div>
    </div>
</div>
<?php if ( ! is_page( 'developments' ) ) { ?>
<script type="text/javascript">
  var ajaxData = {
    ajaxurl: "<?php echo admin_url('admin-ajax.php'); ?>",
    nonce: "<?php echo wp_create_nonce("gjdev_nonce_field_yeah"); ?>",
    action: "<?php echo ( !is_page('knowledge') ) ? 'get_properties_markers' : 'get_gmap_markers'; ?>",
    data: <?php echo json_encode( $_GET ); ?>,
    query_vars: <?php echo json_encode( $wp_query->query ); ?>
  };
</script>
<?php } ?>

<?php wp_footer(); ?>
    </body>
</html>
