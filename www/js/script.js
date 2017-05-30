var soundOn = true,
	theme = new Howl({
	    urls: ['../audio/background-music.mp3'],
	    volume: 0.1,
	    loop: true
	});

$(document).ready(function(){

	var pathArray = window.location.pathname.split( '/' ),
	currentRegion;

	if(pathArray[1].toLowerCase()=='au' || 
		pathArray[1].toLowerCase()=='br' ||
		pathArray[1].toLowerCase()=='de' ||
		pathArray[1].toLowerCase()=='es' ||
		pathArray[1].toLowerCase()=='fr' ||
		pathArray[1].toLowerCase()=='it' ||
		pathArray[1].toLowerCase()=='las'||
		pathArray[1].toLowerCase()=='nl'||
		pathArray[1].toLowerCase()=='pt' ||
		pathArray[1].toLowerCase()=='seasia' ||
		pathArray[1].toLowerCase()=='latam' ||
		pathArray[1].toLowerCase()=='gr' ||
		pathArray[1].toLowerCase()=='us') {

		currentRegion = pathArray[1].toLowerCase();
		init(currentRegion);

	} else {
		if(location.pathname != "/")  {
			window.location.href = "/";
		} else {
			$('html').addClass('show-region-selectors');
		}
	}

	$('.region-selector, .region-other-selector').click(function(e){
		e.preventDefault();
		var regionID = $(this).attr('id');
		if(regionID) {
			window.history.pushState(null, null, regionID);
			init(regionID.toLowerCase());
		}
	});

	$('.audio-btn').click(function(e){
		e.preventDefault();
		$('.audio-btn').toggleClass('on');
		if($('.audio-btn').hasClass('on')) {
			soundOn = true;
			theme.play();
		} else {
			soundOn = false;
			theme.pause();
		}
	});

	$('.viewTrailer').magnificPopup({
		disableOn: 700,
		type: 'iframe',
		mainClass: 'mfp-fade',
		removalDelay: 160,
		preloader: false,
		fixedContentPos: false,
		callbacks: {
		    open: function() {
		    	soundOn = false;
				theme.pause();
		    },
		    close: function() {
				if($('.audio-btn').hasClass('on')) {
			    	soundOn = true;
					theme.play();
				}
		    }
		}
	});

	$('.howToPlay').magnificPopup({
      type: 'inline'
    });

	$('.returnToGame').click(function(e){
      e.preventDefault();
      $.magnificPopup.close();
    });

});

function init(region) {

	$('html').addClass(region);

	var xmlDoc = loadXMLDoc("/regions/"+region+".xml");
	var x2js = new X2JS();
	gameTextObject = x2js.xml2json(xmlDoc);
	
	// Generate random background;
	var randomBkgd = Math.floor(Math.random() * 3) + 1 
	$('.main-container').addClass('background-'+randomBkgd);
	$('.main-container').removeClass('hidden');

	// Hide Region Selection
	$('.region-container').hide();

	function TextViewModel() {

		this.movieLogo = gameTextObject.Overall.TitleScreen.MovieLogo;
		this.logoText = gameTextObject.Overall.TitleScreen.TextUnderLogo;
		this.gameLogo = gameTextObject.Overall.TitleScreen.GameLogo;
		this.gameLoading = gameTextObject.Overall.TitleScreen.Loading;

	    this.viewTrailerButton = gameTextObject.Overall.TitleScreen.ViewTrailerButton;
	    this.viewTrailerLink = gameTextObject.Overall.TitleScreen.ViewTrailerLink;

	    this.visitSiteButton = gameTextObject.Overall.TitleScreen.VisitSiteButton
	    this.visitSiteLink = gameTextObject.Overall.TitleScreen.VisitSiteLink

	    this.howToPlayButton = gameTextObject.Overall.TitleScreen.HowToPlayButton;  

	    this.facebookLink = gameTextObject.Overall.TitleScreen.FacebookLink;
	    this.twitterLink = gameTextObject.Overall.TitleScreen.TwitterLink;
	    this.googlePlusLink = gameTextObject.Overall.TitleScreen.GooglePlusLink;
	    this.instagramLink = gameTextObject.Overall.TitleScreen.InstagramLink;
	    this.movieRating = gameTextObject.Overall.TitleScreen.MovieRating;

	    this.howToPlayScreenTitle = gameTextObject.Overall.HowToPlayScreen.Title;
	    this.howToPlayScreenIntroduction = gameTextObject.Overall.HowToPlayScreen.Introduction;
	    this.howToPlayScreenDirections = gameTextObject.Overall.HowToPlayScreen.Directions;
	    this.howToPlayScreenReturnToGameButton = gameTextObject.Overall.HowToPlayScreen.ReturnToGameButton;

	}

	// Bind Copy
	ko.applyBindings(new TextViewModel());

	// Load game
	main = new Main();
	theme.play();
	window.scrollTo(0, 0);

}

function loadXMLDoc(dname) {
    if (window.XMLHttpRequest) {
        xhttp=new XMLHttpRequest();
    }
    else {
        xhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhttp.open("GET",dname,false);
    xhttp.send();
    return xhttp.responseXML;

}

$('#BR').click(function(){
    $('.facebook').hide();
    $('.twitter').hide();
    $('.google').hide();
    $('.instagram').hide();
});

$(function() {
    if ( document.location.href.indexOf('/BR') > -1 ) {
            $('.facebook').hide();
    		$('.twitter').hide();
    		$('.google').hide();
    		$('.instagram').hide();
    }
});

$(function() {
    if ( document.location.href.indexOf('/br') > -1 ) {
            $('.facebook').hide();
    		$('.twitter').hide();
    		$('.google').hide();
    		$('.instagram').hide();
    }
});

$('#LatAm').click(function(){
	$('.google').hide();
	$('.instagram').hide();
});

$(function() {
    if ( document.location.href.indexOf('/LatAm') > -1 ) {
    		$('.google').hide();
    		$('.instagram').hide();
    }
});

$(function() {
    if ( document.location.href.indexOf('/latam') > -1 ) {
    		$('.google').hide();
    		$('.instagram').hide();
    }
});

$('#NL').click(function(){
	$('.google').hide();
});

$(function() {
    if ( document.location.href.indexOf('/NL') > -1 ) {
    		$('.google').hide();
    }
});

$(function() {
    if ( document.location.href.indexOf('/nl') > -1 ) {
    		$('.google').hide();
    }
});

$('#GR').click(function(){
	$('.google').hide();
	$('.instagram').hide();
});

$(function() {
    if ( document.location.href.indexOf('/GR') > -1 ) {
    		$('.google').hide();
    		$('.instagram').hide();
    }
});

$(function() {
    if ( document.location.href.indexOf('/gr') > -1 ) {
    		$('.google').hide();
    		$('.instagram').hide();
    }
});
