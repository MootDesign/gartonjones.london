<div id="mapholder" class="row" style="min-height:75%;min-width:100%;">
    <div class="dot-contact">
      <div ></div>
    </div>


</div>

<script>

coords = { lat: <?php the_field( 'latitude' ) ?>, lon: <?php the_field( 'longitude' ) ?> };

jQuery(document).ready(function(){
 vmap( coords.lat, coords.lon );
});


jQuery(document).ready(function( $ ){
    $( '#footer-inner' ).addClass( 'expanded' );

     $('.offinfo').toggle('slow');

     $('.bottomlogo img').fadeToggle('slow');
     var actualheight = $('#unityPlayer embed').height();
     $('#unityPlayer embed').animate({'height':window.innerHeight-233})
});

jQuery(document).ready(function(){
 jQuery('#functions').css('height', jQuery('#desc').height()+'px');
});

</script>

<div style="clear:both;"></div>
