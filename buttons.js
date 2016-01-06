/*
    Date: 2016-01-05
*/
$('#getData').on('click', function(event) {
    console.log('#getData');
    readerApp.getFeed();
});

$('#appIcon').on('click', function(event) {
    console.log('#appIcon');
});

var listVisible = false;
$('#menuIcon').on('click', function(event) {
    console.log('#menuIcon');
    if (listVisible) {
        listVisible = false;
        $('#RSSListContainter').addClass('hidden');
    } else {
        listVisible = true;
        $('#RSSListContainter').removeClass('hidden');
    }
});

$('.contentLink').on('click',function(event) {
    //console.log('.contentLink:' + event.target.id);
    alert('.contentLink:' + event.target.id);
}); 