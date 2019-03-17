/**
 * returns the timestamp for any date or for now(), also works with browsers that dont support es5 Date.now
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
 *
 * does the script run on the server
 *
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
 *
 * does the script run in a client
 *
 */
var isClient = function () {
    return !isServer();
};

/**
 *
 * decode uri
 *
 */
var decodeUri = function (uri) {
    // replace addition symbol with a space
    var additionToSpace = '/\+/g';
    return decodeURIComponent(uri.replace(additionToSpace, ' '));
};
/**
 *
 * encode uri
 *
 */
var encodeUri = function (uri) {
    return encodeURIComponent(uri);
};

/**
 *
 * get url parameters
 *
 */
var getUrlParameters = function (query) {
    if (query === void 0) { query = ''; }
    if (query === '') {
        if (window !== undefined) {
            query = window.location.search.substring(1);
        }
        else {
            throw 'you must provide a query to parse';
        }
    }
    var search = /([^&=]+)=?([^&]*)/g;
    var urlParams = {};
    var parameters = search.exec(query);
    var i;
    for (i = 0; i <= parameters.length; i++) {
        var parameter = parameters[i];
        urlParams[parameter[1]] = decodeUri(parameter[2]);
    }
    return urlParams;
};
/**
 *
 * URL utility to get a parameter by name from an URL
 *
 */
var getUrlParameterByName = function (name, url) {
    if (!url) {
        url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
    var results = regex.exec(url);
    if (!results) {
        return null;
    }
    if (!results[2]) {
        return '';
    }
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
};
/**
 *
 * URL utility to replace a given parameter
 *
 */
var replaceUrlParameter = function (url, paramName, paramValue) {
    var pattern = new RegExp('\\b(' + paramName + '=).*?(&|$)');
    if (url.search(pattern) >= 0) {
        return url.replace(pattern, '$1' + paramValue + '$2');
    }
    return url + (url.indexOf('?') > 0 ? '&' : '?') + paramName + '=' + paramValue;
};

/**
 *
 * array related functions
 *
 */
var arrayRemove = function (array, removeMe) {
    var index = array.indexOf(removeMe);
    if (index > -1) {
        array.splice(index, 1);
    }
};

/**
 *
 * filters a string
 * removes everything that is a not an alpha or numeric character, plus
 * the characters if any got specified as second argument
 *
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
 *
 * capitalise first letter of a string
 *
 */
var capitaliseFirstLetter = function (inputString) {
    return inputString.charAt(0).toUpperCase() + inputString.slice(1);
};
/**
 *
 * does a string contain another string
 *
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
 *
 * get the index of a substring in a string with optional nth time it occurs
 *
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
 *
 * replace the placeholder(s) with some value
 *
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
 *
 * returns a universally unique identifier
 *
 */
var generateUUID = function () {
    // http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
    // http://www.ietf.org/rfc/rfc4122.txt
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
 *
 * extracts html elements (and their content) from strings
 *
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
 *
 * html log
 * create a div an insert the messages in div
 * can be usefull on mobile if no other console is available
 *
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
        var spanContent = document.createTextNode(logObjects[i]);
        logSpan.appendChild(spanContent);
        document.getElementById('log').appendChild(logSpan);
        var brElement = document.createElement('br');
        document.getElementById('log').appendChild(brElement);
    }
};

/**
 *
 * file log
 * nodejs logging to file
 *
 */

var defaultLogFontColor = 'default';
var defaultLogBackgroundColor = 'default';
/**
 *
 * log messages
 *
 */
var log = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    // is console defined, some older IEs don't have a console
    if (typeof (console) === 'undefined') {
        return false;
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
        htmlLog(logObjects, logObjectsLength, color.font, color.background);
        //}
    }
};
/**
 *
 * get the client side (browser) colors
 *
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
 *
 * get the colors for the backend (server) console
 *
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
 *
 * handle log arguments
 * extract the color infos from the arguments to log
 *
 */
var handleLogArguments = function (logArguments) {
    var logObjects = [];
    var logFontColor = defaultLogFontColor;
    var logBackgroundColor = defaultLogBackgroundColor;
    var argumentsLength = logArguments.length;
    var i;
    for (i = 0; i < argumentsLength; i++) {
        var argument = logArguments[i];
        if (typeof (argument) === 'string') {
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

var version = '1.0.0';

export { version, getTimestamp, isServer, isClient, getUrlParameters, getUrlParameterByName, replaceUrlParameter, decodeUri, encodeUri, arrayRemove, filterAlphaNumericPlus, capitaliseFirstLetter, stringContains, getSubstringIndex, replacePlaceholders, generateUUID, removeElements, log };
//# sourceMappingURL=index.esm.js.map
