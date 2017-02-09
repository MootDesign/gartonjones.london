<?php
// function gj_add_socials_share() {
  // global $postid;
  if ( $GLOBALS['postid'] ) {
      $postid = $GLOBALS['postid'];
  } else {
    $postid = $post->ID;
  }

  $permalink = get_the_permalink($postid);
  $title = get_the_title($postid);
  $content = "";
?>
<div class="socials">
  <ul class="submenu leftmenu">
    <li class="item">
       <a href="#" data-title="Share +" class="share">Share +</a>
    </li>
  </ul>

  <!-- <a href="#" class="share">Share +</a> -->
  <ul class="icons active">
    <li><a href="https://www.linkedin.com/shareArticle?mini=false&url=<?php echo $permalink ?>&title=<?php echo ( $title ) ?>&summary=<?php echo  urlencode( $content ) ?>&source="><i class="fa fa-linkedin-square"></i></a></li>
    <li><a href="https://www.facebook.com/sharer/sharer.php?u=<?php echo $permalink ?>"><i class="fa fa-facebook-official"></i></a></li>
    <li><a href="https://twitter.com/home?status=<?php echo $permalink ?>"><i class="fa fa-twitter-square"></i></a></li>
    <li><a href="mailto:?&amp;subject=Garton Jones&amp;body=<?php echo $permalink ?>"><i class="fa fa-envelope"></i></a></li>
  </ul>
</div>
<?php
// }

// gj_add_socials_share();
?>
