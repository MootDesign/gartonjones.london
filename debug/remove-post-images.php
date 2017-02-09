<?php
// get the Wordpress helper functions
require_once('../../../../wp-load.php');

// Include the function
require_once('remove-post-images-function.php');

$page = 1; // change this to the next page once the function was executed in browser
$post_per_page = 100;

// Remove all Post Images but the featured one
removeAllButFeaturedImage($page, $post_per_page); // 1 = page, 100 = post per page