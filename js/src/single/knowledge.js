// var slideItems = [];
//Knowledge page
var _recreate_coverflow = false;

function initAzLayout() {
	var $az = jQuery('#az-list');
	var w = $az.find('li').outerWidth();

	//Get the active li
	var $active = $az.find('.active');
	jQuery('#az-list .selector').width(w - 4).css({
		left: $active.offset().left
	}).animate({
		opacity: 1
	});
}

(function($) {
	// sort out iphone background-attachment: fixed issue....
	$(window).load(function() {    
		var theWindow        = $(window),
		    $bg              = $("#bg-body"),
		    aspectRatio      = $bg.width() / $bg.height();
		    			    		
		function resizeBg() {
			if ( (theWindow.width() / theWindow.height()) < aspectRatio ) {
			    $bg
			    	.removeClass()
			    	.addClass('bgheight');
			} else {
			    $bg
			    	.removeClass()
			    	.addClass('bgwidth');
			}
		}
		                   			
		theWindow.resize(resizeBg).trigger("resize");
	});
}(jQuery));

jQuery(window).load(function () {
	jQuery('.responsive-grid').trigger('reflow');
});

jQuery(document).ready(function ($) {
	if ($('#az-list').length > 0) {
		jQuery(window).resize(function () {
			initAzLayout();
		});
	}

	/**
	 * The strips
	 */
	$('.the-strips li').mouseenter(function () {
		$('#bg img').removeClass('active');
		$('#bg .' + $(this).data('image')).addClass('active');
	});

	//Swap the gallery
	$('.arrows > div').click(function () {
		var dir = $(this).hasClass('arrow-left') ? -1 : 1;
		var $active = $('.grid-view.active');
		var $next = (dir > 0) ? $active.next('.grid-view') : $active.prev('.grid-view');
		var activeClass = (dir > 0) ? 'next' : '';
		if ($next.length <= 0) return;

		$active.removeClass('next active').addClass(activeClass);
		$next.removeClass('next').addClass('active');
	});
});

