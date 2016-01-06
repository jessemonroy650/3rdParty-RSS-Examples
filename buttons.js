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

$('#Cordova').on('click', function(event) {
    console.log('#Cordova');
    if (readerApp.needFeed) {
        readerApp.getFeed();
        readerApp.needFeed = false;
    }
});

$('#appIcon').on('click', function(event) {
    console.log('#appIcon');
    if (configMenu.isVisible) {
        $('#configMenu').addClass('hidden');
        configMenu.isVisible = false;
    } else {
        $('#configMenu').removeClass('hidden');
        configMenu.isVisible = true;
    }
});

$('#menuIcon').on('click', function(event) {
    console.log('#menuIcon');
    if (feedList.isVisible) {
        $('#RSSListContainter').addClass('hidden');
        feedList.isVisible = false;
    } else {
        $('#RSSListContainter').removeClass('hidden');
        feedList.isVisible = true;
    }
});

$('#toggleBtn').on('click', function(event) {
    console.log('#toggleBtn');
    if (story.isVisible) {
        readerApp.hideStory();
        story.isVisible = false;
    } else {
        readerApp.showStory();
        story.isVisible = true;
    }
});

$('#addFeed').on('click', function(event) {
    console.log('#addFeed');
    if (feedInput.isVisible) {
        readerApp.hideAddFeed();
        feedInput.isVisible = false;
    } else {
        readerApp.showAddFeed();
        feedInput.isVisible = true;
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
            //readerApp.showStory();
            $('#toggleBtn').trigger('click');
        }); 
    },

    readmore : function (link) {   
        $('#readMore').on('click', function(event) {
            window.open(link, '_system' );
        }); 
    },

    rebind : function () {
        buttons.dynamic();
    }
}