//Init
// $ = jQuery.noConflict(true);

jQuery(document).ready(function() {
  jQuery(document).foundation('reflow');

  if (jQuery('#myholder').length > 0) {
    $windowHeight = jQuery(window).height();

    var $top = $windowHeight / 2 - 400;
    if ($top < -100) { $top = 0; }
    // set coverflow height according to the window height
    jQuery('#myholder').css('margin-top', $top);

     if ($windowHeight < 600) {
         jQuery('.bottomlogo2 img').hide();
    }
  }
});

//Fade the scanline
jQuery(document).ready( function() {
  if( jQuery( 'body' ).hasClass( 'show-scanlines') ) {
    jQuery('#scanlines, #grad3').fadeIn('slow');
  }
});

var isiPad = navigator.userAgent.match(/iPad/i) != null;
 // Offices selector - showing contact info on office click
    jQuery('.wm').click(function(){
    jQuery('.neo, .rao, .cbo, .cbwcontent, .necontent, .racontent').fadeOut(200,function(){
      jQuery('.wmo, .wmcontent').delay(400).fadeIn('slow');

  });
   });
   jQuery('.ne').click(function(){
    jQuery('.wmo, .rao, .cbo, .cbwcontent, .racontent, .wmcontent').fadeOut(200,function(){
      jQuery('.neo, .necontent').delay(400).fadeIn('slow');
      });
   });
   jQuery('.ra').click(function(){
    jQuery('.neo, .wmo, .cbo, .cbwcontent, .necontent, .wmcontent').fadeOut(200,function(){
      jQuery('.rao, .racontent').delay(400).fadeIn('slow');
      });
   });
   jQuery('.cbw').click(function(){
    jQuery('.neo, .rao, .wmo, .racontent, .necontent, .wmcontent').fadeOut(200,function(){
      jQuery('.cbo, .cbwcontent').delay(400).fadeIn('slow');
      });
   });
// End offices selector


// Top menu open / close
    jQuery('#mtrigger').click(function(){
      jQuery('.slmenu').toggleClass( 'visible' ).toggle('fast', 'swing');

      if( jQuery('.slmenu').hasClass( 'visible' ) && ! jQuery('#menugrayout').is( ':visible' ) )
        jQuery('#menugrayout').fadeIn('fast');

      if( ! jQuery('.slmenu').hasClass( 'visible' ) && ! jQuery('#menugrayout').hasClass( 'no-close' ) ) {
          jQuery('#menugrayout').fadeOut('fast');
      }

      jQuery( 'nav .right .hideme' ).fadeToggle();

        jQuery('#changethis').toggleText('Menu', 'CLOSE');

    });

// Footer open / close

 jQuery('.clickarea').click(function(){
         jQuery('.offinfo').toggle('slow');

        /*
         * in contact-us page the footer is visible by default, so I don't have to show the
         * shadow on the first click
         */
         if( ! jQuery( '#footer-inner' ).hasClass( "expanded" ) ) {
            jQuery('#menugrayout').fadeToggle('slow');
         }

         jQuery('.bottomlogo img').fadeToggle('slow');
         var actualheight = jQuery('#unityPlayer embed').height();
         jQuery('#unityPlayer embed').animate({'height':window.innerHeight-233})

         jQuery( '#footer-inner' ).removeClass( "expanded" );
       });


// Equalizing border heights on property detail pages

    window.onload = function(event) {
      if( jQuery('#functions').height() < jQuery( '#dex' ).height() ) {
        jQuery('#functions').css('height', jQuery('#dex').height()+'px');
      }
    }

    window.onresize = function(event) {
      if( jQuery('#functions').height() < jQuery( '#dex' ).height() ) {
        jQuery('#functions').css('height', jQuery('#dex').height()+'px');
      }
    };

//close open content if scanlines are clicked
jQuery('#menugrayout').click(function() {
    //TODO: Add no-close class to avoid menugrayout close on click
    if( jQuery( this ).hasClass( 'no-close' ) ) return;

     if (jQuery('.slmenu').is(":visible")){
     jQuery('.slmenu').toggleClass( 'visible' ).toggle('slow');
     };
     if (jQuery('.offinfo').is(":visible")){
     jQuery('.offinfo').toggle('slow');
     };
     if (jQuery('#quickview').is(":visible")){
     jQuery('#quickview').fadeOut('slow');
     jQuery('#contentabout').fadeTo(500,1);
     };

    jQuery('#changethis').toggleText('Menu', 'CLOSE');

    if( jQuery( '.close-me' ).length > 0 )
        jQuery( '.close-me' ).trigger( 'click' );

    jQuery('#menugrayout').fadeOut();
 });

// Archive-videos

 function chelsea(e) {
    jQuery('.cbwcontent, .cbo').fadeIn();
    jQuery("#prev a").attr("href", "/offices/?o=royal-arsenal");
    jQuery("#next a").attr("href", "/offices/?o=westminster");
}

function royal(e) {
    jQuery('.racontent, .rao').fadeIn();
    jQuery("#prev a").attr("href", "/offices/?o=nine-elms");
    jQuery("#next a").attr("href", "/offices/?o=chelsea-bridge-wharf");
}
 function nineelms(e) {
    jQuery('.necontent, .neo').fadeIn();
    jQuery("#prev a").attr("href", "/offices/?o=westminster");
    jQuery("#next a").attr("href", "/offices/?o=royal-arsenal");
}
 function westminster(e) {
    jQuery('.wmcontent, .wmo').fadeIn();
    jQuery("#next a").attr("href", "/offices/?o=nine-elms");
    jQuery("#prev a").attr("href", "/offices/?o=chelsea-bridge-wharf");
}

