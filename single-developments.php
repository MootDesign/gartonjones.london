<style type="text/css">
  .gm-style-iw+div {
    display: none;
  }
</style>
<?php
 include( ABSPATH . 'wp-admin/includes/image.php' );

/**
 *  The Template for displaying all single posts
 *
 * @package WordPress
 * @subpackage Twenty_Fourteen<!--  -->
 * @since Twenty Fourteen 1.0
 */

// Detect if we are on tablet
require_once( get_template_directory() . '/mobile.php' );

$detect = new Mobile_Detect();


//CSS & JS
$category = get_the_category()[0];
$GLOBALS['_navigation_category'] = $category->name;
$GLOBALS['_navigation_category'] = get_the_title();

//CSS & JS
wp_enqueue_style('css-developments', get_template_directory_uri() . '/css/developments3.css' );
wp_enqueue_style('ionicons', 'http://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css' );
wp_enqueue_script('cycle-2', get_template_directory_uri() . '/js/cycle2.min.js', array('jquery'), 'v2', true);

require_once( get_template_directory() . '/mobile.php' );

$GLOBALS['_navigation_class'] = 'double';
$GLOBALS['_navigation_class'] .= ' ' . $category->slug;
$GLOBALS['_navigation_secondary'] = array(
  array( 'title' => 'Home', 'link' => '#home' ),
  array( 'title' => 'Key Facts', 'link' => '#about', 'class' => 'pager', 'subitems' =>
    array(
      array(
        'title' => 'Facilities',
        'link' => '#facilities',
        'class' => 'pager',
        'id' => '1'
      ),
    ),
  ),
  array( 'title' => 'History', 'link' => '#history' ),
  array( 'title' => 'Gallery', 'link' => '#gallery' ),
  array( 'title' => 'Updates', 'link' => '#news' ),
  array( 'title' => 'Location', 'link' => '#', 'class' => 'location-map', 'data' => 'data-map="1"' ),
);
$site_plan = get_field( 'site_plan' );
if ( ! empty( $site_plan ) ) {
  array_push( $GLOBALS['_navigation_secondary'], array( 'id' => '#site-plan', 'title' => 'Site Plan', 'link' => '#', 'data' => 'data-popup="1"' ) );
}

// phone stuff
$officeObj = get_the_category()[0];

$office = str_replace('-', '', $officeObj->slug);
$office = strtolower( $office );

// there is no elephant & castle office, use the nine elms number
if ($office == 'elephantcastle') {
  $office = 'nineelms';
}
$phone = get_option( 'gj_' . $office . '_tel' );

$officeName = $officeObj->name;

// endof phone stuff

get_header();
$post_cat = get_the_category( get_the_ID() );
$cat_name = $post_cat[0]->name;
$cat_slug = $post_cat[0]->slug;
$post_cat = $post_cat[0]->term_id;
?>

<script>
  jQuery(window).load( function() {
    if ( jQuery( '#only-search-menu' ).length > 0 ) {
      if ( jQuery( '#only-search-menu a' ).data('value') == 'sale' ) {
        // remove lettings from form
        jQuery( '.gchoice_14_6_1' ).remove();
      } else {
        // remove sales 
        jQuery( '.gchoice_14_6_0' ).remove();
      }
    }
  });
</script>
<div id="site-plan" class="close-me popup">
  <div class="button-close" style="right: -22px; top: -22px;">
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
   <img data-src="<?php echo $site_plan ?>" class="load-me" />
</div>
<div id="location-map" class="close-me">
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
  <div id="mapholder" data-latitude="<?php echo get_field( 'gmap_latitude' ) ?>" data-longitude="<?php echo get_field( 'gmap_longitude' ); ?>">
  </div>
  <span class="map-info">
    <div class="gmap-tooltip">
        <?php
          $img = get_field( 'location_map_image' );
          echo '<img data-src="' . $img . '" class="load-me" />';
        ?>
          <h1 style="clear: left;"><?php the_title(); ?></h1>
          <?php
          if (!$detect->isMobile()) { 
            the_field( 'about_message' );
            echo '<br />';
          }
          ?>
          <p>
            <?php
              $description = strtolower( get_field( 'form_description' ) );
              $pipe = ( $description == 'sales' || $description == 'lettings' ) ? "" : "|";
            ?>
            View All Properties
            <?php if( strpos( $description, 'sales' ) !== false ) : ?>
              <a href="<?php echo home_url( '/properties/?status=sale&search=1&title=' . str_replace( ' ', '+', get_the_title() ) ) ?>" rel="nofollow">
              For Sale</a>
            <?php endif; ?> <?php echo $pipe ?>
            <?php if( strpos( $description, 'lettings' ) !== false ) : ?>
              <a href="<?php echo home_url( '/properties/?status=let&search=1&title=' . str_replace( ' ', '+', get_the_title() ) ) ?>" rel="nofollow">To Rent</a>
            <?php endif; ?>
          </p>
    </div>
  </span>
  <div class="the-list">
    <h2>Other Developments Include</h2>
    <?php
      $i = 0;
      /**
       * To improve performances, and so reduce the queries' numbers
       * I can't use "standard" wp function as get_posts et simila..
       * Because otherwise I should call for each post the get_the_category
       * function..
       * So I'm gonna write a custom sql query with all the fields that I need
       */
      $query = "SELECT p.ID, p.post_title, p.post_name, p.menu_order, t.term_id, t.name " .
                "FROM ( ( $wpdb->posts p " .
                "LEFT JOIN $wpdb->term_relationships rel ON rel.object_id = p.ID ) " .
                "LEFT JOIN $wpdb->term_taxonomy tax ON tax.term_taxonomy_id = rel.term_taxonomy_id ) " .
                "LEFT JOIN $wpdb->terms t ON t.term_id = tax.term_id " .
                " WHERE p.post_type = 'developments' AND p.post_status = 'publish' ORDER BY p.post_title, p.menu_order, t.name";
      $posts = $wpdb->get_results( $query, ARRAY_A );
    ?>
      <?php
          //Array containing all the proprties for the current categories
          $developments_in = array();
          //This array will contain the developments that belongs to the other categories
          $developments_others = array();
          $links = array();
          foreach( $posts as $post ):
            if( empty( $post[ 'term_id' ] ) ) continue;
            if( $post[ 'term_id' ] != $post_cat ) {
              $developments_others[] = $post;
              continue;
            }
            $developments_in[] = $post;
            $links[] = '<a href="' . get_permalink( $post[ 'ID' ] ). '">' . $post[ 'post_title' ] . '</a>';
          endforeach;
          echo join( ' | ', $links );
          wp_reset_query();
        // endif;
         //Append the others at the end of current developments
          $posts = array_merge( $developments_in, $developments_others );
          $developments_in = array();
          $developments_others = array();
       ?>
  </div>
