// inner variables
var song;
var tracker = $('.tracker');
var volume = $('.volume');

// initialization - first element in playlist
initAudio($('.playlist li:first-child dt'));

// set volume
song.volume = 0.8;

// initialize the volume slider
/*
volume.slider({
    range: 'min',
    min: 1,
    max: 100,
    value: 80,
    start: function(event,ui) {},
    slide: function(event, ui) {
        song.volume = ui.value / 100;
    },
    stop: function(event,ui) {},
});
*/

// empty tracker slider
tracker.slider({
    range: 'min',
    min: 0, max: 10,
    start: function(event,ui) {},
    slide: function(event, ui) {
        song.currentTime = ui.value;
    },
    stop: function(event,ui) {}
});

function initAudio(elem) {
    // Checks if browser supports mp3 or ogg
    var myAudio = document.createElement('audio'); 
    var canPlayMp3 = !!myAudio.canPlayType && "" != myAudio.canPlayType('audio/mpeg');
    if (canPlayMp3) {
        var url = elem.attr('audiourl');
    }
    else {
        var url = elem.attr('oggurl');
    }
    
    var title = elem.text();
    var artist = elem.attr('artist');
    $('.player .title').html("<h3>"+title+"</h3>");
    $('.player .artist').html("<p>"+artist+"</p>");

    song = new Audio(url);
    // timeupdate event listener
    song.addEventListener('timeupdate',function (){
        var curtime = parseInt(song.currentTime, 10);
        tracker.slider('value', curtime);
        
        var s = parseInt(song.currentTime % 60);
	    var m = parseInt((song.currentTime / 60) % 60);
	    parseInt((song.currentTime / 60) % 60);
	    s = (s >= 10) ? s : "0" + s;
	    m = (m >= 10) ? m : m;
	    $(".time").html(m + ':' + s );
    });
    
    // when song ends run finish function
    song.addEventListener('ended', finish, false);
       
    $('.playlist dt').removeClass('active');
    elem.addClass('active');
}

function playAudio() {
    song.play();
	
    tracker.slider("option", "max", song.duration);
    $('.play').addClass('hidden');
    $('.pause').addClass('visible');
}
function stopAudio() {
    song.pause();

    $('.play').removeClass('hidden');
    $('.pause').removeClass('visible');
}

// play click
$('.play').click(function (e) {
    e.preventDefault();

    playAudio();
});

// pause click
$('.pause').click(function (e) {
    e.preventDefault();

    stopAudio();
});

// forward click
$('.fwd').click(function (e) {
    e.preventDefault();

    stopAudio();

    var next = $('.playlist li.active').next();
    if (next.length == 0) {
        next = $('.playlist li:first-child');
    }
    initAudio(next);
});

// rewind click
$('.rew').click(function (e) {
    e.preventDefault();

    stopAudio();

    var prev = $('.playlist li.active').prev();
    if (prev.length == 0) {
        prev = $('.playlist li:last-child');
    }
    initAudio(prev);
});

// playlist elements - click
$('.playlist li').click(function () {
    var songlink = $(this).find('dt');
    stopAudio();
    initAudio(songlink);
    // wait till metadata is loaded for song.duration before playing
    song.addEventListener('loadedmetadata',playAudio, false );
    // second call for Safari iOS 
    playAudio();
});

// reset time to 0 after song finishes
function finish() {
	song.currentTime = 0;
	$('.play').removeClass("hidden");
	$('.pause').removeClass("visible");
}

// Smooth scroll function
$(".scroll").click(function(e) {		
	e.preventDefault();
	$('html,body').animate({scrollTop:$(this.hash).offset().top-40}, 450);
});

// Playlist underline on hover
$(".playlist li").mouseover(function(){
	$(this).find("dt span").addClass("mouse-over");
})
    .mouseout(function(){
        $(this).find("dt span").removeClass("mouse-over");
    });