jQuery('#dotcontainers7, #dotcontainers8, #dotcontainers9, #dotcontainers10').click(function(){
  jQuery('.teammember').fadeOut(function(){
    jQuery('.teammember').fadeIn();
  });
});
 jQuery('.closeit').click(function(){
  jQuery('#quickview').fadeOut(function(){
  jQuery('#menugrayout').fadeOut();
    //jQuery('#quickview').css('opacity','0');
    jQuery('#quickview').css('z-index','-1');
    jQuery('#contentabout').fadeTo(500,1);
 });
});
  jQuery('.lv').click(function(){
    $g = jQuery( '#gallery' ).show().fadeOut(0).addClass( 'small' );
    $g.css( { 'margin-left': - $g.width() / 2, 'margin-top': - $g.height() / 2 } );

    jQuery( '#menugrayout' ).fadeIn( 'fast' ).addClass( 'no-close' );

        // if( window.outerWidth > 800 && ! isiPad ) {
        //     showUsingCoolAnimation( '#gallery' );
        // } else {
            parallaxAnimate( '#gallery' );
        // }
 });



  jQuery('#dotcontainer, #dotcontainer2, #dotcontainer3, #dotcontainer4, #dotcontainer5, .vtrig, .gjplay').click(function(){

    jQuery('#quickview, #menugrayover').fadeIn();

    jQuery('#menugrayout').fadeIn();

    //jQuery('#quickview').css('opacity','1');

    jQuery('#quickview').css('z-index','13');

    jQuery('#contentabout').fadeTo(500,0.2);

 });





 jQuery('#wording').hover(function(){

    if (jQuery('#dotcontainer').is(":visible")){

      //jQuery('#wording').css('background','url(/img/whitemap.png) no-repeat center center');

    }

 });



  jQuery('#wording').mouseleave(function(){

    if (jQuery('#dotcontainer').is(":visible")){

      //jQuery('#wording').css('background','url(/img/brownmap.png) no-repeat center center');

    }

  });





function galleryappend(){



    var swiper = new Swiper('.swiper-container', {

    slidesPerView: 1,

    loop:true,

    shadow: false,

    //3D Flow:

    tdFlow: {

        rotate : 30,

        stretch :10,

        depth: 100,

        modifier : 1,

        shadows : false

    }

})

  jQuery('#lh2').on('click', function(e){

    e.preventDefault()

    swiper.swipePrev()

  })

  jQuery('#rh2').on('click', function(e){

    e.preventDefault()

    swiper.swipeNext()

  })





}



function vmap(lat,lon) {
	//point = new google.maps.LatLng(51.52098748772112, -0.14747858047485352);
	point = new google.maps.LatLng(lat, lon);

	map = new google.maps.Map(document.getElementById("mapholder"), {
		center: new google.maps.LatLng(0, 0),
		zoom: 16,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		panControlOptions: {
			position: google.maps.ControlPosition.RIGHT_TOP
		},
		mapTypeControl: true,
		mapTypeControlOptions: {
			style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
			position: google.maps.ControlPosition.RIGHT_BOTTOM
		},
		zoomControlOptions: {
			style: google.maps.ZoomControlStyle.SMALL,
			position: google.maps.ControlPosition.RIGHT_TOP
		},
		streetViewControl: false
	});

	var bni_style = [
		{
			featureType: "road.arterial",
			stylers: [
				{ hue: "#a99959" },
				{ visibility: "on" },
				{ saturation: 0 }
			]
		},
		{
			featureType: "landscape.man_made",
			stylers: [
				{ visibility: "on" },
				{ hue: "#342F1F" },
				{ saturation: 40 }
			]
		},
		{
			stylers: [
				{ visibility: "on" },
				{ hue: "#a99959" },
				{ saturation: -65 },
				{ lightness: -7 }
			]
		}
	];

	var image = new google.maps.MarkerImage ('/img/gjmaps.png');

	var marker = new google.maps.Marker({
		position: point,
		map: map,
		animation: google.maps.Animation.DROP,
		icon: image
	});

	map.setCenter(point);
	map.setOptions({styles: bni_style});

	google.maps.event.addListenerOnce(map, 'idle', function(){
	    var map_gradient = document.createElement('div');
		map_gradient.setAttribute('id', 'map-gradient');
		jQuery('#heading div').first().append(map_gradient);
		jQuery('.gmnoprint').css('z-index','92');
	});
}



function vsv(lat,lon) {

  var fenway = new google.maps.LatLng(lat, lon);



  // Note: constructed panorama objects have visible: true

  // set by default.

  var panoOptions = {

    position: fenway,

    addressControlOptions: {

      position: google.maps.ControlPosition.BOTTOM_CENTER

    },

    pov: {

    heading: 1, // php if (get_field('svhd')){ the_field('svhd'); } else { echo 1; } ,

    pitch: 1

  },

    linksControl: false,

    panControl: false,

    zoomControlOptions: {

      style: google.maps.ZoomControlStyle.SMALL

    },

    enableCloseButton: false

  };





  var panorama = new google.maps.StreetViewPanorama(

      document.getElementById('mapholder'), panoOptions);

}

