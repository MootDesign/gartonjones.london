<link rel="stylesheet" href="<?php echo get_template_directory_uri() ?>/js/ar/idangerous.swiper.css" />
<!--<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>-->
<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
<script type="text/javascript" src="<?php echo get_template_directory_uri() ?>/js/ar/idangerous.swiper.min.js"></script>
<script>
    $( document ).ready( function() {
      var mySwiper = new Swiper('.swiper-container',{

        mode:'horizontal',
        loop: true,
        centeredSlides: true
      });  
    });
</script>
<?php
			if ( have_posts() ) :
				// Start the Loop.
				while ( have_posts() ) : the_post();
?>
<!-- Gallery -->
<div class="swiper-container">
  <div class="swiper-wrapper">
     <?php
        if( have_rows('gallery') ):

            $id = 0;
            while ( have_rows('gallery') ) : the_row();
                if( $id++ == 0 ) continue;

                $image = get_sub_field('image');
                $src = $image['url'];
echo <<< IMG
      <div class="swiper-slide"> 
            <img src="$src" />
      </div>

IMG;
            endwhile;

        endif;
     ?>
      <!--Etc..-->
  </div>
</div>

<?php

        endwhile;

endif;
