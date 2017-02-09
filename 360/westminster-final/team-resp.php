<script>
  //   var isiPad = navigator.userAgent.match(/iPad/i) != null;
  //   var krpanoLook = {};
  //
  //   jQuery(document).ready(function( $ ){
  //       setTimeout( function() {
  //           jQuery( '.close-me' ).removeClass( 'hidden' );
  //
  //           if( isiPad ) {
  //               jQuery( '#pano' ).height( jQuery( '#pano' ).parent().outerHeight() );
  //           }
  //       }, 1000 );
  //   });
  //
  //   function toggleMapView() {
  //       var h = ( jQuery('#office-map .content').hasClass( 'show-me' ) ) ? 300 : 0;
  //
  //       jQuery( '#office-map .content' ).animate( { height: h }, 'fast', function() {
  //           $title = jQuery( '#office-map .close-me .title' );
  //
  //           var visible = jQuery('#office-map .content').hasClass( 'show-me' );
  //
  //           $title.html( visible ? $title.attr( 'data-title' ) : 'Close' );
  //           jQuery( '#office-map .close-me .arrow' ).html( ! visible ? '&#9650' : '&#9660' );
  //       });
  //
  //       jQuery('#office-map .content').toggleClass( 'show-me' );
  //   }
  //
  //   function closeMapView( div ) {
  //       toggleMapView();
  //
  //       var krpano = document.getElementById("krpanoSWFObject");
  //
  //       var fov = Number( krpano.get("view.fov") );
  //       fov += 100.0;
  //       krpano.set("view.fov", fov);
  //
  //       krpano.call("looktohotspot('loader');js(blurEffect());wait(1);loadscene(get(startscene),null,MERGE);js(removeBlur())");
  //
  //       //Change the title
  //       setTimeout( function( div ) {
  //           $div = jQuery( div );
  //           jQuery( '.close-me .title' ).html( $div.find( '.title .office' ).html() );
  //
  //
  //           jQuery( '.close-me .title' ).attr( 'data-title', jQuery( '.close-me .title' ).html() );
  //       }, 1000, div );
  //   }
  //
  //   function _centerDiv( $div ) {
  //       //Center
  //       $div.css( { marginLeft: - $div.outerWidth() / 2,
  //                   top: '50%',
  //                   marginTop: - $div.outerHeight() / 2 } );
  //
  //       $div.css( { opacity: 1 } );
  //   }
  //
  //   function showSpot( item ) {
  //       $div = jQuery( "#" + item );
  //
  //       $div.hide().transition({
  //           scale: 0,
  //       }, 0 );
  //
  //       _centerDiv( $div );
  //
  //       $div.show().addClass( 'zactive' ).transition({
  //           scale: 1,
  //           opacity: 1
  //       }, 'slow', 'easeInOutExpo' );
  //
  //       jQuery( 'html' ).css( { overflow: 'hidden' } );
  //
  //       if( ! jQuery( 'body' ).hasClass( 'single-2d' ) ) {
  //         jQuery( 'body' ).addClass( 'no-overflow' );
  //       }
  //
  //       // jQuery( '.mt8p' ).transition( { scale:3.5, opacity: 0 }, 'slow', 'easeInOutExpo', function() {
  //       //     jQuery( this ).addClass( 'zoomed' );
  //       //
  //       //     jQuery( this ).hide();
  //       //
  //       //     setTimeout( function() {
  //       //         jQuery( 'html' ).css( { overflow: 'auto' } );
  //       //         jQuery( 'body' ).removeClass( 'no-overflow' );
  //       //     }, 100 );
  //       // });
  //
  //       // jQuery( '.mt8p' ).transition( { scale:3.5 }, 'slow', 'linear', function() {
  //       //     jQuery( this ).addClass( 'zoomed' );
  //       //
  //       //     setTimeout( function() {
  //       //         jQuery( 'html' ).css( { overflow: 'auto' } );
  //       //         jQuery( 'body' ).removeClass( 'no-overflow' );
  //       //     }, 50 );
  //       // });
  //
  //       showShade(0, true);
  //   }
  //
  //   function showTeamPopup( id ) {
  //      var krpano = document.getElementById("krpanoSWFObject");
  //       krpanoLook = {
  //         fov: Number( krpano.get("view.fov") ),
  //         hlook: Number( krpano.get("view.hlookat") ),
  //         vlook: Number( krpano.get("view.vlookat") )
  //       };
  //
  //       // krpano.call("js(blurEffect());wait(0.15);js(removeBlur())");
  //  // jQuery( '#menugrayout' ).delay(150).fadeIn();
  //
  //       //If doesn't exists show the blank one + the "SPOT ID"
  //       var div = id;
  //       var $div = jQuery( '#' + div );
  //       if( $div.length <= 0 ) {
  //         div = 'blank';
  //         jQuery( '#blank h2' ).html( id );
  //       }
  //
  //       krpano.call("looktohotspot('" + id + "');js(blurEffect());wait(0);js(showSpot('" + div + "'))");
  //   }
  //
  //   function blurEffect() {
  //       jQuery( '.mt8p' ).addClass( 'blur' );
  //   }
  //
  //   function removeBlur() {
  //     jQuery( '.mt8p' ).removeClass( 'blur' );
  //   }
  //
  // function moveThroughDoor() {
  //  var krpano = document.getElementById("krpanoSWFObject");
  //  krpano.call("looktohotspot('door'); js(blurEffect()); wait(1); loadscene(get(startscene),null, MERGE); js(removeBlur())");
  // }
  //
  // //Close the parallax window
  // jQuery( 'body' ).on( 'click', '.x-close', function() {
  //     var closest = jQuery( this ).data( 'close' ) || '.parallax';
  //
  //     jQuery( this ).closest( closest ).transition({
  //         scale: 0,
  //         opacity: 0
  //     }, 'slow', 'easeInOutExpo', function() {
  //       hideShade();
  //       removeBlur();
  //
  //       //Restore krpano View
  //       var krpano = document.getElementById("krpanoSWFObject");
  //
  //       // console.log('lookto(' + krpanoLook.hlook + ', ' + krpanoLook.vlook + ', ' + krpanoLook.fov + ')');
  //       krpano.call('lookto(' + krpanoLook.hlook + ', ' + krpanoLook.vlook + ', ' + krpanoLook.fov + ')');
  //     } );
  // });
