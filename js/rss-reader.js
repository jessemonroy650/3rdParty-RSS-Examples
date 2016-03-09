/*
    Date: 2016-01-06
	      2016-01-12 [BUG FIX] jquery-1.7.2 returned ALL titles, not just the "channel" title.
          2016-03-08 create parseXML()
*/
//
var currentFeed = {
    // reset when click('.feedLink')
    RSS           : "https://cordova.apache.org/feed.xml",
    entries       : [],
    // reset when getFeed();
    title         : "",
    description   : "",
    length        : "",
    lastBuildDate : "",
    selectedStory : ""
};

var readerApp = {
    self : {},
    needFeed : true,
    //
    init : function () {
        console.log("readerApp.init");
    },
    getFeed : function(externalElements) {
        externalElements['preFetch']('Contacting Server ...');
        $.get(currentFeed.RSS, function(data, errorCode) {
            externalElements['postFetch']('Got Feed.');
            // let's see if it will parse
            try {
                // replace(/(^[ \t]*\n)/gm, "")
                var xml           = $( data );
                externalElements['status']('xml make object okay');
            }
            catch(err) {
                externalElements['status']('Cannot create xml Object.');
                navigator.notification.alert("Sorry, I can't parse this RSS format. I'll fix soon, if I can.",
                    function () {},
                    'Bad XML format',
                    'Done'
                );
                return;
            }
            //
            readerApp.parseXML(xml, externalElements);
            externalElements['draw'](currentFeed);
            externalElements['status']('Done.');
        });
    },
    parseXML(xml, extEl) {
        console.log('parsing xml');
        var title         = xml.find( "title" );
        //$('#dbug').html(title + '<br>' + title[0]);
        var xtitle        = title[0].text; // bug in jquery - 2016-01-12
        var description   = xml.find( "description" );
        var items         = xml.find( "item" );
        var lastBuildDate = xml.find( "lastBuildDate" );
        // assign
        currentFeed.title         = xtitle; // title.text();
        currentFeed.description   = description.text();
        currentFeed.lastBuildDate = lastBuildDate.text();
        currentFeed.length        = items.length;
        console.log('title:' + xtitle);
        console.log("# of items:" + items.length);
        // Parse our object
        currentFeed.entries = [];
        $.each(items, function(i, v) {
            console.log("entry:", i);
            // this does not work on Android
            //$(v).find("media\\:content").remove()
            var t = $(v).find("title").text();
            console.log("title", t, t.length );
            console.log("media\\:content", $(v).find("media\\:content").text());

            entry = {
                title:t[t.length],
                link:$(v).find("link").text(),
                description:$.trim($(v).find("description").text())
            };
            currentFeed.entries.push(entry);
        });
    },
    getStory : function (displayFunc) {
        var theStory = currentFeed.entries[currentFeed.selectedStory];
        // fire only if we have a valid reference for theStory and a displayFunc.
        if (theStory && displayFunc) {
            displayFunc(theStory);
        }
    },
}
