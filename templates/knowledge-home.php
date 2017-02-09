<h3>Latest additions</h3>
<div class="container">
  <div class="arrow left-arrow">
  	<div class="mesh-arrow"></div>
     <img src="<?php echo get_template_directory_uri() ?>/img/arrow-left-white.png" />
  </div>
  <div class="arrow right-arrow">
  	<div class="mesh-arrow"></div>
    <img src="<?php echo get_template_directory_uri() ?>/img/arrow-right-white.png" />
  </div>

  <div class="latest">
    <?php
      $args = array(
        'post_type' => array('knowledge'),
        'orderby' => 'post_title',
        'post_status'       => 'publish',
        'posts_per_page' => -1,
        'meta_query' => array(
           array(
               'key' => 'featured',
               'value' => '1',
               'compare' => '=',
           )
       )
      );

      $posts = new WP_Query( $args );
      if( $posts->have_posts() ) :
        while ( $posts->have_posts() ) :
          $posts->the_post();
    ?>
    <ul data-category="<?php echo strtolower( get_post_type() ) ?>" data-marker="<?php echo strtolower( get_field( 'marker_icon' ) ) ?>">
      <li>
        <a href="<?php the_permalink(); ?>">
        <div class="bg"></div>
        <div class="category"><?php the_field( 'marker_icon' ) ?></div>
        <div class="image-wrapper">
          <?php
            if( get_post_type() == 'knowledge' ) {
              $thumb = wp_get_attachment_image_src( get_post_thumbnail_id($post->ID), 'large' );
              $url = $thumb['0'];

            }
            else {
              $img = get_field( 'custom_background' );
              if( $img[ 'mime_type' ] == "video/mp4" ) {
                $img = get_field( 'location_map_image' );
              }

              $url = $img['url'];
            }

            echo '<img class="load-me" data-src="' . $url . '" />';
          ?>
        </div>

        <?php
          if( have_rows('slide_title', $post->ID) ):

              while( have_rows('slide_title', $post->ID) ): the_row();
        ?>
        <div class="title">

          <div class="title-row">
          <?php
            $letters = str_split( get_sub_field( 'text' ) );

            $div2 = '';
            foreach( $letters as $letter ) {
              if( $letter == ' ' ) $letter = '&nbsp;';

              $echo = '<span>' . $letter . '</span>';

              echo $echo;
              $div2 .= $echo;
            }
          ?>
          </div>
          <div class="title-row2"><?php echo $div2 ?></div>
        </div>
        <?php
            endwhile;
          endif;
        ?>
          <div class="more">MORE</div>
        </a>

      </li>
    </ul>
    <?php
        endwhile;
      endif;

      wp_reset_postdata();
    ?>
  </div>
</div>


<h3 class="cat categories-toggle">Select a category</h3>
<div class="row categories">
<?php
  global $categories;
?>
<ul class="columns small-6 medium-4 large-2 " >
  <li>
    <?php
      $i = 0;
      foreach( $categories as $key => $cat ) {
        $icon = ( $cat == '' ) ? "" : "categories-historic-buildings";
        $scat = sanitize_title( $cat );

        if( empty( $cat ) ) {
          $cat = 'Show All';
        }
echo <<< LI
<li>
<a href="#" data-filter="$scat" data-type="$key"><span class="icon"><span class="$icon" ></span></span><span class="title">$cat</span></a>
</li>
LI;
        if( ( $i + 1 ) % 6 == 0  && ( $i + 1 ) < count( $categories ) ) {
          echo '</ul><ul class="columns small-6 medium-4 large-2">';
        }

        $i++;
      }
    ?>
  </ul>
</div>
