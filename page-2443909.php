<?php

/**
 * The Template for displaying all single posts
 *
 * @package WordPress
 * @subpackage Twenty_Fourteen
 * @since Twenty Fourteen 1.0
 */
 //Skip parallax?
 $skip_parallax = false;
 $view_section = isset( $_GET[ 'view' ] ) ? $_GET[ 'view' ] : 'developments';

/**
 * For the grid view
 */

// bug fix by Ilia
$gj_meta_query = array(
  'relation' => 'AND',
  array(
    'key' => 'property_of_the_week',
    'value' => 1,
    'compare' => '='
  ),

  array(
    'key' => 'status',
    'value' => 'sale',
    'compare' => '='
  )
);
// bug fix by Ilia

if( ! isset( $gj_query ) ) {
  $args = array(
    'post_type' => 'post',
    'post_status'    => 'publish',
    'posts_per_page' => -1,
    'meta_query' => $gj_meta_query,
    'paged' => $paged,
    'orderby'     => 'title',
    'order'       => 'ASC'
  );

  $grid_li = '';
  $li = '';

  $gj_query = new WP_Query( $args );
  $gj_grid = 'developments';
}

/**
* From the menu I can't use the ?view=### otherwise I'll skip the parallax
*/
if( isset( $_GET[ 'section' ] ) ) {
 $view_section = $_GET[ 'section' ];
}

wp_enqueue_style('css-developments', get_template_directory_uri() . '/css/page-developments.css' );

get_header();
$query = "SELECT p.ID, p.post_title, p.post_name, p.menu_order, t.term_id, t.name " .
          "FROM ( ( $wpdb->posts p " .

          // fixed by Ilia - need only properties of week with status 'sale'
          "INNER JOIN $wpdb->postmeta pm1 ON 
                      (pm1.post_id = p.ID) 
                      AND (pm1.meta_key='status') 
                      AND (pm1.meta_value='sale')".
          "INNER JOIN $wpdb->postmeta pm2 ON 
                      (pm2.post_id = p.ID) 
                      AND (pm2.meta_key='property_of_the_week') 
                      AND (pm2.meta_value=1)".

          "LEFT JOIN $wpdb->term_relationships rel ON rel.object_id = p.ID ) " .
          "LEFT JOIN $wpdb->term_taxonomy tax ON tax.term_taxonomy_id = rel.term_taxonomy_id ) " .
          "LEFT JOIN $wpdb->terms t ON t.term_id = tax.term_id " .
          " WHERE 
          (p.post_type = 'post') 
          AND (p.post_status = 'publish')
          ORDER BY t.name, p.menu_order, p.post_title";

$posts = $wpdb->get_results( $query, ARRAY_A );

$no_filterView = false;
?>
<script>
jQuery( 'body' ).on( 'click', '.qv-link', function() {
    _onCoverflowClick( jQuery( this ).data( 'id' ) );
});

jQuery( 'body' ).on( 'click', '.qv-enquiry', function() {
  jQuery( '#formReveal' ).foundation( 'reveal', 'open' );
  showClose( 600 );
});

jQuery( 'body' ).on( 'click', '#qvData .button-close, #formReveal .button-close', function() {
  jQuery( this ).removeClass( 'open' );

  setTimeout( function( $this ) {
    $this.closest( '.reveal-modal' ).foundation( 'reveal', 'close' );
  }, 500, jQuery( this ) );
});

var _data = {};

function _onCoverflowClick( id ) {
    var data = _coverflows[0].data[id];
    console.log('clicked id = ' + id);

    //Update the reveal data
    var $rev = jQuery( '#qvData' );

    if( data.youtube ) {
      $rev.find( '#youtube' ).attr( 'src', data.youtube );
      $rev.find( '#video' ).hide();
    } else {
      var $video = $rev.find( '#video video' );
      var source = document.createElement( 'source' );

      source.src = data.video;
      source.type = 'video/mp4';

      $video.children().remove();

      $rev.find( 'iframe' ).hide();
      $video.append( $( source ) ).show();
    }
    $rev.find( 'h1.poph1' ).html( data.title );

    $rev.foundation( 'reveal', 'open' );
    showClose( 600 );
}


</script>
<style>
#overlay-boxes>div{background:#fff;position:fixed;width:100%;height:50%;z-index:9}#overlay-boxes .box1{top:0}#overlay-boxes .box2{top:50%}

</style>
<script src="<?php echo get_template_directory_uri(); ?>/js/tour.js"></script>
<script>
var ajaxData = {
  ajaxurl: "<?php echo admin_url('admin-ajax.php'); ?>",
  nonce: "<?php echo wp_create_nonce("gjdev_nonce_field_yeah"); ?>",
  markersUrl: '<?php echo get_template_directory_uri(); ?>/img/knowledge/',
  type: 'videos'
};
</script>

<div id="overlay-boxes">
  <div class="box1"></div>
  <div class="box2"></div>
</div>
<div id="parallax-wrapper">

  <article id="developments" class="parallax size-me">
    <section class="overlayed-bar row">
        <div class="small-12 medium-8 large-6 columns switchers change-view visible right hide-for-small">
            <ul id="change-view" style="margin-top: 0;">
              <li class="text"></li>

              <li data-id="#devgrid" class="icon-1 active">
                <span>Grid</span>
                <i class="icon-grid"></i>
              </li>
              <li data-id="#coverflow, #myDiv, #myDiv-fluidwidth" class="icon-1">
                <span>Coverflow</span>
                <i class="icon-photo"></i>
              </li>
            </ul>

        </div>
    </section>
<div class="container"  align="center">
<div style="width: calc(100% - 480px);max-width: none;font-size: 31px; color: #ac9857;">New Sales Listings</div>
</div>
      <section id="" class="searchpage">
        <?php require_once( "templates/developments-view.php" ); ?>
    </section>
  </article>


</div>
<script>
</script>

<!--  Reveal  -->
<div id="qvData" class="reveal-modal" data-reveal style="min-width: 855px; width: 855px; padding: 9px">
  <iframe id="youtube" width="835" height="470" src="" frameborder="0" allowfullscreen></iframe>
  <div id="video">
    <video id="rvideo">
    </video>
  </div>
  <div id="qvdetails">
   <h1 class="poph1" style="font-size: 26px; !important"></h1>
  </div>
  <div style="clear:both;"></div>
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
</div>

<div id="formReveal" class="reveal-modal" data-reveal style="">
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
  <div class="content">
    <?php echo do_shortcode( '[gravityform id="21" title="false" ajax="true"]' ); ?>
  </div>
</div>

<script type="text/javascript">
jQuery( window ).load( function() {
  jQuery( '#overlay-boxes .box1' ).delay(800).transition( { y: '-200%' }, 800, function() { jQuery( this ).hide(); } );
  jQuery( '#overlay-boxes .box2' ).delay(800).transition( { y: '200%' }, 800, function() { jQuery( this ).hide(); } );
});
</script>

<?php
wp_reset_query();

wp_dequeue_script( 'single-developments' );
wp_dequeue_script( 'swiper' );
wp_dequeue_script( 'swiper-2' );
wp_dequeue_script( 'cycle-2' );
wp_dequeue_script( 'wp-favroite-posts' );

// wp_enqueue_script('development-script', get_template_directory_uri() . '/js/src/single/page-developments.js', array(), true );
wp_enqueue_script('development-script', get_template_directory_uri() . '/js/min/single/page-developments.min.js', array(), true );

wp_enqueue_script( 'gmap-js' );

get_footer();
