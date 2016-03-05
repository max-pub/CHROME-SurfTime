checkActiveTab = function() {
    chrome.tabs.query({
        active: true
    }, function(tabs) {
        for (i in tabs)
            checkActiveWindow(tabs[i]);
    });
}
setInterval(checkActiveTab, 1000);


checkActiveWindow = function(tab) {
    var domain = getDomain(tab.url);
    // console.log('tab', tab.id, 'win', tab.windowId, domain);
    if (tab.url.substring(0, 9) === 'chrome://') return;
    if (tab.url.substring(0, 19) === 'chrome-extension://') return;
    // if(tab.status==='loading') return;

    chrome.windows.get(tab.windowId, {}, function(win) {
        // console.log(win.focused, domain);
        if (!win.focused) return;
        var date = ISOdate();
        // console.log('win', win.id, domain);
        STORE.get(date, function(val) {
            // console.log('store', val);
            if (!val) val = {};
            if (!val[domain]) val[domain] = 0;
            val[domain]++;
            // console.log('store', domain, val[domain], 'tab', tab.id, 'win', tab.windowId);
            STORE.set(date, val);
            chrome.browserAction.setBadgeText({
                text: val[domain] + ''
            });
            chrome.browserAction.setBadgeBackgroundColor({
                color: '#000'
            });
        });
    });

}


getDomain = function(url) {
    // var domain = tab.url.split('/')[2];
    var parser = document.createElement('a');
    parser.href = url;
    var domain = parser.hostname.replace('www.', '');
    return domain;
}

ISOdate = function() {
    var D = new Date();
    var m = D.getMonth() + 1;
    var d = D.getDate();
    return D.getFullYear() + '-' + (m < 10 ? ('0' + m) : m) + '-' + (d < 10 ? ('0' + d) : d);
}



chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.create({
        url: 'csp.html'
    });
});

