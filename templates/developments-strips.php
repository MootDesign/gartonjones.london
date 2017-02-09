<?php
/**
 * This gets included in the development landing page...
 * Carry wants the strips to be changed to grid...
 */
?>

<?php global $posts; ?>
<div id="devview" class="content no-search no-title show-filters no-backtop">
<ul id="grid" class="perfect-scrollbar responsive-grid show-me <?php echo @$GLOBALS['_grid_class'] ?>" style="<?php echo $showGrid; ?><?php echo @$GLOBALS['_grid_style'] ?>">

	<?php
		global $gj_query, $wp_query, $gj_grid, $grid_li;

		$devli = '';

		// first get the development category, which needs to be first & second
		// then query that category posts
		// rinse & repeat.
		// 
		wp_reset_query();

		// 539 - Nine Elms
		// 461 - Westminster
		// 578 - Southbank
		// 565 - Elephant & Castle
		
		$firstCategory = get_the_category()[0]->term_id;

		$cat = array( $firstCategory );
		
		$defaultCat = array(539, 461, 578, 565);

		if( ( $key = array_search( $firstCategory, $defaultCat ) ) !== false) {
		    unset( $defaultCat[$key] );
		}

		// ok, now we have the first category as the current one :) yuppi
		$cat = array_merge( $cat, $defaultCat );

		// loop through the categories
		foreach( $cat as $currentCategory ) {
			$args = array(
				'post_type' => 'developments',
				'post_status'    => 'publish',
				'posts_per_page' => -1,
				'cat' => $currentCategory
			);

			$gj_query = new WP_Query( $args );

			if ( $gj_query->have_posts() ) {
				while ( $gj_query->have_posts() ) : $gj_query->the_post();

					$categories = get_the_category();

					if( is_array( $categories ) ) {
						$categories = $categories[0]->name;
					};

					$category = strtolower( $categories );

					$bg = get_field( 'custom_background', get_the_ID() );
					$url = wp_get_attachment_image_src( $bg['id'], 'medium' );
					$url = $url[0];

					$office = get_the_title();

					$permalink = get_permalink( get_the_ID() );

echo <<< LI
	<li class="item" data-category="$category" data-type="$gj_grid">
		<div class="front">
			<div class="image-wrapper">
				<img class="lazy" data-original="$url" alt="">
			</div>
			<div class="bg"></div>
			<div class="info">
				<div class="title">$office</div>
				<div class="categories">$categories</div>
			</div>
			<ul class="link" style="display: none;">
				<li class="view"><a href="$permalink">View Full Details</a></li>
			</ul>
		</div>
	</li>
LI;

				endwhile;

			}
		}
	?>
</ul>
</div>