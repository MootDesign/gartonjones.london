<?php

wp_reset_query();

wp_enqueue_script( 'search-js' );

global $page;

$is_single = isset( $GLOBALS[ '_single_dev' ] );
$is_single = false;
$GLOBALS[ 'postcode' ] = "SW8 2AU";
$properties_for = get_field( 'form_description' );
?>

<div class="small-12 medium-12 large-12 columns content1col search-box">
  <h1 class="dev-search-title">
    <?php the_title(); ?>
  </h1>

  <div class="center">
    <ul class="search-menu">
    <?php // TODO once sales & lettings search is in place, make these links ?>
      <?php 
        $description = strtolower( get_field( 'form_description' ) ); // "sales" || "lettings"

        if ( $description == "sales" ) {
          ?><li id="only-search-menu" class=""><a class="active" href="#" data-value="sale">Search our Sales</a></li><?php
        } else if ( $description == "lettings" ) {
          ?><li id="only-search-menu" class=""><a href="#" data-value="let">Search our Lettings</a></li><?php
        } else {
          ?><li id="first-search-menu" class=""><a class="active" href="#" data-value="sale">Search our Sales</a></li><li id="second-search-menu" class=""><a href="#" data-value="let">Search our Lettings</a></li><?php
        }
      ?>
    </ul>
  </div>

  <div class="row mtb50">
    <form method="get" id="devsearch" action="/properties">
      <input type="hidden" name="search" value="1" >
      <input type="hidden" name="property" value="<?php echo get_the_title(); ?>">
      <input type="hidden" name="status" value="sale" >
  
      <div class="ser ser3" data-field="beds">
        <label for="beds" class="seh">
           Beds
        </label>
        <div class="input-wrapper">
          <label class="input-text">Studio<input type="radio" name="beds" value="0"></label>|
          <label class="input-text">1<input type="radio" name="beds" value="1"></label>|
          <label class="input-text">2<input type="radio" name="beds" value="2"></label>|
          <label class="input-text">3+<input type="radio" name="beds" value="3"></label>
        </div>
      </div>

      <div class="search-row">
        <h2 class="sehg">
           <a href="#" class="submit-box" onclick="document.getElementById('devsearch').submit();">Search Now <span>&#8250;</span></a>
        </h2>
      </div>
    </form>
  </div>
</div>

