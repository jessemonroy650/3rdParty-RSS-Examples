# 3rdParty-RSS-Examples
Date: 2016-01-05<br>
Last Update: 2016-01-05

My version of Raymond Camden's [PhoneGap RSS Reader](http://www.raymondcamden.com/2011/10/11/PhoneGap-RSS-Reader) done in 2011.

- Uses `jquery-1.7.2.min.js` instead of `zepto-1.1.6.js` because it handles both major types of RSS and the method `.on()`. However, it had a RSS parsing bug. A work around fixed the issue (see [js/rss-reader.js](js/rss-reader.js)).

## Plugins Used ##

- cordova-plugin-device - to determine device type and fix some UI elements
- cordova-plugin-dialogs - mostly for popup messages
- cordova-plugin-inappbrowser - launches native webbrowser
- cordova-plugin-splashscreen - controls splashscreens, required for iOS
- cordova-plugin-whitelist - controls networks access, required for Android and iOS

###Known Bugs###

- LG Leon (Android 5.1.0) does not handle the backbutton correctly. Phonegap should trap the event and prevent it, but it does not - until the second time the app is started, in sequence.
- LG Leon (Android 5.1.0) sometimes the app refuses to exit, when the app is first started.
- LG Leon (Android 5.1.0) sometimes the Cordova *device* plugin fails, when the app is first started.
- With some blogs, the *title* to the story gets mangled with other fields.
- Some news feeds use improper format, namely Google news.
