<?php

global $page,
 $getBeds,
 $getPrice,
 $getStatus,
 $getRiver,
 $getProperty,
 $getOffice;

 

$is_single = isset( $GLOBALS[ '_single_dev' ] );

// for autoselecting select inputs
?>
<script>
jQuery(document).ready(function() {
	function setOptionSelected(options, selectedValue) {
		selectedValue = selectedValue || null;
		jQuery(options).each(function() {
			if(selectedValue && jQuery(this).val() == selectedValue) {
				jQuery(this).attr('selected', true);
				return false;
			}
		});
	};

	console.log(<?php $getPrice ?>);

	<?php
		function checkForNull($value) {
			if ($value) {
				return $value;
			} else {
				return 'null';
			}
		}
	?>

	setOptionSelected('#beds option', <?php echo checkForNull($getBeds); ?>);
	setOptionSelected('#max-price option', <?php echo checkForNull($getPrice); ?>);
	setOptionSelected('#river-view option', <?php echo checkForNull($getRiver); ?>);

jQuery(function($){
$('#property').on('change', function(){
	var value = $(this).val();
	if (value == "sky gardens") {
    $(this).val($(this).val().replace(/\s+/g, ''));
}
  });
});

});
</script>
<div class="row fullWidth mb50" id="searcher">
	<div class="medium-12 large-12 columns">
		<div class="row">
			<div class="small-12 medium-12 large-12 columns" id="wording">
				<div class="row">
					<div class="small-12 medium-12 large-12 columns content1col search-box">

						<div class="center">
							<ul class="search-menu">
								<?php // TODO once sales & lettings search is in place, make these links ?>
								<li id="first-search-menu" class=""><a class="active" href="#" data-value="sale">Search our Sales</a></li><li id="second-search-menu" class=""><a href="#" data-value="let">Search our Lettings</a></li>
							</ul>
						</div>

						<?php if($post->post_content=="") : ?>

						<?php else : ?>

							<?php the_content(); ?>

						<?php endif; ?>
							<div class="row mtb50">
								<form method="get" id="devsearch2" action="/properties">
									<input type="hidden" name="search" value="1" >
									<input type="hidden" name="min-price" value="" >
									<input type="hidden" name="status" value="sale" >

									<div class="ser ser5 development-wrapper" data-field="development" style="width: 100%;">
										<div class="sehp option-development">
											<label for="property"></label>
											<input type="text" name="property" id="property" value="<?php str_replace(' ', '', $getProperty); ?>" placeholder="Development, Area, Post Code" />
											<ul class="autocomplete-list relative-optionsholder">
												<?php
													$items = array();

													$args = array(
														'type'                     => 'post',
														'parent'                   => '',
														'orderby'                  => 'name',
														'order'                    => 'ASC',
														'exclude'                  => 1, //Uncategorized
														'hide_empty'               => 0,
														'hierarchical'             => 1,
														'taxonomy'                 => 'category',
													);

													$categories = get_categories( $args );

													foreach( $categories as $cat ) {
														if( $cat->parent == 0 ) continue;
														$val = $cat->parent;

														echo '<li class="loc-' . $val . '" data-loc="' . $val . '" data-value="' . addslashes( $cat->term_id ) . '">' . $cat->name . '</li>';
													}
												?>
											</ul>
										</div>
									</div>

									<div class="ser ser2" data-field="max-price">
										<label for="max-price" class="seh">
											Price
										</label>

										<select name="max-price" id="max-price">
											<option class="opti sale" value="<?php echo $i * 3 ?>">£<?php echo number_format ( 3 * 100000 ) ?></option>
											<option class="opti sale" value="<?php echo $i * 4 ?>">£<?php echo number_format ( 4 * 100000 ) ?></option>
											<option class="opti sale" value="<?php echo $i * 5 ?>">£<?php echo number_format ( 5 * 100000 ) ?></option>

											<option class="opti sale" value="<?php echo $i * 7.5 ?>">£<?php echo number_format ( 7.5 * 100000 ) ?></option>

											<?php for( $i = 1; $i <= 10; $i++ ) :
												if ( $i == 3 || $i == 7 || $i == 9 )
													continue;
												?>

												<option class="opti sale" value="<?php echo $i * 10 ?>">£<?php echo number_format ( $i * 1000000 ) ?></option>

											<?php endfor; ?>

												<option class="opti sale" value="125">£<?php echo number_format ( 12.5 * 1000000 ) ?></option>

												<option class="opti sale" value="150">£<?php echo number_format ( 15 * 1000000 ) ?></option>
												
												<!-- 30.000.000 + -->
												<option class="opti sale" value="300" selected="selected">Max Price</option>

											<?php for( $i = 3; $i <= 7; $i++ ) : ?>

													<option class="opti let hidden" value="<?php echo $i * 10 ?>">£<?php echo number_format ( $i * 100 ) ?> Per Week</option>

												<?php endfor; ?>

											<option class="opti let hidden" value="100">£<?php echo number_format ( 1000 ) ?> Per Week</option>
											<option class="opti let hidden" value="200">£<?php echo number_format ( 2000 ) ?> Per Week</option>
											<option class="opti let hidden" value="300"> Per Week</option>
										</select>
									</div>

									<div class="ser ser3" data-field="beds">
										<label for="beds" class="seh">
											 Beds
										</label>
										<select name="beds" id="beds">
											<option value="">All</option>
											<option value="Studio">Studio</option>
											<option value="1">1</option>
											<option value="2">2</option>
											<option value="3">3+</option>
										</select>
									</div>

									<div class="ser ser4" data-field="river-view">
										<label for="river-view" class="seh">
											River View
										</label>

										<select name="river-view" id="river-view">
											<option value="">Either</option>
											<option value="1">Yes</option>
											<option value="2">No</option>
										</select>
									</div>

									<div class="search-row">
										<h2 class="sehg">
											 <a href="#" class="submit-box" onclick="document.getElementById('devsearch2').submit();">Search Now <span>&#8250;</span></a>
										</h2>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>