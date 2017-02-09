var snap, paper, stopAnimation = false;

jQuery( document ).ready( function() {
  if( typeof Snap != "undefined" )  initSVG();

  jQuery( '.scroll-me' ).scroll( function() {
      var st = jQuery( this ).scrollTop();
      var diff = jQuery( this ).data( 'over' );
      if( undefined == diff ) {
          _js_scrollbar_init( jQuery( this ) );
      }

      jQuery( this ).parent().find( '.draggable' ).stop(true, false).animate( { top: st } );
  });

  if( jQuery.draggable != undefined ) {
      jQuery( '.draggable' ).draggable({
          containment: "parent",
          axis: y ,
          drag: function() {
              var $sm = jQuery( this ).parent().parent().find( '.scroll-me' );

              if( $sm ) $sm.scrollTop( jQuery( this ).position().top );
          }
      });
  }

    jQuery( '.tooltip-me' )
    .mouseenter( function() {
        var $this = jQuery( this );
        var $ttip = jQuery( '._tooltip._tooltip-' + $this.index() );
        if( $ttip.length <= 0 ) {
            $ttip = jQuery( '<div>' ).addClass( '_tooltip _tooltip-' + $this.index() );

            jQuery( 'body' ).append( $ttip );
        }

        var pos = $this.offset();
        $ttip
            .html( $this.data( 'ttip' ) )
            .show()
            .css( { left: pos.left + ( $this.width() / 2 ) - ( $ttip.width() / 2 ), top: pos.top + $this.height() + 20 } )
            .transition( { opacity: 1, y: '-5px' }, 'fast' );
    })
    .mouseleave( function() {
        var $this = jQuery( this );
        var $ttip = jQuery( '._tooltip._tooltip-' + $this.index() );

        $ttip.transition( { opacity: 0, y: '5px' }, 'fast', function() {
                jQuery( this ).remove()
            });

//        $ttip.fadeOut( function() { jQuery( this ).remove(); } );
    });
});

function initSVG() {
  if( ! model.isTouch ) {
      snap = Snap( document.documentElement.clientWidth, document.documentElement.clientHeight );

      paper = snap.paper;

      jQuery( 'svg' ).width( jQuery( '.viewport' ).width() );
      jQuery( 'svg' ).height( jQuery( '.viewport' ).height() );
  }

  setTimeout( function() {
      jQuery( '*[id*="dot-container"]' ).each( function( i ) {
          $div = jQuery( this );
          $title = $div.find( '.title' );

          //Fix the position of the label
          var pos = jQuery( this ).find( '.title' ).attr( 'data-pos' );
          var left = ( pos == "left" ) ? - $title.width() - 15 : 30;
          $title.css( 'left', left );

          setTimeout( function( $div ) {
              $div.removeClass( 'hidden' );

              //Delay the "pulse" animation
              setTimeout( function( $div ) {
                $div.find( '.dot' ).addClass( 'pulse' );
              }, 100 * $div.index(), $div );
          }, 100 * ( i + 1 ), $div );

          jQuery( 'body' ).on( 'touch', $div, function( e ) {
              stopAnimation = false;
              showContent( jQuery( this ) );
          });

          $div.mouseenter( function() {
              stopAnimation = false;

              showContent( jQuery( this ) );
          });
      });
  }, 600 );

  initDevelopmentContent();
}

function initDevelopmentContent() {
  //Move the description ( for responsive layout )
  setTimeout( function() {
    moveDescriptions();
  }, 300 );

  jQuery( window ).resize( function() {
    moveDescriptions();

    $active = jQuery( '.dot-active' );
    if( $active.length > 0 ) hideContent( $active );
  });

  //Zoom the gallery image
  jQuery( '#gallery .content p img' ).click(function() {
        zoomImage( jQuery( this ) );
  });

  jQuery( 'body' ).click( function( e ) {
      $active = jQuery( '.dot-active' );

      //To let content?
      $t = jQuery( e.target );
      $dot = $t.closest( '#dot-2-desc' );

      if( $active.length > 0 && $dot.length <= 0 ) {
          hideContent( $active );
      }
  });

    jQuery( 'body' ).on( 'click', '.big-controls', function() {
        $new = jQuery( '<img>' );
        $div = jQuery( '<div>' ).append( $new );
        $imgs = jQuery( '#gallery img' );

        //Get current image
        var current;
        $imgs.each( function( i ) {
            if( jQuery( this ).hasClass( 'currentBig' ) ) {
                current = i;
            }
        });

        $imgs.removeClass( 'currentBig' );

        //Next?
        dir = 1;
        if( jQuery( this ).hasClass( 'big-next' ) ) {
            current++;
        } else {
            current--;

            dir = - 1;
        }

        if( current > $imgs.length ) current = 0;
        if( current < 0 ) current = $imgs.length;

        var img = $imgs.get( current );
        var $img = jQuery( img );
        $img.addClass( 'currentBig' );

        $new.load( function() {
//            $this = jQuery( this );
            $new = jQuery( this );
            $div = $new.parent();

            jQuery( 'body' ).append( $div );
//            $this.data( 'width', $this.width() ).data( 'height', $this.height() ).hide();

            jQuery( 'html' ).css( { overflow: 'hidden' } );

            if( ! jQuery( 'body' ).hasClass( 'single-2d' ) ) {
              jQuery( 'body' ).addClass( 'no-overflow' );
            }

            $full = jQuery( '.full-img' );
            $full.transition( {
                scale: ( dir > 0 ) ? 3 : 0,
                opacity: 0
            }, 'slow', 'easeInOutExpo', function() {
                $full.remove();
            });
                  $div.addClass( 'full-img' );

                  $new.off( 'load' ).css( 'marginLeft', - $new.data( 'width' ) / 2 );
                  $div.css( {
                               left: '50%',
                               top: $full.position().top,
                               marginLeft: '-25%',
                            }
                          );
                $div.transition( {
                    opacity: 0,
                    scale: ( dir > 0 ) ? 0 : 3
                }, 0 ).show();


                  //Center the image into the container
                  if( $new.width() > $div.width() ) {
                      $new.css( { left: - Math.abs( $new.width() - $div.width() ) / 2, position: 'relative' } );
                  }
                $div.show().attr( 'src', $new.attr( 'src' ) ).transition( {
                    scale: 1,
                    opacity: 1
                }, 'slow', 'easeInOutExpo', function() {
                    adjustBigControls( $div );
                });

        }).attr( 'src', $img.data( 'big' ) );
    });
};