</div>
<?php
$detect = new Mobile_Detect();
// developments Desktop
if ( ! $detect->isTablet() && ! $detect->isMobile() ) :
 ?>
<!-- Facilities bg images -->
<div id="facilities-bg">
  <img class="first" />
  <img class="second" />
</div>
<!-- Facilities tooltip -->
<div id="facilities-tooltip">
  <video id="video-tip" loop autoplay muted>
  </video>
  <img id="image-tip" />
  <span></span>
</div>
<article class="parallax">
    <div class="shadow <?php echo strtolower( get_field( 'background_shade' ) ); ?>">
        <div class="gradient"></div>
        <div class="dots"></div>
    </div>
    <div id="register">
       <div class="title">
            <img src="<?php echo get_template_directory_uri() ?>/img/pigeon.png" class="pigeon" />
        </div>
        <div class="the-content">
            <?php
              $description = strtolower( get_field( 'form_description' ) );
             if( $description == 'sales' ) { 

          $description = "Sales";

        ?><h3>Available <?php echo $description ?> Properties within <?php the_title() ?></h3>
        <?php echo do_shortcode( '[gravityform id="40" title="false" description="false" ajax="true" tabindex="1000"]' );
        }

        elseif( $description == 'lettings' ) { $description = "Lettings";?>
        <h3>Available <?php echo $description ?> Properties within <?php the_title() ?></h3>
        <?php echo do_shortcode( '[gravityform id="42" title="false" description="false" ajax="true" tabindex="1000"]' );
        }

        else { 

          $description = "Sales or Lettings";?>

          <h3>Available <?php echo $description ?> Properties within <?php the_title() ?></h3>
        <?php echo do_shortcode( '[gravityform id="29" title="false" description="false" ajax="true" tabindex="1000"]' );
        }
        ?>
            <span class="disclaimer">We do not share the information you provide with any third parties.</span>
        </div>
    </div>
    <!-- Do not delete this -->
    <section id="dots" style="display: none">
        <ul>
            <li class="active class-home">
               <span class="circle"></span>
                <span class="title">
                    Home
                </span>
            </li>
            <li class="class-about">
               <span class="circle"></span>
                <span class="title">
                    Facilities
                </span>
            </li>
            <li class="class-history">
               <span class="circle"></span>
                <span class="title">
                    History
                </span>
            </li>
            <li class="class-gallery">
               <span class="circle"></span>
                <span class="title">
                    Gallery
                </span>
            </li>
            <li class="class-news">
               <span class="circle"></span>
                <span class="title">
                    News
                </span>
            </li>
            <li class="class-devview">
               <span class="circle"></span>
                <span class="title">
                    Contact
                </span>
            </li>
            <li class="class-worth">
               <span class="circle"></span>
                <span class="title">
                    Worth
                </span>
            </li>
        </ul>
    </section>
    <section id="parallax" >
    <div id="home" class="content ">
      <div class="the-title">
      <?php 
        if ($office == "westminster") { $officeName = "WESTMINSTER & ST JAMES'S"; } 
        if ($office == "nineelms") { $officeName = "NINE ELMS & VAUXHALL"; } 
        if ($officeName == "Grosvenor Waterside") { $officeName = "Victoria & Pimlico"; $phone = "020 7730 5007"; $getOnlyOffice = 'victoria and pimlico'; } 
        ?>
          <div class="hide-on-small text-center developments-phone-number">
            Call <?= $officeName ?> <span class="InfinityNumber clickable" style="font-size: 20px;">&nbsp;<?= $phone; ?></span>
          </div>
          <h1><?php the_title(); ?></h1>
          <div class="text center-me">
            <div class="animated-text text-center">
 <?php
      $re = "/((?<=<p>).+?(?=<\\/p>))/im"; 
      $str = get_field('welcome_message'); 
       
      preg_match_all($re, $str, $matches);
    foreach( $matches[0] as $match ) {
      echo '<div>';
            $words = explode( " ", $match );
             $big = false;
             $small = false;
             foreach( $words as $word ) {
               // print_r( $word );
               // die();
               $oword = $word;
               if( stripos( $word, "<strong>" ) !== false ) {
                 $big = true;
               }
               if( stripos( $word, "<em>" ) !== false ) {
                 $small = true;
               }
               $word = strip_tags( $word );
               $word = str_replace( '/>', '', $word );
               // $word = htmlspecialchars( $word );
               $is_special = false;
               $letters = str_split_unicode( $word );
               $class = "";
               if( $big !== false ) $class = "big";
               if( $small !== false ) $class = "small";
               echo '<span class="' . $class . '">';
               $char = "";
               foreach( $letters as $letter ) {
                 $char .= $letter;
                 if( $letter == "&" ) $is_special = true;
                 if( $is_special && $letter == ";" ) $is_special = false;
                 if( $is_special ) {
                   continue;
                 }
                 echo '<span>' . $char . '</span>';
                 $char = "";
               }
               echo '</span><span>&nbsp;</span>';
               if( stripos( $oword, "</strong>" ) !== false ) {
                 $big = false;
               }
               if( stripos( $oword, "</em>" ) !== false ) {
                 $small = false;
               }
             }
      echo '</div>';
         }
 ?>
                 </div>
            </div>
             <a href="#" data-popup="1" data-id="#search-popup">
               <div class="sub-title circle-line">SEARCH CURRENT AVAILABILITY</div>
             </a>
        </div>
      <?php if( $category->term_id == 461 ) : ?>
        <div id="bus">
          <a href="#" class="to-worth slide" data-popup="1" data-id="#worth-popup">
            <img src="<?php echo get_template_directory_uri() ?>/img/parallax/bus-version-3.png" class="bus" />
            <img src="<?php echo get_template_directory_uri() ?>/img/parallax/rent.png" alt="" class="text-rent" />
            <img src="<?php echo get_template_directory_uri() ?>/img/parallax/sell.png" alt="" class="text-sell" />
            <img src="<?php echo get_template_directory_uri() ?>/img/parallax/click-here.png" alt="" class="text-click" />
            <div class="slideshow-wrapper">
              <div class="cycle-slideshow">
                <img src="<?php echo get_template_directory_uri() ?>/img/parallax/buldog1.png" alt="" />
                <img src="<?php echo get_template_directory_uri() ?>/img/parallax/buldog2.png" alt="" />
              </div>
           </div>
          </a>
        </div>
       <style>
         .show-more {
           display: none !important;
         }
       </style>
      <?php else: ?>
         <div class="mind-the-gap">
           <img src="<?php echo get_template_directory_uri() ?>/img/parallax/mind-the-gap.png" alt="" />
         </div>
        <div id="tube">
          <img src="<?php echo get_template_directory_uri() ?>/img/parallax/the-tube-center-2.jpg" class="tube" data-width="3149" />
          <a href="#devview" class="to-developments"></a>
        </div>
       <div id="timetable">
         <div class="flip-container" ontouchstart="this.classList.toggle('hover');">
           <div class="flipper">
             <div class="front">
             <!-- front content -->
               <img src="<?php echo get_template_directory_uri(); ?>/img/parallax/timetable-v2.png" class="" />
               <ul>
                 <li class="first-text"><a href="#" class="to-worth slide" data-popup="1" data-id="#worth-popup">*** VALUE MY PROPERTY ***</a></li>
                 <li class="second-text"><a href="#" class="to-worth slide" data-popup="1" data-id="#worth-popup">*** VALUE MY PROPERTY ***</a></li>
                 <li class="click-here"><a href="#" class="to-worth slide" data-popup="1" data-id="#worth-popup">Click Here</a></li>
               </ul>
               <span class="clock"></span>
             </div>
           </div>
         </div>
       </div>
      <?php endif; ?>
    </div>
    
    <div id="about" class="content no-search no-title no-backtop">
           <div class="the-about-content">
           <div id="images" class="">
    <?php
            $images = get_field( 'about_images' );
            if( $images ):
                $id = 0;
                $current = " current ";
               
               foreach( $images as $image ) :
                    $img =  wp_get_attachment_image_src( $image[ 'id' ], 'full' );
                    $big = $img[0];
                    $class = $image[ 'caption' ];
    ?>
                    <div class="image image-<?php echo $id ?> <?php echo $class ?>" style="<?php echo $image[ 'title' ] ?>" data-alt="<?php echo $image['alt'] ?>" data-pos="<?php echo $image[ 'title' ] ?>">
                        <img class="load-me" data-src="<?php echo $big ?>" data-big="<?php echo $big ?>" />
    <?php
                    echo '</div>';
                    $id++;
                    $current = "";
                endforeach;
            endif;
    ?>
            </div>
            <div class="slides">
                <div class="slide">
                    <div class="slide-content keyfacts row">
                        <div class="scrollable size-me">
                            <div class="page-first active page show">
                               <div class="the-strips">
                                 <ul>
                               <?php
                                if( have_rows('key_facts', get_the_ID()) ):
                                  while( have_rows( 'key_facts' ) ): the_row();
                                    while( have_rows( 'facts' ) ): the_row();
                                  $title = get_sub_field( 'categories' );
                                  $content = get_sub_field( 'content' );
                                  $images = get_sub_field( 'prev_images' );
                                  $array = array();
                                  if( ! is_array( $images ) ) $images = array();
                                  foreach( $images as $image ) {
                                    $array[] = '<img data-src="' . $image[ 'url' ] . '" class="load-me move-me" data-alt="' . $image['alt'] . '" style="' . $image[ 'title' ] . '" />';
                                  }
                                  $pre_images = join( "", $array );
                                  $images = get_sub_field( 'next_images' );
                                  $images = array();
                                  foreach( $images as $image ) {
                                    $array[] = '<img data-src="' . $image[ 'url' ] . '" class="load-me move-me" data-alt="' . $image['alt'] . '" style="' . $image[ 'title' ] . '" />';
                                  }
                                  $next_images = join( "", $array );
