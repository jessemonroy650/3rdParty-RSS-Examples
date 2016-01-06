/*
    Date: 2016-01-05
*/

        console.log("buttons.init");
        $('#getData').on('click', function(event) {
            console.log('#getData');
            readerApp.getFeed();
        });

        $('#appIcon').on('click', function(event) {
            console.log('#appIcon');
        });

        $('#menuIcon').on('click', function(event) {
            console.log('#menuIcon');
            if (buttons.listVisible) {
                buttons.listVisible = false;
                $('#RSSListContainter').addClass('hidden');
            } else {
                buttons.listVisible = true;
                $('#RSSListContainter').removeClass('hidden');
            }
        });


var buttons = {

    listVisible : false,

    init : function () {
        buttons.dynamic();
    },

    dynamic : function () {
        $('.contentLink').on('click',function(event) {
            //console.log('.contentLink:' + event.target.id);
            alert('.contentLink:' + event.target.id);
        }); 
    },
    rebind : function () {
        buttons.dynamic();
    }
}