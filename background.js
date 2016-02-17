checkActiveTab = function () {
    chrome.tabs.query({
        active: true
    }, function (tabs) {
        var tab = tabs[0];
        // console.log('status',tab.status);
        // if(tab.status==='loading') return;
        if (tab.url.substring(0, 9) === 'chrome://') return;
        if (tab.url.substring(0, 19) === 'chrome-extension://') return;

        chrome.windows.get(tab.windowId, {}, function (win) {
            if (!win.focused) return;
            var domain = getDomain(tab.url);
            var date = ISOdate();
            // console.log('tab',win.focused, domain, STORE);
            STORE.get(date, function (val) {
                // console.log('store',val);
                if (!val) val = {};
                if (!val[domain]) val[domain] = 0;
                val[domain]++;
                STORE.set(date, val);
                chrome.browserAction.setBadgeText({
                    text: val[domain] + ''
                });
                chrome.browserAction.setBadgeBackgroundColor({
                    color: '#000'
                });
            });
        });
    });
}

getDomain = function (url) {
    // var domain = tab.url.split('/')[2];
    var parser = document.createElement('a');
    parser.href = url;
    var domain = parser.hostname.replace('www.', '');
    return domain;
}

ISOdate = function () {
    var D = new Date();
    var m = D.getMonth() + 1;
    var d = D.getDate();
    return D.getFullYear() + '-' + (m < 10 ? ('0' + m) : m) + '-' + (d < 10 ? ('0' + d) : d);
}

setInterval(checkActiveTab, 1000);


chrome.browserAction.onClicked.addListener(function (tab) {
    chrome.tabs.create({
        url: 'csp.html'
    });
});


// console.log('save',domain,val[domain]);
// var statusBox = '<div id="SurfTimeStatusBox" style="position:absolute;top:3px;right:3px;background:red;">yeah</div>';
// chrome.tabs.executeScript(tab.id,{code:statusBox});









// weekdays = 'Sun,Mon,Tue,Wed,Thu,Fri,Sat'.split(',');


// THRESHOLD = 60000;

// TIME = 0;
// // TIMER=0;
// WINDOW = 0;

// STORE = {};


// // chrome.tabs.onActivated.addListener(function(info){
// //     activate();
// // });
// // chrome.tabs.onCreated.addListener(function(info){
// //     activate();
// // });
// // chrome.tabs.onUpdated.addListener(function(info){
// //     activate();
// // });
// chrome.windows.onFocusChanged.addListener(function(info){
//     // console.log("WIN",info);
//     WINDOW = info;
//     // if(info==-1) blurred();
//     // else activate();
// });




// chrome.idle.setDetectionInterval(THRESHOLD);

// chrome.idle.onStateChanged.addListener(function(state){
//     console.log("STATE",state);
//     if(state=='active') activate();
//     else if(state=='locked') locked();
//     else idle();
// });





// function activate(){
//     if(!TIME) TIME = new Date().getTime();
//     if(!TIME) console.log('ACTIVATED');
// }

// function blurred(){
//     if(!TIME) return;
//     logTime = new Date().getTime() - TIME;
//     TIME = 0;
//     saveTime(logTime);
//     console.log('BLURRED');//,Math.round(STORE[date]/1000));
// }
// function locked(){
//     if(!TIME) return;
//     logTime = new Date().getTime() - TIME;
//     TIME = 0;
//     saveTime(logTime);
//     console.log('LOCKED');//,Math.round(STORE[date]/1000));
// }
// function idle(){
//     if(!TIME) return;
//     logTime = new Date().getTime() - TIME - THRESHOLD;
//     TIME = 0;
//     saveTime(logTime);
//     console.log('IDLE');
// }

// function minuteCounter(){
//     if(!TIME) return;
//     console.log('minuteCounter', new Date().getSeconds());//,Math.round(STORE[date]/1000));
//     logTime = new Date().getTime() - TIME;
//     TIME = new Date().getTime();
//     saveTime(logTime);
//     var timer = 59-new Date().getSeconds();
//     if(timer==0) timer = 60;
//     setTimeout(minuteCounter, timer*1000 );
// }

// function saveTime(logTime){
//     var date = 'd.' + new Date().getFullYear() + '-' + (new Date().getMonth()+1) + '-' + new Date().getDate();
//     var day =  'w.' + weekdays[new Date().getDay()];
//     var hour = 'h.' + new Date().getHours();
//     localStorage.setItem(date, localStorage.getItem(date)*1+logTime );
//     localStorage.setItem(day,  localStorage.getItem(day) *1+logTime );
//     localStorage.setItem(hour, localStorage.getItem(hour)*1+logTime );
//     localStorage.setItem('t.'+TIME, logTime );
//     var t = new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds();
//     console.log(t,': ADDED', Math.round(logTime/1000), 'seconds');//,Math.round(STORE[date]/1000));
//     updateBadge();
// }

// function updateBadge(){
//     var date = 'd.' + new Date().getFullYear() + '-' + (new Date().getMonth()+1) + '-' + new Date().getDate();
//     var logTime = localStorage.getItem(date);
//     var minutes = logTime/1000/60;
//     chrome.browserAction.setBadgeText({text:Math.round(minutes)+''});
//     // chrome.browserAction.setBadgeBackgroundColor({color:'hsl('+ (240) +',100%,'+ (60) +'%)'});
//     chrome.browserAction.setBadgeBackgroundColor({color:'#000'});
//     chrome.browserAction.setBadgeText({text:''});
//     // chrome.browserAction.setBadgeBackgroundColor({color:'#fff'});

// }



// activate();
// minuteCounter();



// chrome.system.cpu.getInfo(function(info){
//     cpu = info;
//     console.log("CPU",info);
// });

// chrome.system.memory.getInfo(function(info){
//     console.log("MEM",info);
// });

// chrome.system.storage.getInfo(function(info){
//     console.log("STOR",info);
// });
