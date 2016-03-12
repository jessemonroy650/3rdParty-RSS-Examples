/*
    Date: 2016-01-05
          2016-03-08 - Changed Entry point and method
*/
var app = {
    self : {},

    onDeviceReady : function () {
        $('#appState').html('deviceready');
        console.log("device ready.");
        if (device.platform === "iOS") {
            $('#appState').html('iOS');
            // hide Exit button. They don't have one on iOS devices.
            document.getElementById('exitApp').classList.add("hidden");
            // deals with post-iOS-7 change that covers the status bar
            document.body.style.marginTop = "20px";
            // hide the Splash Screen for iOS only
            navigator.splashscreen.hide();
        } else if (device.platform == 'Android') {
            $('#appState').html('Android');
            // Get rid of 300ms delay 
            document.addEventListener('DOMContentLoaded', function() {
                FastClick.attach(document.body); },
                false);
            // exit app on [exit button]
            document.getElementById('exitApp').addEventListener('click', function() {
                navigator.app.exitApp();
            });
            // trap the [back button]
            document.addEventListener("backbutton", app.onBackButton, false);
        } else if (device.platform == 'browser') {
            // hide Exit button. They don't have one on browsers.
            document.getElementById('exitApp').classList.add("hidden");
        }
        /////////////////////////////////////////////////////////
        // setup dynamic button linker
        //buttons.init({list:'.contentLink',story:'#toggleWrapper',browser:'#readMore'});
        buttons.init();
        $('#appState').html('buttons.init.');
        // reset the need for a Feed
        readerApp.needFeed = true;
        // get the RSS feeds on startup
        $('#getFeeds').trigger('click');
        //
        $('#appState').html('deviceready done.');
    },
    init : function () {
        console.log('app.init');
        $('#appState').html('app.init');
    },
    onBackButton : function () {
        // Don't do anything. Ingore button, for now.
        $('#appState').html('app.onBackButton');
    }
};

//
//    Entry Point
//
document.addEventListener('DOMContentLoaded', function() {
    // Detect if we are using Cordova/Phonegap or a browser.
    // https://videlais.com/2014/08/21/lessons-learned-from-detecting-apache-cordova/
    var isCordovaApp = (typeof window.cordova !== "undefined");

    // Is it a device we know?
    if ( isCordovaApp === true ) {
        // Wait for PhoneGap to load
        document.addEventListener("deviceready", app.onDeviceReady, false);
    } else {
        // This needs to be global so other modules can see it.
        device = {platform:'browser'};
        // Force the function.
        app.onDeviceReady();
    }
});
