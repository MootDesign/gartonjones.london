<?php
require_once( 'functions-admin.php' );
require_once( 'acf/acf-wp_wysiwyg.php' );

/**
 * Twenty Fourteen functions and definitions
 *
 * Set up the theme and provides some helper functions, which are used in the
 * theme as custom template tags. Others are attached to action and filter
 * hooks in WordPress to change core functionality.
 *
 * When using a child theme you can override certain functions (those wrapped
 * in a function_exists() call) by defining them first in your child theme's
 * functions.php file. The child theme's functions.php file is included before
 * the parent theme's file, so the child theme functions would be used.
 *
 * @link http://codex.wordpress.org/Theme_Development
 * @link http://codex.wordpress.org/Child_Themes
 *
 * Functions that are not pluggable (not wrapped in function_exists()) are
 * instead attached to a filter or action hook.
 *
 * For more information on hooks, actions, and filters,
 * @link http://codex.wordpress.org/Plugin_API
 *
 * @package WordPress
 * @subpackage Twenty_Fourteen
 * @since Twenty Fourteen 1.0
 */

/**
 * Set up the content width value based on the theme's design.
 *
 * @see twentyfourteen_content_width()
 *
 * @since Twenty Fourteen 1.0
 */
if ( ! isset( $content_width ) ) {
	$content_width = 474;
}

/**
 * Twenty Fourteen only works in WordPress 3.6 or later.
 */
if ( version_compare( $GLOBALS['wp_version'], '3.6', '<' ) ) {
	require get_template_directory() . '/inc/back-compat.php';
}

if ( ! function_exists( 'twentyfourteen_setup' ) ) :
/**
 * Twenty Fourteen setup.
 *
 * Set up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support post thumbnails.
 *
 * @since Twenty Fourteen 1.0
 */
function twentyfourteen_setup() {
	/*
	 * Make Twenty Fourteen available for translation.
	 *
	 * Translations can be added to the /languages/ directory.
	 * If you're building a theme based on Twenty Fourteen, use a find and
	 * replace to change 'twentyfourteen' to the name of your theme in all
	 * template files.
	 */
	load_theme_textdomain( 'twentyfourteen', get_template_directory() . '/languages' );

	// This theme styles the visual editor to resemble the theme style.
	add_editor_style( array( 'css/editor-style.css', twentyfourteen_font_url() ) );

	// Add RSS feed links to <head> for posts and comments.
	add_theme_support( 'automatic-feed-links' );

	// Enable support for Post Thumbnails, and declare two sizes.
	add_theme_support( 'post-thumbnails' );
  	set_post_thumbnail_size( 672, 372, true );
	add_image_size( 'twentyfourteen-full-width', 1038, 576, true );
	add_image_size( 'grid-size', 600, 400, true );

	// This theme uses wp_nav_menu() in two locations.
	register_nav_menus( array(
		'primary'   => __( 'Top primary menu', 'twentyfourteen' ),
		'secondary' => __( 'Secondary menu in left sidebar', 'twentyfourteen' ),
	) );

	/*
	 * Switch default core markup for search form, comment form, and comments
	 * to output valid HTML5.
	 */
	add_theme_support( 'html5', array(
		'search-form', 'comment-form', 'comment-list',
	) );

	/*
	 * Enable support for Post Formats.
	 * See http://codex.wordpress.org/Post_Formats
	 */
	add_theme_support( 'post-formats', array(
		'aside', 'image', 'video', 'audio', 'quote', 'link', 'gallery',
	) );

	// This theme allows users to set a custom background.
	add_theme_support( 'custom-background', apply_filters( 'twentyfourteen_custom_background_args', array(
		'default-color' => 'f5f5f5',
	) ) );

	// Add support for featured content.
	add_theme_support( 'featured-content', array(
		'featured_content_filter' => 'twentyfourteen_get_featured_posts',
		'max_posts' => 6,
	) );

	// This theme uses its own gallery styles.
	add_filter( 'use_default_gallery_style', '__return_false' );
}
endif; // twentyfourteen_setup
add_action( 'after_setup_theme', 'twentyfourteen_setup' );

/**
 * Adjust content_width value for image attachment template.
 *
 * @since Twenty Fourteen 1.0
 *
 * @return void
 */
function twentyfourteen_content_width() {
	if ( is_attachment() && wp_attachment_is_image() ) {
		$GLOBALS['content_width'] = 810;
	}
}
add_action( 'template_redirect', 'twentyfourteen_content_width' );

/**
 * Getter function for Featured Content Plugin.
 *
 * @since Twenty Fourteen 1.0
 *
 * @return array An array of WP_Post objects.
 */
function twentyfourteen_get_featured_posts() {
	/**
	 * Filter the featured posts to return in Twenty Fourteen.
	 *
	 * @since Twenty Fourteen 1.0
	 *
	 * @param array|bool $posts Array of featured posts, otherwise false.
	 */
	return apply_filters( 'twentyfourteen_get_featured_posts', array() );
}

/**
 * A helper conditional function that returns a boolean value.
 *
 * @since Twenty Fourteen 1.0
 *
 * @return bool Whether there are featured posts.
 */
function twentyfourteen_has_featured_posts() {
	return ! is_paged() && (bool) twentyfourteen_get_featured_posts();
}

/**
 * Register three Twenty Fourteen widget areas.
 *
 * @since Twenty Fourteen 1.0
 *
 * @return void
 */
function twentyfourteen_widgets_init() {
	register_sidebar( array(
		'name'          => __( 'Primary Sidebar', 'twentyfourteen' ),
		'id'            => 'sidebar-1',
		'description'   => __( 'Main sidebar that appears on the left.', 'twentyfourteen' ),
		'before_widget' => '<aside id="%1$s" class="widget %2$s">',
		'after_widget'  => '</aside>',
		'before_title'  => '<h1 class="widget-title">',
		'after_title'   => '</h1>',
	) );
	register_sidebar( array(
		'name'          => __( 'Content Sidebar', 'twentyfourteen' ),
		'id'            => 'sidebar-2',
		'description'   => __( 'Additional sidebar that appears on the right.', 'twentyfourteen' ),
		'before_widget' => '<aside id="%1$s" class="widget %2$s">',
		'after_widget'  => '</aside>',
		'before_title'  => '<h1 class="widget-title">',
		'after_title'   => '</h1>',
	) );
	register_sidebar( array(
		'name'          => __( 'Footer Widget Area', 'twentyfourteen' ),
		'id'            => 'sidebar-3',
		'description'   => __( 'Appears in the footer section of the site.', 'twentyfourteen' ),
		'before_widget' => '<aside id="%1$s" class="widget %2$s">',
		'after_widget'  => '</aside>',
		'before_title'  => '<h1 class="widget-title">',
		'after_title'   => '</h1>',
	) );
}
add_action( 'widgets_init', 'twentyfourteen_widgets_init' );

/**
 * Register Lato Google font for Twenty Fourteen.
 *
 * @since Twenty Fourteen 1.0
 *
 * @return string
 */
function twentyfourteen_font_url() {
	$font_url = '';
	/*
	 * Translators: If there are characters in your language that are not supported
	 * by Lato, translate this to 'off'. Do not translate into your own language.
	 */
	if ( 'off' !== _x( 'on', 'Lato font: on or off', 'twentyfourteen' ) ) {
		$font_url = add_query_arg( 'family', urlencode( 'Lato:300,400,700,900,300italic,400italic,700italic' ), "//fonts.googleapis.com/css" );
	}

	return $font_url;
}

/**
 * Enqueue scripts and styles for the front end.
 *
 * @since Twenty Fourteen 1.0
 *
 * @return void
 */
