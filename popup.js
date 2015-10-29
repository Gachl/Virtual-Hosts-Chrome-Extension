var domain,
    ip,
    enabled,
    background;

var loadHandler = function() {
  // assign elements to variables for future references
  domain = document.querySelector('#vhost_domain');
  ip = document.querySelector('#vhost_ip');
  enabled = document.querySelector('#vhost_enable');
  background = chrome.extension.getBackgroundPage();

  // add a listener to each input and set the value from the background
  domain.addEventListener("keyup", updateHandler, false);
  domain.value = background.settings.domain;

  ip.addEventListener("keyup", updateHandler, false);
  ip.value = background.settings.ip;

  enabled.addEventListener("change", updateHandler, false);
  enabled.checked = background.settings.enabled;

  updateIcons();
};

var updateIcons = function() {
  chrome.browserAction.setIcon({path: (background.settings.enabled ? 'enabled' : 'disabled') + '.png'});
};

var updateHandler = function(e)
{
  var settings = {
    'domain': domain.value,
    'ip': ip.value,
    'enabled': enabled.checked
  };

  // set the background settings
  background.settings.domain = settings.domain;
  background.settings.ip = settings.ip;
  background.settings.enabled = settings.enabled;

  updateIcons();

  // persist settings
  chrome.storage.sync.set(settings);
};

// init
document.addEventListener('DOMContentLoaded', loadHandler);
