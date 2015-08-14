var settings = {
      'vhost': "",
      'ip': "",
      'enabled': false
    },
    requestFilter = {urls: ["<all_urls>"]},
    extraInfoSpec = ["blocking", "requestHeaders"],
    eventHandler = function(details) {
      if (settings.enabled && (details.url.indexOf(settings.ip) > -1)) {
        details.requestHeaders.push({ name: "Host", value: settings.vhost });
        return {requestHeaders: details.requestHeaders};
      }
    };

chrome.storage.local.get(settings, function(result) {
  if(result.vhost) settings.vhost = result.vhost;
  if(result.ip) settings.ip = result.ip;
  if(result.enabled) settings.enabled = result.enabled;
  chrome.browserAction.setIcon({path: (settings.enabled ? 'enabled' : 'disabled') + '.png'});
});

chrome.webRequest.onBeforeSendHeaders.addListener(eventHandler, requestFilter, extraInfoSpec);
