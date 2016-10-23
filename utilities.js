(function () {

    'use strict';

    var utilities = {};

    utilities.version = '0.0.4';
    
    var errorLogger;
    
    utilities.logFontColor = 'default';
    
    utilities.logBackgroundColor = 'default';
    
    utilities.logSpecial = false;
    
    utilities.logVerbose = true;
    
    /**
     * 
     * html log
     * create a div an insert the messages in div
     * can be usefull on mobile if no other console is available
     * 
     * @param {type} logObjects
     * @param {type} logObjectsLength
     * @param {type} logFontColor
     * @param {type} logBackgroundColor
     * @returns {undefined}
     */
    utilities.htmlLog = function (logObjects, logObjectsLength, logFontColor, logBackgroundColor) {

        // TODO: fix: seems that if logging starts before "domload" some
        // messages get lost

        if (document.getElementById('log') === null) {
            
            var logDiv = document.createElement('div');

            logDiv.id = 'log';
            
            logDiv.style.cssText = 'position: absolute; overflow: scroll; left: 0; bottom: 0; padding: 0; margin: 0; border: 0; z-index: 999999; width: 100%; height: 20%; background-color: #fff;';
            
            document.body.appendChild(logDiv);
            
        }
        
        for (var i = 0; i < logObjectsLength; i++) {
            
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
     * @param {type} logObjects
     * @param {type} logObjectsLength
     * @param {type} logFontColor
     * @returns {undefined}
     */
    utilities.fileLog = function fileLogFunction(logObjects, logObjectsLength, logFontColor) {
        
		try {
		
			var winston = require('winston');
				
			for (var i = 0; i < logObjectsLength; i++) {
				
                switch (logFontColor) {
					case 'red':
						winston.error(logObjects[i]);
						break;
					case 'yellow':
						winston.warn(logObjects[i]);
						break;
					default:
						winston.info(logObjects[i]);
				}
				
			}
			
        } catch (e) {
			
			// winston is not installed
			
		}
        
    };

    /**
     * 
     * log messages
     * 
     * @returns {Boolean}
     */
    utilities.log = function logFunction() {

        // is console defined, some older IEs don't have a console
        if (typeof (console) === 'undefined') {

            return false;
            
        }
        
        // extract options and get objects to log
        var logArguments = handleLogArguments(arguments);
        
        var logObjects = logArguments.objects;
        var logFontColor = logArguments.fontColor;
        var logBackgroundColor = logArguments.backgroundColor;
        
        var logObjectsLength = logObjects.length;

        // nodejs or browser mode
        if (typeof (window) === 'undefined') {

            if (typeof (utilities.logVerbose) !== 'undefined'
            && utilities.logVerbose === true) {

                // get background and fontColor codes
                var color = getServerColors(logFontColor, logBackgroundColor);

                // log each object
                for (var i = 0; i < logObjectsLength; i++) {
                    
                    if (typeof (logObjects[i]) === 'string') {
                        console.log(color.background + color.font + logObjects[i] + color.reset);
                    } else {
                        console.log(logObjects[i]);
                    }

                };
                
            }
            
            // log to file if logSpecial is enabled or if the fontColor is red
            if ((typeof (utilities.logSpecial) !== 'undefined'
            && utilities.logSpecial === true) || logFontColor === 'red') {

                this.fileLog(logObjects, logObjectsLength, logFontColor);

            }

        } else {

            // get background and fontColor codes
            var color = getClientColors(logFontColor, logBackgroundColor);

            if (typeof (utilities.logVerbose) !== 'undefined'
            && utilities.logVerbose === true) {

                // log each object
                for (var i = 0; i < logObjectsLength; i++) {

                    if (typeof (logObjects[i]) === 'string') {
                        console.log('%c' + logObjects[i], 'background: #' + color.background + '; color: #' + color.font);
                    } else {
                        console.log(logObjects[i]);
                    }

                };
                
            }

            // log to html if logSpecial is enabled
            if (typeof (utilities.logSpecial) !== 'undefined'
            && utilities.logSpecial === true) {

                this.htmlLog(logObjects, logObjectsLength, color.font, color.background);

            }

        }

    };
    
    /**
     * 
     * get the client side (browser) colors
     * 
     * @param {type} logFontColor
     * @param {type} logBackgroundColor
     * @returns {_L16.getClientColors.Anonym$2}
     */
    var getClientColors = function getClientColorsFunction(logFontColor, logBackgroundColor) {
        
        var colors = {};

        colors.red = 'FF0000';
        colors.green = '00FF00';
        colors.yellow = 'FFFF00';
        colors.blue = '0000FF';
        colors.magenta = 'FF00FF';
        colors.cyan = '00FFFF';
        colors.white = 'FFFFFF';
        colors.black = '000000';
        
        var fontColor;
        var backgroundColor;

        // font color
        if (typeof (logFontColor) === 'undefined'
        || logFontColor === 'default') {
            
            fontColor = colors['black'];
            
        } else {
            
            if (typeof (colors[logFontColor]) !== 'undefined') {
                fontColor = colors[logFontColor];
            } else {
                throw 'unknown fontColor in utilities console log';
            }
            
        }
        
        // background color
        if (typeof (logBackgroundColor) === 'undefined'
        || logBackgroundColor === 'default') {
            
            backgroundColor = colors['white'];
            
        } else {
            
            if (typeof (colors[logBackgroundColor]) !== 'undefined') {
                backgroundColor = colors[logBackgroundColor];
            } else {
                throw 'unknown fontColor in utilities console log';
            }
            
        }
        
        return { font: fontColor, background: backgroundColor };
        
    };
    
    /**
     * 
     * get the colors for the backend (server) console
     * 
     * @param {type} logFontColor
     * @param {type} logBackgroundColor
     * @returns {_L16.getServerColors.Anonym$2}
     */
    var getServerColors = function getServerColorsFunction(logFontColor, logBackgroundColor) {
        
        var backgroundColors = {};

        backgroundColors.black = '\u001b[40m';
        backgroundColors.red = '\u001b[41m';
        backgroundColors.green = '\u001b[42m';
        backgroundColors.yellow = '\u001b[43m';
        backgroundColors.blue = '\u001b[44m';
        backgroundColors.magenta = '\u001b[45m';
        backgroundColors.cyan = '\u001b[46m';
        backgroundColors.white = '\u001b[47m';
        
        var foregroundColors = {};

        foregroundColors.black = '\u001b[30m';
        foregroundColors.red = '\u001b[31m';
        foregroundColors.green = '\u001b[32m';
        foregroundColors.yellow = '\u001b[33m';
        foregroundColors.blue = '\u001b[34m';
        foregroundColors.magenta = '\u001b[35m';
        foregroundColors.cyan = '\u001b[36m';
        foregroundColors.white = '\u001b[37m';
        
        var fontColor;
        var backgroundColor;

        // font color
        if (typeof (logFontColor) === 'undefined'
        || logFontColor === 'default') {
            
            fontColor = foregroundColors['white'];
            
        } else {
            
            if (typeof (foregroundColors[logFontColor]) !== 'undefined') {
                fontColor = foregroundColors[logFontColor];
            } else {
                throw 'unknown font color in utilities console log';
            }
            
        }
        
        // background color
        if (typeof (logBackgroundColor) === 'undefined'
        || logBackgroundColor === 'default') {
            
            backgroundColor = backgroundColors['black'];
            
        } else {
            
            if (typeof (backgroundColors[logBackgroundColor]) !== 'undefined') {
                backgroundColor = backgroundColors[logBackgroundColor];
            } else {
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
     * @param {type} logArguments
     * @returns {_L16.handleLogArguments.Anonym$2}
     */
    var handleLogArguments = function handleLogArgumentsFunction(logArguments) {
        
        var logObjects = [];
        
        var logFontColor = utilities.logFontColor;
        var logBackgroundColor = utilities.logBackgroundColor;
        
        var argumentsLength = logArguments.length;
        
        var i;
        
        for (i = 0; i < argumentsLength; i++) {
            
            var argument = logArguments[i];
            
            if (typeof (argument) === 'string') {
                
                if (argument.substr(0, 10) === 'fontColor:') {
                    logFontColor = argument.substr(10, argument.length).trim();
                } else if (argument.substr(0, 16) === 'backgroundColor:') {
                    logBackgroundColor = argument.substr(16, argument.length).trim();
                } else {
                    logObjects.push(argument);
                }
                
            } else {
                logObjects.push(argument);
            }
            
        }
        
        return { objects: logObjects, fontColor: logFontColor, backgroundColor: logBackgroundColor };
        
    };
    
    /**
     * 
     * returns the timestamp of right now for browser that dont support
     * es5 Date.now
     * 
     * @returns {Number}
     */
    utilities.getTimestamp = function getTimestampFunction() {
        
        return new Date().getTime();
        
    };

    /**
     * 
     * extracts html elements (and their content) from strings
     * 
     * @param {string} text
     * @param {boolean} removeTextBetweenTags
     * @returns {string}
     */
    utilities.removeElements = function removeElementsFunction(text, removeTextBetweenTags) {
        
        if (removeTextBetweenTags === false) {
            
            // replace single tags
            text = text.replace(/<[^>]*>?/g, '');
            
        } else {
            
            // replace all tags and whats inside
            text = text.replace(/<[^>]*>[^>]*<\/[^>]*>?/g, '');

            // replace single tags
            text = text.replace(/<[^>]*>?/g, '');
            
        }

        return text;

    };

    /**
     * 
     * extracts html elements (and their content) from strings
     * 
     * @param {string} rawText
     * @returns {string}
     */
    utilities.safeUnescape = function removeElementsFunction(rawText, extendedEscape, myEscapeList) {

        var unEscapeList = {
            // usually you would just escape (unescape) characters that get
            // used in (x)html
            '&amp;': '&',
            '&lt;': '<',
            '&gt;': '>',
            '&quot;': '"',
            '&#x27;': "'",
            '&#x60;': '`'
        }

        // by default also use extended list
        if (extendedEscape === undefined || extendedEscape === true) {

            var unEscapeExtendedList = {
                // but in the case where everything has been encoded lets decode these too
                '&lsquo;': '‘',
                '&rsquo;': '’',
                '&sbquo;': '‚',
                '&ldquo;': '“',
                '&rdquo;': '”',
                '&bdquo;': '„',
                '&dagger;': '†',
                '&Dagger;': '‡',
                '&permil;': '‰',
                '&lsaquo;': '‹',
                '&rsaquo;': '›',
                '&ndash;': '-',
                '&mdash;': '—',
                '&nbsp;': ' ',
                '&iexcl;': '¡',
                '&cent;': '¢',
                '&pound;': '£',
                '&curren;': '¤',
                '&yen;': '¥',
                '&brvbar;': '¦',
                '&brkbar;': '¦',
                '&sect;': '§',
                '&uml;': '¨',
                '&die;': '¨',
                '&copy;': '©',
                '&ordf;': 'ª',
                '&laquo;': '«',
                '&not;': '¬',
                '&shy;': ' ',
                '&reg;': '®',
                '&macr;': '¯',
                '&hibar;': '¯',
                '&deg;': '°',
                '&plusmn;': '±',
                '&sup2;': '²',
                '&sup3;': '³',
                '&acute;': '´',
                '&micro;': 'µ',
                '&para;': '¶',
                '&middot;': '·',
                '&cedil;': '¸',
                '&sup1;': '¹',
                '&ordm;': 'º',
                '&raquo;': '»',
                '&frac14;': '¼',
                '&frac12;': '½',
                '&frac34;': '¾',
                '&iquest;': '¿'
            };

            for (var key in unEscapeExtendedList) {
                unEscapeList[key] = unEscapeExtendedList[key];
            }

        }

        if (myEscapeList !== undefined) {

            for (var key in myEscapeList) {
                unEscapeList[key] = myEscapeList[key];
            }

        }
        
        var escaper = function (match) {
            return unEscapeList[match];
        };

        // regexes for identifying a key that needs to be escaped
        var unEscapeKeys = Object.keys(unEscapeList);
        var source = '(?:' + unEscapeKeys.join('|') + ')';
        var testRegexp = RegExp(source);
        var replaceRegexp = RegExp(source, 'g');

        rawText = rawText == null ? '' : '' + rawText;

        var unescapedText = testRegexp.test(rawText) ? rawText.replace(replaceRegexp, escaper) : rawText;

        var text = this.removeElements(unescapedText, false);

        return text;

    };
    
    /**
     * 
     * returns a universally unique identifier
     * 
     * @returns {unresolved}
     */
    utilities.generateUUID = function generateUUIDFunction() {
    
        // http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
    
        // http://www.ietf.org/rfc/rfc4122.txt
        var s = [];
        var hexDigits = "0123456789abcdef";
        var i;
        
        for (i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        
        s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23] = "-";

        var uuid = s.join("");
        
        return uuid;
        
    };
    
    /**
     * 
     * filters a string
     * removes everything that is a not an alpha or numeric character, plus
     * the characters if any got specified as second argument
     * 
     * @param {type} inputString
     * @param {type} specialCharacters
     * @returns {Boolean}
     */
    utilities.filterAlphaNumericPlus = function filterAlphaNumericFunctionPlus(inputString, specialCharacters) {
        
        if (typeof (inputString) === 'string' && inputString.length > 0) {
            
            var outputString;
            
            if (specialCharacters !== undefined) {
                
                var regex = RegExp('[^a-z0-9' + specialCharacters + ']', 'gi');
                
                outputString = inputString.replace(regex, '');
                
            } else {
                outputString = inputString.replace(/[^a-z0-9]/gi, '');
            }
            
            return outputString;
            
        }
        
        return false;
        
    };
    
    /**
     * 
     * decode uri
     * 
     * @param {type} uri
     * @returns {unresolved}
     */
    utilities.decodeUri = function decodeUriFunction(uri) {
        
        var additionToSpace = '/\+/g';  // replace addition symbol with a space
        
        return decodeURIComponent(uri.replace(additionToSpace, ' '));
        
    };
    
    /**
     * 
     * encode uri
     * 
     * @param {type} uri
     * @returns {unresolved}
     */
    utilities.encodeUri = function (uri) {

        return encodeURIComponent(uri);
        
    };
    
    /**
     * 
     * 
     * 
     * @param {type} array
     * @param {type} removeMe
     * @returns {undefined}
     */
    utilities.arrayRemove = function arrayRemove(array, removeMe) {
        
        var index = array.indexOf(removeMe);

        if (index > -1) {
            array.splice(index, 1);
        }
        
    };
    
    /**
     * 
     * capitalise first letter of a string
     * 
     * @param string string
     * @returns {unresolved}
     */
    utilities.capitaliseFirstLetter = function capitaliseFirstLetterFunction(string) {
        
        return string.charAt(0).toUpperCase() + string.slice(1);
        
    };
    
    /**
     * 
     * get url parameters
     * 
     * @param string query
     * @returns {_L16.utilities@call;decodeUri|Boolean}
     */
    utilities.getUrlParameters = function getUrlParametersFunction(query) {
        
        if (query === undefined) {
            
            if (window !== undefined) {
                query = window.location.search.substring(1);
            } else {
                throw 'you must provide a query to parse';
            }
            
        }

        var search = /([^&=]+)=?([^&]*)/g;
        var urlParams = {};
        var parameters = search.exec(query);
        var i;

        for (i = 0; i <= parameters.length; i++) {
            
            var parameter = parameters[i];

            urlParams[decode(parameter[1])] = this.decodeUri(parameter[2]);
            
        }

        return urlParams;
        
    };
    
    /**
     * 
     * does a string contain another string
     * 
     * @param {type} string
     * @param {type} contains
     * @returns {Boolean}
     */
    utilities.stringContains = function stringContainsFunction(string, contains) {
        
        if (typeof string !== 'string') {
            throw 'input is not a string';
        }
        
        if (string.indexOf(contains) > -1) {
            return true;
        } else {
            return false;
        }
        
    };
    
    /**
     * 
     * get the index of a substring in a string with optional nth time it occurs
     * 
     * @param {type} string
     * @param {type} substring
     * @param {type} nthTime
     * @returns {unresolved}
     */
    utilities.getSubstringIndex = function getSubstringIndexFunction(string, substring, nthTime) {
        
        var times = 0;
        var index = null;
        
        if (nthTime === 0) {
            nthTime = 1;
        }

        while (times < nthTime && index !== -1) {
            
            index = string.indexOf(substring, index + 1);
            times++;
            
        }

        return index;
        
    };
    
	/**
	 * does the script run on the server
	 */
    utilities.isServer = function isServerFunction() {

        if (typeof (global) === 'object') {
    		return true;
    	} else {
    		return false;
        }

    };
    
	/**
	 * does the script run in a client
	 */
    utilities.replacePlaceholders = function replacePlaceholdersFunction(input, replacements) {

        var output = input;

        if (typeof input === 'string' && typeof replacements === 'object') {

            output = input.replace(/\b\w+?\b/g, function replacePlaceHolder(placeholder) {
                return Object.prototype.hasOwnProperty.call(replacements, placeholder) ? replacements[placeholder] : placeholder;
            });

        }

        return output;

    };

    /**
     * replace the placeholder(s) with some value
     */
    utilities.isClient = function isClientFunction() {
        return !this.isServer();
    };

    /**
     * URL utility to get a parameter by name from an URL
     */
    utilities.getUrlParameterByName = function getUrlParameterByNameFunction(name, url) {

        if (!url) {
            url = window.location.href;
        }

        name = name.replace(/[\[\]]/g, "\\$&");

        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
        var results = regex.exec(url);

        if (!results) {
            return null;
        }

        if (!results[2]) {
            return '';
        }

        return decodeURIComponent(results[2].replace(/\+/g, " "));

    }

    /**
     * URL utility to replace a given parameter
     */
    utilities.replaceUrlParameter = function replaceUrlParam(url, paramName, paramValue) {

        var pattern = new RegExp('\\b(' + paramName + '=).*?(&|$)');

        if (url.search(pattern) >= 0) {
            return url.replace(pattern, '$1' + paramValue + '$2');
        }

        return url + (url.indexOf('?') > 0 ? '&' : '?') + paramName + '=' + paramValue;

    }

    // this module can be used in the browser as well as in nodejs
    if (typeof (module) === 'object' && typeof (module.exports) === 'object') {
        module.exports = utilities;
    } else if (typeof (define) === 'function' && define.amd) {
        define('chrisweb-utilities', [], function () {
            return utilities;
        });
    }

})();