//Close the parallax window
jQuery( 'body' ).on( 'click', '.x-close', function() {
  if( jQuery( this ).hasClass( 'no-close' ) ) return;

    //Is the gallery open?
    $img = jQuery( '.full-img' );

  if( $img.length <= 0 ) {

    //(re)start the engine
    if( typeof engine != "undefined" ) {
        startRenderEngine();

        restoreCameraFov();
    }

    jQuery( '.mt8p' ).removeClass( 'zoomed' );

    var closest = jQuery( this ).data( 'close' ) || '.parallax';
//      console.log( closest );

    jQuery( this ).closest( closest ).transition({
        scale: 0,
        opacity: 0
    }, 'slow', 'easeInOutExpo' );

    jQuery( 'html' ).css( { overflow: 'hidden' } );
    jQuery( '.mt8p' ).show().transition( { scale:1, opacity: 1, x: 0, y: 0 }, 'slow', 'easeInOutExpo', function() {
        jQuery( this ).attr( 'style', '' );

        jQuery( 'body' ).removeClass( 'no-overflow' );

        setTimeout( function() {
            jQuery( 'html' ).css( { overflow: 'auto' } );
        }, 100 );
    });

    jQuery( '#menugrayout' ).fadeOut();
    jQuery( '#menugrayout' ).removeClass( 'no-close' );
  } else {
//    jQuery( '#gallery' ).css( 'z-index', 11 );
    $video = jQuery( '#video' );
    if( $video.length > 0 ) $video.remove();

    jQuery( '#gallery' ).show().transition( { scale: 1, opacity: 1 }, 'slow', 'easeInOutExpo' );
    jQuery( '.x-full' ).fadeOut( 'fast', function() {
        jQuery( this ).remove()
    });

    jQuery( '.big-controls' ).fadeOut( 'fast', function() {
        jQuery( this ).remove()
    });

    jQuery( '#gallery .content .active *' ).fadeIn( 300 );
    jQuery( '.full-img' ).transition( { scale: jQuery( '.full-img' ).data( 'scale' ), opacity: 0, x: 0, y: 0 }, 'slow', 'easeInOutExpo', function() {
        jQuery( this ).remove();
    });
  }
});

/*
 * Move the "dot" description
 */
function moveDescriptions() {
  jQuery( '*[id*="dot-container"]' ).each( function( i ) {
    $div = jQuery( this );

    //Move the content on the specified side top-left, top-right, bottom-left, bottom-right
    $desc = jQuery( "#" + $div.attr( 'data-id' ) + "-desc" );

    if( $desc.length > 0 ) {
      var pos = $div.attr( 'data-side' );
      var l;
      var t = $div.position().top - 100;

      if( pos == "right" ) {
	l = $div.position().left + 100;
      } else {
	l = $div.position().left - $desc.width() - 100;
      }

      if( l < 0 ) {
        l = $div.position().left + 100;
        t -= 50;
      }

      if( l + $desc.width() > document.documentElement.clientWidth ) {
	l = document.documentElement.clientWidth - $div.width();
      }

      $desc.css( {
                    'left': l,
                    'top': t
                 } );
    }
  });
}



/*
 * Show an animated line from $dot to its description
 *
 * @param object "source" dot
 */
//I need this var outside the function to allow "inverse animation" ( hiding desciption )
var line1, line2, $target, $dot;
var lines = {
                line1: new Array(),
                line2: new Array()
            };
function showContent( $src ) {
  $src.removeClass( 'dot-active' );
  $active = jQuery( '.dot-active' );

  //Description div. <div id="dot-##-desc">....</div>
  if( $active.length > 0 && $src.index() != $active.index() ) {
      hideContent( $active );
  }

  $target = jQuery( "#" + $src.data( 'id' ) + "-desc" );
  if( $target.length <= 0 ) return;

  $dot = $src;
  stopAnimation = false;

  $dot.find( '.title' ).fadeOut();

  var pos = $dot.position();
  pos.left += 7;
  pos.top += 51;

  //Where is the description?
  $target.show();
  var l = $target.position().left;
  if( l < pos.left ) l += $target.width() + 20;

  var t =  $target.position().top + 78;

  //Draw the oblique line
  lines.line1[ $dot.index() ] = animateLine( $dot, lines.line1, pos.left, pos.top, l, t,     _showDescription, 100 );

  $dot.addClass( 'dot-active' );
}

//Draw the horizontal line
function _showDescription( $dot, x2, y2 ) {
  if( stopAnimation ) {
    stopAnimation = false;
    return;
  }

  var l = $target.position().left;
  if( l > $dot.position().left ) l += $target.width();

  lines.line2[ $dot.index() ] = animateLine( $dot, lines.line2, x2, y2, l, y2 );

  setTimeout( function() {
      if( stopAnimation ) return;

      $target.show().animate( {opacity: 1 }, 'slow' );
  }, 200 );
}

//Hide the content and the 2 lines
function hideContent( $dot ) {
  if( $target.lenght <= 0 ) return;

  $target.stop( true, true ).animate( { opacity: 0 }, 'slow', function() {
      jQuery( this ).hide();
  });

  //Hide line2
  if( lines.line2[ $dot.index() ] != undefined ) {
    line2 = lines.line2[ $dot.index() ];

    animateLine( $dot, lines.line2, line2.attr( "x2" ),
                        line2.attr( "y2" ),
                        line2.attr( "x1" ),
                        line2.attr( "y1" ),
                _hideObliqueLine );
  } else {
    _hideObliqueLine( $dot );
  }
}

/*
 * Hide the oblique line ( line1 ) and display the original title back
 */
function _hideObliqueLine( $dot ) {
  if( undefined == lines.line1[ $dot.index() ] ) return;
   var line1 = lines.line1[ $dot.index() ];

   lines.line2[ $dot.index() ] = undefined;

   animateLine( $dot, lines.line1,
                        line1.attr( "x2" ),
                        line1.attr( "y2" ),
                        line1.attr( "x1" ),
                        line1.attr( "y1" ), (function() {
                          var dot = $dot, line = lines.line1;

                          return function() {
                              dot.find( '.title' ).stop( true, true ).fadeIn();
                              dot.removeClass( 'dot-active' );

			      lines.line1[ dot.index() ] = undefined;
                          }
                        })());
}

