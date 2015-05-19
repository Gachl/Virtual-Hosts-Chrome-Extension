window.addEventListener("load", function(e)
{
	var vn = document.querySelector('#vhost_name');
	vn.addEventListener("keyup", update);
	vn.value = chrome.extension.getBackgroundPage().vhost;
	var ve = document.querySelector('#vhost_enable');
	ve.addEventListener("change", tick);
	ve.checked = chrome.extension.getBackgroundPage().enabled ? true : false;
	chrome.browserAction.setIcon({path: (chrome.extension.getBackgroundPage().enabled ? 'enabled' : 'disabled') + '.png'})
}, false);

function update(e)
{
	chrome.extension.getBackgroundPage().vhost = e.target.value;
	chrome.extension.getBackgroundPage().enabled = true;
	document.getElementById("vhost_enable").checked = true;
	chrome.browserAction.setIcon({path: 'enabled.png'})
}

function tick(e)
{
	chrome.extension.getBackgroundPage().enabled = e.target.checked;
	chrome.browserAction.setIcon({path: (e.target.checked ? 'enabled' : 'disabled') + '.png'})
}