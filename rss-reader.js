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
    getFeed : function() {
        $('#feedStatus').html('Contacting Server');
        $.get(currentFeed.RSS, function(data, errorCode) {
            $('#feedStatus').html('Got Feed');
            //alert("got data");
            //console.log("got data");
            var xml    = $( data );
            var title  = xml.find( "title" );
            var items  = xml.find( "item" );
            $('#toggleBtn').html(title.text());
            $('#dbug').html('title:' + title.text() + ":" + items.length );
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
            $("#linksList li").remove();
            $("#linksList").append(s);
            $('#dbug').html( $('#dbug').html() + ":" + 'Done' );
            $('#feedStatus').html('Done.');
            buttons.rebind();
        });
    },
    showAddFeed : function () {
        $('#feedInput').removeClass('hidden');
        readerApp.hideLinksList();
    },
    hideAddFeed : function () {
        $('#feedInput').addClass('hidden');
        readerApp.showLinksList();
    },
    showLinksList : function () {
        $('#linksList').removeClass('hidden');
    },
    hideLinksList : function () {
        $('#linksList').addClass('hidden');
    },
    showStory : function () {
        //alert('readerApp:showStory - storyId:' + storyId );
        var storyId  = currentFeed.selectedStory;
        var theStory = currentFeed.entries[storyId];
        $('#story').html(
            '<h2>'  + theStory.title + '</h2>' +
            '<div>' + theStory.description  + '</div>' +
            '<button id=readMore>Read More ..</button>'
        );
        buttons.readmore(theStory.link);   // create handler to open browser
        $('#story').removeClass('hidden'); // make story visible
        readerApp.hideLinksList();         // hide the other links
    },
    hideStory : function () {
        $('#story').addClass('hidden');
        readerApp.showLinksList();
    }    
}


