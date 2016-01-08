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
            // place to insert the title
            title:  function (parm) { $('#toggleStory').html(parm); },
            // clear our list of stories
            clear:  function (parm) { $("#linksList li").remove(); },
            // attach a new list of stories
            attach: function (parm) { $("#linksList").append(parm); },
            // output of status
            status: function (parm) { $('.feedStatus').html(parm); },
            // rebind buttons created in the dynamic list
            rebind: function (parm) { buttons.rebind(); }
        };
        readerApp.getFeed(passingReference);
        readerApp.needFeed = false;
    }
});

$('#Cordova').on('click', function(event) {
    console.log('#Cordova');
    if (readerApp.needFeed) {
        readerApp.getFeed({title: $('#toggleStory').html});
        readerApp.needFeed = false;
    }
});

// Toggle the visibility of the "Story"
$('#toggleStory').on('click', function(event) {
    console.log('#toggleStory');
    if (story.isVisible) {
        //readerApp.hideStory();
        $('#story').addClass('hidden');
        $('#linksList').removeClass('hidden');
        story.isVisible = false;
    } else {
        readerApp.showStory();
        $('#story').removeClass('hidden'); // make story visible
        $('#linksList').addClass('hidden');
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

var buttons = {
    dynamicTag = null;

    init : function (tag) {
        buttons.dynamicTag = tag;
        console.log("buttons.init");
        buttons.dynamic();
    },

    dynamic : function (tag) {
        if (! tag) {
            tag = buttons.dynamicTag;
        }
        if (tag) {
            $(tag).on('click', function(event) {
                //console.log('.contentLink:' + event.target.id);
                //alert('.contentLink:' + event.target.id);
                currentFeed.selectedStory = event.target.id;
                //readerApp.showStory();
                $('#toggleStory').trigger('click');
            });
        } else {
            alert('Cannot bind dynamic buttons');
        }
    },

    readmore : function (link) {   
        $('#readMore').on('click', function(event) {
            window.open(link, '_system');
        }); 
    },

    rebind : function () {
        buttons.dynamic();
    }
}