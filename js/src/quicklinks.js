(function($) {
	var minWidth = 300, cellWidth = 450, ratio = 1.5;
	var resizeInterval = 300;
	var openItems = [];

	var $grid = $( '#grid' );

	var get_cell_width = function( items ) {
		//30px is the width of the scrollbar
		return ( $( '#grid' ).width() ) / items;
	};

	var reflow_grid = function( speed ) {
		var items = Math.round( window.innerWidth / cellWidth );
		var width = get_cell_width( items );
		speed = speed || 400;

		/*
		 * I don't want cell smaller than the minimum size.
		 */
		if( width < minWidth && items > 1 ) {
			items--;
			width = get_cell_width( items );
		}
		var height = width / ratio;

		var position = { x: 0, y: 0 };
		var currentItem = 0;
		$( '#grid .item' ).each( function( i ) {
			var $this = $( this );

			if( $this.hasClass( 'clone' ) ) {
				$original = $this.data( 'original' );

				var style = $original.attr( 'style' );
				var re = /rotateX[^;]*/;

				style = style.replace( re, '' );
				$this.attr( 'style', style ).show();

				var $data = $this.find( '.back .data' );
				$data.css( { marginTop: ( $this.find( '.back' ).outerHeight() - $data.outerHeight() ) / 2 } );

				return;
			}

			if( $this.hasClass( 'hide-me' ) ) {
				$this.stop( true, false ).delay( currentItem * 50 ).transition( { opacity: 0 } );

				return;
			}

			if( currentItem > 0 && ( currentItem % items ) === 0 ) {
				position.x = 0;
				position.y += height;
			}

			// $this.data( 'position', position );
			this.dataset.positionX = position.x;
			this.dataset.positionY = position.y;
			// console.log( $( this ).data( 'position' ) );
			$this.transition( {  width: width, height: height, opacity: 1 }, speed,
				function() {
					showTheGridItem( this, $( this ).index(), $( this ).closest( '#grid' ) );
				} 
			);

			position.x += width;
			currentItem++;
		});

	    // $( '#grid .show-more' ).transition( { x: '-50%', y: position.y + height + 50 }, speed );
	};

	var showTheGridItem = function( e, index, $grid ) {
		if( $( e ).hasClass( 'visible' ) ) return;

		var scrollTop = $( window ).scrollTop() + $grid.scrollTop();
		var height = $( 'body' ).height();
		var y = getMatrixM41( e.get(0) );
		var isVisible = ( y <= scrollTop + height - $grid.outerHeight() / 3.5 );

		if( isVisible ) {
			var $img = $( e ).find( 'img' );
			$img.attr( 'src', $img.data( 'src' ) );

			$( e ).addClass( 'visible' );
			$( e ).delay( 50 * index ).animate( { opacity: 1 }, 'slow' );
		}
	};

	$( window ).load( function() {
		reflow_grid();
	});
})(jQuery);