function twentyfourteen_scripts() {
    wp_dequeue_script( 'jquery' );
    wp_dequeue_script( 'fwds3dcov_cov_script' );


	wp_enqueue_script( 'jquery-effects-core' );

	wp_register_script( 'search-js', get_template_directory_uri() . '/js/min/single/search.min.js', array(), '1.0', true );
	wp_register_style( 'search-css', get_template_directory_uri() . '/css/search.css' );

	if ( is_front_page() ) {
		wp_enqueue_style( 'search-css' );
	}

	wp_register_style( 'tablet-parallax-style', get_template_directory_uri() . '/css/tablet-parallax.css' );
	wp_register_script( 'tablet-parallax', get_template_directory_uri() . '/js/min/tablet-parallax.min.js', array( 'jquery' ), '20150923', true );
	wp_register_script( 'mobile-parallax', get_template_directory_uri() . '/js/min/mobile-parallax.min.js', array( 'jquery' ), '20151016', true );
	wp_register_style( 'mobile-parallax-style', get_template_directory_uri() . '/css/mobile-parallax.css' );
	wp_register_style( 'mobile-developments', get_template_directory_uri() . '/css/mobile-developments.css' );
	wp_register_style('search-result-css', get_template_directory_uri() . '/css/search-results.css' );
	wp_register_style( 'quicklinks-css', get_template_directory_uri() . '/css/quicklinks.css' );

	//Main script
	wp_register_script('babylonjs-main', get_template_directory_uri() . '/babylon/main.min.js', array( 'babylonjs', 'babylon-hand', 'babylon-cannon' ), '1.0', true );

	//Custom styles & js
	wp_register_script('google-maps', 'http://maps.google.com/maps/api/js?v=3&sensor=false&key=AIzaSyDosc7irSGR_cv-kJb6iHNcFk9S4EM7nyI', array(), '1.0', true );
	wp_register_script('gmap-js', get_template_directory_uri() . '/js/min/gmap.min.js', array( 'google-maps' ), '1.0', true );

	//StreetviewSequence
	wp_register_script( 'underscores-js', 'http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.6.0/underscore-min.js', array(), '20150101', true );
	wp_register_script( 'TweenLite-js', get_template_directory_uri() . '/js/TweenLite.min.js', array(), '20150101', true );
	wp_register_script( 'sequence-js', get_template_directory_uri() . '/js/sequence.js', array( 'underscores-js', 'TweenLite-js', 'google-maps' ), '20150101', true );

	// parallax about
	wp_register_script( 'jquery-mousewheel', get_template_directory_uri() . '/js/min/parallax/jquery.mousewheel.min.js', array( 'jquery' ), '20150115', true );
	wp_register_script( 'jquery-custom', get_template_directory_uri() . '/js/min/parallax/jquery.custom.min.js', array( 'jquery' ), '20150115', true );
	wp_register_script( 'modernizr-custom', get_template_directory_uri() . '/js/parallax/modernizr.custom.35585.js', array(), '20150115', true );

	wp_register_script( 'parallax', get_template_directory_uri() . '/js/parallax/parallax.js', array( 'jquery', 'jquery-mousewheel', 'jquery-custom', 'modernizr-custom' ), '20150115', true );
	wp_register_script( 'parallax-config', get_template_directory_uri() . '/js/min/parallax/sample.min.js', array( 'parallax' ), '20150115', true );

	wp_register_style( 'parallax-css', get_template_directory_uri() . '/css/parallax.css' );
	wp_register_style( 'parallax-mini-css', get_template_directory_uri() . '/css/parallax.mini.css' );
	wp_register_style( 'development-transitions', get_template_directory_uri() . '/css/development-transitions.css' );
	wp_register_style( 'news-css', get_template_directory_uri() . '/css/news.css' );
	wp_register_style( 'single-news', get_template_directory_uri() . '/css/single.css' );
    wp_register_style( 'single-properties', get_template_directory_uri() . '/css/single.properties.css' );
	// wp_enqueue_script('outdated-browser', get_template_directory_uri() . '/js/outdatedbrowser.min.js', array(), '20160304', true);
    
    wp_enqueue_script( 'all-required', get_template_directory_uri() . '/dist/all.min.js', array( 'jquery' ), '20160216', true);
	
	// this should be last, as all.min.js needs to be included in some files... or just put the dependency :)
	gj_register_dynamic_scripts();
}

add_action( 'wp_enqueue_scripts', 'twentyfourteen_scripts', 15 );

//I need to load foundation.min.css before style.css, to avoid that foundation overwrite my style :(
/*
 *
 * I can't use the other function because I need the "priority" > 0 as
 * the stupid coverflow plugin include the script in each page -.-"
 */
function enqueue_foundation() {
	// wp_enqueue_style( 'foundation', get_template_directory_uri() . '/css/foundation.min.css' );

	wp_enqueue_style( 'compressed', get_template_directory_uri() . '/css/compressed.css' );
}
add_action( 'wp_enqueue_scripts', 'enqueue_foundation', 0 );


/**
 * Enqueue Google fonts style to admin screen for custom header display.
 *
 * @since Twenty Fourteen 1.0
 *
 * @return void
 */
function twentyfourteen_admin_fonts() {
	wp_enqueue_style( 'twentyfourteen-lato', twentyfourteen_font_url(), array(), null );
}
add_action( 'admin_print_scripts-appearance_page_custom-header', 'twentyfourteen_admin_fonts' );

if ( ! function_exists( 'twentyfourteen_the_attached_image' ) ) :
/**
 * Print the attached image with a link to the next attached image.
 *
 * @since Twenty Fourteen 1.0
 *
 * @return void
 */
function twentyfourteen_the_attached_image() {
	$post                = get_post();
	/**
	 * Filter the default Twenty Fourteen attachment size.
	 *
	 * @since Twenty Fourteen 1.0
	 *
	 * @param array $dimensions {
	 *     An array of height and width dimensions.
	 *
	 *     @type int $height Height of the image in pixels. Default 810.
	 *     @type int $width  Width of the image in pixels. Default 810.
	 * }
	 */
	$attachment_size     = apply_filters( 'twentyfourteen_attachment_size', array( 810, 810 ) );
	$next_attachment_url = wp_get_attachment_url();

	/*
	 * Grab the IDs of all the image attachments in a gallery so we can get the URL
	 * of the next adjacent image in a gallery, or the first image (if we're
	 * looking at the last image in a gallery), or, in a gallery of one, just the
	 * link to that image file.
	 */
	$attachment_ids = get_posts( array(
		'post_parent'    => $post->post_parent,
		'fields'         => 'ids',
		'numberposts'    => -1,
		'post_status'    => 'inherit',
		'post_type'      => 'attachment',
		'post_mime_type' => 'image',
		'order'          => 'ASC',
		'orderby'        => 'menu_order ID',
	) );

	// If there is more than 1 attachment in a gallery...
	if ( count( $attachment_ids ) > 1 ) {
		foreach ( $attachment_ids as $attachment_id ) {
			if ( $attachment_id == $post->ID ) {
				$next_id = current( $attachment_ids );
				break;
			}
		}

		// get the URL of the next image attachment...
		if ( $next_id ) {
			$next_attachment_url = get_attachment_link( $next_id );
		} else {
			// or get the URL of the first image attachment.
			$next_attachment_url = get_attachment_link( array_shift( $attachment_ids ) );
		}
	}

	printf( '<a href="%1$s" rel="attachment">%2$s</a>',
		esc_url( $next_attachment_url ),
		wp_get_attachment_image( $post->ID, $attachment_size )
	);
}
endif;

if ( ! function_exists( 'twentyfourteen_list_authors' ) ) :
/**
 * Print a list of all site contributors who published at least one post.
 *
 * @since Twenty Fourteen 1.0
 *
 * @return void
 */
function twentyfourteen_list_authors() {
	$contributor_ids = get_users( array(
		'fields'  => 'ID',
		'orderby' => 'post_count',
		'order'   => 'DESC',
		'who'     => 'authors',
	) );

	foreach ( $contributor_ids as $contributor_id ) :
		$post_count = count_user_posts( $contributor_id );

		// Move on if user has not published a post (yet).
		if ( ! $post_count ) {
			continue;
		}
	?>

	<div class="contributor">
		<div class="contributor-info">
			<div class="contributor-avatar"><?php echo get_avatar( $contributor_id, 132 ); ?></div>
			<div class="contributor-summary">
				<h2 class="contributor-name"><?php echo get_the_author_meta( 'display_name', $contributor_id ); ?></h2>
				<p class="contributor-bio">
					<?php echo get_the_author_meta( 'description', $contributor_id ); ?>
				</p>
				<a class="contributor-posts-link" href="<?php echo esc_url( get_author_posts_url( $contributor_id ) ); ?>">
					<?php printf( _n( '%d Article', '%d Articles', $post_count, 'twentyfourteen' ), $post_count ); ?>
				</a>
			</div><!-- .contributor-summary -->
		</div><!-- .contributor-info -->
	</div><!-- .contributor -->

	<?php
	endforeach;
}
endif;

/**
 * Extend the default WordPress body classes.
 *
 * Adds body classes to denote:
 * 1. Single or multiple authors.
 * 2. Presence of header image.
 * 3. Index views.
 * 4. Full-width content layout.
 * 5. Presence of footer widgets.
 * 6. Single views.
 * 7. Featured content layout.
 *
 * @since Twenty Fourteen 1.0
 *
 * @param array $classes A list of existing body class values.
 * @return array The filtered body class list.
 */