echo <<< LI
<li>
  $pre_images
<a href="#">
  <div class="strip-content">
    <div class="the-content">
      <h4>{$title}</h4>
      {$content}
    </div>
  </div>
</a>
  $next_images
</li>
LI;
                                    $h3 = "";
                                    endwhile;
                                  endwhile;
                                endif;
                               ?>
                        </ul>
                      </div>
                            </div>
                            <div class="page-second page to-screen center-me">
                              <table class="facilities">
                                <tr>
                              <?php
                                $i = 0;
                                if( have_rows('facilities', get_the_ID()) ):
                                    while( have_rows( 'facilities' ) ): the_row();
                                        $icon = get_sub_field('icon' );
                                        $templateUrl = get_template_directory_uri();
                                        $title = get_sub_field('title' );
                                        $image = get_sub_field('image_video');
                                        $tip_text = get_sub_field('tooltip-text');
                                        $url = $image['url'];
                                        $video = 0;
                                        if( $image['mime_type'] == 'video/mp4' ) {
                                          $media = get_attached_media( $image['mime_type'], get_the_ID() );
                                          foreach( $media as $m ) {
                                            $url = $m->guid;
                                          }
                                          $video = 1;
                                        }
echo <<< DIV
<td class="" data-src="{$url}" data-video="{$video}">
  <span class="icon facilities"><img src="$templateUrl/img/facts/$icon.png" /></span>
  <span class="title">$title</span>
  <span class="tooltip-text" style="display: none">$tip_text</span>
</td>
DIV;
                                      ++$i;
                                      if( ( $i % 4 ) == 0 ) {
                                        echo '</tr><tr>';
                                      }
                                    endwhile;
                                endif;
                                ?>
                                </tr>
                              </table>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>

  <div id="history" class="content no-search no-title has-parallax no-backtop">
    <div class="the-strips">
      <ul>
        <?php
         if( have_rows('history', get_the_ID()) ):
           $titles = array( '%title%, an Overview', 'A History of %title%%extra%', 'Living & Investing In %title%', '%title%%extra% & Beyond' );
           $row = 0;
           while( have_rows( 'history' ) ): the_row();
             while( have_rows( 'items' ) ): the_row();
           $content = get_sub_field( 'history' );
           $images = get_sub_field( 'prev_images' );
           if( ! is_array( $images ) ) $images = array();
           $array = array();
           foreach( $images as $image ) {
             $array[] = '<img data-src="' . $image[ 'url' ] . '" class="load-me move-me" data-alt="' . $image['alt'] . '" style="' . $image[ 'title' ] . '" />';
           }
           $pre_images = join( "", $array );
           $images = get_sub_field( 'next_images' );
           if( ! is_array( $images ) ) $images = array();
           $array = array();
           foreach( $images as $image ) {
             $array[] = '<img data-src="' . $image[ 'url' ] . '" class="load-me move-me" data-alt="' . $image['alt'] . '" style="' . $image[ 'title' ] . '" />';
           }
           $next_images = join( "", $array );
           //Check if I have to use a the default title
           if( stripos( $content, '<h3>' ) === FALSE ) {
             $title = $titles[ $row ];
             //Extra title info?
             $extra = "";
             if( stripos( $content, '<h4>' ) === FALSE ) {
             } else {
               preg_match('/<h4>(.*)<\/h4>/', $content, $extra);
               $extra = $extra[1];
               $content = preg_replace('/<h4>(.*)<\/h4>/', '', $content);
             }
             $title = str_replace( '%extra%', $extra, $title );
             $title = str_replace( '%title%', get_the_title(), $title );
             $content = '<h3>' . $title . '</h3>' . $content;
           }
           if( ! isset( $h3 ) ) $h3 = "";
