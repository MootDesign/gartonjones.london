<?php
// wp_enqueue_script( 'moot-coverflow', get_template_directory_uri() . '/coverflow/FWDSimple3DCoverflow_uncompressed.js', array( 'jquery' ), '20131209', false );
wp_enqueue_script( 'moot-coverflow', get_template_directory_uri() . '/coverflow/FWDSimple3DCoverflow_compressed.min.js', array( 'jquery' ), '20131209', true );
// wp_enqueue_script( 'moot-coverflow-js', get_template_directory_uri() . '/js/coverflow.js', array( 'jquery', 'moot-coverflow' ), '20131209', true );
wp_enqueue_script( 'moot-coverflow-js', get_template_directory_uri() . '/js/min/coverflow.min.js', array( 'jquery', 'moot-coverflow' ), '20131209', true );
wp_enqueue_script( 'swiper', get_template_directory_uri() . '/js/idangerous.swiper-2.1.min.js', array( 'jquery' ), '20131209', false  );
wp_enqueue_script( 'swiper-2', get_template_directory_uri() . '/js/idangerous.swiper.3dflow.js', array( 'jquery' ), '20131209', false );

wp_enqueue_script( 'gmap-js' );

wp_enqueue_style( 'refined-search', get_template_directory_uri() . '/css/refined-search.css' );
// wp_enqueue_script( 'search', get_template_directory_uri() . '/js/src/single/search.js', array('jquery'), '20150615', true );
wp_enqueue_script( 'search', get_template_directory_uri() . '/js/min/single/search.min.js', array('jquery'), '20150615', true );
// wp_enqueue_script( 'refined-search-js', get_template_directory_uri() . '/js/src/single/refined-search.js', array('jquery'), '20150516', true );
wp_enqueue_script( 'refined-search-js', get_template_directory_uri() . '/js/min/single/refined-search.min.js', array('jquery'), '20150516', true );

// Detect if we are on tablet
require_once( get_template_directory() . '/mobile.php' );

$detect = new Mobile_Detect();

?>
<script>
if ( typeof _data === 'undefined' ) {
  _data = {};
}

jQuery(document).ready( function() {
jQuery('#scanlines, #grad3').fadeIn('slow');

    <?php if( is_home() ) : ?>
        jQuery('#vcont2, #scanlines').delay(5000).animate({opacity:0.05});
        jQuery('.swiper-container').delay(2000).animate({opacity:1});
    <?php endif; ?>

    if( jQuery( "#notice" ).length > 0 ) {
        setTimeout( function() {
            jQuery( '#myDiv-fluidwidth' ).hide();
        }, 500 );
    }
});
</script>

<div id="sub-menu" class="overlayed-bar overlayed-coverflow row">
  <div class="small-0 medium-8 large-8 columns hide-for-small hide-for-medium">&nbsp;</div>
    <a href="#" class="show-change-view">
      Change View >
    </a>
  <div id="change-view" class="small-12 medium-4 large-4 columns change-view switchers visible">
        <ul class="">
          <?php if ( ! is_home() ) { ?>
            <li data-id="#bg, #list-view" class="icon-2">
              <span>List</span>
              <i class="icon-a-z"></i>
            </li>
          <?php } ?>
            <li data-id="#grid" class="icon-1 active">
              <span>Grid</span>
              <i class="icon-grid"></i>
            </li>
            <li data-id="#myholder, #myDiv-fluidwidth" class="icon-1">
              <span>Coverflow</span>
              <i class="icon-photo"></i>
            </li>
            <li data-id="#mapview" class="icon-2">
              <span>Map</span>
              <i class="icon-map"></i>
            </li>
        </ul>
  </div>
</div>

<!-- Refined search -->
<?php
  // search variables
  // debug
  if ( empty( $_GET ) ) {
    global $wp_query;

    $getBeds = $wp_query->query_vars['beds'];
    $getSearch = $wp_query->query_vars['search'];
    $getPrice = $wp_query->query_vars['max-price'];
    $getStatus = $wp_query->query_vars['status'];
    $getProperty = $wp_query->query_vars['property'];
    $getRiver = $wp_query->query_vars['river-view'];
    $getOffice = $wp_query->query_vars['office'];

    if ( $getStatus == 'sales' ) {
      $getStatus = 'sale';
    } else {
      $getStatus = 'let';
    }


  } else {
    $getBeds = $_GET['beds'];
    $getSearch = $_GET['search'];
    $getPrice = $_GET['max-price'];
    $getStatus = $_GET['status'];
    $getProperty = $_GET['property'];
    $getRiver = $_GET['river-view'];
    $getOffice = $_GET['office'];

    if ($getProperty == "sky gardens") { $getProperty = "skygardens"; }
  }

?>

<script>
jQuery( document ).ready( function() {
  jQuery('body').addClass( '<?php echo $getStatus; ?>' );

  jQuery(function($){
    $('#property').on('change', function(){
      var value = $(this).val();
      if (value == "sky gardens") {
        $(this).val($(this).val().replace(/\s+/g, ''));
      }
    });
  });

});
</script>