function twentyfourteen_body_classes( $classes ) {
	if ( is_multi_author() ) {
		$classes[] = 'group-blog';
	}

	if ( get_header_image() ) {
		$classes[] = 'header-image';
	} else {
		$classes[] = 'masthead-fixed';
	}

	if ( is_archive() || is_search() || is_home() ) {
		$classes[] = 'list-view';
	}

	if ( ( ! is_active_sidebar( 'sidebar-2' ) )
		|| is_page_template( 'page-templates/full-width.php' )
		|| is_page_template( 'page-templates/contributors.php' )
		|| is_attachment() ) {
		$classes[] = 'full-width';
	}

	if ( is_active_sidebar( 'sidebar-3' ) ) {
		$classes[] = 'footer-widgets';
	}

	if ( is_singular() && ! is_front_page() ) {
		$classes[] = 'singular';
	}

	if ( is_front_page() && 'slider' == get_theme_mod( 'featured_content_layout' ) ) {
		$classes[] = 'slider';
	} elseif ( is_front_page() ) {
		$classes[] = 'grid';
	}

	if( get_field( 'scanlines' ) == 1 ) {
		$classes[] = "show-scanlines";
	}

	if( gj_has_dog_animation() ) {
		$classes[] = "has-dog";
	}

	return $classes;
}
add_filter( 'body_class', 'twentyfourteen_body_classes' );

/**
 * Extend the default WordPress post classes.
 *
 * Adds a post class to denote:
 * Non-password protected page with a post thumbnail.
 *
 * @since Twenty Fourteen 1.0
 *
 * @param array $classes A list of existing post class values.
 * @return array The filtered post class list.
 */
function twentyfourteen_post_classes( $classes ) {
	if ( ! post_password_required() && has_post_thumbnail() ) {
		$classes[] = 'has-post-thumbnail';
	}

	return $classes;
}
add_filter( 'post_class', 'twentyfourteen_post_classes' );

/**
 * Create a nicely formatted and more specific title element text for output
 * in head of document, based on current view.
 *
 * @since Twenty Fourteen 1.0
 *
 * @param string $title Default title text for current view.
 * @param string $sep Optional separator.
 * @return string The filtered title.
 */
function twentyfourteen_wp_title( $title, $sep ) {
	global $paged, $page;

	if ( is_feed() ) {
		return $title;
	}

    if( is_page_template( 'templates/quicklinks.php' ) ) {
        global $wp;

        parse_str( $wp->matched_query, $query );

        $for = strtolower( $query[ 'for' ] );
        $title = "Properties" ;
        $title .= ( $for == "sale" ) ? " for Sale" : " to Let";

        //Is bedroom links?
        $where = $query[ 'where' ];
        $is_bedrooms = stripos( $where, '-bedroom' ) !== false;

        if( ! $is_bedrooms ) {
            $where = str_replace( 'properties-for-sale-', '', $where );
            $where = str_replace( 'properties-to-let-', '', $where );

            $title .= " in " . ucfirst( $where );
        } else {
            $title = str_replace( '-', ' ', $where );
            $title = ucfirst( $title );

            $beds = explode( '-', $where );
            $beds = intval( $beds[0] );

            $where = str_replace( $beds . '-', '', $where );
            $where = str_replace( 'bedroom-properties-for-sale-', '', $where );
            $where = str_replace( 'bedrooms-properties-for-sale-', '', $where );
            $where = str_replace( 'bedroom-properties-to-let-', '', $where );
            $where = str_replace( 'bedrooms-properties-to-let-', '', $where );

            $GLOBALS[ 'beds' ] = $beds;
        }

        $where = str_replace( '-', ' ', $where );
        $GLOBALS[ '_where_' ] = trim( $where );

        $GLOBALS[ '_for_' ] = strtolower( $query[ 'for' ] );

				if( $sep == '@' ) return $title;

        $title .= " | ";
    } else {
        //Return title modified by Wordpress SEO
        return $title;
    }

    $title .= get_bloginfo( 'name' );

	// Add the site description for the home/front page.
	$site_description = get_bloginfo( 'description', 'display' );
	if ( $site_description && ( is_home() || is_front_page() ) ) {
		$title = "$title $sep $site_description";
	}

	// Add a page number if necessary.
	if ( $paged >= 2 || $page >= 2 ) {
		$title = "$title $sep " . sprintf( __( 'Page %s', 'twentyfourteen' ), max( $paged, $page ) );
	}

	return $title;
}
add_filter( 'wp_title', 'twentyfourteen_wp_title', 99, 2 );

/*
 * Allow the user to set 5 backgrounds
 */
function add_menu_backround_selection() {
    for( $i = 0; $i < 4; $i++ ) {
        switch ( $i ) {
            case 0:
                $section = 'About us';
                break;
            case 1:
                $section = 'Developments';
                break;
            case 2:
                $section = 'Our services';
                break;
            case 3:
                $section = 'Contact us';
                break;
        }
        $page = add_theme_page( "gj-backgrounds-" . $i, "Backgrounds - $section", "administrator", "gj-backgrounds-" . $i, 'add_background_selection' );

        add_action( 'load-' . $page, 'enqueue_background_scripts' );
    }
}

function enqueue_background_scripts() {
    wp_enqueue_media();
    wp_enqueue_script( 'custom-header' );

    wp_enqueue_script( 'gj-backgrounds', get_template_directory_uri() . "/js/bg.js" );
}

function add_background_selection() {
    // Add to the top of our data-update-link page
     $my_page = $_GET['page'];


    if ( isset($_POST[ 'add' ] ) ) {
        $nonce = $_POST[ "gj_nonce_field" ];

        if( wp_verify_nonce( $nonce, 'create' ) ) {
            $images = $_POST[ 'file' ];

            $images = array_filter($images);

            update_option( "_$my_page" , $images );
        }
    }

    $images = get_option( "_$my_page", array() );

?>

<h2>Page backgrounds</h2>
<div class="wrap">
    <form method="post">
        <?php wp_nonce_field( "create", "gj_nonce_field" ) ?>
        <input type="hidden" name="page" value="<?php echo $_GET[ 'page' ] ?>" />
        <input type="hidden" name="add" value="1" />
    <div class="theme-browser rendered">
        <div class="themes">

            <?php
                for( $i = 0; $i < 5; $i++ ) :

                    $bg = @$images[$i];
                    if( ! empty( $bg ) ) {
                        $src = wp_get_attachment_image_src( $bg, 'medium' );
                        $src = $src[0];
                        $bg = "background-image: url('$src');";
                    }
            ?>
            <div class="theme add-new-theme add-new-background" style="<?php echo $bg ?>background-size: cover">
                <input type="hidden" name="file[<?php echo $i ?>]" value="<?php echo @$images[$i] ?>" />
                <a class="choose-from-library-link" id="file-<?php echo $i ?>" href="#"
                        data-update-link="<?php echo esc_attr( $modal_update_href ); ?>"
                        data-choose="<?php esc_attr_e( 'Choose a Default Image' ); ?>"
                        data-update="<?php esc_attr_e( 'Use as backgound image' ); ?>"><?php _e( '' ); ?>
                    <div class="theme-screenshot"><span></span>
                    </div>
                    <h3 class="theme-name"><?php echo ( ! empty( $bg ) ) ? "" : "Set background" ?></h3>
                </a>
                <a class="remove-bg" style="position: absolute; display: block; width: 100%; text-align: center; background: #fff; padding:5px 0">Remove</a>
            </div>

            <?php endfor; ?>
        </div>
    </div>

        <div style="clear:both">
            <?php submit_button() ?>
        </div>

    </form>
</div>
<?php
}

add_filter( 'admin_menu', 'add_menu_backround_selection' );


/**
 * Filter property search in "/property" page
 */
