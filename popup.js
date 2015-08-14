var vhost,
    ip,
    enabled,
    background;

var loadHandler = function() {
  // assign elements to variables for future references
  vhost = document.querySelector('#vhost_name');
  ip = document.querySelector('#vhost_ip');
  enabled = document.querySelector('#vhost_enable');
  background = chrome.extension.getBackgroundPage();

  // add a listener to each input and set the value from the background
  vhost.addEventListener("keyup", updateHandler, false);
  vhost.value = background.settings.vhost;

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
    'vhost': vhost.value,
    'ip': ip.value,
    'enabled': enabled.checked
  };

  // set the background settings
  background.settings.vhost = settings.vhost;
  background.settings.ip = settings.ip;
  background.settings.enabled = settings.enabled;

  updateIcons();

  // persist settings
  chrome.storage.local.set(settings);
};

// init
document.addEventListener('DOMContentLoaded', loadHandler);
