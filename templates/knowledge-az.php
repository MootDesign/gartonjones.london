<?php
  global $pindrops, $gj_query;
  $li = "";

  $args = array(
    'post_type' => array( 'knowledge' ),
    'orderby' => 'title',
    'order' => 'ASC',
    'post_status'       => 'publish',
    'posts_per_page' => -1,
  );

  $gj_query = new WP_Query( $args );
  if ( $gj_query->have_posts() ) {
  	while ( $gj_query->have_posts() ) : $gj_query->the_post();
		global $post;
	  
		$name = ucfirst( get_the_title() );
		$class = ( $post->post_name );

		$icon = get_field( 'marker_icon', $post->ID );
		$icon = sanitize_title( $icon );

		if( empty( $content ) ) 
			$content = get_field( 'welcome_message' );
	  
		$content = explode( " ", $post->post_content );
		$content = join( " ", array_slice( $content, 0, 30 ) );

		// clean up the code
		// there are some open elements, what we need to close automatically
		$tidy = new tidy();
		$content = $tidy->repairString( $content, array( 'char-encoding' => 'utf8' ), 'utf8' );
		$content = preg_replace('/<[^>]*>/', '', $content);

		$permalink = get_permalink( $post->ID );

		$more = '<ul class="submenu leftmenu"><li class="item"><a href="' . $permalink . '" data-title="Read more">Read more</a></li></ul>';
		$more = '<span class="read-more">Read more</span>';
		$content = '<span>' . $content . '</span>' . $more;

		$letter = strtolower( $name[0] );
		$px = get_field( 'pindrop_x' );
		$py = get_field( 'pindrop_y' );
	  
		if( $px && $py ) {
			$pindrops[] = array( 'x' => $px, 'y' => $py, 'src' => $src, 'title' => $post->post_title, 'link' => get_permalink( $post->ID ) );
		}
	  
		$li .= '<li data-image="' . $class . '" class="post-' . $post->post_type . ' ' . $icon . '" data-letter="' . $letter . '"><a href="' . $permalink . '"><span class="category"><span class="icon knowledge-' . $icon . '-big">' . "" . '</span></span><h3>' . $name . $content . '</h3></a></li>';

    endwhile;
  }

  wp_reset_query();
?>

<div id="strips" class="the-strips">
	<ul>
		<?php echo $li; ?>
	</ul>
</div>