/* global isRtl */
(function($) {
	var frame;

	$( function() {
		// Fetch available headers and apply jQuery.masonry
		// once the images have loaded.
		var $headers = $('.available-headers');

		$headers.imagesLoaded( function() {
			$headers.masonry({
				itemSelector: '.default-header',
				isRTL: !! ( 'undefined' != typeof isRtl && isRtl )
			});
		});

		// Build the choose from library frame.
		$('.choose-from-library-link').click( function( event ) {
			var $el = $(this);
			event.preventDefault();

			// If the media frame already exists, reopen it.
			if ( frame ) {
                frame = null;
			}

			// Create the media frame.
			frame = wp.media.frames.customHeader = wp.media({
				// Set the title of the modal.
				title: $el.data('choose'),

				// Tell the modal to show only images.
				library: {
					type: 'image'
				},

				// Customize the submit button.
				button: {
					// Set the text of the button.
					text: $el.data('update'),
					// Tell the button not to close the modal, since we're
					// going to refresh the page when the image is selected.
					close: false
				}
			});

			// When an image is selected, run a callback.
			frame.on( 'select', function() {
				// Grab the selected attachment.
				attachment = frame.state().get('selection').first(),
					link = $el.data('updateLink');

                // Update value of the targetfield input with the attachment url.
                $a = $el;
                $a.find( 'h3' ).html( '' );
                $a.parent().css( 'background-image', 'url(' + attachment.attributes.url + ')' );
                $a.parent().addClass( 'has-background' );

                $a.prev().val( attachment.id );
                frame.close();
                
                //Floor editor?
                $feditor = $( '#floor-editor' );
                if( $feditor.length > 0 ) {
                    $feditor.find( '.floor-selector' ).hide();
                    $feditor.find( 'img' ).attr( 'src', attachment.attributes.url );
                    $feditor.find( '.floor-editor' ).show();

                    //Store the info about original size
                    var theImage = new Image();
                    theImage.src = attachment.attributes.url;

                    // Get accurate measurements from that.
                    var imageWidth = theImage.width;
                    var imageHeight = theImage.height;

                    $feditor.find( 'img' ).data( 'width', imageWidth ).data( 'height', imageHeight );
                }

                frame = null;
			});

			frame.open();
		});
        
        $( 'a.remove-bg' ).click( function() {
            $( this ).closest( 'div' ).css( 'background-image', '' );
            $( this ).closest( 'div' ).find( 'input' ).val( '' );
            $( this ).closest( 'div' ).find( 'h3' ).html( 'Set background' );
            $( '.has-background' ).removeClass( 'has-background' );
        });
	});
}(jQuery));

(function($) {
    $( document ).ready( function() {
        $( '.floor-editor img' ).mousedown( function( e ) {
             if (parseInt(navigator.appVersion)>3) {
              var clickType=1;

              if (navigator.appName=="Netscape")
                  clickType=e.which;
              else
                  clickType=event.button;
             }

            var l = e.clientX - $(  '.floor-editor' ).offset().left - 10;
            var t = e.clientY - $(  '.floor-editor' ).offset().top - 20 + jQuery( window ).scrollTop();

            //I need to store the info in absolute position (natural width & height )
            var width = $( this ).width();
            var height = $( this ).height();

            //Image width & height
            var iwidth = $( this ).data( 'width' );
            var iheight = $( this ).data( 'height' );

            //Post page?
            var isPost = jQuery( '.floor-bg' ).length <= 0;

            var sl, st;

            if( ! isPost ) {
                sl = l / $( '.floor-bg' ).width();

                //calculate the "real" image height
                var height = $( '.floor-bg' ).data( 'width' ) / $( '.floor-bg' ).data( 'height' );
                height *= $( '.floor-bg' ).width();

//                st = t / $( '.floor-bg' ).height();
                st = t / height;

                l = ( sl * 100 ) + '%';
                t = ( t / $( '.floor-bg' ).height() * 100 ) + '%';

            } else {
                sl = l * iwidth / width;
                st = t * iheight / height ;
            }

            //! $( 'input[name="set-arrow"]' ).is( ':checked' )
            var $dot = ( clickType == 1 ) ?
                    $( '.floor-editor .dot.fdot' ) : $( '.floor-editor .dot.dot-direction' );
            $dot.show().css( { left: l,
                               top: t } ).data( 'left', sl ).data( 'top', st );

            var p = ( $( '.grid' ).length > 0 ) ? 100 : 1;
            var degree = ( $dot.data( 'degree' ) == undefined ) ? "" : "," + $( 'input[name="gj-dot-orientation"]' ).val();
            $( 'input[name="' + $dot.data( 'coords' ) + '"]' ).val( Math.round( sl * p, 2 ) + ',' + Math.round( st * p, 2 ) + degree );
        }).bind( 'contextmenu', function() {
            return false;
        });

        $( '.floor-editor' ).bind( 'contextmenu', function() {
            return false;
        });
    });

    $( window ).resize( function() {
        setTimeout( function() {
            UpdateDotPosition();

            updateArrowDirection();
        }, 200 );
    });

    $( document ).ready( function() {
        setTimeout( function() {
            UpdateDotPosition();

            updateArrowDirection();
        }, 200 );
    });
}(jQuery));

