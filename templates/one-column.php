<div class="medium-1 large-1 columns">
&nbsp;
</div>
<div class="small-10 medium-10 large-10 columns bggold
">
<div class="row">
 <div class="small-12 medium-4 large-3 columns side2">

     <?php if( have_rows('side_pri_nav') ): ?>
        <ul class="submenu">

            <?php while( have_rows('side_pri_nav') ): the_row(); ?>

            <li>
                    <?php
                        $page = get_sub_field( 'page' );
                        echo '<a href="' . get_permalink( $page->ID ) . '">';

                        echo $page->post_title;
                    ?>
                </a>
            </li>

            <?php endwhile; ?>
        </ul>

     <?php endif; ?>


     <?php
        global $post;

        if( is_singular() || is_page() ) {
            $menu = ( isset( $GLOBALS[ '_menu' ] ) ) ? $GLOBALS[ '_menu' ] : get_the_title( $post->post_parent );

            $pmenu = get_field( 'parent_menu' );
            if( ! empty( $pmenu ) ) $menu = $pmenu;

            gj_add_submenu(  $menu );
        }
     ?>


     <?php if( have_rows('sidebar_sec_nav') ): ?>
        <ul class="submenu">

            <?php while( have_rows('sidebar_sec_nav') ): the_row(); ?>

            <li>
                    <?php
                        $page = get_sub_field( 'page' );
                        echo '<a href="' . get_sub_field( 'link' ) . '">';

                        echo get_sub_field( 'link_title' );
                    ?>
                </a>
            </li>


            <?php endwhile; ?>
        </ul>
     <?php endif; ?>

</div>

  <div class="small-12 medium-8 large-6 columns" id="wording" style="margin-bottom: 55px;">
  <h1><?php the_title(); ?></h1>

<h2>
 <?php
    the_field('subtitle');
 ?>
 </h2>
 <div class="row">
    <div class="small-12 medium-12 large-12 columns content1col">
      <?php if ( has_post_thumbnail() ) { ?>
        <div class="thumbnail-image">
          <?php the_post_thumbnail(); ?>
        </div>
      <?php } ?>

     <?php the_content(); ?>

     <?php if ( $parentID = wp_get_post_parent_id( $post->ID ) ) { ?>
       <ul class="submenu leftmenu">
         <li class="item">
        <a href="<?php echo get_permalink( $parentID ); ?>" data-title="Back to <?php echo get_the_title( $parentID ); ?>">Back to <?php echo get_the_title( $parentID ); ?></a>
         </li>
       </ul>
     <?php } ?>

     <?php
      $permalink = get_the_permalink();
      $title = get_the_title();
    ?>

     <div class="socials">
       <ul class="submenu leftmenu">
         <li class="item">
            <a data-title="Share +" class="share">Share +</a>
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

    </div>
 </div>

 </div>
  <div class="small-0 medium-0 large-3 columns wiref3 hide-for-medium-down">
 </div>


</div>
</div>
<div class="medium-1 large-1 columns">
&nbsp;
</div>

<article>
  <div id="register">
   <div class="title">
        <img src="<?php echo get_template_directory_uri() ?>/img/pigeon.png" class="pigeon" />
    </div>

    <div class="the-content">
      <?php
        $description = strtolower( get_field( 'form_description' ) );
        if( $description == 'sales' ) $description = "Sales";
        elseif( $description == 'lettings' ) $description = "Lettings";
        else $description = "Sales or Lettings";
      ?>
      <?php echo do_shortcode( '[gravityform id="22" title="false" description="false" ajax="true"]' ); ?>
      <span class="disclaimer">We do not share the information you provide with any third parties.</span>

    </div>
  </div>
</article>