#= NOTES =
Date: 2016-01-04<br>
Last Update: 2016-03-08

----
Date: 2016-03-09

WORKS obj.children('title') not obj.find('title')

----
Date: 2016-03-08T19:10:35

Tried: 'obj.replace(/(^<media:title .*$)/gm, "")' before and after object creation.

----
Date: 2016-03-08

Tried jquery-1.11.1js and jquery-2.1.1.min.js same results.

TRY NEXT. Remove line with regex

----
Date: 2016-02-07

Tring to fix parsing routine for the <title>, but am getting <media:title> added.

Tried various "Tree Traversal" (.first .next .closest ), but did not work.

TRY NEXT. Another version of jquery.


----

Date: 2016-01-04

Claims Jquery 1.5 will do the parsing.

- Displaying Feed Content using jQuery
http://www.htmlgoodies.com/beyond/javascript/stips/displaying-feed-content-using-jquery.html

Follow up; a little help.

- *Parsing RSS Feeds in JavaScript ? Options*
http://www.raymondcamden.com/2015/12/08/parsing-rss-feeds-in-javascript-options

THIS WORKED

- *PhoneGap RSS Reader - October 11, 2011 (by Raymond Camden)*
- http://www.raymondcamden.com/2011/10/11/PhoneGap-RSS-Reader

This Had issues.

- *xml2json.js and json2xml.js*
- http://goessner.net/download/prj/jsonxml/
- Found at: http://stackoverflow.com/questions/1773550/convert-xml-to-json-and-back-using-javascript


## Anaylze and Debug ##
1. get sample `curl -o blogname.xml https://cordova.apache.org/feed.xml`
2. http://codebeautify.org/xmlviewer
3. http://www.utilities-online.info/xmltojson/