function gj_filter_property_search( $query ) {
    $meta = array();
	
    if( ( ! $query->is_main_query() || ! isset( $_GET[ 'search' ] )  )
            && ! isset( $GLOBALS[ 'search' ] )
            || isset($query->query_vars['_skip'] )
            || $query->query[ 'post_type' ] == 'nav_menu_item'
    		|| is_page_template( 'templates/quicklinks-new.php' ) )
    	return;

    /*
     * The SEO company wants better seo link.
     * So I need to check if the where it's the postcode or the category...
     */
    if( isset( $GLOBALS[ '_where_' ] ) ) {
        $where = $GLOBALS[ '_where_' ];
        $office = get_option( 'gj_offices_postcodes', '' );

        if( stripos( $office, $where ) !== false ) {
            $postcode = strtolower( $where );
            $GLOBALS['_postcode_'] = trim( $postcode );
        } else {
            $category = strtolower( $where );
        }
    }

    //Office
    if( ! empty( $_GET[ 'office' ] ) || ! empty( $GLOBALS[ 'office' ]  ) || ! empty( $wp_query->query_vars['office'] ) ) {

    	$office = '';
    	if ( ! empty( $_GET[ 'office' ] ) ) {
    		$office = $_GET[ 'office' ];
    	} else if ( ! empty( $GLOBALS[ 'office' ] ) ) {
    		$office = $GLOBALS[ 'office' ];
    	} else if ( ! empty( $wp_query->query_vars['office'] ) ) {
    		$office = $wp_query->query_vars['office'];
    	}

    	if ( $office == 'Southbank' )
    		$office = 'Nine Elms';

        $meta[] = array(
          'key' => 'office',
          'value' => $office,
          'compare' => '=',
        );
    }

    //Developments
    if( ! empty( $_GET[ 'development' ] ) || ! empty( $GLOBALS[ 'development' ]  ) ) {
        $dev = isset( $_GET[ 'development' ] ) ? $_GET[ 'development' ] : $GLOBALS[ 'development' ];

        $is_numeric = is_numeric( $dev );

        /*
         * If a "sub development" is set I need to set it as main category,
         * otherwise all the developments in the same parent category wil be displayed
         */
        if( $is_numeric ) {
            $query->set( 'cat', $dev );
        } else {
            if( ! is_array( $dev ) ) {
                $dev = array( $dev );
            }

            foreach( $dev as $d ) {
                $meta[] = array(
                              'key' => 'locality',
                              'value' => addslashes( $d ),
                              'compare' => '=',
                );
            }
        }
    }

    //# Price range
    if( ! empty( $_GET[ 'min-price' ] ) && intval( $_GET[ 'min-price' ] ) > 0 ) {
        $price = intval( $_GET[ 'min-price' ] ) * 100000;

        $meta[] = array(
                      'key' => 'price',
                      'value' => $price,
                      'compare' => '>=',
                      'type' => 'numeric'
                    );
    }

    //max price
    if( 
    	( ! empty( $_GET[ 'max-price' ] ) && intval( $_GET[ 'max-price' ] ) > 0 ) ||
		( ! empty( $GLOBALS[ 'max-price' ] ) && intval( $GLOBALS[ 'max-price' ] ) > 0 )
    ) {
        $price = intval( $_GET[ 'max-price' ] );
    	if ( empty( $price ) ) {
    		$price = intval( $GLOBALS[ 'max-price' ] );
    	}

		if( $_GET['status'] == 'sale' ) {
			$price *= 100000;
        	
        	if( $price >= 20000000 ) 
        		$price = 999999999;

		} else {
			$price *= 10;
		}

        $meta[] = array(
          'key' => 'price',
          'value' => $price,
          'compare' => '<=',
          'type' => 'numeric'
        );
    }

    //# of beds
    if( 
    	! empty( $_GET[ 'beds' ] ) ||
	    ! empty( $GLOBALS[ 'beds' ] )
	) {
		$beds = intval( isset( $GLOBALS[ 'beds' ] ) ? $GLOBALS[ 'beds' ] : $_GET['beds']);
        $query->set( 'meta_key', 'bedrooms' );

        $meta[] = array(
          'key' => 'bedrooms',
          'value' => $beds,
          'compare' => ( $beds < 3 ) ? '=' : '>=',
          'type' => 'numeric'
        );
    }

    //River views
    if( ! empty( $_GET[ 'river-view' ] ) ) {
        $compare = ( intval( $_GET[ 'river-view' ] ) == 1 ) ? 1 : 0;

        $meta[] = array(
                      'key' => 'riverview',
                      'value' => $compare,
        );
    }

    //Postcode? ( used by 3D single development )
    $pcodes = isset( $GLOBALS[ 'postcode' ] ) ? $GLOBALS[ 'postcode' ] : @$_GET[ 'postcode' ];
    if( ! empty( $pcodes ) ) {
        if( ! is_array( $pcodes ) ) {
            $pcodes = array( $pcodes );
        }

        foreach( $pcodes as $pcode ) {
            $meta[] = array(
                          'key' => 'postcode',
                          'value' => urldecode( $pcode ),
                          'compare' => '=',
                    );
        }
    }

    //Search for postcode LIKE $$%
    if( isset( $postcode ) ) {
        $meta[] = array(
                      'key' => 'postcode',
                      'value' => trim( $postcode ),
                      'compare' => 'LIKE',
                );
    }

//    //Sales/Rent
    if( 
    	isset( $_GET[ 'status' ] ) || 
    	isset( $GLOBALS[ '_for_' ] ) ||
    	isset( $GLOBALS[ 'status' ] )
    ) {
        
        $status = isset( $GLOBALS[ '_for_' ] ) ? $GLOBALS[ '_for_' ] : $_GET[ 'status' ];
    	if ( empty( $status ) ) {
    		$status = $GLOBALS['status'];
    	}

    	if ( $status == 'sales' ) {
    		$status = 'sale';
    	} else if ( $status == 'lettings' ) {
    		$status = 'let';
    	}

        $meta[] = array(
          'key' => 'status',
          'value' => strtolower( $status ),
          'compare' => "=",
        );
    }

    //Properties type
    if( ! empty( $GLOBALS[ '_type_' ] ) ) {
        $meta[] = array(
                      'key' => 'type',
                      'value' => ucfirst( $GLOBALS[ '_type_' ] ),
                      'compare' => "=",
        );
    }

    // var_dump($meta);

    if( ! empty( $meta ) ) {
        $query->set( 'meta_key', 'price' );

        $query->set( 'meta_query', array_merge( array(
                                              'relation' => 'AND' ),
                                               $meta )
                   );
    }

    $query->set( 'order', 'ASC' );
    $query->set( 'orderby', 'meta_value_num' );
    $query->set( 'meta_key', 'price');


}
add_action( 'pre_get_posts', 'gj_filter_property_search' );



function wpse18703_posts_where( $where, &$wp_query )
{
    global $wpdb;

		if( ( ! $wp_query->is_main_query() || ! isset( $_GET[ 'search' ] )  )
            && ! isset( $GLOBALS[ 'search' ] ) ||
            isset($wp_query->query_vars['_skip'] )
            || $wp_query->query[ 'post_type' ] == 'nav_menu_item' ) return $where;

    if ( ! isset( $_GET[ 'title' ] ) && ! isset( $_GET[ 'property' ] ) ) return $where;

		$is_property = isset( $_GET[ 'property' ] );
		$title = isset( $_GET[ 'title' ] ) ? trim( $_GET[ 'title' ] ) : trim( $_GET[ 'property' ] );
// updated by Ilia
  	$where .= ' AND (( 
  	            ' . $wpdb->posts . '.post_title LIKE \'%' . esc_sql( $wpdb->esc_like( $title ) ) . '%\')';
		if( $is_property ) {
			$where .= "
			            OR ({$wpdb->posts}.ID IN ( SELECT t99.post_id FROM {$wpdb->postmeta} t99 WHERE meta_key = 'postcode' AND meta_value LIKE '%" . $title . "%') ) 
			            OR ({$wpdb->posts}.ID IN ( SELECT t999.post_id FROM {$wpdb->postmeta} t999 WHERE meta_key = 'userfield1' AND meta_value LIKE '%" . $title . "%') )
			           ";
		}

		$where .= ')';
//var_dump($wp_query);
//global $wpdb;
//$qr = $wpdb->get_results("SELECT t999.post_id FROM wp_postmeta t999 WHERE meta_key = 'userfield1' AND meta_value LIKE '%Hoola%'");
//var_dump($qr);
//die ("where = $where");
// updated by Ilia
    return $where;
}
add_filter( 'posts_where', 'wpse18703_posts_where', 10, 2 );

function my_deregister_javascript() {
    wp_deregister_script( 'jquery' );
}

