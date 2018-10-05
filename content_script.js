url = location.href;
youtubeId = /(v=(.*))/g.exec(url);
console.log("reach content_script.js");
if (youtubeId!=null)
{
	console.log("got youtube id");
	let id = youtubeId[2];
	//send http GET request 
	const Http = new XMLHttpRequest();
	const captionUrl = 'https://www.youtube.com/api/timedtext?v=' + id + '&lang=en';
	console.log(captionUrl);
	Http.open("GET",captionUrl);
	Http.send();
	console.log("sent http request");
	Http.onreadystatechange=function(){
		if(this.readyState==4 && this.status==200)
		{
			var transcript = Http.responseText;
			if (transcript=="")
			{
				console.log("empty");
				chrome.runtime.sendMessage({ from: 'content_script', message: 'false' });

			}
			else 
			{
				console.log("sending message to background script");
				//tell background js to light up
				chrome.runtime.sendMessage({ from: 'content_script', message: 'true' });
			}
		}
	}
}