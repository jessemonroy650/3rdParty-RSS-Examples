/*
    Date: 2016-02-20
*/

var popupTest = {
    URLthatDelays : "http://codesnippets.altervista.org/examples/html5/tutorial-popup-fade/wait.php?wait=5",
    //
    makeToast : function() {
        // This is in the popup
        document.getElementById('timeouttime').innerHTML = popup.timeout/1000;
        setTimeout(popup.toggle , 500);
    },
    //
    doAlert : function() {
        popup.init({'id':'popupx','mid':'messagex', 'timeout':'0'});
        popup.message({'message':'This is an alert(). Click on the [okay] button to make it go away.'});
        popup.fire();
    },
    //
    setupLoadScreenButton : function() {
        document.getElementById('launch').addEventListener('click', function() {
            popup.init({'id':'popup','mid':'message', 'timeout':'0'});
            popup.fire({'message':'<p>&nbsp;<p>Getting data.','color':'blue','minShowTime':2000});
            $.get(URLthatDelays, function(data){
                popup.extingish({'message':'<p>&nbsp;<p>Got it.<p>' + data,'color':'black'}, 2000);
                $('#dbug').html(data);
            });
        });
    }
};