function gj_add_submenu( $name ) {
    //Current menu item, I need to know the menu id
    $menu = wp_get_nav_menu_object( $name );

    //Get the subitems
    $sitems = wp_get_nav_menu_items( $menu->term_id );

    $url = curPageURL();

    echo '<ul class="submenu leftmenu">';

    $subitem = false;
    foreach( $sitems as $item ) {
        //Is a subitem?
        if( $item->menu_item_parent > 0 && ! $subitem ) {
echo <<< SUBITEMS
    <li class="subitems">
        <ul class="subitems">
            <li><hr class="sidesep"></li>
SUBITEMS;

            $subitem = true;
        }

        //Subitem end?
        if( $subitem && $item->menu_item_parent == 0 ) {
echo <<< SUBITEMSEND
            <li><hr class="sidesep"></li>
        </ul>
    </li>
SUBITEMSEND;

            $subitem = false;
        }

		// if the link points to somewhere else, open in new tab
		if ( stristr( $item->url, home_url() ) ) {
			$target = '';
		} else {
			$target = 'target="_blank"';
		}

        if( $item->url != "#" && $item->title[0] != "<" ) {
            $class = ( get_the_ID() == $item->object_id || trailingslashit( $item->url ) == $url ) ? "active" : "";
echo <<< EOT
    <li>
        <a href="$item->url" class="$class" data-title="$item->title" $target>
            <span>$item->title<span>
        </a>
    </li>
EOT;
        } else {
            if( $item->title[0] == "#" ) echo ( '<li>&nbsp;</li>' );

            continue;
        }
    }

    echo '</ul>';
}

function curPageURL() {
 $pageURL = 'http';
 if ($_SERVER["HTTPS"] == "on") {$pageURL .= "s";}
 $pageURL .= "://";
 if ($_SERVER["SERVER_PORT"] != "80") {
  $pageURL .= $_SERVER["SERVER_NAME"].":".$_SERVER["SERVER_PORT"].$_SERVER["REQUEST_URI"];
 } else {
  $pageURL .= $_SERVER["SERVER_NAME"].$_SERVER["REQUEST_URI"];
 }
 return trailingslashit( $pageURL );
}

function get_gmap_markers() {
    global $wpdb;

    if ( ! wp_verify_nonce( $_REQUEST['nonce'], "gjdev_nonce_field_yeah")) {
        die( -1 );
    }

    $ne = $_POST[ 'ne' ];
    $sw = $_POST[ 'sw' ];

		$letter = @$_POST['letter'];
		if( empty( $letter ) ) $letter = '%';

		//Category set?
		$filter_start = $filter_end = "";

		$development = isset( $_POST['development'] ) ? ( $_POST['development' ] ) : '';
		if( isset( $_POST[ 'category' ] ) && ! empty( $_POST[ 'category' ] ) ) {
			$filter_start = "(";
			$filter_end =") INNER JOIN $wpdb->postmeta as mt3 ON pp.ID = mt3.post_id AND ( mt3.meta_key = 'marker_icon' AND mt3.meta_value = '" . ( $_POST[ 'category' ] ) . "' ) ";
		}

		$type = ( isset( $_POST[ 'type' ] ) ) ? $_POST[ 'type' ] : 'knowledge';
		if( is_array( $type ) ) {
			$post_type = " IN ( '" . join( "', '", $type ) . "' )";
		} else {
			$post_type = " = '" . $type . "'";
		}

	$query = "SELECT * FROM " . $filter_start . " ( $wpdb->posts as pp INNER JOIN $wpdb->postmeta as mt1 ON pp.ID = mt1.post_id AND ( mt1.meta_key = 'gmap_latitude' AND mt1.meta_value BETWEEN " . ( $sw[0] ) . " AND " . ( $ne[0] ) . " ) ) " .
	                " INNER JOIN $wpdb->postmeta as mt2 ON pp.ID = mt2.post_id AND ( mt2.meta_key = 'gmap_longitude' AND mt2.meta_value BETWEEN  " . ( $sw[1] ) . " AND " . ( $ne[1] ) . " ) " . $filter_end .
	                " WHERE post_status = 'publish' AND post_type $post_type AND LEFT(post_title, 1) LIKE '" . $letter . "'";

    error_log('marker_general');
    error_log($query);

    $posts = $wpdb->get_results( $query );

    $coords = array();
		$development = htmlentities( $development );

    foreach( $posts as $post ) {
        $img = get_field( 'custom_background', $post->ID );

        if( ! is_array( $img ) ) {
            $img = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ), 'thumbnail' );

            $img = $img[0];
        } else {
            if( isset( $img['sizes']['thumbnail'] ) )
                $img = $img['sizes']['thumbnail'];
            else
                $img = $img['url'];
        }

        $marker = get_field( "marker_icon", $post->ID );
        if( $type == "videos" ) {
            $marker = 'icon-play'; // change here :D greg
        } else {
            if( $marker == null ) {
                $marker = 'default-marker';
            } else {
                $marker = 'knowledge/' . sanitize_title( $marker );
            }
        }

        // TODO: Remove this once all markers in place
        $marker = 'default-marker';

        $marker = get_template_directory_uri() . '/img/' . $marker . '.png';

        // get the category name
        $category = get_the_category($post->ID);
        $category_name = is_array( $category ) ? $category[0]->name : '';
        if( ! empty( $development ) && ! empty( $category_name ) && $category_name != $development ) continue;

        $video = ( $type == "videos" ) ? "https://www.youtube.com/v/1Vr1jexrjWs" : "";

        $sales_link = '';
        $lettings_link = '';

        if ( get_field( 'form_description', $post->ID ) ) {
            $description = strtolower( get_field( 'form_description', $post->ID) );

            if( strpos( $description, 'sales' ) !== false ) :
                $sales_link = home_url( '/properties/?status=sale&search=1&title=' . str_replace( ' ', '+', get_the_title($post->ID) ) );
            endif;
            if( strpos( $description, 'lettings' ) !== false ) :
              $lettings_link = home_url( '/properties/?status=let&search=1&title=' . str_replace( ' ', '+', get_the_title($post->ID) ) );
            endif;
        }

        $coords[] = array(
            "id" => $post->ID,
            "lat" => get_field( "gmap_latitude", $post->ID ),
            "lng" => get_field( "gmap_longitude", $post->ID ),
            "icon" => $marker,
            "title" => $post->post_title,
            "content" => $post->post_content,
            "image" => $img,
            "link" => get_permalink( $post->ID ),
            "category" => $category_name,
            "video" => $video,
            "sales_link" => $sales_link,
            "lettings_link" => $lettings_link
        );
    }

    echo json_encode( $coords );
    die();
}

add_action( 'wp_ajax_get_gmap_markers', 'get_gmap_markers' );
add_action( 'wp_ajax_nopriv_get_gmap_markers', 'get_gmap_markers' );

function get_properties_markers() {
	global $wpdb;

	// if property is searched...
	$data = $_POST['data' ];
	foreach( $data as $key => $value ) {
		$_GET[$key] = $value;
	}
	$ne = $_POST[ 'ne' ];
	$sw = $_POST[ 'sw' ];

	$_GET[ 'ne' ] = $ne;
	$_GET[ 'sw' ] = $sw;

	$_GET[ 'search' ] = 1;
	$GLOBALS[ 'search' ] = 1;

	$args = array(
		'posts_per_page'   => -1,
		'post_type'        => 'post',
		'post_status'      => 'publish',
		'suppress_filters' => true
	);

	/*
	 * I can't specify lat & lon using the $meta array
	 * as wp cast the meta_value and I lost all the decimals :(
	 * So I'm gonna crete the query by my self, and retrieve all the id of the properties visibles
	 * in the specified area. After I'll use them to skip the properties not visibles.
	 * I'm not gonna to create all the query by myself as the number of parameters, and so the joins,
	 * are variable...
	 */
	$refineSearch = '%%';
	if ( ! empty( $_GET['property'] ) ) {
		$refineSearch = "%" . $_GET['property'] . "%";
	}

    $query = $wpdb->prepare(
    	"SELECT id,mt1.meta_value as lat, mt2.meta_value as lot  FROM ( $wpdb->posts as pp INNER JOIN $wpdb->postmeta as mt1 ON pp.ID = mt1.post_id AND ( mt1.meta_key = 'lat' AND mt1.meta_value BETWEEN %f AND %f ) ) " . " INNER JOIN $wpdb->postmeta as mt2 ON pp.ID = mt2.post_id AND ( mt2.meta_key = 'lon' AND mt2.meta_value BETWEEN %f AND %f ) WHERE post_status = 'publish' AND post_type = 'post' AND post_title LIKE %s",
		$sw[0],
		$ne[0],
		$sw[1],
		$ne[1],
		$refineSearch
	);
    
	$results = $wpdb->get_results( $query, ARRAY_N );

    error_log('marker_properties');
    error_log( $query );

	$valid_ids = array();
	$coordinates = array();
	foreach( $results as $r ) {
		$coordinates[ $r[0] ] = array( $r[1], $r[2]);
		$valid_ids[] = $r[0];
	}
	$posts = get_posts( $args );

	$coords = array();
	foreach( $posts as $post ) {
		if( ! in_array( $post->ID, $valid_ids ) ) continue;

		$img = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ), 'thumbnail' );
		$img = @$img[0];

		if( empty( $img ) ) {
			$img = get_field( 'custom_background', $post->ID );
		}

		$marker = get_field( "marker_icon", $post->ID );
		if( $marker == null ) {
			$marker = 'default-marker';
		} else {
			$marker = 'knowledge/' . sanitize_title( $marker );
		}

		$marker = get_template_directory_uri() . '/img/' . $marker . '.png';

		// get the category name
		$category = get_the_category($post->ID);
		$category_name = is_object( $category ) ? $category[0]->name : '';

		$coords[] = array(
			"id" => $post->ID,
			"lat" => $coordinates[ $post->ID ][0],
			"lng" => $coordinates[ $post->ID ][1],
			"icon" => $marker,
			"title" => $post->post_title,
			"content" => $post->post_content,
			"image" => $img,
			"link" => get_permalink( $post->ID ),
			"category" => $category_name,
			"price" => number_format( get_field( 'price', $post->ID ) ),
		);
	}

	echo json_encode( $coords );
	die();
}

