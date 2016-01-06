/*
    Date: 2016-01-05
*/

var localStore = {
    //
    test : function (id) {
        console.log("localStore.test");
        var v = localStore.storageAvailable('localStorage')
        $(id).html(v);
        return v;
    },
    put : function (key, value) {
        localStorage[key] = value;
    },
    get : function (key) {
        return localStorage.getItem(key) ? localStorage.getItem(key) : '';
    },
    putTemp : function (key, value) {
        sessionStorage[key] = value;
    },
    getTemp : function (key) {
        return sessionStorage.getItem(key) ? sessionStorage.getItem(key) : '';
    },
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