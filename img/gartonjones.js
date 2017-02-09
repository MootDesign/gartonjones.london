/*jslint sloppy: true*/
/*global $, jQuery, alert*/
var isiPad = navigator.userAgent.match(/iPad/i) !== null;
 // Offices selector - showing contact info on office click
$('.wm').click(function () {
    $('.neo, .rao, .cbo, .cbwcontent, .necontent, .racontent').fadeOut(200, function () {
        $('.wmo, .wmcontent').delay(400).fadeIn('slow');
    });
});

$('.ne').click(function () {
    $('.wmo, .rao, .cbo, .cbwcontent, .racontent, .wmcontent').fadeOut(200, function () {
        $('.neo, .necontent').delay(400).fadeIn('slow');
    });
});
$('.ra').click(function () {
    $('.neo, .wmo, .cbo, .cbwcontent, .necontent, .wmcontent').fadeOut(200, function () {
        $('.rao, .racontent').delay(400).fadeIn('slow');
    });
});
$('.cbw').click(function () {
    $('.neo, .rao, .wmo, .racontent, .necontent, .wmcontent').fadeOut(200, function () {
        $('.cbo, .cbwcontent').delay(400).fadeIn('slow');
    });
});
// End offices selector


// Top menu open / close
$('#mtrigger').click(function () {
    $('.slmenu').toggle('fast', 'swing');
    $('#menugrayout').fadeToggle('fast');
    $('nav .right .hideme').fadeToggle();
});

// Footer open / close
$('.clickarea').click(function () {
    $('.offinfo').toggle('slow');

    /*
    * in contact-us page the footer is visible by default, so I don't have to show the
    * shadow on the first click
    */
    if (!$('#footer-inner').hasClass("expanded")) {
        $('#menugrayout').fadeToggle('slow');
    }

    $('.bottomlogo img').fadeToggle('slow');
    var actualheight = $('#unityPlayer embed').height();
    $('#footer-inner').removeClass("expanded");
});


// Equalizing border heights on property detail pages
window.onload = function (event) {
    $('#functions').css('height', jQuery('#dex').height() + 'px');
};

window.onresize = function (event) {
    $('#functions').css('height', jQuery('.desc').height() + 'px');
};

//close open content if scanlines are clicked
$('#menugrayout').click(function () {
    if ($(this).hasClass('no-close')) {
        return;
    }

    if ($('.slmenu').is(":visible")) {
        $('.slmenu').toggle('slow');
    }
    
    if ($('.offinfo').is(":visible")) {
        $('.offinfo').toggle('slow');
    }
    
    if ($('#quickview').is(":visible")) {
        $('#quickview').fadeOut('slow');
        $('#contentabout').fadeTo(500, 1);
    }
    
    $('#menugrayout').fadeOut();
});

// Archive-videos

function chelsea(e) {
    $('.cbwcontent, .cbo').fadeIn();
    $("#prev a").attr("href", "/offices/?o=royal-arsenal");
    $("#next a").attr("href", "/offices/?o=westminster");
}

function royal(e) {
    $('.racontent, .rao').fadeIn();
    $("#prev a").attr("href", "/offices/?o=nine-elms");
    $("#next a").attr("href", "/offices/?o=chelsea-bridge-wharf");
}

function nineelms(e) {
    $('.necontent, .neo').fadeIn();
    $("#prev a").attr("href", "/offices/?o=westminster");
    $("#next a").attr("href", "/offices/?o=royal-arsenal");
}

function westminster(e) {
    $('.wmcontent, .wmo').fadeIn();
    $("#next a").attr("href", "/offices/?o=nine-elms");
    $("#prev a").attr("href", "/offices/?o=chelsea-bridge-wharf");
}

$('#dotcontainers7, #dotcontainers8, #dotcontainers9, #dotcontainers10').click(function () {
    $('.teammember').fadeOut(function () {
        $('.teammember').fadeIn();
    });
});