echo <<< LI
  <li>$pre_images<a href="#"><div class="strip-content">{$h3}<div class="the-content"> {$content}</div></div></a>$next_images</li>
LI;
             $h3 = "";
             $row++;
             endwhile;
           endwhile;
         endif;
        ?>
      </ul>
    </div>
  </div>

  <div id="gallery" class="content">
    <h2 class="the-title">
        <?php the_title(); ?>
    </h2>
     <a href="#" data-popup="1" data-id="#search-popup" class="circle-line sub-title" style="margin-top: 70px; display: inline-block; font-size: 31px; position: relative; z-index: 8;">
      SEARCH CURRENT AVAILABILITY
    </a>
       
       <div class="arrows">
           <div class="arrow-left arrow"><img src="<?php echo get_template_directory_uri() ?>/img/arrow-left-big.png" /></div>
           <div class="arrow-right arrow"><img src="<?php echo get_template_directory_uri() ?>/img/arrow-right-big.png" /></div>
       </div>
       <div class="images">
    <?php
       $images = get_field( 'gallery' );
       $desc = array();
       if( $images ):
           $id = 0;
           $current = " current ";
           foreach( $images as $image ) :
               $dot = "";
               if( substr( $image[ 'mime_type' ], 0, 6 ) != "video/" ) {
                   $img =  wp_get_attachment_image_src( $image[ 'id' ], 'post-thumbnail' );
                   $img = $img[0];
                   $big =  wp_get_attachment_image_src( $image[ 'id' ], 'full' );
                   $big = $big[0];
               } else {
                   $img = $image[ 'caption' ];
                   $big = $img . '" data-video="' . $image[ 'url' ];
$dot = <<< DOT
         <span id="" class="tdot">
             <span class="icon">&#9658;</span>
             <span class="dot tpulse"></span>
         </span>
DOT;
               }
               $desc[$id] = $image['description'];
               echo '<div class="image image-' . $id . $current . '">';
               echo $dot;
               echo '<img class="load-me load-later" data-src="' . $img . '" data-big="' . $big . '" data-id="' . $id . '" />';
               echo '</div>';
               $id++;
               $current = " after after-" . $id;
           endforeach;
       endif;
       ?>
       <div id="image-desc">
         <ul>
         <?php
         $class = 'active';
         foreach( $desc as $id => $d ) {
           echo '<li id="image-desc-' . $id . '" class="' . $class . '">' . $d . '</li>';
           $class = '';
         }
          ?>
        </ul>
       </div>
     </div>
  </div>

  <div id="news" class="content no-search no-title no-backtop">
    <div id="bg">
      <?php
       $li = "";
       $args = array(
         'post_type' => 'news',
         'orderby' => 'post_title',
         'post_status'       => 'publish',
         'posts_per_page' => -1,
         'meta_query' => array(
            array(
                'key' => 'development',
                'value' => get_the_ID(),
                'compare' => '=',
            )
        )
       );
       $news = get_posts( $args );
       foreach( $news as $post ) {
         $name = ucfirst( $post->post_title );
         $class = ( $post->post_name );
         $src = $feat_image = wp_get_attachment_url( get_post_thumbnail_id( ) );
         echo '<img class="' . $class . ' load-me" data-src="' . $src . '"/>';
         $content = apply_filters( 'the_content', $post->post_content );
         list( $content, $other ) = explode( "<!--more-->", $content );
         $image = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ), 'single-post-thumbnail' );
         $homeUrl = home_url();
         $id1 = get_field('interested_post_1')->ID;
         $link1 = get_permalink( $id1 );
         $feat_image1 = wp_get_attachment_url( get_post_thumbnail_id( $id1 ) );
         $title1 = get_the_title( $id1 );
         $id2 = get_field('interested_post_2')->ID;
         $link2 = get_permalink( $id2 );
         $feat_image2 = wp_get_attachment_url( get_post_thumbnail_id( $id2 ) );
         $title2 = get_the_title( $id2 );
         $id3 = get_field('interested_post_3')->ID;
         $link3 = get_permalink( $id3 );
         $feat_image3 = wp_get_attachment_url( get_post_thumbnail_id( $id3 ) );
         $title3 = get_the_title( $id3 );
$li .= <<< LI
<li data-image="$class">
<div class="row strip-content strips-new-content">
 <h3>$name</h3>
 <div class="column medium-4 images">
   <img data-src="$image[0]" class="load-me" />
 </div>
 <div class="column medium-8">
   <div class="news-content">
     $content
   </div>
   <div class="hide-content">
      $other
      <hr class="thin-line" />
      <div>
        <div class="related">
          <h2>You may also be interested in</h2>
          <ul class="grid-view">
            <li>
              <a href="$link1">
                <div class="image-wrapper">
                  <img class="load-me" data-src="$feat_image1" alt="">
                </div>
                <h3>$title1</h3>
              </a>
              <a href="$link1">Read more</a>
            </li>
            <li>
              <a href="$link2">
                <div class="image-wrapper">
                  <img class="load-me" data-src="$feat_image2" alt="">
                </div>
                <h3>$title2</h3>
              </a>
              <a href="$link2">Read more</a>
            </li>
            <li>
              <a href="$link3">
                <div class="image-wrapper">
                  <img class="load-me" data-src="$feat_image3" alt="">
                </div>
                <h3>$title3</h3>
              </a>
              <a href="$link3">Read more</a>
            </li>
          </ul>
        </div>
      </div>
   </div>
   <a href="#" class="show-content">
     <span class="news-read-more">Read more</span>
   </a>
   <div class="socials" style="clear: both; float: left; margin-top: 5px;">
   <a href="#" class="share">Share +</a>
    <ul class="active">
        <li><a target="_blank" href="https://www.linkedin.com/shareArticle?mini=true&url={$homeUrl}&title={$name}&summary=&source="><i class="fa fa-linkedin-square"></i></a></li>
        <li><a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u={$homeUrl}?view={$post->ID}"><i class="fa fa-facebook-official"></i></a></li>
        <li><a target="_blank" href="https://twitter.com/home?status={$homeUrl}?view={$post->ID}"><i class="fa fa-twitter-square"></i></a></li>
        <!-- <li><a href="http://instagram.com"><i class="fa fa-instagram"></i></a></li> -->
        <li><a href="mailto:?&amp;subject=Garton Jones&amp;body={$homeUrl}/news?view={$post->ID}"><i class="fa fa-envelope"></i></a></li>
    </ul>
   </div>
 </div>
</div>
</li>
LI;
       }
       wp_reset_query();
      ?>
    </div>
     <div id="strips" class="the-strips">
       <ul id="news-list">
         <li class="page-title"><h2><?php the_title(); ?></h2></li>
         <?php
           echo $li;
         ?>
       </ul>
     </div>
  </div>
 <div class="empty"></div>
  </section>
</article>

