var coverflow;

FWDS3DCovUtils.onReady(function() {
  // if( jQuery( '#coverflowData' ).length > 0 ) {
  if (jQuery('.coverflow-me').length > 0) {
		generateCoverflow();
	}
});

function generateCoverflow() {
	jQuery('.coverflow-me').each(function() {
		// console.log( this, this.dataset.dest || "myDiv", this.id );
		coverflow = new FWDSimple3DCoverflow({
			//required settings
			coverflowHolderDivId: this.dataset.dest || "myDiv",
			coverflowDataListDivId: this.id, // "coverflowData",
			displayType: "fluidwidth",
			autoScale: "no",
			coverflowWidth: 940,
			coverflowHeight: 600,
			skinPath: "load/skin_black",

			//main settings
			backgroundColor: "",
			backgroundImagePath: "",
			backgroundRepeat: "repeat-x",
			showDisplay2DAlways: "no",
			coverflowStartPosition: "center",
			coverflowTopology: "dualsided",
			coverflowXRotation: 0,
			coverflowYRotation: 0,
			numberOfThumbnailsToDisplayLeftAndRight: "6",
			infiniteLoop: "no",
			rightClickContextMenu: "",
			fluidWidthZIndex: 2,

			//thumbnail settings
			thumbnailWidth: 400,
			thumbnailHeight: 266,
			thumbnailXOffset3D: 86,
			thumbnailXSpace3D: 78,
			thumbnailZOffset3D: 200,
			thumbnailZSpace3D: 93,
			thumbnailYAngle3D: 70,
			thumbnailXOffset2D: 20,
			thumbnailXSpace2D: 30,
			thumbnailHoverOffset: 100,
			thumbnailBorderSize: 0,
			thumbnailBackgroundColor: "#000000",
			thumbnailBorderColor1: "#000000",
			thumbnailBorderColor2: "#000000",
			transparentImages: "no",
			thumbnailsAlignment: "center",
			maxNumberOfThumbnailsOnMobile: 99,
			showThumbnailsGradient: "yes",
			thumbnailGradientColor1: "rgba(0, 0, 0, 0)",
			thumbnailGradientColor2: "rgba(0, 0, 0, 1)",
			showText: "yes",
			textOffset: 10,
			showThumbnailBoxShadow: "yes",
			thumbnailBoxShadowCss: "0px 2px 2px #111111",
			showTooltip: "no",
			dynamicTooltip: "no",
			showReflection: "yes",
			reflectionHeight: 60,
			reflectionDistance: 0,
			reflectionOpacity: .4,

			//controls settings
			slideshowDelay: 5000,
			autoplay: "no",
			disableNextAndPrevButtonsOnMobile: "no",
			controlsMaxWidth: 700,
			slideshowTimerColor: "#000000",
			controlsPosition: "bottom",
			controlsOffset: 15,
			showPrevButton: "no",
			showNextButton: "no",
			showSlideshowButton: "no",
			showScrollbar: "no",
			disableScrollbarOnMobile: "yes",
			enableMouseWheelScroll: "yes",
			scrollbarHandlerWidth: 200,
			scrollbarTextColorNormal: "#000000",
			scrollbarTextColorSelected: "#000000",
			addKeyboardSupport: "yes",

			//categories settings
			showCategoriesMenu: "no",
			startAtCategory: 1,
			categoriesMenuMaxWidth: 700,
			categoriesMenuOffset: 25,
			categoryColorNormal: "#999999",
			categoryColorSelected: "#000000",

			//lightbox settings
			addLightBoxKeyboardSupport: "yes",
			showLightBoxNextAndPrevButtons: "yes",
			showLightBoxZoomButton: "yes",
			showLightBoxInfoButton: "yes",
			showLightBoxSlideShowButton: "yes",
			showLightBoxInfoWindowByDefault: "no",
			slideShowAutoPlay: "no",
			lightBoxVideoAutoPlay: "no",
			lightBoxVideoWidth: 640,
			lightBoxVideoHeight: 480,
			lightBoxIframeWidth: 800,
			lightBoxIframeHeight: 600,
			lightBoxBackgroundColor: "#000000",
			lightBoxInfoWindowBackgroundColor: "#000000",
			lightBoxItemBorderColor1: "#fcfdfd",
			lightBoxItemBorderColor2: "#e4FFe4",
			lightBoxItemBackgroundColor: "#333333",
			lightBoxMainBackgroundOpacity: .8,
			lightBoxInfoWindowBackgroundOpacity: .9,
			lightBoxBorderSize: 0,
			lightBoxBorderRadius: 0,
			lightBoxSlideShowDelay: 4000
		});

		coverflow.addListener(FWDSimple3DCoverflow.IS_API_READY, onApiReady);
		coverflow.addListener(FWDSimple3DCoverflow.THUMB_CHANGE, onThumbChange);
		coverflow.addListener(FWDSimple3DCoverflow.CATEGORY_CHANGE, onCategoryChange);
	});
}

function gotoNextCategory() {
  coverflow.switchCategory(coverflow.getCurrentCategoryId() + 1);
}

function gotoNextThumb() {
  coverflow.gotoThumb(coverflow.getCurrentThumbId() + 1);
}

function gotoPrevThumb() {
  coverflow.gotoThumb(coverflow.getCurrentThumbId() - 1);
}

function startStopSlideshow() {
  if (coverflow.isSlideshowPlaying()) {
    coverflow.stopSlideshow();
  } else {
    coverflow.startSlideshow();
  }
}

function onApiReady() {
  // centerTheCoverlow();
	//
  // jQuery('#change-view li').click(function() {
  //   centerTheCoverlow();
  // });
}

function onThumbChange(ev) {
  //				console.log("thumb id: " + ev.id);
}

function onCategoryChange(ev) {
  //				console.log("category id: " + ev.id);
}

function centerTheCoverlow() {
  jQuery('#' + coverflow.propsObj.coverflowHolderDivId + '-fluidwidth').transition({
    opacity: 1,
    top: '42%',
    y: '-50%',
    x: 0,
    z: 0
  }, 0);
  // jQuery('#myDiv-fluidwidth').transition({opacity: 1, top: '42%',y: '-50%',x:0,z:0}, 0);
  // jQuery('#myVideo-fluidwidth').transition({opacity: 1, top: '42%',y: '-50%',x:0,z:0}, 0);

  //Strip height
  var h = jQuery('#coverflow canvas').first().parent().outerHeight();
  jQuery('#cover-strip').height(h + 100);
  // console.log( h );
}

var id = 'myID';

// function changeposition(top) {}
