<!-- Top bar -->
<div class="overlayed-bar row">
    <div class="large-3 columns font-ptsans hide-for-small hide-for-medium">
        <ul class="all-developments">
            <li>
                <span>
                    <a>View Development &#9660;</a>
                </span>

                <div class="ul-container">
                    <span class="arrow arror-top disable-selection">&#9650;</span>
                    <ul class="optionsholder scroll-me">
                <?php
    $args = array(
                                                'post_type' => 'developments',
                                                'posts_per_page'   => -1,
                                                'orderby'          => 'title',
                                                'order'            => 'ASC',
                                                'post_status'      => 'publish',
                                                '_skip' => 1,    //Ask to skip gj_filter_property_search this query
                                        );

                    $posts = new WP_Query($args);
                    if( $posts->have_posts() ) :

                        while( $posts->have_posts() ) :
                            $posts->the_post();
    ?>
                        <li class="opti" data-value="">
                            <a href="<?php echo get_the_permalink() ?>">
                                <?php the_title() ?>
                            </a>
                        </li>
                <?php
                        endwhile;
                    endif;

                    wp_reset_postdata();
                ?>
                    </ul>
                    <span class="arrow arror-down disable-selection">&#9660;</span>

                    <span class="js-scrollbar">
                        <span class="draggable" style="height: 100px;"></span>
                    </span>
                </div>
            </li>
        </ul>
<!--        <?php the_title() ?>-->
    </div>

    <div class="small-6 mediums-8 large-6 columns font-title">
        <span class="title active">
            <a href="#" onclick="zoomToBuilding()">
                <?php the_title() ?>
            </a>
        </span>
        <span class="block-title hide">
        </span>
    </div>

    <div class="small-6 medium-4 large-3 columns switchers">
        <ul class="font-ptsans res-switcher">
        <?php if( isset( $_GET[ 'view' ] ) ): ?>
            <li>
                <a href="<?php the_permalink() ?>" class="<?php echo ( $lowres ) ? "" : "active" ?>">
                    HD
                </a>
            </li>
            <li>
                |
            </li>
            <li>
                <a href="<?php echo add_query_arg( array( 'q' => 'lowres' ) ) ?>" class="<?php echo ( $lowres ) ? "active" : "" ?>">
                    LD
                </a>
            </li>
        <?php else: ?>
            <li class="phone">
                <a href="tel:<?php echo $pnumber ?>"><?php echo $pnumber ?></a>
            </li>
        <?php endif; ?>
            </ul>
        </div>
</div>