<!-- Gallery big item -->
<div id="big-shade"></div>

<div class="button-close open">
    <div class="circle-arc">
      <svg width="100%" viewBox="0 0 100 100">
        <path d="M 50 50 m -43 0 a 43 43 0 1 1 86 0 a 43 43 0 1 1 -86 0"></path>
      </svg>
    </div>
    <div class="bg open">
      <div></div>
    </div>
    <div class="line l-0"></div>
    <div class="line l-1"></div>
  </div>

<div id="big-controls" class="arrows">
    <div class="arrow-left arrow"><img src="<?php echo get_template_directory_uri() ?>/img/arrow-left-big.png" /></div>
    <div class="arrow-right arrow"><img src="<?php echo get_template_directory_uri() ?>/img/arrow-right-big.png" /></div>
</div>

<!-- Search -->
<?php
  wp_reset_query();
  $sbg = get_field( 'search_background' );
  $url = $sbg[ 'url' ];
  $style = "style=\"background-image: url('" . $url . "' )\"";
  $class = "";
  $video = "";

  if( $sbg[ 'mime_type' ] == "video/mp4" ) :
    $style = "";

$video =<<< VIDEO
  <div id="search-video" class="hide-for-small video-full">
    <video id="video-search" loop class="load-me" data-src="$url">
    </video>
  </div>
VIDEO;

  endif;
  //Second image?
  $second = get_field( 'search_box_right_image' );
  $rightImage = "";
  if( $second ) {
    $class = "left-image";
    $rightImage = '<img data-src="' . $second['url'] . '" class="right-image load-me" />';
  }
?>

<?php
// developments Mobile
elseif ( $detect->isMobile() && ! $detect->isTablet() ) :
wp_enqueue_style( 'mobile-developments' );
?>

<div id="overlay-boxes">
  <div class="box1"></div>
  <div class="box2"></div>
</div>

<div id="mobile-developments">
  <div class="shadow <?php echo strtolower( get_field( 'background_shade' ) ); ?>"></div>
  <div id="pages">

    <div id="home" style="background: url( '<?php echo get_sub_field( 'tablet_background' )['url']; ?>' ); padding: 0 15px;">
      <article alt="2" class="show-me <?php echo $class; ?>">
      <?php if ($officeName == "Westminster") { $newofficename = "westminster & st james's"; }
            if ($officeName == "Nine Elms") { $newofficename = "nine elms & vauxhall"; }
            if ($officeName == "Grosvenor Waterside") { $newofficename = "victoria & pimlico"; $phone = "020 7730 5007"; } ?>
        <div class="text-center" style="font-size: 20px; text-transform: uppercase; margin-bottom: 20px; background: rgba(0,0,0,0.85); position: fixed; width: 100%;   left: 0; top: 72px; margin-top: 0; padding: 10px 0; z-index: 3;">
          Call <?php if ($newofficename) { echo $newofficename; } else { echo $officeName; } ?> <br><span class="InfinityNumber clickable"><?= $phone; ?></span>
        </div>

        <h1 style="padding-top: 60px;"><?php the_title(); ?></h1>
        <div class="main">
          <div id="home-2" class="content">
            <div class="the-title">
              <div class="text center-me welcome-message">
 <?php
                echo get_field( 'welcome_message');
 ?>
              </div>
              <a href="#" data-popup="1" data-id="#search-popup" class="search-availability">
                <div class="sub-title circle-line">SEARCH CURRENT AVAILABILITY</div>
              </a>
              <a href="#" class="mobile-buttons" data-popup="1" data-id="#quick-request" onclick="showPopup('quick-request');showClose( 500, jQuery( '#quick-request' ) );">Quick Request</a>
              <a href="#" class="mobile-buttons" data-popup="1" data-id="#worth-popup" onclick="showPopup('worth-popup');showClose( 500, jQuery( '#worth-popup' ) );">
                Value My Property
              </a>

              <a href="#" data-popup="1" class="mobile-view-location" data-id="0" data-map="1">View Location</a>
              
            </div>
          </div>
        </div>
      </article>
    </div>

    <div id="about" style="margin-bottom: 0;">
      <article alt="2" class="show-me $class">
        <div class="main">
          <h2 style="padding-left: 15px; font-size: 32px; margin-bottom: 5px; padding-bottom: 4px; color: #ac9857; border-bottom: 1px solid #ac9857;">
            Key Facts
          </h2>
         <div class="the-about-content">
            <div class="slides">
                <div class="slide">
                    <div class="slide-content keyfacts row">
                        <div>
                            <div class="page-first active page show">
                           <div class="the-strips">
                             <ul>
                               <?php
                                if( have_rows('key_facts', get_the_ID()) ):
                                  while( have_rows( 'key_facts' ) ): the_row();
                                    while( have_rows( 'facts' ) ): the_row();
                                  $title = get_sub_field( 'categories' );
                                  $content = get_sub_field( 'content' );
echo <<< LI
<li>
  <div class="strip-content">
    <div class="the-content">
      <h4>{$title}</h4>
      {$content}
    </div>
  </div>
</li>
LI;
                                    $h3 = "";
                                    endwhile;
                                  endwhile;
                                endif;
                               ?>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>

  <?php if( have_rows('facilities', get_the_ID()) ): // show the facilities only if we have one ?>
    <div id="facilities" style="margin-bottom: 20px; margin-top: 0;">
      <div class="page to-screen center-me">
        <h2 style="padding-left: 15px; font-size: 32px; margin-bottom: 10px; padding-bottom: 4px; color: #ac9857; border-bottom: 1px solid #ac9857;">
          Facilities
        </h2>
        <table class="facilities">
          <tr>
        <?php
          $i = 0;
          while( have_rows( 'facilities' ) ): the_row();
              $icon = get_sub_field('icon' );
              $templateUrl = get_template_directory_uri();
              $title = get_sub_field('title' );
              $image = get_sub_field('image_video');
              $tip_text = get_sub_field('tooltip-text');
              $url = $image['url'];
              $video = 0;
              if( $image['mime_type'] == 'video/mp4' ) {
                $media = get_attached_media( $image['mime_type'], get_the_ID() );
                foreach( $media as $m ) {
                  $url = $m->guid;
                }
                $video = 1;
              }
