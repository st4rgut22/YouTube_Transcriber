'use strict';

let transcriptBtn = document.getElementById("addTranscript");
let transcriptBody = document.getElementById("transcribeBody");

var url; 
var youtubeId;
var hasScript=true;
chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
	var currentTab = tabs[0];
    url = currentTab.url;
    youtubeId = /(v=(.*))/g.exec(url)[2];
	const Http = new XMLHttpRequest();
	const captionUrl = 'https://www.youtube.com/api/timedtext?v=' + youtubeId + '&lang=en';
	Http.open("GET",captionUrl);
	Http.send();
	console.log("sent http request");
	Http.onreadystatechange=function(){
		if(this.readyState==4 && this.status==200)
		{
			var transcript = Http.responseText;
			transcript.replace(/./g,'<br>');
			transcriptBody.innerHTML=transcript;
		}
	}
});