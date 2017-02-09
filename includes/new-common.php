<?php
function gj_get_posts( $args, $share_links = true ) {
  $news = get_posts( $args );

  foreach( $news as $id => $post ) {
    $name = ucfirst( $post->post_title );
    $class = ( $post->post_name );

    $src = $feat_image = wp_get_attachment_url( get_post_thumbnail_id($post->ID) );
   //  echo '<img class="' . $class . ' load-me" data-src="' . $src . '"/>';

    $content = apply_filters( 'the_content', $post->post_content );
    list( $content, $other ) = explode( "<!--more-->", $content );
    $image = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ), 'single-post-thumbnail' );

    if( ! $image ) $image = array( 'http://placehold.it/285x174' );

    $homeUrl = home_url();

    $permalink = get_permalink( $post->ID );
echo <<< LI
  <li data-image="$class">
   <div class="row strip-content strips-new-content">
     <h3>$name</h3>
     <div class="column medium-4 images">
       <img data-src="$image[0]" class="load-me" />
     </div>
     <div class="column medium-8">
       <div class="news-content">
         $content
         <div class="fadeout"></div>
       </div>

      <ul class="submenu leftmenu">
  			<li class="item">
  				<a href="$permalink" data-title="Read more" class="more">Read more</a>
  			</li>
  		</ul>

LI;

  // if( $share_links ) {
    $linkedIn = "https://www.linkedin.com/shareArticle?mini=true&url=" . esc_url( $permalink ) . "&title=" . $post->post_title . "&summary=&source=";

    if( ! function_exists( 'gj_add_socials_share' ) ) {
      require_once( 'socials.php' );
    } else {
      gj_add_socials_share();
    }

    echo '</div>';
    echo '</li>';

  }

  wp_reset_query();
}
?>
