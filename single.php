<style type="text/css">
  @media screen and (min-width: 1280px) {
    div#stamp-duty-reveal {
     width: 38%!important;
    }
  }
</style>
<?php
/**
 *  The Template for displaying all single posts
 *
 * @package WordPress
 * @subpackage Twenty_Fourteen
 * @since Twenty Fourteen 1.0
 */

wp_enqueue_style( 'swiper-css', get_template_directory_uri() . '/css/idangerous.swiper.css'  );

wp_enqueue_script( 'swiper', get_template_directory_uri() . '/js/idangerous.swiper-2.1.min.js', array( 'jquery' ), '20131209', false  );
wp_enqueue_script( 'swiper-2', get_template_directory_uri() . '/js/idangerous.swiper.3dflow.min.js', array( 'jquery' ), '20131209', false );
wp_enqueue_script( 'google-maps', 'http://maps.google.com/maps/api/js?v=3&sensor=false', array( 'jquery' ), '20131209', false );
// wp_enqueue_script( 'quick-request', get_template_directory_uri() . '/js/src/single/quick-request.js', array('jquery'), '20150617', true );
wp_enqueue_script( 'quick-request', get_template_directory_uri() . '/js/min/single/quick-request.min.js', array('jquery'), '20150617', true );

wp_enqueue_script('cycle-2', get_template_directory_uri() . '/js/cycle2.min.js', array('jquery'), 'v2', true);

// wp_enqueue_script( 'properties', get_template_directory_uri() . '/js/src/single/properties.js', array( 'jquery' ), null, true );
wp_enqueue_script( 'properties', get_template_directory_uri() . '/js/min/single/properties.min.js', array( 'jquery' ), null, true );

get_header();

while ( have_posts() ) : the_post();
$mapper = @$_GET['map'];
if ($mapper=='1'){
?>

 <script>
 jQuery(document).ready(function( $ ){
    $('#mapholder').fadeIn();
    vmap(<?php the_field('lat'); ?>,<?php the_field('lon'); ?>);
 });
 </script>
<?php
}
?>
<div class="single-wrapper">
 <div id="heading" style="background-image:none;background-size: cover; opacity:1;" class="swiper-container">
 <div id="lh2"></div>
<div id="rh2"></div>
 <div class="swiper-wrapper">
 <?php
for ($i=1;$i<=14;$i++){
  $fieldname = 'pic'.$i;
  $pic = get_field($fieldname);


  if ($pic!=''){

    // if the pic doesnt have http included, then it is on the server, under the location
    // /wp-content/uploads/wpallimport/files/ . $pic
    if (strpos($pic,'http') === false) {
      $pic = '/wp-content/uploads/wpallimport/files/' . $pic;
    }

    $filename = $pic;

    if (strpos($pic,'Photo') !== false) {

      echo '<div data-background-url="'.$filename.'" style="background: no-repeat center center;background-size:cover;" class="swiper-slide lazy-background"></div>';

    } elseif (strpos($pic,'Floorplan') !== false) {

      $floorplanbool = true;
      $floorplan = $filename;

    } elseif (strpos($pic,'Brochure') !== false) {

      $brochurebool = true;
      $brochure = $filename;

    } else {
      // just treat it as a photo...
      echo '<div data-background-url="'.$filename.'" style="background: no-repeat center center;background-size:cover;" class="swiper-slide lazy-background"></div>';
    }
  }
}

 if ( $brochurebool == false && get_post_custom_values('get_brochure')[0] != "" ) {
  $brochurebool = true;
  $brochure =  get_post_custom_values('get_brochure')[0];
}

if ( $floorplanbool == false && get_post_custom_values('get_floorplan')[0] != "" ) {
  $floorplanbool = true;
  $floorplan =  get_post_custom_values('get_floorplan')[0];
}

$price = get_field('price');
  if ($price<=80000){

    $disprice = number_format($price);
    $display = "£".$disprice."pw";

  } else {

    $disprice = number_format($price);
    $display = "£".$disprice;

  }
?>
 </div>
 <div id="mapholder" style="background:none;background-size: cover;position: absolute; top: 0;width: 100%; height: calc(100vh - 119px);"></div>
 </div>

 <!-- request... -->
 <article class="parallax hide-for-small-only">
     <div id="register">
        <div class="title">
 <!--            Request available properties for sale or rent in: one the tower &nbsp;<span class="arrow">&#9650;</span>-->
            <!-- Quick Request&nbsp;<span class="arrow">&#9660;</span> -->
            <img data-src="<?php echo get_template_directory_uri() ?>/img/pigeon-2.png" class="pigeon load-me" alt="pigeon" />
            <h2>Arrange a Viewing</h2>
         </div>

         <div class="the-content">

            <style>
              .single.single-post #register .gform_description {
                font-size: 12px;
                text-transform: none;
                line-height: 1.1;
                padding-top: 5px;
              }
            </style>
             <!-- <h3>Request available Properties for <?php the_field( 'form_description' ) ?></h3> -->
             <?php
               $description = strtolower( get_field( 'form_description' ) );
               if( $description == 'sales' ) $description = "Sales";
               elseif( $description == 'lettings' ) $description = "Lettings";
               else $description = "Sales or Lettings";
             ?>
              <h2 style="font-size: 15px;text-transform: uppercase;margin: 15px 22px 0;"><?php echo the_title(); ?></h2>
              <?php echo do_shortcode( '[gravityform id="18" title="false" description="true" ajax="true"]' ); ?>
              <span class="disclaimer">We do not share the information you provide with any third parties.</span>

         </div>
     </div>
