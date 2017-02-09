 ( function( $ ) {
    function mapImage( $selector, $widthPercentage, $position, $maxWidth, $conditionToPlay, $conditionToCompare, $noMusic, $credit ) {
        if ( $widthPercentage === undefined ) {
            $widthPercentage = 0;
        }
        if ( $position === undefined ) {
            $position = 'left';
        }
        if ( $maxWidth === undefined ) {
            $maxWidth = 'auto';
        }
        if ( $noMusic === undefined ) {
        	$noMusic = false;
        }

        if ( $credit === undefined ) {
        	$credit = '';
        }

        if ( $conditionToPlay === undefined ) {
        	$conditionToPlay = null;
        }

        if ( $conditionToCompare === undefined ) {
        	$conditionToCompare = null;
        }

        $( $selector ).each( function() {
          var $this = $( this );

          /*
           * data-limit means how many times a sound can be played...
           * Check if is set and if so, check how many times left there are...
           */
          var limit = $this.data( 'limit' );
          if( limit ) {
              var times = parseInt( $this.data( 'times' ) );

              //Nothing to do?
              if( times > limit ) return;
          }

          // count the percentage of img we should put the overlay on.
          // its better to use percentage rather than px, because of responsive issues.
          var widthPer;
          if ( $widthPercentage !== 0 ) {
              widthPer = ( $this.width() * $widthPercentage / 100 );
          } else {
              widthPer = 0;
          }

          // get the img offset. It will determine the position of our overlayed div
          var imgOffset = $this.offset();
          if( imgOffset === undefined ) return;

      		if ( imgOffset.top === 0 && imgOffset.left === 0 ) {
      			return; // the paralax will set all divs with offset 0:0 if its not in the current or next/prev slide.
      		}

          // create overlayed div just before the body, so it will be on top of anything... we need to make sure that it's behind the top and bottom navigation... & left nav & text as well...
          var imgWidth = $this.width() - widthPer;
          var imgHeight = $this.height();

          var imgClass = $selector.replace( '.', '' );

          // we should check which side should the smaller overlay go...
          var musicSelector;
          if ( $position == 'left' ) {
              // pos = 0;

              musicSelector = $selector;
          } else if ( $position == 'right' ) {
              // pos = 1; // this is for fun :) later we can do something with it, but for now its not used
              imgOffset.left = imgOffset.left + ( $this.width() * ( 100 - $widthPercentage ) / 100 );

        			// if it goes to right, add the other half of width to the offset, so it will be positioned properly
              imgClass = imgClass + ' map-right'; // update the class variable, so later we can refer to that div

              musicSelector = $selector + '.map-right'; // .selector.map-right ... this is what the event is going to be called uppon
          }


          // put the audio inside the div :)
          /**
           * we need to check which audio to put.
           * Left is default. ( data-audio )
           * Right has to be set on separately ( data-audio-right )
           */
           // TODO: merge this with the other position check condition
          var audioSrc = $this.data( 'audio' );
          // console.log( audioSrc, $this.data( 'audio' ) );
          if ( $position != 'left' ) {
              audioSrc = $this.data( 'audio-right' );
          }
          var audio = '<audio src="' + audioSrc + '"></audio>';

          // TODO: don't search for data-audio if you don't need it...
          if ( $noMusic ) {
          	audio = '';
          }

          // put the div before the body and set parameters
          // here we put the audio inside the div, so it will be easier to play
          // menu and footer is z-index 10
          // TODO: automatically determine z-index of footer || header and set the overlays index acordingly
          $div = $( '<div>' ).addClass( 'map-image ' + imgClass ).html( audio );
          $div.data( 'selector', $this );

          $( 'body' ).append( $div );
          $( '.map-image' + musicSelector ).css({
              position: 'absolute',
              width: imgWidth,
              height: imgHeight,
              top: imgOffset.top,
              left: imgOffset.left,
              display: 'block',
              zIndex: 5,
              maxWidth: $maxWidth,
          });

          // play the audio... CHECK if map-image is on the screen... LATER
          // TODO: disable audio on touch devices... it would be very very very anoying
          // TODO: add a selector for fx music, background music so later on it can be turned on/off, set volume, etc.
	        if ( ! $noMusic ) {
		        $( '.map-image' + musicSelector ).mouseover( function() { // .map-image.musicSelector
		            var $sel = $( this ).data( 'selector' );
	            	if ( $conditionToPlay === null ||
	                $sel.data( $conditionToPlay ) == $sel.data( $conditionToCompare ) ) {  // so we can set a condition outside
		                //count how many times the sound is played
		                var times = $sel.data( 'times' ) || 0;
		                var limit = $sel.data( 'limit' );

		                if( limit && limit < times ) {
		                    return;
		                }

		                $( this ).find( 'audio' )[0].play();


		                $sel.data( 'times', ++times );
		            }
		        });
		    } else {
		    	if ( $credit ) {
			    	$( '.map-image' + musicSelector ).append('<div class="image-credit">Credit: <a href="' + $credit + '">' + $credit + '</a></div>');
				  }
		    }
	    });
    }

     $( '#parallax' ).on( 'startedMove', function() {
         $( '.map-image' ).remove();
    });

    $( '#parallax' ).on( 'finishedMove', function( e ) {
        if( $( '#parallax' ).hasClass( 'no-audio' ) ) return;

        mapImage( '.car' );
        mapImage( '.horse', 50 );
        mapImage( '.horse', 50, 'right' );
        mapImage( '.phone' );
        mapImage( '.guy1' );
        mapImage( '.guy2' );
        mapImage( '.bus' );
        mapImage( '.dog-pee-right', 43, 'left', 150, 'frame', 'frames');

        mapImage( '.spitfire' );

        // mapImage( '.queen', 0, 'left', 'auto', null, null, true, 'http://mootdesign.com' );
    });
})(jQuery);
