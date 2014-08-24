$(document).ready(function(){
	var song = new Audio('adhoc_arcadelt2014.mp3');
	var curtime = song.currentTime;	

	$("#play").addEventListener('click', playsong(),false);
		
	/*
$("#pause").addEventListener('click', function(event){
			event.preventDefault();
			song.pause();
			$(this).replaceWith('<a class="button" id="play"></a>');
		});
*/
		
	$("#seek").on("change", function() {
        song.currentTime = $(this).val();
        $("#seek").attr("max", song.duration);
    });
	
	song.addEventListener('timeupdate',function(){
	    curtime = parseInt(song.currentTime, 10);
	    $('#seek').attr('value', curtime);
    });
			
	function playsong() {
	 		event.preventDefault();
			song.play();		
			$(this).replaceWith('<a class="button" id="pause"></a>');		
			$('#seek').attr('max',song.duration);
	}				
	
	// Smooth scroll function
    $(".scroll").click(function(event) {		
		event.preventDefault();
		$('html,body').animate({scrollTop:$(this.hash).offset().top}, 450);
	});
});