// ! Archive videos



 jQuery('.ca2').click(function(){

 jQuery('.offinfo2').fadeOut(100);

jQuery('.offinfo2', this).delay(150).fadeIn(300);





 });



jQuery.fn.extend({
    toggleText: function (a, b){
        var isClicked = false;
        var that = this;

        setTimeout( function( that ) {
            if ( ! jQuery( '.slmenu' ).hasClass( 'visible' ) ) {
                that.text(a);
            } else {
                that.text(b);
            }
        }, 100, this );
    }
});



jQuery('#changethis').toggleText('Menu', 'CLOSE');



 jQuery(document).ready(function(){

 jQuery('#functions').css('height', jQuery('#desc').height()+'px');

 //jQuery('#heading').css('height', jQuery(window).width()/2.1+'px');

  //jQuery('#details').css('margin-top', jQuery('#heading').height()+55+'px');

 });

 jQuery(window).resize(function(){

  //jQuery('#heading').css('height', jQuery(window).width()/2.1+'px');

  //jQuery('#details').css('margin-top', jQuery('#heading').height()+55+'px');

 });

 jQuery(".proop").hover(

    function(){

        /*jQuery(this).animate({paddingTop: "40px", paddingBottom: "40px"},500);*/

        jQuery('.functions', this).fadeIn(300);

    },

    function(){

        /*jQuery(this).animate({paddingTop: "80px", paddingBottom: "0px"},500);*/

        jQuery('.functions', this).fadeOut(300);

    });





 jQuery(document).ready(function(){

 jQuery('.closeit').click(function(){

 jQuery('#quickview').fadeOut();

 jQuery('#container2, #lh2, #rh2').fadeTo(500,1);

 jQuery('#menugrayout').fadeOut();

// jQuery('#menugrayout').css('z-index','11');

 });





 });







































      jQuery('#lh2').on('click', function(e){

    e.preventDefault()

    swiper.swipePrev()

  })

  jQuery('#rh2').on('click', function(e){

    e.preventDefault()

    swiper.swipeNext()

  })





  jQuery( document ).ready( function( $ ) {

      if( ! isiPad ) return;



      jQuery( '#menu > div' ).click( function() {

          if( jQuery( this ).hasClass( 'active' ) ) return;



          jQuery( '.zoomTarget2.active' ).trigger( 'click' );

      });



      jQuery( '.zoomTarget2' ).click( function() {

          var pos = jQuery( this ).offset();



          if( jQuery( '.zoomTarget2.active' ).length > 1 ) {

              jQuery( '.zoomTarget2.active' ).not( this ).trigger( 'click' );

          }



          $this = jQuery( this );

          if( $this.hasClass( 'zoomed' ) ) {

              $this.animate( { scale: 1, top: -2, left: $this.data( 'div-left' ) }, 'fast', function() {

                  jQuery( this ).removeClass( 'active' );

              });



              jQuery( '#menugrayout-menu' ).stop( true, true ).fadeOut();

          } else {

              if( $this.data( 'div-left' ) == undefined ) {

                  $this.data( 'div-left', 0 );

              }



              var t = ( pos.top < 70 ) ? 70 : 0;

              var l = ( pos.left < 100 ) ? 105 : 0;



              $this.animate( { scale: 2, top: t, left: l }, 'fast', function() {

                  jQuery( this ).addClass( 'active' );

              });



              jQuery( '#menugrayout-menu' ).stop( true, true ).fadeIn();

          }

//

          jQuery( this ).toggleClass( 'zoomed' );

//          jQuery( this ).parents( '#menu' ).toggleClass( 'zoomed' );

          jQuery( 'nav.top-bar' ).toggleClass( 'zoomed' );

      });

  });





//For iPad i need more padding in some pages

jQuery( document ).ready( function( $ ) {

    jQuery( 'body > .fullWidth' ).last().addClass( 'last' );



    jQuery( '.ipad #mapholder' ).click( function() {

        jQuery( '.dot-contact' ).fadeOut();

        jQuery( '#video1' ).show();



        document.getElementById('video1').play();

    });



});



// Single developments scrolling

jQuery( document ).ready( function() {

    // set the parent height first

    var height = jQuery( '.currentPage' ).outerHeight();

    jQuery( '.parent' ).outerHeight( height );



    // after the page has been loaded, set transitions back

     // set the transition for parent

     jQuery( '.parent' ).css( {

        '-webkit-transition': 'all 0.8s ease 0s',

        '-moz-transition': 'all 0.8s ease 0s',

        '-ms-transition': 'all 0.8s ease 0s',

        'transition': 'all 0.8s ease 0s'

     });







    scrollToPage( '.page-1', '#page-1' );

    scrollToPage( '.page-2', '#page-2' );

    scrollToPage( '.page-3', '#page-3' );

    scrollToPage( '.page-4', '#page-4' );

    scrollToPage( '.page-5', '#page-5' );

});



function scrollToPage( $link_class, $page_id ) {

    if ( jQuery( $link_class ).length > 0 && jQuery( $page_id ).length > 0 ) {

         jQuery( $link_class ).click( function() {

           // scroll

            var height = jQuery( $page_id ).height(); // get the height of children

            var position = jQuery( $page_id ).position(); // get the position of children regarding to other parent



            jQuery( '.other-parent' ).animate( { 'top': -position.top }, 'slow' ); // set the top value of other-parent

            jQuery( '.parent' ).animate( {'height': height }, 'slow' ); // set the parent height to children height

             // will need to extend, to highlight the image clicked



            jQuery( '.currentPage' ).removeClass( 'currentPage' );  // remove previously added currentPage selector

            jQuery( $page_id ).addClass( 'currentPage' ); // add for current page a selector



            jQuery( '.dev-submenu .page-1, .dev-submenu .page-2, .dev-submenu .page-3, .dev-submenu .page-4'  ).removeClass( 'active' );

            jQuery( $link_class ).addClass( 'active' );

        });

    }

}