var lineStrokeColor = ( typeof( lineStrokeColor ) == "undefined" ) ? "#fff" : lineStrokeColor;
function animateLine( $dot, line, x1, y1, x2, y2, callback, speed ) {
  var line = line[ $dot.index() ];

  if( line == undefined ) {
    line = paper.line( x1,
                        y1,
                        x1,
                        y1 );

    line.attr({
      stroke: lineStrokeColor,
      strokeWidth: 1, // CamelCase...
    });
  }

  if( speed == undefined ) speed = 200;
  line.stop( true, true ).animate({x2: x2, y2: y2}, speed, (function() {
    var dot = $dot;
    var call = callback;

    return function() {
      if( null != callback ) {
        callback.call( "", dot, x2, y2 );
      }
    }
  })());

  return line;
}



/*

 * Show $div object using parallax animation

 */

/*
 * To improve loading performance in the galler are shown "small" images.
 */
var $_small;
function zoomImage( $small ) {
  jQuery( '#gallery img' ).removeClass( 'current' );
  $small.addClass( 'current currentBig' );

  $img = jQuery( '<img>' );

  $div = jQuery( '<div>' );
  $div.addClass( 'full-img' ).append( $img ).hide();

  jQuery( 'body' ).append( $div );

  //Close button
  $close = jQuery( '<div>' ).html( '&#10005' );
  $close.addClass( 'x-close' ).addClass( 'x-full' ).hide();
  jQuery( 'body' ).append( $close );

  //Prev / Next image
  $next = jQuery( '<a>' ).html( '&#9658' ).addClass( 'big-controls big-next' ).hide();
  $prev = jQuery( '<a>' ).html( '&#9668' ).addClass( 'big-controls big-prev' ).hide();
  jQuery( 'body' ).append( $prev ).append( $next );

  $div.data( 'width', $small.width() ).data( 'height', $small.height() );

  var off = $small.offset();
  $div.data( { left: off.left, top: off.top } );

    jQuery( 'html' ).css( { overflow: 'hidden' } );

    if( ! jQuery( 'body' ).hasClass( 'single-2d' ) ) {
      jQuery( 'body' ).addClass( 'no-overflow' );
    }

  zoomImageLoad( $small );

    $_small = $small;
}

function zoomImageLoad( $small ) {
  var src = $small.attr( 'src' );

  //remove -###x### from src, I need the fullpath
  var patt = /-\d[^\.]*/gi;
  var full = src.replace( patt, '' );
  var full = $small.data( 'big' );

  $big = jQuery( '.full-img img' ).load( function() {
      $img = jQuery( this );
      $div = $img.parent();

      //To center the big one across the small one I have to calculate the difference between both
      var diffW = $div.width() - $div.data( 'width' );
      var diffH = $div.height() - $div.data( 'height' );

      var top = parseFloat( $div.data( 'top' ) ) - ( diffH / 2.0 );
      var left = parseFloat( $div.data( 'left' ) ) - ( diffW / 2.0 );
      $div.css(
                { top: top,
                 left: left
                }
              );

      //Center the image in the screen
      var y = ( document.documentElement.clientHeight - $div.height() ) / 2;
      y = ( y - top );

      var x = ( document.documentElement.clientWidth - $div.width() ) / 2;
      x = ( x - left );

      //Calculate the scale between small and bigger image
      var scale = $_small.width() / $div.width();
      $img.data( 'scale', scale );

      $div.show().transition( { scale: scale, opacity: 0.6 }, 0 );

      //Center the image into the container
      if( $img.width() > $div.width() ) {
          $img.css( { left: - Math.abs( $img.width() - $div.width() ) / 2, position: 'relative' } );
      }

      $_small.hide();
      $div.transition( { scale: 1, opacity: 1,  y: y, x: x, opacity: 1 }, 500, 'easeInOutExpo', function() {
          adjustBigControls( jQuery( this ) );
      });

      jQuery( '#gallery' ).transition( { scale: 3, opacity: 0 },  400, 'easeInOutExpo', function() {
          jQuery( this ).hide();
      });

      //Is a video?
      if( $_small.attr( 'data-video' ) != null ) {
          var dot = '<div class="tdot-big" >' +
//                        '<div class="icon">&#9658;</div>' +
//                        '<div class="dot tpulse"></div>' +
                    '</div>';

          $div.html( $div.html() + dot );

          $div.find( '.tdot-big' ).on( 'click', loadVideo );
      }

      jQuery( this ).off( 'load' );
  }).attr( 'src', full );
}

function adjustBigControls( $img ) {
    $close = jQuery( '.x-full' );

    if( $close.length <= 0 || $img.length <= 0 ) return;

    //Close button
    var pos = $img.offset();
    $close.css( { left: pos.left + $img.width() + 10, top: pos.top - 30 } );
    $close.fadeIn();

    //Next/Prev button
    var t = pos.top + ( $img.height() / 2 );
    jQuery( '.big-prev' ).css( { left: pos.left - 50, top: t } ).fadeIn();
    jQuery( '.big-next' ).css( { left: pos.left + $img.width() + 20, top: t } ).fadeIn();
}

function loadVideo() {
    $this = jQuery( this );

    jQuery( '.full-img' ).animate( { opacity: 0 }, 0 );

    $div = jQuery( '<div>' )
            .attr( 'id', 'video' )
            .css( 'top', jQuery( '.full-img' ).position().top );
    var width = jQuery( '.full-img' ).width();
    var height = jQuery( '.full-img' ).height();
    var ratio = width / height;

    $div.html(
    '<video width="' + width + '" autoplay controls muted>' +
        '<source src="' + $_small.data( 'video' ) + '" type="video/mp4"></source>' +
    '</video>');

    jQuery( 'body' ).append( $div );
}

