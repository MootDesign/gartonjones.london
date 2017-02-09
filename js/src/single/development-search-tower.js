jQuery(document).ready(function( $ ) {
    //Close the content
    $( '.row-content' ).each( function() {
        $( this ).data( 'height', $( this ).height() );
    });
    $( '.row-content.closed' ).height( 0 );

  $( '.leftmenu a' ).click( function() {
    var $this = $( this );
    $this.closest( 'ul' ).find( 'li' ).removeClass( 'active' );
    $this.parent().addClass( 'active' );

    //Set the value in the form
    $( 'input[name="beds"]' ).val( $this.data( 'title' ) );
    $this.closest( '.columns' ).find( '.sales-lettings' ).trigger( 'click' );
    return false;
  });

  //Switch the search content
    $( '.center.title span' ).click( function() {
        if( $( this ).parent().hasClass( 'active' ) ) return false;

        $( '.center.title' ).removeClass( 'active' );
        $( this ).parent().addClass( 'active' );

        //Close the current row
        $( '.row-content' ).addClass( 'closed' );
        $( this ).closest( 'div' ).find( '.row-content' ).removeClass( 'closed' );

        $( '.row-content.closed' ).animate( { height: 0 } );
        $( '.row-content' ).not( '.closed' ).each( function() {
            $( this ).animate( { height: $( this ).data( 'height' ) } );
        });
    });

  $( '.ser' ).click( function() {
       $('.optionsholder').fadeOut();

       $holder = $( this ).find( '.optionsholder' );
       if( $holder.is( ':visible' ) ) {
       } else {
          var pos = $holder.closest( '#wording' ).position();

          $holder.fadeIn();
          $holder.css( 'top', - $holder.find( '.relative-optionsholder' ).height() / 2 );
       }
  });

  $( '.ser .opti' ).click( function () {
       var name = $( this ).closest( '.ser' ).attr( "data-field" );
       var value = $( this ).attr( 'data-value' );
       $( this ).closest( '.ser' ).find( '> .sehp' ).html( $( this ).html() );

       $( this ).closest( 'form' ).find( 'input[name="' + name + '"]' ).val( value );
  });


  $( '.ser1 .sel1 .opti' ).click( function() {
          var val = $( this ).attr( 'data-value' );

          if( val == undefined ) {
                  $( '.ser5 .opti' ).show();
          } else {
                  $( '.ser5 .opti' ).hide();
                  $( '.ser5 .opti.loc-' + val ).show();
                  $( '.ser5 .opti.show-all' ).show();
          }
  });

  $('.sales-lettings').click( function() {
    $('.sales-lettings').removeClass( 'active' );
    $( this ).addClass( 'active' );
    $( 'input[name="status"]' ).val( $(this).attr('data-value') );

    return false;
  });
});
