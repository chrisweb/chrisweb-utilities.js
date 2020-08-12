import { removeElements } from './../../html';

/**
 *
 * html log
 * create a div an insert the messages in div
 * can be usefull on mobile if no other console is available
 *
 */
const htmlLog = (logObjects: string[], logObjectsLength: number, logFontColor: string, logBackgroundColor: string): void => {

    // TODO: fix: seems that if logging starts before "domload" some
    // messages get lost

    if (document.getElementById('log') === null) {

        const logDiv = document.createElement('div');

        logDiv.id = 'log';

        logDiv.style.cssText = 'position: absolute; overflow: scroll; left: 0; bottom: 0; padding: 0; margin: 0; border: 0; z-index: 999999; width: 100%; height: 20%; background-color: #fff;';

        document.body.appendChild(logDiv);

    }

    let i;

    for (i = 0; i < logObjectsLength; i++) {

        const logSpan = document.createElement('span');

        logSpan.style.cssText = 'color: #' + logFontColor + '; background-color: #' + logBackgroundColor + ';';

        const logObject = logObjects[i];

        const spanContent = document.createTextNode(logObject);

        logSpan.appendChild(spanContent);

        document.getElementById('log').appendChild(logSpan);

        const brElement = document.createElement('br');

        document.getElementById('log').appendChild(brElement);

    }

};

/**
 *
 * extracts html elements (and their content) from strings
 *
 */
const safeUnescape = (rawText: string, extendedEscape = false, myEscapeList: string[]): string => {

    interface IEscapeList {
        [key: string]: string;
    }

    const unEscapeList: IEscapeList = {
        // usually you would just escape (unescape) characters that get
        // used in (x)html
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
        '&quot;': '"',
        '&#x27;': '\'',
        '&#x60;': '`'
    };

    // by default also use extended list
    if (extendedEscape === true) {

        const unEscapeExtendedList: IEscapeList = {
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

        for (const key in unEscapeExtendedList) {
            unEscapeList[key] = unEscapeExtendedList[key];
        }

    }

    if (myEscapeList !== undefined) {

        for (const key in myEscapeList) {
            unEscapeList[key] = myEscapeList[key];
        }

    }

    const escaper = function (match: string) {
        return unEscapeList[match];
    };

    // regexes for identifying a key that needs to be escaped
    const unEscapeKeys = Object.keys(unEscapeList);
    const source = '(?:' + unEscapeKeys.join('|') + ')';
    const testRegexp = RegExp(source);
    const replaceRegexp = RegExp(source, 'g');

    rawText = rawText == null ? '' : '' + rawText;

    const unescapedText = testRegexp.test(rawText) ? rawText.replace(replaceRegexp, escaper) : rawText;

    const text = removeElements(unescapedText, false);

    return text;

};

export { htmlLog, safeUnescape };
