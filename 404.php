<?php
/**
 * The Template for displaying all single posts
 *
 * @package WordPress
 * @subpackage Twenty_Fourteen
 * @since Twenty Fourteen 1.0
 */

get_header(); ?>
<!--<div id="bigben">
<div id="hourtick"></div>
<div id="mintick"></div>
</div>-->
<style>

</style>
	<?php
			if ( have_posts() ) :
				// Start the Loop.
				while ( have_posts() ) : the_post();
        ?>
 <div class="row fullWidth mb50">
<div class="medium-1 large-1 columns">
&nbsp;
</div>
<div class="small-10 medium-10 large-10 columns bggold
">
<div class="row">
 <div class="small-12 medium-4 large-3 columns" id="side">
  <h1><?php the_title(); ?></h1>
 <ul class="submenu">
   <li><a href="/team/">The Team</a></li>
   <li><a href="/offices/">Our Offices</a></li>
 </ul>
  <hr class="sidesep">
   <ul class="subsubmenu">
   <li><a href="">Westminster</a></li>
   <li><a href="">Nine Elms - Southbank</a></li>
   <li><a href="">Chelsea Bridge Wharf</a></li>
 </ul>

 </div>
  <div class="small-12 medium-8 large-6 columns" id="wording">
<h2>
 <?php
 $subtitle = get_field('subtitle');
 if ($subtitle!=''){
  the_field('subtitle');
 } else {
 echo 'Lorem ipsum dolor e sit amet conspictitur elit';
 }
 ?>
 </h2>
 <div class="row">
 <div class="small-12 medium-12 large-12 columns content1col">
  <?php if($post->post_content=="") : ?>

 <p>Aliquam eu sem nibh. Sed hendrerit ipsum id nulla sagittis, ut eleifend neque pellentesque. Curabitur volutpat pharetra vehicula. Aliquam ut commodo lorem, eu dapibus enim. Sed facilisis sapien nibh, id suscipit magna sagittis vitae. Sed non lorem eget dolor sollicitudin vestibulum. Maecenas a molestie enim, eu ullamcorper neque. Aliquam euismod, mauris vitae interdum adipiscing, leo lectus iaculis libero, quis blandit nibh felis eget ligula.
</p>
 <p>Etiam mauris felis, varius at neque vitae, dapibus condimentum mauris. Phasellus euismod tortor est, at gravida purus mollis nec. Duis ut adipiscing dui, vel facilisis sapien. Aenean ultricies enim a metus mollis, sed malesuada odio dapibus. Nunc dui orci, euismod at erat sit amet, ultricies convallis sem.</p>

<?php else : ?>

<?php the_content(); ?>

<?php endif; ?>
</div>
 </div>
 </div>
  <div class="small-0 medium-0 large-3 columns wiref hide-for-medium-down">
  <img src="http://gartonjones.mootexpress.com/img/horse.png" />
 </div>


</div>
</div>
<div class="medium-1 large-1 columns">
&nbsp;
</div>
    </div>
<?php 	endwhile;
				// Previous/next post navigation.


			else :
				// If no content, include the "No posts found" template.
				get_template_part( 'content', 'none' );

			endif;
		?>
<!--end content-->

<!--<div class="row text-center show-for-medium-up bottomlogo">
           <img src="http://gartonjones.mootexpress.com/img/HDLogoW.png" />
      </div>-->
<script>
 jQuery(document).ready(function(){
 jQuery('#functions').css('height', jQuery('#desc').height()+'px');
 });
  </script>



<?php
//get_sidebar( 'content' );
//get_sidebar();
get_footer();