<!-- End of Refined Search -->

 <article class="parallax hide-for-small-only">
     <div id="register">
        <div class="title">
            <img src="<?php echo get_template_directory_uri() ?>/img/pigeon.png" class="pigeon" alt="pigeon" />
        </div>
        
	<div class="fake-link"></div>

         <div class="the-content" style="padding-top: 10px;">
             <?php
               $description = strtolower( get_field( 'form_description' ) );
               if( $description == 'sales' ) $description = "Sales";
               elseif( $description == 'lettings' ) $description = "Lettings";
               else $description = "Sales or Lettings";
             ?>
              <?php
                $getStatus = $_GET['status'];
                if ( $getStatus == 'let' ) {
                  echo do_shortcode( '[gravityform id="28" title="false" description="false" ajax="true"]' ); 
                } 
                else {
                  echo do_shortcode( '[gravityform id="14" title="false" description="false" ajax="true"]' );
                }
               ?>
              <span class="disclaimer">We do not share the information you provide with any third parties.</span>
         </div>
     </div>
</article>

<?php echo get_template_part( 'templates/refined-search', 'none' ); ?>

<!--Quickview-->
  <div id="quickview" class="hide">
  <div id="qvimg"></div>
    <div id="qvdetails">
     <h1 id="poph1">Abell House, John Islip Street, Westminster, London, SW1P</h1>
 <h2 id="poph2">£2,400,000</h2>
 <div id="qvdesc">

<p style="" class="popdescription">
A 2 double bedroom duplex apartment of approx.1693sq.ft (157sq.m) arranged over the lower and upper ground floors of this luxury new building being developed by Berkeley Homes in the heart of Westminster. This spacious apartment further benefits from an open plan reception room...</p>

 </div>
 <div id="qvfunctions">
 <ul>
<li><a href="#" class="linx" id="popdetails"><span class="plus">+</span>&nbsp;View full details</a></li>
<li><a href="#" class="linx" id="popshare"><span class="plus">+</span>&nbsp;Share</a>&nbsp;<a href="#" id="popfb" target="_blank"><img src="/img/menufb.png" style="margin-top: -4px;" alt="facebook"></a>&nbsp;<a href="#" id="popt" target="_blank"><img src="/img/menutw.png" style="margin-top: -4px;" alt="twitter"></a></li>
<li><a href="#" class="linx" id="popviewing"><span class="plus">+</span>&nbsp;Arrange a Viewing</a></li>
</ul>
</div>
 <div style="clear:both;"></div>
 </div>
 <div class="closeit">
 - Back
 </div>
 <div style="clear:both;"></div>
  </div>

<!--end quickview-->
  <?php
    global $gj_query, $wp_query;
    $i = 0;
//var_dump($wp_query);

    $gj_query = ( ! isset( $gj_query ) ) ? $wp_query : $gj_query;
    if ( $gj_query->have_posts() ) :

?>
  <?php
    // if we are on mobile phone, don't load the coverflow
    if ( ! $detect->isMobile() || $detect->isTablet()) {
  ?>

<div id="myholder" class="show-me"><div id="myDiv"></div></div>



    		<!-- coverflow data -->
		<ul id="coverflowData" style="display: none;" class="coverflow-me">

			<!-- category  -->
			<ul data-cat="+ Category one">

<?php
        $li = "";
        $bgs = "";
        $grid_li = "";

				// Start the Loop.
				while ( $gj_query->have_posts() ) : $gj_query->the_post();
                global $post;

                $price = get_field('price');
                $pidd = get_field('p_id');
                $sqft = get_field( 'square_foot' );

                if ($price <= 80000){
                    $disprice = number_format($price);
                    $display = "£".$disprice." pw";
                } else {
                    $disprice = number_format($price);
                    $display = "£".$disprice;
                }
                $exc = substr(get_field('descriptionfull'),0,250);
        ?>
                <?php
					$image = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ), 'full' );
          if ( ! $image ) {
            $image[0] = get_template_directory_uri() . '/img/default.png';
					}

				?>

 <ul>
          <li data-type="link" data-url="<?php the_permalink() ?>"></li>
					<li data-thumbnail-path="<?php echo $image[0]; ?>"></li>
					<li data-thumbnail-text="">
