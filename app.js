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
            document.addEventListener('DOMContentLoaded', function() { FastClick.attach(document.body); }, false);
            // trap the [back button]
            document.addEventListener("backbutton", app.onBackButton, false);
            // exit app on [exit button]
            document.getElementById('exitApp').addEventListener('click', function() { app.exit(); });
        } else if (device.platform == 'browser') {
            // hide Exit button. They don't have one on browsers.
            document.getElementById('exitApp').addEventListener('click', function() { alert('app.exit'); });
        }
        /////////////////////////////////////////////////////////
        // Trap the pause/resume event
        document.addEventListener("pause",  app.onPause, false);
        document.addEventListener("resume", app.onResume, false);
        try {
            // The versions we define
            if ('version' in AppVersion) {
                document.getElementById('appversion').innerHTML   = AppVersion.version;
                document.getElementById('buildversion').innerHTML = AppVersion.build;
            }
        } 
        catch (e) {
            $('#appState').html('Cant get version/build.');
        };
        // Write device information to screen
        document.getElementById('acordova').innerHTML = device.cordova;
        document.getElementById('model').innerHTML    = device.model;
        document.getElementById('version').innerHTML  = device.version;
        $('#appState').html('Loaded version and device info.');
        /////////////////////////////////////////////////////////
        // Initialize the app module
        app.init();
        // Test the localStore and report to 'id=storeavailable'
        if (localStore.test('storeavailable')) {
            $('#appState').html('localstore found');
            //localStore.clear(); // This was a mistake that cost me hours.
            localStore.put('Apache Cordova','https://cordova.apache.org/feed.xml');
            $('#appState').html('localstore put');
        }
        // Initialize the Reader
        readerApp.init();
        // setup dynamic button linker
        buttons.init({
            list:    '.contentLink',
            story:   '#toggleWrapper',
            browser: '#readMore'
        });
        //$('#appState').html('buttons.init.');
        // reset the need for a Feed
        readerApp.needFeed = true;
        // get the RSS feeds on startup
        $('#getFeeds').trigger('click');
        //$('#appState').html('#getFeeds.trigger');
        // Load the button and async example
        loadScreenButton();
        //
        $('#appState').html('deviceready done.');
    },
    init : function () {
        console.log('app.init');
        $('#appState').html('app.init');
    },
    onPause : function () {
        console.log('app.onPause');
        $('#appState').html('app.onPause');
    },
    onResume : function () {
        console.log('app.onResume');
        $('#appState').html('app.onResume');
    },
    onBackButton : function () {
        // Don't do anything. Ingore button, for now.
        $('#appState').html('app.onBackButton');
    },
    exit : function () {
        console.log('Called app.exit()');
        $('#appState').html('app.exit');
        if ('app' in navigator) {
            navigator.app.exitApp();
        } else {
            alert('exit button hit.');
            // This is here to deal with a bug on LG Leon - which I own.
            navigator.app.exitApp();
        }
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
