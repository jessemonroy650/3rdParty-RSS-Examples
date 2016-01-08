/*
    Date: 2016-01-06
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
    pubDate       : "",
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
            var xml           = $( data );
            var title         = xml.find( "title" );
            var description   = xml.find( "description" );
            var items         = xml.find( "item" );
            var pubDate       = xml.find( "pubDate" );
            currentFeed.title       = title.text();
            currentFeed.description = description.text();
            currentFeed.pubDate     = pubDate.text();
            currentFeed.length      = items.length;
            externalElements['status']('title:' + title.text() + ":" + items.length);
           // Parse our object
            $.each(items, function(i, v) {
                entry = {
                    title:$(v).find("title").text(),
                    link:$(v).find("link").text(),
                    description:$.trim($(v).find("description").text())
                };
                currentFeed.entries.push(entry);
            });
            externalElements['draw'](currentFeed);
            externalElements['status']('Done.');
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
