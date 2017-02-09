<script>
    var isiPad = navigator.userAgent.match(/iPad/i) != null;

    jQuery(document).ready(function( $ ){
        setTimeout( function() {
            jQuery( '.close-me' ).removeClass( 'hidden' );

            if( isiPad ) {
                jQuery( '#pano' ).height( jQuery( '#pano' ).parent().outerHeight() );
            }
        }, 1000 );
    });

    function toggleMapView() {
        var h = ( jQuery('#office-map .content').hasClass( 'show-me' ) ) ? 300 : 0;

        jQuery( '#office-map .content' ).animate( { height: h }, 'fast', function() {
            $title = jQuery( '#office-map .close-me .title' );

            var visible = jQuery('#office-map .content').hasClass( 'show-me' );

            $title.html( visible ? $title.attr( 'data-title' ) : 'Close' );
            jQuery( '#office-map .close-me .arrow' ).html( ! visible ? '&#9650' : '&#9660' );
        });

        jQuery('#office-map .content').toggleClass( 'show-me' );
    }

    function closeMapView( div ) {
        toggleMapView();

        var krpano = document.getElementById("krpanoSWFObject");

        var fov = Number( krpano.get("view.fov") );
        fov += 100.0;
        krpano.set("view.fov", fov);

        krpano.call("looktohotspot('loader');js(blurEffect());wait(1);loadscene(get(startscene),null,MERGE);js(removeBlur())");

        //Change the title
        setTimeout( function( div ) {
            $div = jQuery( div );
            jQuery( '.close-me .title' ).html( $div.find( '.title .office' ).html() );


            jQuery( '.close-me .title' ).attr( 'data-title', jQuery( '.close-me .title' ).html() );
        }, 1000, div );
    }

//    function showPopup( id ) {
//        jQuery( '#menugrayout' ).fadeIn();
//        parallaxAnimate( '#' + id );
//    }

    function showPopup( id ) {
		var krpano = document.getElementById("krpanoSWFObject");

        krpano.call("js(blurEffect());wait(1);js(removeBlur())");
		jQuery( '#menugrayout' ).delay(150).fadeIn();
        parallaxAnimate( '#' + id );
    }

    function blurEffect() {
        jQuery( '.mt8p' ).addClass( 'blur' );
    }

    function removeBlur() {
        setTimeout( function() {
            jQuery( '.mt8p' ).removeClass( 'blur' );
        }, 500 );
    }

	function moveThroughDoor() {
		var krpano = document.getElementById("krpanoSWFObject");
		krpano.call("looktohotspot('door'); js(blurEffect()); wait(1); loadscene(get(startscene),null, MERGE); js(removeBlur())");
	}
</script>

<div id="pano" style="width:100%;height:100%;">


	<noscript><table style="width:100%;height:100%;"><tr style="valign:middle;"><td><div style="text-align:center;">ERROR:<br/><br/>Javascript not activated<br/><br/></div></td></tr></table></noscript>
	<script>
		embedpano({swf:"<?php echo get_template_directory_uri(); ?>/360/chelsea/tour.swf", xml:"<?php echo get_template_directory_uri(); ?>/360/chelsea/tour.xml", target:"pano", html5:"prefer", passQueryParameters:true});
	</script>
</div>

</div> <!-- added as fix for breaking footer position. Basically it closes '<div class="row fullWidth mb50 mt8p last">' -->

<!--
    <div class="qv-youtube">
        <iframe width="100%" height="80%" src="//www.youtube.com/embed/1Vr1jexrjWs?rel=0" frameborder="0" allowfullscreen="" style="min-height:300px"></iframe>
    </div>
-->

<!--
    <div class="team-bg">
		<h2>Name</h2>
		<p>
			A short peice of information about this team member here will go here.
		</p>
		<div class="contact">
			<a href="tel:02073400480" class="tel">+44 (0) 20 7340 0480</a>
			<a href="mailto:#" class="mail"><img src="/img/mail.png" /></a>
			<a href="skype:#" class="skype"><img src="/img/skype2.png" /></a>
		</div>
		<hr class="sidesep">
		<ul class="links">
			<li><a href="#">+ Learn more about our Westminster Office</a></li>
			<li><a href="#">+ Contact the Office</a></li>
		</ul>
	</div>
-->

<?php if ( have_rows( 'member' ) ) : ?>

		<?php
			while ( have_rows( 'member' ) ) :
			the_row();

			// vars
			$id = get_sub_field( 'id' );
			$name = get_sub_field( 'name' );
			$position = get_sub_field( 'position' );
			$image = get_sub_field( 'image' );
			$phone = get_sub_field( 'phone' );
			$email = get_sub_field( 'email' );
			$skype = get_sub_field( 'skype' );
			$linkedin = get_sub_field( 'linkedin' );
			$description = get_sub_field( 'description' );
		?>

<div id="<?php echo $id; ?>" class="parallax team-info">
    <div class="x-close close-me">✕</div>
	<div class="team-bg">
			<img src="<?php echo $image; ?>" alt="" class="profile" />
			<h2><?php echo $name; ?></h2>
			<p>
				<?php echo $position; ?>
				<?php echo ( $description ) ? '<br>' . $description : ''; ?>
			</p>
			<div class="contact">
				<?php if ( $phone ) { ?>
					<a href="tel:<?php echo $phone; ?>" class="tel"><?php echo $phone; ?></a>
				<?php } ?>

				<?php if ( $email ) { ?>
					<a href="mailto:<?php echo $email; ?>" class="mail"><img src="/img/mail.png" alt="" /></a>
				<?php } ?>

				<?php if ( $skype ) { ?>
					<a href="skype:<?php echo $skype; ?>" class="skype"><img src="/img/skype2.png" alt="" /></a>
				<?php } ?>

				<?php if ( $linkedin ) { ?>
					<a href="<?php echo $linkedin; ?>" class="linkedin"><img src="/img/linkedin.png" alt="" /></a>
				<?php } ?>

			</div>
			<hr class="sidesep">
			<ul class="links">
				<li><a href="<?php ?>">+ Learn more about our Chelsea Office</a></li>
				<li><a href="<?php ?>">+ Contact the Office</a></li>
			</ul>
	</div>
</div>
		<?php endwhile; ?>

<?php endif; ?>

<a href="#" class="view-offices">View other offices<a>
<div class="the-wrapper content">
	<div id="bg">
		<img class="westminster load-me" data-src="<?php echo get_template_directory_uri() ?>/img/properties/cleland.jpg" />
		<img class="chelsea load-me" data-src="<?php echo get_template_directory_uri() ?>/img/properties/great-minster-house.jpg" />
		<img class="nine-elms load-me" data-src="<?php echo get_template_directory_uri() ?>/img/properties/nine-elms-point.jpg" />
    <img class="south-bank load-me" data-src="<?php echo get_template_directory_uri() ?>/img/properties/nine-elms-point.jpg" />
	</div>
	<div class="the-strips">
		<ul>
			<li data-image="westminster"><a href="/team/westminster/"><h3>Westminster</h3></a></li>
			<li data-image="chelsea"><a href="/team/chelsea-bridge-wharf/"><h3>Chelsea Bridge Wharf</h3></a></li>
			<li data-image="nine-elms"><a href="/team/nine-elms"><h3>Nine Elms</h3></a></li>
      <li data-image="south-bank"><a href="/team/south-bank/"><h3>South Bank</h3></a></li>
			<li></li>
		</ul>
	</div>
</div>
