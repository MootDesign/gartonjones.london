<?php
//CSS
wp_enqueue_style( 'single-style' );
wp_enqueue_script( 'single-development' );
get_header();
?>

<style>
	@-ms-viewport { width:device-width; }
	@media only screen and (min-device-width:800px) { html { overflow:hidden; } }
	html { height:100%; }
	body { height:100%; overflow:hidden; margin:0; padding:0; font-family:Arial, Helvetica, sans-serif; font-size:16px; color:#FFFFFF; background-color:#000000; }

    .mb50.mt8p {
        margin: 0 !important;
        height: 93% !important;
        width: 100% !important;
        max-width: 100% !important;
        position: relative;
        perspective: 1100px;
    }

    iframe {
        width: 100%;
        height: 100%;
        border: none;
    }

    .parallax {
        z-index: 999 !important;
    }
</style>

<div class="row fullWidth mb50 mt8p">
    <?php require_once( 'team/index.php' ); ?>
<!--    <iframe src="<?php echo  get_template_directory_uri() ?>/team/index.html"></iframe>-->
<!--
        <noscript><table style="width:100%;height:100%;"><tr style="valign:middle;"><td><div style="text-align:center;">ERROR:<br/><br/>Javascript not activated<br/><br/></div></td></tr></table></noscript>
        <script>
            embedpano({swf:"<?php echo get_template_directory_uri(); ?>/team/tour.swf", xml:"<?php echo get_template_directory_uri(); ?>/team/tour.xml", target:"pano", html5:"prefer", passQueryParameters:true});
        </script>
-->
<!--</div>-->

<?php
	get_footer();
