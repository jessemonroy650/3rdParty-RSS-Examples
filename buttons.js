/*
    Date: 2016-01-05
*/

var configMenu = {isVisible:false};
var feedList   = {isVisible:false};
var story      = {isVisible:false};
var feedInput  = {isVisible:false};

$('#getData').on('click', function(event) {
    console.log('#getData');
    if (readerApp.needFeed) {
        readerApp.getFeed();
        readerApp.needFeed = false;
    }
});

$('#appIcon').on('click', function(event) {
    console.log('#appIcon');
    if (configMenu.isVisible) {
        configMenu.isVisible = false;
        $('#configMenu').addClass('hidden');
    } else {
        configMenu.isVisible = true;
        $('#configMenu').removeClass('hidden');
    }
});

$('#menuIcon').on('click', function(event) {
    console.log('#menuIcon');
    if (feedList.isVisible) {
        feedList.isVisible = false;
        $('#RSSListContainter').addClass('hidden');
        readerApp.hideLinksList()
    } else {
        feedList.isVisible = true;
        $('#RSSListContainter').removeClass('hidden');
        readerApp.showLinksList()
    }
});

$('#toggleBtn').on('click', function(event) {
    console.log('#toggleBtn');
    if (story.isVisible) {
        readerApp.hideStory();
    } else {
        readerApp.showStory();
    }
});

$('#addFeed').on('click', function(event) {
    console.log('#addFeed');
    if (feedInput.isVisible) {
        readerApp.hideAddFeed();
    } else {
        readerApp.showAddFeed();
    }
});

var buttons = {

    init : function () {
        console.log("buttons.init");
        buttons.dynamic();
    },

    dynamic : function () {
        $('.contentLink').on('click', function(event) {
            //console.log('.contentLink:' + event.target.id);
            //alert('.contentLink:' + event.target.id);
            currentFeed.selectedStory = event.target.id;
            readerApp.showStory();
        }); 
    },

    rebind : function () {
        buttons.dynamic();
    }
}