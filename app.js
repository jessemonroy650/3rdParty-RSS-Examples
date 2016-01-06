/*
    Date: 2016-01-05
*/
// This is to have the 'deviceready' code from firing in a webbrowser.
var device = {platform:'browser'};

var app = {
    self : {},

    onDeviceReady : function () {
        console.log("device ready.");
        //alert("device ready.");
        if (device.platform === "iOS") {
            alert("got iOS.");
            // hide Exit button. They don't have one on iOS devices.
            // http://www.mzcart.com/javascript-how-to-addremove-css-class-from-a-dom-element/
            document.getElementById('exitApp').classList.add("hidden");
            // deals with post-iOS-7 change that covers the status bar
            // http://coenraets.org/blog/2013/09/phonegap-and-cordova-with-ios-7/
            document.body.style.marginTop = "20px";
            // hide the Splash Screen for iOS only
            navigator.splashscreen.hide();
        } else if (device.platform == 'Android') {
            // Get rid of 300ms delay 
            document.addEventListener('DOMContentLoaded', function() { FastClick.attach(document.body); }, false);
            //
/*          document.getElementById('exitApp').addEventListener('click', function() {
                app.exit();
            });
*/
        } else if (device.platform == 'browser') {
/*          document.getElementById('exitApp').addEventListener('click', function() {
                app.exit();
            });
*/
        }
        app.init();
        if (localStore.test('#storeavailable')) {
            localStore.put('0','https://cordova.apache.org/feed.xml');
            $('#Cordova').html(localStore.get('0'));
        }
        readerApp.init();
        buttons.init();
    },
    init : function () {
        console.log('app.init');
    },
    exit : function () {
        console.log('Called app.exit()');
        if ('app' in navigator) {
            navigator.app.exitApp();
        } else {
            alert('exit button hit.');
        }
    }
};

//
// Wait for PhoneGap to load
document.addEventListener("deviceready", app.onDeviceReady, false);

// https://developer.mozilla.org/en-US/docs/Web/Events
window.addEventListener("load", function(event) {
    console.log("window has loaded.");
    app.onDeviceReady();
  });