add_action( 'wp_ajax_get_properties_markers', 'get_properties_markers' );
add_action( 'wp_ajax_nopriv_get_properties_markers', 'get_properties_markers' );

function get_knowledge_details() {
    global $wpdb;

    // error_log( print_r( $_POST, true ) );
    $id = intval( $_POST[ 'id' ] );
    if ( ! wp_verify_nonce( $_REQUEST['nonce'], "gjdev_nonce_field_yeah")
    	 || $id == 0 ) {
        die( -1 );
    }

    $post = get_post( $id );

    $img = wp_get_attachment_image_src( get_post_thumbnail_id( $id ), 'large' );
    $img = @$img[0];

    $data = array(
	               "id" => $post->ID,
	                "title" => $post->post_title,
	                "content" => $post->post_content,
	                "thumbnail" => $img,
	             );

    echo json_encode( $data );

    die();
}

add_action( 'wp_ajax_get_knowledge_details', 'get_knowledge_details' );
add_action( 'wp_ajax_nopriv_get_knowledge_details', 'get_knowledge_details' );

function gj_get_apartments() {
    global $wpdb;

    if ( ! wp_verify_nonce( $_REQUEST['nonce'], "gjdev_nonce_field_yeah")) {
        die( -1 );
    }

    $postcode = $_POST[ 'postcode' ];
    $floor = $_POST[ 'floor' ];

    //Set the fields in $_GET to (re)use the function "gj_filter_property_search" defined in functions.php
    $GLOBALS[ 'search' ] = 1;
    $GLOBALS[ 'postcode' ] = $postcode;

    $args = array(
                    'post_type' => 'post',
                    'post_status'      => 'publish',
                    'posts_per_page'   => -1,
                 );

    $apartments = array();

    $gj_query = new WP_Query( $args );
    if( $gj_query->have_posts() ) {
        while( $gj_query->have_posts() ) {
            $gj_query->the_post();

            $info = get_post_meta( get_the_ID(), '_gj_plotting', true );

            $floor = intval( $info[ 'number' ] );
            $f = wp_get_attachment_image_src( get_post_thumbnail_id( get_the_ID() ), 'single-post-thumbnail' );

            $price = get_field('price');
            if ($price <= 80000 ) {
                $disprice = number_format($price);
                $display = "£ " . $disprice . " pw";
            } else {
                $disprice = number_format($price);
                $display = "£ ".$disprice;
            }

            $bullets = array();
            for( $i = 0; $i < 10; $i++ ) {
                $bullets[] = get_field( 'bullet' . $i );
            }

            $map = get_attached_file( @$info[ 'map' ] );
            list( $width, $height ) = getimagesize( $map );

            $w2 = $width / 2;
            $h2 = $height / 2;

            //Convert the coordinates in % and return in according to the center of the image
            $coords = explode( ",", @$info[ 'coords' ] );   //This value is referred to the original image size

            /**
             * 3D model axis
             *
             *        |
             *  z <---+-
             *        |
             *        v
             *        x
             */
            $pcoords = array(
                                "z" => ( $w2 - $coords[0] ) / - $w2,
                                "x" => ( $h2 - $coords[1] ) / - $h2
            );

            //Direction coordinates
            $dcoords = explode( ",", @$info[ 'dcoords' ] );   //This value is referred to the original image size
            $dcoords = array(
                                "z" => ( $w2 - $dcoords[0] ) / - $w2,
                                "x" => ( $h2 - $dcoords[1] ) / - $h2
            );
            $apartments[ $floor ][] = array(
                                            'beds' => get_field( 'bedrooms' ),
                                            'map' => wp_get_attachment_url( @$info[ 'map' ] ),
                                            'coords' => @$info[ 'coords' ],
                                            'pcoords' => $pcoords,  //Coordinates in %
                                            'dcoords' => $dcoords,  //Direction coordinates ( dot outside the building )
                                            'dangle' => intval( @$info[ 'dangle' ] ),
                                            'featured' => @$f[0],
                                            'excerpt' => get_the_excerpt(),
                                            'id' => get_the_ID(),
                                            'link' => get_permalink(),
                                            'price' => $display,
                                            'title' => get_the_title(),
                                            'bullets' => array_filter( $bullets ),
            );
        }
    }

    die( json_encode( $apartments, JSON_FORCE_OBJECT ) );
}

/*
 * This function extract the floor number from the feed, because it is stored
 * in one of bullet id field ( yes, is not the same for each property ).
 *
 * The value of floor is stored as:  {cardinal number} Floor, es: 8th Floor.
 * So I need to check if there is the Floor world in the value and get only the number.
 *
 * -.-"
 */
function set_floor_from_feed() {
    $args = func_get_args();

    foreach ($args as $index => $arg) {
        $pos = stripos( $arg, " floor" );
        if( FALSE === $pos ) continue;

        //Got it
        return intval( $arg );
    }

    return "";
}

/**
 * Set the property status as To Let / to Sale
 *
 */
function update_property_status( $status ) {
    return ( strtolower( $status ) == "pw" ) ? "let" : "sale";
}

function update_development_name( $name ) {
	return str_replace( 'Marsham Street', 'Westminster', $name );
}

/*
 * This function avoid user to go directly to "payments/confirmation" page using the link
 */
function set_form_cookie( $entry, $form ) {
    $token = md5( uniqid( rand(), true) );

    //generate random cookie
    $expire = time()+3600;
    $tokens = get_option( '_gj_tokens', array() );
    $tokens[] = array( 'token' => $token,
                       'expire' => $expire
     );

    update_option( "_gj_tokens", $tokens );

    $status = setcookie("_tcs_accepted", $token, $expire, "/",$_SERVER['SERVER_NAME'] );

    wp_redirect( get_the_permalink( 48251 ) );
    die();
}

add_action( "gform_after_submission_10", "set_form_cookie", 10, 2 );


function convertToOffice( $officeName ) {
	if ( $officeName == 'westminster' )
		return 'Westminster';
	else if ( $officeName == 'nine-elms' )
		return 'Nine+Elms';
	else if ( $officeName == 'chelsea-bridge-wharf' )
		return 'Chelsea+Bridge+Wharf';
	else if ( $officeName == 'southbank' )
		return 'Southbank';
	else if ( $officeName == 'Victoria-and-Pimlico' )
		return 'Victoria+and+Pimlico';
}

/*
 * Quick links "special" page
 */
add_action( 'init', 'gj_properties_for_salelet', 99 );
function gj_properties_for_salelet() {}

// ?search=1&min-price=&status=sale&property=&office=&max-price=200&beds=&river-view=
// /property-sales/houses-for-sale-westminster/
function quicklinks_rewrite_tag() {
	add_rewrite_tag('%search%', '([^&]+)');
	add_rewrite_tag('%status%', '([^&]+)');
	add_rewrite_tag('%property%', '([^&]+)');
	add_rewrite_tag('%office%', '([^&]+)');
	add_rewrite_tag('%max-price%', '([^&]+)');
	add_rewrite_tag('%beds%', '([^&]+)');
	add_rewrite_tag('%river-view%', '([^&]+)');
}
add_action('init', 'quicklinks_rewrite_tag', 10, 0);

function quicklinks_rewrite_rule() {
    flush_rewrite_rules();
}
add_action('init', 'quicklinks_rewrite_rule', 10, 0);

