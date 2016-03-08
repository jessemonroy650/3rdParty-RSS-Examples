/*
    Date: 2016-02-19
*/
var popup = {
    visible     : 0,         // This indicate the pop is not visible.
    timeout     : 7000,      // 7 seconds
    id          : 'popup',   // default `id` for messagebox.
    theText     : 'message', // default `id` for element that stores the message.
    button      : '',        // default `id` for button we use. (default='')
    once        : 1,
    minShowTime : 0,
    queued      : null,
    btnCallback : null,
    btnListener : function(e) {
        $('#dbug').html(popup.button + ' clicked');
        popup.toggle();
        if (popup.btnCallback) {
            popup.btnCallback();
        }
    },
    init : function (parms) {
        console.log("popup.init:",JSON.stringify(parms));
        if (parms) {
            popup.timeout = (parms.timeout) ? parms.timeout : 7000;
            popup.id      = (parms.id)      ? parms.id      : 'popup';
            popup.theText = (parms.mid)     ? parms.mid     : 'message';
            popup.button  = (parms.button)  ? parms.button  : '';
            popup.btnCallback  = (parms.btnCallback)  ? parms.btnCallback  : null;
        }
        if (popup.button != '') {
            console.log("popup.button:", popup.button);
            // This does not double assign. See NOTES.md
            document.getElementById(popup.button).addEventListener('click', popup.btnListener, false);
        }
    },
    toggle : function () {
        //console.log('popup.toggle:', popup.visible);
        if (popup.visible === 0) {
            document.getElementById(popup.id).style.opacity = 1;
            document.getElementById(popup.id).style.visibility = 'visible';
            console.log('opacity:1');
            popup.visible = 1;
            popup.once    = 1;
        } else {
            // Without this, the popup 'popup.id' and does not 'fade'.
            document.getElementById(popup.id).style.transitionProperty = 'all';
            // This actually trigers the fade.
            document.getElementById(popup.id).style.opacity = 0;
            // Without this, the popup invisibly blocks what is underneath
            document.getElementById(popup.id).style.visibility = 'collapse';
            console.log('opacity:0');
            popup.visible = 0;
            popup.once    = 0;
        }
        //console.log('POST toggle:', JSON.stringify(popup))
        // if 'timeout' is set to zero, this never fires
        // This allows a single message that fades after timeout, like toast().
        if (popup.timeout > 0) {
            if (popup.once > 0) {
                setTimeout(popup.toggle, popup.timeout);
            }
        }
        //console.log('POST timeout:', JSON.stringify(popup))
    },
    message : function (obj) {
        if ('color' in obj) {
            document.getElementById(popup.id).style.color = obj.color;
        }
        if ('backgroundColor' in obj) {
            document.getElementById(popup.id).style.backgroundColor = obj.backgroundColor;
        }
        if ('queued' in obj) {
            popup.queued = obj.queued;
        }
        if ('minShowTime' in obj) {
            console.log('minShowTime:', obj.minShowTime);
            popup.minShowTime = obj.minShowTime;
            setTimeout(function() {
                popup.minShowTime = 0;
                if (typeof popup.queued == 'function') {
                    //console.log('popup.queued() fired');
                    popup.queued();
                }
            }, popup.minShowTime);
        }
        //console.log('popup.theText',popup.theText);
        document.getElementById(popup.theText).innerHTML = obj.message;
    },
    fire : function (obj) {
        var strg = (obj) ? JSON.stringify(obj) : "";
        console.log('fire:', strg);
        // Set the message
        if (obj) {
            popup.message(obj);
        }
        popup.toggle();        
    },
    extingish : function (obj, timeout) {
        var strg = (obj) ? JSON.stringify(obj) : "";
        console.log('extingish:', strg, timeout);
        var messageAndFadeOut = function () {
            // change the message, if we have a new one.
            if (obj) { popup.message(obj); }
            // remove from screen, after timeout
            if (timeout) {
                setTimeout(function () { popup.toggle(); }, timeout);
            } else {
                 popup.toggle();
            }
        }
        if ( popup.minShowTime == 0 ) {
            //console.log('messageAndFadeOut() fired');
            messageAndFadeOut();
        } else {
            popup.queued = messageAndFadeOut;
        }
    }
};

//console.log('togglePopup() loaded.');