jQuery(document).ready(function ($) {

	//Move the scroller
	$('#az-list li').click(function () {
		_recreate_coverflow = true;

		$('#az-list li').removeClass('active');
		$(this).addClass('active');

		//Filter the list
		var letter = $(this).data('item').toLowerCase();
		ajaxData.letter = letter;
		if (letter !== "") {
			$('#az .the-strips li').slideUp(function () {
				$(this).hide();
			});

			$('#az .the-strips li[data-letter="' + letter + '"]').stop(true, false).show().slideDown();

			//Filter category active?
			if (ajaxData.type && ajaxData.type !== '') {
				$('#grid li').addClass('hide-me');
				$('#grid li[data-category="' + ajaxData.category + '"],#grid li[data-type="' + ajaxData.type + '"]').each(function () {
					if ($(this).data('letter') == letter) {
						$(this).removeClass('hide-me');
					}
				});
			} else {
				$('#grid li').addClass('hide-me');
				$('#grid li[data-letter="' + letter + '"]').removeClass('hide-me');
			}
		} else {
			$('#az .the-strips li').slideDown();

			$('#grid li').removeClass('hide-me');

			//Filter category active?
			if (ajaxData.type && ajaxData.type !== '') {
				$('#grid li').addClass('hide-me');
				$('#grid li[data-category="' + ajaxData.category + '"]').removeClass('hide-me');
				$('#grid li[data-type="' + ajaxData.type + '"]').removeClass('hide-me');
			}
		}

		if ($('#map').is(':visible')) {
			$('#spinner').addClass('visible');
			gmapShowMarkers(map);
		}

		//Filter the coverflow
		if ($('#coverflow').is(':visible')) {
			recreate_coverflow(letter);
		}

		//Filter the grid
		$('.responsive-grid').trigger('reflow');
	});

	//Preload the data
	$('#az .block').each(function () {
		loadKnowledgeData($(this));
	});

	//Load item data
	$('#az .block').click(function () {
		//Abort previous request
		if (_xhr) _xhr.abort();

		var $this = $(this);
		$('#az .block').not($this).addClass('inactive');

		jQuery('#menugrayout').addClass('no-close').fadeIn();

		var $div = $this.clone();
		$div._original = $this;

		$div.show().addClass('full-block').css({
			left: $this.offset().left,
			top: $this.offset().top,
			width: $this.outerWidth(),
			height: $this.outerHeight()
		});
		jQuery('body').append($div);
		jQuery(this).transit({
			scale: 0,
			opacity: 0
		}, 0);

		//Hide the items
		jQuery('.mb50.mt8p .block').each(function (i) {
			var $this = jQuery(this);

			if ($this != $div._original) {
				$this.delay(60 * i).transit({
					scale: 0,
					opacity: 0
				}, 'fast', 'easeInBack', function () {
					jQuery(this).css('opacity', '');
				});
			}
		});

		if ($div._original.data('xhr') === undefined) {
			loadKnowledgeData($div._original, $div);
		} else {
			showMarkerDetails($div._original.data('xhr'), false);

			showKnowledgeDetail($div);
		}
	});

	//Revert the animation
	$('body').on('click', '#markerDetails.no-transition .x-close', function () {
		var $marker = jQuery('#markerDetails');

		jQuery('#markerDetails').transit({
			x: 0,
			y: 0,
			scale: 0.2,
			rotateY: '90deg'
		}, 'fast', 'linear', function () {
			$('#menugrayout').fadeOut();

			jQuery('#markerDetails').removeClass('no-transition').find('.x-close').removeClass('no-close');

			var $src = jQuery('.full-block')._original;
			jQuery('.mb50.mt8p .block').each(function (i) {
				$this = jQuery(this);

				if ($this != $src) {
					$this.delay(60 * i).transit({
						scale: 1,
						opacity: 1
					}, 'fast', 'easeOutBack');
				}
			});

			jQuery('.full-block').transit({
				x: 0,
				y: 0,
				perspective: '500px',
				rotateY: '0deg',
				scale: 1
			}, 'fast', function () {
				$this = jQuery(this);

				jQuery($this._original).transit({
					scale: 1,
					opacity: 1
				}, 0);
				$this.remove();
			});
		});
	});
});

function loadKnowledgeData($src, $clone) {
	var $div = $clone;
	var $original = $src;

	_xhr = jQuery.ajax({
		type: "post",
		url: _ajaxurl,
		data: {
			action: 'get_knowledge_details',
			id: $original.data('id'),
			nonce: _nonce
		},
		success: function (response) {
			var json;

			try {
				json = jQuery.parseJSON(response);
			} catch (err) {
				return false;
			}

			var data = {
				_details: json
			};

			$src.data('xhr', data);

			if ($div !== undefined) {
				showMarkerDetails(data, false);

				showKnowledgeDetail($div);
			}
		}
	});
}

function showKnowledgeDetail($div) {
	//Calculate the center position
	var cx = (document.documentElement.clientWidth - $div.width()) / 2;
	var x = (cx - $div.position().left) / 2;

	var cy = (document.documentElement.clientHeight - $div.height()) / 2;
	var y = (cy - $div.position().top) / 2;

	//MarkerDetails
	var $marker = jQuery('#markerDetails');

	//Marker center
	var left = (document.documentElement.clientWidth - $marker.outerWidth()) / 2;
	var top = (document.documentElement.clientHeight - $marker.outerHeight()) / 2;

	$marker.addClass('no-transition az-marker')
		.css({
			left: $div.position().left + x,
			top: $div.position().top + y
		})
		.transit({
			perspective: '500px',
			rotateY: '90deg',
			scale: 0.2,
			opacity: 1
		}, 0)
		.data('left', left).data('cx', $div.position().left + x)
		.data('top', top).data('cy', $div.position().top + y)
		.find('.x-close').addClass('no-close');

	jQuery($div).transit({
		x: x,
		y: y,
		perspective: '500px',
		rotateY: '-90deg',
		scale: 1.5
	}, 'fast', 'linear', function () {
		var x = $marker.data('left') - $marker.data('cx');
		var y = $marker.data('top') - $marker.data('cy');

		jQuery('#markerDetails')
			.transit({
				x: x,
				y: y,
				scale: 1,
				opacity: 1,
				rotateY: '0deg'
			}, 'fast', 'linear');
	});
}

