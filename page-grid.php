<?php get_header(); ?>
die();
<div id="navigation-menu" class="double">
	<div class="first">
		<ul>
	<?php
		if( have_rows('side_pri_nav', $post->ID) ):
			$i = 0;
			while( have_rows('side_pri_nav', $post->ID) ): the_row();
				$page = get_sub_field( 'page' );
	?>
		<li class="item item-<?php echo $i++ ?>">
			<a href="<?php echo get_permalink( $page->ID ); ?>">
				<span><?php echo $page->post_title; ?></span>
			</a>
		</li>
	<?php
			endwhile;
		endif;
	?>
		</ul>
		<div class="line"></div>
	</div>
	<div class="clear"></div>
	<div class="second">
		<ul>
			<li class="street-sign">Test</li>
	<?php
		if( have_rows('sidebar_sec_nav', $post->ID) ):
			$i = 0;
			while( have_rows('sidebar_sec_nav', $post->ID) ): the_row();
				$page = get_sub_field( 'page' );
	?>
		<li class="item item-<?php echo $i ?>">
			<a href="<?php the_sub_field( 'link' ) ?>">
				<span><?php the_sub_field( 'title' ); ?></span>
			</a>
		</li>
	<?php
				if( have_rows('subitems', $post->ID) ):
					while( have_rows('subitems', $post->ID) ): the_row();
?>
	<li class="sub-item item-<?php echo $i ?>">
		<a href="<?php the_sub_field( 'link' ) ?>">
			<span><?php the_sub_field( 'title' ); ?></span>
		</a>
	</li>
<?php
				endwhile;
			endif;

			endwhile;
		endif;
	?>
		</ul>
		<div class="line-second line-thin"></div>
		<div class="line-second line-fat"></div>
	</div>
</div>
<?php
// wp_enqueue_style('icomoon', get_template_directory_uri() . '/css/icomoon.css' );
?>
<ul class="responsive-grid">
	<?php
	global $gj_query, $wp_query;

	if( ! isset( $gj_query ) ) {
		$args = array(
			'post_type' => 'post',
			'post_status'    => 'publish',
			'posts_per_page' => 1,
		);

		$grid_li = '';
		$li = '';

		$gj_query = get_posts( $args );
	}

$fees_text =<<< FEES
	<span class="fees">Admin fees apply</a>
FEES;

	foreach( $gj_query as $post ) {
		$category = get_the_category();
		$office = $category[0]->name;
		foreach( $category as $c ) {
			if( $c->parent > 0 ) {
				$office = $c->name;
				break;
			}
		}

		$img = get_field( 'custom_background', $post->ID );
		$lmap = get_field( 'location_map_image', $post->ID );
		if( $img['mime_type' ] == "video/mp4" ) $img = $lmap;

		$thumb = wp_get_attachment_image_src( get_post_thumbnail_id($post->ID), 'thumbnail_size' );
		$url = $thumb['0'];

		if( empty( $url ) ) {
			$url = get_template_directory_uri() . '/img/default.png';
		}

		$permalink = get_permalink( $post->ID );
		$price = get_field('price');
		$show_fees = true;
		if ($price<=80000){
			$disprice = number_format($price);
			$display = "£".$disprice." pw";

			$show_fees = true;
		} else {
			$disprice = number_format($price);
			$display = "£".$disprice;
		}

		$fees = "";
		if( $show_fees ) {
			$fees = $fees_text;
		}

		$beds = get_field( 'bedrooms', $post->ID );
		$bathrooms = get_field( 'bathrooms', $post->ID );
		$receptions = get_field( 'receptions', $post->ID );
		$description = get_field( 'descriptionfull' );
		$content = explode( " ", $description );
		$content = join( " ", array_slice( $content, 0, 20 ) );
echo <<< LI
	<li class="item" data-category="$category">
		<div class="front">
			<div class="image-wrapper">
				<img class="" data-src="$url" alt="">
			</div>
			<div class="bg"></div>
			<div class="info">
				<div class="title">$office</div>
				<div class="address">{$post->post_title}</div>
				<ul class="facilities">
					<li class="price">{$display} {$fees}</li>
					<li class="icon icon-beds"><span>$beds</span></li>
					<li class="icon icon-bathrooms"><span>$bathrooms</span></li>
					<li class="icon icon-receptions"><span>$receptions</span></li>
				</ul>
			</div>
		</div>
		<div class="back">
			<div class="image-wrapper">
				<div class="bg"></div>
				<img class="" data-src="$url" alt="">
			</div>
			<div class="button-close">
		      <div class="circle-arc">
		      <svg width="100%" viewBox="0 0 100 100">
		      <path d="M 50 50 m -43 0 a 43 43 0 1 1 86 0 a 43 43 0 1 1 -86 0"></path>
		      </svg>
		      </div>
		      <div class="bg">
		      <div></div>
		      </div>
		      <div class="line l-0"></div>
		      <div class="line l-1"></div>
		  </div>

			<div class="data">
				<div class="title">$office</div>
				<div class="address">{$post->post_title}</div>
				<div class="price">{$display}</div>
				<ul class="facilities">
					<li class="icon icon-beds"><span>$beds</span></li>
					<li class="icon icon-bathrooms"><span>$bathrooms</span></li>
					<li class="icon icon-receptions"><span>$receptions</span></li>
				</ul>
				<div class="description">{$content}</div>
				<ul class="link">
					<li class="view"><a href="$permalink">View Full Details</a></li>
					<li class="map"><a href="$permalink?view=map">View on Map</a></li>
				</ul>
				<div style="clear:both"></div>
			</div>
		</div>
	</li>
LI;
	}
	?>
