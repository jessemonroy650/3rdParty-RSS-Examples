/*
    Date: 2016-01-06
*/
//
var currentFeed = {
    RSS           : "https://cordova.apache.org/feed.xml",
    entries       : [],
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
        //$('.feedStatus').html
        externalElements['status']('Contacting Server');
        $.get(currentFeed.RSS, function(data, errorCode) {
            //$('.feedStatus').html
            externalElements['status']('Got Feed');
            //alert("got data");
            //console.log("got data");
            var xml    = $( data );
            var title  = xml.find( "title" );
            var items  = xml.find( "item" );
            //$('#toggleStory').html
            externalElements['title'](title.text());
            //$('#dbug').html
            externalElements['dbug']('title:' + title.text() + ":" + items.length );
            $.each(items, function(i, v) {
                entry = {
                    title:$(v).find("title").text(),
                    link:$(v).find("link").text(),
                    description:$.trim($(v).find("description").text())
                };
                currentFeed.entries.push(entry);
            });
            //$('#dbug').html( $('#dbug').html() + ":" + currentFeed.entries.length + ":" + 'List' );
            //now draw the list
            var s = '';
            $.each(currentFeed.entries, function(i, v) {
                s += '<li id="' + i + '" class="contentLink button button-block">' + v.title + '</li>';
            });
            //$("#linksList li").remove();
            externalElements['clear']();
            //$("#linksList").append(s);
            externalElements['attach'](s);
            //$('#dbug').html
            externalElements['dbug']( $('#dbug').html() + ":" + 'Done' );
            //$('.feedStatus').html
            externalElements['status']('Done.');
            buttons.rebind();
        });
    },
    showAddFeed : function () {
        $('#feedInput').removeClass('hidden');
    },
    hideAddFeed : function () {
        $('#feedInput').addClass('hidden');
    },
    addFeed: function (){
    },
    showLinksList : function () {
    },
    hideLinksList : function () {
    },
    showStory : function () {
        //alert('readerApp:showStory - storyId:' + storyId );
        var storyId  = currentFeed.selectedStory;
        var theStory = currentFeed.entries[storyId];
        // fire only if we have a valid reference
        if (theStory) {
            $('#story').html(
                '<h2>'  + theStory.title + '</h2>' +
                '<div>' + theStory.description  + '</div>' +
                '<button id=readMore>Read More ..</button>'
            );
            buttons.readmore(theStory.link);   // create handler to open browser
        }
    },
    hideStory : function () {
    }    
}