var radius = 200;
var y;
//Scrollable content
jQuery( document ).ready( function() {
    //Adjust scroll area height
    adjustScrollArea();

    //Prev & Next
    jQuery( '#content .controls .prev' ).click( function() {
        scrollAreaContentTo( -1 );

        return false;
    });

    jQuery( '#content .controls .next' ).click( function() {
        scrollAreaContentTo( 1 );

        return false;
    });

    //Slide to ##
    jQuery( '.leftmenu .item a' ).click( function() {
        //the direction = difference by current one and clicked one
        //Active
        var active = jQuery( '.leftmenu li.active' ).index();
        var current = jQuery( this ).parent().index();

        if( active >= jQuery( '.leftmenu > .item' ).length ) active--;
        if( current >= jQuery( '.leftmenu > .item' ).length ) current--;

        scrollAreaContentTo( current - active );

        return false;  //Avoid scroll on top
    });

    //Wheel
    jQuery( "#content .container .subcontent" ).bind( 'mousewheel', function( e ) {
        //Nothing to do
        if( jQuery( this ).hasClass( 'noscroll' ) ) return;

        scrollAreaSubContent( jQuery( this ), e.originalEvent.wheelDelta );

        e.preventDefault;
    });

    //Touch
    var _oldevent, _diff;
    jQuery( "#content .container .subcontent" ).bind( 'touchstart', function( e ) {
        e.preventDefault();

        if(e.originalEvent.touches && e.originalEvent.touches.length) {
            e = e.originalEvent.touches[0];
        } else if(e.originalEvent.changedTouches && e.originalEvent.changedTouches.length) {
            e = e.originalEvent.changedTouches[0];
        }

        _oldevent = e.clientY;
    });

    jQuery( "#content .container .subcontent" ).bind( 'touchmove', function( e ) {
        e.preventDefault();

        if(e.originalEvent.touches && e.originalEvent.touches.length) {
            e = e.originalEvent.touches[0];
        } else if(e.originalEvent.changedTouches && e.originalEvent.changedTouches.length) {
            e = e.originalEvent.changedTouches[0];
        }

        _diff = e.clientY - _oldevent;
        scrollAreaSubContent( jQuery( this ), _diff, 0 );

        _oldevent = e.clientY;
    });

    jQuery( "#content .container .subcontent" ).bind( 'touchend', function( e ) {
        e.preventDefault();

        if(e.originalEvent.touches && e.originalEvent.touches.length) {
            e = e.originalEvent.touches[0];
        } else if(e.originalEvent.changedTouches && e.originalEvent.changedTouches.length) {
            e = e.originalEvent.changedTouches[0];
        }

        scrollAreaSubContent( jQuery( this ), _diff, 'slow' );

        _oldevent = e.clientY;
    });

    //Gallery ( right bar )
    jQuery( '#about .wiref3 img' ).first().addClass( 'active' ).css( { opacity: 1 } );
});

jQuery( window ).resize( function() {
    setTimeout( function() {
        adjustScrollArea();
        adjustGallery();
        adjustBigControls( jQuery( '.full-img' ) );

        scrollAreaContentTo( 0 );
    }, 200 );
});

function scrollAreaSubContent( $this, delta, speed, step,ease, stop ) {
    if( speed == undefined ) speed = 'fast';
    if( step == undefined ) step = 40;
    if( ease == undefined ) ease = 'easeOutSine';
    if( stop == undefined ) stop = false;

    if( typeof model != "undefined" && model.isTouch ) {
        step = 2 * Math.abs( delta );
    }

    $row = $this.find( '.row' );

    var top = $row.position().top;
    if( delta > 0) {
        top += step;
    }
    else{
        top -= step;
    }

    if( top > 0 ) top = 0;
//    console.log( top, top - step, delta );

    var diff = ( $row.height() - $this.height() );
    if( ( top  + $row.height() ) < $this.height() ) top = - diff;

//    console.log( diff, top, step );

    //Set the top of the draggable
    $draggable = $this.find( '.scrollbar .draggable' );

    var diff = $row.height() - $this.find( '.scrollbar' ).height();
    var ratio = ( $this.parent().height() - $draggable.height() ) / diff;

    var dtop = - parseInt( top ) * ratio;

    $draggable.css( { top: dtop + 5 } );

//    $row.css( { top: top } );
//    $row.css( { top: top } );
    $row.stop( true, stop ).animate( { top: top }, speed, ease );
}

function parallaxAnimate( item ) {
    $div = jQuery( item ); //jQuery( '.single3d-content' );

    //Stop the 3d engine
    if( typeof engine != "undefined" )
        engine.stopRenderLoop();

    $div.hide().transition({
        scale: 0,
    }, 0 );

    _centerDiv( $div );

    $div.show().addClass( 'zactive' ).transition({
        scale: 1,
        opacity: 1
    }, 'slow', 'easeInOutExpo' );

    jQuery( 'html' ).css( { overflow: 'hidden' } );

    if( ! jQuery( 'body' ).hasClass( 'single-2d' ) ) {
      jQuery( 'body' ).addClass( 'no-overflow' );
    }

    jQuery( '.mt8p' ).transition( { scale:3.5, opacity: 0 }, 'slow', 'easeInOutExpo', function() {
        jQuery( this ).addClass( 'zoomed' );

        jQuery( this ).hide();

        setTimeout( function() {
            jQuery( 'html' ).css( { overflow: 'auto' } );
            jQuery( 'body' ).removeClass( 'no-overflow' );
        }, 100 );
    });

    jQuery( '#menugrayout' ).fadeIn();
    jQuery( '#menugrayout' ).addClass( 'no-close' );

    setTimeout( function() {
        autoScrollGallery();
    }, 600 );
}

function _centerDiv( $div ) {
    //Center
    $div.css( { marginLeft: - $div.outerWidth() / 2,
                top: '50%',
                marginTop: - $div.outerHeight() / 2 } );
//
//    //Top cannot be < 0
//    var dheight = document.documentElement.clientHeight;
//    var height = $div.height() + jQuery( 'nav' ).height() * 2;
//    if( $div.is( ':visible' ) || height > dheight ) {
//        var top = $div.offset().top;
//
//        if( top < jQuery( 'nav' ).height() ) {
//            setTimeout( function() {
//                $div.css( { top: jQuery( 'nav' ).height() * 2, 'margin-top': 1 } );
//            }, 100 );
//        }
//    }

    $div.css( { opacity: 1 } );
}

