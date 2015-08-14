var settings = {
      'vhost': "",
      'ip': "",
      'enabled': false
    },
    requestFilter = {urls: ["<all_urls>"]},
    onBeforeSendHeadersHandler = function(details) {
      if (settings.enabled && (details.url.indexOf(settings.ip) > -1)) {
        details.requestHeaders.push({ name: "Host", value: settings.vhost });
        return {requestHeaders: details.requestHeaders};
      }
    },
    onBeforeRequestHandler = function(details) {
      if (settings.enabled && (details.url.indexOf(settings.vhost) > -1)) {
        return { redirectUrl: details.url.replace(settings.vhost, settings.ip) };
      }
    };

chrome.storage.local.get(settings, function(result) {
  if(result.vhost) settings.vhost = result.vhost;
  if(result.ip) settings.ip = result.ip;
  if(result.enabled) settings.enabled = result.enabled;
  chrome.browserAction.setIcon({path: (settings.enabled ? 'enabled' : 'disabled') + '.png'});
});

chrome.webRequest.onBeforeRequest.addListener(onBeforeRequestHandler, requestFilter, ["blocking"]);
chrome.webRequest.onBeforeSendHeaders.addListener(onBeforeSendHeadersHandler, requestFilter, ["blocking", "requestHeaders"]);
