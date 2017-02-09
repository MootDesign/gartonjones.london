<?php 
$idNum = rand( 0, 100 );
?>
<form method="get" class="search-form" action="<?php echo home_url( '/properties/' ); ?>">
	<label class="search-mag" for="s-<?= $idNum ?>"></label>
		<input type="hidden" name="search" value="1">
		<input type="hidden" name="min-price" value="">
		<input type="hidden" name="status" value="sale">
		<input type="search" id="s-<?= $idNum ?>" class="search-field" value="<?php echo get_search_query() ?>" name="property" title="<?php echo esc_attr_x( 'Search for:', 'label' ) ?>" />
		<input type="hidden" name="max-price" value="">
		<input type="hidden" name="beds" value="">
		<input type="hidden" name="river-view" value="" />
</form>