</ul>

<div id="fees" class="close-me">
  <div class="button-close">
      <div class="circle-arc">
      <svg width="100%" viewBox="0 0 100 100">
      <path d="M 50 50 m -43 0 a 43 43 0 1 1 86 0 a 43 43 0 1 1 -86 0"></path>
      </svg>
      </div>
      <div class="bg">
      <div></div>
      </div>
      <div class="line l-0"></div>
      <div class="line l-1"></div>
  </div>

	<div class="content">
		<h2>ADMIN FEES EXPLAINED</h2>
		<p>Once you have decided on a suitable property to rent then there are various costs that you will need to take into consideration when making an offer. Garton Jones have outlined our process and the charges below:</p>
		<h3>Rental Price Calculator</h3>
		<p>We advertise all of our properties on a ‘per week’ basis and the method used to calculate the monthly rental is the weekly figure multiplied by 52 weeks in the year and then divided by 12 months (for example £450pw x 52 / 12 = £1950pcm)</p>
		<h3>Fee’s</h3>
		<p>Once your offer has been accepted then we will require a one week holding deposit as well as a £60 referencing fee (payable per tenant). This will ensure the we cease marketing and that the property is placed under offer whilst our independent referencing agency carry out reference checks.</p>
		<hgroup>
		<h4>Reference Fee: £60 inc VAT (same fee applies for guarantors)</h4>
		<h4>Company Reference Fee: £120 inc VAT</h4>
		<h4>Tenancy Agreement Fee:  £180 inc VAT</h4>
		<h4>Tenancy Agreement Renewal Fee £60 inc VAT</h4>
		</hgroup>
		<p>Inventory Fee’s  * please note that we instruct an independent clerk and these fess are subject to change.</p>
		<p>Tenants will be responsible for paying for the inventory check out costs upon the expiration of the tenancy. The cost is approximately £95- £120 (Plus VAT) dependent on the size of the property</p>
		<h3>Security Deposit</h3>
		<p>Please be aware that our standard security deposit is 6 weeks which is held in accordance with the appropriate deposit scheme. *please be aware that some landlords may request a higher deposit for unusual circumstances</p>
		<h3>Payment Methods</h3>
		<p>We accept payments by cheque (please allow 10 working days for clearance), bankers draft, BAC’s, debit and credit card (we do not accept American Express) * charges may apply, see below.  Please be aware that all move in balances must be paid by the tenancy start date and must be cleared funds in our account, failure to do so may result in a delay of your tenancy.</p>
		<p>
		*Card charges<br>
		<br>
		UK Debit card  34p<br>
		UK Credit Card 1.45%  + VAT<br>
		Business Credit Card 2.4% + VAT<br>
		International Credit Card 2.62% + VAT<br>
		International Debit card 40P
		</p>
	</div>
