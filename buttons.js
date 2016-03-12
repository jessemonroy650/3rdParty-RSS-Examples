/*
    Date: 2016-01-05
          2016-03-08 - cutting in new library.
*/
var configMenu     = {isVisible:false};
var feedList       = {isVisible:true};
var feedInput      = {isVisible:false};
var feedContainter = {isVisible:true};
var story          = {isVisible:false};

// time is in milliseconds
var preFetchMinTime  = 2000;
var postFetchMinTime = 2000;


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
            status : function (parm) { $('.feedStatus').html(parm); },
            preFetch  : function (parm) {
                popup.init({'id':'popup','mid':'message', 'timeout':'0'});
                popup.fire({'message':'<p>&nbsp;<p>' + parm ,'color':'blue','minShowTime': preFetchMinTime});
            },
            postFetch : function (parm) {
                popup.extingish({'message':'<p>&nbsp;<p>' + parm,'color':'black'}, postFetchMinTime);
            }
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
    var l = localStore.len();
    console.log("Num of Feeds: " + l);
    $('.feedStatus').html(l + ' Feed(s)');
    //now "shadow" draw the list
    for (i = 0; i < l; i++ ) {
        var k = localStore.key(i);
        var v = localStore.get(k);
        s += '<li id="' + k + '" class="feedLink button button-block">' + k + '</li>';
    };
    s += '<li id=addFeed class="xfeedLink button button-block">Add a Feed</li>';
    // list of feeds
    //console.log(s);
    $("#RSSList li").remove(); // remove children of the DOM
    $("#RSSList").append(s);   // appeand our list of Feeds
    buttons.dynamic2();        // bind the list to touching
    addFeedBinding();          // bind our button to add more feeds
});

// Toggle the visibility of the "Story"
$('#toggleWrapper').on('click', function(event) {
    console.log('#toggleWrapper');
    if (story.isVisible) {
        $('#linksList').removeClass('hidden'); // show list
        $('#story').addClass('hidden');        // hide story
        $('#backIcon').addClass('hidden');     // hide icon
        story.isVisible = false;
    } else {
        var loadStory = function (parm) {
            $('#story').html(
                '<h2>'  + parm.title + '</h2>' +
                '<div>' + parm.description  + '</div>' +
                '<button id=readMore ' +
                ' class="button button-pill button-action" ' + 
                '>Read More ..</button>'
            );
            buttons.readmore(parm.link);   // create handler to open browser
        };
        readerApp.getStory(loadStory);
        $('#backIcon').removeClass('hidden'); // show icon
        $('#story').removeClass('hidden');    // show story
        $('#linksList').addClass('hidden');   // hist list
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

clearFeedFields  = function() {
    $('#RSSLabel').val('');          // clear the field
    $('#RSSURL').val('');            // clear the field
}

$('#addBtn').on('click', function(event) {
    console.log('#addBtn');
    // Add the data to storage
    if ($('#RSSLabel').val() && $('#RSSURL').val()) {
        localStore.put($('#RSSLabel').val(), $('#RSSURL').val());
        clearFeedFields();
        $('#addFeed').trigger('click');  // trigger to close the AddFeed form
        $('#getFeeds').trigger('click'); // trigger to recycle the list
    } else {
        alert('Both fields must have something.');
    }
});

$('#cancelBtn').on('click', function(event) {
    console.log('#cancelBtn');
    clearFeedFields();
    $('#addFeed').trigger('click');  // trigger the toggle button
});


$('#codeURL').on('click', function(event) {
    console.log('#codeURL');
    window.open('https://github.com/jessemonroy650/3rdParty-RSS-Examples', '_system');
});


/*
    Since the list is dynamically created, the rebinding of buttons
    has to be done everytime the list is created. These button
    module deals with that.
*/
var buttons = {
    listTag : '.contentLink',
    storyTag : '#toggleWrapper',
    browserTag : '#readMore',

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
            console.log('URL:' +localStore.get(event.target.id));
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

///////////////////////////////////////
//
//    Screen Orientation toggles
//
document.getElementById('portrait').addEventListener('click', function () {
    screen.unlockOrientation();
    screen.lockOrientation('portrait');
});
document.getElementById('landscape').addEventListener('click', function () {
    screen.unlockOrientation();
    screen.lockOrientation('landscape');
});





