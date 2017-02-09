<?php gj_save_navigation_history(); ?>
<!doctype html>

<?php $upload_dir = wp_upload_dir(); ?>
<?php // var_dump( $upload_dir ); ?>

<?php
  wp_enqueue_script( 'modernizr', get_template_directory_uri() . '/js/modernizr-custom.js', array(), '20151020', false );
?>
<?php
//require_once(get_theme_root(). '/new_theme/mobile.php' );
  require_once(get_theme_root(). '/new_theme/mobile.php');
  $mobile = new Mobile_Detect();
  $detect = new Mobile_Detect();
?>
<!--<html class="no-js" lang="en">-->
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
    <title><?php echo wp_title( '-|' ); ?></title>
    
    <link href='http://fonts.googleapis.com/css?family=Gilda+Display' rel='stylesheet' type='text/css'>
    <link href='http://fonts.googleapis.com/css?family=PT+Sans' rel='stylesheet' type='text/css'>
    <link href='http://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700,800' rel='stylesheet' type='text/css'>
    <link href='http://fonts.googleapis.com/css?family=Orbitron' rel='stylesheet' type='text/css'>

    <script type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/js/min/outdatedbrowser.min.js"></script>

    <?php if( is_singular( 'videos' ) ) : ?>
      <meta property="og:image" content="<?php echo get_field( 'custom_background' )[0] ?>" /><link href="/img/favicon.png" rel="shortcut icon" type="image/png" />
    <?php endif; ?>
