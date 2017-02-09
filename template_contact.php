<?php
/**
 * Template Name: Contact form template
 */
get_header();

if(isset($_GET['show']) && $_GET['show'] == 'map') {
	get_template_part('templates/contact-maps', get_the_title());
} else {
	get_template_part('templates/contact-form', get_the_title());
}

wp_enqueue_script('gmap-js');
get_footer();