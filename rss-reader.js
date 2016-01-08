/*
    Date: 2016-01-06
*/
//
var currentFeed = {
    RSS           : "https://cordova.apache.org/feed.xml",
    entries       : [],
    title         : "",
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
            var xml    = $( data );
            var title  = xml.find( "title" );
            var items  = xml.find( "item" );
            currentFeed.title = title.text();
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
    showAddFeed : function () {
    },
    hideAddFeed : function () {
    },
    addFeed: function (){
    },
    showLinksList : function () {
    },
    hideLinksList : function () {
    },
    getStory : function (displayFunc) {
        //alert('readerApp:showStory - storyId:' + storyId );
        var storyId  = currentFeed.selectedStory;
        var theStory = currentFeed.entries[storyId];
        // fire only if we have a valid reference for theStory and where to put it.
        if (theStory && displayFunc) {
            displayFunc(theStory);
        }
    },
    hideStory : function () {
    }    
}