<?php
    wp_head();

    $isiPad = (bool) strpos($_SERVER['HTTP_USER_AGENT'],'iPad');
    $iPad = ( $isiPad ) ? "ipad" : "";

    //I don't know who used pid_####
    $prid = get_the_ID();

    //dafault background image
    $style = "";

    $src = get_template_directory_uri() . '/img/union-jack-v1.png';

    //Custon background image?
    $image = ( ! is_singular( 'videos' ) ) ? get_field( 'custom_background' ) : '';

   	// if background image is a video
   	if ( $image['mime_type'] === 'video/mp4' ) {
   		$video = '<div class="bg-video"><video class="load-me" autoplay loop data-src="' . $image['url'] . '"></video></div>';
   	} else if ( $image ) {
   		$src = $image['url'];
   	}

    if ( get_field( 'section' ) != -1 ) {

        if( empty( $image ) ) {
          $section = get_field( 'section' );
          $images = get_option( "_gj-backgrounds-$section", array() );

          if ( isset( $GLOBALS['images'] ) ) {
              $images = $GLOBALS['images'];
          }

          $rand = rand(0, count( $images ) -1 );

          if( isset( $images[ $rand ] ) && ! empty( $images[ $rand ] ) ) {
            $image = $images[ $rand ];
          }

          // if image is single
          if ( empty( $image ) ) {
            $image = @$GLOBALS['images'];
          }

        } else {
          $image = $image['id'];
        }

        if ( $mobile->isMobile() ) {
          $src = wp_get_attachment_image_src( $image, 'large' );
        } else {
          $src = wp_get_attachment_image_src( $image, 'full' );
        }

        $src = $src[0];

        // save a global var, so we can check the bg in footer.php
        $GLOBALS['bg-image'] = true;
    }

    // TODO: Why do we need this here???
    if( empty( $src ) || is_archive() ) {
      $src = get_template_directory_uri() . '/img/union-jack-v1.png';
    }

    if ( is_front_page() ) {
      $src = get_template_directory_uri() . '/videos/gjintro.png';
    }

    $loadbck = '';
    if( ! empty( $src ) ) {
        $style = "
            background-size: cover;
            background-repeat: no-repeat;
            background-attachment: fixed;
            background-position: center;
        ";

        $loadbck = 'lazy-background';
    }

    // used in parallax
    if ( ! isset( $GLOBALS['custom_body_class'] ) ) {
      $custom_body_class = '';
    } else {
      $custom_body_class = $GLOBALS['custom_body_class'];
    }

    $browser = '';
    // browser sniffing
    if (strpos($_SERVER['HTTP_USER_AGENT'], 'Safari') && !strpos($_SERVER['HTTP_USER_AGENT'], 'Chrome')) {
      $browser = 'safari';
    }

  ?>

  <style>
    #vertical-boxes>div{background:#fff;position:fixed;width:50%;height:100%;z-index:101;top:0}#vertical-boxes .box1{left:0}#vertical-boxes .box2{left:50%}
    #loadingText {position: fixed;top:50%;left:50%;margin-top: -30px;color: #B6A664;text-align: center;padding-top: 10px;font-size: 30px;transition: transform 0.25s ease-in-out;z-index:103;cursor: default;font-family: 'Gilda Display';font-weight: normal;margin-left:-75px;margin-top:-75px;}
    #loadingText .circle {width: 150px;height:150px;border-radius:50%;border:1px solid #b6a664;line-height:150px;perspective:300px}
  </style>

  </head>
  <body <?php body_class( array( $iPad, $custom_body_class, $browser, $loadbck ) ) ?> style="<?php echo $style ?>" data-background-url="<?php echo $src; ?>">
  
  
  <div id="outdated"></div>

  <script type="text/javascript">
    //event listener: DOM ready
    function addLoadEvent(func) {
        var oldonload = window.onload;
        if (typeof window.onload != 'function') {
            window.onload = func;
        } else {
            window.onload = function() {
                if (oldonload) {
                    oldonload();
                }
                func();
            }
        }
    }
    //call plugin function after DOM ready
    addLoadEvent(function(){
        outdatedBrowser();
    });
  </script>

	<?php if( is_singular('developments') || is_singular('knowledge') ) { ?>
		<img src="<?= $src ?>" id="bg-body"  />
	<?php } ?>

	<!-- Google Tag Manager -->
	<noscript><iframe src="//www.googletagmanager.com/ns.html?id=GTM-MW96LK"
	height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
	<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
	new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
	j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
	'//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
	})(window,document,'script','dataLayer','GTM-MW96LK');</script>
	<!-- End Google Tag Manager -->

  <div id="menu-fix"></div>

  <div id="vertical-boxes">
    <div style="background:#fff;position:fixed;width:50vw;height:100vh;z-index:101;top:0;left:0" class="box1"></div>
    <div style="background:#fff;position:fixed;width:50vw;height:100vh;z-index:101;top:0;left:50%" class="box2"></div>
  </div>

  <div id="loadingText" class="fade-me show">
      <div class="circle">
          <span class="y360" style="display:inline-block;color:#b6a664">
              G J
          </span>
      </div>
  </div>
  <script>
    jQuery(window).load( function() {
      jQuery('#loadingText').removeClass('show').fadeOut( 'fast' );
      setTimeout(function() {
        jQuery('#vertical-boxes .box1').transition({
            x: "-100%"
        });
        jQuery('#vertical-boxes .box2').transition({
            x: "100%"
        });
      }, 200);
    });
  </script>

  <?php if ( ! $mobile->isMobile() || $mobile->isTablet()) { ?>
    <?php if ( get_field('music') && ! current_user_can('manage_options') ) {
    	?>
  	<audio autoplay loop>
  		<source src="<?php echo get_field('music'); ?>" type="audio/mpeg">
  	</audio>
    <?php } ?>
  <?php } ?>



  <?php if (isset($video) && $video !== null) {
  	echo $video;
  } ?>
   <?php
    if ($prid==1819 || $prid==1823){
   ?>
   <div class="gradholder">
   <?php } ?>

      <nav class="top-bar" data-topbar>

   <a href="/" class="toplogo"><img src="<?php echo get_template_directory_uri() ?>/img/logo-big.png" alt="Garton Jones"></a>
  <div class="top-bar-section">
    <!-- Right Nav Section -->
    <ul class="left">
      <li id="mtrigger" class="show-for-medium-up">
        <a href="#" id="changethis" class="link <?php echo isset( $GLOBALS[ '_menu_always_on' ] ) ? 'hidden' : ''; ?>">Menu</a>
        <span class="h-line show-for-medium-only"></span>
        <a href="<?php echo home_url( '/developments/?view=developments' ); ?>" class="link show-for-medium-only">VIEW DEVELOPMENTS</a>
      </li>
      <li id="mobilemenutrigger" class="show-for-small-only">
        <a href="#" style="margin-left: 5px; display: inline-block; width: 40px; padding: 5px 10px; height: 45px; box-sizing: border-box;">
          <span class="show-for-small-only"><span class="hamburger"><span class="line"></span><span class="line"></span><span class="line"></span></span></span>
        </a>
      </li>
    </ul>
    <ul class="right hidden-xs">
    <li class="right-border show-for-large-up">
      <a href="<?php echo home_url( '/developments/?view=developments' ); ?>" class="link" style="padding: 0;">VIEW DEVELOPMENTS</a>
      <span class="h-line"></span>
    </li>
    <li class="right-border">
      <a href="/saved-properties/" class="y360-parent">
        SAVED <img class="y360-hover" src="<?php echo get_template_directory_uri(); ?>/img/hearth-double.png" alt="" style="margin-top: -3px; margin-left: 3px; width: 15px;">
      </a>
      <span class="h-line"></span>
    </li>
    <li class="show-for-large-up">
      <a href="https://www.facebook.com/pages/Garton-Jones-Real-Estate/558753517497591" target="_blank" class="y360-parent">
        <img class="y360-hover" src="<?php echo get_template_directory_uri(); ?>/img/facebook-double.png" style="margin-top:-5px; width: 15px;" alt="facebook">
      </a>
    </li>
    <li class="show-for-large-up">
      <a href="https://twitter.com/GartonJonesLDN" target="_blank" class="y360-parent">
        <img class="y360-hover" src="<?php echo get_template_directory_uri(); ?>/img/twitter-double.png" style="margin-top:-3px; width: 15px;" alt="twitter">
      </a>
    </li>
    <li class="show-for-large-up">
      <a href="https://www.linkedin.com/pub/kieran-chalker/35/416/b9" target="_blank" class="y360-parent">
        <img class="y360-hover" src="<?php echo get_template_directory_uri(); ?>/img/linkedin-double.png" style="margin-top:-5px; margin-left: 2px; width: 15px;" alt="linked in">
      </a>
    </li>
    <li>
        <?php get_search_form( true ); ?>
    </li>
  </ul>
  <ul class="sub-top-bar show-for-small-only">
    <li class="right-border">
      <a href="<?php echo home_url( '/developments/?view=developments' ); ?>" class="link">VIEW DEVELOPMENTS</a>
      <span class="h-line"></span>
    </li>
    <li class="right-border">
      <a href="/saved-properties/" class="y360-parent">
        <span class="responsive-show">MY SAVED </span><img class="y360-hover" src="<?php echo get_template_directory_uri(); ?>/img/hearth-double.png" alt="" style="margin-top: -3px; margin-left: 3px; width: 15px;">
      </a>
     <span class="h-line"></span>
    </li>
    <li class="y360-parent">
      <a href="https://www.facebook.com/pages/Garton-Jones-Real-Estate/558753517497591" target="_blank" class="y360-hover">
        <img src="<?php echo get_template_directory_uri(); ?>/img/facebook-double.png" style="margin-top:-5px; width: 15px;" alt="facebook">
      </a>
    </li>
    <li class="y360-parent">
      <a href="https://twitter.com/GartonJonesLDN" target="_blank" class="y360-hover">
        <img src="<?php echo get_template_directory_uri(); ?>/img/twitter-double.png" style="margin-top:-3px; width: 15px;" alt="twitter">
      </a>
    </li>
    <li class="y360-parent">
      <a href="https://www.linkedin.com/pub/kieran-chalker/35/416/b9" target="_blank" class="y360-hover">
        <img src="<?php echo get_template_directory_uri(); ?>/img/linkedin-double.png" style="margin-top:-5px; margin-left: 2px; width: 15px;" alt="linked in">
      </a>
      <span class="h-line"></span>
    </li>
    <li>
        <?php get_search_form( true ); ?>
    </li>
  </ul>
    <!-- Left Nav Section -->
  </div>
