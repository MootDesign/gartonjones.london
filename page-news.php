<?php
get_header();
?>

<?php require_once( 'news-common.php' ); ?>

<div id="news-row" class="row fullWidth switch-me">
  <div class="page-title columns small-4 medium-12"><h2>News</h2></div>
  <div class="page-title columns small-4 show-for-small-only"><a href="<?php echo home_url(); ?>/blog/"><h2>Blog</h2></a></div>
  <div class="columns medium-4 large-3 featured" data-order="2">
  	<div class="articles-categories">
  		<h2>Articles by Category</h2>
  		<ul>
			<li><a href="#">News</a></li>
			<li><a href="#">Garton Jones Magazine</a></li>
			<li><a href="#">History</a></li>
			<li><a href="#">London</a></li>
			<li><a href="#">Property Hotspots</a></li>
  		</ul>
  	</div>
  	<div>
	    <h2>Featured Articles</h2>

	    <ul class="featured">

	<?php
	   $args = array(
	     'post_type' => 'news',
	     'orderby' => 'post_title',
	     'post_status'       => 'publish',
	     'posts_per_page' => 10,
	     'meta_query' => array(
	     		array(
	     			'key' => 'featured',
	           'type' => 'numeric',
	     			'value' => 1,
	     		)
	     	)
	   );

	   gj_get_posts( $args );
	?>
	    </ul>
	</div>

    <?php
      if( dynamic_sidebar() ) {
        dynamic_sidebar( 'primary' );
      }
    ?>
  </div>
  <div class="columns medium-8 large-9" data-order="1">
    <div id="strips" class="the-strips">
      <ul>
        <!-- <li class="page-title"><h2>News</h2></li> -->
<?php
   $li = "";

   $args = array(
     'post_type' => 'news',
     'orderby' => 'post_title',
     'post_status'       => 'publish',
     'posts_per_page' => -1,
    //  'meta_query' => array(
    //     array(
    //         'key' => 'development',
    //         'value' => get_the_ID(),
    //         'compare' => '=',
    //     )
    // )
   );
   gj_get_posts( $args );
  ?>
      </ul>
    </div>
  </div>
</div>

<?php
get_footer();
?>