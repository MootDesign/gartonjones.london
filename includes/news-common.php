<?php
function gj_get_posts( $args, $share_links = true ) {
  $news = get_posts( $args );

  foreach( $news as $id => $post ) {
    $template_type = get_field( 'choose_template', $post->ID );

    // this is for socials.php
    $GLOBALS['postid'] = $post->ID;

    if ( ! $template_type ) {
      $template_type = 'giant';
    }

    $name = ucfirst( $post->post_title );
    $class = ( $post->post_name );

    $src = $feat_image = wp_get_attachment_url( get_post_thumbnail_id($post->ID) );

    $content = get_field( 'summary_text', $post->ID );

    list( $content, $other ) = explode( "<!--more-->", $content );
    $image = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ), 'single-post-thumbnail' );

    if( ! $image ) $image = array( 'http://placehold.it/600x400' );

    $homeUrl = home_url();

    $permalink = get_permalink( $post->ID );

    $date = get_the_date( 'j F Y', $post->ID );

    $linkedIn = "https://www.linkedin.com/shareArticle?mini=true&url=" . esc_url( $permalink ) . "&title=" . $post->post_title . "&summary=&source=";

    $category = get_the_category( $post->ID )[0]->name;

    if ( $template_type == 'big_r' || $template_type == 'big_l' ) {
      $image_class = 'medium-4';
      $content_class = 'medium-8';
    } else if ( $template_type == 'small_r' || $template_type == 'small_l' ) {
      $image_class = 'medium-5';
      $content_class = 'medium-7';
    } else {
      $image_class = 'medium-12';
      $content_class = 'medium-12';
    }

    if ( $template_type == 'big_r' || $template_type == 'small_r' ) {
      $image_class .= ' medium-push-8';
      $content_class .= ' medium-pull-4';
    }

$start_li =<<< LI
<li class="$template_type" data-image="$class">
  <div class="row strip-content strips-new-content">
LI;

$image_li =<<< LI
    <div class="column $image_class images">
      <a href="$permalink" class="lazy-background" data-background-url="$image[0]"><img data-src="$image[0]" class="load-me" /></a>
    </div>
LI;

$content_li =<<< LI
    <div class="column $content_class content">
      <div class="news-content">
        <h4 class="category">$category</h4>
        <h3><a href="$permalink">$name</a></h3>
        <small>$date</small>
        <p>
          $content
        </p>
       <div class="fadeout"></div>
    </div>

  <!--
    <ul class="submenu leftmenu">
      <li class="item">
        <a href="$permalink" data-title="Read more" class="more">Read more</a>
      </li>
    </ul>
  -->
LI;

$end_li =<<< LI
  </div>
  <hr>
</li>
LI;

    // START OUTPUT
    echo $start_li;

    echo $image_li;

    echo $content_li;

    if( ! function_exists( 'gj_add_socials_share' ) ) {
        get_template_part( 'includes/socials', '' );
    } else {
      gj_add_socials_share();
    }

    echo '</div>';

    echo $end_li;
    // END OUTPUT

  }

  wp_reset_query();
}
?>
