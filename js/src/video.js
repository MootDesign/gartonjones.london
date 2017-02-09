(function() {
	var video = document.getElementById('video');
	if( video === null ) return;

	//Start me video?
	var startMe = video.classList.contains( 'start-me');
	var fadeMeOut = video.classList.contains( 'fade-out');

	/**
	 * Start the video on complete
	 */
	video.onloadeddata = function() {
		if( startMe ) {
			setTimeout( function( video ) {
				jQuery( video ).parent().fadeIn();

				video.play();
			}, 500, video );
		}
	};

	/**
	 * End video event?
	 */
	 video.onended = function() {
	 	//Show the main content, if exists
	 	if( jQuery( '.fade-onended' ) ) {
	 		jQuery( '.fade-onended' ).fadeIn();
	 		// jQuery( '.card img' ).addClass( 'to-screen' );

			jQuery( '.fade-onended' ).promise().done( function() {
				jQuery( '.card img' ).addClass( 'show' );
			});
	 	}

	 	if( ! fadeMeOut ) return;

 		jQuery(video).parent().delay(1000).fadeOut( 600 );
	 };
})();

function playVideo( videoId, onendCallback ) {
    var video2 = document.getElementById( videoId );

    video2.onended = onendCallback;
    video2.play();
}

function resetVideo( videoId ) {
    var video2 = document.getElementById( videoId );

    video2.currentTime = 0;
}
