// Add play/pause button actions
function player(song) {
	if (song.paused) {
		$(playButton).removeClass("play-btn");
		$(playButton).addClass("pause-btn");
		song.play();
	} 
	else {
		$(playButton).removeClass("pause-btn");
		$(playButton).addClass("play-btn");
		song.pause();
	}
}

// Change text in button function
/*
function setText(el,text) {
	el.innerHTML = text;
}
*/

// reset time slider to beginning upon completion of song
function finish() {
	audioTrack1.currentTime = 0;
	$(playButton).removeClass("pause-btn");
	$(playButton).addClass("play-btn");
}

// Update progress bar as song plays
function updatePlayhead(song) { 
	playhead.value = song.currentTime;
	var s = parseInt(song.currentTime % 60);
    var m = parseInt((song.currentTime / 60) % 60);
    parseInt((song.currentTime / 60) % 60);
    s = (s >= 10) ? s : "0" + s;
    m = (m >= 10) ? m : "0" + m;
    playbacktime.innerHTML = m + ':' + s ;
}

// Mute button
function muter(song) {
	if (song.volume == 0) {
		song.volume = 1;
		$(muteButton).removeClass('muted-btn');
		$(muteButton).addClass('speaker-btn');
	} else {
		song.volume = 0;
		$(muteButton).removeClass('speaker-btn');
		$(muteButton).addClass('muted-btn');
	}
}

// Function to set multiple attributes quickly
function setAttributes(el, attrs) {
	for(var key in attrs){
		el.setAttribute(key, attrs[key]);
	}
}

var audioTrack1 = document.getElementById("audiotrack1"),
	audioTrack2 = document.getElementById("audiotrack2"),
	playButton = document.createElement("button"),
	muteButton = document.createElement("button"),
	playback1 = document.getElementById("playback1"),
	playback2 = document.getElementById("playback2"),
	playhead = document.createElement("progress"),
	playbackTime = document.createElement("div");
playButton.type = "button";
muteButton.type = "button";
playButton.addEventListener("click", function (){ player(audioTrack1) }, false);
playButton.addEventListener("click", function (){ player(audioTrack2) }, false);
muteButton.addEventListener("click", function (){ muter(audioTrack1) }, false);
muteButton.addEventListener("click", function (){ muter(audioTrack2) }, false);

setAttributes(playButton, { "type": "button", "class": "play-btn"});
setAttributes(muteButton, { "type": "button", "class": "speaker-btn"});
setAttributes(playbackTime, { "id": "playbacktime"});
setAttributes(playhead, { "min": "0", "max": "100", "value": "0", "id": "playhead" });

playback1.appendChild(playButton);
playback1.appendChild(playhead);
playback1.appendChild(playbackTime);
playback1.appendChild(muteButton);

/*
playback2.appendChild(playButton);
playback2.appendChild(playhead);
playback2.appendChild(playbackTime);
playback2.appendChild(muteButton);
*/

updatePlayhead(audioTrack1);
updatePlayhead(audioTrack2);

$(audioTrack1).addClass("no-display");
$(audioTrack2).addClass("no-display");

audioTrack1.removeAttribute("controls");
audioTrack2.removeAttribute("controls");

audioTrack1.addEventListener('ended', finish, false);
audioTrack2.addEventListener('ended', finish, false);

var duration = audioTrack1.duration;
audioTrack1.addEventListener('timeupdate', function() { updatePlayhead(audioTrack1) }, false);
audioTrack2.addEventListener('timeupdate', function () { updatePlayhead(audioTrack2) }, false);
audioTrack1.addEventListener('playing', function(){ playhead.max = audioTrack1.duration; }, false);
audioTrack2.addEventListener('playing', function(){ playhead.max = audioTrack2.duration; }, false);

// Smooth scroll function
$(".scroll").click(function(event) {		
	event.preventDefault();
	$('html,body').animate({scrollTop:$(this.hash).offset().top-40}, 450);
});

