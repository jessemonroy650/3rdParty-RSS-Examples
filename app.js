/*
    Date: 2016-01-05
*/
var app = {
    self : {},

    onDeviceReady : function () {
        $('#appState').html('deviceready');
        console.log("device ready.");
        //alert("device ready.");
        if (device.platform === "iOS") {
            $('#appState').html('iOS');
            // hide Exit button. They don't have one on iOS devices.
            // http://www.mzcart.com/javascript-how-to-addremove-css-class-from-a-dom-element/
            document.getElementById('exitApp').classList.add("hidden");
            // deals with post-iOS-7 change that covers the status bar
            // http://coenraets.org/blog/2013/09/phonegap-and-cordova-with-ios-7/
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
            document.getElementById('exitApp').addEventListener('click', function() { alert('app.exit'); });
        }
        /////////////////////////////////////////////////////////
        // Trap the pause/resume event
        document.addEventListener("pause",  app.onPause, false);
        document.addEventListener("resume", app.onResume, false);
        try {
            // The versions we define
            if (AppVersion) {
                document.getElementById('appversion').innerHTML   = AppVersion.version;
                document.getElementById('buildversion').innerHTML = AppVersion.build;
            }
        } 
        catch (e) {
            $('#appState').html('Cant get version/build.');
        };
        // Write device information to screen
        document.getElementById('cordovathing').innerHTML = device.cordova;
        document.getElementById('model').innerHTML        = device.model;
        document.getElementById('version').innerHTML      = device.version;
        /////////////////////////////////////////////////////////
        // Initialize the app module
        app.init();
        // Test the localStore and report to 'id=storeavailable'
        if (localStore.test('#storeavailable')) {
            //localStore.clear(); // This was a mistake that cost me hours.
            localStore.put('Apache Cordova','https://cordova.apache.org/feed.xml');
        }
        // Initialize the Reader
        readerApp.init();
        // setup dynamic button linker
        buttons.init({
            list:    '.contentLink',
            story:   '#toggleStory',
            browser: '#readMore'
        });
        // reset the need for a Feed
        readerApp.needFeed = true;
        // get the RSS feeds on startup
        $('#getFeeds').trigger('click');
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

// This is to have the 'deviceready' code from firing in a webbrowser.
var device = {platform:'browser'};

document.getElementById('appState').innerHTML = "dom loaded";
// Thanks http://www.quirksmode.org/js/detect.html
if ('mozApps' in navigator) {
    document.addEventListener("DOMContentLoaded", app.onDeviceReady, false);
    //document.getElementById("product").innerHTML = "got mozApps";
} else {
    document.addEventListener("deviceready", app.onDeviceReady, false);
    //document.getElementById("product").innerHTML  = JSON.stringify(navigator);
    document.getElementById('appState').innerHTML = "addEventListener - deviceready";
}
