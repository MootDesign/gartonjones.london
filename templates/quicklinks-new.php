<?php
/**
 * Template Name: Quicklinks new template
 *
 * The template that let you use the features of the quick links
 */
get_header();

wp_enqueue_style( 'quicklinks-css' );
wp_enqueue_style('singledev-css', get_template_directory_uri() . '/css/grid.css' );
wp_enqueue_script( 'quicklinks-js', get_template_directory_uri() . '/js/min/quicklinks.min.js', array( 'jquery' ), '30102015', true );

$query_office = get_field( 'query_office' );
if ( $query_office == 'South Bank' ) {
	$query_office = 'Nine Elms';
}
$GLOBALS[ '_where_' ] = $query_office;

wp_enqueue_style( 'refined-search', get_template_directory_uri() . '/css/refined-search.css' );
wp_enqueue_script( 'search', get_template_directory_uri() . '/js/min/single/search.min.js', array('jquery'), '20150615', true );
wp_enqueue_script( 'refined-search-js', get_template_directory_uri() . '/js/min/single/refined-search.min.js', array('jquery'), '20150516', true );

?>

<script>
jQuery(document).ready( function() {
	jQuery( '#call-the-office' ).insertAfter( '#navigation-menu' );
	console.log( 'hello' )
});
</script>
<style> 
/* Temp fix ... not ideal */
@media screen and (min-width: 1300px) {
    .c-pigeonbird { margin-top: 100px;
    }
}
@media screen and (min-width: 1901px) {
  	#grid li.item.visible {
    	width: 16.6%% !important;
	}	  	
}
@media screen and (max-width: 1900px) {
  	#grid li.item.visible {
    	width: 25% !important;
	}	  	
}
@media screen and (max-width: 1850px) {
  	#grid li.item.visible {
    	width: 20% !important;
	}	  	
}
@media screen and (max-width: 1600px) {
  	#grid li.item.visible {
    	width: 33.3% !important;
	}
}
@media screen and (max-width: 1200px) {
  	#grid li.item.visible {
    width: 50% !important;
	}  	
}
@media screen and (max-width: 700px) {
  	#grid li.item.visible {
    width: 100% !important;
	}  	
}

</style>
 <article class="parallax  hide-for-small-only" style="z-index: 9000;">
     <div id="register">
        <div class="title c-pigeonbird">
            <img src="<?php echo get_template_directory_uri() ?>/img/pigeon.png" class="pigeon" alt="pigeon" style="z-index:9000; padding-left: 20px;" />
        </div>

        <div class="fake-link"></div>

         <div class="the-content" style="padding-top: 10px;">
             <?php
               $description = strtolower( get_field( 'form_description' ) );
               if( $description == 'sales' ) $description = "Sales";
               elseif( $description == 'lettings' ) $description = "Lettings";
               else $description = "Sales or Lettings";
             ?>
              <?php echo do_shortcode( '[gravityform id="14" title="false" description="false" ajax="true"]' ); ?>
              <span class="disclaimer">We do not share the information you provide with any third parties.</span>

         </div>
     </div>
</article>

<?php
	// get the query vars
	$type = get_field( 'query_sales_lettings' );
	$office = get_field( 'query_office' );

	if ( $office == 'Southbank' ) {
		$office = 'Nine Elms';
	}
	$beds = get_field( 'query_beds' );
	if ( ! is_numeric( $beds ) ) {
		$beds = null;
	} else {
		$beds = intval( $beds );
	}
    $getBeds = $beds;

    $getOffice = $office;
?>

<?php echo get_template_part( 'templates/refined-search', 'none' ); ?>

<?php

	$args = array(
		'post_type' => 'post',
		'posts_per_page' => -1,
		'meta_query' => array(
			array(
				// sales
				'key' => 'status',
				'value' => $type,
				'compare' => '='
			),
			array(
				// office
				'key' => 'office',
				'value' => $office,
				'compare' => '='
			)
		),
		'meta_key'			=> 'price',
		'orderby'			=> 'meta_value_num',
		'order'				=> 'ASC'
	);

	if ( ! empty( $beds ) || $beds === 0 ) {
		$compare = ( $beds < 3 ) ? '=' : '>=';
		$args['meta_query'][] = array(
			// beds
			'key' => 'bedrooms',
			'value' => $beds,
			'compare' => $compare,
			'type' => 'numeric'
		);
	}

?>

<?php
	// the query
	$the_query = new WP_Query( $args ); ?>

	<?php if ( $the_query->have_posts() ) : ?>
	<?php
		$noProperties = $the_query->post_count;

		foreach($the_query->posts as $property) {
			$web_status = get_field('web_status', $property->ID);
			if ( $web_status == 4 || $web_status == 3 ) {
				$noProperties -= 1;
			}
		}
	?>

		<div class="quicklinks-content container-full-width" style="width: 100%;">
			<div>
				<span style="color: #aC9857; font-size: 24px;"><?= $noProperties; ?> <?= ($noProperties == 1) ? 'Result' : 'Results' ?> For</span> <h1 class="site-title" style="font-size: 24px; display: inline-block;"><?php the_title(); ?></h1>
			</div>
			<?php the_content(); ?>
		</div>
		<div class="quicklinks-wrapper">
			<ul id="grid">
			<!-- the loop -->
			<?php while ( $the_query->have_posts() ) : $the_query->the_post(); ?>

				<?php echo get_template_part( 'templates/ajax/grid', 'none' ); ?>

			<?php endwhile; ?>
			<!-- end of the loop -->
			</ul>
		</div>

		<?php wp_reset_postdata(); ?>

	<?php else: ?>

		<h2>No properties...</h2>

	<?php endif; ?>

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
<script>
jQuery(window).load( function() {
	setTimeout( function() {
		jQuery('#register .fake-link').trigger('click');
	}, 2000);
  // if (jQuery('#register .fake-link').length > 0) {
    jQuery('#register .fake-link').click( function() {
      jQuery('#register .the-content').slideToggle();
    });
  // } else {
    jQuery('#register .title').click( function() {
      jQuery('#register .the-content').slideToggle();
    });
  // }
});
</script>
<?php 
get_footer();