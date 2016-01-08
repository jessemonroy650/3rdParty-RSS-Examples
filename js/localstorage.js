/*
    Date: 2016-01-05
*/

var localStore = {
    //
    test : function (id) {
        var v = localStore.storageAvailable('localStorage')
        console.log("localStore.test:" + v);
        $(id).html(v);
        return v;
    },
    length  : function ()    { return localStorage.length; },
    clear   : function ()    { localStorage.clear(); },
    put     : function (k,v) { localStorage[k] = v; },
    get     : function (key) { return localStorage.getItem(key) ? localStorage.getItem(key) : ''; },
    key     : function (num) { return localStorage.key(num); },
    remove  : function (key) { localStorage.removeItem(key); },
    putTemp : function (k,v) { sessionStorage[k] = v; },
    getTemp : function (key) { return sessionStorage.getItem(key) ? sessionStorage.getItem(key) : ''; },
    storageAvailable: function (type) {
        try {
            var storage = window[type],
			          x = '__storage_test__';
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        }
        catch(e) {
            return false;
        }
    }
};