<script type="text/javascript">

var $_GET = {};

document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {   
  function decode(s) {
    return decodeURIComponent(s.split("+").join(" "));
  }

  $_GET[decode(arguments[1])] = decode(arguments[2]);
});

var maxPrice = $_GET['max-price'];

var priceLength = maxPrice.toString().length;

if (priceLength == 6) {
  //alert("Length is 6");
}

if (priceLength == 7) {
  //alert("Length is 7");
}

if (priceLength == 8) {
  //alert("Length is 8");
}

if (priceLength == 9) {
  //alert("Length is 9");
}

if (priceLength > 9) {
  //This should never happen
}


//get the first 2 numbers starting at the first character 0
var test3 = test.substr(0, 2);
//get the next four numbers after the second character 
var test3 = test.substr(2, 4);
//alert(test3);

var referrer =  document.referrer;
  //alert(referrer);
/*

if 6 numbers .... change it to be first number . second, third, fourth, fifth and sixth

if 7 numbers ... change it to be the first two numbers . third, fourth, fifth, sixth and seventh

if 8 numbers ... change it to be first three numbers . fourth, fifth, sixth, seventh and eigth

if 9 numbers ... change it to be first four numbers . fifth, sixth, seventh, eight and ninth

<script type="text/javascript">

var $_GET = {};

document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {   
  function decode(s) {
    return decodeURIComponent(s.split("+").join(" "));
  }

  $_GET[decode(arguments[1])] = decode(arguments[2]);
});

var test = $_GET['max-price'];
  //alert(test);

var referrer =  document.referrer;
  //alert(referrer);

f1C791



 */
</script>


<?php
global $getBeds,
  $getPrice,
  $getStatus,
  $getRiver,
  $getProperty,
  $getOffice;
?>

<?php
  require_once( get_template_directory() . '/mobile.php' );

  $detect = new Mobile_Detect;

  $extraClass = '';

  if ( $detect->isMobile() ) {
    $extraClass = 'search-popup';
  }
?>

<div class="refined-search">
  <form method="get" id="devsearch" action="/properties">
