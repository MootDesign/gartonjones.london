<?php
wp_enqueue_script( 'moot-coverflow', '/coverflow/FWDSimple3DCoverflow_uncompressed.js', array( 'jquery' ), '20131209', false );
wp_enqueue_script( 'moot-coverflow-js', get_template_directory_uri() . '/js/single/coverflow-developments.min.js', array( 'jquery' ), '20131209', false );
wp_enqueue_script( 'swiper', get_template_directory_uri() . '/js/idangerous.swiper-2.1.min.js', array( 'jquery' ), '20131209', false  );
wp_enqueue_script( 'swiper-2', get_template_directory_uri() . '/js/idangerous.swiper.3dflow.min.js', array( 'jquery' ), '20131209', false );
?>

<div id="myDiv"></div>
<div id="cover-strip"></div>


<?php
  global $gj_meta_query;// bug fix by Ilia
  $args = array(
    'post_type' => 'developments',
    'post_status'      => 'publish',
    'posts_per_page'   => -1,
  );

  // bug fix by Ilia
  if (isset($gj_meta_query) && is_array($gj_meta_query)) {
    $args['post_type'] = 'post';
    $args["meta_query"] = $gj_meta_query;
  }
  // bug fix by Ilia
//var_dump($args);die;

  $gj_query = new WP_Query( $args );
  if ( $gj_query->have_posts() ) :
?>

    <!-- coverflow data -->
    <ul id="coverflowData" style="display: none;">

      <!-- category  -->
      <ul data-cat="+ Category one">

    <?php
        // Start the Loop.
        while ( $gj_query->have_posts() ) : $gj_query->the_post();
          $img = get_field( 'custom_background' );
          echo '<!-- $img: ';
          var_dump($img);
          echo '-->';
          $img = $img['sizes']['large'];

          if( ! $img ) continue;
    ?>
          <ul>
            <li data-type="link" data-url="<?php the_permalink(); ?>"></li><?php // points to the permalink. When image clicked, data-url is executed ?>
            <li data-thumbnail-path="<?php echo $img; ?>"></li>
            <li data-thumbnail-text="">
              <div class="flowWrapper" style="float: left; width: 100%; height: auto; padding-top: 5px">
                <p class="largeLabel">
                  <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                  <span><?php echo trim_text( get_field('welcome_message', $post->ID), 20 ); ?></span>
                  <?php
                    $category = get_the_category($post->ID);
                    $category_name = $category[0]->name;
                    if ( $category_name != null ) {
                  ?>
                      <span class="category"><?php echo $category_name ?></span>
                  <?php
                    }
                  ?>
                </p>
                      <p class="flowLinks" style="display: none">
                  <ul class="options" style="display: none">
                    <li><a href="#" class="qv-link" data-id="<?php echo $i ?>">+ Quick View</a></li>
                    <li><?php if (function_exists('wpfp_link')) { wpfp_link(); } ?></li>
                    <li><a href="<?php the_permalink(); ?>">+ Full Details</a></li>
                    <li><a href="<?php the_permalink(); ?>?map=1">+ View on Map</a></li>
                  </ul>
                      </p>
                  </div>
            </li>
          </ul>
         <?php
              $i++;
        endwhile;
      ?>
        </ul>
    </ul>
<?php

  endif;

  wp_reset_query();

?>
