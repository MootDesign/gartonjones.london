<?php
	$title = get_the_title();

	$categories = get_the_category();

	if ( is_array( $categories ) ) {
		$categories = $categories[0]->name;
	};

	$category = strtolower( $categories );

	$letter = strtolower( empty( $letter ) ? $title[0] : $letter );
	$gj_grid = strtolower( get_post_type() );

	$thumb = wp_get_attachment_image_src( get_post_thumbnail_id(get_the_ID()), array( 600, 400 ) );
	$url = $thumb['0'];

	if( empty( $url ) ) {
		$url = get_template_directory_uri() . '/img/default.png';
	}

	$permalink = get_permalink( get_the_ID() );
	$price = get_field('price');
	$show_fees = false;
	if ($price<=80000){
		$disprice = number_format($price);
		$display = "£".$disprice." pw";

		$show_fees = true;
	} else {
		$disprice = number_format($price);
		$display = "£".$disprice;
	}

	$fees = "";
	if( $show_fees ) {
		$fees = $fees_text;
	}

	$beds = get_field( 'bedrooms', get_the_ID() );
	$bathrooms = get_field( 'bathrooms', get_the_ID() );
	$receptions = get_field( 'receptions', get_the_ID() );
	$sqft = get_field( 'square_foot', get_the_ID() );

	$hideOrNot = 'hide';
	if ( ! empty( $beds ) && $beds !== 0 ) {
		$hideOrNot = '';
	}
?>

<li data-image="<?php echo $post->post_name ?>" data-category="<?php echo $category ?>" data-type="developments" data-id="<?php echo $post->ID ?>">
	<a href="<?php the_permalink(); ?>">
		<h3><?php echo $post->post_title ?>
			<div class="icons <?php echo $hideOrNot; ?>">
				<span><?php echo $display ?></span><span class="sqft"><?php echo $sqft ?> sqft</span><?php echo $fees ?><span class="icon icon-beds"><span><?php $beds ?></span></span>
				<span class="icon icon-bathrooms"><span><?php echo $bathrooms; ?></span></span>
				<span class="icon icon-receptions"><span><?php echo  $receptions ?></span></span>
			</div>
		</h3>
	</a>
</li>