</nav>

<div id="menu" class="site-menu <?php echo isset( $GLOBALS[ '_menu_always_on' ] ) ? 'no-close visible' : ''; ?>">
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
  <ul class="menu-list">
<?php
$locations = get_theme_mod( 'nav_menu_locations' );
$menu_id = @$locations[ 'secondary' ];

$items = wp_get_nav_menu_items( $menu_id );
//Cycle the array
$path = dirname( __FILE__ );

foreach( $items as $id => $item ) {
    //Video or Image item?
    $hasClass = array( ' no-video ' );
    $hasVideo = $hasImage = $hasMusic = false;

    $title = sanitize_title( $item->title );
    $video = 'img/menu/' . strtolower( $title ) . '.mp4';
    $music = 'img/menu/' . strtolower( $title ) . '.mp3';
    $image = 'img/menu/' . strtolower( $title ) . '.jpg';

    if( file_exists( "$path/$video" ) ) {
      array_pop( $hasClass );
      $hasClass[] = " has-video";
      $hasVideo = true;
    }

    if( file_exists( "$path/$image" ) ) {
      $hasClass[] = " has-image";
      $hasImage = true;
    }

    if( file_exists( "$path/$music" ) ) {
      $hasClass[] = " has-music";
      $hasMusic = true;
    }

    // get the name and save as class, so we have more options...
    $className = strtolower( sanitize_title( $item->title ) );

    $bg = "background-image:url('" . esc_url( get_template_directory_uri() . "/$image" ) . "')";
    // $style = ( $hasImage ) ? "style=\"$bg\"" : "";

    //Get the "subitems"
    echo '<li class="lazy-background menu-item menu-item-' . $id . join( " ", $hasClass ) . ' menu-item-' . $className . ' " data-url="' . $item->url . '" data-background-url="' . esc_url( get_template_directory_uri() . "/$image" ) . '">';

    //Post title
    $title = str_replace( " ", "<br>", $item->post_title );

    //Video
    if( $hasVideo ) :
?>
      <video loop class="load-me autoplay-video" data-src="<?php echo get_template_directory_uri() . "/" . $video ?>"></video>
<?php
    endif;

    if( $hasMusic && ( ! $mobile->isMobile() || $mobile->isTablet()) ) :
?>
		<audio loop data-src="<?php echo get_template_directory_uri() . '/' . $music ?>" class="load-me">
		</audio>
<?php
    endif;

    //Menu title
    if( $item->url != "#" )
        echo '<h3>' . $title . '</h3>';

    //Current menu item, I need to know the menu id
    $menu = wp_get_nav_menu_object( $item->post_title );

    //Get the subitems
    $sitems = @wp_get_nav_menu_items( $menu->term_id );

    echo '<ul>';

    if( is_array( $sitems ) ) :
    foreach( $sitems as $sid => $item ) {
        //I don't have to display subitems in main menu
        if( $item->menu_item_parent > 0 ) continue;

        if( $item->url != "#" ) {
echo <<< EOT
    <li class="sub-item-$sid">
        <a href="$item->url" data-title="$item->title">
            $item->title
        </a>
    </li>
EOT;
        } else {
            echo '<li  class="sub-item-' . $id . '">&nbsp;</li>';
        }
    }
    endif;

    echo '</ul>';

    echo '</li>';
}
?>

      </ul>