jQuery( document ).ready( function() {
//     set the height of the gallery
    var height = jQuery( '.gallery img:first-child' ).height();
    var $gallery = jQuery( '.gallery' );
    var $next_link = jQuery( '#next' );
    var $prev_link = jQuery( '#prev' );

    $gallery.height(height);
    var $img_height = jQuery( '.gallery img' ).height();
    $img_height = -($img_height / 2);
    jQuery( '.gallery img' ).css( 'margin-top', $img_height );

    // when clicking next, bring the next img

    function slides() {
        return jQuery( '.gallery' ).find( 'img' );
    }

    var $total_img = slides().length;
    var $prev_img = 0;
    var $next_img = 1;

    slides().fadeOut();

    // set active classes
    slides().first().addClass( 'active' );
    slides().first().fadeIn();

    // if next link is clicked
    $next_link.click( function() {
        slides().eq( $prev_img ).fadeOut();
        slides().eq( $next_img ).fadeIn();

        if ( $next_img == $total_img -1) {
            $prev_img = $total_img -1;
            $next_img = 0;
        } else {
            $prev_img = $next_img;
            $next_img++;
        }
    });

    // if prev link is clicked
     $prev_link.click( function() {
         if ( $prev_img == 0 ) {
            $next_img = 0;
            $prev_img = $total_img-1;
        } else {
            $next_img = $prev_img;
            $prev_img--;
        }
        slides().eq( $next_img ).fadeOut();
        slides().eq( $prev_img ).fadeIn();
    });
});


jQuery( document ).ready( function() {
  if( jQuery( 'body' ).hasClass( 'page-id-15672' ) ) {

    var centerRow = function() {
        $row = jQuery( '.row-home' );

        $row.css( 'margin-top', - $row.height() / 2 );

        $row.css( 'margin-left', - $row.width() / 2 );
    };

    jQuery(window).resize( function() {
      centerRow();
    });

    centerRow();

  }
});









function resizeDevelopments() {

    // set the top position for pages

        var height = jQuery( '.currentPage' ).height(); // get the height of children

        var position = jQuery( '.currentPage' ).aPosition(); // get the position of children regarding to other parent

        jQuery( '.other-parent' ).css( { 'top': -position.top }); // set the top value of other-parent
        jQuery( '.parent' ).css( {'height': height }); // set the parent height to children height


    var $img_height = jQuery( '.gallery img' ).height();

    $img_height = -($img_height / 2);

    jQuery( '.gallery img' ).css( 'margin-top', $img_height );



    // and trigger active link class

    var mytimer;

    clearTimeout( mytimer );

    mytimer = setTimeout( function() {

        jQuery( '.dev-submenu .active' ).trigger( 'click' );

    }, 500);



}



jQuery.fn.aPosition = function() {
    if( this.offset() == undefined ) return;

    thisLeft = this.offset().left;
    thisTop = this.offset().top;
    thisParent = this.parent();

    parentLeft = thisParent.offset().left;
    parentTop = thisParent.offset().top;

    return {
        left: thisLeft-parentLeft,
        top: thisTop-parentTop
    };
};



(function($,sr){



  // debouncing function from John Hann

  // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/

  var debounce = function (func, threshold, execAsap) {

      var timeout;



      return function debounced () {

          var obj = this, args = arguments;

          function delayed () {

              if (!execAsap)

                  func.apply(obj, args);

              timeout = null;

          };



          if (timeout)

              clearTimeout(timeout);

          else if (execAsap)

              func.apply(obj, args);



          timeout = setTimeout(delayed, threshold || 300);

      };

  }

  // smartresize

  // jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };



})(jQuery,'smartresize');



// usage:

// jQuery(window).smartresize(function(){

//   // code that takes it easy...

// //    resizeDevelopments();

// });


jQuery(document).ready(function(){

  // settings
  var $slider = jQuery('#mag-slider'); // class or id of carousel slider
  var $slide = 'div'; // could also use 'img' if you're not using a ul
  var $transition_time = 1000; // 1 second
  var $time_between_slides = 4000; // 4 seconds

  function slides(){
    return $slider.find($slide);
  }

  slides().fadeOut();

  // set active classes
  slides().first().addClass('active');
  slides().first().fadeIn($transition_time);

  // auto scroll
  $interval = setInterval(
      function(){
        var $i = $slider.find($slide + '.active').index();

        slides().eq($i).removeClass('active');
        slides().eq($i).fadeOut($transition_time);

        if (slides().length == $i + 1) $i = -1; // loop to start

        slides().eq($i + 1).fadeIn($transition_time);
        slides().eq($i + 1).addClass('active');
      }
      , $transition_time +  $time_between_slides
  );
});