function adjustScrollArea( marker ) {
    if( marker == undefined ) marker = false;

    jQuery( "#content .container" ).css( { height: '', width: '' } );
    jQuery( "#content .scroll" ).css( { height: '', width: '' } );
    jQuery( "#content .container .subcontent" ).css( { height: '', width: '' } );

    //Get the maximum height
    max = getMaxHeight( "#content .container .subcontent" );
    if( max > 400 ) max = 400;

    var maxWindowHeight =  document.documentElement.clientHeight - 50;
//    if( max < maxWindowHeight ) maxWindowHeight;
    if( max > maxWindowHeight ) max = maxWindowHeight;

    if( marker ) {
        max = jQuery( "#content" ).closest( '.parallax' ).height() - 60;
    }

    var $sub = jQuery( "#content .container .subcontent" );
    $sub.css( { height: max } );

    //Set the height
    jQuery( "#content .container, #content .container .scroll" ).height( max );

    //Set the width of each content
//    var w = jQuery( "#content .container" ).width() - 4;
    var w;
    if( ! marker ) {
        w = jQuery( ".zactive #content .container" ).width() + 6;
    } else {
        w = jQuery( "#content .container .subcontent" ).width() + 6;
    }

    $sub.width( w );

    //Set the height of scroolbar
    $sub.each( function() {
        $this = jQuery( this );
        $row = jQuery( this ).find( '.row' );

        //if the containing row < subcontent height no need to scroll
        if( $row.outerHeight() < $this.height() )
            $this.addClass( 'noscroll' );
        else
            $this.removeClass( 'noscroll' );

        //Set the scrollbar draggable height
        //TODO: Change the height in according to row height ( smoller for bigger one )
        var h = $this.find( '.row' ).height() - $this.find( '.scrollbar' ).height();
        h = 100;
        $this.find( '.draggable' ).height( h );
    });

    //Set the size of scroll area = sum of child
    var w = (w * $sub.length ) + 20;
    jQuery( "#content .container .scroll" ).width( w );

    //Hide the content row
    if( ! jQuery( '.single3d-content' ).hasClass( 'initialized' ) )
        jQuery( '.single3d-content' ).css( { visibility: 'visible' } ).hide();

    $div = jQuery( '.single3d-content' );
    $div.css( { marginLeft: - $div.width() / 2, marginTop: - $div.height() / 2 } );
    $div.addClass( 'initialized' );
}

function scrollAreaContentTo( dir ) {
    //Get the ## subcontent
    var $current = jQuery( "#content .container .subcontent.active" );
    var sub = jQuery( "#content .container .subcontent" ).get( $current.index() + dir );
    var $sub = jQuery( sub );

//    var left = jQuery( "#content .container .scroll" ).position().left;
//    left -= jQuery( "#content .container" ).width() * dir;
    left = jQuery( "#content .container" ).width() * $sub.index() ;
    left = - ( left + 10 * $sub.index() );
    if( left > 0 ) left = 0;

    //End or start
    if( $sub.length <= 0 ) return;

    $current.removeClass( 'active' );
    $sub.addClass( 'active' );

    //Highlith the left menu
    jQuery( '.leftmenu > li' ).removeClass( 'active' ); //Disable the current one
    var li = jQuery( '.leftmenu > .item' ).get( $sub.index() );
    jQuery( li ).addClass( 'active' );

    //On the first item hide Prev button
    if( $sub.index() == 0 )
        jQuery( '#content .controls .prev' ).addClass( 'hide' );
    else
        jQuery( '#content .controls .prev' ).removeClass( 'hide' );

    //On the last item hide next button
    if( $sub.index() >= jQuery( "#content .container .subcontent" ).length - 1 )
        jQuery( '#content .controls .next' ).addClass( 'hide' );
    else
        jQuery( '#content .controls .next' ).removeClass( 'hide' );

    jQuery( "#content .container .scroll" ).stop( true, true ).animate( { left: left }, 800, 'easeInOutExpo' );
}

var _sid;
function autoScrollGallery() {
    clearInterval( _sid );

    if( ! jQuery( '#about' ).hasClass( 'zactive' ) ) return;

    _sid = setInterval( function() {
//    jQuery( '.gallery-column .controls a' ).click( function() {
//        var $this = jQuery( this );
        var $active = jQuery( '.wiref3 .active' );
//        var dir = $this.hasClass( 'next' ) ? -1 : 1;   //Right to left ( next )
        var dir = -1;   //Right to left ( next )
        var index = $active.index();
        var next = jQuery( '.wiref3 img' ).get( index + dir );
        var $next = jQuery( next );

        if( $next.length <= 0 ) {
            $next = ( dir > 0 ) ? $next = jQuery( '.wiref3 img' ).first() : $next = jQuery( '.wiref3 img' ).last();
        }

        $next.css( { left: - $next.width() * dir } );
        $active.stop( true, true ).animate( { left: $active.width() * dir, opacity: 0 }, 800, 'easeInOutExpo' );
        $next.stop( true, true ).animate( { left: 0, opacity: 1 }, 800, 'easeInOutExpo' );

        $active.removeClass( 'active' );
        $next.addClass( 'active' );
    }, 3000 );
}

//Gallery
jQuery( document ).ready( function() {
  //Next gallery
  jQuery( '#gallery .controls' ).click( function() {
    swapPage( jQuery( this ) );
  });

});

function swapPage( $div ) {
//  var $next;
  var dir = 1;   //direction. 1 - left, 2 - right
  var $active = $div.closest( '.parallax' ).find( '.content .active' );

  if( $div.attr( 'id' ) == "next" ) {
    //Get the next div
    $next = $active.next();
    if( $next.length == 0 ) $next = jQuery( '#gallery .content > div' ).first();

    dir = 2;
  } else {
    //Get the previous div
    $next = $active.prev();
    if( $next.length == 0 ) $next = jQuery( '#gallery .content > div' ).last();
  }

  $next.show().css( 'top', '' );

  //Move the next div after the active one
  if( dir == 2 )  {
    $next.css( { left: $next.width(), top: -$next.position().top, opacity: 0 } );

    $active.animate( { left: - $active.width(), opacity: 1 }, 'slow', 'easeInOutExpo'  ).removeClass( 'active' );
    $next.show().animate( { left: 0, opacity: 1 }, 'slow', 'easeInOutExpo' ).addClass( 'active' );
  } else {
    $next.css( { left: -$next.width(), top: -$next.position().top, opacity: 0 } );

    $active.animate( { left: $active.width(), opacity: 1 }, 'slow', 'easeInOutExpo'  ).removeClass( 'active' );
    $next.show().animate( { left: 0, opacity: 1 }, 'slow', 'easeInOutExpo' ).addClass( 'active' );
  }
}

//To Search / To Let
jQuery( document ).ready( function() {
    jQuery( '.dot-search .sale-let a' ).click( function() {
        jQuery( '.dot-search .sale-let a' ).removeClass( 'active' );

        jQuery( this ).addClass( 'active' );
        jQuery( '.dot-search .beds' ).animate( { height: jQuery( '.dot-search .beds' ).data( 'height' ), opacity: 1 }, 'fast' );

        var status = jQuery( this ).data( 'status' );

        //Change status in the link
        jQuery( '.dot-search .beds a' ).each( function() {
            var href = jQuery( this ).attr( 'href' );
            var re = /status.*$/;

            href = href.replace( re, "status=" + status );
            jQuery( this ).attr( 'href', href );
        });

        return false;
    });

    jQuery( '.dot-search .beds' ).each( function() {
        jQuery( this ).data( 'height', jQuery( this ).height() ).animate( { height: 0, opacity: 0 }, 0 );
    });
});