<?php if( !isset( $GLOBALS[ 'noclick' ] ) ) : ?>
          <div class="flowWrapper" style="float: left; width: 100%; height: auto; padding-top: 5px">
          <?php if ( get_field('web_status') == 3 ) { ?>
          	<p class="stc">Sale Agreed</p>
          <?php } else if ( get_field('web_status') == 4 ) { ?>
          	<p class="stc">Let Agreed</p>
          <?php } ?>
			<p class="largeLabel"><?php the_title(); ?></p>
			<p class="smallLabel">Price <?php echo $display; ?></p>
            <p class="smallLabel"><?php echo $sqft; ?> sqft</p>
			<p class="smallLabel">Bedrooms <?php the_field( 'bedrooms' ) ?></p>
            <p class="flowLinks">
        <script>
            var myid = "qv<?php the_field('p_id'); ?>";
              _data.p<?php echo $i ?> = {};
              _data.p<?php echo $i ?>.bg = 'url(<?php echo $image[0] ?>)';
              _data.p<?php echo $i ?>.link = '<?php the_permalink() ?>';
              _data.p<?php echo $i ?>.title = '<?php echo addslashes ( get_the_title() ) ?>';
              _data.p<?php echo $i ?>.price = '<?php echo $display ?>';
              _data.p<?php echo $i ?>.description = '<?php echo addslashes( $exc ) ?>';
      </script>
            <ul class="options">
                <li><a href="<?php the_permalink(); ?>">+ Full Details</a></li>
            </ul>
            </div>
					</li>

          <?php

          $category = "";
          $bgs .= '<img class="' . $post->post_name . ' lazy" data-original="' . $image[0] . '" alt=""/>';
          ?>
<?php endif; ?>

				</ul>



     <?php
                $i++;
				endwhile;
?>
        </ul>
    </ul>

  <?php } ?>

<?php

			else :
          $beds = intval( $_GET[ 'beds' ] );
?>


<?php if( $_GET[ 'search' ] == 1 ) : ?>
    <div id="notice">
      <div>
        <h2 style="color: white;">
          <?php
            $cat = false;
            if( isset( $_GET[ 'property' ] ) ) {
              $cat = get_term_by( 'name', $_GET[ 'property' ], 'category' );
            }
            // bug fix by Ilia
            $parent = 'westminster';
            if ( $cat && ($cat->parent > 0) ) {
              $cat_parent = get_the_category_by_ID( $cat->parent );
              if (!is_wp_error($cat_parent))
                $parent = $cat_parent;
            }
            // bug fix by Ilia
            $phone = get_option( 'gj_' . strtolower(str_replace( ' ', '', $parent)) . '_tel', '');
          ?>

          There are currently no properties matching your search, however, we often get new stock so please contact one of our team to discuss your requirements on <span class="InfinityNumber clickable" style=""><?= $phone ?></span> and we'll see if we can help.
        </h2>
        <a href="/contact-us/">Please contact us</a>
      </div>
    </div>

    <?php endif; ?>
<?php endif; ?>
<!--end of swiper slide-->

<!--  Reveal  -->
<div id="qvData" class="reveal-modal" data-reveal>
    <div id="qvimg" style="min-height:200px;width:100%;"></div>

    <div id="qvdetails">
        <h1 class="poph1"><a href=""></a></h1>
        <h2 class="poph2"></h2>
            <div id="qvdesc">

                <p class="popdescription text-left">
                <?php echo $exc; ?></p>

            </div>

        <div id="qvfunctions">
            <ul>
                <li><a href="<?php the_permalink(); ?>" class="linx" id="popdetails"><span class="plus">+</span>&nbsp;View full details</a></li>
                <li><a href="#" class="linx" id="popshare"><span class="plus">+</span>&nbsp;Share</a>&nbsp;<a href="https://facebook.com/sharer.php?u=<?php the_permalink(); ?>" id="popfb" target="_blank"><img src="/img/menufb.png" style="margin-top: -4px;" alt="facebook"></a>&nbsp;<a href="https://twitter.com/intent/tweet?url=<?php the_permalink(); ?>" id="popt" target="_blank"><img src="/img/menutw.png" style="margin-top: -4px;" alt="twitter"></a></li>
                <li><a href="#" class="linx" id="popviewing"><span class="plus">+</span>&nbsp;Arrange a Viewing</a></li>
            </ul>
        </div>
        <div style="clear:both;"></div>
    </div>

    <div class="closeit" onclick="javascript:jQuery('a.close-reveal-modal').trigger('click');">
        - Back
    </div>
    <div style="clear:both;"></div>
    <a class="close-reveal-modal">&#215;</a>
</div>

<!-- </div> -->
<!-- </div> -->

<!-- Register your interest -->
   <div id="register" class="parallax">
       <div class="x-close">&#10005;</div>
       <div class="content">
           <?php echo do_shortcode( '[gravityform id="2" ajax=true]' ); ?>
       </div>
  </div>

<div id="mapview" data-map="1" data-lat="51.485025" data-lon="-0.127060" class="show-me">
</div>

<?php $defaultGrid = true; $li = ""; ?>
<?php require_once( dirname( __FILE__ ) . '/../includes/grid.php' ); ?>

<?php if ( ! is_home() ) { ?>
  <div id="list-view" class="show-me content">
    <div id="bg" class="visible">
      <?php echo $bgs ?>
    </div>
    <div id="strips" class="the-strips">
      <ul>
        <?php echo $xli ?>
        <li class="show-more">
          <?php
            echo get_previous_posts_link( '<h3>Previous</h3>' );
            echo get_next_posts_link('<h3>Next</h3>');
          ?>
        </li>
      </ul>
    </div>
  </div>
<?php } ?>
</div>
