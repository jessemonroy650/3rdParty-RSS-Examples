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
        $.get(currentFeed.RSS, function(data, errorCode) {
            //alert("got data");
            //console.log("got data");
            var xml    = $( data );
            var title  = xml.find( "title" );
            var items  = xml.find( "item" );
            $('#feedBtn').html(title.text());
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
            buttons.rebind();
        });
    },
    showAddFeed : function () {
        $('#feedInput').removeClass('hidden');
        feedInput.isVisible = true;

        readerApp.hideLinksList();
    },
    hideAddFeed : function () {
        $('#feedInput').addClass('hidden');
        feedInput.isVisible = false;

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
            '<a href=' + theStory.link + '>Read More ..</a>'
        );
        $('#story').removeClass('hidden');
        story.isVisible = true;
        readerApp.hideLinksList();
    },
    hideStory : function () {
        $('#story').addClass('hidden');
        story.isVisible = false;
        readerApp.showLinksList();
    }    
}


