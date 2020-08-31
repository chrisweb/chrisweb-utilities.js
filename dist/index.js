(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global['chrisweb-utilities'] = {}));
}(this, (function (exports) { 'use strict';

    /**
     * returns the timestamp for any date or for now(), also works with browsers that dont support es5 Date.now
     * @param dateString
     */
    var getTimestamp = function (dateString) {
        if (dateString === void 0) { dateString = ''; }
        var timestamp;
        if (dateString === '') {
            timestamp = new Date().getTime();
        }
        else {
            var date = new Date(dateString);
            timestamp = date.getTime();
        }
        return timestamp;
    };

    /**
     * does the script run on the server
     */
    var isServer = function () {
        if (typeof (global) === 'object') {
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * does the script run in a client
     */
    var isClient = function () {
        return !isServer();
    };

    /**
     * decode uri
     * @param inputString
     */
    var decodeUri = function (inputString) {
        var plusRegularExpression = /\+/g;
        // replace addition symbol with a space
        return decodeURIComponent(inputString.replace(plusRegularExpression, ' '));
    };
    /**
     * encode uri
     * @param inputString
     */
    var encodeUri = function (inputString) {
        var findRegularExpression = /[!'()~]|%20|%00/g;
        var replaceList = {
            '!': '%21',
            // tslint:disable-next-line
            "'": '%27',
            '(': '%28',
            ')': '%29',
            '~': '%7E',
            '%20': '+',
            '%00': '+'
        };
        return encodeURIComponent(inputString).replace(findRegularExpression, function (match) { return replaceList[match]; });
    };

    /**
     * get url parameters
     * @param query
     */
    var getUrlParameters = function (query) {
        if (query === void 0) { query = ''; }
        var urlParameters = {};
        if (query !== '' && typeof query === 'string') {
            var questionmarkIndex = query.indexOf('?');
            // if -1 there is no questionmark, skip, all is fine
            // else just keep what comes after the questionmark
            if (questionmarkIndex !== -1) {
                query = query.slice(questionmarkIndex + 1);
            }
            var pairs = query.split('&');
            var i = void 0;
            for (i = 0; i < pairs.length; i++) {
                var pair = pairs[i];
                var equalIndex = pair.indexOf('=');
                var parameterKey = '';
                var parameterValue = '';
                if (equalIndex > -1) {
                    parameterKey = pair.slice(0, equalIndex);
                    parameterValue = pair.slice(equalIndex + 1);
                }
                else {
                    parameterKey = pair;
                }
                urlParameters[decodeUri(parameterKey)] = decodeUri(parameterValue);
            }
        }
        return urlParameters;
    };
    /**
     * URL utility to get a parameter by name from an URL
     * @param name
     * @param url
     */
    var getUrlParameterByName = function (name, url) {
        if (!url) {
            url = window.location.href;
        }
        name = name.replace(/[[]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
        var results = regex.exec(url);
        if (!results) {
            return null;
        }
        if (!results[2]) {
            return '';
        }
        return decodeUri(results[2]);
    };
    /**
     * URL utility to replace a given parameter
     * @param url
     * @param paramName
     * @param paramValue
     */
    var replaceUrlParameter = function (url, paramName, paramValue) {
        var pattern = new RegExp('\\b(' + paramName + '=).*?(&|$)');
        if (url.search(pattern) >= 0) {
            return url.replace(pattern, '$1' + paramValue + '$2');
        }
        return url + (url.indexOf('?') > 0 ? '&' : '?') + paramName + '=' + paramValue;
    };

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }

    var _this = undefined;
    /**
     * finds "removeMe" and removes it from the array
     * @param array
     * @param removeMe
     */
    var removeString = function (myArray, removeMe) {
        var index = myArray.indexOf(removeMe);
        if (index > -1) {
            myArray.splice(index, 1);
        }
        return myArray;
    };
    /**
     * is array with polyfill for older browsers
     * @param input
     */
    var isArray = function (input) {
        // MDN is array documentation: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray
        if (!Array.isArray) {
            return Object.prototype.toString.call(input) === '[object Array]';
        }
        else {
            return Array.isArray(input);
        }
    };
    /**
     * finds "toFind" in an array, starting at an optional index
     * @param inputArray
     * @param toFind
     * @param fromIndex
     */
    var includes = function (inputArray, toFind, fromIndex) {
        // MDN includes documentation: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
        if (!Array.prototype.includes) {
            // https://tc39.github.io/ecma262/#sec-array.prototype.includes
            if (_this == null) {
                throw new TypeError('"this" is null or not defined');
            }
            // 1. Let O be ? ToObject(this value)
            var o = Object(_this);
            // 2. Let len be ? ToLength(? Get(O, "length"))
            var len = o.length >>> 0;
            // 3. If len is 0, return false
            if (len === 0) {
                return false;
            }
            // 4. Let n be ? ToInteger(fromIndex)
            //    (If fromIndex is undefined, this step produces the value 0.)
            var n = fromIndex | 0;
            // 5. If n ≥ 0, then
            //  a. Let k be n.
            // 6. Else n < 0,
            //  a. Let k be len + n.
            //  b. If k < 0, let k be 0.
            var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
            // 7. Repeat, while k < len
            while (k < len) {
                // a. Let elementK be the result of ? Get(O, ! ToString(k))
                // b. If SameValueZero(valueToFind, elementK) is true, return true
                if (sameValueZero(o[k], toFind)) {
                    return true;
                }
                // c. Increase k by 1
                k++;
            }
            // 8. Return false
            return false;
        }
        else {
            var n = fromIndex | 0;
            return inputArray.includes(toFind, n);
        }
    };
    var sameValueZero = function (x, y) {
        return x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y));
    };
    /**
     *
     * @param inputArray
     * @param predicate
     * @param args
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
    var find = function (inputArray, predicate, args) {
        // MDN find documentation: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
        if (!Array.prototype.find) {
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
            // 1. Let O be ? ToObject(this value)
            if (_this == null) {
                throw new TypeError('"this" is null or not defined');
            }
            var o = Object(_this);
            // 2. Let len be ? ToLength(? Get(O, "length"))
            var len = o.length >>> 0;
            // 3. If IsCallable(predicate) is false, throw a TypeError exception
            if (typeof predicate !== 'function') {
                throw new TypeError('predicate must be a function');
            }
            // 4. If thisArg was supplied, let T be thisArg; else let T be undefined
            var thisArg = args[1];
            // 5. Let k be 0.
            var k = 0;
            // 6. Repeat, while k < len
            while (k < len) {
                // a. Let Pk be ! ToString(k)
                // b. Let kValue be ? Get(O, Pk)
                // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »))
                // d. If testResult is true, return kValue
                var kValue = o[k];
                if (predicate.call(thisArg, kValue, k, o)) {
                    return kValue;
                }
                // e. Increase k by 1
                k++;
            }
            // 7. Return undefined
            return undefined;
        }
        else {
            // eslint-disable-next-line
            return inputArray.find(predicate, args);
        }
    };
    /**
     * array flat polyfill, if depth is unknow set it to "Infinity"
     * @param inputArray
     * @param depth
     */
    var flat = function (inputArray, depth) {
        // MDN flat documentation: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat
        if (depth === void 0) { depth = Infinity; }
        if (!Array.prototype.flat) {
            return flatten(inputArray, Math.floor(depth) || 1);
        }
        else {
            return inputArray.flat(depth);
        }
    };
    /**
     * flattens a multidimensional array
     * @param inputArray
     * @param depth
     */
    var flatten = function (inputArray, depth) {
        var e_1, _a;
        if (depth === void 0) { depth = Infinity; }
        var flattend = [];
        try {
            for (var inputArray_1 = __values(inputArray), inputArray_1_1 = inputArray_1.next(); !inputArray_1_1.done; inputArray_1_1 = inputArray_1.next()) {
                var el = inputArray_1_1.value;
                if (isArray(el) && depth > 0) {
                    flatten(el, depth - 1);
                }
                else {
                    flattend.push(el);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (inputArray_1_1 && !inputArray_1_1.done && (_a = inputArray_1.return)) _a.call(inputArray_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return flattend;
    };

    /**
     * filters a string
     * removes everything that is a not an alpha or numeric character, plus
     * the characters if any got specified as second argument
     * @param inputString
     * @param specialCharacters
     */
    var filterAlphaNumericPlus = function (inputString, specialCharacters) {
        if (typeof (inputString) === 'string' && inputString.length > 0) {
            var outputString = void 0;
            if (specialCharacters !== undefined) {
                var regex = RegExp('[^a-z0-9' + specialCharacters + ']', 'gi');
                outputString = inputString.replace(regex, '');
            }
            else {
                outputString = inputString.replace(/[^a-z0-9]/gi, '');
            }
            return outputString;
        }
        return false;
    };
    /**
     * capitalise first letter of a string
     * @param inputString
     */
    var capitaliseFirstLetter = function (inputString) {
        return inputString.charAt(0).toUpperCase() + inputString.slice(1);
    };
    /**
     * does a string contain another string
     * @param inputString
     * @param contains
     */
    var stringContains = function (inputString, contains) {
        if (typeof inputString !== 'string') {
            throw 'input is not a string';
        }
        if (inputString.indexOf(contains) > -1) {
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * get the index of a substring in a string with optional nth time it occurs
     * @param inputString
     * @param substring
     * @param nthTime
     */
    var getSubstringIndex = function (inputString, substring, nthTime) {
        var times = 0;
        var index = null;
        if (nthTime === 0) {
            nthTime = 1;
        }
        while (times < nthTime && index !== -1) {
            index = inputString.indexOf(substring, index + 1);
            times++;
        }
        return index;
    };
    /**
     * replace the placeholder(s) with some value
     * @param input
     * @param replacements
     */
    var replacePlaceholders = function (input, replacements) {
        var output = input;
        if (typeof input === 'string' && typeof replacements === 'object') {
            output = input.replace(/\b\w+?\b/g, function replacePlaceHolder(placeholder) {
                return Object.prototype.hasOwnProperty.call(replacements, placeholder) ? replacements[placeholder] : placeholder;
            });
        }
        return output;
    };
    /**
     * remove all spaces from a string
     * @param input
     */
    var removeAllSpaces = function (input) {
        return input.replace(/\s/g, '');
    };

    /**
     * returns a universally unique identifier
     */
    var generateUUID = function () {
        // http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
        // http://www.ietf.org/rfc/rfc4122.txt
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var s = [];
        var hexDigits = '0123456789abcdef';
        var i;
        for (i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = 4; // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23] = '-';
        var uuid = s.join('');
        return uuid;
    };

    /**
     * extracts html elements (and their content) from strings
     * @param text
     * @param removeTextBetweenTags
     */
    var removeElements = function (text, removeTextBetweenTags) {
        if (removeTextBetweenTags === false) {
            // replace single tags
            text = text.replace(/<[^>]*>?/g, '');
        }
        else {
            // replace all tags and whats inside
            text = text.replace(/<[^>]*>[^>]*<\/[^>]*>?/g, '');
            // replace single tags
            text = text.replace(/<[^>]*>?/g, '');
        }
        return text;
    };

    /**
     * html log
     * create a div an insert the messages in div
     * can be usefull on mobile if no other console is available
     * @param logObjects
     * @param logObjectsLength
     * @param logFontColor
     * @param logBackgroundColor
     */
    var htmlLog = function (logObjects, logObjectsLength, logFontColor, logBackgroundColor) {
        // TODO: fix: seems that if logging starts before "domload" some
        // messages get lost
        if (document.getElementById('log') === null) {
            var logDiv = document.createElement('div');
            logDiv.id = 'log';
            logDiv.style.cssText = 'position: absolute; overflow: scroll; left: 0; bottom: 0; padding: 0; margin: 0; border: 0; z-index: 999999; width: 100%; height: 20%; background-color: #fff;';
            document.body.appendChild(logDiv);
        }
        var i;
        for (i = 0; i < logObjectsLength; i++) {
            var logSpan = document.createElement('span');
            logSpan.style.cssText = 'color: #' + logFontColor + '; background-color: #' + logBackgroundColor + ';';
            var logObject = logObjects[i];
            var spanContent = document.createTextNode(logObject);
            logSpan.appendChild(spanContent);
            document.getElementById('log').appendChild(logSpan);
            var brElement = document.createElement('br');
            document.getElementById('log').appendChild(brElement);
        }
    };

    /**
     * nodejs logging to file
     * @param logObjects
     * @param logObjectsLength
     * @param logFontColor
     */
    var fileLog = function (logObjects, logObjectsLength, logFontColor) {
        console.log(logObjects);
        console.log(logObjectsLength);
        console.log(logFontColor);
        throw new Error('sorry this feature is broken');
    };

    var defaultLogFontColor = 'default';
    var defaultLogBackgroundColor = 'default';
    /**
     * log messages
     * @param args
     */
    var log = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        // is console defined, some older IEs don't have a console
        if (typeof (console) === 'undefined') {
            throw new Error('This browser does not support console');
        }
        // extract options and get objects to log
        // read: https://github.com/Microsoft/TypeScript/issues/1609
        var logArguments = handleLogArguments(args);
        var logObjects = logArguments.objects;
        var logFontColor = logArguments.fontColor;
        var logBackgroundColor = logArguments.backgroundColor;
        var logObjectsLength = logObjects.length;
        // nodejs or browser mode
        if (typeof (window) === 'undefined') {
            {
                // get background and fontColor codes
                var color = getServerColors(logFontColor, logBackgroundColor);
                // log each object
                for (var i = 0; i < logObjectsLength; i++) {
                    if (typeof (logObjects[i]) === 'string') {
                        console.log(color.background + color.font + logObjects[i] + color.reset);
                    }
                    else {
                        console.log(logObjects[i]);
                    }
                }
            }
            // log to file if logSpecial is enabled or if the fontColor is red
            // if (logSpecial === true || logFontColor === 'red') {
            if (logFontColor === 'red') {
                fileLog(logObjects, logObjectsLength, logFontColor);
            }
        }
        else {
            // get background and fontColor codes
            var color = getClientColors(logFontColor, logBackgroundColor);
            {
                // log each object
                for (var i = 0; i < logObjectsLength; i++) {
                    if (typeof (logObjects[i]) === 'string') {
                        console.log('%c' + logObjects[i], 'background: #' + color.background + '; color: #' + color.font);
                    }
                    else {
                        console.log(logObjects[i]);
                    }
                }
            }
            // log to html if logSpecial is enabled
            //if (logSpecial === true) {
            var stringLogObjects_1 = [];
            logObjects.forEach(function (logObject) {
                stringLogObjects_1.push(logObject.toString());
            });
            htmlLog(stringLogObjects_1, logObjectsLength, color.font, color.background);
            //}
        }
    };
    /**
     * get the client side (browser) colors
     * @param logFontColor
     * @param logBackgroundColor
     */
    var getClientColors = function (logFontColor, logBackgroundColor) {
        var colors = {
            red: 'FF0000',
            green: '00FF00',
            yellow: 'FFFF00',
            blue: '0000FF',
            magenta: 'FF00FF',
            cyan: '00FFFF',
            white: 'FFFFFF',
            black: '000000'
        };
        var fontColor;
        var backgroundColor;
        // font color
        if (typeof (logFontColor) === 'undefined'
            || logFontColor === 'default') {
            fontColor = colors['black'];
        }
        else {
            if (typeof (colors[logFontColor]) !== 'undefined') {
                fontColor = colors[logFontColor];
            }
            else {
                throw 'unknown fontColor in utilities console log';
            }
        }
        // background color
        if (typeof (logBackgroundColor) === 'undefined'
            || logBackgroundColor === 'default') {
            backgroundColor = colors['white'];
        }
        else {
            if (typeof (colors[logBackgroundColor]) !== 'undefined') {
                backgroundColor = colors[logBackgroundColor];
            }
            else {
                throw 'unknown fontColor in utilities console log';
            }
        }
        return { font: fontColor, background: backgroundColor };
    };
    /**
     * get the colors for the backend (server) console
     * @param logFontColor
     * @param logBackgroundColor
     */
    var getServerColors = function (logFontColor, logBackgroundColor) {
        var backgroundColors = {
            black: '\u001b[40m',
            red: '\u001b[41m',
            green: '\u001b[42m',
            yellow: '\u001b[43m',
            blue: '\u001b[44m',
            magenta: '\u001b[45m',
            cyan: '\u001b[46m',
            white: '\u001b[47m'
        };
        var foregroundColors = {
            black: '\u001b[30m',
            red: '\u001b[31m',
            green: '\u001b[32m',
            yellow: '\u001b[33m',
            blue: '\u001b[34m',
            magenta: '\u001b[35m',
            cyan: '\u001b[36m',
            white: '\u001b[37m'
        };
        var fontColor;
        var backgroundColor;
        // font color
        if (typeof (logFontColor) === 'undefined'
            || logFontColor === 'default') {
            fontColor = foregroundColors['white'];
        }
        else {
            if (typeof (foregroundColors[logFontColor]) !== 'undefined') {
                fontColor = foregroundColors[logFontColor];
            }
            else {
                throw 'unknown font color in utilities console log';
            }
        }
        // background color
        if (typeof (logBackgroundColor) === 'undefined'
            || logBackgroundColor === 'default') {
            backgroundColor = backgroundColors['black'];
        }
        else {
            if (typeof (backgroundColors[logBackgroundColor]) !== 'undefined') {
                backgroundColor = backgroundColors[logBackgroundColor];
            }
            else {
                throw 'unknown background color in utilities console log';
            }
        }
        return { font: fontColor, background: backgroundColor, reset: '\u001b[0m' };
    };
    /**
     * handle log arguments
     * extract the color infos from the arguments to log
     * @param logArguments
     */
    var handleLogArguments = function (logArguments) {
        var logObjects = [];
        var logFontColor = defaultLogFontColor;
        var logBackgroundColor = defaultLogBackgroundColor;
        var argumentsLength = logArguments.length;
        var i;
        for (i = 0; i < argumentsLength; i++) {
            var argument = logArguments[i];
            if (typeof argument === 'string') {
                if (argument.substr(0, 10) === 'fontColor:') {
                    logFontColor = argument.substr(10, argument.length).trim();
                }
                else if (argument.substr(0, 16) === 'backgroundColor:') {
                    logBackgroundColor = argument.substr(16, argument.length).trim();
                }
                else {
                    logObjects.push(argument);
                }
            }
            else {
                logObjects.push(argument);
            }
        }
        return { objects: logObjects, fontColor: logFontColor, backgroundColor: logBackgroundColor };
    };

    /**
     * pauses your script for a given time, returns a promise that you can use to do so
     * @param ms
     */
    var sleep = function (ms) {
        return new Promise(function (resolve) { return setTimeout(resolve, ms); });
    };

    /**
     * returns a random integer that lies between min (included) and max (included)
     * @param min
     * @param max
     */
    var randomInteger = function (min, max, prng) {
        if (min === void 0) { min = 0; }
        if (max === void 0) { max = Infinity; }
        // support for custom PRNGs, like https://www.npmjs.com/package/seedrandom
        if (prng) {
            prng.floor(prng.random() * (max - min + 1) + min);
        }
        else {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }
    };
    var choice = function (sequence, prng) {
        if (sequence === void 0) { sequence = []; }
        // support for custom PRNGs, like https://www.npmjs.com/package/seedrandom
        if (prng) {
            return sequence[prng.floor(prng.random() * sequence.length)];
        }
        else {
            return sequence[Math.floor(Math.random() * sequence.length)];
        }
    };

    var version = '1.0.0';

    exports.capitaliseFirstLetter = capitaliseFirstLetter;
    exports.choice = choice;
    exports.decodeUri = decodeUri;
    exports.encodeUri = encodeUri;
    exports.filterAlphaNumericPlus = filterAlphaNumericPlus;
    exports.find = find;
    exports.flat = flat;
    exports.generateUUID = generateUUID;
    exports.getSubstringIndex = getSubstringIndex;
    exports.getTimestamp = getTimestamp;
    exports.getUrlParameterByName = getUrlParameterByName;
    exports.getUrlParameters = getUrlParameters;
    exports.includes = includes;
    exports.isArray = isArray;
    exports.isClient = isClient;
    exports.isServer = isServer;
    exports.log = log;
    exports.randomInteger = randomInteger;
    exports.removeAllSpaces = removeAllSpaces;
    exports.removeElements = removeElements;
    exports.removeString = removeString;
    exports.replacePlaceholders = replacePlaceholders;
    exports.replaceUrlParameter = replaceUrlParameter;
    exports.sleep = sleep;
    exports.stringContains = stringContains;
    exports.version = version;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=index.js.map