/*
 * Change the number of visibles images in according to crrent screen size
 */
function adjustGallery( show ) {
    $gallery = jQuery( '#gallery' );
    if( $gallery.length <= 0 ) return;

    if( show == undefined &&
        ! $gallery.hasClass( 'zactive' ) ) return;

    $gallery.css( { opacity: 0, minHeight: '', maxHeight: '' } ).show();

    /*
     * After removed minHeight, height properties I have to wait
     */
    setTimeout( function( a ) {
        _adjustGallery( a );
    }, 300, show );
}

function _adjustGallery( show ) {
    $gallery = jQuery( '#gallery' );

    //How many images in a row and in a column?
    var width = $gallery.width() - 80;
    var height = $gallery.height() - 80;
    var row = Math.floor( width / jQuery( '#gallery img' ).first().width() );
    var col = Math.floor( height / jQuery( '#gallery img' ).first().height() );
    if( col < 1 ) col = 1;
    if( row < 1 ) row = 1;
    var max = row * col;
    if( max > 6 ) max = 6;
//    console.log( max, width, height );

    //If the max number is the some, skip the "adjstments"
    if( max != $gallery.data( 'max-items' ) ) {
        $gallery.data( 'max-items', max );

        //Move all the extra images in other <div>
    //    jQuery( '#gallery' ).hide();
        var $images = jQuery( '#gallery img' );

        //Append all the images in the main "container"
        jQuery( '#gallery .content' ).append( $images );

        //Remove all the actual divs
        jQuery( '#gallery .content div' ).remove();

        $div = jQuery( '<div>' ).addClass( 'active' );

        $images.each( function( i ) {
            $img = jQuery( this );
            if( i > 0 && i % max == 0 ) {
                jQuery( '#gallery .content' ).append( $div );
                $div = jQuery( '<div>' );
            }

            $img.detach();

            $p = jQuery( '<p>' ).append( $img );
            $div.append( $p );
        });

        jQuery( '#gallery .content' ).append( $div );
    }

    maxH = getMaxHeight( jQuery( '#gallery .content > div' ) );
//    console.log( maxH );
    $gallery.css( { maxHeight: maxH, minHeight: maxH } );

    if( show ) {
        parallaxAnimate( '#gallery' );
    }

    setTimeout( function() {
        _centerDiv( $gallery );
    }, 300 );
}

//Search
jQuery( document ).ready( function() {
    //Next gallery
    jQuery( '#search #content .beds a' ).click( function() {
        jQuery( '#search #content .beds a' ).removeClass( 'active' );

        jQuery( this ).addClass( 'active' );
    });

});

function submitSearchForm() {
    //Beds
    var beds = jQuery( '#search #content .beds .active' ).data( 'beds' );
    jQuery( 'input[name="beds"]' ).val( beds );

    document.getElementById('devsearch').submit();
}

//Map plan
jQuery( document ).ready( function() {
    jQuery( '#mplan .block img' )
    .mouseover( function() {
        _babylonSetMeshOpacity( 0.1, jQuery( this ).data( 'block' ) );
    })
    .mouseout( function() {
        var id = ( ! model.isSubmodel ) ? undefined : jQuery( '#mplan .active.block img' ).data( 'block' );

        _babylonSetMeshOpacity( ( ! model.isSubmodel ) ? 1 : 0.1, id );
    }).click( function() {
        if( jQuery( this ).hasClass( 'active' ) ) return;

        jQuery( '#mplan *' ).removeClass( 'active' );
        var id = jQuery( this ).data( 'block' ) ;
        for( var i = 0; i < meshes.length; i++ ) {
            var mesh = meshes[i];
            var name = mesh.name;

            if( id != undefined && name[0] == "!" ) {
                res = name.match(/!(\d*)/g);
                n = res[0].substr( 1 );

                if( n == id ) {
                    _babylonOpenUrl( mesh );

                    break;
                }
            }
        }
    });
});

/*
 * To avoid strange render issues when change the mesh opacity
 * I need to hide only materials name that end with "__"
 */
var _animId = 0;
function _babylonSetMeshOpacity( end, id ) {
    var materials = new Array();
    var mnames = new Array();

    for( var i = 0; i < meshes.length; i++ ) {
        var mesh = meshes[i];
        var name = mesh.name;

//        console.log( name, mesh.material );
        if( mesh.material == undefined ) continue;

        var to = end;
        var from = mesh.material.alpha;

        if( name[0] == "!" ) {
            res = name.match(/!(\d*)/g);
            n = res[0].substr( 1 );

            if( n == id ) {
                to = 1;
            }

            mesh.material._gj_endValue = to;
            mesh.material._gj_startValue = from;

            materials.push( mesh.material );
        }

        //Don't add more times the same material
        if( mesh.material.name.substr( -2 ) == "__" &&
            mnames.indexOf( mesh.material.name ) <= 0 ) {
            mesh.material._gj_endValue = to;
            mesh.material._gj_startValue = from;

            materials.push( mesh.material );

            mnames.push( mesh.material.name );
        }
    }

    for( var i = 0; i < materials.length; i++ ) {
        materials[i]._gj_alphaAnim = _animId;

        _babylonAnimateAlpha( _animId, materials[i] );
    }

    ++_animId;
}

function _babylonAnimateAlpha( animId, material ) {
    jQuery( {  alpha: material._gj_startValue } ).animate( { alpha: material._gj_endValue }, {
        step: function( val ) {
            //Stop previous animations
            if( material._gj_alphaAnim != animId ) return;

//            console.log( val );
            material.alpha = val;
        }
    }, 2000 );
}


function _js_scrollbar_init( $this ) {
//  $this.show();

  var h = $this.outerHeight();

  diff = jQuery( '.scroll-me li' ).outerHeight();
  diff *= jQuery( '.scroll-me li' ).length;

  $this.data( 'over', h - diff );

  //Set the height of the draggable
  $this.parent().find( '.draggable' ).height( $this.height() - ( diff - h ) - 20 );

  $this.hide();
}


/**
 * Load the floormap info for the single development
 */
