<?php
/**
 *  The Template for displaying all single posts
 *
 * @package WordPress
 * @subpackage Twenty_Fourteen
 * @since Twenty Fourteen 1.0
 */
get_header();
?>
<div class="shadow <?php echo strtolower( get_field( 'background_shade' ) ); ?>">
    <div class="gradient"></div>
    <div class="dots"></div>
</div>

<div class="overlayed-bar row single">
    <div class="medium-4 large-4 columns hide-for-small">
    <span class="category-name">Showing <?php echo get_field( 'marker_icon' ); ?></span>
    </div>

    <div class="small-12 medium-4 large-4 columns font-title">
    </div>

    <div class="small-12 medium-4 large-4 columns switchers">

    </div>
</div>

<div class="knowledge-wrapper">
  <div style="background: rgba(0,0,0,0.4); position: relative;">
      <div style="max-width: 62.5em; margin: 0 auto; padding: 0 15px;">
        <a href="/knowledge/" data-title="Back to Knowledge" class="back-to-knowledge"><span style="font-size: 25px;line-height: 16px;vertical-align: text-top;padding-top: 1px;display: inline-block;">‹</span> Back to Knowledge</a>
        <h1 style="margin-top: 0; padding: 3px 0 0;"><?php the_title(); ?></h1>
      </div>
  </div>

  <?php
  while ( have_posts() ) : the_post();
  ?>
  <div class="table-row">
    <div class="row table-cell single-news">
    	<!-- <h1><?php the_title(); ?></h1> -->
    	<div class="column medium-4 images">
    		<?php if (has_post_thumbnail( get_the_ID() ) ): ?>
    			<?php $image = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ), 'single-post-thumbnail' ); ?>
    			<img data-src="<?php echo $image[0]; ?>" class="load-me">
        <?php else: ?>
          <img class="load-me" src="http://placehold.it/303x200">
    		<?php endif; ?>
    	</div>
    	<div class="column medium-8">
    		<div class="news-content" style="margin-bottom: -12px;">
    			<?php the_content(); ?>
    		</div>
    		<!-- <a href="/knowledge/">
    			<span class="news-back">Back</span>
    		</a> -->
        <?php require_once( 'includes/socials.php'); ?>


        <ul class="submenu leftmenu">
          <li class="item">
          </li>
        </ul>

      </div>

      <hr class="thin-line small-12 columns" />
    </div>
  </div>
</div>

<?php
  /*
   * next_post_link and prev one don't works with custom post type.
   * So I wrote a custom query to get them
   */
   $title = mysql_real_escape_string( get_the_title() );
   $marker = mysql_real_escape_string( get_field( 'marker_icon' ) );
   $query = "(SELECT 'prev' as type, id FROM $wpdb->posts INNER JOIN $wpdb->postmeta ON ( post_id = ID and meta_key = 'marker_icon' AND meta_value = '" . $marker . "') WHERE post_type = 'knowledge' AND post_status = 'publish' and post_title < '" . $title . "' AND id != " . get_the_ID() . " ORDER BY post_title DESC LIMIT 1 )
UNION
(SELECT 'next' as type, id FROM $wpdb->posts INNER JOIN $wpdb->postmeta ON ( post_id = ID and meta_key = 'marker_icon' AND meta_value = '" . $marker . "') WHERE post_type = 'knowledge' AND post_status = 'publish' and post_title > '" . $title . "' ORDER BY post_title ASC LIMIT 1 )";

  $ids = $wpdb->get_results( $query );

  $prev = $next = 0;
  foreach( $ids as $id ) {
    if( $id->type == 'prev' )
      $prev = $id->id;
    else
      $next = $id->id;
  }

?>
<div class="navigation-arrows">
  <?php if ( $prev > 0 ) : ?>
  <a class="navigation-arrow left-arrow hide-for-touch hide-me" href="<?php echo get_permalink( $prev ) ?>">
  	<img src="<?php echo get_template_directory_uri() ?>/img/arrow-left-big.png" />
  </a>
  <?php endif; ?>

  <?php if ( $next > 0 ) : ?>
  <a class="navigation-arrow right-arrow hide-for-touch hide-me" href="<?php echo get_permalink( $next ) ?>">
  	<img src="<?php echo get_template_directory_uri() ?>/img/arrow-right-big.png" />
  </a>
  <?php endif; ?>

</div>

<?php
endwhile;

wp_enqueue_style( 'single-news' );
wp_enqueue_style('fontawesome', '//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css' );

get_footer();
