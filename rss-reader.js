/*
    Date:
*/
/*
$(document).ready(function() {

    //EDIT THESE LINES
    //Title of the blog
    var TITLE = "Generic CSS Reader";
    //RSS url
    var RSS = "http://feedproxy.google.com/RaymondCamdensColdfusionBlog";
    //Stores entries
    var entries = [];
    var selectedEntry = "";

    //listen for detail links
    $(".contentLink").on("click", function() {
        selectedEntry = $(this).data("entryid");
    });

    //Listen for main page
    $("#mainPage").on("pageinit", function() {

        //Set the title
        $("h1", this).text(TITLE);

        $.get(RSS, {}, function(res, code) {
            var xml = $(res);
            var items = xml.find("item");
            $.each(items, function(i, v) {
                entry = {
                    title:$(v).find("title").text(),
                    link:$(v).find("link").text(),
                    description:$.trim($(v).find("description").text())
                };
                entries.push(entry);
            });

            //now draw the list
            var s = '';
            $.each(entries, function(i, v) {
                s += '<li><a href="#contentPage" class="contentLink" data-entryid="'+i+'">' + v.title + '</a></li>';
            });
            $("#linksList").append(s);
            $("#linksList").listview("refresh");
        });

    });

    //Listen for the content page to load
    $("#contentPage").on("pageshow", function(prepage) {
        //Set the title
        $("h1", this).text(entries[selectedEntry].title);
        var contentHTML = "";
        contentHTML += entries[selectedEntry].description;
        contentHTML += '<p/><a href="'+entries[selectedEntry].link + '">Read Entry on Site</a>';
        $("#entryText",this).html(contentHTML);
    });

});
*/

//EDIT THESE LINES
var AppInfo = {
    // App Title
    TITLE : "Generic CSS Reader",
    //RSS url
    //RSS : "http://codesnippets.altervista.org/css/default.css"
    //RSS : "http://feeds.feedburner.com/raymondcamdensblog"
    RSS : "https://cordova.apache.org/feed.xml",
    entries : [],
    selectedEntry : ""

};
//
var currentFeed = {
    RSS           : "https://cordova.apache.org/feed.xml",
    entries       : [],
    selectedEntry : ""
};

var readerApp = {
    self : {},
    needFeed : true,
    //
    init : function () {
        console.log("readerApp.init");
        $('#appTitle').html(AppInfo.TITLE);
    },
    getFeed : function() {
        $.get(currentFeed.RSS, function(data, errorCode) {
            //alert("got data");
            //console.log("got data");
            var xml    = $( data );
            var title  = xml.find( "title" );
            var items  = xml.find( "item" );
            $('#feed').html(title.text());
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
    addFeed : function () {
    },
    removeFeed : function () {
    },
    showStory : function (storyId) {
        alert('storyId:' + storyId );
        $('#story').html(currentFeed.entries[storyId])
    },
    hideStory : function () {
    }    
}


