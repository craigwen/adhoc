// Add play/pause button actions
function player() {
	if (audioTrack.paused) {
		$(playButton).removeClass("play-btn");
		$(playButton).addClass("pause-btn");
		audioTrack.play();
	} else {
		$(playButton).removeClass("pause-btn");
		$(playButton).addClass("play-btn");
		audioTrack.pause();
	}
}

// Change text in button function
function setText(el,text) {
	el.innerHTML = text;
}

// reset time slider to beginning upon completion of song
function finish() {
	audioTrack.currentTime = 0;
	$(playButton).removeClass("pause-btn");
	$(playButton).addClass("play-btn");
}

// Update progress bar as song plays
function updatePlayhead() { 
	playhead.value = audioTrack.currentTime;
	var s = parseInt(audioTrack.currentTime % 60);
    var m = parseInt((audioTrack.currentTime / 60) % 60);
    parseInt((audioTrack.currentTime / 60) % 60);
    s = (s >= 10) ? s : "0" + s;
    m = (m >= 10) ? m : "0" + m;
    playbacktime.innerHTML = m + ':' + s ;
}

// Mute button
function muter() {
	if (audioTrack.volume == 0) {
		audioTrack.volume = 1;
		$(muteButton).removeClass('muted-btn');
		$(muteButton).addClass('speaker-btn');
	} else {
		audioTrack.volume = 0;
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

var audioPlayer = document.getElementById("audioplayer"),
	audioTrack = document.getElementById("audiotrack"),
	playButton = document.createElement("button"),
	muteButton = document.createElement("button"),
	playback = document.getElementById("playback"),
	playhead = document.createElement("progress"),
	playbackTime = document.createElement("div");
playButton.type = "button";
muteButton.type = "button";
playButton.addEventListener("click", player, false);
muteButton.addEventListener("click", muter, false);
setAttributes(playButton, { "type": "button", "class": "play-btn"});
setAttributes(muteButton, { "type": "button", "class": "speaker-btn"});
setAttributes(playbackTime, { "id": "playbacktime"});
setAttributes(playhead, { "min": "0", "max": "100", "value": "0", "id": "playhead" });
playback.appendChild(playButton);
playback.appendChild(playhead);
playback.appendChild(playbackTime);
playback.appendChild(muteButton);
updatePlayhead();
$(audioTrack).addClass("no-display");
audioTrack.removeAttribute("controls");
audioTrack.addEventListener('ended', finish, false);
var duration = audioTrack.duration;
audioTrack.addEventListener('timeupdate', updatePlayhead, false);
audioTrack.addEventListener('playing', function(){ playhead.max = audioTrack.duration; }, false);

// Smooth scroll function
$(".scroll").click(function(event) {		
	event.preventDefault();
	$('html,body').animate({scrollTop:$(this.hash).offset().top-40}, 450);
});

