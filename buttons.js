/*
    Date: 2016-01-05
*/

var configMenu = {isVisible:false};
var feedList   = {isVisible:true};
var story      = {isVisible:false};
var feedInput  = {isVisible:false};

var xfunc = function() { $('#feedContainter').removeClass('hidden'); };

var ifBothFalseFunc = function ( first, second, func ) {
    if ((first === false) && (second === false) ){
        func();
    }
};

//
//    App Icon on the top left
//
$('#appIcon').on('click', function(event) {
    console.log('#appIcon');
    if (configMenu.isVisible) {
        $('#configMenu').addClass('hidden');        // hide our config menu 
        configMenu.isVisible = false;
        // show the feeds, if both menus
        ifBothFalseFunc(configMenu.isVisible, feedList.isVisible, xfunc);
    } else {
        $('#feedContainter').addClass('hidden');    // hide the feeds 
        $('#configMenu').removeClass('hidden');     // show our config menu
        configMenu.isVisible = true;
    }
});

//
//    Menu Icon on the top right corner
//
$('#menuIcon').on('click', function(event) {
    console.log('#menuIcon');
    if (feedList.isVisible) {
        $('#RSSListContainter').addClass('hidden'); // hide our config menu 
        feedList.isVisible = false;
        // show the feeds, if both menus
        ifBothFalseFunc(configMenu.isVisible, feedList.isVisible, xfunc);
    } else {
        $('#feedContainter').addClass('hidden');       // hide the feeds 
        $('#RSSListContainter').removeClass('hidden'); // show our config menu 
        feedList.isVisible = true;
    }
});

//
//    Create list of headlines
//
$('#getData').on('click', function(event) {
    console.log('#getData');
    $('.feedStatus').html('#getData');
    if (readerApp.needFeed) {
        $('.feedStatus').html('getting Data');
        var passingReference = {
            // Reduce
            draw  : function (parm) {
                $('#toggleStory').html(parm.title);
                var s = '';
                //now "shadow" draw the list
                $.each(parm.entries, function(i, v) {
                    s += '<li id="' + i + '" class="contentLink button button-block">' + v.title + '</li>';
                });
                $("#linksList li").remove();
                $("#linksList").append(s);
                buttons.rebind();
            },
            // output of status
            status: function (parm) { $('.feedStatus').html(parm); },
        };
        readerApp.getFeed(passingReference);
        readerApp.needFeed = false;
    }
});

//
//    get a list of feeds from localStorage
//
$('#getFeeds').on('click', function(event) {
    console.log('#getFeeds');
    $('.feedStatus').html('#getData');
    var s = '';
    console.log(localStore.length());
    $('.feedStatus').html(localStore.length() + ' Feed(s)');
    //now "shadow" draw the list
    for (i = 0; i < localStore.length(); i++ ) {
        var k = localStore.key(i);
        var v = localStore.get(k);
        s += '<li id="' + k + '" class="feedLink button button-block">' + k + '</li>';
    };
    s += '<li id=addFeed class="button button-block">Add a Feed</li>';
    console.log(s);
    $("#RSSList li").remove(); // remove children of the DOM
    $("#RSSList").append(s);   // appeand our list of Feeds
    buttons.dynamic2();        // bind the list to touching
    addFeedBinding();          // bind our button to add more feeds
});

$('#Cordova').on('click', function(event) {
    console.log('#Cordova');
    $('#getData').trigger('click');
});

// Toggle the visibility of the "Story"
$('#toggleStory').on('click', function(event) {
    console.log('#toggleStory');
    if (story.isVisible) {
        $('#story').addClass('hidden');
        $('#linksList').removeClass('hidden');
        story.isVisible = false;
    } else {
        var loadStory = function (parm) {
            $('#story').html(
                '<h2>'  + parm.title + '</h2>' +
                '<div>' + parm.description  + '</div>' +
                '<button id=readMore>Read More ..</button>'
            );
            buttons.readmore(parm.link);   // create handler to open browser
        };
        readerApp.getStory(loadStory);
        $('#story').removeClass('hidden'); // make story visible
        $('#linksList').addClass('hidden');
        story.isVisible = true;
    }
});

addFeedBinding = function () {
    $('#addFeed').on('click', function(event) {
        console.log('#addFeed');
        if (feedInput.isVisible) {
            $('#feedInput').addClass('hidden');
            feedInput.isVisible = false;
        } else {
            $('#feedInput').removeClass('hidden');
            feedInput.isVisible = true;
        }
    });
};
addFeedBinding();

$('#addBtn').on('click', function(event) {
    console.log('#addBtn');
    // Add the data to storage
    localStore.put($('#RSSLabel').val(), $('#RSSURL').val());
    $('#RSSURL').val('');            // clear the field
    $('#addFeed').trigger('click');  // trigger to close the AddFeed form
    $('#getFeeds').trigger('click'); // trigger to recycle the list
});

$('#cancelBtn').on('click', function(event) {
    console.log('#cancelBtn');
    $('#RSSURL').val('');                   // clear the field
    $('#addFeed').trigger('click');           // trigger the toggle button
});


$('#testToast').on('click', function(event) {
    console.log('#testToast');
    show('Loading...', 'long', 'center')
});

/*
    Since the list is dynamically created, the rebinding of buttons
    has to be done everytime the list is created. These button
    module deals with that.
*/
var buttons = {
    listTag : null,
    storyTag : null,
    browserTag : null,

    init : function (tag) {
        buttons.listTag = tag.list;
        buttons.storyTag = tag.story;
        buttons.browserTag = tag.browser;
        console.log("buttons.init");
        buttons.dynamic();
    },

    dynamic : function () {
        if (buttons.listTag && buttons.storyTag) {
            $(buttons.listTag).on('click', function(event) {
                $('.lastReadLink').html(event.target.id);
                currentFeed.selectedStory = event.target.id;
                $(buttons.storyTag).trigger('click');
            });
        } else {
            alert('Cannot bind dynamic buttons');
        }
    },

    dynamic2 : function () {
        $('.feedLink').on('click', function(event) {
            //$('.lastReadLink').html(event.target.id);
            //currentFeed.selectedStory = event.target.id;
            console.log('id:' + event.target.id);
            console.log(localStore.get(event.target.id));
            // reset the need for a feed.
            readerApp.needFeed = true;
            currentFeed.RSS    = localStore.get(event.target.id);
            $('#menuIcon').trigger('click');
            $('#getData').trigger('click');
        });
    },

    readmore : function (link, tag) {   
        if (! tag) {
            tag = buttons.browserTag;
        }
        if (tag && link) {
            $(tag).on('click', function(event) {
                window.open(link, '_system');
            });
        } else {
            alert('Cannot bind dynamic buttons #2');
        }
    },

    rebind : function () {
        buttons.dynamic();
    }
}