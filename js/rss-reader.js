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
        externalElements['status']('Contacting Server ...');
        $.get(currentFeed.RSS, function(data, errorCode) {
            externalElements['status']('Got Feed.');
            // let's see if it will parse
            try {
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
            this.parseXML(xml);
            externalElements['draw'](currentFeed);
            externalElements['status']('Done.');
        });
    },
    parseXML(xml) {
        var title         = xml.find( "title" );
        //$('#dbug').html(title + '<br>' + title[0]);
        var xtitle        = title[0]; // bug in jquery - 2016-01-12
        var description   = xml.find( "description" );
        var items         = xml.find( "item" );
        var lastBuildDate = xml.find( "lastBuildDate" );
        // assign
        currentFeed.title         = xtitle; // title.text();
        currentFeed.description   = description.text();
        currentFeed.lastBuildDate = lastBuildDate.text();
        currentFeed.length        = items.length;
        externalElements['status']('title:' + xtitle + ":" + items.length);
        // Parse our object
        currentFeed.entries = [];
        $.each(items, function(i, v) {
            entry = {
                title:$(v).find("title").text(),
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