</div>
<script>
(function ($) {
	var minWidth = 300, cellWidth = 450, ratio = 1.5;
	var resizeInterval = 300;
	var openItems = [];

	var get_cell_width = function( items ) {
		return window.innerWidth / items;
	}

	var reflow_grid = function() {
		var items = Math.round( window.innerWidth / cellWidth );
		var width = get_cell_width( items );

		/*
		 * I don't want cell smaller than the minimum size.
		 */
		if( width < minWidth && items > 1 ) {
			items--;
			width = get_cell_width( items );
		}
		var height = width / ratio;

		var position = { x: 0, y: 0 };
		$( '.responsive-grid .item' ).each( function( i ) {
			var $this = $( this );

			if( i > 0 && ( i % items ) === 0 ) {
				position.x = 0;
				position.y += height;
			}

			// $this.data( 'position', position );
			this.dataset.positionX = position.x;
			this.dataset.positionY = position.y;
			// console.log( $( this ).data( 'position' ) );
			$this.transition( { x: position.x, y: position.y, width: width, height: height },
			function() {
				showTheGridItem( this, $( this ).index() );
			} );

			position.x += width;
		});
	};

	var showTheGridItem = function( e, index ) {
		if( $( e ).hasClass( 'visible' ) ) return;

		var scrollTop = $( window ).scrollTop();
		var height = $( 'body' ).height();
		var y = getMatrixM41( e[0] );
		var isVisible = ( y <= scrollTop + height - window.innerHeight / 3.5 );

		if( isVisible ) {
			var $img = $( e ).find( 'img' );
			$img.attr( 'src', $img.data( 'src' ) );

			$( e ).addClass( 'visible' );
			$( e ).delay( 50 * index ).animate( { opacity: 1 }, 'slow' );
		}
	};

	var closeOpenedItems = function() {
		openItems.forEach( function( $item ) {
			$item.transition( { rotateX: '-92deg' }, 100, 'linear', function() {
				var $original = $( this ).data( 'original' );

				$( this ).remove();
				$original.show().transition( { rotateX: '92deg' }, 0 ).transition( { rotateX: '0deg' }, 100, 'linear' );
				// $original.transition( { x: position.x, y: position.y, rotateX: '92deg' }, 0 ).transition( { rotateX: '0deg' }, 200, 'linear' );
			} );
		});
	};

	var openItem = function( e ) {
		if( $( e ).hasClass( 'no-flip' ) ) {
			$( e ).removeClass( 'no-flip' );

			return;
		}

		closeOpenedItems();

		var position = { x: e.dataset.positionX, y: e.dataset.positionY };

		$( e ).transition( { rotateX: '-92deg' }, 200, 'linear', function() {
			$( this ).hide();

			//Duplicate the item
			var $d = $( this ).clone();
			$d.attr( 'z-index', 1 );
			$d.find( '.front' ).hide();

			$d.find( '.back' ).show();
			$d.data( 'original', $( this ) );
			$d.addClass( 'clone' ).show();
			openItems.push ( $d );

			$( '.responsive-grid' ).append( $d );

			// TODO: The plugin override the translate position, so I need to get it from the item
			var $data = $d.find( '.back .data' );
			console.log( $d.find( '.back' ), $d.find( '.back' ).outerHeight(), $data.outerHeight(), 2 );
			$data.css( { marginTop: ( $d.find( '.back' ).outerHeight() - $data.outerHeight() ) / 2 } );

			$d.transition( { x: position.x, y: position.y, rotateX: '92deg' }, 0 ).transition( { rotateX: '0deg' }, 200, 'linear', function() {
				$( this ).find( '.button-close' ).addClass( 'open' );
			} );
		} );
	};

	$( 'body' ).on( 'click', '.responsive-grid .item .fees', function(e) {
		$( this ).closest( '.item' ).addClass( 'no-flip' );

		var $fees = $( '#fees' );
		$fees.css( { marginLeft: - $fees.outerWidth() / 2, marginTop: -$fees.outerHeight() / 2 } );
		$fees.addClass( 'visible' );

		showClose( 500, $( '#fees' ) );
		showShade();

		e.preventDefault();
	});

	$( '.responsive-grid .item' ).not( '.clone' ).click( function() {
		//Need to wait that the function .fees apply the class, if clicked on it...
		setTimeout( function( e ) {
			openItem( e );

		}, 50, this );
	});

	$( 'body' ).on( 'click', '.responsive-grid .back .button-close', function() {
		closeOpenedItems();
	});

	$( document ).ready( function() {
		reflow_grid();
	});

	$( window ).load( function() {
		var $rg = $( '.responsive-grid' );
		$rg.height( $( 'body' ).height() + $( '#foot' ).height() * 4 );
	}).resize( function() {
		clearTimeout( resizeInterval );

		resizeInterval = setTimeout( function() {
			reflow_grid();
		}, 100 );
	}).scroll( function() {
		$( '.responsive-grid .item' ).not( '.visible' ).each( function( i ) {
			showTheGridItem( $( this ), i );
		});
	});
})(jQuery);