//Change the floor
jQuery( 'body' ).on( 'click', '#floormap .side li', function() {
    jQuery( this ).parents( 'ul' ).find( 'li' ).removeClass( 'active' );
//    jQuery( '.floorsmenu li' ).removeClass( 'active' );
    jQuery( this ).addClass( 'active' );

    if( jQuery( this ).parents( 'ul' ).hasClass( 'floorsmenu' ) )
        gj_show_floormap( jQuery( this ).index() + 1 );

    return false;
}).on( 'click', '.floor-dot', function() {
    $this = jQuery( this );

    jQuery( '.floor-dot' ).removeClass( 'active' ).addClass( 'noactive' );
    $this.removeClass( 'noactive' ).addClass( 'active' );

    gj_show_property_details( $this );
});

var _ajax_floor_data = null;
function gj_load_floor_map( postcode, floor, show, func ) {
    if( show == undefined ) show = true;
    $_show = show;

    //Callback function
    callbackFn = func;

    //Load the available floors
    if( jQuery( '#floormap' ).data( 'init' ) != 1 ) {
        jQuery.ajax({
            type : "post",
            url: _ajaxurl,
            data:  {
                action: 'get_apartments',
                postcode: postcode,
                floor: floor,
                nonce: _nonce
            },
            success: function( response ) {
                json = jQuery.parseJSON( response );

                jQuery( '#apartment-loading' ).fadeOut();

                _ajax_floor_data = json;

                if( $_show )
                    gj_show_floormap( floor );

                jQuery( '#floormap' ).data( 'init', 1 );

                //Is callback function set?
                if( callbackFn != undefined ) {
                    callbackFn.apply();
                }
            }
        });
    } else {
        if( show )
            gj_show_floormap( floor );
    }

    if( show ) {
        //Select the floor map on left menu
        jQuery( '.floorsmenu li' ).removeClass( 'active' );
        var li = jQuery( '.floorsmenu li' ).get( floor - 1 );
        jQuery( li ).addClass( 'active' );

        jQuery( '.floor-dot' ).hide();
        parallaxAnimate( '#floormap' );

        setTimeout( function() {
            gj_update_dot_position();
            jQuery( '.floor-dot' ).fadeIn();
        }, 600 );
    }
}

function gj_show_floormap( floor ) {
    //Remove all dots
    jQuery( '#property-details' ).fadeOut();
    jQuery( '.floor-dot' ).fadeOut( function() {
        jQuery( this ).remove();
    });

    var apartments = json[ floor ];
    if( apartments == undefined ) return;

    for(var key in apartments) {
        var a = apartments[ key ];

        //Set the image
        if( a.map != "" ) {
            var src = jQuery( '#floorimage' ).attr( 'src' );

            if( a.map != src ) {
                jQuery( this ).data( 'width', '' );

                jQuery( '#floorimage' ).one( 'load', function() {
                    var theImage = new Image();
                    theImage.src = jQuery( this ).attr( 'src' );

                    // Get accurate measurements from that.
                    jQuery( this ).data( 'width', theImage.width );
                    jQuery( this ).data( 'height', theImage.height );

                    jQuery( this ).fadeIn();

                    if( jQuery( '#riverview' ).data( 'active' ) == 1 )
                        jQuery( '#riverview' ).fadeIn();

                    gj_update_dot_position();
                    adjustScrollArea();
                }).attr( 'src', a.map );
            }
        }

        if( a.coords != "" ) {
            $dot = jQuery( '<div>' );

            $coords = a.coords.split(",");
            $dot.addClass( 'floor-dot dot-id-' + a.id )
                    .data( 'left', $coords[0] )
                    .data( 'top', $coords[1] );

            $pulse = jQuery( '<div>' ).addClass( 'dot pulse' );
            $dot.append( $pulse );

            for( var k in a ) {
                $dot.data( k, a[ k ] );
            }

            jQuery( '#floorimage' ).after( $dot );
        }
    }

    gj_update_dot_position();
}


//Set the dot position on window resize
function gj_update_dot_position() {
    var $img = jQuery( '#floorimage' );

    if( $img.data( 'width' ) == undefined ) {
        return;
    }

    jQuery( '.floor-dot' ).each( function() {
        var $dot = jQuery( this );

        //Absolute position
        var ratioW = $img.width() / $img.data( 'width' );
        var ratioH = $img.height() / $img.data( 'height' );
        var l = $dot.data( 'left' ) * ratioW + jQuery( '#floorimage' ).position().left;
        var t = $dot.data( 'top' ) * ratioH+ jQuery( '#floorimage' ).position().top;

        jQuery( this ).fadeIn().css( { left: l, top: t } );
    });
}

/**
 * Show the property details
 */
function gj_show_property_details( $this, $div, height ) {
    if( $div == undefined ) $div = '#property-details';
    if( height == undefined ) height = 5;

    $p = jQuery( $div );

    $p.find( '.featured' ).attr( 'src', $this.data( 'featured' ) );
    $p.find( '.title' ).html( $this.data( 'title' ) );
    $p.find( '.price' ).html( $this.data( 'price' ) );

    //Remove the existings bullets
    $p.find( 'ul.bullets' ).children().remove();

    //Bullets ( featured details )
    var bullets = $this.data( 'bullets' );
    for( var k in bullets ) {
        var $li = jQuery( '<li>' ).html( bullets[ k ] );

        $p.find( 'ul.bullets' ).append( $li );
    }

    jQuery( '#property-details' ).show();

    //Set the same height for all items
    max = getMaxHeight( "ul.bullets > li" ) + height;
    $p.find( "ul.bullets > li" ).height( max );

    $p.find( 'a' ).attr( 'href', $this.data( 'link' ) );

    jQuery( '#property-details' ).fadeIn();
}

/**
 * Show the property floormap in the 3D popup
 */

function gj_show_property_floormap( mesh ) {
    var $div = jQuery( '#property-tooltip' );

    $div.find( '.title' ).html( mesh.data( 'title' ) );
    // $div.find( '.price' ).html( mesh.data( 'price' ) );

    $div.find( 'img.map' ).attr( 'src', mesh.data( 'map' ) );

    //Dot position
    var pcoords = mesh.data( 'dcoords' );
    var x = Math.abs( pcoords.z * 100 );
    var y = 100 - Math.abs( pcoords.x * 100 );
    // var y = Math.abs( ( pcoords.z * 100 ) - 50 );
    // console.log( x, ( pcoords.x * 100 ), pcoords.x );
    // console.log( y, ( pcoords.z * 100 ), pcoords.z );

    var $dot = $div.find( '.apartment-dot' );
    $dot.css( { left: x + '%', top: y + '%' } );
    $dot.show();

    //Featured
    $div.find( '.featured' ).css( { background: 'url(' + mesh.data( 'featured' ) + ') 50% 50% no-repeat' } );

    //Excerpt
    $div.find( '.excerpt' ).html( mesh.data( 'excerpt' ) );

    $div.fadeIn();
}

