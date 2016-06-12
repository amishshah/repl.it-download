// Add the main script to the page that handles reading data from the page
// and then sends it back to this script
var script = document.createElement("script");
script.type = "text/javascript";
script.src = chrome.extension.getURL("main.js");
(document.head || document.body || document.createElement).appendChild(script);

// Add an event listener for messages from the injected script
window.addEventListener("message", event => {

	// if the event was to download, send a download request to the background script
	if (event.data.type === "replit_download") {

		// send request to background script
		chrome.runtime.sendMessage({ 
			type: "download",
			data: event.data.data,
			extension: event.data.extension,
		});
	}
});