// Add specific CSS class by filter
function gj_single_2d_class_names( $classes ) {
	// add 'class-name' to the $classes array
	$classes[] = 'single-2d';

	// return the $classes array
	return $classes;
}

// Add specific CSS class by filter
function gj_single_3d_class_names( $classes ) {
	// add 'class-name' to the $classes array
	$classes[] = 'single-3d';

	// return the $classes array
	return $classes;
}

/**
 * Check if the curernt page has dog animation active, and if the user hasn't cookie to skip it
 */
function gj_has_dog_animation() {
	return get_field( 'dog_animation' );
}

/**
 * Grab image from streetview
 */
function gj_grab_sview_image() {
	$url = $_POST[ 'url' ];
	$frame = $_POST[ 'frame' ];
	$from = $_POST[ 'from' ];
	$to = $_POST[ 'to' ];

	//Download the image
	$content = file_get_contents( $url );

	//Save it
	$frame = sprintf('%03d', $frame);
	$out = dirname( __FILE__ ) . "/img/sview/img_{$from}_{$to}_{$frame}.jpg";
	file_put_contents( $out, $content );
	die( "$out" );
}

add_action( 'wp_ajax_grab_sview_image', 'gj_grab_sview_image' );
// add_action( 'wp_ajax_nopriv_grab_sview_image', 'gj_grab_sview_image' );

function gj_get_sview_images_count() {
    if ( ! wp_verify_nonce( $_POST['nonce'], "gjdev_nonce_field_yeah") ) {
    	echo -1;
        die();
    }

    $from = intval( $_POST[ 'from' ] );
    $to = intval( $_POST[ 'to' ] );

    $folder = dirname( __FILE__ ) . "/img/sview/img_{$from}_{$to}*.jpg";
	$images = glob( $folder );

	echo count( $images );
	die();
}

add_action( 'wp_ajax_get_sview_images', 'gj_get_sview_images_count' );
add_action( 'wp_ajax_nopriv_get_sview_images', 'gj_get_sview_images_count' );


//Return a formatted ordinal number
function getOrdinalNumber( $number ) {
$ends = array('th','st','nd','rd','th','th','th','th','th','th');
	if (($number %100) >= 11 && ($number%100) <= 13)
	   $abbreviation = $number. 'th';
	else
	   $abbreviation = $number. $ends[$number % 10];

	return $abbreviation;
}

/**
 * Register single page / script dynamically
 *
 */
//Look up in the "js/single" folder to find if there is a script defined for this single page, if so just include it :)
function gj_register_dynamic_scripts() {
    global $wp_query, $post;

    $script = get_query_var('pagename');
    if ( ! $script && get_the_ID() ) {
        // If a static page is set as the front page, $pagename will not be set. Retrieve it from the queried object
        $script = $post->post_name;
    }

    if( $script ) {
        $scripts = array( $script, $post->post_type );

        //Has a parent page?
        if( $post->post_parent > 0 ) {
            $scripts[] = get_the_title( $post->post_parent );
        }

        //look up for specific script and css for current page
        foreach( $scripts as $script ) {
            $script = sanitize_title( $script );

            //Remove extra numbers
            $script = preg_replace( "/-\d+/", "", $script );

//            $scriptPath = dirname( __FILE__ ) . "/js/src/single/{$script}.js";
//            $scriptUrl = get_template_directory_uri() . "/js/src/single/{$script}.js";
			// minified version
            $scriptPath = dirname( __FILE__ ) . "/js/min/single/{$script}.min.js";
            $scriptUrl = get_template_directory_uri() . "/js/min/single/{$script}.min.js";

            // $scriptPath = dirname( __FILE__ ) . "/js/single/{$script}.min.js";
            // $scriptUrl = get_template_directory_uri() . "/js/single/{$script}.min.js";

            $cssPath = dirname( __FILE__ ) . "/css/{$script}.css";
            $cssUrl = get_template_directory_uri() . "/css/{$script}.css";

            //Exists?
            if( file_exists( $scriptPath ) ) {
                wp_enqueue_script( "single-{$script}", $scriptUrl, array(), '1.0', true );
            }

            //Exists?
            if( file_exists( $cssPath ) ) {
                wp_enqueue_style( "css-{$script}", $cssUrl );
            }
        }
    }
}

function trim_text($text, $count){
	$text = str_replace("  ", " ", $text);
	$string = explode(" ", $text);

	if (count($string) <= $count) {
		return $text;
	}

	$trimed = "";
	for ( $wordCounter = 0; $wordCounter <= $count; $wordCounter++ ) {
		$trimed .= @$string[$wordCounter];
		if ( $wordCounter < $count ) {
			$trimed .= " ";
		} else {
			$trimed .= "...";
		}
	}
	$trimed = trim($trimed);
	return $trimed;
}

//Gravity form poup message
add_filter( 'gform_validation_message', 'sw_gf_validation_message', 10, 2 );
add_filter( 'gform_confirmation', 'sw_gf_confirmation_message', 10, 2 );

function sw_gf_validation_message( $validation_message ) {
	add_action( 'wp_footer', 'sw_gf_js_error' );
}

function sw_gf_js_error() {
	// print_r( $_POST );
?>

	<script type="text/javascript">
		jQuery( document ).ready( function( $ ) {
		<?php
			if( $_POST[ 'is_submit_14' ] ) {
				echo "$( '#register' ).addClass( 'open visible' );";
			} else {
				echo "$( '#worth-popup' ).addClass( 'visible' );";
				// echo "showShade();";
			}
			?>

		});

		// alert( "There was a problem with your submission. Errors have been highlighted." );
	</script>
<?php }

function sw_gf_confirmation_message( $message ) {
	global $gform_message;

	$gform_message = $message;
	add_action( 'wp_footer', 'sw_gf_js_popup' );

	return "";
}

function sw_gf_js_popup() {
	global $gform_message;
?>

	<div id="gform-popup" class="visible close-me">
		<div class="button-close" style="top: -22px; right: -22px;">
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
	<?php
		$post_cat = get_the_category( get_the_ID() );
		$cat_slug = str_replace( '-', '', $post_cat[0]->slug );

		$gform_message = str_replace( ":ADDRESS:", get_option( 'gj_' . $cat_slug . '_address', '' ), $gform_message );
		$gform_message = str_replace( ":PHONE:", get_option( 'gj_' . $cat_slug . '_tel', '' ), $gform_message );
	?>
		<?php echo $gform_message; ?>
	</div>

	<script type="text/javascript">
	jQuery( window ).load( function() {
		var $popup = jQuery( '#gform-popup' );
		$popup.addClass( 'visible' );

		showShade();
		showClose( 500, $popup );
	});
	</script>
<?php
}

function sanitize_url_parameter( $para ) {
	return strtolower( str_replace( ' ', '-', $para ) );
}

add_filter( 'gform_pre_render_21', 'gj_populate_developments' );
add_filter( 'gform_pre_validation_21', 'gj_populate_developments' );
add_filter( 'gform_pre_submission_filter_21', 'gj_populate_developments' );
add_filter( 'gform_admin_pre_render_21', 'gj_populate_developments' );

function gj_populate_developments( $form ) {
	foreach ( $form['fields'] as &$field ) {
		if ( $field->type != 'select' || strpos( $field->cssClass, 'developments' ) === false ) {
				continue;
		}

		$posts = get_posts( array( 'post_type' => 'developments', 'orderby' => 'title', 'posts_per_page' => -1 ) );
		$choices = array();

		foreach ($posts as $post) {
			$choices[] = array( 'text' => $post->post_title, 'value' => $post->ID );
		}

		$field->choices = $choices;
	}

	return $form;
}

function gj_navigation_menu_add_item( $i, $title, $link, $class = "", $data = "" ) {
	$current = trailingslashit( $_SERVER["REQUEST_URI"] );
	$active = ( $current == trailingslashit( $link ) ) ? 'active' : '';

	if( ! empty( $active ) ) {
		$GLOBALS['_is_current_page'] = 1;
	}

	$title = str_replace( ' Parallax', '', $title );
?>
	<li class="item item-<?php echo $i ?> <?php echo $class ?>">
		<a href="<?php echo esc_url( $link ); ?>"  data-id="<?php echo $i ?>" class="<?php echo $active ?>" <?php echo $data ?>>
			<span><?php echo ucwords( $title ); ?></span>
		</a>
	</li>
<?php
}

