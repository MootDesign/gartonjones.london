<?php
wp_enqueue_script( 'moot-coverflow', '/coverflow/FWDSimple3DCoverflow_uncompressed.js', array( 'jquery' ), '20131209', false );
wp_enqueue_script( 'moot-coverflow-js', get_template_directory_uri() . '/js/coverflow.js', array( 'jquery' ), '20131209', false );
wp_enqueue_script( 'swiper', get_template_directory_uri() . '/js/idangerous.swiper-2.1.min.js', array( 'jquery' ), '20131209', false  );
wp_enqueue_script( 'swiper-2', get_template_directory_uri() . '/js/idangerous.swiper.3dflow.js', array( 'jquery' ), '20131209', false );
?>
<script>
jQuery(document).ready(function(){
jQuery('#scanlines, #grad3').fadeIn('slow');

    <?php if( is_home() ) : ?>
        jQuery('#vcont2, #scanlines').delay(5000).animate({opacity:0.05});
        jQuery('.swiper-container').delay(2000).animate({opacity:1});
    <?php endif; ?>

    if( jQuery( "#notice" ).length > 0 ) {
        setTimeout( function() {
            jQuery( '#myDiv-fluidwidth' ).hide();
        }, 500 );
    }
});

jQuery( 'body' ).on( 'click', '.qv-link', function() {
    _onCoverflowClick( jQuery( this ).data( 'id' ) );
});

<?php if( !isset( $GLOBALS[ 'noclick' ] ) ) : ?>
var _data = {};

function _onCoverflowClick( id ) {
    var id = id;
    var data = _data[ 'p' + id ];

    //Update the reveal data
    var $rev = jQuery( '#qvData' );

    $rev.find( '#qvimg' ).css( 'background-image', data.bg );
    $rev.find( 'h1.poph1 a' ).attr( 'href', data.link );
    $rev.find( 'h1.poph1 a' ).html( data.title );
    $rev.find( 'h2.poph2' ).html( data.price );
    $rev.find( 'p.text-left' ).html( data.description );
    $rev.find( 'a#popdetails' ).attr( 'href', data.link );
    $rev.find( 'a#popt' ).attr( 'href', data.link );

    $rev.foundation( 'reveal', 'open' );
}
<?php endif; ?>

</script>
<!--Quickview-->
  <div id="quickview" class="hide">
  <div id="qvimg"></div>
    <div id="qvdetails">
     <h1 id="poph1">Abell House, John Islip Street, Westminster, London, SW1P</h1>
 <h2 id="poph2">£2,400,000</h2>
 <div id="qvdesc">

<p style="font-family: 'PT Sans';font-size:0.9em;line-height:1.5em;color:#fff;" id="popdescription">
A 2 double bedroom duplex apartment of approx.1693sq.ft (157sq.m) arranged over the lower and upper ground floors of this luxury new building being developed by Berkeley Homes in the heart of Westminster. This spacious apartment further benefits from an open plan reception room...</p>

 </div>
 <div id="qvfunctions">
 <ul>
<li><a href="#" class="linx" id="popdetails"><span class="plus">+</span>&nbsp;View full details</a></li>
<li><a href="#" class="linx" id="popshare"><span class="plus">+</span>&nbsp;Share</a>&nbsp;<a href="#" id="popfb" target="_blank"><img src="/img/menufb.png" style="margin-top: -4px;"></a>&nbsp;<a href="#" id="popt" target="_blank"><img src="/img/menutw.png" style="margin-top: -4px;"></a></li>
<li><a href="#" class="linx" id="popviewing"><span class="plus">+</span>&nbsp;Arrange a Viewing</a></li>
</ul>
</div>
 <div style="clear:both;"></div>
 </div>
 <div class="closeit">
 - Back
 </div>
 <div style="clear:both;"></div>
  </div>

<!--end quickview-->


<div class="row fullWidth">
<div class="small-12 medium-12 large12 columns swiper-container">
<div id="myholder"><div id="myDiv"></div></div>


 	<?php
            global $gj_query, $wp_query;

            $i = 0;

            $gj_query = ( ! isset( $gj_query ) ) ? $wp_query : $gj_query;
			if ( $gj_query->have_posts() ) :

?>
    		<!-- coverflow data -->
		<ul id="coverflowData" style="display: none;">

			<!-- category  -->
			<ul data-cat="+ Category one">

<?php

				// Start the Loop.
				while ( $gj_query->have_posts() ) : $gj_query->the_post();
				//get_template_part( 'content', get_post_format() );
                $price = get_field('price');
                $pidd = get_field('p_id');

                if ($price <= 80000){
                    $disprice = number_format($price);
                    $display = "£".$disprice." pw";
                } else {
                    $disprice = number_format($price);
                    $display = "£".$disprice;
                }
                $exc = substr(get_field('descriptionfull'),0,250);
        ?>
                <?php
					$image = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ), 'medium' );
