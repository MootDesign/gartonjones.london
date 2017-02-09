jQuery(document).ready(function( $ ){
    // quick fix :)
    $( '#videos' ).removeClass( 'video-start-me' );
    $( '#videos > video' ).attr( 'autoplay', '' );

    $( '#contact-offices > div' ).mouseenter( function() {
        // $( '#office-label' ).html( $( this ).data( 'title' ) );
    }).mouseleave( function() {
        // $( '#office-label' ).html( '' );
    }).click( function() {
        var videoId = this.dataset.video;

        if( videoId ) {
            var video = document.getElementById( videoId );
            $( video ).fadeIn();
            video.style.zIndex = 4;

            video.onended = function() {
                window.location.href = "/team/westminster/";

//                $( this ).fadeOut();
//
//                showContactForm();
            };

            video.play();

            return;
        }

        showContactForm();
    });

    $( '#handset' ).click( function() {
        //Set the current time to 0
        resetVideo( 'reverse' );
        resetVideo( 'receiver' );

        $( '#videos > video' ).removeClass( 'active' );
        $( '#receiver' ).addClass( 'active' );

        showShade( 1000, true );
        $( '#numbers' ).delay(1000).fadeIn();

        $( this ).hide();

        playVideo( 'receiver' );
    });

    function showContactForm() {
        showShade();

        $( '.row-contacts' ).fadeIn();
    }
    
    //Close the handset
    $( '#numbers .button-close-me' ).click( function() {
        $( '#videos > video' ).removeClass( 'active' );
        $( '#reverse' ).addClass( 'active' );

        hideShade();
        $( '#numbers' ).fadeOut();

        $( '#handset' ).show();

        setTimeout( function() {
            //Set the current time to 0
            resetVideo( 'receiver' );

            playVideo( 'reverse', function() {
                $( '#reverse' ).removeClass( 'active' );
                $( '#video' ).addClass( 'active' );
            } );
        }, 500 );
    });

    //Contact row?
    if( $( '.row-contact' ).length > 0 ) {
        showShade();
    }

    $( document ).on( 'click', '.bring-contact-form', function(e) {
        e.preventDefault();

        // filter url in regex
        var re = /#.*/;
        var str = $( this ).attr( 'href' );
        var m;

        if ((m = re.exec(str)) !== null) {
            if (m.index === re.lastIndex) {
                re.lastIndex++;
            }
            // View your result using the m-variable.
            // eg m[0] etc.
            
            if ( m[0] == '#southbank' ) {
                m[0] = '#south-bank';
            }
        }

        // bring the contact form in, depending on the href tag
        var href = m[0];
        var contactForm = $( href );

        window.location.hash = href;

        // make the close button :)
        $( '.office-chosen .button-close' ).addClass( 'open' );
        // console.log( contactForm );

        var offices = {
            '#westminster': {
                'name': 'Westminster Office',
                'slug': 'westminster',
                'link': '#westminster',
                'address': "49 Marsham Street\nWestminster\nLondon\nSW1P3DP",
                'phone': "0207 340 0480",
                'fax': '020 7117 3168',
                'email': 'info@gartonjones.com'
            },
            '#nine-elms': {
                'name': 'Nine Elms Office',
                'slug': 'nine-elms',
                'link': '#nine-elms',
                'address': "9 Albert Embankment\nLondon\nSE1 7SP",
                'phone': "hey",
                'fax': '020 7117 3168',
                'email': 'enquiry@gartonjones.com'
            },
            '#south-bank': {
                'name': 'South Bank Office',
                'slug': 'south-bank',
                'link': '#south-bank',
                'address': "9 Albert Embankment\nLondon\nSE1 7SP",
                'phone': "020 7735 1888",
                'fax': '020 7117 3168',
                'email': 'enquiry@gartonjones.com'
            },
            '#chelsea-bridge-wharf': {
                'name': 'Chelsea Bridge Wharf Office',
                'slug': 'chelsea-bridge-wharf',
                'link': '#chelsea-bridge-wharf',
                'address': "3 Oswald\nQueenstown Road\nLondon\nSW8 4NU",
                'phone': "020 7622 8800",
                'fax': '020 7117 4146',
                'email': 'sales@gartonjones.co.uk'
            }
        }

        var currentOffice = offices[ href ];

        $( '.office-chosen' ).removeClass( 'hide' );
        $( '.office-choser' ).addClass( 'hide' );
        // populate the content
        // 
        var activeOffice =  $( '.office-chosen' );
        activeOffice.find( '.office-name' ).text( currentOffice['name'] );
        activeOffice.find( '.office-address' ).text( currentOffice['address'] );
        // activeOffice.find( '.office-phone' ).attr( 'href', 'tel:' + currentOffice['phone'] ).html( "Call<br>" + currentOffice['phone'] );
        activeOffice.find( '.office-phone' ).html( "Call<br>" + currentOffice['phone'] );
        activeOffice.find( '.office-fax' ).attr( 'href', 'tel:' + currentOffice['fax'] ).text( 'Fax ' + currentOffice['fax'] );
        activeOffice.find( '.office-email' ).attr( 'href', 'mailto:' + currentOffice['email'] ).text( 'Email ' + currentOffice['email'] );
        activeOffice.find( '.contact-form' ).children().addClass('hide');
        activeOffice.find( '.contact-form' ).children( currentOffice['link'] ).removeClass('hide');
        activeOffice.find( '.office-image' ).attr( 'src', ('/wp-content/themes/new_theme/img/contact-tube-' + currentOffice['slug'] + '-double.png' ));
        activeOffice.find( '.small-offices a' ).removeClass( 'hide' );
        activeOffice.find( '.small-offices' ).find( '.' + currentOffice['slug'] ).addClass( 'hide' );
    });

    $( document ).on( 'click', '.back-link', function() {
        $( '.office-choser' ).removeClass( 'hide' );
        $( '.office-chosen' ).addClass( 'hide' );
    })

    if ( window.location.hash.length > 0 ) {
        var href = window.location.hash;

        $( '.tube-signs > div > a' ).each( function() {
            if ( $( this ).attr( 'href' ) == href ) {
                $( this ).trigger( 'click' );
            }
        });
    }
});
