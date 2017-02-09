<?php
/**
 * The Template for displaying all single posts
 *
 * @package WordPress
 * @subpackage Twenty_Fourteen
 * @since Twenty Fourteen 1.0
 */

get_header();
?>
<!--<div id="bigben">
<div id="hourtick"></div>
<div id="mintick"></div>
</div>-->
 <div class="row fullWidth">
<div class="medium-1 large-1 columns">
&nbsp;
</div>
<div class="small-10 medium-10 large-10 columns bggold
 officespage" style="margin-top:8%;">
<div class="row">
 <div class="small-12 medium-4 large-3 columns" id="side">
  <h1>Offices</h1>

<?php
  $page_active = $_GET['o'];

  $wm = $ne = $ra = $cb = '';

  switch ($page_active) {
     case 'westminster':
      $wm = 'active';
       break;
     case 'nine-elms':
      $ne = 'active';
      break;
    case 'chelsea-bridge-wharf':
      $cb = 'active';
      break;
   }
?>

  <hr class="sidesep">
  <ul class="submenu">
    <li><a href="/offices/?o=westminster" class="wm2 <?php echo $wm; ?>">Westminster</a></li>
    <li><a href="/offices/?o=nine-elms" class="ne2 <?php echo $ne; ?>">Nine Elms - Southbank</a></li>
 <li><a href="/offices/?o=chelsea-bridge-wharf" class="cbw2 <?php echo $cb; ?>">Chelsea Bridge Wharf</a></li>
 </ul>

 </div>
  <div class="small-12 medium-8 large-6 columns" id="wording">
 <div class="row hide-for-touch">
 <div id="prev" class="offiprev"><a href="">Previous</a></div>
 <div id="next" class="offinext"><a href="">Next</a></div>
 </div>
   <div class="wmcontent hide">
 <h2>
 Westminster Office<br />

We are a well respected estate agent renowned for offering a large but versatile portfolio of luxury properties for both sale and to rent.
 </h2>
 <h3 class="lmore"><a href="#" class="">Learn more</a></h3>
 <div class="row">
 <div class="small-12 medium-12 large-12 columns">
 <a href="/team/" class="offlink"><span class="daplus">+</span> Meet the Team</a><br />
 <a href="/contact-us/" class="offlink"><span class="daplus">+</span> Contact us</a><br />
 <a href="/contact-us/?map=westminster" class="offlink"><span class="daplus">+</span> Directions to our office</a><br />
 <hr class="sidesep">
 <a href="/properties/" class="offlink y360p">
     <span class="daplus">+</span> Search for properties in Westminster
 </a>
 <br />
 <a href="/videos/" class="offlink y360p">
     <span class="play">
        <span class="ring target"></span> 
        <img src="<?php echo get_template_directory_uri() ?>/img/splay.png" class="mtm3">
     </span>
     View videos of our latest developments
 </a>
 <br />
 <a href="/videos/" class="offlink y360p">
     <span class="play target">
        <img src="/img/smallplay.png" class="mtm3">
     </span>
     View videos of our latest developments
 </a>
 <br/>
</div>

 </div>
 </div>


   <div class="necontent hide">
 <h2>
 Nine Elms Office<br />
As one of the leading London agents, we have extensive knowledge of the local area and with plenty of property for rent.
 </h2>
 <h3 class="lmore"><a href="#" class="">Learn more</a></h3>
<div class="row">
 <div class="small-12 medium-12 large-12 columns">
 <a href="/team/" class="offlink"><span class="daplus">+</span> Meet the Team</a><br />
 <a href="/contact-us/" class="offlink"><span class="daplus">+</span> Contact us</a><br />
 <a href="/contact-us/?map=nine-elms" class="offlink"><span class="daplus">+</span> Directions to our office</a><br />
 <hr class="sidesep">
 <a href="/properties/" class="offlink"><span class="daplus">+</span> Search for properties in Southbank</a><br />
 <a href="/videos/" class="offlink y360p">
     <span class="play">
        <span class="ring target"></span> 
        <img src="<?php echo get_template_directory_uri() ?>/img/splay.png" class="mtm3">
     </span>
     View videos of our latest developments
 </a>
</div>

 </div>
 </div>
   <div class="cbwcontent hide">
 <h2>
 Chelsea Bridge Wharf Office<br />
 As one of the leading London agents, we have extensive knowledge of the local area and with plenty of property for rent.
 </h2>
 <h3 class="lmore"><a href="#" class="">Learn more</a></h3>
<div class="row">
 <div class="small-12 medium-12 large-12 columns">
 <a href="/team/" class="offlink"><span class="daplus">+</span> Meet the Team</a><br />
 <a href="/contact-us/" class="offlink"><span class="daplus">+</span> Contact us</a><br />
 <a href="/contact-us/?map=chelsea-bridge" class="offlink"><span class="daplus">+</span> Directions to our office</a><br />
 <hr class="sidesep">
 <a href="/properties/" class="offlink"><span class="daplus">+</span> Search for properties in Chelsea</a><br />
 <a href="/videos/" class="offlink y360p">
     <span class="play">
        <span class="ring target"></span> 
        <img src="<?php echo get_template_directory_uri() ?>/img/splay.png" class="mtm3">
     </span>
     View videos of our latest developments
 </a>
</div>

 </div>
 </div>





 </div>
  <div class="small-0 medium-0 large-3 columns wiref2 hide-for-medium-down">
  <img src="/img/booth.png" />
  <p class="wmo hide">Westminster<br>
  <span class="daplus">+</span>44 (0) 20 7340 0480
  <br>
  <span class="mailskype">
  <a href="#"><img src="/img/mailb.png"></a>
  <a href="#"><img src="/img/skypeb.png"></a>
  </span>
  </p>
  <p class="neo hide">Nine Elms<br>
  <span class="daplus">+</span>44 (0) 20 7340 0480
  <br>
  <span class="mailskype">
  <a href="#"><img src="/img/mailb.png"></a>
  <a href="#"><img src="/img/skypeb.png"></a>
  </span>
  </p>
  <p class="cbo hide">Chelsea Bridge Wharf<br>
  <span class="daplus">+</span>44 (0) 20 7622 8800
  <br>
  <span class="mailskype">
  <a href="#"><img src="/img/mailb.png"></a>
  <a href="#"><img src="/img/skypeb.png"></a>
  </span>
  </p>
 </div>


</div>
</div>
<div class="medium-1 large-1 columns">
&nbsp;
</div>
    </div>

<?php
get_footer();
