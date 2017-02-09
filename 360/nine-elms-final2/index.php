<?php

require_once( get_template_directory() . '/mobile.php' );

$getOnlyOffice = 'nine elms';

$detect = new Mobile_Detect();

if ( !$detect->isMobile() ) {
?>

<div id="pano" style="width:100%;height:100%;">


	<noscript><table style="width:100%;height:100%;"><tr style="valign:middle;"><td><div style="text-align:center;">ERROR:<br/><br/>Javascript not activated<br/><br/></div></td></tr></table></noscript>
	<script>
        embedpano({swf:"<?php echo get_template_directory_uri(); ?>/360/nine-elms-final2/tour.swf", xml:"<?php echo get_template_directory_uri(); ?>/360/nine-elms-final2/tour.xml", target:"pano", html5:"auto", passQueryParameters:true});
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
      $mobile = get_sub_field( 'mobile' );
			$phone = get_sub_field( 'phone' );
      $fax = get_sub_field( 'fax' );
      $email = get_sub_field( 'email' );
			$skype = get_sub_field( 'skype' );
			$linkedin = get_sub_field( 'linked_in' );
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
			<img class="load-me" data-src="<?php echo $image; ?>" alt="" class="profile" />
			<h2><?php echo $name; ?></h2>
			<p>
				<?php echo $position; ?>
				<?php echo ( $description ) ? '<br>' . $description : ''; ?>
			</p>
			<div class="contact">
                <?php if ( $mobile ) { ?>
                        <a href="tel:<?php echo $mobile; ?>" class="tel"><span class="tel-label">Mobile</span> <?php echo $mobile; ?></a>
                <?php } ?>

				<?php if ( $phone ) { ?>
                    <a href="tel:<?php echo $phone; ?>" class="tel"><span class="tel-label">Office</span> <?php echo $phone; ?></a>
				<?php } ?>

                <?php if ( $fax ) { ?>
                    <a href="tel:<?php echo $fax; ?>" class="tel"><span class="tel-label">Fax</span> <?php echo $fax; ?></a>
                <?php } ?>

				<?php if ( $email ) { ?>
					<a href="mailto:<?php echo $email; ?>"><i class="fa fa-envelope"></i></a>
				<?php } ?>

				<?php if ( $skype ) { ?>
					<a href="skype:<?php echo $skype; ?>" class="skype"><img class="load-me" data-src="<?php echo get_template_directory_uri(); ?>/img/skype3.png" alt="" /></a>
				<?php } ?>

        <a href="https://www.linkedin.com/in/kieran-chalker-0b941635"><i class="fa fa-linkedin-square"></i></a></li>
        <a href="https://www.facebook.com/Garton-Jones-Nine-Elms-Estate-Agents-558753517497591/"><i class="fa fa-facebook-official"></i></a></li>
        <a href="https://twitter.com/gartonjonesldn"><i class="fa fa-twitter-square"></i></a></li>

			</div>
			<hr class="sidesep">
			<ul class="links">
				<li><a href="<?php echo home_url('/offices/nine-elms/'); ?>">+ Learn More About Our Nine-Elms Office</a></li>
				<li><a href="<?php echo home_url('/contact-us/#nine-elms'); ?>">+ Contact The Office</a></li>
			</ul>
	</div>
</div>
		<?php endwhile; ?>
<?php endif;

} else { ?>

  <style>
    html, body {
      overflow-y: auto;
      height: auto;
    }

    body,
    .mb50.mt8p {
      perspective: inherit;
    }

    #navigation-menu {
      display: none !important;
    }

    .custom-footer-text {
      display: none;
    }

    .view-offices {
      position: static;
      font-size: inherit;
      vertical-align: text-bottom;
      color: #AC9857;
    }

    .down-arrow {
      background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCAxMyA4IiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAxMyA4IiB4bWw6c3BhY2U9InByZXNlcnZlIj48cG9seWxpbmUgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjQjdBMDU1IiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBwb2ludHM9IjExLjgsMS4xIDYuNSw2LjQgMS4yLDEuMSAiLz48L3N2Zz4=);
      display: block;
      height: 12px;
      background-repeat: no-repeat;
      background-position: center;
    }

    .parallax {
      transform: none;
      -webkit-transform: none;
      left: 0;
      width: 80%;
      z-index: 1005 !important;
    }

    .reveal-modal {
      background: none;
      border: 0;
      /*top: 0 !important;*/
      position: fixed;
      top: 50% !important;
      transform: translateY(-50%);
      -webkit-transform: translateY(-50%);
      /*margin-top: 15%;*/
      /*margin-top: calc(100% / 2 - 190px);*/
    }

    .button-close {
      top: 0;
      left: 0;
      pointer-events: none;
    }

    .close-reveal-modal {
      display: block;
      width: 40px;
      height: 40px;
      top: -22px !important;
      right: -22px !important;
    }

  </style>

  <div id="team-fly">
    <div class="view-offices-wrapper" style="vertical-align: text-bottom;">
      <a href="#" class="view-offices">View another office</a>
    </div><div class="office-name">
      Nine Elms Office
    </div><div class="" style="margin-top: 5px;">
      <a class="view-other" href="/offices/nine-elms/">Learn more about this office</a><br>
      <a class="view-other" href="/contact-us/#nine-elms">Contact us</a>
    </div>
  </div>

  <div id="team-wrapper" class="small 12 medium 12 large-12 columns">
    <div id="team-row" class="small-12 medium-12 large-12 columns">
    <?php if ( have_rows( 'member' ) )
      while ( have_rows( 'member' ) ) {
      the_row();

      // vars
      $id = get_sub_field( 'id' );
      $name = get_sub_field( 'name' );
      $position = get_sub_field( 'position' );
      $image = get_sub_field( 'image' );
      $mobile = get_sub_field( 'mobile' );
      $phone = get_sub_field( 'phone' );
      $fax = get_sub_field( 'fax' );
      $email = get_sub_field( 'email' );
      $skype = get_sub_field( 'skype' );
      $linkedin = get_sub_field( 'linked_in' );
      $description = get_sub_field( 'description' );
    ?>
      <div id="team-tale" class="small-6 medium-4 large-2 columns">
          <img class="load-me" data-src="<?php echo $image; ?>" alt="" class="profile" />
          <h2><?php echo $name; ?></h2>
          <div class="team-tale-details"><p>
                <?php echo $position; ?>
                <p class="open-close-details"><a href="#" data-reveal-id="<?php echo $id; ?>">+ More info</a></p>
                <?php // echo ( $description ) ? '<br>' . $description : ''; ?>
              </p>
              <div class="contact">
              <?php if ( $phone ) { ?>
                  <a href="tel:<?php echo $phone; ?>" class="tel"><span class="tel-label">Office</span> <?php echo $phone; ?></a>
              <?php } ?>

              <?php if ( $mobile ) { ?>
                  <a href="tel:<?php echo $mobile; ?>" class="tel"><span class="tel-label">Mobile</span> <?php echo $mobile; ?></a>
              <?php } ?>

              <?php if ( $fax ) { ?>
                  <a href="tel:<?php echo $fax; ?>" class="tel"><span class="tel-label">Fax</span> <?php echo $fax; ?></a>
              <?php } ?>

              <?php if ( $email ) { ?>
                  <a href="mailto:<?php echo $email; ?>" class="mail">Email <i class="fa fa-envelope"></i></a>
              <?php } ?>

              <?php if ( $skype ) { ?>
              <!-- <a href="skype:<?php echo $skype; ?>" class="skype"><img src="<?php echo get_template_directory_uri(); ?>/img/skype3.png" alt="" /></a> -->
              <?php } ?>

                <div>
                  <a href="https://www.linkedin.com/in/kieran-chalker-0b941635"><i class="fa fa-linkedin-square"></i></a>
                  <a href="https://www.facebook.com/Garton-Jones-Nine-Elms-Estate-Agents-558753517497591/"><i class="fa fa-facebook-official"></i></a>
                  <a href="https://twitter.com/gartonjonesldn"><i class="fa fa-twitter-square"></i></a>
                </div>
              </div>
          </div>
          <hr class="sidesep">

      </div>

      <div id="<?php echo $id; ?>" class="parallax team-info reveal-modal" data-reveal>
        <div class="team-bg">
          <a href="#" class="close-reveal-modal">
            <div class="button-close open" style="right: 0; top: 0;">
                <div class="circle-arc">
                <svg width="100%" viewBox="0 0 100 100">
                  <path d="M 50 50 m -43 0 a 43 43 0 1 1 86 0 a 43 43 0 1 1 -86 0" style="fill: black; fill-opacity: 0.6;"></path>
                </svg>
                </div>
                <div class="bg">
                  <div></div>
                </div>
                <div class="line l-0"></div>
                <div class="line l-1"></div>
            </div>
          </a>

            <img class="load-me" data-src="<?php echo $image; ?>" alt="" class="profile" />
            <h2><?php echo $name; ?></h2>
            <p>
              <?php echo $position; ?>
              <?php echo ( $description ) ? '<br>' . $description : ''; ?>
            </p>
            <div class="contact">
              <?php if ( $phone ) { ?>
                <a href="tel:<?php echo $phone; ?>" class="tel"><span class="tel-label">Office</span> <?php echo $phone; ?></a>
              <?php } ?>

              <?php if ( $mobile ) { ?>
                <a href="tel:<?php echo $mobile; ?>" class="tel"><span class="tel-label">Mobile</span> <?php echo $mobile; ?></a>
              <?php } ?>

              <?php if ( $fax ) { ?>
                <a href="tel:<?php echo $fax; ?>" class="tel"><span class="tel-label">Fax</span> <?php echo $fax; ?></a>
              <?php } ?>

              <?php if ( $email ) { ?>
                <a href="mailto:<?php echo $email; ?>"><i class="fa fa-envelope"></i></a>
              <?php } ?>

              <?php if ( $skype ) { ?>
                <a href="skype:<?php echo $skype; ?>" class="skype"><img class="load-me" data-src="<?php echo get_template_directory_uri(); ?>/img/skype3.png" alt="" /></a>
              <?php } ?>

              <a href="https://www.linkedin.com/in/kieran-chalker-0b941635"><i class="fa fa-linkedin-square"></i></a></li>
              <a href="https://www.facebook.com/Garton-Jones-Nine-Elms-Estate-Agents-558753517497591/"><i class="fa fa-facebook-official"></i></a></li>
              <a href="https://twitter.com/gartonjonesldn"><i class="fa fa-twitter-square"></i></a></li>

            </div>
            <hr class="sidesep">
            <ul class="links">
              <li><a href="<?php echo home_url( '/offices/nine-elms/' ); ?>">Learn more about our nine-elms Office</a></li>
              <li><a href="<?php echo home_url( '/contact-us/#nine-elms' ); ?>">Contact the Office</a></li>
            </ul>
        </div>
      </div>
      <?php }
        ?>
    </div>
  </div>
