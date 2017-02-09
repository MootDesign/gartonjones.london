<?php
$fees_text =<<< FEES
	<span class="fees">Admin fees apply</span>
FEES;

$title = get_the_title();

$available_from = get_post_custom_values( 'available', get_the_ID() )[0];

$category = get_the_category();

$office = @$category[0]->name;
foreach( $category as $c ) {
	if( $c->parent > 0 ) {
		$office = $c->name;
		break;
	}
}

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
	$display = "£".$disprice."pw";

	$show_fees = true;
} else {
	$disprice = number_format($price);
	$display = "£".$disprice;
}

$fees = "";
if( $show_fees ) {
	$fees = $fees_text;
}

$web_status = get_field('web_status');
$stc = '';
if ( $web_status == 3 ) {
	$stc = 'stc sale';
}
if ( $web_status == 4 ) {
	$stc = 'stc let';
}

$beds = get_field( 'bedrooms', get_the_ID() );
$bathrooms = get_field( 'bathrooms', get_the_ID() );
$receptions = get_field( 'receptions', get_the_ID() );
$description = get_field( 'descriptionfull' );
$content = explode( " ", $description );
$content = join( " ", array_slice( $content, 0, 20 ) );
$sqft = get_field( 'square_foot', get_the_ID() );
$isSqft = '';
if (! $sqft) {
	$isSqft = 'no-sqft';
}

$office = explode(',', $title)[0];

$re = "/(?<=,[[:space:]]).*/"; 
 
if ( preg_match($re, $title, $matches) ) {
	$title = $matches[0];
}

if ( $available_from ) {
	$title .= '<br>Available from ' . $available_from;
}

$facilities =<<< FAC
<ul class="facilities">
	<li class="price {$isSqft}">{$display} {$fees}</li>
	<li class="sqft {$isSqft}">{$sqft} sqft</li>
	<li class="icon icon-beds"><span>$beds</span></li>
	<li class="icon icon-bathrooms"><span>$bathrooms</span></li>
	<li class="icon icon-receptions"><span>$receptions</span></li>
</ul>
FAC;

?>

<li class="item" data-letter="<?php echo $letter; ?>" data-type="<?php echo $gj_grid; ?>" style="width: 100%;">
	<div class="front">
		<div class="image-wrapper <?php echo $stc; ?>">
			<!-- <img class="" data-src="$url" alt=""> -->
			<img class="load-me" data-src="<?php echo $url; ?>" alt="">
		</div>
		<div class="bg"></div>
		<div class="info">
			<div class="title"><?php echo $office; ?></div>
			<div class="address"><?php echo $post->post_title ?></div> <!-- $title -->
			<?php if (strpos($available_from, '1900') !== false) { $available_from = ""; } else { $available_from = "Available from " . $available_from; } ?>
			<div class="address"><?php echo $available_from; ?></div> <!-- $title -->
			<?php echo $facilities ?>
		</div>
	</div>
	<div class="back">
		<div class="image-wrapper <?= $stc ?>">
			<div class="bg"></div>
			<img class="load-me" data-src="<?php echo $url; ?>" alt="">
		</div>
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

		<div class="data">
			<div>
				<div class="title"><?php echo $office ?></div>
				<div class="price"><?php echo $display ?></div>
				<ul class="facilities">
					<li class="icon icon-beds"><span><?php echo $beds ?></span></li>
					<li class="icon icon-bathrooms"><span><?php echo $bathrooms ?></span></li>
					<li class="icon icon-receptions"><span><?php echo $receptions ?></span></li>
				</ul>
				<div class="description"><?php echo $content ?></div>
				<ul class="link">
					<li class="view"><a href="<?php echo $permalink ?>">View Full Details</a></li>
					<li class="map"><a href="<?php echo $permalink ?>?view=map">View on Map</a></li>
				</ul>
				<div style="clear:both"></div>
			</div>
		</div>
	</div>
</li>