function parallaxAnimate(id) {
	var $id = $(id);

	$id.fadeIn();
}

jQuery(document).ready(function ($) {
	if ($('#parallax-wrapper').hasClass('tablet')) {
		$('#coverflow').show();
	}

	if ($('#parallax-wrapper').hasClass('mobile')) {
		$('#grid').removeClass('hide').show();
		$('.responsive-grid').trigger('reflow');
	}

	var letters = [];
	$('#az li').each(function () {
		var $this = $(this);

		letters.push(this.dataset.letter.toLowerCase());
	});

	disableEmptyLetters(letters);

	$('.change-view li, .show-latest').click(function () {
		$('#back-button').show();

		$('.categories-toggle, #az-list').removeClass('hidden');

		$('.switchers li').removeClass('active');
		$this = $(this);
		$this.addClass('active');

		$('.xactive').hide();
		$($this.data('id')).removeClass('hide').show().addClass('xactive');

		$('body').attr('class', $('body').attr('class').replace(/.tab-[^ ]*/, ''));
		$('body').addClass('tab-' + $this.data('id'));

		$('.responsive-grid').trigger('reflow');

		if ($this.data('noaz')) {
			$('#az-list').addClass('hidden');
		} else {
			$('#az-list').removeClass('hidden');
		}

		if ($(this).hasClass('show-latest')) {
			$('#latest').removeClass('hide');
		} else {
			$('#latest').addClass('hide');
		}

		if ($this.data('id') == '#coverflow') {
			recreate_coverflow($('#az-list li.active').data('item'));
		}

		// hide the stuff what needs to show only on home
		if ($this.data('id') != '#latest') {
			$('#categories .description').addClass('hide');
		} else {
			$('#categories .description').removeClass('hide');
		}

		if ($this.data('id') == '#grid') {
			$("img.lazy").lazyload();

			$('#grid').scroll(function () {
				$("img.lazy").lazyload();
			});
		}

		if ($this.data('map')) {
			if (!$("#map").hasClass('initialized')) {
				$('#back-button').hide();

				initGMap("map", 51.506423, -0.125631, true, false, 12);

				$("#map").addClass('initialized');
			}
		}

		// if the element has data-id, only then make the script work on it.
		if ($this.attr('data-id')) {
			return false;
		}
	});

	//Show random items on photo page
	$('.switchers .icon-switch').click(function () {
		var $photo = $('#photo .container');
		if ($photo.hasClass('initialized')) return;
		$photo.addClass('initialized');

		/* The following options exist:
		moveFactor : Defaults to 10. The speed of the background in relation to the mouse.
		zIndexValue : Defaults to "-1". How the background should be layered in relation to other elements (z-index.)
		targetContainer : Defaults to 'body'. Which element should be checked for mouse movement, in case you want to contain the effect to only a specific part of a page. */
		$photo.css({
			marginLeft: -$photo.width() / 2,
			marginTop: -$photo.height() / 2
		});
		$photo.mouseParallax({
			'moveFactor': 5,
			targetContainer: '#photo'
		});

		setTimeout(function ($photo) {
			var items = pindrops.length,
				markers = ['bank', 'concerts', 'famous', 'flash', 'historic-buildings', 'movies', 'public-places', 'wifi'];
			var startDelay = 0,
				incDelay = 10,
				speed = 700;
			var minY = $photo.height() / 3;

			for (var i = 0; i < items; i++) {
				var $pin = $('<img>').hide();
				var x = pindrops[i].x;
				var y = pindrops[i].y;
				var img = Math.random() * markers.length;
				img = markers[Math.floor(img)];
				var src = ajaxData.markersUrl + img + '.png';

				$pin.addClass('pin').attr('src', src).css({
					left: x + '%',
					top: y + '%'
				}).data('category', img);
				$pin.data('src', pindrops[i].src);
				$pin.data('title', pindrops[i].title);
				$pin.data('link', pindrops[i].link);

				$pin.click(function (e) {
					var $this = $(this);
					var $infow = $('#pin-infowindow');
					$infow.find('img').attr('src', $this.data('src'));
					$infow.show();

					var left = $this.position().left + $this.width() / 2 - $('#pin-infowindow').outerWidth() / 2;
					var top = $this.position().top - $('#pin-infowindow').outerHeight() - 20;
					$infow.find('span').html($this.data('title'));
					$infow.find('a').attr('href', $this.data('link'));
					$infow.css({
						left: left,
						top: top
					});
				});

				$photo.append($pin);

				//TODO: USE TRANSITON INSTEAD OF animate the TOP position.
				//So figure out why pinDrop and easeOutBounce doesn't works
				$pin.transition({
					y: -$pin.position().top
				}, 0).show();
				$pin.delay(startDelay + i * incDelay).transition({
					y: 0
				}, speed, 'easeOutBounce');
			}
		}, 1000, $photo);
	});

	$('#pin-infowindow').click(function () {
		$(this).hide();
	});

	$('.switchers a.icon-360').trigger('click');

	//Toggle categories visibility
	$('.categories-toggle').click(function () {
		$('.categories-list').toggleClass('hidden');

		$(this).html($('.categories-list').hasClass('hidden') ? 'Show full directory' : 'Hide full directory');
	});

	//Change the category name
	$('.categories a, .categories-list a').click(function () {
		_recreate_coverflow = true;

		var title = $(this).find('.title').html();
		if (title === undefined)
			title = "";
		else {
			title = title.replace('Show', '');
			title = title.trim();
			title = "Showing " + title;
		}

		$('.category-name').html(title).addClass('border-line');

		ajaxData.filter = this.dataset.filter;
		if ($(this).data('type') === "") {
			ajaxData.category = $(this).data('filter');
			ajaxData.type = 'knowledge';
		} else {
			ajaxData.category = "";
			ajaxData.type = $(this).data('type');
		}

		//Refresh the content
		var cat = $(this).data('filter');

		//Show the AZ list by default, if no switchers is clicked yet
		var $active = $('.row.mt8p > div').not('.hide');
		if ($active.length <= 0 || $active.attr('id') == 'latest') {
			$('.switchers .default-view').trigger('click');
		}

		if ($('#map').hasClass('xactive')) {
			gmapShowMarkers(map);
		}
		$('#photo img').each(function () {
			var $this = $(this);

			if (cat === '' || $this.data('category') == cat) {
				$this.stop(true, false).fadeIn();
			} else {
				$this.stop(true, false).fadeOut();
			}
		});

		//Check the list of the available letters
		var letters = [];
		$('#az li').each(function () {
			var $this = $(this);

			if (cat === '' || $this.hasClass(cat) || $this.hasClass('post-' + cat)) {
				letters.push(this.dataset.letter.toLowerCase());

				if (!$this.data('height')) return;

				$this.stop(true, false).show().animate({
					height: $this.data('height'),
					opacity: 1
				}, 'slow');
			} else {
				if (!$this.data('height'))
					$this.data('height', $this.outerHeight());

				$this.stop(true, false).animate({
					height: 0,
					opacity: 0
				}, 'slow', function () {
					$(this).hide();
				});
			}
		});

		disableEmptyLetters(letters);

		/*
		 * I need to filter dinamically the items withouth any refresh...
		 * So my idea is put all the images in a non visible div, destroy all the gallery-view
		 * elements, and recreate them on runtime...
		 */
		if ($('#coverflow').is(':visible')) {
			recreate_coverflow($('#az-list li.active').data('item'));
		}

		// if( $( '#grid' ).hasClass( 'xactive') ) {
		if (cat !== '') {
			$('#grid li').addClass('hide-me');
			$('#grid li[data-category="' + cat + '"]').removeClass('hide-me');
			$('#grid li[data-type="' + cat + '"]').removeClass('hide-me');
		} else {
			$('#grid li').removeClass('hide-me');
		}

		$('.responsive-grid').trigger('reflow');
		// }

		if ($(this).closest('#latest').length <= 0) {
			$('.categories-list').toggleClass('hidden');
			$('.categories-toggle').html($('.categories-list').hasClass('hidden') ? 'Show full directory' : 'Hide full directory');
		}


	});

	/*
	 * Latest additions
	 *
	 * To allow infinite scroll I'll move, using css left property, the items at the end of the beginning of
	 * the list in according to the arrow direction.
	 * Now, in my opinion, the easiest solution is move the items everytimg a scroll is invoked.
	 * So the last one will be the first one, scrolling left, and viceversa.
	 *
	 * To achieve that I just need an array with all the slides. When a movement is invoked I just
	 * have to update his position inside the array.
	 * So, for example, If I move to right the first element will be moved after the last one.
	 * So If now I press the left button the last item will bacame the first of my array...
	 */
	var width = window.innerWidth / 3.8;
	var halfWidth = width / 2.6;
	var slideSpace = 10;
	if (window.innerWidth < 640) { // mobile
		width = window.innerWidth / 1.2;
		halfWidth = width / 0.9;
		slideSpace = window.innerWidth * 0.2;
	} else if (window.innerWidth < 1025) { // tablet
		width = window.innerWidth / 2;
		halfWidth = width / 2;
	}

	var height = width / (16 / 9);
	var left = -width + halfWidth;
	var delayRotate = 30;
	var stopPosition = 0;
	var slideItems = [];


	$('#latest .arrow').width(halfWidth / 1.4).height(height); //.css( { marginTop: - height / 2 });
	$('#latest .latest').data('slideWidth', width).data('slideHalfWidth', halfWidth);
	$('#latest .container').height(height);

	$('#skip').click(function () {
		$('#overlay-boxes .box1').delay(1000).transition({
			y: '-200%'
		}, 800, function () {
			$(this).hide();
		});
		$('#overlay-boxes .box2').delay(1000).transition({
			y: '200%'
		}, 800, function () {
			$(this).hide();
		});

		var top = jQuery('.columns.switchers').outerHeight() - 7;
		var h = jQuery('#home').height() - top - jQuery('#footer').outerHeight();
		var $latest = jQuery('#latest');
		$latest.css({
			top: top
		});

		$(this).fadeOut();
	});

	$('.scroll-down').click(function () {
		showLatests();
	});

	$(window).load(function () {
		if ($('parallax').length <= 0) {
			$('#overlay-boxes .box1').delay(800).transition({
				y: '-200%'
			}, 800, function () {
				$(this).hide();
			});
			$('#overlay-boxes .box2').delay(800).transition({
				y: '200%'
			}, 800, function () {
				$(this).hide();
			});

			if (_show_filter != undefined && _show_filter) {
				$('#categories a[data-filter="' + _show_filter + '"]').trigger('click');
				$('.categories-list').addClass('hidden');
			}
			showLatests(700);
			video1.play();
		}
	});

	$('#latest .latest ul').each(function (i) {
		var $this = $(this);

		$this.width(width);
		$this.height(height);
		$this.css({
			left: left
		});

		$this.transition({
			y: window.innerHeight - $(this).offset().top
		}, 0);

		$this.mouseenter(function () {
			rotateTitle($(this), 90);
		}).mouseleave(function () {
			rotateTitle($(this), 0);
		});
		left += width + slideSpace;

		slideItems.push(this);
	});

	$('#latest .left-arrow').mouseenter(function (e) {
		var $latest = $(this).parent().find('.latest');
		$latest.stop(true, false).transition({
			x: stopPosition + 100
		}, 'ease');
	}).mouseleave(function () {
		var $latest = $(this).parent().find('.latest');
		$latest.stop(true, false).transition({
			x: stopPosition
		}, 'ease');
	});

	$('#latest .right-arrow').mouseenter(function (e) {
		var $latest = $(this).parent().find('.latest');
		$latest.stop(true, false).transition({
			x: stopPosition - 100
		}, 'ease');
	}).mouseleave(function () {
		var $latest = $(this).parent().find('.latest');
		$latest.stop(true, false).transition({
			x: stopPosition
		}, 'ease');
	});

	$('#latest .arrow').click(function () {
		if ($(this).hasClass('animating')) return;
		$(this).addClass('animating');

		var dir = $(this).hasClass('right-arrow');
		var $latest = $(this).parent().find('.latest');
		var width = $latest.data('slideWidth');
		var halfWidth = $latest.data('slideHalfWidth');
		var x = getMatrixM40($latest.get()[0]);

		var latest, index = 1,
			left = width + slideSpace,
			sign = 1;
		if (dir) {
			latest = slideItems.shift();
			slideItems.push(latest);
			index = slideItems.length - 2;
			sign = -1;
		} else {
			latest = slideItems.pop();
			slideItems.unshift(latest);

			left *= -1;
		}

		if (!dir) {
			left = left + parseFloat(slideItems[index].style.left);

			$(latest).css({
				left: left
			});
		}

		stopPosition = x + (width + slideSpace) * sign - (100 * sign);
		$latest.stop(true, true).transition({
			x: stopPosition + (100 * sign)
		}, 'ease', function () {
			if (dir) {
				left = left + parseFloat(slideItems[index].style.left);

				$(latest).css({
					left: left
				});
			}

			$('#latest .arrow').removeClass('animating');
		});
	});

	function rotateTitle($this, toAngle) {
		$this.find('.title').each(function () {
			var $this = $(this);
			var $letters = $this.find('.title-row span');
			var $row2 = $this.find('.title-row2 span');

			var ease = (toAngle === 0) ? 'ease-in' : 'linear';
			var y = (toAngle === 0) ? 0 : 20;
			var speed = 400;

			shuffle($letters);
			$letters.each(function (j) {
				var index = $(this).index();

				$(this).stop(true, false).delay(j * delayRotate).transition({
					rotateX: toAngle + 'deg',
					y: y
				}, speed, ease);
				var clone = $row2.get(index);
				$(clone).stop(true, false).delay(j * delayRotate).transition({
					rotateX: toAngle + 'deg',
					y: -y
				}, speed, ease);
			});
		});
	}

	function shuffle(array) {
		var currentIndex = array.length,
			temporaryValue, randomIndex;

		// While there remain elements to shuffle...
		while (0 !== currentIndex) {

			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			// And swap it with the current element.
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}

		return array;
	}

	function showLatests(timeout) {
		timeout = timeout || 1200;

		setTimeout(function () {
			$('#latest .latest ul').each(function (i) {
				$(this).delay(200 * i).transition({
					y: 0,
					opacity: 1
				}, 800, 'easeOutQuad', function () {
					rotateTitle($(this), 0);
					$(this).find('.category,.more').addClass('active');
				});
			});
		}, timeout);
	}

	function disableEmptyLetters(letters) {
		$('#az-list li').each(function () {
			if (this.dataset.item === '') return;

			var letter = this.dataset.item.toLowerCase();

			if (letters.indexOf(letter) < 0) {
				this.classList.add('empty');
			} else {
				this.classList.remove('empty');
			}
		});
	}
});