</script>

<!-- <div id="office-map">
    <div class="content show-me">
<?php

$args = array(
  'sort_order' => 'DESC',
  'sort_column' => 'post_title',
  'hierarchical' => 1,
  'exclude' => '',
  'include' => '',
  'meta_key' => '',
  'meta_value' => '',
  'authors' => '',
  'child_of' => 0,
  'parent' => 1825,
  'exclude_tree' => '',
  'number' => '',
  'offset' => 0,
  'post_type' => 'page',
  'post_status' => 'publish'
);
$pages = get_pages($args);

$i = 1;
foreach( $pages as $page ) :
?>
        <div class="dot-container dot-<?php echo $i ?>" data-id="dot-<?php echo $i++ ?>">
            <div class="title">
                <span class="office" onclick="closeMapView( this )">
                <a href="<?php echo get_the_permalink( $page->ID ); ?>"><?php echo $page->post_title ?></a>
                </span>

                <div class="contacts">
                    <img src="/img/mail.png" >
                    <img src="/img/skype2.png" >
                </div>

            </div>
        </div>
<?php endforeach; ?>
    </div>

    <div class="close-me hidden">
        <span onclick="toggleMapView()">
            <span class="title" data-title="<?php the_title(); ?>"><?php the_title(); ?></span>
            <span class="arrow">&#9660;</span>
        </span>
    </div>
</div> -->


<div id="pano" style="width:100%;height:100%;">


  <noscript><table style="width:100%;height:100%;"><tr style="valign:middle;"><td><div style="text-align:center;">ERROR:<br/><br/>Javascript not activated<br/><br/></div></td></tr></table></noscript>
  <script>
        embedpano({swf:"<?php echo get_template_directory_uri(); ?>/360/westminster-final/tour.swf", xml:"<?php echo get_template_directory_uri(); ?>/360/westminster-final/tour.xml", target:"pano", html5:"auto", passQueryParameters:true});
  </script>
</div>

</div> <!-- added as fix for breaking footer position. Basically it closes '<div class="row fullWidth mb50 mt8p last">' -->

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
  <div class="team-bg">

    <div class="button-close">
        <div class="circle-arc">
        <svg width="100%" viewBox="0 0 100 100">
          <path d="M 50 50 m -43 0 a 43 43 0 1 1 86 0 a 43 43 0 1 1 -86 0"></path>
        </svg>
        </div>
        <div class="bg">
          <div></div>
        </div>
        <div class="line l-0"></div>
        <div class="line l-1"></div>
    </div>

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
          <a href="mailto:<?php echo $email; ?>"><i class="fa fa-envelope"></i></a>
        <?php } ?>

        <?php if ( $skype ) { ?>
          <a href="skype:<?php echo $skype; ?>" class="skype"><img src="<?php echo get_template_directory_uri(); ?>/img/skype3.png" alt="" /></a>
        <?php } ?>

        <a href="https://www.linkedin.com/in/kieran-chalker-0b941635"><i class="fa fa-linkedin-square"></i></a></li>
        <a href="https://www.facebook.com/Garton-Jones-Nine-Elms-Estate-Agents-558753517497591/"><i class="fa fa-facebook-official"></i></a></li>
        <a href="https://twitter.com/gartonjonesldn"><i class="fa fa-twitter-square"></i></a></li>

      </div>
      <hr class="sidesep">
      <ul class="links">
        <li><a href="<?php ?>">+ Learn more about our <?php the_title(); ?> Office</a></li>
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