jQuery( document ).ready( function() {
    jQuery( '.clickme' ).click( function() {
        jQuery( '.clickme' ).removeClass( 'active' );
        jQuery( this ).addClass( 'active' );

        jQuery( 'input[name="search"]' ).val( jQuery( this ).attr( 'data-value' ) );

        return false;
    });

    jQuery( '.has-submenu' ).click( function() {
       $this = jQuery( this );
       jQuery('.optionsholder').fadeOut();

       $holder = jQuery( $this.attr( 'data-submenu' ) );
       if( $holder.is( ':visible' ) ) {
       } else {
            $holder.fadeIn();
            var pos = $holder.closest( '.columns' ).position();

            $holder.css( 'top', - $holder.height() / 2 + $this.position().top );
            $holder.css( 'margin-left', - $holder.outerWidth() / 2 );
       }
    });


    jQuery( 'ul.subsubmenu.optionsholder li' ).click( function() {
        jQuery('.optionsholder').fadeOut();
    });
});



var offset;
jQuery( document ).ready( function() {
    jQuery( '#scroll .scrollable' ).on( 'mousedown touchstart', function( e ) {
        jQuery( this ).data( 'mousedown', 1 );

          offset = {
            x: ( e.clientX || e.originalEvent.changedTouches[0].pageX ) - jQuery( this ).position().left,
            y: ( e.clientY || e.originalEvent.changedTouches[0].pageY ) - jQuery( this ).position().top
          };

//        e.preventDefault();
    })
    .on( 'mousemove touchmove', function( e ) {
        $this = jQuery( this );
        if( $this.data( 'mousedown' ) != 1 ) return;

        smoothAnim( $this, e, 0 );

        e.preventDefault();
    })
    .on( 'mouseup', function( e ) {
        $this.stop( true, true );

        smoothAnim( $this, e, 'slow' );

        jQuery( this ).data( 'mousedown', 0 );

        e.preventDefault();
    });
});

function smoothAnim( $this, e, speed ) {
    var l = ( e.clientX || e.originalEvent.changedTouches[0].pageX ) - offset.x;
    var t = ( e.clientY || e.originalEvent.changedTouches[0].pageY ) - offset.y;

    if( l > 0 ) l = 0;
    if( t > 0 ) t = 0;

    var diffX = $this.parent().outerWidth() - $this.outerWidth();
    var diffY = $this.parent().outerHeight() - $this.outerHeight();

    //Image width limit reached?
    if( diffX < 0 && l <= diffX )
        l = diffX;

    if( diffX > 0 ) l = 0;

    //Image height limit reached?
    if( diffY < 0 && t <= diffY )
        t = diffY;

    if( diffY > 0 ) t = 0;

    $this.stop( true, false ).animate( { left: l, top: t }, 400 );

    mousepos = e;
}

//Left subitems menu
jQuery( document ).ready( function() {
    jQuery( '.submenu li.subitems' ).each( function() {
        $li = jQuery( this ).prev();

        $li.click( function() {
            //Close all the active menus
            jQuery( '.submenu > li.show' ).not( this ).each( function() {
                toggleSubmenu( jQuery( this ) );
            });

            toggleSubmenu( jQuery( this ) );

            return false;
        });
    });

    //There is some active subitems?
    $active = jQuery( '.submenu li.subitems a.active' );

    if( $active.length > 0 ) {
        toggleSubmenu( $active.parents( 'li.subitems' ).prev() );
    }

    //The active main menu has subitems?
    $active = jQuery( '.submenu > li a.active' );
    if( $active.length > 0 ) {
        if( $active.parents( 'li' ).next().hasClass( 'subitems' ) ) toggleSubmenu( $active.parents( 'li' ) );
    }
});

function toggleSubmenu( $this ) {
    $next = $this.next();

    $this.toggleClass( 'show' );

    var h = ( $this.hasClass( 'show' ) ) ? ( $next.find( 'ul' ).outerHeight() + 20 ): 0;
    $next.animate( { height: h }, 'slow' );
}

//Animate wording content
jQuery( document ).ready( function() {
    setTimeout( animateWording, 800 );
});

function animateWording( noAnim ) {
  if( noAnim == undefined && jQuery( '#dog-animation' ).length > 0 ) {
    var $dog = jQuery( '#dog-animation' );

    var mtop = document.documentElement.clientHeight - ( $dog.height() + 120 );
    // $dog.css( { marginTop: mtop / 2 } );

    $dog.addClass( 'animate' ).fadeIn();

    setTimeout( animateDogWalk, 200 );
  } else {
    jQuery( '.fade-me-in > *' ).each( function( index ) {
        setTimeout( function( $div ) {
            $div.css( { top: 0, opacity: 1 }, 'slow', 'easeOutCubic' );
        }, 50 * index, jQuery( this ) );
    });
  }
}

function animateDogWalk() {
  var v = document.getElementsByTagName("video")[0];
  v.play();

  v.addEventListener("ended",function() {
    // $( this ).get().stop();

    setTimeout( function() {
      jQuery( '#dog-animation' ).fadeOut( 'slow' );

      jQuery( '#row-bg' ).addClass( 'bggold' );
      animateWording( true );
    }, 1000);
  },false);
}

// animate equalizer
function rightNow() {
  if (window['performance'] && window['performance']['now']) {
    return window['performance']['now']();
  } else {
    return +(new Date());
  }
}

// footer quick links
jQuery( '.c-panel-link a' ).click( function() {
//	jQuery( '.c-panel' ).slideToggle();
	if ( jQuery( '.c-panel' ).is(':visible') ) {
			jQuery( '.c-panel' ).slideUp();
      jQuery( '.css-big-plus' ).removeClass( 'close' );
  } else {
      jQuery( '.c-panel' ).slideDown();
      jQuery( '.css-big-plus' ).addClass( 'close' );
	}

	jQuery( '.c-panel' ).promise().done( function() {
		if ( jQuery( '.c-panel' ).is(':visible') && jQuery(window).width() > 767 ) {
			jQuery( '.clickarea' ).css( 'pointer-events', 'none' );
		} else {
			jQuery( '.clickarea' ).css( 'pointer-events', '' );
		}
	});


});

