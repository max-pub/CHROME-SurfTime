
STORE = {
    available: {},
    use: 'fallback',

    init: function(){
        try{ localStorage;          STORE.use = 'html5';  } catch(e){ }
        try{ chrome.storage.local;  STORE.use = 'chrome'; } catch(e){ }
        console.log('STORE uses',STORE.use);
    },



    set: function(key,val){
        STORE[STORE.use].set(key,val);
    },
    get: function(key,callback) {
        STORE[STORE.use].get(key,function(res){
            if(callback) callback(res);
            else console.log('STORE-GET',key,':',res);
        });
    },
    del: function(key){
        STORE[STORE.use].del(key);
    },
    getAll: function(callback) {
        STORE[STORE.use].getAll(function(res){
            if(callback) callback(res);
            else console.log('STORE-GETALL',res);
        });
    },
    list: function(callback){
        STORE[STORE.use].list(function(res){
            if(callback) callback(res);
            else console.log('STORE-LIST',res);
        });
    },



    html5: {
        set: function(key,val){
            localStorage.setItem(key, JSON.stringify(val) );
        },
        get: function(key,callback){
            callback( JSON.parse( localStorage.getItem( key ) ) );
        },
        getAll: function(callback){
            var list = {};
            for(var key in localStorage) 
            	try{ console.log(key); list[key] = JSON.parse( localStorage.getItem(key) ); }
                catch(e) { list[key] = localStorage.getItem(key); }
            callback(list);
        },
        del: function(key){
        	localStorage.removeItem(key);
        },
        list: function(callback){
            var list = [];
            for(var key in localStorage) list.push(key);
            callback(list);
        }
    },

    chrome: {
        set: function(key,val){
            var set = {};
            set[key] = val;
            chrome.storage.local.set(set);
        },
        get: function(key,callback){
            chrome.storage.local.get(key,function(res){
                callback(res[key]);
            });
        },
        getAll: function(callback){
            chrome.storage.local.get(function(res){
                // console.log(res);
                callback(res);
            });
        },
        del: function(key){
            chrome.storage.local.remove(key);
        },
        list: function(callback){
            chrome.storage.local.get(function(res){
                // console.log(res);
                var list = [];
                for(var key in res) list.push(key);
                callback(list);
            });
        }
    },

    win8: {

    },

    fallback: {

    }
};

STORE.init();
