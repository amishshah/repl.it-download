// map editor types to file extensions
var extensionMap = {
	"Python3" : "py",
	"Ruby" : "rb",
	"JavaScript" : "js",
};

// gets the typed in code from the editor and returns it
function getCode() {
	var editor = $($(".ace_editor.ace-tm")[0]);
	editor.attr("id", "aceeditor");
	return ace.edit("aceeditor").getValue();
}

// injects the download button into the editor
function inject() {

	// get the base button - which is the save button - to base the download button off
	var baseButton = $($("div[title=Save]")[0]);

	// if there is no base button, return
	if (!baseButton) {
		return;
	}

	// get the container for the buttons, which will be where the download button will be added
	var buttonBar = $(baseButton.parent());

	// if there is no button container, return
	if(!buttonBar) {
		return;
	}

	// clone the base button into a download button then add it to the container
	var downloadButton = baseButton.clone().appendTo(buttonBar);

	// modify the download button so it doesn't say "Save"
	downloadButton.attr("title", "Download");
	downloadButton.attr("id", "replitDownloadButton");
	$(downloadButton.find("span")[0]).html("download");

	// whenever the button is clicked, make a request to download to the injector
	// script which will pass it onto the background script
	downloadButton.click(() => {
		window.postMessage({
			type : "replit_download",
			data: getCode(),
			extension: extensionMap[$($("h1")[0]).text()]
		}, "*");
	});
}

// try to inject the button
inject();

function check() {
	if (!document.getElementById("replitDownloadButton")) {
		inject();
	}
}

// try to inject the button every 0.5 seconds
setInterval(check, 500);