$('.closeit').click(function () {
    $('#quickview').fadeOut(function () {
        $('#menugrayout').fadeOut();
        $('#quickview').css('z-index', '-1');
        $('#contentabout').fadeTo(500, 1);
    });
});

$('.lv').click(function () {
    var $g = $('#gallery').show().fadeOut(0);
    $g.css({ 'margin-left': -$g.width() / 2, 'margin-top': -$g.height() / 2 });

    $('#menugrayout').fadeIn('fast');
    parallaxAnimate('gallery');
});

$('#dotcontainer, #dotcontainer2, #dotcontainer3, #dotcontainer4, #dotcontainer5, .vtrig, .gjplay').click(function () {
    $('#quickview, #menugrayover').fadeIn();
    $('#menugrayout').fadeIn();
    $('#quickview').css('z-index', '13');
    $('#contentabout').fadeTo(500, 0.2);
});

function galleryappend() {
    var swiper = new Swiper('.swiper-container', {
        slidesPerView: 1,
        loop: true,
        shadow: false,
        tdFlow: {
            rotate : 30,
            stretch : 10,
            depth: 100,
            modifier : 1,
            shadows : false
        }
    });
    
    $('#lh2').on('click', function (e) {
        e.preventDefault();
        swiper.swipePrev();
    });

    $('#rh2').on('click', function (e) {
        e.preventDefault();
        swiper.swipeNext();
    });
}