// close c-panel if it is clicked off from the footer. Better user-experience
jQuery(document).ready(function() {
   jQuery('body').click(function( event ) {
//	   if ( jQuery('#menugrayout').is(':visible') ) {
//
//			return;
//	   }
        var clickedOnMenu = ( jQuery(event.target).parents('#foot').length );
		if ( clickedOnMenu == 0 && jQuery( '.c-panel' ).is(':visible') ) {
			jQuery('.c-panel-link a').trigger('click');
//			jQuery('.c-panel').slideToggle();
		}
   });
});


// form accordian for quick links
jQuery(document).ready( function() {
	jQuery('#toggle-form').click( function() {
		jQuery('#field_11_5, #field_11_6, #field_11_10, #field_11_8').slideToggle();
	});
});

var SimpleLazy = {
    $_items: null,

    init: function() {
        this.$_items = jQuery( '.quick-links-content #wording > .row' ).children();

        setTimeout( function() {
            SimpleLazy.onScroll();
        }, 500 );

        this.isFF = navigator.sayswho.toLowerCase().indexOf( 'firefox' ) >= 0;

        jQuery( document ).scroll( this.onScroll );
    },

    onScroll: function( e ) {
//        jQuery( '.quick-links-content #wording' ).css( { top: - jQuery( document ).scrollTop() } );
        jQuery( '.quick-links-content #wording' ).stop(true, false).transit( { y: - jQuery( document ).scrollTop() }, 0 );

        /*
         * There is some issue with ff, probably due a some shit css rules, and so it ignore "fixed" position.
         * This hack just move all the body in according to scroll position
         */
        if( SimpleLazy.isFF ) {
            jQuery( '.page-template-templatesquicklinks-php' ).css( { marginTop: jQuery( document ).scrollTop() } );
        }

        setTimeout( function() {
            var j = 0;

            SimpleLazy.$_items.each( function( i ) {
                    var visible = SimpleLazy.isVisible( jQuery( this ) );
            });
        }, 100 );
    },

    /*
     * In according to current page scroll value, check if the item is visible
     */
    isVisible: function( $item ) {
        //Page scroll value
        var scroll = jQuery( document ).scrollTop();
        var height = window.outerHeight;
        var top = $item.position().top + 85;
        var windowScroll = ( height + scroll - 200 );


        var visible = top <= windowScroll;

        if( visible && ! $item.hasClass( 'visible' ) ) {
            $item.removeClass( 'hide-to-top' ).addClass( 'visible show-from-bottom' );

        }

        //The div is no longer visible ( is above of displayed content )
        scroll += 85;
        var isAbove = top <= scroll;

        if( isAbove ) {
            var opacity = ( scroll - top ) / scroll;

            $item.css( { opacity: 0.6 - Math.abs( opacity ) } );
        } else {
            if( $item.hasClass( 'visible' ) )
                $item.css( 'opacity', '' );
        }

        scroll -= 100;
        isAbove = top <= scroll;

        if( isAbove && ! $item.hasClass( 'hide-to-top' ) ) {
            $item.addClass( 'hide-to-top' ).removeClass( 'visible' );
        }

        top += 50;
        if( top > windowScroll ) {
            $item.removeClass( 'visible' ).removeClass( 'show-from-bottom' ).removeClass( 'hide-to-top' );
        }

        return visible;
    }
}

jQuery( document ).ready( function() {
    var $ql = jQuery( ".quick-links-content" );

    $ql.find( '.property-image' ).each( function() {
        jQuery( this ).attr( 'src', jQuery( this ).data( 'src' ) );
    });

    if( ! jQuery( 'html' ).hasClass( 'touch' ) ) {
        SimpleLazy.init();
        var width = $ql.width();

        $ql.css( { marginLeft: - width / 2, left: '50%' } );

        setTimeout( function() {
            $ql.animate( { top: -30, opacity: 1 }, 'slow', function() {
                jQuery( '.more-options li.subitems' ).css( { height: 'auto' } );

                jQuery( '.div-empty, .scroll-me > .row' ).height( $ql.outerHeight() + jQuery( '.more-options' ).outerHeight() );
                jQuery( '.more-options li.subitems' ).css( { height: 0 } );
            });
        }, 500 );

    } else {
        $ql.show();

        //In portrait mode check if the "Contact Us now" div fix in the page
        jQuery( document ).resize( function() {
            setTimeout( function() {
                var $cus = jQuery( '.page-template-templatesquicklinks-php .wiref3' );

                //Remove the height attribute in landscape
                if( document.body.clientWidth > document.body.clientHeight ) {
                    var $cus = jQuery( '.page-template-templatesquicklinks-php .wiref3' );

                    $cus.css( 'height', '' );
                } else {
                    if( $cus.position().top + $cus.outerHeight() > document.body.clientHeight ) {
                        $cus.height( document.body.clientHeight - $cus.position().top - 50 );
                    }
                }

            }, 500 );
        });
    }
});