function recreate_coverflow(letter) {
	if (!_recreate_coverflow) return;

	//Destroy the active coverflows
	_coverflows.forEach(function (coverflow) {
		jQuery('#' + coverflow.dest).fadeOut('fast', function () {
			jQuery(this).html('');

			_recreate_coverflow_data(coverflow, letter);
		});
	});

	_recreate_coverflow = false;
}

function _recreate_coverflow_data(coverflow, letter) {
	var dest = document.getElementById(coverflow.dest);
	var parent = document.createElement('ul');
	var cat = document.createElement('ul');
	var empty = true;

	parent.id = coverflow.id;
	parent.classList.add('coverflow-me');
	parent.style.display = 'none';
	parent.dataset.dest = coverflow.dest;
	cat.dataset.cat = '+ Category one';

	parent.appendChild(cat);
	letter = letter.toLowerCase();

	coverflow.data.forEach(function (item) {

		if ((letter === '' || item.letter == letter) && (!ajaxData.filter || ajaxData.filter === '' || ajaxData.filter == item.marker || ajaxData.filter == item.type)) {
			var data = document.createElement('ul');
			var html = '<li data-type="link" data-url="' + item.link + '"></li><li data-thumbnail-path="' + item.img + '"></li>' +
				'<li data-thumbnail-text="">' +
				'<div class="flowWrapper" style="float: left; width: 100%; height: auto; padding-top: 5px">' +
				'<p class="largeLabel"><a href="' + item.link + '">' + item.title + '</a></p>' +
				'<ul class="options" style="display: none"><li></li></ul>' +
				'</p></div></li>';

			data.innerHTML = html;

			cat.appendChild(data);

			empty = false;
		}
	});

	dest.appendChild(parent);

	if (!empty) {
		generateCoverflow();
		jQuery('#' + coverflow.dest).show();
	}
}

