<?php

global $page;

$is_single = isset( $GLOBALS[ '_single_dev' ] );

?>
<script>
jQuery(document).ready(function() {
    jQuery( '.ser' ).click( function() {
       jQuery('.optionsholder').fadeOut();

       $holder = jQyery( this ).find( '.optionsholder' );
       if( $holder.is( ':visible' ) ) {
       } else {
            var pos = $holder.closest( '#wording' ).position();

            $holder.css( 'top', - $holder.height() / 2 + pos.top );

            $holder.fadeIn();
       }
    });

    jQuery( '.ser .opti' ).click( function () {
       var name = jQuery( this ).closest( '.ser' ).attr( "data-field" );
       var value = jQuery( this ).attr( 'data-value' );
       jQuery( this ).closest( '.ser' ).find( '> .sehp' ).html( jQuery( this ).html() );

       jQuery( 'input[name="' + name + '"]' ).val( value );
    });


    jQuery( '.ser1 .sel1 .opti' ).click( function() {
        var val = jQuery( this ).attr( 'data-value' );

        if( val == undefined ) {
            jQuery( '.ser5 .opti' ).show();
        } else {
            jQuery( '.ser5 .opti' ).hide();
            jQuery( '.ser5 .opti.loc-' + val ).show();
            jQuery( '.ser5 .opti.show-all' ).show();
        }
    });
});
</script>

 <div class="row fullWidth mb50" id="searcher">
<div class="medium-1 large-1 columns">
&nbsp;
</div>
<div class="small-10 medium-10 large-10 columns bggold
">
<div class="row">
 <div class="small-12 medium-3 large-2 columns" id="side">
  <h1><?php the_title(); ?></h1>
    <hr class="sidesep">
        <?php  gj_add_submenu(  'Developments' ); ?>
    <hr class="sidesep">

<?php if ( get_field('subitem_1') || get_field('subitem_2') || get_field('subitem_3') || get_field('subitem_4') ) : ?>
	<ul class="submenu">
	   <?php if (get_field('subitem_1')){ ?><li><a href="<?php the_field('subitem_1_link'); ?>"><?php the_field('subitem_1'); ?></a></li><?php } ?>
	   <?php if (get_field('subitem_2')){ ?><li><a href="<?php the_field('subitem_2_link'); ?>"><?php the_field('subitem_2'); ?></a></li><?php } ?>
	   <?php if (get_field('subitem_3')){ ?><li><a href="<?php the_field('subitem_3_link'); ?>"><?php the_field('subitem_3'); ?></a></li><?php } ?>
	   <?php if (get_field('subitem_4')){ ?><li><a href="<?php the_field('subitem_4_link'); ?>"><?php the_field('subitem_4'); ?></a></li><?php } ?>
	 </ul>
	 <hr class="sidesep">
<?php endif; ?>
   <!--<ul class="subsubmenu">
   <li><a href="">Westminster</a></li>
   <li><a href="">Nine Elms - Southbank</a></li>
   <li><a href="">Royal Arsenal</a></li>
   <li><a href="">Chelsea Bridge Wharf</a></li>
 </ul>-->

 </div>
  <div class="small-12 medium-9 large-10 columns" id="wording">

 <div class="row">
 <div class="small-12 medium-12 large-12 columns content1col">
  <?php if($post->post_content=="") : ?>


<?php else : ?>

<?php the_content(); ?>

<?php endif; ?>
<div class="row mtb50">
  <form method="get" id="devsearch" action="/properties">
      <input type="hidden" name="office" value="" >
      <input type="hidden" name="development" value="<?php echo ( ! $is_single ) ? $page->post_name : ""; ?>" >
      <input type="hidden" name="beds" value="" >
      <input type="hidden" name="river-view" value="">
      <input type="hidden" name="search" value="1" >
      <input type="hidden" name="min-price" value="" >
      <input type="hidden" name="max-price" value="" >
      <input type="hidden" name="search" value="sales" >

  <div class="ser ser1" data-field="office">
  <h1 class="seh">
     <?php echo ( ! $is_single ) ? "Location" : "Development"; ?>
  </h1>
  <p class="text-center sehp"><?php echo ( ! $is_single ) ? "Select" : get_the_title(); ?></p>

<?php if( ! $is_single ) : ?>
  <div class="optionsholder sel1 hide">
  <p class="opti">All</p>
