/*
    Date: 2016-01-05
*/

var configMenu = {isVisible:false};
var feedList   = {isVisible:false};
var story      = {isVisible:false};
var feedInput  = {isVisible:false};

$('#appIcon').on('click', function(event) {
    console.log('#appIcon');
    if (configMenu.isVisible) {
        $('#feedContainter').removeClass('hidden'); // show the feeds 
        $('#configMenu').addClass('hidden');       // hide our config menu 
        configMenu.isVisible = false;
    } else {
        $('#feedContainter').addClass('hidden');    // hide the feeds 
        $('#configMenu').removeClass('hidden');    // show our config menu
        configMenu.isVisible = true;
    }
});

$('#menuIcon').on('click', function(event) {
    console.log('#menuIcon');
    if (feedList.isVisible) {
        $('#feedContainter').removeClass('hidden');  // show the feeds 
        $('#RSSListContainter').addClass('hidden'); // hide our config menu 
        feedList.isVisible = false;
    } else {
        $('#feedContainter').addClass('hidden');        // hide the feeds 
        $('#RSSListContainter').removeClass('hidden');  // show our config menu 
        feedList.isVisible = true;
    }
});

$('#getData').on('click', function(event) {
    console.log('#getData');
    $('.feedStatus').html('#getData');
    if (readerApp.needFeed) {
        $('.feedStatus').html('getting Data');
        var passingReference = {
            // Reduce
            draw  : function (parm) {
                $('#toggleStory').html(parm.title);
                $('.storyStatus').html(parm.entries.length);

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

$('#getFeeds').on('click', function(event) {
    console.log('#getFeeds');
    $('.feedStatus').html('#getData');
            var s = '';
            console.log(localStore.length());
     $('.feedStatus').html(localStore.length());
            //now "shadow" draw the list
            for (i = 0; i < localStore.length(); i++ ) {
               var v = localStore.get(i);
               s += '<li id="' + i + '" class="feedLink button button-block">' + v + '</li>';
            };
            s += '<li id=addFeed class="button button-block">Add a Feed</li>';
            console.log(s);
//    $('.feedStatus').html('code' + s + '</code>');
            $("#RSSList li").remove();
            $("#RSSList").append(s);
            buttons.dynamic2();
    addFeedBinding();
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
    readerApp.addFeed($('#addField').val());  // Add the data to storage 
    //$('#addField').val('');                 // clear the field
    //$('#addFeed').trigger('click');         // trigger the toggle button
});

$('#cancelBtn').on('click', function(event) {
    console.log('#cancelBtn');
    $('#addField').val('');                   // clear the field
    $('#addFeed').trigger('click');           // trigger the toggle button
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
                currentFeed.entries  = [];
                currentFeed.RSS    = localStore.get(event.target.id);
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