echo <<< DIV
<td class="" data-src="{$url}" data-video="{$video}">
<span class="icon facilities"><img src="$templateUrl/img/facts/$icon.png" /></span>
<span class="title">$title</span>
<span class="tooltip-text" style="display: none">$tip_text</span>
</td>
DIV;
              ++$i;
              if( ( $i % 1 ) == 0 ) {
                echo '</tr><tr>';
              }
            endwhile;
          ?>
          </tr>
        </table>
      </div>
    </div>
  <?php endif; ?>

    <div id="history" style="margin-top: 20px; margin-bottom: 15px;">
      <article class="show-me $class">
        <h2 style="padding-left: 15px; font-size: 32px; margin-bottom: 5px; padding-bottom: 4px; color: #ac9857; border-bottom: 1px solid #ac9857;">
          History
        </h2>
        <div class="main">
         <div id="history" class="content no-search no-title has-parallax no-backtop">
             <div class="the-strips">
               <ul>
                 <?php
                  if( have_rows('history', get_the_ID()) ):
                    $titles = array( '%title%, an Overview', 'A History of %title%%extra%', 'Living & Investing In %title%', '%title%%extra% & Beyond' );
                    $row = 0;
                    while( have_rows( 'history' ) ): the_row();
                      while( have_rows( 'items' ) ): the_row();
                    $content = get_sub_field( 'history' );
                    //Check if I have to use a the default title
                    if( stripos( $content, '<h3>' ) === FALSE ) {
                      $title = $titles[ $row ];
                      //Extra title info?
                      $extra = "";
                      if( stripos( $content, '<h4>' ) === FALSE ) {
                      } else {
                        preg_match('/<h4>(.*)<\/h4>/', $content, $extra);
                        $extra = $extra[1];
                        $content = preg_replace('/<h4>(.*)<\/h4>/', '', $content);
                      }
                      $title = str_replace( '%extra%', $extra, $title );
                      $title = str_replace( '%title%', get_the_title(), $title );
                      $content = '<h3>' . $title . '</h3>' . $content;
                    }
                    if( ! isset( $h3 ) ) $h3 = "";
echo <<< LI
 <li><div class="strip-content">{$h3}<div class="the-content"> {$content}</div></div></li>
LI;
                      $h3 = "";
                      $row++;
                      endwhile;
                    endwhile;
                  endif;
                 ?>
               </ul>
             </div>
           </div>
        </div>
      </article>
    </div>

    <div id="gallery" style="margin-top: 0px; margin-bottom: 0;">
      <h2 style="padding-left: 15px; font-size: 32px; margin-bottom: 5px; padding-bottom: 4px; color: #ac9857; border-bottom: 1px solid #ac9857;">
        Gallery
      </h2>
      <div id="galleries" class="content">
       <div class="images">
    <?php
       $images = get_field( 'gallery' );
       $desc = array();
       if( $images ):
           $id = 0;
           $current = " current ";
           foreach( $images as $image ) :
               $dot = "";
               if( substr( $image[ 'mime_type' ], 0, 6 ) != "video/" ) {
                 $img =  wp_get_attachment_image_src( $image[ 'id' ], 'post-thumbnail' );
                 $img = $img[0];
                 $big =  wp_get_attachment_image_src( $image[ 'id' ], 'full' );
                 $big = $big[0];
               } else {
                 $img = $image[ 'caption' ];
                 $big = $img . '" data-video="' . $image[ 'url' ];
$dot = <<< DOT
       <span id="" class="tdot">
           <span class="icon">&#9658;</span>
           <span class="dot tpulse"></span>
       </span>
DOT;
             }
             $desc[$id] = $image['description'];
             echo '<div class="image image-' . $id . $current . '">';
             echo $dot;
             echo '<img class="load-me" data-src="' . $img . '" data-big="' . $big . '" data-id="' . $id . '" />';
             
            if ($image['description']) {
              echo '<p>' . $image['description'] . '</p>';
            }

             echo '</div>';
             $id++;
             $current = " after after-" . $id;
         endforeach;
       endif;
       ?>
       </div>
      </div>
    </div>

    <div id="updates" style="margin-top: 0; padding-bottom: 20px;">
      <h2 style="padding-left: 15px; font-size: 32px; margin-bottom: 5px; padding-bottom: 4px; color: #ac9857; border-bottom: 1px solid #ac9857;">
        Updates
      </h2>
      <?php
       $li = "";
       $args = array(
         'post_type' => 'news',
         'orderby' => 'post_title',
         'post_status'       => 'publish',
         'posts_per_page' => -1,
         'meta_query' => array(
            array(
                'key' => 'development',
                'value' => get_the_ID(),
                'compare' => '=',
            )
        )
       );
       $news = get_posts( $args );
       foreach( $news as $post ) {
         $name = ucfirst( $post->post_title );
         $class = ( $post->post_name );
         $content = apply_filters( 'the_content', $post->post_content );
         list( $content, $other ) = explode( "<!--more-->", $content );
         $image = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ), 'single-post-thumbnail' );
         $homeUrl = home_url();
         $show_readmore = ($other == '') ? 'hidden' : '';
$li .= <<< LI
<li data-image="$class">
<div class="row strip-content strips-new-content">
 <h3>$name</h3>
 <div class="column medium-4 images">
   <img data-src="$image[0]" class="load-me" />
 </div>
 <div class="column medium-8">
   <div class="news-content">
     $content
   </div>
   <div class="hide-content">
      $other
      <hr class="thin-line" />
   </div>
   <a href="#" class="show-content {$show_readmore}">
     <span class="news-read-more">Read more</span>
   </a>
   <div class="socials" style="clear: both; float: left; margin-top: 5px;">
   <a href="#" class="share">Share +</a>
    <ul class="active">
        <li><a target="_blank" href="https://www.linkedin.com/shareArticle?mini=true&url={$homeUrl}&title={$name}&summary=&source="><i class="fa fa-linkedin-square"></i></a></li>
        <li><a href="https://www.facebook.com/sharer/sharer.php?u={$homeUrl}?view={$post->ID}"><i class="fa fa-facebook-official"></i></a></li>
        <li><a href="https://twitter.com/home?status={$homeUrl}?view={$post->ID}"><i class="fa fa-twitter-square"></i></a></li>
        <!-- <li><a href="http://instagram.com"><i class="fa fa-instagram"></i></a></li> -->
        <li><a href="mailto:?&amp;subject=Garton Jones&amp;body={$homeUrl}/news?view={$post->ID}"><i class="fa fa-envelope"></i></a></li>
    </ul>
   </div>
 </div>
</div>
</li>
LI;
       }
       wp_reset_query();
      ?>
     <div id="strips" class="the-strips">
       <ul id="news-list">
         <?php
           echo $li;
         ?>
       </ul>
     </div>
     </div>
  </div>
</div>

<?php
// developments Tablet
else :
wp_enqueue_script( 'tablet-parallax' );
wp_enqueue_style( 'tablet-parallax-style' );
?>

<style>
#timetable ul a {
  top: 0;
  left: 62px;
}
</style>

<div id="overlay-boxes">
  <div class="box1"></div>
  <div class="box2"></div>
</div>