<hr>
<?php
        $args = array(
            'type'                     => 'post',
            'parent'                   => 0,
            'orderby'                  => 'name',
            'order'                    => 'ASC',
            'exclude'                  => 1, //Uncategorized
            'hide_empty'               => 0,
            'hierarchical'             => 0,
            'taxonomy'                 => 'category',

        );

        $categories = get_categories( $args );

        $p = array();
        foreach( $categories as $cat ) {
            $p[] = '<p class="opti" data-value="' . $cat->term_id . '">' . $cat->name . '</p>';
        }

        echo join( "<hr>", $p );
?>

  </div>

<?php endif; ?>

  </div>

  <div class="ser ser5" data-field="development">
  <h1 class="seh">Development</h1>
  <p class="text-center sehp">Select</p>
  <div class="optionsholder sel1 hide">
    <p class="opti show-all">All</p>

<?php
    $items = array();
//
//    foreach( $categories as $cat ) {
//        $locality = "SELECT meta_value, MAX( '$cat->term_id' ) as loc FROM $wpdb->postmeta WHERE meta_key = 'locality' AND post_id IN (SELECT post_id FROM $wpdb->postmeta WHERE meta_key = 'development' AND meta_value = '$cat->name' ) GROUP BY meta_value";
//
//        $res = $wpdb->get_results( $locality );
//
//        foreach( $res as $r ) {
//            $items[ $r->meta_value ] = $r->loc;
//        }
//    }
//
//    ksort( $items );
//
//    foreach( $items as $key => $val ) {
//        echo '<p class="opti loc-' . $val . '" data-loc="' . $val . '" data-value="' . addslashes( $key ) . '">' . $key . '</p>';
//    }
    $args = array(
        'type'                     => 'post',
//        'child_of'                 => 0,
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

        echo '<p class="opti loc-' . $val . '" data-loc="' . $val . '" data-value="' . addslashes( $cat->term_id ) . '">' . $cat->name . '</p>';
    }
?>
  </div>
  </div>

  <div class="ser ser2" data-field="max-price">
  <h1 class="seh">
     Max price
  </h1>
  <p class="text-center sehp">Select</p>
      <div class="optionsholder sel2 hide">
          <!-- <p class="text-center sehp sp1">Select</p> -->
          <?php for( $i = 5; $i < 10; $i++ ) : ?>

            <p class="opti" data-value="<?php echo $i ?>">£ &nbsp;<?php echo number_format ( $i * 100000 ) ?></p>

          <?php endfor; ?>

          <?php for( $i = 1; $i <= 15; $i++ ) : ?>

            <p class="opti" data-value="<?php echo $i * 10 ?>">£ &nbsp;<?php echo number_format ( $i * 1000000 ) ?></p>

          <?php endfor; ?>

<!-- 20.000.000 + -->
            <p class="opti" data-value="20">£ &nbsp;20,000,000 +</p>
      </div>
  </div>

  <div class="ser ser3" data-field="beds">
  <h1 class="seh">
     Beds
  </h1>
  <p class="text-center sehp">Select</p>
   <div class="optionsholder sel3 hide">
   <p class="opti">All</p>
   <hr>
   <p class="opti" data-value="1">1</p>
   <hr>
  <p class="opti" data-value="2">2</p>
   <hr>
  <p class="opti" data-value="3">3</p>
   <hr>
  <p class="opti" data-value="4">4</p>

  </div>
  </div>

  <div class="ser ser4" data-field="river-view">
  <h1 class="seh">
    River Facing Apartments
  </h1>
  <p class="text-center sehp">Select</p>
   <div class="optionsholder sel4 hide" style="top:-42px;">
   <p class="opti">Either</p>
   <hr>
   <p class="opti" data-value="1">Yes</p>
   <hr>
  <p class="opti" data-value="2">No</p>

  </div>
  </div>

  <div class="small-12 medium-12 large-2 columns ser search" style="margin-left: -5px; padding-top: 20px;">
  <h1 class="sehg">
     <a href="#" onclick="document.getElementById('devsearch').submit();">Search</a>
  </h1>

  </div>


</div>


</div>
 </div>
 </div>


</div>
</div>
<div class="medium-1 large-1 columns">
&nbsp;
</div>
    </div>
