<?php
/**
 * The Template for displaying all single posts
 *
 * @package WordPress
 * @subpackage Twenty_Fourteen
 * @since Twenty Fourteen 1.0
 */

$GLOBALS['top-logo'] = 1;

$search = array(
  'beds' => @$_GET['beds'],
  'min-price' => @$_GET['min-price'],
  'max-price' => @$_GET['max-price'],
  'status' => @$_GET['status'],
  'property' => @$_GET['property'],
  'river-view' => @$_GET['river-view'],
  'office' => @$_GET['office'],
  'search' => 1,
);

setcookie( '_gj_search_fields', serialize( $search ), time() + (10 * 365 * 24 * 60 * 60), '/' );

wp_enqueue_style('single-style' );
get_header();
?>

<style>
  #overlay-boxes>div{background:#fff;position:fixed;width:100%;height:50%;z-index:9}#overlay-boxes .box1{top:0}#overlay-boxes .box2{top:50%}
</style>
<div id="overlay-boxes">
	<div class="box1"></div>
	<div class="box2"></div>
</div>

<?php
if ( ! empty( $_GET['office'] ) ) {

  $office = $_GET['office'];
  $office = str_replace(' ', '', $office);
  $office = strtolower( $office );

  $phone = get_option( 'gj_' . $office . '_tel' );
?>

<div id="call-the-office">Call <span class="InfinityNumber clickable"><?= $phone; ?></span></div>

<?php } ?>

<div class="no-properties">
      <?php
      global $gj_query, $wp_query;
      global $wpdb;

	$properties = $wpdb->get_results( str_replace('LIMIT 0, 24', '', $wp_query->request) );

	$noProperties = count( $properties );

	foreach($properties as $property) {
		$web_status = get_field('web_status', $property->ID);
		if ( $web_status == 4 || $web_status == 3 ) {
			$noProperties -= 1;
		}
	}
		
	echo $noProperties;

      ?> <?= $noProperties == 1 ? 'Property' : 'Properties'; ?> <?= ($_GET['status'] == 'sale') ? 'For Sale' : 'To Rent'; ?> <?= ($_GET['property'] != '') ? 'In ' . htmlspecialchars( ucwords( strtolower( $_GET['property'] ) ) ) : ''; ?>
</div>


<?php

require_once( 'templates/coverflow.php' );

 if (is_home()){
			if ( have_posts() ) :
				// Start the Loop.
				while ( have_posts() ) : the_post();

        $price = get_field('price');
        $pidd = get_field('p_id');

        if ($price<=80000){
          $disprice = number_format($price);
          $display = "£".$disprice." pw";
        } else {
          $disprice = number_format($price);
          $display = "£".$disprice;
        }
          $exc = substr(get_field('descriptionfull'),0,250);
        ?>
  <script>
 jQuery(document).ready(function(){
      jQuery('a').on('click','#qv<?php the_field("p_id"); ?>',function(){
        $('#menugrayout').fadeIn();
        $('#menugrayout').css('z-index','10');
        $('#quickview').css({'display':'block'});
        $('#container2, #lh2, #rh2').fadeTo(500,0.1);
        $('#qvimg').css('background-image','url(<?php echo @$imagebig[0]; ?>)');
        $('#poph1').text('<?php the_title(); ?>');
        $('#poph2').text('<?php echo $display; ?>');
        $('#popdescription').text("<?php echo $exc; ?>");
        $('#popdetails').attr('href', '<?php the_permalink(); ?>');
        $('#popfb').attr('href', 'https://facebook.com/sharer.php?u=<?php the_permalink(); ?>');
        $('#popt').attr('href', 'https://twitter.com/intent/tweet?url=<?php the_permalink(); ?>');
     });
 });

 jQuery( document ).ready( function() {
   jQuery( '#overlay-boxes .box1' ).delay(800).transition( { y: '-200%' }, 800, function() { jQuery( this ).hide(); } );
   jQuery( '#overlay-boxes .box2' ).delay(800).transition( { y: '200%' }, 800, function() { jQuery( this ).hide(); } );
 });
     </script>
     <?php
				endwhile;
			else :
				// If no content, include the "No posts found" template.
				get_template_part( 'content', 'none' );
			endif;
      }

?>
<script>
jQuery(window).load( function() {
    jQuery('#register .fake-link').click( function() {
      jQuery('#register .the-content').slideToggle();
    });
    jQuery('#register .title').click( function() {
      jQuery('#register .the-content').slideToggle();
    });
});
</script>
<?php


get_footer();
