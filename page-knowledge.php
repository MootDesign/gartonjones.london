<?php
require_once( 'mobile.php' );

wp_enqueue_style('parallax-css');
wp_enqueue_script('parallax');
// wp_enqueue_script('dragdealer', get_template_directory_uri() . '/js/dragdealer.js', array(), null, true );
wp_enqueue_script('dragdealer', get_template_directory_uri() . '/js/min/dragdealer.min.js', array(), null, true );

echo "<style>";
echo "#az-list ul li a {";
echo "color: #ac9857 !important;";
echo "</style>";

if( ! isset( $gj_query ) ) { // for knowledge grid
	$args = array(
		'post_type' => 'knowledge',
		'post_status'    => 'publish',
		'posts_per_page' => -1,
	);

	$grid_li = '';
	$li = '';

	$gj_query = new WP_Query( $args );

	$gj_grid = 'knowledge';
}

$detect = new Mobile_Detect();

$class = '';
if ( $detect->isTablet() ) {
	$class = 'tablet';
} else if ( $detect->isMobile() ) {
	$class = 'mobile';
}

$pindrops = array();

//CSS
wp_enqueue_style('single-style' );

$GLOBALS['custom_body_class'] = 'tab-az';

get_header();
?>

<style>
	#overlay-boxes>div{background:#fff;position:fixed;width:100%;height:50%;z-index:9}#overlay-boxes .box1{top:0}#overlay-boxes .box2{top:50%}
</style>
<script>
		var ajaxData = {
    	ajaxurl: "<?php echo admin_url('admin-ajax.php'); ?>",
    	nonce: "<?php echo wp_create_nonce("gjdev_nonce_field_yeah"); ?>",
			markersUrl: '<?php echo get_template_directory_uri(); ?>/img/knowledge/',
			type: ['knowledge'],
			filter: '',
		};
</script>

<div id="overlay-boxes">
	<div class="box1"></div>
	<div class="box2"></div>
</div>