(function($){
	var ANIMATION_DELAY = 1200;
	var SPAN_DELAY = 100;
	var FAT_SPEED = 900;
	var interval = 0, timeout = 0;
	var $activeItem;

	var animateNavigationMenu = function() {
		var middle = $( '#navigation-menu .first' ).width() / 2;
		var $li = $( '#navigation-menu .first li' );
		var length = Math.floor( $li.length / 2 );

		/*
		 * When the # of items is odd, I don't have any item on the center,
		 * so I have to adjust the position in according to the middle ( class ) one.
		 */
		var isEven = $li.length % 2 == 0;
		if( isEven ) {
			var $middle = $( $li.get( length ) );
			middle += ( $middle.position().left - middle ) + ( $middle.outerWidth() / 2 );
		}

		//Translate the item into the middle, and after remove the
		//translation to have a nice animation :)
		$li.each( function( index ) {
			var $this = $( this );
			var position = $this.position();

			var center = middle - ( $this.outerWidth() / 2 );
			// position.left *= ( position.left < center ) ? -1 : -1;
			center -= position.left;

			var translate = "translateX( " + center + "px)";
			$this.css({
			    "webkitTransform": translate,
			    "MozTransform": translate,
			    "msTransform": translate,
			    "OTransform": translate,
			    "transform": translate
			});

			var delayIndex = length - index;
			var delay = ANIMATION_DELAY * Math.abs( delayIndex );

			setTimeout( function( $this, index ) {
				$this.addClass( 'visible' );
				if( index == 0 ) $this.addClass( 'middle' );

				$this.css({
				    "webkitTransform": "",
				    "MozTransform": "",
				    "msTransform": "",
				    "OTransform": "",
				    "transform": ""
				});
			}, delay, $this, delayIndex );
		});

		/*
		 * Calculate the width of the line
		 */
		var lineWidth = $( '#navigation-menu .first' ).outerWidth();
		lineWidth -= $li.first().outerWidth() / 2;
		lineWidth -= $li.last().outerWidth() / 2;

		//14 is the size of half circle
		setTimeout( function( lineWidth ) {
			$( '#navigation-menu .line' ).addClass( 'visible' ).width( lineWidth ).css( { marginLeft: 10 - lineWidth / 2 } );
		}, ANIMATION_DELAY * ( length + 1 ), lineWidth );

		//Show the labels
		setTimeout( function( $li ) {
			$li.each( function( index ) {
				var $span = $( this ).find( 'span' );

				setTimeout( function() {
					$span.addClass( 'visible' );
				}, index * SPAN_DELAY, $span );
			});

			setTimeout( function() {
				animateSecondNavigationMenu();
			}, ANIMATION_DELAY );
		}, ANIMATION_DELAY * ( length + 2 ), $li );
	};

	var animateSecondNavigationMenu = function() {
		var $li = $( '#navigation-menu .second li' );
		if( $li.length < 0 ) return;

		$li.each( function( index ) {
			setTimeout( function( $li ) {
				$li.addClass( 'visible' );
			}, index * ( SPAN_DELAY * 2 ), $( this ) );
		});

		var lineWidth = $li.parent().outerWidth();
		var thinWidth = lineWidth;
		// lineWidth -= $li.first().outerWidth() / 2;
		lineWidth -= $li.last().outerWidth() / 2;
		thinWidth -= $li.first().outerWidth() / 2;
		thinWidth -= $( $li.get( 1 ) ).outerWidth() / 2;

		setTimeout( function( lineWidth ) {
			$( '#navigation-menu .second .line-fat' ).addClass( 'visible' );
			$( '#navigation-menu .second .street-sign + li a' ).trigger( 'click' );

			setTimeout( function( thinWidth ) {
				$( '#navigation-menu .second .line-thin' ).addClass( 'visible' ).width( thinWidth - 130 );
			}, FAT_SPEED, thinWidth );
		}, SPAN_DELAY * $li.length + FAT_SPEED, lineWidth );
	}

	var updateThinAndFatLine = function() {
		var $e = $( '#navigation-menu .second' );
		var $li = $( '#navigation-menu .second li' );
		var thinWidth = $e.outerWidth();

		thinWidth -= $li.first().outerWidth();
		thinWidth -= $( $li.get(1) ).last().outerWidth() / 2;
		thinWidth -= $li.last().outerWidth() / 2;

		$( '#navigation-menu .second .line-thin' ).addClass( 'resize' ).width( thinWidth );

		var w = $activeItem.position().left - $( '#navigation-menu .second .line-fat' ).position().left + $activeItem.outerWidth() / 2;
		$( '#navigation-menu .second .line-fat' ).width( w - 10 );
	};

	$( 'body' ).on( 'click', '#navigation-menu .second a', function() {
		var $this = $( this );
		var noUpdateWidth = false;

		//Remove all the active items and close the subitems
		$( '#navigation-menu .second a' ).removeClass( 'active full' );

		if( ! $this.parent().hasClass( 'sub-item' ) ) {
			if( $( '#navigation-menu .second li.open' ).length > 0 ) {
				$( '#navigation-menu .second li' ).removeClass( 'open' );

				noUpdateWidth = true;
			}
		}

		//Set the full circle to all the
		var index = $this.parent().index();
		for( i = 0; i < index; i++ ) {
			var li = $( '#navigation-menu .second li' ).get( i );

			$( li ).find( 'a' ).addClass( 'full' );
		}

		//Has a subitems?
		if( ! $this.parent().hasClass( 'sub-item' ) &&
		 		$this.parent().next().hasClass( 'sub-item' ) ) {
			var index = $this.parent().index();
			var $li = $( '#navigation-menu .second li' );

			for( i = index + 1; i < $li.length; i++ ) {
				var li = $li.get( i );

				if( ! $( li ).hasClass( 'sub-item' ) ) break;
				$( li ).addClass( 'open' );
			}

			noUpdateWidth = true;
		}

		$this.addClass( 'active' );

		if( ! noUpdateWidth ) {
			var w = $( this ).parent().position().left - $( '#navigation-menu .second .line-fat' ).position().left + $( this ).parent().outerWidth() / 2;
			$( '#navigation-menu .second .line-fat' ).width( w - 10 );
		} else {
			clearInterval( interval );
			clearTimeout( timeout );
			interval = setInterval( updateThinAndFatLine, 10 );

			timeout = setTimeout( function() {
				clearInterval( interval );

				$( '#navigation-menu .second .line-fat' ).removeClass( 'resize' );

				$active = $( '#navigation-menu li a.active' ).parent();
				var w = $active.position().left - $( '#navigation-menu .second .line-fat' ).position().left + $active.outerWidth() / 2;
				$( '#navigation-menu .second .line-fat' ).width( w - 10 );

			}, 500 );
		}

		$activeItem = $( '#navigation-menu li a.active' ).parent();
	});

	$( window ).load( function() {
		animateNavigationMenu();
		// animateSecondNavigationMenu();
	});
})(jQuery);
</script>
<?php get_footer(); ?>