jQuery(window).load(function () {
	jQuery('article.animated-text').parent().css({
		left: "25%"
	});

	if (jQuery('#categories').length) {
		var top = jQuery('#categories').position().top + jQuery('#categories').height() - jQuery('.mb50.mt8p').position().top - 2;
	}

	var h = 0;
	jQuery('#latest').children().each(function () {
		h += jQuery(this).outerHeight(true);
	});
	var $latest = jQuery('#latest');
	$latest.css({
		top: top
	}).css({
		minHeight: h
	}); //.height( h );

	var h2 = jQuery(window).height() - (jQuery('.top-bar').height() + jQuery('#navigation-menu').height() + jQuery('.overlayed-bar').height() + jQuery('#az-list').height() + jQuery('.site-footer').height() + jQuery('#bottom-bar').height() + 15);
	
	if (! jQuery('#parallax-wrapper').hasClass('mobile')) {
		jQuery('.mb50.mt8p').height(h2);
	}
});

jQuery(window).resize(function () {
	var h2 = jQuery(window).height() - (jQuery('.top-bar').height() + jQuery('#navigation-menu').height() + jQuery('.overlayed-bar').height() + jQuery('#az-list').height() + jQuery('.site-footer').height() + jQuery('#bottom-bar').height() + 15);
	if (! jQuery('#parallax-wrapper').hasClass('mobile')) {
		jQuery('.mb50.mt8p').height(h2);
	}
});

