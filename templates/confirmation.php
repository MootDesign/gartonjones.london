<?php
/**
 * The Template for displaying all single posts
 *
 * @package WordPress
 * @subpackage Twenty_Fourteen
 * @since Twenty Fourteen 1.0
 */

get_header(); ?>

<div id="table">
  <div class="cell">
    <?php the_content(); ?>


    <div style="text-align: center; margin-top: 40px;">
      <span style="display: block; font-size: 14px;">Currency accepted GBP</span>
      <img src="<?php echo get_template_directory_uri(); ?>/img/logos/payments.png" alt="" style="height: 181px;margin: -35px 0 -55px;" />
    </div>

     <br />
     View our <a href="#" onclick="showPopup('tc'); showClose( 400 );">Terms &amp; Conditions</a> / <a href="#" onclick="showPopup('refund'); showClose( 400 );">Refund Policy</a>
  </div>
</div>
<div style="
    text-align: center;
    -webkit-column-count: 2;
       -moz-column-count: 2;
            column-count: 2;
    max-width: 800px;
    margin: 30px auto 100px;
    font-size: 14px;
">
Garton Jones(Westminster)Limited <br>
Garton Jones(Albert Embankment) Limited  <br>
Garton Jones(Riverlight) Limited  <br>
Place of registration <br>
33 Wood Lodge Lane, West Wickham, Kent BR4 9LY  <br>
Registered office address  <br>
33 Wood Lodge Lane, West Wickham, Kent BR4 9LY  <br>
Company's registered number  <br>
Garton Jones (Westminster) Limited 06376133  <br>
Garton Jones (Albert Embankment) Limited 08462643 <br>
 Garton Jones (Riverlight) Limited 07901995  <br>
Hayleigh: <a href="tel:0207 340 0480">0207 340 0480</a>  <br>
DD is <a href="tel:0207 340 0488">0207 340 0488</a> <br>
<a href="mailto:hayleigh@gartonjones.com">hayleigh@gartonjones.com</a>
</div>
<div id="tc" class="close-me">
  <div class="button-close" style="top: -22px; right: -22px;">
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
  <?php the_field( 'tc' ); ?>
</div>

<div id="refund" class="close-me">
  <div class="button-close" style="top: -22px; right: -22px;">
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
  <?php the_field( 'refund' ); ?>
</div>
<?php
get_footer();