<div class="row fullWidth mb50 search-box" id="searcher" style="display: none !important;">
    <div class="small-12 medium-12 large-12 columns" id="wording">
        <div class="row">
            <div class="small-12 medium-12 large-12 columns content1col">

                <div id="search-single">
                    <h1 class="center title active"><span>
                      <?php the_title(); ?>
                    </span></h1>

                    <form method="get" id="form-single" action="/properties">
                        <input type="hidden" name="beds" value="">
                        <input type="hidden" name="river-view" value="">
                        <input type="hidden" name="search" value="1">
                        <input type="hidden" name="min-price" value="">
                        <input type="hidden" name="max-price" value="">
                        <input type="hidden" name="status" value="<?php echo $properties_for == "Lettings" ? "let" : "sale" ?>">
                        <input type="hidden" name="postcode" value="">
                        <input type="hidden" name="property" value="<?php the_title(); ?>">
                        <div class="center row-content">
                          <span class="search-description <?php echo in_array( $properties_for, array('Sales', 'Lettings') ) ? "&nbsp;" : "small" ?>">
                              <!-- Please select number of bedrooms for sale or lettings -->
                          </span>
                            
                            <ul class="search-menu">
                            <?php // TODO once sales & lettings search is in place, make these links ?>
                              <li id="first-search-menu" class=""><a class="active" href="#" data-value="sale">Search our Sales</a></li><li id="second-search-menu" class=""><a href="#" data-value="let">Search our Lettings</a></li>
                            </ul>

                            <ul class="search-menu row">
                                <?php $col_size = in_array( $properties_for, array('Sales', 'Lettings') ) ? "small-12" : "small-6"; ?>
                                <?php if( $properties_for != "Lettings" ) : ?>
                                <li class="columns <?php echo $col_size ?> first">

                                    <a class="active sales-lettings" href="#" data-value="sale">Sales</a>
                                    <div class="onetofive">
                                        <span>No. of beds</span>
                                        <ul class="leftmenu">
                                            <li class="active">
                                                <a href="#" data-title="Studio">Studio</a>
                                            </li>
                                            <li class="active">
                                                <a href="#" data-title="1">1</a>
                                            </li>
                                            <li>
                                                <a href="#" data-title="2">2</a>
                                            </li>
                                            <li>
                                                <a href="#" data-title="3+">3+</a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <?php endif; ?>
                                <?php if( $properties_for != "Sales" ) : ?>
                                <li class="columns <?php echo $col_size ?> second">
                                    <a href="#" data-value="let" class="sales-lettings">Lettings</a>
                                    <div class="onetofive">
                                        <?php if( $properties_for != "Lettings" ) : ?>
                                          <span>No. of beds</span>
                                        <?php endif; ?>
                                        <ul class="leftmenu">
                                            <li class="active">
                                                <a href="#" data-title="Studio">Studio</a>
                                            </li>
                                            <li class="active">
                                                <a href="#" data-title="1">1</a>
                                            </li>
                                            <li>
                                                <a href="#" data-title="2">2</a>
                                            </li>
                                            <li>
                                                <a href="#" data-title="3+">3+</a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                              <?php endif; ?>
                                <li style="clear:both"></li>
                            </ul>

                            <br />
                            <a href="#" class="submit-box sehg" onclick="document.getElementById('form-single').submit();">Search <span>&#8250;</span></a>
                        </div>

                    </form>
                </div>
            <div id="search-all" class="">
              <!-- Search all -->
              <h2 class="center title"><span class="bounce-left">Search all our properties</span></h2>


              <div class="row mtb50 row-content closed">
              	<form method="get" id="devsearch" action="/properties">
              			<input type="hidden" name="beds" value="" >
              			<input type="hidden" name="search" value="1" >
              			<input type="hidden" name="min-price" value="" >
              			<input type="hidden" name="max-price" value="" >
              			<input type="hidden" name="status" value="sale" >

              	<div class="ser ser5" data-field="development">
              	<h2 class="seh no-arrow">Property Search</h2>
              	<div class="text-center sehp option-development">
                  <input type="text" name="property" id="property" value="" placeholder="Development Name, Postcode" />

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
              	<h2 class="seh">
              		 Max Price
              	</h2>

              			<p class="text-center sehp option-max-price"></p>
              			<div class="optionsholder sel2">
              				<div class="relative-optionsholder max-price no-close close-me">
              			 		<a href="#" class="close button-close-me"><span></span></a>

              					<?php for( $i = 5; $i < 10; $i++ ) : ?>

              						<p class="opti sale" data-value="<?php echo $i ?>">£ &nbsp;<?php echo number_format ( $i * 100000 ) ?></p>

              					<?php endfor; ?>

              					<?php for( $i = 1; $i <= 15; $i++ ) : ?>

              						<p class="opti sale" data-value="<?php echo $i * 10 ?>">£ &nbsp;<?php echo number_format ( $i * 1000000 ) ?></p>

              					<?php endfor; ?>

                          <!-- 20.000.000 + -->
              						<p class="opti sale" data-value="20">£ &nbsp;20,000,000 +</p>

                          <?php for( $i = 1; $i <= 7; $i++ ) : ?>


                					<?php endfor; ?>

              				</div>
              			</div>
              	</div>

              	<div class="ser ser3" data-field="beds">
              	<h2 class="seh">
              		 Beds
              	</h2>
              	<p class="text-center sehp option-beds">All</p>
              	 <div class="optionsholder sel3">
              	 	<div class="relative-optionsholder close-me no-close">
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
              	<h2 class="seh">
                  Direct River Facing Apartments
              	</h2>
              	<p class="text-center sehp option-beds">Either</p>
              	 <div class="optionsholder sel4" style="top:-42px;">
              	 	<div class="relative-optionsholder no-close close-me">
              	 		<a href="#" class="close button-close-me"><span></span></a>

              			 <p class="opti">Either</p>
              			 <hr>
              			 <p class="opti" data-value="1">Yes</p>
              			 <hr>
              			<p class="opti" data-value="2">No</p>
              		</div>
              	</div>
              	</div>

              	<div class="small-12 medium-12 large-12 columns ser search" style="margin-left: -5px; padding-top: 20px;">
              	<h2 class="sehg">
              		 <a href="#" class="submit-box" onclick="document.getElementById('devsearch').submit();">Search <span>&#8250;</span></a>
              	</h2>

              	</div>


              </div>

</div>

</div>
 </div>
 </div>


		</div>
