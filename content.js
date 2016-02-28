function fixMyInputs(mousedownEnabled, selectstartEnabled) {

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
	var allowMouseDown = function(e) {
		e.stopImmediatePropagation();
		return true;
	};
	var allowSelectStart = function(e) {
		e.stopImmediatePropagation();
		return true;
	};

	document.addEventListener('cut', allowCut, true);
	document.addEventListener('copy', allowCopy, true);
	document.addEventListener('paste', allowPaste, true);
	document.addEventListener('contextmenu', allowContextMenu, true);	
	document.addEventListener('dragstart', allowDragStart, true);
	document.addEventListener('drag', allowDrag, true);
	document.addEventListener('drop', allowDrop, true);
	
	if (mousedownEnabled)
		document.addEventListener('mousedown', allowMouseDown, true);
		
	if (selectstartEnabled)
		document.addEventListener('selectstart', allowSelectStart, true);
}

var performFix = (function fix() {
	//whitelist check to determine if fix is enabled for the active page
	chrome.storage.sync.get({
		whitelistEnabled : false,
		storedWhiteListUrls : '',
		mousedownEnabled : false,
		selectstartEnabled : false
	}, function(config) {
		var inWhiteList = ((config.whitelistEnabled) && (config.storedWhiteListUrls.search(new RegExp(window.location.hostname, 'i')) !== -1));
		if (!inWhiteList || window.location.hostname == '') {
			//do it
			fixMyInputs(config.mousedownEnabled, config.selectstartEnabled);
		}
	});
	return fix;
})();

//popup menu option handler
chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
	if (request.callType == "fixMyInputs") {
		performFix();
		sendResponse({
			data : window.location.hostname
		});
	}
});
