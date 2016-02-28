function enableDisable_Whitelist() {
	var cb = document.getElementById('whitelistCb');
	if (cb.checked) {
		document.getElementById('whitelistSection').className = "";
		document.getElementById('whitelist').removeAttribute('readonly');
	} else {
		document.getElementById('whitelistSection').className = "disabled";
		document.getElementById('whitelist').setAttribute("readonly", "readonly");
	}
}

function save_options() {
	
	var whitelistCbChecked = document.getElementById('whitelistCb').checked;
	var whitelistUrls = document.getElementById('whitelist').value;
	var mousedownCbChecked = document.getElementById('mousedownCb').checked;
	var selectstartCbChecked = document.getElementById('selectstartCb').checked;
	
	chrome.storage.sync.set({
		whitelistEnabled : whitelistCbChecked,
		storedWhiteListUrls : whitelistUrls,
		mousedownEnabled : mousedownCbChecked,
		selectstartEnabled : selectstartCbChecked
	}, function() {
		var status = document.getElementById('status');
		status.textContent = 'Options saved.';
		setTimeout(function() {
			status.textContent = '';
		}, 750);
	});
}

function restore_options() {
	chrome.storage.sync.get({
		whitelistEnabled : false,
		storedWhiteListUrls : 'someIgnoredUrl.com;anotherIgnoredUrl.com',
		mousedownEnabled : false,
		selectstartEnabled : false
	}, function(config) {
		document.getElementById('whitelistCb').checked = config.whitelistEnabled;
		enableDisable_Whitelist();
		document.getElementById('whitelist').value = config.storedWhiteListUrls;
		document.getElementById('mousedownCb').checked = config.mousedownEnabled;
		document.getElementById('selectstartCb').checked = config.selectstartEnabled;
	});
}

function close_options() {
	window.close();
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('whitelistCb').addEventListener('click', enableDisable_Whitelist);
document.getElementById('save').addEventListener('click', save_options);
document.getElementById('close').addEventListener('click', close_options);