(function ($) {
	$.fn.extend({

		mouseParallax: function (options) {

			var defaults = {
				moveFactor: 5,
				rotateFactor: 5,
				zIndexValue: "-1",
				targetContainer: 'body'
			};

			options = $.extend(defaults, options);

			return this.each(function () {
				var o = options;
				var background = $(this);

				$(o.targetContainer).on('mousemove', function (e) {

					mouseX = e.pageX;
					mouseY = e.pageY;

					windowWidth = $(window).width();
					windowHeight = $(window).height();

					percentX = ((mouseX / windowWidth) * o.moveFactor) - (o.moveFactor / 2);
					percentY = ((mouseY / windowHeight) * o.moveFactor) - (o.moveFactor / 2);

					leftString = (0 - percentX) + "%";
					rightString = (0 - percentX) + "%";
					topString = (0 - percentY) + "%";
					bottomString = (0 - percentY) + "%";

					rotateX = (((mouseX / windowWidth) * o.rotateFactor) - (o.rotateFactor / 2)) + 'deg';
					rotateY = (((mouseY / windowHeight) * o.rotateFactor) - (o.rotateFactor / 2)) + 'deg';
					background[0].style.transform = "translateX(" + leftString + ") translateY(" + topString + ") rotateX(" + rotateY + ") rotateY( " + rotateY + ")";
				});
			});
		}
	});
}(jQuery));