# Virtual-Hosts-Chrome-Extension
Overwrite the virtual host HTTP header in Chrome requests to debug your web server or work around DNS restrictions.

This extension is available in the Chrome Web Store: https://chrome.google.com/webstore/detail/virtual-hosts/aiehidpclglccialeifedhajckcpedom

I've received a couple of requests to implement some more features, unfortunately I simply don't have the time. Therefore I release this project so if there are any features you're missing, you are now able to implement them :)

Please do not monetize on this code, keep it open and free.  Fork and pull if you'd like to see your feature in the Web Store version!

## How do I use this?

Install the extension, click the extension icon to open the settings popup.  Enter your domain name in the `Request VHost` and your server IP address is the `VHost IP` box.  Tick the `Enable` box.  In Chrome, visit the VHost IP and viola!  Just like editing the hosts file but without the annoyance.

~~Settings are synced via Chrome to other machines~~ (coming soon).  Awesome! :thumbsup:

## What is the purpose of this?

Often enough while waiting for DNS propagation or standing up a replacement site, developers edit the **hosts** file on their system to achieve the same effect.  This extension basically does the same thing without the hassle.

When detecting outgoing requests from your Chrome browser to the `VHost IP`, the extension simply adds a `Host` header containing the domain name specified in the `Request VHost`.  Any requests to sites other than the `VHost IP` are ignored, so browsing other sites won't be impacted.
