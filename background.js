// // Copyright 2018 The Chromium Authors. All rights reserved.
// // Use of this source code is governed by a BSD-style license that can be
// // found in the LICENSE file.

'use strict';
console.log("At least reached background.js");

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.from=='content_script')
	{
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			if (request.message=='true')
			{
			  chrome.pageAction.show(tabs[0].id);
			}
			else 
			{
			  chrome.pageAction.hide(tabs[0].id);				
			}
		});
	}
});

chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
    if(details.frameId === 0) {
        // Fires only when details.url === currentTab.url
        chrome.tabs.get(details.tabId, function(tab) {
            if(tab.url === details.url) {
		        chrome.tabs.executeScript({
		          file: 'content_script.js'
		        });
      //           chrome.runtime.sendMessage(
      //           	{ from: 'background'},
      //           	function(response){
      //           		//do something with response
						// if (response.pass=="true")
						// {
						// 	chrome.pageAction.show(currentTab.id);
						// }
						// else 
						// {
						// 	chrome.pageAction.hide(currentTab.id);
						// }
      //           	});
            }
        });
    }
});




// // chrome.runtime.onInstalled.addListener(function() {
// //   chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
// //     chrome.declarativeContent.onPageChanged.addRules([{
// //       conditions: [new chrome.declarativeContent.PageStateMatcher({
// //         pageUrl: {hostEquals: 'www.youtube.com'},
// //       })],
// //       actions: [new chrome.declarativeContent.RequestContentScript({
// //       	js:["content_script.js"]
// //   	  })]
// //     }]);
// //   });
// // });