function gj_get_back_history_item( $post ) {
	$array = array( $post );

	if( $post->post_parent > 0 ) {
		$v = gj_get_back_history_item( get_post( $post->post_parent ) );
		$array[] = $v[0];
	}

	return $array;
}

function gj_add_to_shortlist() {
	if ( ! wp_verify_nonce( $_REQUEST['nonce'], "gjdev_nonce_field_yeah")) {
			die( -1 );
	}

	//
	$list = @$_COOKIE['_gj_shortlist'];
	if( ! empty( $list ) ) $list = unserialize( stripslashes( $list ) );
	if( ! is_array( $list ) ) $list = array();

	$exists = in_array( $_POST['id'], $list );
	$list[] = $_POST['id'];
	$list = serialize( array_unique( $list ) );

	$set = setcookie(
	  '_gj_shortlist',
	  null,
	  -1,
		"/"
	);

	$set = setcookie(
	  '_gj_shortlist',
	  $list,
	  time() + (10 * 365 * 24 * 60 * 60),
		"/"
	);

	// $list = $_COOKIE['_gj_shortlist'];

	echo $exists ? 'The property has already been saved' : 'The property has been saved';

	die();
}

add_action( 'wp_ajax_add_to_shortlist', 'gj_add_to_shortlist' );
add_action( 'wp_ajax_nopriv_add_to_shortlist', 'gj_add_to_shortlist' );

function gj_save_navigation_history() {
	$id = get_queried_object_id();

	$object = get_queried_object();
	if( is_object( $object ) )  {
		if( $object->post_type == 'knowledge' ) {
			$id = 63794;
		} elseif( $object->post_type == 'developments' ) {
			$id = 36737;
		} elseif( $object->post_type == 'post' ) {
			$id = 0;
		}
	}

	$history = @$_COOKIE['_gj_navigation_history'];
	if( empty( $history ) )
		$history = array();
	else
		$history = @unserialize( stripslashes( $history ) );

	if( ! is_array( $history ) ) $history = array();
	if( ! is_front_page() ) {
		//Already exists?
		$key = array_search( $id, $history );

		if( $key !== FALSE ) {
			unset( $history[ $key ] );
		}

		if( $id > 0 )	$history[] = $id;
	}

	$history = array_values( array_filter( $history ) );
	$history = array_slice( $history, -6 );

	$set = setcookie(
	  '_gj_navigation_history',
	  serialize( $history ),
	  time() + (10 * 365 * 24 * 60 * 60),
		"/"
	);

	$GLOBALS['_history_'] = $history;
}

function str_split_unicode($str, $l = 0) {
    if ($l > 0) {
        $ret = array();
        $len = mb_strlen($str, "UTF-8");
        for ($i = 0; $i < $len; $i += $l) {
            $ret[] = mb_substr($str, $i, $l, "UTF-8");
        }
        return $ret;
    }
    return preg_split("//u", $str, -1, PREG_SPLIT_NO_EMPTY);
}

// auto populate the gravity form arrange a viewing hidden field
// with url of the post thumbnail
add_filter( 'gform_field_value_gallery', 'custom_gallery_population' );
function custom_gallery_population( $value ) {

	$image = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ), 'thumbnail' );
	return $image[0];
}

// same with the address
add_filter( 'gform_field_value_address', 'custom_address_population' );
function custom_address_population( $value ) {
	
	return get_field( 'street' ) . ', ' . get_field( 'county' ) . ', ' . get_field( 'postcode' );
}

// same with the offices or lettings
add_filter( 'gform_field_value_salerorlettings', 'custom_salesorlettings' );
function custom_salesorlettings( $value ) {
    if( get_field( 'status' ) == 'sale' ) {
    	$salesOrLettings = 'Sales';
    } else {
    	$salesOrLettings = 'Lettings';
    }

	return $salesOrLettings;
}

// same with the office name
add_filter( 'gform_field_value_office', 'custom_office' );
function custom_office( $value ) {
	$offices = array(
	  'Nine Elms',
	  'Westminster',
	  'South Banks',
	  'Victoria and Pimlico',
	  'Chelsea Bridge Wharf'
	);

	$categories = get_the_category();

	for( $i = 0; $i < count($categories); $i++ ) {
		for( $j = 0; $j < count($offices); $j++ ) {
			if( $categories[$i]->name == $offices[$j] ) {
				$category = $categories[$i];
				continue;
			}
		}
	}

	return $category->name;
}

// same with the price
add_filter( 'gform_field_value_price', 'custom_price' );
function custom_price( $value ) {
	$price = get_field('price');

	if ($price < 80000) {
		return '£' . number_format($price) . ' Per Week';
	}
	return '£' . number_format($price);
}

// same with the no. of bedrooms
add_filter( 'gform_field_value_bedrooms', 'custom_bedrooms' );
function custom_bedrooms( $value ) {
	return get_field( 'bedrooms' );
}

// same with the new title
add_filter( 'gform_field_value_new_title', 'custom_new_title' );
function custom_new_title( $value ) {
	$title = get_field('form_text');

	if ( ! $title || $title == '') {
		$title = get_the_title();
	}

	return $title;
}

//same with office to email
add_filter( 'gform_field_value_office_to_email', 'office_to_email' );
function office_to_email( $value ) {
	$office = get_field('office_email');

	return $office;
}

// Do not add multiple instance, random integer to the sign contract form, as
// this would break the sign canvas plugin
add_filter('gform_multiple_instances_strings', 'custom_instance');
function custom_instance( $value ) {
    if (key_exists("'gform_wrapper_1'", $value) || key_exists("'gform_wrapper_23'", $value)) {
        return array();
    } else {
        return $value;
    }
}

// pull through the search text
add_filter('gform_field_value_search', 'custom_search');
function custom_search( $value ) {
	if (isset($_GET['property']) && $_GET['property'] != '') {
		return $_GET['property'];
	}

	return 'All Properties';
}

/*
 * AJAX Pagination on properties :)
 */
wp_localize_script( 'ajax-pagination', 'ajaxpagination', array(
	'ajaxurl' => admin_url( 'admin-ajax.php' ),
));

add_action( 'wp_ajax_nopriv_ajax_pagination', 'my_ajax_pagination' );
add_action( 'wp_ajax_ajax_pagination', 'my_ajax_pagination' );

function my_ajax_pagination() {
	$args = array(
		'post_type' => 'post',
		'post_status'    => 'publish',
		'posts_per_page' => 20,
	);

    $args['paged'] = $_POST['page'];

    $posts = new WP_Query( $args );
    
    $template = $_POST['template'];

    if( ! $posts->have_posts() ) { 
        // no more posts
    }
    else {
        while ( $posts->have_posts() ) { 
            $posts->the_post();

            if ( $template == 'grid' )
	            get_template_part( 'templates/ajax/grid', 'none' );
	        else if ( $template == 'strips' )
	        	get_template_part( 'templates/ajax/list', 'none' );
        }
    }

    echo '<span class="page-numbers current">' . ( intval( $_POST['page'] ) ) . '</span>';
    echo '<span class="page-numbers">' . ( intval( $_POST['page'] ) + 1 ) . '</span>';

    die();
}

// remove emoji
remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
remove_action( 'wp_print_styles', 'print_emoji_styles' );

// gForm redirect on confirmation to a separate page
add_filter( 'gform_confirmation', 'custom_confirmation', 10, 4 );
function custom_confirmation( $confirmation, $form, $entry, $ajax ) {
	$confirmation = array( 'redirect' => home_url( '/thank-you' ) );

	return $confirmation;
}

// adds support of post slug <address>-<propertyid>
function mcwpd_do_stuff_on_404(){
    global $wpdb;
	if( is_404() ){
 	  // do stuff
      $s = $_SERVER["REQUEST_URI"];
      $pos = strrpos($s,"-");
      if ($pos !== false) {
          $pos++;
          $prop_id = (int)substr($s,$pos,strlen($s)-$pos);
          if ($prop_id > 0) {
              $sql = $wpdb->prepare("SELECT post_id FROM {$wpdb->postmeta} AS pm WHERE (pm.meta_key = %s) AND (pm.meta_value = %s)", array ("p_id", $prop_id));
              $qr = $wpdb->get_results($sql,ARRAY_A);
              if (count($qr) == 1){
	              $url = get_permalink($qr[0]["post_id"]);
	              wp_redirect($url);
	              exit(0);
              }
              //print_r($qr); die ($sql);
	          //var_dump(get_post_meta(5722172,"p_id",true));
	          //die ("s = $s id = $prop_id");
          }
      }
	}
}
add_action( 'template_redirect', 'mcwpd_do_stuff_on_404' );