</div>

<?php if( ! is_front_page() ) : ?>
<div id="navigation-menu" class="show-for-medium-up navigation-menu single <?php echo @$GLOBALS['_navigation_class'] ?>">
  <div class="first-wrapper" style="width: 100%;">
  	<div class="first">
  		<ul>
  	<?php
  		if( have_rows('side_pri_nav', $post->ID) ):
  			$i = 0;
  			while( have_rows('side_pri_nav', $post->ID) ): the_row();
  				$page = get_sub_field( 'page' );

          echo gj_navigation_menu_add_item( $i, $page->post_title, get_permalink( $page->ID ) );

  			endwhile;
      else:
        $defaults = get_option( 'gj_default_permalinks' );

        foreach( $defaults as $id => $d ) {
          if( empty( $d['title'] ) ) continue;

          echo gj_navigation_menu_add_item( 0, $d['title'], $d['link'], '', @$d['data'] );
        }

  		endif;
  	?>
  		</ul>
  		<div class="line"></div>
  	</div>
  </div>
	<div class="clear"></div>
  <?php if( isset( $GLOBALS['_navigation_secondary'] ) ) : ?>
    <div class="second <?php /*echo @$GLOBALS['_navigation_second_class']*/ ?>">
  		<ul>
  			<li class="street-sign"><?php echo $GLOBALS['_navigation_category'] ?></li>
    <?php
      foreach( $GLOBALS['_navigation_secondary'] as $i => $item ) {

        if ( empty( $item['id'] ) ) {
          $item['id'] = 0;
        }

        echo gj_navigation_menu_add_item( $item['id'], $item['title'], $item['link'], @$item['class'], @$item['data']  );

        if( isset( $item['subitems'] ) ) {
          foreach( $item['subitems'] as $id => $sub ) {
            if ( ! empty( $sub['id'] ) ) {
              $setId = $sub['id'];
            } else {
              $setId = $id;
            }
            echo gj_navigation_menu_add_item( $setId, $sub['title'], $sub['link'], 'sub-item ' . $sub['class'], @$item['data'] );
          }
        }
      }
   ?>
      </ul>
      <div class="line-second line-thin"></div>
  		<div class="line-second line-fat"></div>
    </div>

  <?php endif; ?>
</div>
<?php endif; ?>

<div id="menugrayout"></div>
<div id="shade"></div>
<div id="scanlines"></div>