function shutter_leave(msg){
	document.getElementById("remind").style.display = "none";
	var shutter=document.getElementById("shutter");
    var shutter_l=document.getElementById("shutter_l_img");
	var shutter_r=document.getElementById("shutter_r_img");
	shutter.style.display='block';
	shutter_r.style.animationName='shadowRightImgLeave';
	shutter_l.style.animationName='shadowLeftImgLeave';
	shutter_r.style.animationDuration='900ms';
	shutter_l.style.animationDuration='900ms';
	document.getElementById("shutteropenaudio").play();
	if(msg=="shutter_song_msg"){
		document.getElementById("shutter_song_msg").style.animationName = "shutter_song_msg_leave";
		document.getElementById("shutter_song_msg").style.animationDuration='500ms';
		document.getElementById("shutter_song_shadow").style.animationName = "shadowLeftImgLeave";
		document.getElementById("shutter_song_shadow").style.animationDuration='900ms';
	}
	setTimeout(function(){
		shutter.style.display='none';
		document.getElementById("shutter").style.display = "none";
		if(msg=="shutter_song_msg"){
			document.getElementById("shutter_song_msg").style.display = "none";
			document.getElementById("shutter_songimgshadow").style.display = "none";
			document.getElementById("shutter_song_shadow").style.display = "none";
		}
	},900);
}
function shutter_show(msg){
	var shutter=document.getElementById("shutter");
    var shutter_l=document.getElementById("shutter_l_img");
	var shutter_r=document.getElementById("shutter_r_img");
	shutter.style.display='block';
	shutter_r.style.animationName='shadowRightImgShow';
	shutter_l.style.animationName='shadowLeftImgShow';
	shutter_r.style.animationDuration='1000ms';
	shutter_l.style.animationDuration='1000ms';
	document.getElementById("shuttercloseaudio").play();
	if(msg=="shutter_song_msg"){
		document.getElementById("shutter_song_msg").style.display = "flex";
		document.getElementById("shutter_song_msg").style.animationName = "shutter_song_msg_enter";
		document.getElementById("shutter_song_msg").style.animationDuration='500ms';
		document.getElementById("shutter_song_shadow").style.display = "block";
		document.getElementById("shutter_song_shadow").style.animationName = "shadowLeftImgShow";
		document.getElementById("shutter_song_shadow").style.animationDuration='1000ms';
	}
	// setTimeout(function(){shadow.style.display='none';},1500);
}