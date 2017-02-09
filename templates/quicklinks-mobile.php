<?php
/**
 * Template Name: Quick links template
 *
 * The template that let you use the features of the quick links
 */

//wp_enqueue_script( 'jquery-ui-draggable', array( 'jquery-ui-core' ) );

wp_enqueue_style('singledev-css', get_template_directory_uri() . '/css/single.development.css' );
wp_enqueue_script('singlejs', get_template_directory_uri() . '/js/single.development.js', array(), '1.0', true );


get_header();

$for = $GLOBALS[ '_for_' ];
$office = $GLOBALS[ '_office_' ];

$property = $GLOBALS[ '_property_' ];
?>
<div class="overlayed-breadcrumbs row">
	<div class="breadcrumbs">
		<!-- TODO here will come the real breadcrumb function -->
		<a href="/">Home</a>
		<span class="plus">></span>
		<a href="<?php echo home_url( 'properties-for/' . $for . '/' . urlencode( $office ) ) ?>">
		    Properties <?php echo ( $for == "sale" ) ? " for sale" : " to let" ?> in <?php echo $office ?>
        </a>
		
		<?php if( ! empty( $property ) ) : ?>
		<span class="plus">></span><a href="#"><?php echo $property ?></a>
		<?php endif; ?>
	</div>
	
	<div class="phone">
	    <?php

            $offices = array();
            if( have_rows('phones') ):
                while ( have_rows('phones') ) : the_row();
                    $offices[ strtolower( get_sub_field( 'office' ) ) ][ 'tel' ] = get_sub_field( 'number' );
                    $offices[ strtolower( get_sub_field( 'office' ) ) ][ 'description' ] = get_sub_field( 'description' );
                endwhile;

            endif;

            $tel = $offices[ strtolower( $office ) ][ 'tel' ];
            $the_content = $offices[ strtolower( $office ) ][ 'description' ];
        ?>
		<a href="tel:<?php $tel ?>"><?php echo $tel ?></a>
	</div>
</div>

		<div class="small-3 columns side2">
			<h1><?php the_title(); ?></h1>

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

			<hr class="sidesep">
			<?php else: ?>
				<ul class="submenu">    
					<li>
						<a href="<?php echo home_url( 'properties-for/sale/' . $office ) ?>" data-title="to Sale" class="<?php echo ( stripos( $for, 'sale' ) === false ) ? "" : "active" ?>">
							<span>for Sale</span>
						</a>
					</li>    
					<li>
						<a href="<?php echo home_url( 'properties-for/let/' . $office ) ?>" class="<?php echo ( stripos( $for, 'let' ) === false ) ? "" : "active" ?>" data-title="to Let" >
							<span>to Let</span>
						</a>
					</li>    
                </ul>
                <ul class="submenu">
                    <li><hr class="sidesep"></li>   
                    <li>
                        <a href="<?php echo home_url( 'properties-for/' . $for . '/Westminster' ) ?>" data-title="Westminster" class="<?php echo ( stripos( $office, 'westminster' ) === false ) ? "" : "active" ?>" >
                            <span>Westminster</span>
                        </a>
                    </li>    <li>
                        <a href="<?php echo home_url( 'properties-for/' . $for . '/Chelsea+Bridge+Wharf' ) ?>" data-title="Chelsea Bridge Wharf" class="<?php echo ( stripos( $office, 'chelsea' ) === false ) ? "" : "active" ?>">
                            <span>Chelsea Bridge Wharf</span>
                        </a>
                    </li> <!--    <li>
                        <a href="<?php echo home_url( 'properties-for/' . $for . '/Royal+Arsenal' ) ?>" data-title="Royal Arsenal" class="<?php echo ( stripos( $office, 'royal' ) === false ) ? "" : "active" ?>">
                            <span>Royal Arsenal</span>
                        </a>
                    </li>  -->          
                    <li>
                        <a href="<?php echo home_url( 'properties-for/' . $for . '/Nine+Elms' ) ?>" data-title="Nine Elms" class="<?php echo ( stripos( $office, 'nine' ) === false ) ? "" : "active" ?>">
                            <span>Nine Elms</span>
                        </a>		
                    </li>		
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

			<hr class="sidesep">

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

<div class="small-6 columns quick-links-content">
    <div class="row">
		<div class="large-12 columns scroll-me" id="wording">
			<div class="row">
			<h2>
				<?php
					echo $office;
				?>
			</h2>
            <div class="content1col">
                <?php echo $the_content ?>
            </div>
			<?php
                global $wp_query, $gj_query;

//                $GLOBALS[ 'development' ] = $office;
                $GLOBALS[ 'search' ] = 1;

                $args = array( 
                                'post_type' => 'post',
                                'post_status'      => 'publish',
                                'posts_per_page'   => -1,
                             );

                $gj_query = new WP_Query( $args );

                while ( $gj_query->have_posts() ) :
                    $gj_query->the_post(); 


                    $image = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ), 'thumbnail' );

                    //Price
                    $price = get_field( 'price', get_the_ID() );
                    if ($price<=80000){
                        $disprice = number_format($price);
                        $display = "£".$disprice." pw";
                    } else {
                        $disprice = number_format($price);
                        $display = "£".$disprice;
                    }

            ?>
				
				<div class="property">
					<img src="data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" data-src="<?php echo $image[0] ?>" class="property-image" alt="" />
					<div class="property-title">
					    <a href="<?php the_permalink() ?>">
						    <?php the_title() ?>
                        </a>
					</div>
					<div class="property-price">
						<?php echo $display ?> 
					</div>
					<ul class="property-features">
					<?php
                        $j = 0;

                        for( $i = 1; i <= 6; $i++ ) :
                            $bullet = get_field( 'bullet' . $i, get_the_ID() );
                    ?>    
						<li><?php echo $bullet ?></li>
					<?php
                            $j++;
                            if( $j > 3 ) break;
                        endfor;
                    ?>
					</ul>
				</div>
            <?php				
                endwhile;

                wp_reset_postdata();
            ?>

			</div>

		</div>
    </div>
</div>

<div class="small-3 columns wiref3 hide-for-small">
    <?php echo do_shortcode( '[gravityform id="11" name="Contact Us Now" ajax="true"]' ); ?>
</div>


<?php
get_footer();