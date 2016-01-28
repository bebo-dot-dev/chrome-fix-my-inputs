function show_options() {
	chrome.runtime.openOptionsPage();
}

function call_fixMyInputs() {
	chrome.tabs.getSelected(null, function(tab) {
		chrome.tabs.sendRequest(tab.id, {
			callType : "fixMyInputs"
		});
	});
}

document.getElementById('optionsMenuItem').addEventListener('click', show_options);
document.getElementById('fixNowMenuItem').addEventListener('click', call_fixMyInputs);
