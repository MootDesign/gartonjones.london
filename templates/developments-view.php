<?php global $posts, $gj_query, $wp_query; ?>
<?php
	// Detect if we are on tablet
	require_once( get_template_directory() . '/mobile.php' );

	$detect = new Mobile_Detect();
?>

<div id="devview" class="content no-search no-title show-filters no-backtop">
	<?php if( ! isset( $no_filterView ) ): ?>
		<ul id="filter-view" class="single">
			<li><span>View developments in</span></li>
			<ul class="click-to-see">
				<li>
					<a href="#" data-category="">All</a>
					<?php
						$categories = array();

						$class = "active";
						foreach( $posts as $post ) :
						$category = $post['name'];
						if( in_array( $category, $categories) ) continue;

						echo '<li data-category="' . $category . '"><a href="#" data-category="' . $category . '">' . $category . '</a></li>';

						$categories[] = $category;
						$class = "";
						endforeach;
					?>
				</li>
			</ul>
		</ul>
	<?php endif; ?>

	<div id="mapview" class="switch-me" data-map="1" data-lat="51.485025" data-lon="-0.127060"></div>
	
	<div id="bg" class="visible  switch-me">
	<?php
	$li = "";
	$grid_li = "";

	$post_ID = get_the_ID();

	foreach( $posts as $post ) {
		$category = $post['name'];

		$img = get_field( 'custom_background', $post[ 'ID' ] );
		$lmap = get_field( 'location_map_image', $post[ 'ID' ] );
		if( $img['mime_type' ] == "video/mp4" ) {
			$img = $lmap;
			$url = $img['url'];
		} else {
			$url = wp_get_attachment_image_src( $img['id'], array( 600, 400 ) );
			$url = $url[0];
		}

		if( empty( $url ) ) {
			$url = get_template_directory_uri() . '/img/default.png';

		}

		echo '<img class="' . $post[ 'post_name' ] . ' load-me" data-src="' . $url . '"/>';

		$li .= '<li data-image="' . $post[ 'post_name' ] . '" data-category="' . $category . '"><a href="' . get_permalink( $post[ 'ID' ] ) . '"><span class="category">' . $category . '</span><h3>' . $post[ 'post_title' ] . '</h3><span class="arrowa"></span></a></li>';
	}
	?>

	</div>

	<?php
		// if we are on mobile phone, don't load the coverflow
		if ( ! $detect->isMobile() || $detect->isTablet()) {
	?>
		<div id="coverflow" style="display: none" class="switch-me">
			<?php require('single-coverflow.php'); ?>
		</div>
	<?php
		}
	?>

	<div id="devgrid" class="switch-me" style="display: block;">
		<?php require( get_template_directory() . '/includes/grid.php' ); ?>
	</div>
</div>

<script type="text/javascript">
	var ajaxData = {
	ajaxurl: "<?php echo admin_url('admin-ajax.php'); ?>",
	nonce: "<?php echo wp_create_nonce("gjdev_nonce_field_yeah"); ?>",
	type: "developments"
	};
</script>
