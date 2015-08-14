var vhost = "",
    enabled = false,
		requestFilter = {urls: ["<all_urls>"]},
		extraInfoSpec = ["blocking", "requestHeaders"],
		eventHandler = function(details) {
			if (enabled)
			{
				details.requestHeaders.push({ name: "Host", value: vhost });
				return {requestHeaders: details.requestHeaders};
			}
		};

chrome.webRequest.onBeforeSendHeaders.addListener(eventHandler, requestFilter, extraInfoSpec);
