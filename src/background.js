// add event listener for whenever the injector script sends a message
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

	// if the request was to start a download, start a download
	if (request.type === "download") {

		// start the download
		chrome.downloads.download({
			filename: "program." + request.extension,
			url: "data:text/plain;charset=utf-8," + encodeURIComponent(request.data),
			saveAs: true
		});
	}
});