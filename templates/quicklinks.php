<?php
/**
 * Template Name: Quick links template
 *
 * The template that let you use the features of the quick links
 */
$isiPad = (bool) stripos($_SERVER['HTTP_USER_AGENT'],'iPad');
$isAndroid = (bool ) stripos($_SERVER['HTTP_USER_AGENT'],'android');

if( $isiPad || $isAndroid ) {
    require_once( 'quicklinks-mobile.php' );
    return;
}

wp_enqueue_style('singledev-css', get_template_directory_uri() . '/css/grid.css' );
//wp_enqueue_script( 'jquery-ui-draggable', array( 'jquery-ui-core' ) );

// wp_enqueue_script('singlejs', get_template_directory_uri() . '/js/single.development.js', array(), '1.0', true );

get_header();

$for = $GLOBALS[ '_for_' ];
$office_name = ucwords( $GLOBALS[ '_where_' ] );

if( isset( $GLOBALS[ '_postcode' ] ) ) {
    $office_name = $GLOBALS[ '_postcode' ];
}

$property = @$GLOBALS[ '_type_' ];

//Posts per page & current page
define( 'POSTS_PER_PAGE', 20 );
$cpage = ( isset( $_GET[ 'show' ] ) ) ? intval( $_GET[ 'show' ] ) : 1;

global $wp_query, $gj_query;
$GLOBALS[ 'search' ] = 1;

$args = array(
  'post_type' => 'post',
  'post_status'      => 'publish',
  'offset' => POSTS_PER_PAGE * ( $cpage - 1 ),
  'posts_per_page'   => POSTS_PER_PAGE,
);

$gj_query = new WP_Query( $args );

/*
* If there are no posts I gonna show all the properties in the parent category
*/
if( ! $gj_query->have_posts() ) {

  if( isset( $GLOBALS['_postcode_' ] ) ) {
    $postcode = $GLOBALS[ '_postcode_' ];

    $offices = array(
    	'Chelsea Bridge Wharf' => 'chelseabridgewharf',
    	'Westminster' => 'westminster',
      // 'Royal Arsenal' => 'royalarsenal',
      'Nine Elms' => 'nineelms',
      'South Bank' => 'southbank'
    );

    $parent = "";
    foreach( $offices as $key => $office ) {
      $option = get_option( 'gj_' . $office . '_postcodes', '' );

      if( stripos( $option, $postcode ) !== false ) {
        $parent = $key;

        break;
      }
    }

    $GLOBALS[ '_where_' ] = $parent;
  } else if( isset( $GLOBALS['beds'] ) ) {
    unset( $GLOBALS[ 'beds' ] );
  }

  //TODO: Figure out where this option is set, and remove...
  unset( $GLOBALS[ 'postcode' ] );
  $gj_query = new WP_Query( $args );
}
?>
<style>
#grid {
  height: 75vh;
}
</style>
<div class="quicklinks-wrapper">
  <?php
    require_once( dirname( __FILE__) . '/../includes/grid.php' );
  ?>
</div>

<?php
if( ! $gj_query->have_posts() ) {
?>
<div id="notice">
    <h2>
        Currently there are no properties <?php echo ( $for == "sale" ) ? "for Sale" : "to Let" ?> in <?php echo $office_name ?>
    </h2>
</div>
<?php
}

get_footer();