<?php } ?>

<a href="#" class="view-offices">Go to other offices<a>
<div class="the-wrapper content">
	<div id="bg">
		<img class="westminster load-me" data-src="<?php echo get_template_directory_uri() ?>/img/properties/cleland.jpg" />
		<!-- <img class="chelsea load-me" data-src="<?php echo get_template_directory_uri() ?>/img/properties/great-minster-house.jpg" /> -->
		<img class="nine-elms load-me" data-src="<?php echo get_template_directory_uri() ?>/img/nine-elms-team.jpg" />
    <!-- <img class="south-bank load-me" data-src="<?php echo get_template_directory_uri() ?>/img/properties/nine-elms-point.jpg" /> -->
	</div>
	<div class="the-strips">
		<ul>
			<li data-image="westminster"><a href="/offices/westminster/team/"><h3>Westminster</h3></a></li>
			<!-- <li data-image="chelsea"><a href="/team/chelsea-bridge-wharf/"><h3>Chelsea Bridge Wharf</h3></a></li> -->
			<li data-image="nine-elms"><a href="/offices/nine-elms/team/"><h3>Nine Elms</h3></a></li>
      <!-- <li data-image="south-bank"><a href="/team/south-bank/"><h3>South Bank</h3></a></li> -->
			<li></li>
      <li></li>
      <li></li>
		</ul>
	</div>
</div>

<div id="youtube" class="parallax team-info">
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
		<iframe width="410" height="261" src="https://www.youtube.com/embed/Vc0VkvbVs64" frameborder="0" allowfullscreen style="width: 410px; height: 261px;"></iframe>
	</div>
</div>

<?php if ( $detect->isMobile() ) { ?>
</div>
<?php } ?>