//Set the dot position on window resize
function UpdateDotPosition() {
    var $dot = jQuery( '.floor-editor .dot' );
    var $img = jQuery( '.floor-editor img' );
    var isPost = jQuery( '.floor-bg' ).length <= 0;

    var w = ( isPost ) ? $img.width() : $img.parent().width();
    var h = ( isPost ) ? $img.height() : $img.parent().height();

    //Absolute position
    var iwidth = ( isPost ) ? $img.data( 'width' ) : $img.parent().data( 'width' );
    var iheight = ( isPost ) ? $img.data( 'height' ) : $img.parent().data( 'height' );

    if( ! isPost ) {
        console.log( h );
        h = w * iwidth / iheight;
        console.log( h );
    }

    var ratioW = w / iwidth;
    var ratioH = h / iheight;

    var offset = ( isPost ) ? $img.position() : { left: 0, top: 0 };
    $dot.each( function() {
        var $this = jQuery( this );

        var l = $this.data( 'left' ) * ratioW + offset.left;
        var t = $this.data( 'top' ) * ratioH + offset.top;

        if( ! isPost ) {
//            l = ( l * 100 ) + '%';
            l = $this.data( 'left' ) * 100 + '%';
            t = ( t * 100 ) + '%';
        }

        $this.css( { left: l, top: t } );
    });
}


(function($) {
    $( document ).ready( function() {
        $( '.orientation input[type="radio"]' ).click( function() {
            $( 'input[name="gj-dot-orientation"]' ).val( $( this ).val() );

            updateArrowDirection();
        });

        //Adjust
        $( '.orientation .adjust a' ).click( function() {
            val = parseInt( $( 'input[name="gj-dot-orientation"]' ).val() );
            val += $( this ).data( 'value' );

            $( 'input[name="gj-dot-orientation"]' ).val( val );

            updateArrowDirection();
            return false;
        });

        $( 'input[name="gj-dot-orientation"]' ).on( 'change keyup mouseup click mousewheel', function() {
            updateArrowDirection();
        });

        $( '.gj-list a' ).click( function() {
            var data = $( this ).data( 'plans' );
            var imgs = data.split( ',' );
            var sizes = $( this ).data( 'sizes' ).split( ',' );

            var $ul = $( 'ul.floor-img' );

            $( '.gj-list li' ).removeClass( 'active' );
            $( this ).addClass( 'active' );

            $ul.children().remove();
            for( i = 0; i < imgs.length; i++ ) {
                var $li = $( '<li>' );
                var $img = $( '<img>' ).attr( 'src', imgs[ i ] );
                var size = sizes[ i ].split( 'x' );

                $img.data( 'width', size[ 0 ] ).data( 'height', size[ 1 ] );

                $li.append( $img );
                $ul.append( $li );
            }

            if( $ul.find( 'li' ).length == 1 ) {
                $ul.find( 'li img' ).trigger( 'click' );
            }

            return false;
        });

        //Set the image
        $( 'body' ).on( 'click', '.floor-img img', function() {
            var $this = $( this );
            var img = $this.attr( 'src' );
            var w = $this.data( 'width' );
            var h = $this.data( 'height' );

            $( '.floor-bg' ).css( "background", 'url(' + img + ') no-repeat'  ).data( 'width', w ).data( 'height', h );
        });
    });
}(jQuery));


function updateArrowDirection() {
    $arrow = jQuery( '.dot.dot-direction' );
    var degree = parseInt( jQuery( 'input[name="gj-dot-orientation"]' ).val() );

    $arrow.css({
        WebkitTransform: 'rotate(' + degree + 'deg)',
        '-moz-transform': 'rotate(' + degree + 'deg)',
        transform: 'rotate(' + degree + 'deg)'
    });

    if( jQuery( '.grid' ).length > 0 ) {
        var $input = jQuery( 'input[name="gj-direction-coords"]' );
        var value = $input.val().split( ',' );
        value[2] = jQuery( 'input[name="gj-dot-orientation"]' ).val();

        $input.val( value.join() );
    }
}
