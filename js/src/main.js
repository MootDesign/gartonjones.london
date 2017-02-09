/*jslint sloppy: true*/
/*global $, jQuery, alert*/
function showShade(delay, noClose) {
	if (delay === undefined) {
        delay = 0;
    }
    
	if (noClose === true) {
        jQuery('#shade').addClass('no-close');
    }

	jQuery('#shade').delay(delay).fadeIn();
}

function hideShade(delay) {
	if (delay === undefined) {
        delay = 0;
    }

	jQuery('#shade').delay(delay).removeClass('no-close').fadeOut();
}
jQuery(document).ready(function ($) {
	$('#shade').click(function (e) {
        e.preventDefault();

		if ($(this).hasClass('no-close')) {
            return;
        }

        if ($('.close-me.visible').length > 0) {
            $('.close-me.visible').find('.button-close.open').trigger('click');
        } else {
            $('.close-me').fadeOut();
        }

		hideShade();
	});

    //Hide-Show offices in the footer
    $("#offices-btn").on("click", function (e) {
        e.preventDefault();

        if ($(window).width() < 768 && $('body').hasClass('blog')) {
            $('.c-panel-link a').trigger('click');
        }

        if (!$('#foot').hasClass('expanded')) {
            var $foot = $('#foot'),
                officesHeight = -10; // 20 margin is excess. We don't want to count it in

            // get the total offices height
            $foot.find('.office').each(function () {
                officesHeight += $(this).outerHeight(true);
                if (officesHeight > 230) {
                    officesHeight = 230;
                }
            });

            if (($('body').hasClass('single-post') || $('body').hasClass('page-template-quicklinks-new')) && $(window).width() < 768) {
                officesHeight = 200;
                $('.clickarea').trigger('click');
            }


            $("#arrow").html('&#9650;');
            $foot.height(officesHeight).addClass('expanded');

            // make the cookies go up
            $('.cookies').animate({
                bottom: officesHeight
            }, 300, 'swing');
        } else {
            $('#foot').css({ height: '' }).removeClass('expanded');
            $("#arrow").html('&#9660;');

            $('.cookies').animate({
                bottom: 30
            }, 300, 'linear');
        }
        // $("html, body").animate({ scrollTop: $(document).height() }, "slow");
        return false;
    });

    //Hide-Show development menu
    $("#development-responsive-menu").on("click", function (e) {
        e.preventDefault();

        if (!$('#responsive-dev-menu').is(':visible')) {
            $('#responsive-dev-menu').slideDown(500);
        } else {
            $('#responsive-dev-menu').slideUp(500);
        }
    });

    //Hide-Show team member details
    $(".close-open-details").click(function (e) {
        e.preventDefault();

        $(this).closest(".team-tale-details").slideUp(1000);
    });
});

function showClose(delay, parent) {
    if (delay === undefined) {
        delay = 0;
    }
    if (parent === undefined) {
        parent = 'body';
    }

    setTimeout(function () {
        jQuery(parent).find('.button-close').addClass('open');

        setTimeout(function ($parent) {
            $parent.find('.bg').addClass('open');
        }, delay, jQuery(parent));
    }, delay);
}

jQuery(document).ready(function () {

    /*
     * Grab the .button-close-me click event.
     * If there is any parent with "close-me" class I will close it, otherwise I just ignore the event
     */
    jQuery('.button-close').click(function (e) {
        e.preventDefault();

        if (jQuery(this).parents('.team-info.reveal-modal.open').length > 0) {
            return false;
        }

        if (jQuery(this).parent().attr('id') === 'fees') {
            jQuery('.responsive-grid .item').removeClass('no-flip');
        }

        jQuery(this).removeClass('open');
        jQuery(this).find('.bg').removeClass('open');

        var $parent = jQuery(this).closest('.close-me');
        if ($parent.hasClass('no-close')) {
            return;
        }

        //nothing to do
        if (!$parent) {
            return;
        }

        // if ( jQuery( this ).hasClass( 'button-close' ) ) {
        setTimeout(function () {
            $parent.addClass('close').removeClass('visible open');
            $parent.find('.bg').removeClass('visible');
            hideShade();
        }, 600);
    });
});


