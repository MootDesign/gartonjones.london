<?php

require_once( 'mobile.php' );

$detect = new Mobile_Detect();

//CSS
wp_enqueue_style('single-style', get_template_directory_uri() . '/css/single.development.css' );
wp_enqueue_script('single-development', get_template_directory_uri() . '/js/single.development.js', array(), '1.0', true );

wp_enqueue_script('gmap-js', get_template_directory_uri() . '/js/gmap.js', array(), '1.0', true );

get_header();
?>

<div class="overlayed-bar row">
    <div class="large-3 medium-4 columns font-ptsans hide-for-small">
        About
        The knowledge
    </div>

    <div class="small-12 medium-4 large-6 columns font-title">
        The Knowledge
    </div>

    <div class="small-12 medium-4 large-3 columns switchers">
        <div class="row">
            <ul class="font-ptsans">
                <li class="small-3 medium-3 columns icon-4">
                    <a href="<?php echo home_url( '/knowledge/' ); ?>" class="icon-360" data-id="pano">
                        360
                    </a>
                </li>
                <li class="small-3 medium-3 columns icon-3">
                    <a href="<?php echo home_url( '/knowledge/' ); ?>" class="icon-az" data-id="az">
                        A-Z
                    </a>
                </li>
                <li class="small-3 medium-3 columns icon-2">
<!--                    <a href="#" class="icon-photo" data-id="photo">-->
                    <a href="<?php echo home_url( '/knowledge-photo/' ); ?>" class="icon-photo active">
                        Photo
                    </a>
                </li>
                <li class="small-3 medium-3 columns icon-1">
                    <a href="<?php echo home_url( '/knowledge/' ); ?>" class="icon-map" data-id="map">
                        Map
                    </a>
                </li>
            </ul>
        </div>
    </div>
</div>

<div id="photo">
    <?php require_once( 'templates/coverflow.php' ); ?>
</div>

<?php
get_footer();