function vmap(lat, lon) {
	var point = new google.maps.LatLng(lat, lon),
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

	google.maps.event.addListenerOnce(map, 'idle', function () {
	    var map_gradient = document.createElement('div');
		map_gradient.setAttribute('id', 'map-gradient');
		$('#heading div').first().append(map_gradient);
		$('.gmnoprint').css('z-index','92');
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

  var panorama = new google.maps.StreetViewPanorama(document.getElementById('mapholder'), panoOptions);
}

// ! Archive videos
$('.ca2').click(function () {
    $('.offinfo2').fadeOut(100);
    $('.offinfo2', this).delay(150).fadeIn(300);
});

jQuery.fn.extend({
    toggleText: function (a, b) {
        var isClicked = false,
            that = this;
        this.click(function (){
            if (isClicked) {
                that.text(a);
                isClicked = false;
            } else {
                that.text(b);
                isClicked = true;
            }
        });
        return this;
    }
});

$('#changethis').toggleText('Menu', 'CLOSE');

 jQuery(document).ready(function () {
    jQuery('#functions').css('height', jQuery('#desc').height() + 'px');
 });

 jQuery(".proop").hover(
    function () {
        jQuery('.functions', this).fadeIn(300);
    },
    function () {
        jQuery('.functions', this).fadeOut(300);
    });

jQuery(document).ready(function () {
    jQuery('.closeit').click(function () {
        jQuery('#quickview').fadeOut();
        jQuery('#container2, #lh2, #rh2').fadeTo(500,1);
        jQuery('#menugrayout').fadeOut();
    });
});

jQuery('#lh2').on('click', function (e){
    e.preventDefault()
    swiper.swipePrev()
});

jQuery('#rh2').on('click', function (e){
    e.preventDefault()
    swiper.swipeNext()
});


$(document).ready(function ( $ ) {
if( ! isiPad ) return;
$( '#menu > div' ).click( function() {
if( $( this ).hasClass( 'active' ) ) return;

$( '.zoomTarget2.active' ).trigger( 'click' );
});

$( '.zoomTarget2' ).click( function() {
var pos = $( this ).offset();
if( $( '.zoomTarget2.active' ).length > 1 ) {
$( '.zoomTarget2.active' ).not( this ).trigger( 'click' );
}

$this = $( this );

if( $this.hasClass( 'zoomed' ) ) {
$this.animate( { scale: 1, top: -2, left: $this.data( 'div-left' ) }, 'fast', function() {
$( this ).removeClass( 'active' );
});
$( '#menugrayout-menu' ).stop( true, true ).fadeOut();
} else {
if( $this.data( 'div-left' ) == undefined ) {
$this.data( 'div-left', 0 );
}

var t = ( pos.top < 70 ) ? 70 : 0;
var l = ( pos.left < 100 ) ? 105 : 0;

$this.animate( { scale: 2, top: t, left: l }, 'fast', function() {
$( this ).addClass( 'active' );
});

$( '#menugrayout-menu' ).stop( true, true ).fadeIn();
}
$( this ).toggleClass( 'zoomed' );
$( 'nav.top-bar' ).toggleClass( 'zoomed' );
});
});

//For iPad i need more padding in some pages

$( document ).ready( function( $ ) {

    $( 'body > .fullWidth' ).last().addClass( 'last' );



    $( '.ipad #mapholder' ).click( function() {

        $( '.dot-contact' ).fadeOut();

        $( '#video1' ).show();



        document.getElementById('video1').play();

    });



});



// Single developments scrolling

$( document ).ready( function() {

    // set the parent height first

    var height = $( '.currentPage' ).outerHeight();

    $( '.parent' ).outerHeight( height );



    // after the page has been loaded, set transitions back

     // set the transition for parent

     $( '.parent' ).css( {

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

    if ( $( $link_class ).length > 0 && $( $page_id ).length > 0 ) {

         $( $link_class ).click( function() {

           // scroll

            var height = $( $page_id ).height(); // get the height of children

            var position = $( $page_id ).position(); // get the position of children regarding to other parent



            $( '.other-parent' ).animate( { 'top': -position.top }, 'slow' ); // set the top value of other-parent

            $( '.parent' ).animate( {'height': height }, 'slow' ); // set the parent height to children height

             // will need to extend, to highlight the image clicked



            $( '.currentPage' ).removeClass( 'currentPage' );  // remove previously added currentPage selector

            $( $page_id ).addClass( 'currentPage' ); // add for current page a selector



            $( '.dev-submenu .page-1, .dev-submenu .page-2, .dev-submenu .page-3, .dev-submenu .page-4'  ).removeClass( 'active' );

            $( $link_class ).addClass( 'active' );

        });

    }

}



$( document ).ready( function() {

//     set the height of the gallery

    var height = $( '.gallery img:first-child' ).height();

    var $gallery = $( '.gallery' );

    var $next_link = $( '#next' );

    var $prev_link = $( '#prev' );



    $gallery.height(height);

    var $img_height = $( '.gallery img' ).height();

    $img_height = -($img_height / 2);

    $( '.gallery img' ).css( 'margin-top', $img_height );



    // when clicking next, bring the next img



    function slides() {

        return $( '.gallery' ).find( 'img' );

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


$( document ).ready( function() {
  if( $( 'body' ).hasClass( 'page-id-15672' ) ) {

    var centerRow = function() {
        $row = $( '.row-home' );

        $row.css( 'margin-top', - $row.height() / 2 );
        console.log( $row.width );

//        if( $row.width > 1000 ) {
          $row.css( 'margin-left', - $row.width() / 2 );
/*          $row.css( 'left', '50%' );
        } else {
          $row.css( 'margin-left', 0 );
          $row.css( 'left', 0 );
        }
  */
    };

    $(window).resize( function() {
      centerRow();
    });

    centerRow();

  }
});









function resizeDevelopments() {

    // set the top position for pages

        var height = $( '.currentPage' ).height(); // get the height of children

        var position = $( '.currentPage' ).aPosition(); // get the position of children regarding to other parent



        $( '.other-parent' ).css( { 'top': -position.top }); // set the top value of other-parent

        $( '.parent' ).css( {'height': height }); // set the parent height to children height



    var $img_height = $( '.gallery img' ).height();

    $img_height = -($img_height / 2);

    $( '.gallery img' ).css( 'margin-top', $img_height );



    // and trigger active link class

    var mytimer;

    clearTimeout( mytimer );

    mytimer = setTimeout( function() {

        $( '.dev-submenu .active' ).trigger( 'click' );

    }, 500);



}



jQuery.fn.aPosition = function() {

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

  jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };



})(jQuery,'smartresize');



// usage:

$(window).smartresize(function(){

  // code that takes it easy...

    resizeDevelopments();

});


$(document).ready(function(){

  // settings
  var $slider = $('#mag-slider'); // class or id of carousel slider
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
  // $interval = setInterval(
  //     function(){
  //       var $i = $slider.find($slide + '.active').index();

  //       slides().eq($i).removeClass('active');
  //       slides().eq($i).fadeOut($transition_time);

  //       if (slides().length == $i + 1) $i = -1; // loop to start

  //       slides().eq($i + 1).fadeIn($transition_time);
  //       slides().eq($i + 1).addClass('active');
  //     }
  //     , $transition_time +  $time_between_slides
  // );
});

$( document ).ready( function() {
    $( '.clickme' ).click( function() {
        $( '.clickme' ).removeClass( 'active' );
        $( this ).addClass( 'active' );

        $( 'input[name="search"]' ).val( $( this ).attr( 'data-value' ) );

        return false;
    });

    $( '.has-submenu' ).click( function() {
       $this = $( this );
       $('.optionsholder').fadeOut();

       $holder = $( $this.attr( 'data-submenu' ) );
       if( $holder.is( ':visible' ) ) {
       } else {
            $holder.fadeIn();
            var pos = $holder.closest( '.columns' ).position();

            $holder.css( 'top', - $holder.height() / 2 + $this.position().top );
            $holder.css( 'margin-left', - $holder.outerWidth() / 2 );
       }
    });


    $( 'ul.subsubmenu.optionsholder li' ).click( function() {
        $('.optionsholder').fadeOut();
    });
});



$( document ).ready( function() {
    var mousepos;

    $( '#scroll .scrollable' ).mousedown( function( e ) {
        $( this ).data( 'mousedown', 1 );

        mousepos = e;
    })
    .mousemove( function( e ) {
        $this = $( this );
        if( $this.data( 'mousedown' ) != 1 ) return;

        var l = $this.position().left + e.clientX - mousepos.clientX;
        var t = $this.position().top + e.clientY - mousepos.clientY;

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

        $this.stop( true, true ).animate( { left: l, top: t }, 0 );

        mousepos = e;
    })
    .mouseup( function() {
        $( this ).data( 'mousedown', 0 );
    });
});

//Gallery
$( document ).ready( function() {
  //Next gallery
  $( '#gallery .controls' ).click( function() {
    swapPage( $( this ) );
  });

});

function swapPage( $div ) {
//  var $next;
  var dir = 1;   //direction. 1 - left, 2 - right
  var $active = $div.closest( '.parallax' ).find( '.content .active' );

  if( $div.attr( 'id' ) == "next" ) {
    //Get the next div
    $next = $active.next();
    if( $next.length == 0 ) $next = $( '.parallax.active .content > div' ).first();

    dir = 2;
  } else {
    //Get the previous div
    $next = $active.prev();
    if( $next.length == 0 ) $next = $( '.parallax.active .content > div' ).last();
  }

  $next.show().css( 'top', '' );

  //Move the next div after the active one
  if( dir == 2 )  {
    $next.css( { left: $next.width(), top: -$next.position().top, opacity: 0 } );

    $active.animate( { left: - $active.width(), opacity: 0 }, 'slow' ).removeClass( 'active' );
    $next.show().animate( { left: 0, opacity: 1 }, 'slow' ).addClass( 'active' );
  } else {
    $next.css( { left: -$next.width(), top: -$next.position().top, opacity: 0 } );

    $active.animate( { left: $active.width(), opacity: 0 }, 'slow' ).removeClass( 'active' );
    $next.show().animate( { left: 0, opacity: 1 }, 'slow' ).addClass( 'active' );
  }
}
