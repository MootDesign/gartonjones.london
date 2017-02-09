<?php get_header(); ?>

<div id="back-button">

	<svg
	   width="38"
	   height="38"
	   viewBox="0 0 38.000001 38.000001"
	   >
	  <g
	     transform="translate(0,-1014.3622)">
	    <g
	       id="g6736"
	       transform="matrix(1.0146239,0,0,1.0146321,-772.40667,843.97789)">
	      <path
	         id="path3300"
	         style="fill:#231f20;fill-opacity:1;fill-rule:nonzero;stroke:none"
	         d="m 783.71181,192.86439 -7.47477,-7.47477 7.47477,-7.48501 -1.76298,-1.76639 -9.24799,9.23776 9.24799,9.2514 1.76298,-1.76299" />
	      <path
	         id="path3322"
	         style="fill:#231f20;fill-opacity:1;fill-rule:nonzero;stroke:none"
	         d="m 797.47467,186.65474 -1.25148,0 c 0,4.47395 -1.81072,8.52506 -4.75016,11.47132 -2.93603,2.93944 -6.98373,4.75017 -11.47133,4.75017 -4.48759,0 -8.52506,-1.81073 -11.47814,-4.75017 -2.93603,-2.94626 -4.75016,-6.99737 -4.75016,-11.47132 0,-4.48759 1.81413,-8.5387 4.75016,-11.47815 2.95308,-2.93603 6.99055,-4.75016 11.47814,-4.76039 4.4876,0.0102 8.5353,1.82436 11.47133,4.76039 2.93944,2.93945 4.75016,6.99056 4.75016,11.47815 l 2.50296,0 c 0,-10.35284 -8.37502,-18.72786 -18.72445,-18.73809 -10.33919,0.0102 -18.72785,8.38525 -18.72785,18.73809 0,10.33578 8.38866,18.72445 18.72785,18.72445 10.34943,0 18.72445,-8.38867 18.72445,-18.72445 l -1.25148,0" />
	    </g>
	  </g>
	</svg>

	<span>Back</span>
</div>

<div id="back-history">
<div class="items">
		<div class="shade"></div>
		<div class="tube tube-first"></div>
		<div class="item">
			<span class="content">
				<a href="<?php echo home_url(); ?>">
					Home
				</a>
			<span>
		</div>
</div ><?php
		global $post;

		$items = gj_get_back_history_item( $post );
		for( $i = count( $items ) - 1; $i >= 0; $i-- ) :
			$item = $items[ $i ];
?><div class="items">
	<div class="shade"></div>
	<div class="tube <?php echo $i == 0 ? 'tube-last' : '' ?>"></div>
	<div class="item">
		<span class="content">
			<a href="<?php get_permalink( $item->ID ); ?>" class="<?php echo $i == 0 ? 'active' : '' ?>">
				<?php echo $item->post_title; ?>
			</a>
		<span>
	</div>
</div ><?php endfor; ?>
<div class="items">
	<div class="shade"></div>
	<div class="item">
		<span class="content">
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
	</span>
	</div>
</div ><div class="items blank">
	<div class="item">
		<div class="shade"></div>
	</div>
</div>
</div>
<script>
(function($){
	var DELAY = 100;
	var TITLE_DELAY = 300;
	var DURATION = 1000;
	var LINE_DURATION = 200;

	var showTheTubeLine = function() {
			$( '#back-history .tube' ).each( function( i ) {
				var $this = $( this );
				var width = $this.closest( '.items' ).outerWidth() - $( this ).position().left;
				if( $this.hasClass( 'tube-last' ) ) {
					width /= 2;
				}

				$( this ).delay( DURATION + i * LINE_DURATION ).animate( { width: width }, LINE_DURATION, 'linear' );
			});
	};

	$( '#back-button' ).click( function() {
		$( '#back-history' ).addClass( 'visible' );

		$( '#back-history .items' ).each( function( i ) {
			var $this = $( this ).find( '.shade' );
			var w = $this.data( 'width' );

			$this.delay( DELAY * ( i + 1 ) ).animate( {width: w }, DURATION, 'easeOutExpo' );
		});

		setTimeout( function() {
			$( '#back-history .items' ).each( function( i ) {
				setTimeout( function( $this ) {
					if( $this.find( '.button-close' ).length > 0 ) {
						$this.find( '.button-close' ).addClass( 'open' );

						showTheTubeLine();
					} else {
						$this.find( 'a' ).addClass( 'visible' );
					}
				}, TITLE_DELAY * i, $( this ) );
			});
		}, DURATION * ( $( '#back-history .items' ).length - 4 ) );
	});

	$( '.button-close' ).click( function() {
		var $items = $( '#back-history .items' );
		var length = $items.length - 2;
		var delay = DURATION + 0.4 * ( length + 1 ) * TITLE_DELAY;

		for( i = length; i >= 0; i-- ) {
			setTimeout( function( $this ) {
				$this.find( 'a' ).removeClass( 'visible' );
			}, DURATION + TITLE_DELAY * ( length - i - 1 ), $( $items.get( i ) ) );

			setTimeout( function( $this ) {
				$this.find( '.tube' ).animate( {width: 0}, LINE_DURATION / 2, 'linear' );
			}, DURATION / 2 + TITLE_DELAY * ( length - i - 1 ), $( $items.get( i ) ) );
		}

		$items = $( '#back-history .items' );
		length = $items.length;
		for( i = length; i >= 0; i-- ) {
				var item = $items.get( i );
				var $item = $( item ).find( '.shade' );
				$item.delay( delay + DELAY * ( length - i ) ).animate( {width: 0}, DURATION, 'easeOutExpo' );
		}

		setTimeout( function() {
			$( '#back-history' ).removeClass( 'visible' );
		}, DURATION * ( length - 2 ) - DURATION );
	});

	$( window ).load( function() {
		var totalWidth = 0;
		$( '#back-history .items' ).each( function( i ) {
			var $this = $( this ).find( '.shade' );
			var w = $this.width();

			$this.data( 'width', w ).css( { width: 0 } );

			totalWidth += w - 2;
		});

		var blankWidth = $( '#back-history ' ).width() - totalWidth;
		$( '#back-history .items.blank' ).width( blankWidth ).find( '.shade' ).data( 'width', blankWidth ).css( { width: 0 } );

		$( '#back-button' ).addClass( 'visible' );
	});
})(jQuery);
</script>
<?php

get_footer();
