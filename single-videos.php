<?php
/**
 *  The Template for displaying all single posts
 *
 * @package WordPress
 * @subpackage Twenty_Fourteen
 * @since Twenty Fourteen 1.0
 */
get_header();

while ( have_posts() ) : the_post();
?>
  <style>
    .table-row {
      display: table;
      max-width: 835px;
      width: 100%;
      margin: auto;
      height: 90%;
    }

    .table-cell {
      display: table-cell;
      vertical-align: middle;
      min-height: 470px;
    }
    img {
      display: none;
    }
  </style>
  <img property="og:image" src="<?php echo get_field( 'custom_background' )['url'] ?>" class="attachment-post-thumbnail wp-post-image">
  <div class="table-row"><div class="table-cell">

  <h1 class="text-center"><?php the_title(); ?></h1>
  <div class="text-center">
    <a href="<?php echo get_field( 'development_page' ); ?>" target="_blank">Show more info</a><br>
    <?php require_once('includes/socials.php'); ?>
  </div>
<?php

  $youtube = get_field( 'youtube' );
  if( $youtube ) {
    echo '<iframe width="835" height="470" src="' . $youtube . '" frameborder="0" allowfullscreen="" style="min-height:300px"></iframe>';
  } else {
    $video = get_field( 'video' );
?>
    <div class="videoWrapper">
      <video controls>
        <source src="<?php echo $video['url']; ?>">
      </video>
    </div>
<?php
  }

  echo '</div></div>';

endwhile;

wp_enqueue_style( 'single-properties' );

get_footer();