<div id="tablet-parallax">
  <div class="shadow <?php echo strtolower( get_field( 'background_shade' ) ); ?>">
  <div id="pages">
    <?php
      // check if it is tube or bus...
      if( $category->term_id == 461 ) {
        $tablet_background = get_template_directory_uri() . '/img/parallax/tablet-bus.png';
        $tablet_class = 'bus';
      } else {
        $tablet_background = get_template_directory_uri() . '/img/parallax/tablet-tube.png';
        $tablet_class = 'tube';
      }
    ?>

    <div id="home" class="<?php echo $tablet_class; ?>" style="background: url( '<?php echo $tablet_background; ?>' ); background-position: bottom 100px right 50% !important;">
      <?php
        if( $category->term_id != 461 ) {
          // show the timetable
          ?>
          <div id="timetable">
            <div class="flip-container" ontouchstart="this.classList.toggle('hover');">
              <div class="flipper">
                <div class="front">
                <!-- front content -->
                  <img src="<?php echo get_template_directory_uri(); ?>/img/parallax/timetable-v2.png" class="" />
                  <ul>
                    <li class="first-text"><a href="#" class="to-worth slide" data-popup="1" data-id="#worth-popup">*** VALUE MY PROPERTY ***</a></li>
                    <li class="second-text"><a href="#" class="to-worth slide" data-popup="1" data-id="#worth-popup">*** VALUE MY PROPERTY ***</a></li>
                    <li class="click-here"><a href="#" class="to-worth slide" data-popup="1" data-id="#worth-popup">Click Here</a></li>
                  </ul>
                  <span class="clock"></span>
                </div>
              </div>
            </div>
          </div>
          <?php
        }
      ?>
      <a href="#" class="to-worth slide" data-popup="1" data-id="#worth-popup" style=""></a>
      <a href="#devview" class="devview" style=""></a>

      <article alt="2" class="show-me $class">
        <h1 class=""><?php the_title(); ?></h1>
        <div class="main">

          <div id="home" class="content ">
        <div class="the-title">
            <div class="text center-me">
              <div class="animated-text text-center">
 <?php
             $words = explode( " ", get_field( 'welcome_message') );
             $big = false;
             $small = false;
             foreach( $words as $word ) {
               // print_r( $word );
               // die();
               $oword = $word;
               if( stripos( $word, "<strong>" ) !== false ) {
                 $big = true;
               }
               if( stripos( $word, "<em>" ) !== false ) {
                 $small = true;
               }
               $word = strip_tags( $word );
               $word = str_replace( '/>', '', $word );
               // $word = htmlspecialchars( $word );
               $is_special = false;
               // $letters = str_split( $word );
               $letters = str_split_unicode( $word );
               $class = "";
               if( $big !== false ) $class = "big";
               if( $small !== false ) $class = "small";
               echo '<span class="' . $class . '">';
               $char = "";
               foreach( $letters as $letter ) {
                 $char .= $letter;
                 if( $letter == "&" ) $is_special = true;
                 if( $is_special && $letter == ";" ) $is_special = false;
                 if( $is_special ) {
                   continue;
                 }
                 echo '<span>' . $char . '</span>';
                 $char = "";
               }
               echo '</span><span>&nbsp;</span>';
               if( stripos( $oword, "</strong>" ) !== false ) {
                 $big = false;
               }
               if( stripos( $oword, "</em>" ) !== false ) {
                 $small = false;
               }
             }
 ?>
                 </div>
            </div>
             <a href="#" data-popup="1" data-id="#search-popup">
               <div class="sub-title circle-line">SEARCH CURRENT AVAILABILITY</div>
             </a>
        </div>
        </div>
      </article>
    </div>

    <div id="about">
      <article alt="2" class="show-me $class">
        <h2 style="padding-left: 15px; font-size: 32px; margin-bottom: 5px; padding-bottom: 4px; color: #ac9857; border-bottom: 1px solid #ac9857;">
          Key Facts
        </h2>
        <div class="main">
         <div class="the-about-content">
            <div class="slides">
                <div class="slide">
                    <div class="slide-content keyfacts row">
                        <div class="scrollable size-me">
                            <div class="page-first active page show">
                           <div class="the-strips">
                             <ul>
                               <?php
                                if( have_rows('key_facts', get_the_ID()) ):
                                  while( have_rows( 'key_facts' ) ): the_row();
                                    while( have_rows( 'facts' ) ): the_row();
                                  $title = get_sub_field( 'categories' );
                                  $content = get_sub_field( 'content' );
echo <<< LI
<li>
<a href="#">
  <div class="strip-content">
    <div class="the-content">
      <h4>{$title}</h4>
      {$content}
    </div>
  </div>
</a>
</li>
LI;
                                    $h3 = "";
                                    endwhile;
                                  endwhile;
                                endif;
                               ?>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>

    <div id="facilities">
      <div class="page to-screen center-me">
        <table class="facilities">
          <tr>
        <?php
          $i = 0;
          if( have_rows('facilities', get_the_ID()) ):
              while( have_rows( 'facilities' ) ): the_row();
                  $icon = get_sub_field('icon' );
                  $templateUrl = get_template_directory_uri();
                  $title = get_sub_field('title' );
                  $image = get_sub_field('image_video');
                  $tip_text = get_sub_field('tooltip-text');
                  $url = $image['url'];
                  $video = 0;
                  if( $image['mime_type'] == 'video/mp4' ) {
                    $media = get_attached_media( $image['mime_type'], get_the_ID() );
                    foreach( $media as $m ) {
                      $url = $m->guid;
                    }
                    $video = 1;
                  }
echo <<< DIV
<td class="" data-src="{$url}" data-video="{$video}">
<span class="icon facilities"><img src="$templateUrl/img/facts/$icon.png" /></span>
<span class="title">$title</span>
<span class="tooltip-text" style="display: none">$tip_text</span>
</td>
DIV;
                ++$i;
                if( ( $i % 4 ) == 0 ) {
                  echo '</tr><tr>';
                }
              endwhile;
          endif;
          ?>
      </tr>
    </table>
  </div>
    </div>

    <div id="history">
      <article class="show-me $class">
        <div class="main">
         <div id="history" class="content no-search no-title has-parallax no-backtop">
             <div class="the-strips">
               <ul>
                 <?php
                  if( have_rows('history', get_the_ID()) ):
                    $titles = array( '%title%, an Overview', 'A History of %title%%extra%', 'Living & Investing In %title%', '%title%%extra% & Beyond' );
                    $row = 0;
                    while( have_rows( 'history' ) ): the_row();
                      while( have_rows( 'items' ) ): the_row();
                    $content = get_sub_field( 'history' );
                    //Check if I have to use a the default title
                    if( stripos( $content, '<h3>' ) === FALSE ) {
                      $title = $titles[ $row ];
                      //Extra title info?
                      $extra = "";
                      if( stripos( $content, '<h4>' ) === FALSE ) {
                      } else {
                        preg_match('/<h4>(.*)<\/h4>/', $content, $extra);
                        $extra = $extra[1];
                        $content = preg_replace('/<h4>(.*)<\/h4>/', '', $content);
                      }
                      $title = str_replace( '%extra%', $extra, $title );
                      $title = str_replace( '%title%', get_the_title(), $title );
                      $content = '<h3>' . $title . '</h3>' . $content;
                    }
                    if( ! isset( $h3 ) ) $h3 = "";
