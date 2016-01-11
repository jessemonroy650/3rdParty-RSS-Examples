# 3rdParty-RSS-Examples
Date: 2016-01-05<br>
Last Update: 2016-01-05

My version of Raymond Camden's [PhoneGap RSS Reader](http://www.raymondcamden.com/2011/10/11/PhoneGap-RSS-Reader) done in 2011.

- `jquery-1.7.2.min.js` as used over `zepto-1.1.6.js` because it handles both majors of RSS and the methon `.on()`.

###Known Bugs###

- LG Leon running Android 5.1.0 does not handle the backbutton correctly. Phonegap should trap the event and prevent it, but it does not - until the second time the app is started, in sequence.
- Sometimes the app refuses to exit when first started.
