API = {
    loadData: function(callback) { // -> {'2016-01-31':{'google.com':31, ...}, '2016-02-01':{...}, ... }
        STORE.getAll(function(list) {
            // DATA.raw = list;
            console.log('fetch data', list);
            if (callback) callback(list);
        });
    },

    DATA: {
        domains: {},
        categories: {},
        months: {},
        noCAT: {},
    },

    add: function(dict, key, value) {
        if (!dict[key]) dict[key] = 0;
        dict[key] += value;
    },

    process: function(days) {
        for (var day in days) {
            // var date = day.split('-');
            var yymm = day.split('-').slice(0, 2).join('-');
            var dd = day.split('-')[2];
            if (!API.DATA.months[yymm]) API.DATA.months[yymm] = {
                domains: {},
                categories: {},
                days: {}
            };
            if (!API.DATA.months[yymm].days[dd]) API.DATA.months[yymm].days[dd] = {
                domains: {},
                categories: {}
            };

            for (var domain in days[day]) {
                var time = days[day][domain];
                var DOM = API.cleanDomain(domain);
                if (!DOM.trim()) continue;
                API.add(API.DATA.domains, DOM, time);
                API.add(API.DATA.months[yymm].domains, DOM, time);
                API.add(API.DATA.months[yymm].days[dd].domains, DOM, time);
                var CAT = API.getCategory(domain);
                API.add(API.DATA.categories, CAT, time);
                API.add(API.DATA.months[yymm].categories, CAT, time);
                API.add(API.DATA.months[yymm].days[dd].categories, CAT, time);
                if (CAT == 'other')
                // console.log(CAT, DOM);
                    API.add(API.DATA.noCAT, DOM, time);
            }
        }
    },


    cleanDomain: function(domain) {
        var split = domain.split('.')
        var last2 = split.slice(-2).join('.');
        if (TwoPartTLDs.indexOf(last2) != -1)
            var diff = -3;
        else
            var diff = -2;
        var DOM = split.slice(diff, diff + 1);
        if (TLDmerge[DOM]) return DOM + '.' + TLDmerge[DOM];
        else return split.slice(diff).join('.');
    },


    getCategory: function(domain) {
        var tag = TAGS[domain];
        if (!tag) tag = TAGS[API.cleanDomain(domain)];
        return tag ? (tag[0].toUpperCase() + tag.slice(1)) : 'other';
    }


}