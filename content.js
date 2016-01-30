function fixMyInputs() {

	var allowCut = function(e) {
		e.stopImmediatePropagation();
		return true;
	};
	var allowCopy = function(e) {
		e.stopImmediatePropagation();
		return true;
	};
	var allowPaste = function(e) {
		e.stopImmediatePropagation();
		return true;
	};
	var allowContextMenu = function(e) {
		e.stopImmediatePropagation();
		return true;
	};
	var allowMouseDown = function(e) {
		e.stopImmediatePropagation();
		return true;
	};
	var allowSelectStart = function(e) {
		e.stopImmediatePropagation();
		return true;
	};
	var allowDragStart = function(e) {
		e.stopImmediatePropagation();
		return true;
	};
	var allowDrag = function(e) {
		e.stopImmediatePropagation();
		return true;
	};
	var allowDrop = function(e) {
		e.stopImmediatePropagation();
		return true;
	};

	document.addEventListener('cut', allowCut, true);
	document.addEventListener('copy', allowCopy, true);
	document.addEventListener('paste', allowPaste, true);
	document.addEventListener('contextmenu', allowContextMenu, true);
	document.addEventListener('mousedown', allowMouseDown, true);
	document.addEventListener('selectstart', allowSelectStart, true);
	document.addEventListener('dragstart', allowDragStart, true);
	document.addEventListener('drag', allowDrag, true);
	document.addEventListener('drop', allowDrop, true);
}

//whitelist check to determine if fix is enabled for the active page
chrome.storage.sync.get({
	whitelistEnabled : false,
	storedWhiteListUrls : ''
}, function(items) {
	var inWhiteList = ((items.whitelistEnabled) && (items.storedWhiteListUrls.search(new RegExp(window.location.hostname, 'i')) !== -1));
	if (!inWhiteList || window.location.hostname == '') {
		//do it
		fixMyInputs();
	}
});

//popup menu option handler
chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
	if (request.callType == "fixMyInputs") {
		fixMyInputs();
		sendResponse({
			data : window.location.hostname
		});
	}
});
