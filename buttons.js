/*
    Date: 2016-01-05
*/
$('#getData').on('click', function(event) {
    console.log('#getData');
    readerApp.get();
});

$('#appIcon').on('click', function(event) {
    console.log('#appIcon');
});

var listVisible = false;
$('#menuIcon').on('click', function(event) {
    console.log('#menuIcon');
    if (listVisible) {
        listVisible = false;
        $('#RSSlistContainter').addClass('hidden');
    } else {
        listVisible = true;
        $('#RSSlistContainter').removeClass('hidden');
    }
});