echo <<< LI
 <li><a href="#"><div class="strip-content">{$h3}<div class="the-content"> {$content}</div></div></a></li>
LI;
                      $h3 = "";
                      $row++;
                      endwhile;
                    endwhile;
                  endif;
                 ?>
               </ul>
             </div>
           </div>
        </div>
      </article>
    </div>

    <div id="gallery">
      <div id="galleries" class="content">
       <div class="arrows">
           <div class="arrow-left arrow"><img src="<?php echo get_template_directory_uri() ?>/img/arrow-left-big.png" /></div>
           <div class="arrow-right arrow"><img src="<?php echo get_template_directory_uri() ?>/img/arrow-right-big.png" /></div>
       </div>
       <div class="images">
   
    <?php
       $images = get_field( 'gallery' );
       $desc = array();
       if( $images ):
           $id = 0;
           $current = " current ";
           foreach( $images as $image ) :
              $dot = "";
              if( substr( $image[ 'mime_type' ], 0, 6 ) != "video/" ) {
                $img =  wp_get_attachment_image_src( $image[ 'id' ], 'post-thumbnail' );
                $img = $img[0];
                $big =  wp_get_attachment_image_src( $image[ 'id' ], 'full' );
                $big = $big[0];
              } else {
                $img = $image[ 'caption' ];
                $big = $img . '" data-video="' . $image[ 'url' ];
$dot = <<< DOT
       <span id="" class="tdot">
           <span class="icon">&#9658;</span>
           <span class="dot tpulse"></span>
       </span>
DOT;
             }
             $desc[$id] = $image['description'];
             echo '<div class="image image-' . $id . $current . '">';
             echo $dot;
             echo '<img class="load-me load-later" data-src="' . $img . '" data-big="' . $big . '" data-id="' . $id . '" />';
             echo '</div>';
             $id++;
             $current = " after after-" . $id;
         endforeach;
       endif;
       ?>

        <div id="image-desc">
          <ul>
           <?php
           $class = 'active';
           foreach( $desc as $id => $d ) {
             echo '<li id="image-desc-' . $id . '" class="' . $class . '">' . $d . '</li>';
             $class = '';
           }
          ?>
          </ul>
         </div>
       </div>
      </div>
    </div>
  
    <?php get_template_part( 'templates/developments', 'strips' ); ?>

  </div><!-- end #pages -->
  <div id="controls" style="display: none;">
    <button class="control-left"><img src="<?php echo get_template_directory_uri(); ?>/img/arrow-left-white-small.png" alt="Left"></button>
    <button class="control-right"><img src="<?php echo get_template_directory_uri(); ?>/img/arrow-right-white-small.png" alt="Right"></button>
  </div>
  <div class="parallax-menu">
    <ul class="submenu leftmenu">

    <?php
      if ( have_rows( 'parallax_menu' ) ):
        while( have_rows( 'parallax_menu' ) ): the_row();
          $href = get_sub_field( 'href' );
          $title = get_sub_field( 'title' );
          if ( $href == '---' ) {
            echo '<li>&nbsp;</li>';
            continue;
          }
        ?>

      <li>
        <a href="<?= $href; ?>" data-title="<?= $title; ?>"><?= $title ?></a>
      </li>

        <?php
        endwhile;
      endif;
    ?>

    </ul>
  </div>
</div>

<?php
// tablet parallax
endif;
?>

<div id="search-popup" class="close-me popup <?php echo $class ?>" <?php echo $style ?>>

<?php
  if ( ! empty( $video ) )
    echo $video;
  if ( ! empty( $rightImage ) )
    echo $rightImage;
?>

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
  <?php require_once( "template-search-tower.php" ); ?>
</div>
<div id="worth-popup" class="close-me popup perfect-scrollbar" data-center="1">
    <h2 style="text-align: center;text-transform: uppercase;">How much is my property worth?</h2>

    <a class="close-reveal-modal">
        <div class="button-close" style="top: 89px; right: 63px;">
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
    </a>

        <div style="background-color: #fff">
        <?php echo do_shortcode( '[gravityform id="15" title="false" description="false" ajax="true"]' ); ?>
        </div>

</div>

<div id="quick-request" class="close-me popup perfect-scrollbar" data-center="1">
    <h2 style="text-align: center;text-transform: uppercase;">Quick Request</h2>
    <a class="close-reveal-modal">
        <div class="button-close" style="top: 36px; right: 0;">
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
    </a>
    <div class="quick-request-wrapper">
      <div class="quick-request-background">
        <?php
        $description = strtolower( get_field( 'form_description' ) );
        if( $description == 'sales' ) { 

          $description = "Sales";

        ?><h3>Available <?php echo $description ?> Properties within <?php the_title() ?></h3>
        <?php echo do_shortcode( '[gravityform id="40" title="false" description="false" ajax="true" tabindex="1000"]' );
        }

        elseif( $description == 'lettings' ) { $description = "Lettings";?>
        <h3>Available <?php echo $description ?> Properties within <?php the_title() ?></h3>
        <?php echo do_shortcode( '[gravityform id="42" title="false" description="false" ajax="true" tabindex="1000"]' );
        }
        else { 

          $description = "Sales or Lettings";?>

          <h3>Available <?php echo $description ?> Properties within <?php the_title() ?></h3>
        <?php echo do_shortcode( '[gravityform id="29" title="false" description="false" ajax="true" tabindex="1000"]' );
        }
      ?>
    </div>
   </div> 
</div>

<?php
wp_enqueue_style( 'search-css' );
wp_enqueue_script("jquery-effects-core");
wp_enqueue_script( 'gmap-js' );
wp_enqueue_style( 'development-transitions' );
wp_enqueue_script('timelinelite', 'https://cdnjs.cloudflare.com/ajax/libs/gsap/1.9.0/TimelineLite.min.js', array('jquery'), true );
wp_enqueue_script('tweenmax', 'https://cdnjs.cloudflare.com/ajax/libs/gsap/1.9.0/TweenMax.min.js', array('jquery'), true );
wp_enqueue_style('fontawesome', '//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css' );
wp_dequeue_script( 'single-developments' );
wp_dequeue_script( 'swiper' );
wp_dequeue_script( 'swiper-2' );
wp_dequeue_script( 'wp-favroite-posts' );
// wp_enqueue_script('development-script', get_template_directory_uri() . '/js/src/single/developments3.js', array(), true );
wp_enqueue_script('development-script', get_template_directory_uri() . '/js/min/single/developments3.min.js', array(), true );
get_footer();
