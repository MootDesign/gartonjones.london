<?php

/**
 * The Template for displaying all single posts
 *
 * @package WordPress
 * @subpackage Twenty_Fourteen
 * @since Twenty Fourteen 1.0
 */

get_header();

$query = "SELECT p.ID, p.post_title, p.post_name, p.menu_order, t.term_id, t.name " .
          "FROM ( ( $wpdb->posts p " .
          "LEFT JOIN $wpdb->term_relationships rel ON rel.object_id = p.ID ) " .
          "LEFT JOIN $wpdb->term_taxonomy tax ON tax.term_taxonomy_id = rel.term_taxonomy_id ) " .
          "LEFT JOIN $wpdb->terms t ON t.term_id = tax.term_id " .
          " WHERE p.post_type = 'developments' AND p.post_status = 'publish' ORDER BY t.name, p.menu_order, p.post_title";

$posts = $wpdb->get_results( $query, ARRAY_A );

$no_filterView = true;
?>

<article class="parallax">

      <section id="sub-menu">
          <ul id="filter-view">
            <li><a href="#" data-category="">View developments in</a></li>
            <?php
              $categories = array();

              foreach( $posts as $post ) :
                $category = $post['name'];
                if( in_array( $category, $categories) ) continue;

                echo '<li><a href="#" data-category="' . $category . '">' . $category . '</a></li>';

                $categories[] = $category;
              endforeach;
            ?>
          </ul>

          <div id="change-view" class="change-view searchpage visible">
            <ul>
			         <li class="text"></li>
              <li data-id="#bg, #strips" class="current facilities-icon-az-new tooltips"><span>List</span></li>
              <li data-id="#grid" class="facilities-icon-grid-new tooltips"><span>Grid</span></li>
              <li data-id="#coverflow, #myDiv-fluidwidth" class="facilities-icon-photo-new tooltips"><span>Coverflow</span></li>
              <li data-id="#mapview" class="facilities-icon-map-new tooltips"><span>Map</span></li>
            </ul>
          </div>
      </section>

      <section id="parallax" class="searchpage">
      <?php require_once( "templates/developments-view.php" ); ?>
    </section>
</article>

<?php
wp_reset_query();

wp_enqueue_style( 'developments-css', get_template_directory_uri() . '/css/developments.css' );
wp_enqueue_script( 'developments-js', get_template_directory_uri() . '/js/single/developments.min.js' );
wp_enqueue_script( 'gmap-js' );
get_footer();
