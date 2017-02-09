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
	global $gj_query, $wp_query, $gj_grid, $grid_li;
	
	$li = '';
	$xli = '';
	$devli = '';
	$devlibeta = '';

	$gj_query = ( ! isset( $gj_query ) ) ? $wp_query : $gj_query;

	if( ! isset( $gj_query ) ) {
		$args = array(
			'post_type' => 'post',
			'post_status'    => 'publish',
			'posts_per_page' => 12,
		);

		$grid_li = '';
		$li = '';

		$gj_query = new WP_Query( $args );
	}

$fees_text =<<< FEES
	<span class="fees">Admin Fees Apply</span>
FEES;

if ( $gj_query->have_posts() ) {
	while ( $gj_query->have_posts() ) : $gj_query->the_post();
		$category = get_the_category();
		$office = @$category[0]->name;
		foreach( $category as $c ) {
			if( $c->parent > 0 ) {
				$office = $c->name;
				break;
			}
		}
		// we don't need the developments name any more
		$office = '';

		$img = get_field( 'custom_background', get_the_ID() );
		$lmap = get_field( 'location_map_image', get_the_ID() );
		if( $img['mime_type' ] == "video/mp4" ) $img = $lmap;

		$thumb = wp_get_attachment_image_src( get_post_thumbnail_id(get_the_ID()), $imageSize );
		
		$url = $thumb['0'];

		if( empty( $url ) ) {
			$url = get_template_directory_uri() . '/img/default.png';
		}

		$permalink = get_permalink( get_the_ID() );
		$price = get_field('price');
		$show_fees = false;
		if ($price<=80000){
			$disprice = number_format($price);
			$display = "&pound;".$disprice."pw";

			$show_fees = true;
		} else {
			$disprice = number_format($price);
			$display = "&pound;".$disprice;
		}

		$fees = "";
		if( $show_fees ) {
			$fees = $fees_text;
		}

		$beds = get_field( 'bedrooms', get_the_ID() );
		$bathrooms = get_field( 'bathrooms', get_the_ID() );
		$receptions = get_field( 'receptions', get_the_ID() );
		$description = get_field( 'descriptionfull' );
		$content = explode( " ", $description );
		$content = join( " ", array_slice( $content, 0, 20 ) );
		$title = get_the_title();
		$web_status = get_field('web_status');
		$stc = '';
		if ( $web_status == 3 ) {
			$stc = 'stc sale';
		}
		if ( $web_status == 4 ) {
			$stc = 'stc let';
		}

		$office = explode(',', $title)[0];

		$re = "/(?<=,[[:space:]]).*/"; 
		 
		if ( preg_match($re, $title, $matches) ) {
			$title = $matches[0];
		}

		$available_from = get_post_custom_values( 'available', get_the_ID() )[0];

		if ( $show_fees && $available_from ) {
			$title .= '<br>Available from ' . $available_from;
		}

		$categories = '';
		$class = "";
		$knowledgeShow = 'hidden';
		$knowledgeHide = '';
		$knowledgeText = '';
		$facilities = '';
		$developmentHide = '';
		$knowledgeUrl = '';

		$sqft = get_field( 'square_foot', get_the_ID() );
		$isSqft = '';
		if (! $sqft) {
			$isSqft = 'no-sqft';
		}

		// studios has 0 beds
		if ( $beds !== false || $gj_grid == 'post' ) {
$facilities =<<< FAC
<ul class="facilities">
	<li class="price {$isSqft}">{$display} {$fees}</li>
	<li class="sqft {$isSqft}">{$sqft} sqft</li>
	<li class="icon icon-beds"><span>$beds</span></li>
	<li class="icon icon-bathrooms"><span>$bathrooms</span></li>
	<li class="icon icon-receptions"><span>$receptions</span></li>
</ul>
FAC;
		}
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

		} else if ( $gj_grid == 'videos' ) {

			$url = wp_get_attachment_image_src( get_post_thumbnail_id( get_the_ID() ), $imageSize );
			$knowledgeShow = '';
			$knowledgeHide = 'hidden';

			if( ! $url ) {
		        $url = get_field( 'custom_background' );
			} else {
				$url = $url[0];
			}

			if( ! $url ) {
				$url = get_template_directory_uri() . '/img/default.png';
			} else {
				$url = $url['url' ];
			}
		}

		$letter = strtolower( empty( $letter ) ? $title[0] : $letter );
		$category = strtolower( $categories );

		$li .= '<li data-image="' . $post->post_name . '" data-category="' . $category . '" data-id="' . $post->ID . '"><a href="#"><span class="category">' . $category . '</span><img data-src="' . $url . '" class="load-me" /><h3>' . $post->post_title . '</h3></a></li>';

		$devli .= '<li data-image="' . $post->post_name . '" data-category="' . $categories . '" data-id="' . $post->ID . '"><a href="' . get_permalink( $post->ID ) . '"><span class="category"></span><h3>' . $post->post_title . '<span class="category-name">' . $category . '</span></h3></a></li>';
		$devlibeta .= '<li data-image="' . $post->post_name . '" data-category="' . $categories . '" data-id="' . $post->ID . '"><a href="' . get_permalink( $post->ID ) . '"><span class="category"></span><h3>' . $post->post_title . '</h3></a></li>';

		$xli .= '<li data-image="' . $post->post_name . '" data-category="' . $category . '" data-id="' . $post->ID . '"><a href="#"><span class="category">' . $category . '</span><h3>' . $post->post_title;
		$xli .= '<div class="icons"><span>' . $display . '</span>' . '<span class="sqft">' . $sqft . ' sqft</span>' . $fees . '<span class="icon icon-beds"><span>' . $beds . '</span></span>';
		$xli .= '<span class="icon icon-bathrooms"><span>' . $bathrooms . '</span></span>';
		$xli .= '<span class="icon icon-receptions"><span>' . $receptions . '</span></span></div>';
		$xli .= '</h3></a>';
		$xli .= '</li>';