</article>

<?php $args = unserialize( stripslashes( $_COOKIE['_gj_search_fields'] ) ); ?>
<?php if ( ! empty( $args ) ) { ?>
  <!-- <div id="back-to-search"><a onclick="window.close(); return false;" href="/properties/?search=<?= $args['search']; ?>&min-price=&status=<?= $args['status']; ?>&property=<?= $args['property']; ?>&max-price=<?= $args['max-price']; ?>&beds=<?= $args['beds']; ?>&river-view=<?= $args['river-view']; ?>" class="linx"><span style="font-size: 25px;line-height: 16px;vertical-align: text-top;padding-top: 1px;display: inline-block;">&#8249;</span> Back to search results</a></div> -->
  <div id="back-to-search"><a href="/properties/?search=<?= $args['search']; ?>&min-price=&status=<?= $args['status']; ?>&property=<?= $args['property']; ?>&max-price=<?= $args['max-price']; ?>&beds=<?= $args['beds']; ?>&river-view=<?= $args['river-view']; ?>" class="linx"><span style="font-size: 25px;line-height: 16px;vertical-align: text-top;padding-top: 1px;display: inline-block;">&#8249;</span> Back to search results</a></div>
<?php  } ?>

<?php
  $office = get_post_custom_values('office')[0];
  $office = str_replace(' ', '', $office);
  $office = strtolower( $office );
  $phone = get_option( 'gj_' . $office . '_tel' );
  if ($office != "westminster" && $office != "nineelms" && $office != "chelseabridgewharf" && $office != "southbank" ) { $phone = "020 7730 5007"; $office = "victoriaandpimlico"; }
  
  $officeName = [
    'westminster' => 'Westminster',
    'nineelms' => 'Nine Elms',
    'chelseabridgewharf' => 'Chelsea Bridge Wharf',
    'victoriaandpimlico' => 'Victoria and Pimlico',
    'southbank' => 'South Bank'
  ];
?>
<?

  ?>
<div id="call-the-office">Call <span class="InfinityNumber clickable"><?= $phone; ?></span>
<?php

?>
    
    
   
</div>