//					$image = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ), 'thumbnail' );
					if ( ! $image ) {
				?>
						<script>alert('No image in coverflow for the <?php echo get_the_title(); ?> property.');</script>			
				<?
					}

				?>

 <ul>
					<li data-type="media" data-url="<div>hali</div>"></li>
					<li data-thumbnail-path="<?php echo $image[0]; ?>"></li>
					<li data-thumbnail-text="">
<?php if( !isset( $GLOBALS[ 'noclick' ] ) ) : ?>
          <div class="flowWrapper" style="float: left; width: 100%; height: auto; padding-top: 5px">
						<p class="largeLabel"><?php the_title(); ?></p>
						<p class="smallLabel">Price: <?php echo $display; ?></p>
            <p class="flowLinks">
        <script>
            var myid = "qv<?php the_field('p_id'); ?>";

            _data.p<?php echo $i ?> = {};
            _data.p<?php echo $i ?>.bg = 'url(<?php echo $image[0] ?>)';
            _data.p<?php echo $i ?>.link = '<?php the_permalink() ?>';
            _data.p<?php echo $i ?>.title = '<?php echo addslashes ( get_the_title() ) ?>';
            _data.p<?php echo $i ?>.price = '<?php echo $display ?>';
            _data.p<?php echo $i ?>.description = '<?php echo addslashes( $exc ) ?>';
      </script>
            <ul class="options">
                <li><a href="#" class="qv-link" data-id="<?php echo $i ?>">+ Quick View</a></li>
                <li><?php if (function_exists('wpfp_link')) { wpfp_link(); } ?></li>
                <li><a href="<?php the_permalink(); ?>">+ Full Details</a></li>
                <li><a href="<?php the_permalink(); ?>?map=1">+ View on Map</a></li>
            </ul>
          </p>
            </div>
					</li>
<?php endif; ?>

				</ul>



     <?php
                $i++;
				endwhile;

?>
</ul>
    </ul>

<?php

			else :

                $beds = intval( $_GET[ 'beds' ] );
?>
<?php if( $_GET[ 'search' ] == 2 ) : ?>
    <div id="notice">
        <h2>
            Currently are no <?php echo $beds ?> bed<?php echo ( $bed == 1 ) ? "" : "s" ?> properties.
        </h2>

        <ul class="submenu leftmenu">
             <li class="item">
                 <a href="#" data-title="Click here to register your interest." onclick="parallaxAnimate( '#register' )">Click here to register your interest.</a>
             </li>

             <li class="item">
                 <a href="#" data-title="Back" onclick="history.back()">Back</a>
             </li>
        </ul>
    </div>

<?php endif; ?>
    <?php
				// If no content, include the "No posts found" template.
//				get_template_part( 'content', 'none' );

			endif;
		?>
<!--end of swiper slide-->

<!--  Reveal  -->
<div id="qvData" class="reveal-modal" data-reveal>
    <div id="qvimg" style="min-height:200px;width:100%;"></div>

    <div id="qvdetails">
        <h1 class="poph1"><a href=""></a></h1>
        <h2 class="poph2"></h2>
            <div id="qvdesc">

                <p style="font-family: 'PT Sans';font-size:0.9em;line-height:1.5em;color:#fff;" id="popdescription" class="text-left">
                <?php echo $exc; ?></p>

            </div>

        <div id="qvfunctions">
            <ul>
                <li><a href="<?php the_permalink(); ?>" class="linx" id="popdetails"><span class="plus">+</span>&nbsp;View full details</a></li>
                <li><a href="#" class="linx" id="popshare"><span class="plus">+</span>&nbsp;Share</a>&nbsp;<a href="https://facebook.com/sharer.php?u=<?php the_permalink(); ?>" id="popfb" target="_blank"><img src="/img/menufb.png" style="margin-top: -4px;"></a>&nbsp;<a href="https://twitter.com/intent/tweet?url=<?php the_permalink(); ?>" id="popt" target="_blank"><img src="/img/menutw.png" style="margin-top: -4px;"></a></li>
                <li><a href="#" class="linx" id="popviewing"><span class="plus">+</span>&nbsp;Arrange a Viewing</a></li>
            </ul>
        </div>
        <div style="clear:both;"></div>
    </div>

    <div class="closeit" onclick="javascript:jQuery('a.close-reveal-modal').trigger('click');">
        - Back
    </div>
    <div style="clear:both;"></div>
    <a class="close-reveal-modal">&#215;</a>
</div>

<!--    -->

</div>
</div>

<!-- Register your interest -->
   <div id="register" class="parallax">
       <div class="x-close">&#10005;</div>
       <div class="content">
           <?php echo do_shortcode( '[gravityform id="2" ajax=true]' ); ?>
       </div>
  </div>



<!--
 <div data-interchange="[<?php echo get_template_directory_uri() ?>/smallswiper.html, (small)], [<?php echo get_template_directory_uri() ?>/mediumswiper.html, (medium)], [<?php echo get_template_directory_uri() ?>/largeswiper.html, (large)], [<?php echo get_template_directory_uri() ?>/xlargeswiper.html, (xlarge)]">
-->
</div>

