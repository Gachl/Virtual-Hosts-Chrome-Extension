var settings = {
      'domain': "",
      'ip': "",
      'enabled': false
    },
    requestFilter = {urls: ["<all_urls>"]},
    onBeforeSendHeadersHandler = function(details) {
      if (settings.enabled && (details.url.indexOf(settings.ip) > -1)) {
        details.requestHeaders.push({ name: "Host", value: settings.domain });
        return {requestHeaders: details.requestHeaders};
      }
    },
    onBeforeRequestHandler = function(details) {
      if (settings.enabled && (details.url.indexOf(settings.domain) > -1)) {
        return { redirectUrl: details.url.replace(settings.domain, settings.ip) };
      }
    };

chrome.storage.sync.get(settings, function(result) {
  if(result.domain) settings.domain = result.domain;
  if(result.ip) settings.ip = result.ip;
  if(result.enabled) settings.enabled = result.enabled;
  chrome.browserAction.setIcon({path: (settings.enabled ? 'enabled' : 'disabled') + '.png'});
});

chrome.webRequest.onBeforeRequest.addListener(onBeforeRequestHandler, requestFilter, ["blocking"]);
chrome.webRequest.onBeforeSendHeaders.addListener(onBeforeSendHeadersHandler, requestFilter, ["blocking", "requestHeaders"]);