<div id="parallax-wrapper" class="no-ready <?php echo $class; ?>" style="height: 100%;">
	<div class="post-parallax size-me" id="home" style="width: 100%; height: 100%; height: calc( 100vh - 55px );">
		<section class="overlayed-bar row">
				<div class="medium-3 large-4 columns hide-for-small">
				<span class="categories-toggle open-dev-list" onclick="jQuery( '#video-a-z' ).trigger( 'click' );">Show full directory</span>
				<span class="category-name"></span>
				</div>

				<div class="small-12 medium-9 large-6 columns switchers change-view searchpage videos visible">
						<ul id="change-view" style="margin-top: 0;">
							<li class="text"></li>


							<li id="list-a-z" data-id="#az" class="icon-2"  onclick="setTimeout( initAzLayout, 100 )">
								<span>A-Z</span>
								<i class="icon-a-z"></i>
							</li>
							<li data-id="#grid" class="icon-1 default-view">
								<span>Grid</span>
								<i class="icon-grid"></i>
							</li>
							
							<?php
								// if we are on mobile phone, don't load the coverflow
								if ( ! $detect->isMobile() || $detect->isTablet()) {
							?>
							
								<li data-id="#coverflow" class="icon-2" data-nofilter="1" class="icon-1">
									<span>Coverflow</span>
									<i class="icon-photo"></i>
								</li>

							<?php
								}
							?>
							<li data-id="#map" class="icon-2" data-map="1">
								<span>Map</span>
								<i class="icon-map"></i>
							</li>
						</ul>

				</div>
		</section>

		<!-- Category list -->
		<div id="categories" class="row fullWidth">
			<div class="columns small-12 description">
				<div class="small-12 medium-10 medium-offset-1 text-center">
					<div class="show-only-on-home hide-for-small-only">
						<h3>About The Knowledge</h3>
						<?php if ( $detect->isMobile() ) { ?>
							<p>We pride ourselves in being the source of useful facts.</p>
						<?php } else { ?>
							<p>
								The Garton Jones team pride ourselves in being extremely well informed about our city.
							</p><p>
								Take a look around our very own "knowledge" section for places to go, things to see and details of some great experiences to be had whilst you are in London 
							</p>
						<?php } ?>
					</div>
				</div>
			</div>
			<div class="columns small-12 categories-list hidden">
				<div class="row">
				<?php
					$categories = array(
						'',
						'Garton Jones offices',
						'Attractions',
						'Night Life',
						'Restaurants',
						'Hotels',
						'Airports',
						'Theatres',
						'Solicitors',
						'Cinemas',
						'Mens Fashion',
						'Womens Fashion',
						'Baby Fashion',
						'Delicatessens',
						'Jewellers',
						'Toy Stores',
						'Furniture Stores',
						'Book stores',
						'Galleries',
						'Coffee shops',
						'Museums',
						'Landmarks',
						'Car Showrooms',
						'Interior',
						'Bars',
						'Clubs',
						'Dental practices',
						'Medical practices',
						'Opticians',
						'Pharmacies',
						'Department stores',
						'Banks',
						'Members only clubs',
						'Universities',
						'Hairdresser',
						'Dry Cleaner',
						'Beauty Salon',
						'Gym',
					);

					asort( $categories );
				?>
				<ul class="columns small-12 medium-4 large-2">
					<li>
						<?php
							$i = 0;
							foreach( $categories as $key => $cat ) {
								$icon = ( $cat == '' ) ? "" : "categories-historic-buildings";
								$scat = sanitize_title( $cat );

								if( empty( $cat ) ) $cat = 'Show All';
								if( is_numeric( $key ) ) $key = '';
echo <<< LI
	<li>
	<a href="#" data-filter="$scat" data-type="$key"><span class="icon"><span class="$icon" ></span></span><span class="title">$cat</span></a>
	</li>
LI;
        						if( ( $i + 1 ) % 7 == 0 && ( $i + 1 ) < count( $categories ) ) {
									echo '</ul><ul class="columns small-12 medium-4 large-2">';
								}

								$i++;
							}
						?>
					</ul>
				</div>
			</div>
		</div>
		<div id="markerDetails" class="marker-details parallax no-move">
		    <div class="x-close">&#10005;</div>
		    <div class="row">
		        <div class="small-4 columns photo">
		            <div>
		                <img>
		            </div>
		        </div>

		        <div class="small-8 columns" id="content">
		            <div class="container">
		                <div class="scroll">

		                    <div class="subcontent active">
		                        <div class="row">
		                            <div class="small-12">
		                                <div class="title">
		                                    <p></p>
		                                </div>

		                                <p class="text">
		                                </p>

		                                <div class="scrollbar">
		                                    <div class="draggable"></div>
		                                </div>
		                            </div>
		                        </div>
		                    </div>

		                </div>
		            </div>
		        </div>
		    </div>
		</div>

		<?php $class = "active"; ?>
		
		<div id="az-list" class="perfect-scrollbar <?php echo ($detect->isMobile()) ? '' : 'hidden' ?>">
			<ul class="font-gilda handle">
				<li data-item="" class="active">
					<a href="#">ALL</a>
				</li>

				<?php for( $i = 65; $i <= 90; $i++ ) : ?>
					<?php $char = chr( $i ) ?>
					<li data-item="<?php echo $char ?>" class="">
						<a href="#"><?php echo $char ?></a>
					</li>
				<?php endfor; ?>
			</ul>
		</div>

		<div class="row fullWidth mb50 mt8p" style="max-height: calc(100vh - 200px);">
		    <div id="map" class="hide  switch-me">
		    </div>

		    <?php if ( ! $detect->isTablet() && ! $detect->isMobile() ) { ?>
			    <div id="latest" class="content xactive switch-me">
			        <?php
			            get_template_part( 'templates/knowledge-home', 'knowaz' );
			        ?>
			    </div>
			<?php } ?>
		    <div id="az" class="content hide switch-me">
		        <?php
		            get_template_part( 'templates/knowledge-az', 'knowaz' );
		        ?>
		    </div>

		    <div id="grid" class="large-12 medium-12 small-12 columns hide switch-me <?php echo ( $detect->isMobile() ) ? 'xactive' : ''; ?>">
				<?php get_template_part( 'templates/knowledge-grid', 'knowaz' ); ?>

		    </div>

		    <?php
		    	// if we are on mobile phone, don't load the coverflow
		    	if ( ! $detect->isMobile() || $detect->isTablet()) {
		    ?>
				<div id="coverflow" class="hidden switch-me <?php echo ( $detect->isTablet() ) ? 'xactive' : ''; ?>">
					<?php
						$GLOBALS['coverpost_type'] = array( 'knowledge' );
						$GLOBALS['coverflow_myDiv'] = "myKnowledge";

			 			require('templates/single-coverflow.php');
					?>
					<div id="myKnowledge"></div>
				</div>
			<?php
				}
			?>

		</div>

		<div id="slideshow" class="" style="margin-top: -9%;">
			<video id="video1" data-src="http://gj.mootexpress.com/wp-content/uploads/showcase3.mp4" class="load-me autoplay" style=""></video>
		</div>

	</div><!-- ./post-parallax -->
</div><!-- ./parallax-wrapper -->
<script>
	var pindrops = <?php echo json_encode( $pindrops ); ?>;
	var _show_filter = '<?php echo isset( $_GET['category'] ) ? sanitize_url_parameter( $_GET['category'] ) : "" ?>';
</script>
<?php
	
wp_enqueue_script("jquery-effects-core");
wp_enqueue_script('single-development' );

wp_enqueue_script('gmap-js');
wp_enqueue_script('google-maps');

get_footer();
