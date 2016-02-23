DATA = {
    raw: {},
    months: {},

    domains: {}, // monthly
    tags: {},
    brands: {},
    bars: {},

    fetch: function (callback) {
        STORE.getAll(function (list) {
            DATA.raw = list;
            console.log('fetch data', list);
            if (callback) callback(list);
        });
    },
    process: function () {
        //        DATA.raw = PROCESS.mergeCompanyDomains(DATA.raw);
        DATA.months = PROCESS.groupDomainsByMonth(DATA.raw);

        for (var month in DATA.months)
            DATA.domains[month] = PROCESS.mergeCompanyDomains(PROCESS.sumUpDomains(DATA.months[month]));

        for (var month in DATA.domains)
            DATA.tags[month] = PROCESS.sumUpTags(DATA.domains[month]);

        for (var month in DATA.domains)
            DATA.brands[month] = PROCESS.sumUpBrands(DATA.domains[month]);

        for (var month in DATA.months)
            DATA.bars[month] = PROCESS.makeBars(DATA.months[month], month);
    }
}


PROCESS = {
    mergeCompanyDomains: function (data) {
        for (var domain in data) {
            if ((domain != 'google.com') && (domain.startsWith('google.'))) {
                data['google.com'] += data[domain];
                delete data[domain];
            }

            if ((domain != 'facebook.com') && (domain.endsWith('.facebook.com'))) {
                data['facebook.com'] += data[domain];
                delete data[domain];
            }
            if ((domain != 'wikipedia.org') && (domain.endsWith('.wikipedia.org'))) {
                if (!data['wikipedia.org']) data['wikipedia.org'] = 0;
                data['wikipedia.org'] += data[domain];
                delete data[domain];
            }
        }
        return data;
    },
    groupDomainsByMonth: function (list) {
        var months = {};
        for (var date in list) {
            if (!months[date.substring(0, 7)]) months[date.substring(0, 7)] = {};
            months[date.substring(0, 7)][date.substring(8) * 1] = list[date];
        }
        return months;
    },




    sumUpDomains: function (data) {
        var sites = {};
        for (var day in data) {
            for (var site in data[day]) {
                if (!sites[site]) sites[site] = 0;
                sites[site] += data[day][site];
            }
        }
        return sites;
    },
    sumUpTags: function (data) {
        var items = {};
        for (var domain in data) {
            var tag = TAGS[domain];
            if (!tag) tag = 'other';
            if (!items[tag]) items[tag] = 0;
            items[tag] += data[domain];
        }
        console.log('tags', items);
        return items;
    },
    sumUpBrands: function (data) {
        var items = {};
        for (var domain in data) {
            var tag = BRANDS[domain];
            if (!tag) {
                if (domain.indexOf('.google.') !== -1) tag = 'google';
                if (domain.indexOf('.amazon.') !== -1) tag = 'amazon';
            }
            if (!tag) tag = 'other';
            if (!items[tag]) items[tag] = 0;
            items[tag] += data[domain];
        }
        console.log('brands', items);
        return items;
    },


    makeBars: function (data, month) {
        var tmp = month.split('-');
        var days = new Date(tmp[0], tmp[1], 0).getDate();
        var bars = [];
        for (var day = 1; day <= days; day++) {
            if (!data[day]) {
                bars.push(0);
                continue;
            }
            var sum = 0;
            for (var domain in data[day])
                sum += data[day][domain];
            bars.push(Math.round(sum / 60));
        }
        return bars;
    }

}

DATA.fetch(DATA.process);




mergeDomains = function (domain, data) {

    if ((domain != domain + '.com') && (domain.startsWith(domain + '.'))) {
        data[domain + '.com'] += data[domain];
        delete data[domain];
    }
}