/**
 * This function was written originally for parallax page ( about-us )
 */
function animateVisibleContent() {
    /**
     * check if the hidden items are visible, if so show it
     */
    jQuery('.show-me').each(function () {
        //Adjust the left position by adding the left value of the 3d transform
        var offset = jQuery(this).offset().left + getMatrixM41(this),
            offsetRight = offset + this.offsetWidth,
            $animatables = jQuery(this).find('.animate-me'); //Animatable elements

        if (offset >= 0 && offsetRight <= window.innerWidth) {
            //In some cases I can't use delay, for examples on link, otherwise the color change will takes a lot...
            $animatables.each(function () {
                var $this = jQuery(this);

                //remove the reverted animation
                $this.removeClass($this.data('revert'));

                //I have to do it only the first time
                if ($this.data('delay')) {

                    //Still running the timeout?
                    if ($this.data('timeout') != 1) {
                        setTimeout(function ($e) {
                            $e.addClass('show');
                        }, $this.data('delay'), $this);
                    }

                    $this.data('timeout', 1);
                } else {
                    $this.addClass('show');
                }
            });

            // $animatables.addClass( 'show' );

        } else {
            // $animatables.removeClass( 'show' ).data( 'timeout', '' );
            $animatables.data('timeout', '');

            $animatables.each(function () {
                if (jQuery(this).data('revert')) {
                    jQuery(this).addClass(jQuery(this).data('revert'));
                } else {
                    jQuery(this).removeClass('show');
                }
            });
        }
    });
}

/**
 * based on http://jsfiddle.net/duopixel/wzZ5R/
 *
 * get the "transform" property using getComputedStyle and took off the element m41.
 * original code use webkit function, this will work on all browsers ( maybe )
 */
function getMatrixM41(e) {
    var transformer = window.getComputedStyle(e).transform,
        numberPattern = /[-0-9.]+/g, //match all the numbers
        matchNo;

    if (transformer !== undefined) {
        matchNo = transformer.match(numberPattern);

        // console.log( transform, match );
        return (matchNo === null) ? 0 : parseFloat(matchNo[5]);
    }
}

//Y
function getMatrixM40(e) {
    var transform = window.getComputedStyle(e).transform,
        numberPattern = /[-0-9.]+/g, //match all the numbers
        match = transform.match(numberPattern);

    return (match === null) ? 0 : parseFloat(match[4]);
}

/**
 * Return the total width of the selected items
 */
function getTotalWidth($e) {
    var width = 0;

    $e.each(function () {
        width += $e.outerWidth();
    });

    return width;
}


/**
 * Check if the browser is in fullscreen mode
 */
function isFullScreen() {
    return window.innerHeight === screen.height;
}

/**
 * Add the class .show on load
 */
function showOnload() {
    jQuery(window).load(function () {
        jQuery('.show-onload').each(function () {
            jQuery(this).addClass('show');
        });
    });
}

/**
 * Set cookie
 * @param {String}
 * @param {String}
 * @param {int}
 */
function setCookie(cname, cvalue, exdays) {
    var d = new Date(),
        expires;
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires + "; path=/";
}

/**
 * Get the cookie stored under cname
 * @param  {String}
 * @return {String}
 */
function getCookie(cname) {
    var name = cname + "=",
        ca = document.cookie.split(';'),
        i,
        c;
    for (i = 0; i < ca.length; i++) {
        c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

/**
 * Check if cookie is set
 * @return {null}
 */
function checkCookiePolicy() {
    var policy = getCookie("cookiePolicy");
    if (!policy) {
        // show the cookie policy
        jQuery('.cookies').removeClass('hide').addClass('show');
        jQuery('.cookies .button-close').click(function () {
            policy = true;
            setCookie("cookiePolicy", policy, 31622400); // 1 year :)
			jQuery('.cookies').addClass('hide');
        });

    }
}
