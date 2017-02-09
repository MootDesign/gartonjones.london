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
" style="margin-top: 7%">
<div class="row">
 <div class="small-12 medium-4 large-3 columns" id="side">
  <h1><?php the_title(); ?></h1>
    <hr class="sidesep">
 <ul class="submenu">
   <?php if (get_field('subitem_1')){ ?><li><a href="<?php the_field('subitem_1_link'); ?>"><?php the_field('subitem_1'); ?></a></li><?php } ?>
   <?php if (get_field('subitem_2')){ ?><li><a href="<?php the_field('subitem_2_link'); ?>"><?php the_field('subitem_2'); ?></a></li><?php } ?>
   <?php if (get_field('subitem_3')){ ?><li><a href="<?php the_field('subitem_3_link'); ?>"><?php the_field('subitem_3'); ?></a></li><?php } ?>
   <?php if (get_field('subitem_4')){ ?><li><a href="<?php the_field('subitem_4_link'); ?>"><?php the_field('subitem_4'); ?></a></li><?php } ?>
 </ul>

   <!--<ul class="subsubmenu">
   <li><a href="">Westminster</a></li>
   <li><a href="">Nine Elms - Southbank</a></li>
   <li><a href="">Royal Arsenal</a></li>
   <li><a href="">Chelsea Bridge Wharf</a></li>
 </ul>-->

 </div>
  <div class="small-12 medium-8 large-6 columns" id="wording">
<h2>
 <?php
 $subtitle = get_field('subtitle');
 if ($subtitle!=''){
  the_field('subtitle');
 } else {
 echo 'Forgot your password?';
 }
 ?>
 </h2>
 <div class="row">
 <div class="small-12 medium-12 large-12 columns content1col">
  <?php if($post->post_content=="") : ?>

<p></p>

<?php else : ?>

<?php the_content(); ?>

<?php endif; ?>
  <form method="post">
    <label for="email">Please enter your registered e-mail address</label>
    <input type="text" name="email" id="email" placeholder="you@youremail.com">

    <input type="submit" value="Reset Password" class="submitbtn">
  </form>
</div>
 </div>
 </div>
  <div class="small-0 medium-0 large-3 columns wiref hide-for-medium-down" style="padding-top:5.5em;">
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