<div id="details">
<div class="row">
<div class="desc columns small-12 <?php echo ( get_field('bullet1') ) ? '' : 'no-bullets' ?>" id="dex">

  <a href="#" class="back-to-details">Back to Details</a>
   <div class="bar-menu">
     <ul>
       <li><a href="#">View</a></li><?php
       ?><li><a href="#" class="linx photos" onclick="javascript:jQuery('#mapholder').fadeOut();jQuery('#lh2,#rh2').fadeIn();"><span class="plus">Photos</a></li><?php
       if (@$floorplanbool == true) {
         ?><li><a href="#" class="linx" data-reveal-id="firstModal">Floor Plan</a></li><?php
       }
       if (get_field('lat')){
         ?><li><a href="#" class="linx map" id="vmap" onclick="javascript:jQuery('#mapholder').fadeIn();vmap(<?php the_field('lat'); ?>,<?php the_field('lon'); ?>);jQuery('#lh2,#rh2').fadeOut();"><span class="plus">Map</a></li><?php
        ?><li><a href="#" class="linx streetview" id="vsv" onclick="javascript:jQuery('#mapholder').fadeIn();vsv(<?php the_field('lat'); ?>,<?php the_field('lon'); ?>);jQuery('#lh2,#rh2').fadeOut();">Streetview</a></li><?php
       }


        ?><li><a href="#" class="to-worth slide" data-popup="1" data-id="#worth-popup" data-reveal-id="worth-popup">Request a Valuation</a></li><?php

        ?><li class="share" style="margin-right: 5px;">Share<a href="https://facebook.com/sharer.php?u=<?php the_permalink(); ?>" id="popfb" target="_blank" class="y360-hover" style="margin-left: 4px;"><img class="load-me" data-src="<?php echo get_template_directory_uri(); ?>/img/facebook-double.png" style="margin-top: -4px; width: 15px;"></a>&nbsp;<a href="https://twitter.com/intent/tweet?url=<?php the_permalink(); ?>" id="popt" target="_blank" class="y360-hover" style="margin-left: 2px;"><img class="load-me" data-src="<?php echo get_template_directory_uri(); ?>/img/twitter-double.png" style="margin-top: -4px; width: 15px;"></a>&nbsp;&nbsp;<a href="https://www.linkedin.com/shareArticle?mini=true&url=<?php the_permalink(); ?>" target="_blank" class="y360-hover"><img class="load-me" data-src="<?php echo get_template_directory_uri(); ?>/img/linkedin-double.png" alt="LinkedIn" style="margin-top: -4px; width: 15px;" /></a>&nbsp;<a href="mailto:?&subject=Garton Jones - <?php the_title(); ?>&body=<?php the_permalink(); ?>" class="y360-hover" style="margin-left: 3px;"><img class="load-me" data-src="<?php echo get_template_directory_uri(); ?>/img/mail-gold-double.png" alt="Mail" style="margin-top: -1px; margin-left: 3px; width: 15px;" /></a></li><?php
     ?></ul>
    <ul class="second">
      <?php if( get_field( 'status' ) == 'sale' ) { ?>
        <li><a href="#" data-reveal-id="stamp-duty-reveal">Stamp Duty Calculator</a></li>
      <?php } ?>
       <?php if (@$brochurebool == true){ ?>
         <li>
           <a href="<?php echo $brochure;?>" target="_blank" class="linx">PDF Brochure</a>
         </li>
       <?php } ?>
       <li class="add-to">
         <a href="#" class="add-to-shortlist">Add to Shortlist <img class="y360-hover" style="width: 20px; height: 20px;" src="<?php echo get_template_directory_uri(); ?>/img/hearth-double.png"></a>
         <span class="message"></span>
       </li>
      <?php if ( get_field( 'status' ) == 'sale' && false ) { ?>
        <li><a href="#">Site map</a></li>
      <?php } ?>
     </ul>

   </div>

   <div class="arrange mobile">
    <a href="#" class="" data-reveal-id="arrange-viewing">Arrange a Viewing</a>
    </div>
       <style type="text/css">
    @media screen and (max-width: 800px) {
      .mobileagreed {
        position: absolute;
        content: '';
        display: inline-block;
        height: 30px;
        top: -30px;
        padding-right: 8px;
        padding-left: 8px;
        margin-right: 2px;
        left: -1px;
        line-height: 31px;
        background: #ac9857;
     }
  </style>
  <?php if( get_field( 'web_status' ) == 3 ): ?>
  <?php $mobile_web_status = "SALE AGREED"; ?>
      <div class="mobileagreed"><?php echo $mobile_web_status; ?></div>
   <?php endif; ?>
   <?php if( get_field( 'web_status' ) == 4 ): ?>
  <?php $mobile_web_status = "LET AGREED"; ?>
      <div class="mobileagreed"><?php echo $mobile_web_status; ?></div>
   <?php endif; ?>

    <?php if( get_field( 'web_status' ) == 3 ): ?>
   <style type="text/css">
    .testhere:before {
      position: absolute;
     content: '';
     display: inline-block;
     width: 0;
     height: 0;
     top: 102px;
     left: 0px;
     border-style: solid;
     border-width: 92px 136px 0 0;
     border-color: #ac9757 transparent transparent transparent;
     }
     .testhere:after {
       content: 'SALE AGREED';
       white-space: pre;
       display: inline-block;
       position: absolute;
       top: 118px;
       left: 6px;
       font-size: 12px;
       line-height: 19px;
     }
    .testhere {
      padding-top: 60px;
    }
    @media screen and (max-width: 800px) {
    .testhere:before { 
      display: none;
    }
    .testhere:after {   
      display: none;
    }
     .testhere {   
      padding-top: 20px;
    }
    }
  </style>
   <?php endif; ?>
       <?php if( get_field( 'web_status' ) == 4 ): ?>
   <style type="text/css">
    .testhere:before {
      position: absolute;
     content: '';
     display: inline-block;
     width: 0;
     height: 0;
     top: 102px;
     left: 0px;
     border-style: solid;
     border-width: 92px 136px 0 0;
     border-color: #ac9757 transparent transparent transparent;
     }
     .testhere:after {
       content: 'LET AGREED';
       white-space: pre;
       display: inline-block;
       position: absolute;
       top: 118px;
       left: 6px;
       font-size: 12px;
       line-height: 19px;
     }
    .testhere {
      padding-top: 40px;
    }
    @media screen and (max-width: 800px) {
    .testhere:before { 
      display: none;
    }
    .testhere:after {   
      display: none;
    }
    .testhere {
       padding-top: 20px;
      }
    }
  </style>
   <?php endif; ?>
<div class="testhere">
 <h1><?php the_title(); ?></h1>
 <h2>
  <?php echo $display; ?>

  <?php if( get_field( 'status' ) == 'let' ): ?>
    <span style="font-size: 27px;"><a href="#" data-reveal-id="fee_apply">Fees apply</a></span>
  <?php endif; ?>

  <?php if ( !empty( get_post_custom_values( 'available' )[0] ) && get_field( 'status' ) == 'let' ) { ?>
       <span class="available-from" style="font-size: 27px;">Available from <?php echo get_post_custom_values( 'available' )[0] ?></span>
    <?php } ?>
 </h2>

<?php if ( get_field('bullet1') ) { ?>
<div class="feat row">
  <div class="leftfeat columns small-12 medium-12 large-6">
    <?php the_field('bullet1'); ?><br>
    <?php the_field('bullet2'); ?><br>
    <?php the_field('bullet3'); ?><br>
    <?php the_field('bullet4'); ?><br>
    <?php the_field('bullet5'); ?><br>
  </div>
  <div class="rightfeat columns small-12 medium-12 large-6">
    <?php the_field('bullet6'); ?><br>
    <?php the_field('bullet7'); ?><br>
    <?php the_field('bullet8'); ?><br>
    <?php the_field('bullet9'); ?><br>
    <?php the_field('bullet10'); ?><br>
  </div>
  <div style="clear:both;"></div>
</div>
<?php } ?>

<p class="default-fonts">
  <?php echo html_entity_decode( get_field('descriptionfull')); ?>
</p>
</div>
<?php

$categories = get_the_category();

$offices = array(
  'Nine Elms',
  'Westminster',
  'South Banks',
  'Chelsea Bridge Wharf'
);

$nineElmsOpening = array(
  '123456' => '9am & 6pm',
);

$cbwOpening = array(
  '12345' => '9am & 6pm',
  '6' => '10am & 3pm'
);

$victoriaOpening = array(
  '1234' => '9am & 6pm',
  '5' => '9am & 5:30pm',
  '6' => 'By Appointment'
);

$westminsterOpening = array(
  '123456' => '9am & 6pm'
);

/**
 * Get the opening times from the array above
 * The days of the weeks are represented as numbers, 0 - Sunday, 1 - Monday, etc.
 * We convert the integers to string so we can do a search in the keys, then return the value
 * @param  [type] $arrayToSearch [description]
 * @return [type]                [description]
 */
function getOpeningTimes( $arrayToSearch, $addExtraDay = 0 ) {
  $dayOfWeek = '' . (jddayofweek( cal_to_jd(CAL_GREGORIAN, date("m"),date("d"), date("Y"))) + $addExtraDay );

  foreach( $arrayToSearch as $key => $value ) {
    $key = '' . $key;
    if ( strpos( $key, $dayOfWeek ) !== false ) {
      return array($value, $addExtraDay, $key);
    }
  }

  // here the loop resulted to a false. We need to rerun it with the next day
  return getOpeningTimes($arrayToSearch, $addExtraDay + 1);
}

for( $i = 0; $i < count($categories); $i++ ) {
  for( $j = 0; $j < count($offices); $j++ ) {
    if( $categories[$i]->name == $offices[$j] ) {
      $category = $categories[$i];
      continue;
    }
  }
}

// Init variables
  $telNumber = '';
  $officeName = '';
  if (isset( $category )) {
    $telNumber = get_option( 'gj_' . str_replace( '-', '', $category->slug ) . '_tel');
    $officeName = $category->name;

    if ( $category->slug == 'westminster' ) {
      $opening = getOpeningTimes( $westminsterOpening );
    } else if ( $category->slug == 'chelsea-bridge-wharf' ) {
      $opening = getOpeningTimes( $cbwOpening );
    } else if ( $category->slug == 'nine-elms' ) {
      $opening = getOpeningTimes( $nineElmsOpening );
    }

    $inDays = 'today';
    if ( $opening[1] !== 0 ) {
      if ( $opening[1] == 1 ) {
          $inDays = 'tomorrow';
      } else {
        $inDays = 'in ' . $opening[1] . ' days';
      }
    }

    if ( $opening[2] == '123456' ) {
      $inDays = 'Monday to Saturday';
    }
  }
?>

<div class="strip gold-single-property-strip">
<?php 
  if ($officeName != "Westminster" && $officeName != "Nine Elms" && $officeName != "South Banks" && $officeName != "Chelsea Bridge Wharf") { 
    $officeName = "Victoria & Pimlico";
    $telNumber = "020 7730 5007";
}
if ($officeName == "Westminster") { $officeName = "Westminster and St James’s"; }
if ($officeName == "Nine Elms") { $officeName = "Nine Elms and Vauxhall"; }

if ($officeName == "Chelsea Bridge Wharf") {
?>
Call our <?php echo $officeName; ?> Office <?php echo $inDays; ?> between <?php echo $opening[0]; ?> <span class="InfinityNumber clickable" style="color: #fff;"><?php echo $telNumber; ?></span>
<?php

}
else {
?>
Call our <?php echo $officeName; ?> Office Monday to Thursday between 9am & 6pm, Friday between 9am and 5:30pm <span class="InfinityNumber clickable" style="color: #fff;"><?php echo $telNumber; ?> Saturdays by appointment</span>
<?php

}
?>
</div>

<hr>

<?php

$postcode = get_field( 'postcode' );
list( $postcode ) = explode( " ", $postcode );

$status = get_field('status');
?>

<div id="bus">
  <a href="#" class="to-worth slide" data-popup="1" data-id="#worth-popup" data-reveal-id="worth-popup">
    <img data-src="<?php echo get_template_directory_uri() ?>/img/parallax/bus-version-3.png" alt="" class="bus load-me" />
    <img data-src="<?php echo get_template_directory_uri() ?>/img/parallax/rent.png" alt="" class="text-rent load-me" />
    <img data-src="<?php echo get_template_directory_uri() ?>/img/parallax/sell.png" alt="" class="text-sell load-me" />
    <img data-src="<?php echo get_template_directory_uri() ?>/img/parallax/click-here.png" alt="" class="text-click load-me" />

    <div class="slideshow-wrapper">
      <div class="cycle-slideshow">
        <img class="load-me" data-src="<?php echo get_template_directory_uri() ?>/img/parallax/buldog1.png" alt="" />
        <img class="load-me" data-src="<?php echo get_template_directory_uri() ?>/img/parallax/buldog2.png" alt="" />
      </div>
   </div>

  </a>
</div>

 </div>

 <div style="clear:both;"></div>
 </div>
</div>

<div style="clear:both;"></div>

<div id="firstModal" class="reveal-modal" data-reveal>
    <img class="load-me" data-src="<?php echo @$floorplan;?>" alt="floorplan">
    <a class="close-reveal-modal" aria-label="Close">
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
    </a>
  </div>
</div>

 <div id="fee_apply" class="reveal-modal desc" data-reveal>
   <div class="content">
    <h2>Landlord Fees:</h2>
    <p><strong>Letting only service:</strong> 8% + VAT<br>
     This service applies to landlords who wish to let their property but will manage their own property for the duration of the tenancy.</p>

    <p><strong>Let only and rent collect:</strong> 10% VAT<br>
    This service is the same as the letting only although the rent will be paid to Garton Jones and we will pay it over to the landlord. </p>

    <p><strong>Management Service:</strong> 12% + VAT<br>
    This service is for landlords who wish for Garton Jones to manage their property. Our expert management team will deal with all repairs and problems that may arise during the tenancy.</p>

    <p><strong>Tenancy Agreement:</strong> £120 (inc VAT)<br>
    For drawing up a Tenancy Agreement at the start of a new tenancy</p>

    <p><strong>Check in and Inventory Report:</strong> £138 - £218.40 (inc VAT)<br>
    This will be done at the start of a new tenancy by a third party clerk. Please note price is subject to change and determined by the size of the property.</p>

    <p><strong>Vacant Management:</strong> £120 (inc VAT)<br>
    We will deal with the management of the property whilst the property is vacant and being remarketed.</p>

    <p><strong>Copy documents:</strong> £50 (inc VAT)<br>
    For the supply of a document that has previously been provided.</p>

    <p><strong>Renewal Tenancy Agreement:</strong> £60 (inc VAT)<br>
    For drawing up the renewal Tenancy Agreement</p>

    <p><strong>Waiting at a property - £70 (inc vat) per hour</strong><br>
    Awaiting deliveries or attending with contractors </p>

    <h2>Tenants Fees</h2>

    <h3>Before you move in:</h3>
    <p>We will take a holding deposit which is equivalent to 1 weeks rent, this will ensure that we cease marketing and that the property is placed under offer.</p>

    <p><strong>Referencing Fee:</strong> £60 (inc VAT) per tenant<br>
    Referencing includes Credit check, Affordability check, Residency information (background check on where they have previously lived), previous Landlord reference and employer reference.</p>

    <p><strong>Company Referencing Fee:</strong> £120 (inc VAT)<br>
    Referencing of company</p>

    <p><strong>Tenancy Agreement:</strong> £180 (inc VAT) per tenancy<br>
    To draw up the Tenancy Agreement </p>

    <h3>During your tenancy:</h3>

    <p><strong>Renewal Tenancy Agreement:</strong> £70 (inc VAT)<br>
    To draw up the renewal Tenancy Agreement should you wish to renew</p>

    <p><strong>Admin fee for late rent payments:</strong> £30 (inc VAT)<br>
    Should we have to chase for the tenants late rent on 3 or more occasions</p>

    <p><strong>Rent paid to Garton Jones in error:</strong> £30 (inc VAT)<br>
    Should you pay you rent to Garton Jones when it should be paid to the Landlord </p>

    <p><strong>Deed of assignment:</strong> £150 (inc VAT)<br>
    Addendum to the Tenancy Agreement should there be a change to the original Tenancy Agreement</p>

    <h3>Ending your tenancy:</h3>

    <p><strong>Check out and Inventory:</strong> £110- £216 (inc VAT)<br>
    This will be done at the end of the tenancy by a third party clerk. Please note price is subject to price increase and determined by the size of the property.</p>

    <h3>Other fees and charges:</h3>

    <p><strong>Out of hour’s:</strong> Should the tenant’s contact the out of hour’s contractor and it is deemed that it was not an emergency or was the tenants fault, the tenant will incur the contractor’s costs.</p>
  </div>
  
  <a class="close-reveal-modal" aria-label="Close" style="top: 0 !important; right: 0 !important;">
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
    </a>
</div>

<div id="stamp-duty-reveal" class="reveal-modal" data-reveal>
  <a class="close-reveal-modal" aria-label="Close">
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
  </a>
  <h3>Stamp duty calculator</h3>
  <h4>Purchase price</h4>
  <style type="text/css">
    .tg  {border-collapse:collapse;border-spacing:0;}
    .tg td{font-family:Arial, sans-serif;font-size:14px;padding:10px 5px;border-style:solid; border-color: #666;border-width:1px;overflow:hidden;word-break:normal;}
    .tg th{font-family:Arial, sans-serif;font-size:14px;font-weight:normal;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;}
    .tg .tg-mrrp{color:#ac9757;vertical-align:top}
    .tg .tg-yw4l{vertical-align:top; width: 25%;}
    .tg .tg-black { color: #000;  }
    .tg .tg-gold { color: #ac9757; }
</style>
    <?php
      if (get_field('how_much_stamp')) {
        echo '<div class="how-much-text">' . get_field('how_much_stamp') . '</div>';
      }
    ?>
<div style="display: none;">
<input id="price_house" type="text" name="property-value" placeholder="£ Property purchase value" />
    <a id="calcprice" href="#" class="calculate confirm">Calculate</a>
    <span id="result">Stamp duty to pay: £0.00</span>
</div>
<div id="stamp-duty-scroller">
  <div class="stamp-duty-wrapper">
    <div class="image-wrapper">
    </div>
        <input type="text" name="price" value="<?=$disprice?>" id="price" />
        <br>
        <input style="height: 20px; width: 20px; margin-top: 10px; margin-bottom: 10px; margin-left: 0px;" type="checkbox" name="second" value="1" id="second"/>
        <label style="font-size: 16px; position: relative; top: -4px;" for="second">Property is a buy-to-let or second home</label>
        <br>
        <input type="submit" name="submit" value="Calculate" id="submitCalcPrice"/>
        <div id="result"></div>
      </div>
      <div class="clearfix"></div>
        <div id="table-wrapper" style="display: none;">

        <hr style="width: 100%!important; margin-bottom: 15px;">
        
        <p style="display: inline-block; font-weight: 700; color: #000;">Stamp Duty to pay: <span style="color: #ac9757!important" id="total_tax"></span></p>
        <p style="display: inline-block; font-weight: 700; color: #000; margin-left: 10%">Actual rate: <span style="color: #ac9757!important" id="effective_rate"></span></p>

        <p class="tg-gold" style="font-size: 14px; font-family: Arial;">How this result was calculated</p>

          <table class="tg stamp_duty_table">
            <thead>
              <tr>
                <th style="border-color: #666;" class="tg-mrrp tg-gold">Price bands</th>
                <th style="border-color: #666;" class="tg-mrrp tg-gold">Pecentage rate</th>
                <th style="border-color: #666;" class="tg-mrrp tg-gold">Taxable sum</th>
                <th style="border-color: #666;" class="tg-mrrp tg-gold">Tax</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="tg-yw4l tg-black">£0 to £125,000</td>
                <td class="tg-black" id="tax-percentage-1">0%</td>
                <td class="tg-black" id="taxable-sum-1"></td>
                <td class="tg-black" id="tax-1"></td>
              </tr>
              <tr>
                <td class="tg-yw4l tg-black">£125,000 to £250,000</td>
                <td  class="tg-black" id="tax-percentage-2">2%</td>
                <td  class="tg-black" id="taxable-sum-2"></td>
                <td  class="tg-black" id="tax-2"></td>
              </tr>
              <tr>
                <td class="tg-yw4l tg-black">£250,000 to £925,000</td>
                <td class="tg-black" id="tax-percentage-3">5%</td>
                <td class="tg-black" id="taxable-sum-3"></td>
                <td class="tg-black" id="tax-3"></td>
              </tr>
              <tr>
                <td class="tg-yw4l tg-black">£925,000 to £1,500,000</td>
                <td class="tg-black" id="tax-percentage-4">10%</td>
                <td class="tg-black" id="taxable-sum-4"></td>
                <td class="tg-black" id="tax-4"></td>
              </tr>
              <tr>
                <td class="tg-yw4l tg-black">£1,500,000+</td>
                <td class="tg-black" id="tax-percentage-5">12%</td>
                <td class="tg-black" id="taxable-sum-5"></td>
                <td class="tg-black" id="tax-5"></td>
              </tr>
              <!--<tr style="background: #bdbec0;">
                <td class="tg-gold">Total tax</td>
                <td class="tg-black"></td>
                <td class="tg-black"></td>
                <td id="total_tax" class="tg-yw4l tg-gold"></td>
              </tr>
              <tr style="background: #bdbec0;">
                <td class="tg-gold">Actual rate</td>
                <td class="tg-black"></td>
                <td class="tg-black"></td>
                <td id="effective_rate" class="tg-yw4l tg-gold"></td>
              </tr>-->
            </tbody>
          </table>
        </div>
    </div>
  </div>

</div>

<div id="arrange-viewing" class="reveal-modal gj-form" data-reveal>
    <h3>Arrange a Viewing - <?php the_title(); ?></h3>
    <?php echo do_shortcode( '[gravityform id="18" title="false" description="true" ajax="true"]' ); ?>
    <span class="disclaimer">We do not share the information you provide with any third parties.</span>
    <a class="close-reveal-modal" aria-label="Close">
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
    </a>
</div>

<div id="worth-popup" class="close-me popup reveal-modal" data-center="1" data-reveal>
  <form method="post" enctype="multipart/form-data" id="gform_15" action="<?php echo $_SERVER[ 'REQUEST_URI' ] ?>"></form>
  <a class="close-reveal-modal" aria-label="Close">
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
  </a>
  <h2 style="font-size: 25px; margin-left: 5px; text-align: center;">How much is my property worth?</h2>
  <form method="post" enctype="multipart/form-data" id="gform_15" action="<?php echo $_SERVER[ 'REQUEST_URI' ] ?>">
   <?php echo do_shortcode( '[gravityform id="15" title="false" description="false" ajax="true"]' ); ?>
  </form>
  <span class="disclaimer">We do not share the information you provide with any third parties.</span>
</div>

<script>
  document.getElementById('calcprice').onclick = function () {

  var getValue = document.getElementById('price_house').value;
  var reg = new RegExp(" ", "g");
  var step = getValue.replace(reg, "");
  var step2 = step.replace(/[&\/\\#,+()$~%.'":*?<>{}A-Za-z£$]/g, "");
  var forcalc = parseInt(step2);
  var stampDuty;
  var flag;

  if (forcalc <= 125000.01) {
    stampDuty = 0;
  }
  else if (forcalc > 125000.01 && forcalc <= 250000.00) {
    stampDuty = (forcalc - 125000) * 0.02;
  }
  else if (forcalc >= 250000.01 && forcalc <= 925000.00) {
    stampDuty = ((forcalc - 250000) * 0.05) + 2500;
  }
  else if (forcalc >= 925000.01 && forcalc <= 1500000.00) {
    stampDuty = ((forcalc - 925000) * 0.1) + 36250;
  }
  else if (forcalc >= 1500000.01) {
    stampDuty = ((forcalc - 1500000) * 0.12) + 93750;
  }
  var comma1 = stampDuty.toFixed(2);
  var comma2 = '';
  flag = false;
  var checklength = comma1.length;

  for (i = 0; i < comma1.length; i++)
  {
    if (checklength == 8) {
      if (i === 2) {
        comma2 += ',' + comma1[i];
      }
      else {
        comma2 += comma1[i];
      }

    }
    else if (checklength == 9) {
      if (i === 3) {
        comma2 += ',' + comma1[i];
      }
      else {
        comma2 += comma1[i];
      }
    }
    else {
      if (comma1[i] === '.') {
        flag = true;
      }
      if ((i % 3) === 1 && flag === false) {
        comma2 += ',' + comma1[i];
      }
      else if ((i % 3) !== 1 && flag === false) {
        comma2 += comma1[i];
      }

      else {
        comma2 += comma1[i];
      }

    }
  }
  
  document.getElementById('result').innerHTML = 'Stamp duty to pay: £' + comma2;
};

(function($) {
    $(document).on('opened.fndtn.reveal, opened', '[data-reveal]', function () {
        var modal = $(this);
        modal.find( '.button-close' ).addClass( 'open' )
            .find( '.bg' ).addClass( 'open' );
    });
})(jQuery);

//Add the properties to the shortlist
jQuery( '.add-to-shortlist' ).click( function() {
  var $li = jQuery( 'li.add-to' );

  $li.addClass( 'ajax' );
  jQuery.ajax({
      type : "post",
      url: '<?php echo admin_url('admin-ajax.php'); ?>',
      data:  {
          action: 'add_to_shortlist',
          id: <?php echo get_the_ID() ?>,
          nonce: '<?php echo wp_create_nonce("gjdev_nonce_field_yeah"); ?>'
      },
      success: function( response ) {
        console.log( response );
        $li.addClass( 'show-message' );
        $li.find( 'span' ).html( response );

        setTimeout( function() {
          $li.removeClass( 'show-message ajax' );
        }, 3000 );
      }
  });

  return false;
});

jQuery(document).ready( function() {

  if ( jQuery( window ).width() > 767 ) {
    var bulletpointsH = 210;
    var titleH = 0;
    var subtitleH = 0;
    if ( jQuery( window ).width() > 1800 ) {
      bulletpointsH = jQuery( '.feat.row' ).height();
      titleH = jQuery( '#dex > h1' ).height();
      subtitleH = jQuery( '#dex > h2' ).height();
    }

    var mt = jQuery( window ).height() - jQuery( '#navigation-menu' ).offset().top - jQuery( '#navigation-menu' ).height() - jQuery( '.site-footer' ).height() - jQuery( '#bottom-bar' ).height() - 50 - bulletpointsH - titleH - subtitleH;

    jQuery( '#details' ).css({
      marginTop: mt
    }).data( 'mt', mt );
  }

  jQuery( '.back-to-details' ).click( function() {
    jQuery( '#details' ).animate({
      marginTop: jQuery( '#details' ).data( 'mt' )
    }, 400 );

    jQuery( this ).fadeOut();
  });
})
</script>

<script type="text/javascript">
  (function($) {
    var tax_bands = [0, 125000, 250000, 925000, 1500000];
    var tax_percentage = [0, 2, 5, 10, 12];
    var second_home_percentage = [3, 5, 8, 13, 15];

    var non_res_tax_limits = [0, 150000, 250000, 500000];
    var non_res_tax_percentage = [0, 1, 3, 4];
    function calculate_tax(value) {
        if($.isNumeric(value) && value > 0 && value % 1 === 0) {
        //if(document.forms.stamp_duty_form.property_type.options[document.forms.stamp_duty_form.property_type.selectedIndex].value == "res") {
            //$('#sd_table_wrap2').hide();
            var tax = [];
            var tax_sum;
            var total_tax_sum = 0;

            var is_second_home = $('#second').is(':checked');
            var set_percentage_index;
            for(set_percentage_index = 0; set_percentage_index < second_home_percentage.length; set_percentage_index++) {
                if(is_second_home) {
                    $($('.stamp_duty_table').first().children('tbody').children().get(set_percentage_index)).children().get(1).innerHTML = second_home_percentage[set_percentage_index] + "&#37;";
                } else {
                    $($('.stamp_duty_table').first().children('tbody').children().get(set_percentage_index)).children().get(1).innerHTML = tax_percentage[set_percentage_index] + "&#37;";
                }
            }

            var index;
            for(index = 0; index < tax_bands.length; index++) {
                console.log(value);
                console.log(tax_bands[index]);
                tax_sum = 0;
                if(value > tax_bands[index]) {
                    if((index + 1) < tax_bands.length && value > tax_bands[index+1]) {
                        tax_sum = (tax_bands[index+1] - tax_bands[index]);
                    } else {
                        tax_sum = (value - tax_bands[index]);
                    } 

                    if(is_second_home) {
                        tax[index] = tax_sum * second_home_percentage[index] / 100;
                    } else {
                        tax[index] = tax_sum * tax_percentage[index] / 100;
                    }
                } else {
                    tax[index] = 0;
                }

                //if(index > 0) {
                
                    $("#taxable-sum-" + (index + 1)).html("&pound;" + tax_sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
                    $("#tax-" + (index + 1)).html("&pound;" + tax[index].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
                //}

                total_tax_sum += tax[index];
            }

            var effective_rate = ((total_tax_sum / value) * 100).toFixed(1);

            $("#total_tax").html("&pound;" + total_tax_sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
            $("#effective_rate").html(effective_rate + "&#37;");

            $('#table-wrapper').slideDown("slow");
        /*} else {
            $('#sd_table_wrap').hide();
            var index;
            var total_tax_sum = -1;
            var applied_tax_percentage = -1;

            for(index = 1; index < non_res_tax_limits.length; index++) {
                if(value <= non_res_tax_limits[index]) {
                    applied_tax_percentage = non_res_tax_percentage[index-1];
                    break;
                }
            }

            if(applied_tax_percentage == -1) {
                applied_tax_percentage = non_res_tax_percentage[non_res_tax_percentage.length - 1];
            }

            total_tax_sum = value * applied_tax_percentage / 100;

            $("#non_res_percentage").html(applied_tax_percentage + "&#37;");
            $("#non_res_tax").html("&pound;" + total_tax_sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));

            $('#sd_table_wrap2').slideDown("slow");
        }*/
        } else {
            alert("Sorry, you need to use a whole number value larger than 0. Please try again.");
        }
    }

    $(document).ready(function() {
        var hidden_price = '#price';
        var price_input = '#price';
        $(price_input).keyup(function () {
                var price = $(price_input).val();
                price = price.replace(/,/g,'');
                $(hidden_price).val(price);
                var price_with_commas = add_commas(price);
                $(price_input).val(price_with_commas);
        });
        
        $('#second').click(function() {
            if($('#table-wrapper').is(":visible")) {
                calculate_tax(parseInt($('#price').val().replace(/,/g, '')));
            }   
        });

        if($(hidden_price).val()) {
            var price_with_commas = add_commas($(hidden_price).val());
            $(price_input).val(price_with_commas);
            //calculate_tax(document.forms.stamp_duty_form.price.value);
        }

        $('#submitCalcPrice').click( function() {
            calculate_tax(parseInt($('#price').val().replace(/,/g, '')));
            return false;
        });
    });


    function add_commas(price) {
        price += '';
        price = price.replace(/,/g,'');
        var price_arr = price.split('.');
        var price1 = price_arr[0];
        var price2 = price_arr.length > 1 ? '.' + price_arr[1] : '';
        var pattern = /(\d+)(\d{3})/;
        while (pattern.test(price1)) {
            price1 = price1.replace(pattern, '$1' + ',' + '$2');
        }
        return price1 + price2;
    }
}(jQuery));
</script>

</div>
<?php
endwhile;

wp_enqueue_style( 'single-properties' );

get_footer();