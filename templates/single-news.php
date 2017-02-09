<?
    global $counter;
?>
<div class="medium-1 large-1 columns">
&nbsp;
</div>
<div class="small-10 medium-10 large-10 columns bggold
">
<div class="row">
 <div class="small-12 medium-4 large-3 columns side2">
<!--  <h1><?php the_title(); ?></h1>-->
     <?php
        if ($counter == 1)
            gj_add_submenu(  'about' );
     ?>


</div>

  <div class="small-12 medium-8 large-6 columns" id="wording">
        <h1><?php the_title(); ?></h1>
        <h2>
         <?php
            the_field('subtitle');
         ?>
         </h2>
 <div class="row">
    <div class="small-12 medium-12 large-12 columns content1col">
     <?php the_content(); ?>
    </div>
 </div>

 </div>
  <div class="small-0 medium-0 large-3 columns wiref3 hide-for-medium-down">
     <?php the_post_thumbnail(); ?>

 </div>


</div>
</div>
<div class="medium-1 large-1 columns">
&nbsp;
</div>
