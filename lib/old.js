//     var parts = {
//         subdomains: split.slice(0, -3).join('.'),
//         domain: split.slice(-3, -2)[0],
//         TLD: last2
//     };
// } else {
//     var diff = -2;
//     var parts = {
//         subdomains: split.slice(0, -2).join('.'),
//         domain: split.slice(-2, -1)[0],
//         TLD: split.slice(-1)[0],
//     };
// }
// return parts.domain + '.' + parts.TLD;
//     if (['co.th', 'co.uk'].indexOf(tmp) != -1)
//         var tmp = domain.split('.').slice(-3).join('.');
// }
// }

// return tmp;



// groupDaysByMonth: function(list) { // -> // {'2016-01':{'31':{'google.com':31, ...}}, '2016-02':{'01':{...}, ... } }
//     var months = {};
//     for (var date in list) {
//         if (!months[date.substring(0, 7)]) months[date.substring(0, 7)] = {};
//         months[date.substring(0, 7)][date.substring(8) * 1] = list[date];
//     }
//     return months;
// },

// mergeSubDomainsIntoParents: function(data) { // works on flat domain-list
//     var out = {};
//     for (var domain in data) {
//         var tmp = domain.split('.').slice(-2).join('.');
//         if (['co.th', 'co.uk'].indexOf(tmp) != -1)
//             tmp = domain.split('.').slice(-3).join('.');
//         if (!out[tmp]) out[tmp] = 0;
//         out[tmp] += data[domain];
//     }
//     return out;
// },


// mergeCompany: function(data, company, TLD) { // works on flat domain-list
//     for (var domain in data) {
//         if (domain == company + TLD) continue;
//         if (domain.startsWith(company)) {
//             if (!data[company + TLD]) data[company + TLD] = 0;
//             data[company + TLD] += data[domain];
//             delete data[domain];
//         }
//     }
// },

// mergeCompanies: function(data) {
//     API.mergeCompany(data, 'google.', 'com');
//     API.mergeCompany(data, 'facebook.', 'com');
//     API.mergeCompany(data, 'amazon.', 'com');
//     API.mergeCompany(data, 'wikipedia.', 'org');
//     API.mergeCompany(data, 'wikitravel.', 'org');
//     API.mergeCompany(data, 'airbnb.', 'com');
//     API.mergeCompany(data, 'github.', 'com');
//     API.mergeCompany(data, 'travelfish.', 'com');
// },

// cleanDomains: function(data) {
//     data = API.mergeDomains(data);
//     API.mergeCompanies(data);
//     return data;
// },

//....

// sumUpDomains: function(data) {
//     var sites = {};
//     for (var day in data) {
//         for (var site in data[day]) {
//             if (!sites[site]) sites[site] = 0;
//             sites[site] += data[day][site];
//         }
//     }
//     return sites;
// },
// sumUpTags: function(data) {
//     var items = {};
//     for (var domain in data) {
//         var tag = TAGS[domain];
//         if (!tag) tag = 'other';
//         if (!items[tag]) items[tag] = 0;
//         items[tag] += data[domain];
//     }
//     console.log('tags', items);
//     return items;
// },
// sumUpBrands: function(data) {
//     var items = {};
//     for (var domain in data) {
//         var tag = BRANDS[domain];
//         if (!tag) {
//             if (domain.indexOf('.google.') !== -1) tag = 'google';
//             if (domain.indexOf('.amazon.') !== -1) tag = 'amazon';
//         }
//         if (!tag) tag = 'other';
//         if (!items[tag]) items[tag] = 0;
//         items[tag] += data[domain];
//     }
//     console.log('brands', items);
//     return items;
// },


// makeBars: function(data, month) {
//     var tmp = month.split('-');
//     var days = new Date(tmp[0], tmp[1], 0).getDate();
//     var bars = [];
//     for (var day = 1; day <= days; day++) {
//         if (!data[day]) {
//             bars.push(0);
//             continue;
//         }
//         var sum = 0;
//         for (var domain in data[day])
//             sum += data[day][domain];
//         bars.push(Math.round(sum / 60));
//     }
//     return bars;
// }
// DATA.fetch(DATA.process);



// process: function() {
//     //        DATA.raw = API.mergeCompanyDomains(DATA.raw);
//     //        DATA.TLDs = API.mergeTLDs(DATA.raw);

//     DATA.months = API.groupDomainsByMonth(DATA.raw);

//     for (var month in DATA.months)
//         DATA.domains[month] = API.cleanDomains(API.sumUpDomains(DATA.months[month]));

//     for (var month in DATA.domains)
//         DATA.tags[month] = API.sumUpTags(DATA.domains[month]);

//     for (var month in DATA.domains)
//         DATA.brands[month] = API.sumUpBrands(DATA.domains[month]);

//     for (var month in DATA.months)
//         DATA.bars[month] = API.makeBars(DATA.months[month], month);
// }



//mergeDomains = function (domain, data) {
//
//    if ((domain != domain + '.com') && (domain.startsWith(domain + '.'))) {
//        data[domain + '.com'] += data[domain];
//        delete data[domain];
//    }
//}



//    mergeCompanyDomains: function (data) {
//        for (var domain in data) {
//            if ((domain != 'google.com') && (domain.startsWith('google.'))) {
//                data['google.com'] += data[domain];
//                delete data[domain];
//            }
//
//            if ((domain != 'facebook.com') && (domain.endsWith('.facebook.com'))) {
//                data['facebook.com'] += data[domain];
//                delete data[domain];
//            }
//            if ((domain != 'wikipedia.org') && (domain.endsWith('.wikipedia.org'))) {
//                if (!data['wikipedia.org']) data['wikipedia.org'] = 0;
//                data['wikipedia.org'] += data[domain];
//                delete data[domain];
//            }
//        }
//        return data;
//    },