function getMaxHeight( id ) {
    var heights = jQuery( id ).map(function ()
    {
        return jQuery(this).height();
    }).get(),

    maxHeight = Math.max.apply(null, heights);

    return maxHeight;
}

//Knowledge page
function initAzLayout() {
  var $az = jQuery( '#az-list');
  var w = $az.find( 'li' ).outerWidth();

  //Get the active li
  var $active = $az.find( '.active' );
  jQuery( '#az-list .selector' ).width( w - 4 ).css( { left: $active.offset().left } ).animate( { opacity: 1 } );
}

jQuery( document ).ready( function( $ ) {
  if( $( '#az-list').length > 0 ) {
    jQuery(window).resize( function() {
      initAzLayout();
    });
  }
});

jQuery( document ).ready( function( $ ) {

  //Move the scroller
  $( '#az-list li').mouseenter( function() {
    moveSelectorTo( $( this ) );
  }).click( function() {
    $( '#az-list li' ).removeClass( 'active' );
    $( this ).addClass( 'active' );
  });

  $( '#az-list ul').mouseleave( function() {
    var $active = $( '#az-list li.active' );
    moveSelectorTo( $active );

    $active.removeClass( 'pulse' );
  });

  //Preload the data
  $( '#az .block' ).each( function() {
    loadKnowledgeData( $( this ) );
  });

  //Load item data
  $( '#az .block' ).click( function() {
    //Abort previous request
    if( _xhr ) _xhr.abort();

    var $this = $( this );
    $( '#az .block' ).not( $this ).addClass( 'inactive' );

    jQuery( '#menugrayout' ).addClass( 'no-close' ).fadeIn();

    var $div = $this.clone();
    $div._original = $this;

    $div.show().addClass( 'full-block' ).css( { left: $this.offset().left, 
                                                top: $this.offset().top,
                                                width: $this.outerWidth(),
                                                height: $this.outerHeight() } );
    jQuery( 'body' ).append( $div );
    jQuery( this ).transit( { scale: 0, opacity: 0 }, 0 );

    //Hide the items
    jQuery( '.mb50.mt8p .block' ).each( function( i ) {
      var $this = jQuery( this );

      if( $this != $div._original ) {
       $this.delay( 60 * i ).transit( { scale: 0, opacity: 0 }, 'fast', 'easeInBack', function() {
          jQuery( this ).css( 'opacity', '' ); 
        } );
      }
    });

    if( $div._original.data( 'xhr' ) == undefined ) {
      loadKnowledgeData( $div._original, $div );
    } else {
      showMarkerDetails( $div._original.data( 'xhr' ), false );

      showKnowledgeDetail( $div );
    }
  });

  //Revert the animation
  $( 'body' ).on( 'click', '#markerDetails.no-transition .x-close', function() {
    var $marker = jQuery( '#markerDetails' );

    jQuery( '#markerDetails' ).transit( { x: 0, 
                                          y: 0, 
                                          scale: 0.2, 
                                          rotateY: '90deg' }, 'fast', 'linear', function() {
        $( '#menugrayout' ).fadeOut();

        jQuery( '#markerDetails' ).removeClass( 'no-transition' ).find( '.x-close' ).removeClass( 'no-close' );

        var $src = jQuery( '.full-block' )._original;
        jQuery( '.mb50.mt8p .block' ).each( function( i ) {
          $this = jQuery( this );

          if( $this != $src ) {
            $this.delay( 60 * i ).transit( { scale: 1, opacity: 1 }, 'fast', 'easeOutBack' );
          }
        });

        jQuery( '.full-block' ).transit( { x: 0, y: 0, perspective: '500px', rotateY: '0deg', scale: 1  }, 'fast', function() {
          $this = jQuery( this );

          jQuery( $this._original ).transit( { scale: 1, opacity: 1 }, 0 );
          $this.remove();
        } );
    });
  });

});

function moveSelectorTo( $li ) {
  $active = jQuery( '#az-list li.active' );
  if( $active != $li ) {
    $active.addClass( 'pulse' );
  } else {
    $active.removeClass( 'pulse' );
  }

  jQuery( '#az-list .selector' ).stop( true, false ).animate( { left: $li.offset().left } );
}

function loadKnowledgeData( $src, $clone ) {
  var $div = $clone;
  var $original = $src;

  _xhr = jQuery.ajax({
      type : "post",
      url: _ajaxurl,
      data:  {
          action: 'get_knowledge_details',
          id: $original.data( 'id' ),
          nonce: _nonce
      },
      success: function( response ) {
          var json;

          try {
              json = jQuery.parseJSON( response );
          } catch( err ) {
              return false;
          }

          var data = { _details: json };

          $src.data( 'xhr', data );

          if( $div != undefined ) {
            showMarkerDetails( data, false );

            showKnowledgeDetail( $div );
          }
      }
  });
}

function showKnowledgeDetail( $div ) {
  //Calculate the center position
  var cx = ( document.documentElement.clientWidth - $div.width() ) / 2;
  var x = ( cx - $div.position().left ) / 2;

  var cy = ( document.documentElement.clientHeight - $div.height() ) / 2;
  var y = ( cy - $div.position().top ) / 2;

  //MarkerDetails 
  var $marker = jQuery( '#markerDetails' );

  //Marker center
  var left = ( document.documentElement.clientWidth - $marker.outerWidth() ) / 2;
  var top = ( document.documentElement.clientHeight - $marker.outerHeight() ) / 2;

  $marker.addClass( 'no-transition az-marker' )
        .css( { left: $div.position().left + x, top: $div.position().top + y } )
        .transit( { perspective: '500px', rotateY: '90deg', scale: 0.2, opacity: 1 }, 0 )
        .data( 'left', left ).data( 'cx', $div.position().left + x )
        .data( 'top', top ).data( 'cy', $div.position().top + y )
        .find( '.x-close' ).addClass( 'no-close' );

  jQuery( $div ).transit( { x: x, y: y, perspective: '500px', rotateY: '-90deg', scale: 1.5  }, 'fast', 'linear', function() {
    var x = $marker.data( 'left' ) - $marker.data( 'cx' );
    var y = $marker.data( 'top' ) - $marker.data( 'cy' )

    jQuery( '#markerDetails' )
          .transit( { x: x, y: y, scale: 1, opacity: 1, rotateY: '0deg' }, 'fast', 'linear' );
  });
}

