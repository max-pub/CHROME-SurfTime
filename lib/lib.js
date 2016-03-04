ObjectToArray = function(obj) {
    return Object.keys(obj).map(function(key) {
        return {
            name: key,
            value: obj[key]
        };
    });
}

//        valueSort = function (a, b) {
//            return b.value - a.value
//        }


String.prototype.startsWith = function(str) {
    return this.substr(0, str.length) == str;
}
String.prototype.endsWith = function(str) {
    return this.substr(-str.length) == str;
}


humanTime = function(seconds) {
    if (seconds / 3600 > 1) return Math.floor(seconds / 3600) + 'h';
    if (seconds / 60 > 1) return Math.floor(seconds / 60) + 'm';
    return seconds + 's';
}

LeftPadZero = function(i) {
    return i < 10 ? ('0' + i) : ('' + i);
}