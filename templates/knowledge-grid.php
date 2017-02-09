<?php
 include( ABSPATH . 'wp-admin/includes/image.php' );

	require_once( get_template_directory() . '/mobile.php' );
	$detect = new Mobile_Detect();

	if ( $detect->isMobile() && ! $detect->isTablet() ) {
		$imageSize = 'large';
	} else {
		$imageSize = 'large';
	}

	// this is for the default grid view
	global $defaultGrid;

	if ( $defaultGrid == true ) {
		$showGrid = 'display: block;';
	} else {
		$showGrid = '';
	}
?>
<?php wp_enqueue_style('icomoon', get_template_directory_uri() . '/css/icomoon.css' ); ?>
<ul id="grid" class="perfect-scrollbar responsive-grid show-me <?php echo @$GLOBALS['_grid_class'] ?>" style="<?php echo $showGrid; ?><?php echo @$GLOBALS['_grid_style'] ?>">

	<?php
	global $gj_query, $wp_query, $gj_grid;
	
	$gj_query = ( ! isset( $gj_query ) ) ? $wp_query : $gj_query;

	if( ! isset( $gj_query ) ) {
		$args = array(
			'post_type' => 'post',
			'post_status'    => 'publish',
			'posts_per_page' => 12,
		);

		$gj_query = new WP_Query( $args );
	}

if ( $gj_query->have_posts() ) {
	while ( $gj_query->have_posts() ) : $gj_query->the_post();
	// foreach( $gj_query as $post ) {
		$category = get_the_category();
		$office = @$category[0]->name;
		foreach( $category as $c ) {
			if( $c->parent > 0 ) {
				$office = $c->name;
				break;
			}
		}

		$img = get_field( 'custom_background', get_the_ID() );
		$lmap = get_field( 'location_map_image', get_the_ID() );
		if( $img['mime_type' ] == "video/mp4" ) $img = $lmap;

		$thumb = wp_get_attachment_image_src( get_post_thumbnail_id(get_the_ID()), $imageSize );
		
		$url = $thumb['0'];

		if( empty( $url ) ) {
			$url = get_template_directory_uri() . '/img/default.png';

		}

		$permalink = get_permalink( get_the_ID() );

		$description = get_field( 'descriptionfull' );
		$content = explode( " ", $description );
		$content = join( " ", array_slice( $content, 0, 20 ) );
		$title = get_the_title();
		
		$re = "/(?<=,[[:space:]]).*/"; 
		if ( preg_match($re, $title, $matches) ) {
			$title = $matches[0];
		}

		$categories = '';
		$class = "";
		$knowledgeShow = 'hidden';
		$knowledgeHide = '';
		$knowledgeText = '';
		$facilities = '';
		$developmentHide = '';
		$knowledgeUrl = '';

		$gj_grid = strtolower( get_post_type() );
		$letter = "";

		if ($gj_grid == 'knowledge') {

			$facilities = '';
			$categories = get_field( 'marker_icon' );
			$class = 'knowledge-style';
			$knowledgeShow = '';
			$knowledgeHide = 'hidden';
			$knowledgeText = get_the_excerpt();
			$knowledgeUrl = $url;

		} else if ( $gj_grid == 'developments' ) {
			$bg = get_field( 'custom_background', get_the_ID() );
			
			$categories = get_the_category();

			$url = wp_get_attachment_image_src( $bg['id'], $imageSize );
			$url = $url[0];

			if( is_array( $categories ) ) {
				$categories = $categories[0]->name;
			};
			$knowledgeShow = '';
			$knowledgeHide = 'hidden';
			$developmentHide = 'hidden';
			$office .= ' Offices';
			$knowledgeText = trim_text( get_field('welcome_message'), 20 );

			if ( is_page('knowledge') ) {
				$knowledgeUrl = $url;
			}

			$temp = $office;
			$office = $title;
			$title = $temp;
			$title = '';

			$title = substr( $knowledgeText, 0, -3 );
			
			$letter = $office[0];

		}

		$letter = strtolower( empty( $letter ) ? $title[0] : $letter );
		$category = strtolower( $categories );

echo <<< LI
	<li class="item ajax-grid" data-category="$category" data-letter="$letter" data-type="$gj_grid">
		<div class="front">
			<div class="image-wrapper">
				<img class="load-me" data-src="$url" alt="">
			</div>
			<div class="bg"></div>
			<div class="info {$class}">
				<div class="title">$office</div>
				<div class="categories {$developmentHide}">$categories</div>
				<div class="address">{$title}</div>
				{$facilities}
			</div>
		</div>
		<div class="back" style="display: none !important;">
			<div class="data">
				<ul class="link">
					<li class="view"><a href="$permalink">View Full Details</a></li>
				</ul>
			</div>
		</div>
	</li>
LI;
	endwhile;
}
?>
	<li class="show-more ajax-grid">
		<?php 
			// previous_posts_link();
			echo get_previous_posts_link('Previous Page');
			echo get_next_posts_link('Next Page');
		?>
		<?php  ?>
	</li>
</ul>