navigator.sayswho= (function(){
    var ua= navigator.userAgent, tem,
    M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if(/trident/i.test(M[1])){
        tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE '+(tem[1] || '');
    }
    if(M[1]=== 'Chrome'){
        tem= ua.match(/\bOPR\/(\d+)/)
        if(tem!= null) return 'Opera '+tem[1];
    }
    M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
    if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
    return M.join(' ');
})();

jQuery( document ).ready( function() {
    if( jQuery( 'body.single-post, body.single-2d' ).length > 0 ) {
        jQuery( document ).scroll( function() {
            jQuery( '#heading' ).css( { top: - jQuery( document ).scrollTop() / 8 } );
        });
    }
});

/* Landing page */
jQuery( document ).ready( function() {
  //Image aspect ratio
  $img = jQuery( '.single-2d #heading > .wp-post-image' );
  var ratio = $img.width() / $img.height();

  // jQuery( '.single-2d #heading > img' ).css( { minHeight: document.documentElement.clientHeight - 100 } );
  $img.addClass( 'visible' );
  // $img.parent().width( $img.height() * ratio );

  jQuery( '.single-2d #about' ).height( jQuery( '.single-2d #about > .row' ).first().outerHeight() );
  jQuery( '.single-2d #about > .row' ).first().addClass( 'animate-from-bottom active' );

  //Let menu items
  jQuery( '.single-2d .leftmenu a' ).click( function() {
    jQuery( '.single-2d .leftmenu li' ).removeClass( 'active' );
    var id = jQuery( this ).parent().addClass( 'active' ).data( 'id' );

    jQuery( '.single-2d #about > .row.active' ).addClass( 'animate-to-top' ).removeClass( 'active animate-from-bottom' );
    var div = jQuery( '.single-2d #about > .row' ).get( id );

    jQuery( div ).show().removeClass( 'animate-from-bottom animate-to-top' ).addClass( 'active animate-from-bottom' );

    //Adjust the height of the #about div
    var $details = jQuery( '#details' );
    var $about = jQuery( '.single-2d #about' );
    var h = jQuery( '.single-2d #about > .row.active' ).outerHeight();

    $about.animate( { height: h + 50 } );

    $details.height( getMaxHeight( '.single-2d #details > .row > .columns' ) );
    return false;
  });

  if( jQuery( '.single-2d').length > 0 ) {
    initDevelopmentContent();

    var navHeight = jQuery( 'nav' ).height() + jQuery( '.overlayed-bar' ).height();
    jQuery( '.empty' ).height( jQuery( '#details' ).outerHeight() + jQuery( '#details' ).offset().top + 100 );

    jQuery( '#details' ).data( 'otop', jQuery( '#details' ).offset().top );
    jQuery( document ).scroll( function() {
      var scroll = jQuery( document ).scrollTop();
      var tscroll = scroll + navHeight;

      var $details = jQuery( '#details' );
      var height = jQuery( document ).outerHeight();

      if( $details.hasClass( 'grayscale' ) ) return;

      if( tscroll >= $details.data( 'otop' ) ) {
        //Set the position as fixed
        $details.css( { position: 'fixed', top: navHeight, marginTop: 0 } );

        if( ! $details.hasClass( 'locked' ) ) {
          $details.data( 'mtop', scroll ).addClass( 'locked' );
        }
      } else {
        $details.css( { position: 'absolute', top: 0, marginTop: jQuery( '#details' ).offset().top } ).removeClass( 'locked' );

        $details.find( '> .row > .columns' ).css( { top: 0 } );
      }

      //Start to scroll the content of the "about div"
      $details.find( '> .row > .columns' ).each( function() {
        $dex = jQuery( this );
        var offset = $dex.height() + $dex.position().top;

        if( $dex.height() - scroll > 0 &&
            $details.hasClass( 'locked' ) ) {

          console.log( scroll, $details.offset().top );
          $dex.css( { top: $details.data( 'mtop' ) - scroll } );
        }
      });
    });
  }

  jQuery( '#heading .x-close' ).click( function() {
    if( jQuery( this ).parent().hasClass( 'active' ) ) {
      compressHeading();

      jQuery( this ).parent().transit( { scale: 0, opacity: 0 }, 'fast', function() {
        jQuery( '#heading .parallax.active' ).removeClass( 'active' );
      });
    } else {
      showDevelopmentGallery();
    }
  });

  //Close search apartments
  jQuery( '*[data-toggle]' ).click( function () {
    $dest = jQuery( jQuery( this ).data( 'toggle' ) );

    jQuery( this ).toggleClass( 'close' );
    $dest.toggleClass( 'close' );

    if( $dest.hasClass( 'close' ) ) {
      $dest.slideUp();
    } else {
      $dest.slideDown();
    }

    setTimeout( function() {
      jQuery( '.empty' ).height( jQuery( '#details' ).outerHeight() + jQuery( '#details' ).offset().top );
    }, 600);
  });

    //Change status in the link
  jQuery( '.search-for .linx' ).click( function() {
    var status = jQuery( this ).data( 'status' );

    jQuery( '.search-for .linx' ).removeClass( 'active' );
    jQuery( this ).addClass( 'active' );

    jQuery( '.search-for a.beds' ).each( function() {
        var href = jQuery( this ).attr( 'href' );
        var re = /status.*$/;

        href = href.replace( re, "status=" + status );
        jQuery( this ).attr( 'href', href );
    });
  });

});