echo <<< LI
	<li class="item ajax-grid" data-category="$category" data-letter="$letter" data-type="$gj_grid">
		<div class="front">
			<div class="image-wrapper $stc">
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
		<div class="back">
			<div class="image-wrapper">
				<div class="bg"></div>
				<img class="" data-src="$url" alt="">
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
				<div class="$knowledgeHide">
					<div class="title">$office</div>
					<!-- <div class="address">{$post->post_title}</div> -->
					<div class="price">{$display}</div>
					<ul class="facilities">
						<li class="icon icon-beds"><span>$beds</span></li>
						<li class="icon icon-bathrooms"><span>$bathrooms</span></li>
						<li class="icon icon-receptions"><span>$receptions</span></li>
					</ul>
					<div class="description">{$content}</div>
					<ul class="link">
						<li class="view"><a href="$permalink">View Full Details</a></li>
						<li class="map"><a href="$permalink?view=map">View on Map</a></li>
					</ul>
					<div style="clear:both"></div>
				</div>
				<div class="$knowledgeShow">
					<div class="title">{$post->post_title}</div>
					<div class="description text">$knowledgeText</div>
					<ul class="link">
						<li><a href="$permalink">SHOW ME MORE</a></li>
					</ul>
				</div>
			</div>
		</div>
	</li>
LI;
	endwhile;
}
?>
	<li class="show-more ajax-grid">
		<?php 
			echo get_previous_posts_link('Previous Page');
			echo get_next_posts_link('Next Page');
		?>
		<?php  ?>
	</li>
</ul>

<div id="fees" class="close-me">
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

	<div class="content">
		<h2>Landlord Fees:</h2>
		<p><strong>Letting only service:</strong> 8% + VAT<br>
		 This service applies to landlords who wish to let their property but will manage their own property for the duration of the tenancy.</p>

		<p><strong>Let only and rent collect:</strong> 10% VAT<br>
		This service is the same as the letting only although the rent will be paid to Garton Jones and we will pay it over to the landlord. </p>

		<p><strong>Management Service:</strong> 12% + VAT<br>
		This service is for landlords who wish for Garton Jones to manage their property. Our expert management team will deal with all repairs and problems that may arise during the tenancy.</p>

		<p><strong>Tenancy Agreement:</strong> £120 (inc VAT)<br>
		For drawing up a Tenancy Agreement at the start of a new tenancy</p>

		<p><strong>Check in and Inventory Report:</strong> £138 - £218.40 (inc VAT)<br>
		This will be done at the start of a new tenancy by a third party clerk. Please note price is subject to change and determined by the size of the property.</p>

		<p><strong>Vacant Management:</strong> £120 (inc VAT)<br>
		We will deal with the management of the property whilst the property is vacant and being remarketed.</p>

		<p><strong>Copy documents:</strong> £50 (inc VAT)<br>
		For the supply of a document that has previously been provided.</p>

		<p><strong>Renewal Tenancy Agreement:</strong> £60 (inc VAT)<br>
		For drawing up the renewal Tenancy Agreement</p>

		<p><strong>Waiting at a property - £70 (inc vat) per hour</strong><br>
		Awaiting deliveries or attending with contractors </p>

		<h2>Tenants Fees</h2>

		<h3>Before you move in:</h3>
		<p>We will take a holding deposit which is equivalent to 1 weeks rent, this will ensure that we cease marketing and that the property is placed under offer.</p>

		<p><strong>Referencing Fee:</strong> £60 (inc VAT) per tenant<br>
		Referencing includes Credit check, Affordability check, Residency information (background check on where they have previously lived), previous Landlord reference and employer reference.</p>

		<p><strong>Company Referencing Fee:</strong> £120 (inc VAT)<br>
		Referencing of company</p>

		<p><strong>Tenancy Agreement:</strong> £180 (inc VAT) per tenancy<br>
		To draw up the Tenancy Agreement </p>

		<h3>During your tenancy:</h3>

		<p><strong>Renewal Tenancy Agreement:</strong> £70 (inc VAT)<br>
		To draw up the renewal Tenancy Agreement should you wish to renew</p>

		<p><strong>Admin fee for late rent payments:</strong> £30 (inc VAT)<br>
		Should we have to chase for the tenants late rent on 3 or more occasions</p>

		<p><strong>Rent paid to Garton Jones in error:</strong> £30 (inc VAT)<br>
		Should you pay you rent to Garton Jones when it should be paid to the Landlord </p>

		<p><strong>Deed of assignment:</strong> £150 (inc VAT)<br>
		Addendum to the Tenancy Agreement should there be a change to the original Tenancy Agreement</p>

		<h3>Ending your tenancy:</h3>

		<p><strong>Check out and Inventory:</strong> £110- £216 (inc VAT)<br>
		This will be done at the end of the tenancy by a third party clerk. Please note price is subject to price increase and determined by the size of the property.</p>

		<h3>Other fees and charges:</h3>

		<p><strong>Out of hour’s:</strong> Should the tenant’s contact the out of hour’s contractor and it is deemed that it was not an emergency or was the tenants fault, the tenant will incur the contractor’s costs.</p>
	</div>
</div>