<div class="">
    <h3 class="refine-arrow <?php echo $extraClass; ?>" style="margin-right: 30px;">Refine My Search</h3>

    <div id="refine-inputs" class="">
      <div class="refine-wrapper">
      <div class="dropdown">
        <input type="hidden" name="beds" value="<?php echo $getBeds; ?>" >
        <input type="hidden" name="search" value="1" >
        <input type="hidden" name="min-price" value="" >
        <input type="hidden" name="max-price" value="<?php echo $getPrice; ?>" >
        <input type="hidden" name="status" value="<?php echo ($getStatus == 'sale') ? 'sale' : 'let'; ?>" >
        <input type="hidden" name="river-view" value="<?php echo ($getRiver !== null) ? $getRiver : ''; ?>" >

        <div class="sales-let sales-sales" style="display: inline-block">
            <input class="radio-status" id="status-sale" type="radio" name="status" value="sale" <?php echo ($getStatus == 'let')? '' : 'checked' ; ?>>
            <label for="status-sale">Sales</label>
        </div>
        <div class="sales-let" style="display: inline-block">
            <input class="radio-status" id="status-let" type="radio" name="status" value="let" <?php echo ($getStatus == 'let')? 'checked' : '' ; ?>>
            <label for="status-let">Lettings</label>
        </div>

            <div class="ser ser5" data-field="development">
              <div class="text-center option-development">
                <input type="text" name="property" id="property" value="<?php echo trim( $getProperty ); ?>" placeholder="Developments" />

                <ul class="autocomplete-list relative-optionsholder">
                <?php
                  $items = array();
                  $args = array(
                      'type'                     => 'post',
                      'parent'                   => '',
                      'orderby'                  => 'name',
                      'order'                    => 'ASC',
                      'exclude'                  => 1, //Uncategorized
                      'hide_empty'               => 0,
                      'hierarchical'             => 1,
                      'taxonomy'                 => 'category',

                  );

                  $categories = get_categories( $args );

                  foreach( $categories as $cat ) {
                      if( $cat->parent == 0 ) continue;
                      $val = $cat->parent;

                      echo '<li class="loc-' . $val . '" data-loc="' . $val . '" data-value="' . addslashes( $cat->term_id ) . '">' . $cat->name . '</li>';
                  }
                ?>
                  </ul>
                </div>
              </div>

              <div class="ser ser2" data-field="max-price">
                <h2 class="seh arrow">
                   Price
                </h2>

                  <p class="text-center sehp option-max-price">
                    <?php if ($getStatus == 'sale') {
                        if ( $getPrice == 200 ) {
                          echo 'Max';
                        } else {
                          echo '£ ' . number_format($getPrice * 100000);
                        }
                      } else if ($getStatus == 'let') {
                        echo '£ ' . number_format($getPrice * 10) . ' Per Week';
                      } else {
                        echo '---';
                      }
                      ?>
                  </p>
                  <div class="optionsholder sel2">
                    <div class="relative-optionsholder max-price">
                      <a href="#" class="close button-close-me"><span></span></a>

                      <?php for( $i = 3; $i < 10; $i++ ) : ?>

                        <p class="opti sale  <?php echo ($getStatus == 'let' ) ? 'hidden' : '' ; ?>" data-value="<?php echo $i ?>">£ &nbsp;<?php echo number_format ( $i * 100000 ) ?></p>

                      <?php endfor; ?>

                      <?php for( $i = 10; $i <= 150; $i = $i + 10 ) : ?>

                        <p class="opti sale  <?php echo ($getStatus == 'let' ) ? 'hidden' : '' ; ?>" data-value="<?php echo $i ?>">£ &nbsp;<?php echo number_format ( $i * 100000 ) ?></p>

                      <?php endfor; ?>

                        <!-- 20.000.000 + -->
                        <p class="opti sale <?php echo ($getStatus == 'let' ) ? 'hidden' : '' ; ?>" data-value="200">Max</p>

                        <?php for( $i = 3; $i <= 7; $i++ ) : ?>

                          <p class="opti let <?php echo ($getStatus == 'let' ) ? '' : 'hidden' ; ?>" data-value="<?php echo $i * 10 ?>">£ &nbsp;<?php echo number_format ( $i * 100 ) ?> Per Week</p>

                        <?php endfor; ?>

                        <p class="opti let <?php echo ($getStatus == 'let' ) ? '' : 'hidden' ; ?>" data-value="100">£ &nbsp;<?php echo number_format ( 1000 ) ?> Per Week</p>
                        <p class="opti let <?php echo ($getStatus == 'let' ) ? '' : 'hidden' ; ?>" data-value="200">£ &nbsp;<?php echo number_format ( 2000 ) ?> Per Week</p>
                        <p class="opti let <?php echo ($getStatus == 'let' ) ? '' : 'hidden' ; ?>" data-value="300">£ &nbsp;<?php echo number_format ( 3000 ) ?> Per Week</p>

                    </div>
                  </div>
              </div>


            <div class="ser ser3" data-field="beds">
              <h2 class="seh arrow">
                 Beds
              </h2>
              <p class="text-center sehp option-beds"><?php echo ($getBeds != null) ? $getBeds : 'All'; ?></p>
               <div class="optionsholder sel3">
                <div class="relative-optionsholder">
                  <a href="#" class="close button-close-me"><span></span></a>
                   <p class="opti">All</p>
                   <hr>
                   <p class="opti" data-value="Studio">Studio</p>
                   <hr>
                   <p class="opti" data-value="1">1</p>
                   <hr>
                  <p class="opti" data-value="2">2</p>
                   <hr>
                  <p class="opti" data-value="3" style="margin-left: 7px;">3+</p>
                </div>
              </div>
            </div>


            <div class="ser ser4" data-field="river-view">
              <h2 class="seh arrow">
                River View
              </h2>
              <p class="text-center sehp option-beds"><?php
              if ($getRiver == 1) {
                echo 'Yes';
              } else if ($getRiver == 2) {
                echo 'No';
              } else {
                echo 'Either';
              }
              ?></p>
               <div class="optionsholder sel4">
                <div class="relative-optionsholder">
                  <a href="#" class="close button-close-me"><span></span></a>

                   <p class="opti">Either</p>
                   <hr>
                   <p class="opti" data-value="1">Yes</p>
                   <hr>
                  <p class="opti" data-value="2">No</p>
                </div>
              </div>
            </div>
      <button type="submit">Update</button>
    </div>
    </div>
  </div>
</div><!-- ./text-center -->
    </form>

<?php

  $office_name = get_field( 'query_office' );
  $office_slug = '';

  switch ($office_name) {
    case 'Westminster':
      $office_slug = 'westminster';
      break;

    case 'Nine Elms':
      $office_slug = 'nineelms';
      break;

    case 'Southbank':
      $office_slug = 'southbank';
      break;

    case 'Chelsea Bridge Wharf':
      $office_slug = 'chelseabridgewharf';
      break;

    default:
      $office_slug = '';
      break;
  }

?>

<?php
if ( get_field( 'query_office' ) ) {

  $office = get_field( 'query_office' );
  $office = str_replace(' ', '', $office);
  $office = strtolower( $office );

  $phone = get_option( 'gj_' . $office . '_tel' );

if ($office == "victoriaandpimlico") {
  ?>

<div id="call-the-office" style="position: absolute;">Call <span class="InfinityNumber clickable">020 7730 5077</span></div>


  <?php

}

else {
?>

<div id="call-the-office" style="position: absolute;">Call <span class="InfinityNumber clickable"><?= get_option( 'gj_' . $office_slug . '_tel', ''); ?></span></div>

<?php

}
?>



<?php } ?>

</div>


<?php 
  if ( $detect->isMobile() ) {
    wp_enqueue_style( 'search-css' );
    wp_enqueue_script( 'search-js' );
?>

<style>
  .search-box > p {
    display: none;
  }

  #search-popup {
    top: 220px;
  }

  @media screen and ( orientation: landscape ) {
    #search-popup {
      top: 160px;
    }
  }

  #devsearch {
    padding: 0 12px;
  }

  .ser.ser5 #property {
    padding-left: 40px !important;
  }

  #search-popup .button-close {
    top: -90px !important;
  }

  @media screen and ( orientation: landscape ) {
    #search-popup .button-close {
      top: -80px !important;
    }
  }
</style>
<div id="search-popup" class="close-me">
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

  <?php get_template_part( 'template_search_new', 'none' ); ?>
</div>
<?php } ?>