function expandHeading() {
  var $heading = jQuery( '#heading' );
  var $details = jQuery( '#details' );
  var h = document.documentElement.clientHeight;

  $heading.addClass( 'fullscreen' ).animate( { height: h } );
  $details.addClass( 'grayscale' ).animate( { marginTop: h - 140 } );

  $details = jQuery( '#details' );
  if( $details.data( 'mtop' ) == undefined ) {
    $details.data( 'mtop', $details.css( 'margin-top' ) );
  }

  jQuery( '.single-2d #heading > .wp-post-image' ).animate( { opacity: 0 } );
  jQuery( '.single-2d #heading > .bimg' ).animate( { opacity: 0.4 }, 'slow' );
}

function compressHeading() {
  var $heading = jQuery( '#heading' );
  var $details = jQuery( '#details' );

  $heading.animate( { height: 500 }, 'slow', function() {
    jQuery( this ).removeClass( 'fullscreen' )
  } );

  $details = jQuery( '#details' );
  $details.removeClass( 'grayscale' ).animate( { marginTop: $details.data( 'mtop' ) } );
  jQuery( '.single-2d #heading > .wp-post-image' ).animate( { opacity: 1 } );
  jQuery( '.single-2d #heading > .bimg' ).animate( { opacity: 0 }, 'slow' );
}

function showDevelopmentGallery() {
  var $heading = jQuery( '#heading' );

  if( ! $heading.hasClass( 'fullscreen' ) ) {
    jQuery( '.linx' ).removeClass( 'close' );
    jQuery( '.linx-gallery' ).addClass( 'close' );

    expandHeading();

    //Show gallery
    $gallery = jQuery( '#heading #gallery' );

    var w = - $gallery.width() / 2;
    w -= ( $heading.width() - document.documentElement.clientWidth ) / 2;

    $gallery.show().css( { marginLeft: w, opacity: 1 } );

    setTimeout( function() {
      $gallery = jQuery( '#heading #gallery' );

      $gallery.find( 'p' ).each( function( i ) {
        jQuery( this ).delay( i * 50 ).transit( { scale: 1, opacity: 1 }, 'fast', 'easeOutBack' );
      });
    }, 200 );
  } else {
      jQuery( '.linx-about' ).addClass( 'close' );
      jQuery( '.linx-gallery' ).removeClass( 'close' );
      $gallery.find( 'p' ).each( function( i ) {
        jQuery( this ).delay( i * 50 ).transit( { scale: 0, opacity: 0 }, 'fast', 'easeInBack' );
      });

      //Hide the gallery
      setTimeout( function() {
        $gallery.show().css( { opacity: 0 } );

        compressHeading();
      }, 200 );
  }
}

function showDevelopmentContent( div ) {
  expandHeading();

  jQuery( div ).addClass( 'active' ).show().transit( { scale: 1, opacity: 1 }, 'fast' );
}

//Swiper
jQuery( document ).ready( function( $ ) {
  if( $( 'body' ).hasClass( 'single-post' ) ) {
    swiper = new Swiper('.swiper-container', {
      slidesPerView: 1,
      loop:true,
      shadow: false,
      //3D Flow:
      tdFlow: {
          rotate : 30,
          stretch :10,
          depth: 100,
          modifier : 1,
          shadows : false
      }
    });
    $('#lh2').on('click', function(e){
      e.preventDefault()
      swiper.swipePrev()
    })
    $('#rh2').on('click', function(e){
      e.preventDefault()
      swiper.swipeNext()
    })

  }
});

//Coverflow List/Coverflow switch
/**
 * The html code printed by the coverflow plug-in is really shit. No classes assigned to created div -.-"
 * The original data is destroyed by the plug-in itself.
 */
var switchCoverflowToList = function() {
      var $fluid = jQuery( '#myDiv-fluidwidth > div');
      var $div = jQuery( $fluid.get( 1 ) );
      var $images = $div.find( '> div ' ).first().find( '> div' );
      var imgPosX = 0;
      var imgPosY = 0;

      jQuery( '#myDiv-fluidwidth' ).fadeOut();

      var $list = jQuery( '#listView' );
      if( $list.hasClass( 'initialized' ) ) {
        $list.fadeIn();

        return;
      }

      $images.each( function( i ) {
        var $this = jQuery( this );
        var id = 'coverImg-' + i;

        if( $this.data( 'style' ) == undefined ) {
          $this.data( 'style', $this.attr( 'style' ) );
          $this.attr( 'id', id );
        }

        //Get absolute position after css translation

        var elem = document.getElementById( id );
        var computed = window.getComputedStyle( elem );
        var curTransform = new  WebKitCSSMatrix( computed.webkitTransform );
        var pos = { x: $this.offset().left + curTransform.m41,
                    y: $this.offset().top + curTransform.m42 };

        var $clone = $this.find( 'img' ).clone();
        $clone.attr( 'style', '' );

        var $div = jQuery( '<div>' );
        var src = $clone.attr( 'src' );
        if( src != undefined  ) {

          $div.addClass( 'item' ).css( { background: 'url(' + src + ') 50% 50% no-repeat' } );

          jQuery( '#listView' ).append( $div );
          $div.transit( { scale: 0, opacity: 0 }, 0 );

          $div.delay( 80 * i ).transit( { scale: 1, opacity: 1 }, 'slow', 'easeOutBack' );

        }
  });

  $list.addClass( 'initialized' );
}

var switchListToCoverflow = function() {
  jQuery( '#myDiv-fluidwidth' ).fadeIn();
  jQuery( '#listView' ).fadeOut();
}
