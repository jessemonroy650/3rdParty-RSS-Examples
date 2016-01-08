/*
    Date: 2016-01-05
*/
var app = {
    self : {},

    onDeviceReady : function () {
        $('#appState').html('deviceready');
        console.log("device ready.");
        alert("device ready.");
    }
};

// This is to have the 'deviceready' code from firing in a webbrowser.
var device = {platform:'browser'};

document.getElementById('appState').innerHTML = "dom loaded";
// Thanks http://www.quirksmode.org/js/detect.html
if ('mozApps' in navigator) {
    document.addEventListener("DOMContentLoaded", app.onDeviceReady, false);
    document.getElementById("product").innerHTML = "got mozApps";
} else {
    document.addEventListener("deviceready", app.onDeviceReady, false);
    document.getElementById("product").innerHTML  = JSON.stringify(navigator);
    document.getElementById('appState').innerHTML = "addEventListener - deviceready";
}
