<link rel="stylesheet" href="<?php echo get_template_directory_uri() ?>/css/foundation.css" />

<?php
			if ( have_posts() ) :
				// Start the Loop.
				while ( have_posts() ) : the_post();
?>

<div id="about" class="row single3d-content">

 <div class="small-12 medium-4 large-3 columns side2">
  <h1 class="the-title">
      <?php the_title(); ?>
      <br/>
      <?php the_field( 'welcome_message' ); ?>
  </h1>

     <ul class="submenu leftmenu">
         <li class="active item">
             <a href="#" data-title="Key Facts">Key Facts</a>
         </li>

         <li class="item">
             <a href="#" data-title="Overview">Overview</a>
         </li>
         <li class="item">
             <a href="#" data-title="History">History</a>
         </li>
         <li class="item">
             <a href="#" data-title="Living & Investing">Living & Investing</a>
         </li>

         <li>&nbsp;</li>

         <li class="item">
             <a href="#" data-title="<?php the_field( 'last_menu_item' ); ?>"><?php the_field( 'last_menu_item' ); ?></a>
         </li>
     </ul>

</div>

<!-- About -->
    <div class="small-12 columns" id="content">
        <div class="container">
            <div class="scroll">

    <!--  Key Fact      -->
           <hr>
            <div class="subcontent active noscroll keyfact">
                <div class="row">
                    <div class="small-12 title columns">
                        <p>
                            Key Facts
                        </p>
                    </div>

                    <?php
                        $keyf = explode( "<hr />", get_field( 'key_fact' ) );
                    ?>
                    <div class="small-12 medium-6 columns first-column">
                        <?php echo $keyf[0] ?>
                    </div>

                    <div class="small-12 medium-6 columns">
                        <?php echo $keyf[1] ?>
                    </div>

                    <div class="small-12 columns">
                        <?php the_field( 'key_fact_note' ); ?>
                    </div>


                </div>

                <div class="scrollbar">
                    <div class="draggable"></div>
                </div>
            </div>

    <!-- Overview  -->
           <hr>
            <div class="subcontent overview noscroll">
                <div class="row">
                    <div class="small-12 title columns">
                        <p>
                            Overview
                        </p>
                    </div>

                    <div class="small-12 title">
                        <?php echo get_field( 'overview_title' ); ?>
                    </div>

                    <div class="small-12 medium-6 columns">
                        <?php the_field( 'overview_first_column' ); ?>
                    </div>

                    <div class="small-12 medium-6 columns last">
                        <?php the_field( 'overview_second_column' ); ?>
                    </div>
                </div>

                <div class="scrollbar">
                    <div class="draggable"></div>
                </div>
            </div>


    <!--  History, living, last      -->
           <hr>
            <?php
                $fields = array( 'history', 'living_investing', 'last_item_content' );

                foreach( $fields as $field ) :
            ?>
            <div class="subcontent noscroll">
                <?php
                    $c = get_field( $field );
                    $c = explode( "<hr />", $c );
                ?>
                <div class="row">
                    <div class="small-12 title columns">
                        <p>
                            <?php echo $field ?>
                        </p>
                    </div>

                    <div class="small-12 medium-6 columns">
                        <?php echo $c[0] ?>
                    </div>

                    <div class="small-12 medium-6 columns last">
                        <?php echo $c[1] ?>
                    </div>
                </div>

                <div class="scrollbar">
                    <div class="draggable"></div>
                </div>

            </div>

            <?php endforeach; ?>

        </div>

        </div>

    </div>
  <div class="small-0 medium-0 large-3 columns gallery-column hide-for-medium-down">
      <div class="wiref3">
        <?php

            if( have_rows('gallery') ):
                while ( have_rows('gallery') ) : the_row();
                    $image = get_sub_field('image');
                    $img =  wp_get_attachment_image_src( $image, 'medium' );
                    $img = $img[0];

                    echo '<img src="' . $img . '" />';

                endwhile;

            endif;

         ?>
      </div>
<!--

        <div class="controls row">
            <div class="small-6 columns">
                <a href="#" class="prev">
                    Prev
                </a>
            </div>

            <div class="small-6 columns last">
                <a href="#" class="next">
                    Next
                </a>
            </div>

        </div>
-->
 </div>
<?php

        endwhile;

endif;
