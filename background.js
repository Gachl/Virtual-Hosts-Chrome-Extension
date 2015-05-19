var vhost = "";
var enabled = false;

chrome.webRequest.onBeforeSendHeaders.addListener(
	function(details) {
		if (enabled)
		{
			details.requestHeaders.push({ name: "Host", value: vhost });
			return {requestHeaders: details.requestHeaders};
		}
	},
	{urls: ["<all_urls>"]},
	["blocking", "requestHeaders"]);