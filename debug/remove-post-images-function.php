<?php
/**
 * Will remove all the images on properties that is not the first image.
 * The first image in most cases is the featured image, but not always.
 * You can modify the script to remove all images from posts and run WP ALL IMPORT
 * to download the images once again.
 * 
 * @param  integer $page [Page number. Modify manually after each run to iterate through all the images.]
 * @param  integer $per_page [Posts per page. Don't make this a large number unless the servers timeout is set to a high number. With 100 it will be fast, but you need to modify the page number more often]
 */
function removeAllButFeaturedImage($page = 1, $per_page = 100) {
  // list all the posts first
  $args = array(
    // 'posts_per_page'   => 1, // test for the first few posts only
    'posts_per_page'   => $per_page, // do it on all XD
    'paged'            => $page, // increase this until you don't get the no. posts. Sometimes for a lot of properties server will stop the php execution as timeout
    'orderby'          => 'date',
    'order'            => 'DESC',
    'post_type'        => 'post',
    'post_status'      => 'publish'
  );

  $posts_array = get_posts($args);

  $sum = 0; // the number of images deleted from the server

  foreach ($posts_array as $post) {
    $attachments = get_attached_media( 'image', $post->ID );

    $i = 0;
    foreach($attachments as $att) {
      $att_ID = $att->ID;

      // keep the first one, as it is the featured image, and delete the rest
      if ($i == 0) {
        echo 'Keeping this file: ' . $att->guid . "<br>\n";
        $i++;
        continue;
      }

      echo 'Deleting: ' . $att->guid . "<br>\n";

      wp_delete_attachment($att_ID, true); // force delete the images, skipping the trash with TRUE
      $sum++;
    }

    echo '------------------------------------' . "<br>\n";
  }
  echo 'Deleted files: ' . $sum;
}