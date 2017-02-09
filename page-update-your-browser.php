<?php
get_header();
?>

<div>
	<h1>
		You are using an<br>
		outdated browser
	</h1>
	
	<p>
		Please select one from below<br>
		You will need to update your browser
	</p>
	
	<div>
		<a href=""><img src="<?= get_template_directory_uri(); ?>/" alt="Chrome" /></a>
		<a href=""><img src="<?= get_template_directory_uri(); ?>" alt="Firefox" /></a>
		<a href=""><img src="<?= get_template_directory_uri(); ?>" alt="Safari" /></a>
		<a href=""><img src="<?= get_template_directory_uri(); ?>" alt="Internet Explorer" /></a>
	</div>

</div>

<?php
get_footer();
?>
