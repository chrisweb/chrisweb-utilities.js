import { htmlLog } from './log/adapters/html';
import { fileLog } from './log/adapters/file';

const defaultLogFontColor = 'default';
const defaultLogBackgroundColor = 'default';
//const logSpecial = false;
const logVerbose = true;

/**
 * log messages
 * @param args 
 */
const log = (...args: unknown[]): void => {

    // is console defined, some older IEs don't have a console
    if (typeof (console) === 'undefined') {

        throw new Error('This browser does not support console');

    }

    // extract options and get objects to log
    // read: https://github.com/Microsoft/TypeScript/issues/1609
    const logArguments = handleLogArguments(args);

    const logObjects = logArguments.objects;
    const logFontColor = logArguments.fontColor;
    const logBackgroundColor = logArguments.backgroundColor;

    const logObjectsLength = logObjects.length;

    // nodejs or browser mode
    if (typeof (window) === 'undefined') {

        if (typeof (logVerbose) !== 'undefined'
        && logVerbose === true) {

            // get background and fontColor codes
            const color = getServerColors(logFontColor, logBackgroundColor);

            // log each object
            for (let i = 0; i < logObjectsLength; i++) {

                if (typeof (logObjects[i]) === 'string') {
                    console.log(color.background + color.font + logObjects[i] + color.reset);
                } else {
                    console.log(logObjects[i]);
                }

            }

        }

        // log to file if logSpecial is enabled or if the fontColor is red
        // if (logSpecial === true || logFontColor === 'red') {
        if (logFontColor === 'red') {

            fileLog(logObjects, logObjectsLength, logFontColor);

        }

    } else {

        // get background and fontColor codes
        const color = getClientColors(logFontColor, logBackgroundColor);

        if (typeof (logVerbose) !== 'undefined'
        && logVerbose === true) {

            // log each object
            for (let i = 0; i < logObjectsLength; i++) {

                if (typeof (logObjects[i]) === 'string') {
                    console.log('%c' + logObjects[i], 'background: #' + color.background + '; color: #' + color.font);
                } else {
                    console.log(logObjects[i]);
                }

            }

        }

        // log to html if logSpecial is enabled
        //if (logSpecial === true) {

        const stringLogObjects: string[] = [];

        logObjects.forEach((logObject) => {
            stringLogObjects.push(logObject.toString())
        });

        htmlLog(stringLogObjects, logObjectsLength, color.font, color.background);

        //}

    }

};

interface IColors {
    red: string;
    green: string;
    yellow: string;
    blue: string;
    magenta: string;
    cyan: string;
    white: string;
    black: string;
    [key: string]: string;
}

/**
 * get the client side (browser) colors
 * @param logFontColor 
 * @param logBackgroundColor 
 */
const getClientColors = (logFontColor: string, logBackgroundColor: string) => {

    const colors: IColors = {
        red: 'FF0000',
        green: '00FF00',
        yellow: 'FFFF00',
        blue: '0000FF',
        magenta: 'FF00FF',
        cyan: '00FFFF',
        white: 'FFFFFF',
        black: '000000'
    };

    let fontColor;
    let backgroundColor;

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
 * get the colors for the backend (server) console
 * @param logFontColor 
 * @param logBackgroundColor 
 */
const getServerColors = (logFontColor: string, logBackgroundColor: string) => {

    const backgroundColors: IColors = {
        black: '\u001b[40m',
        red: '\u001b[41m',
        green: '\u001b[42m',
        yellow: '\u001b[43m',
        blue: '\u001b[44m',
        magenta: '\u001b[45m',
        cyan: '\u001b[46m',
        white: '\u001b[47m'
    };



    const foregroundColors: IColors = {
        black: '\u001b[30m',
        red: '\u001b[31m',
        green: '\u001b[32m',
        yellow: '\u001b[33m',
        blue: '\u001b[34m',
        magenta: '\u001b[35m',
        cyan: '\u001b[36m',
        white: '\u001b[37m'
    };

    let fontColor;
    let backgroundColor;

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
 * handle log arguments
 * extract the color infos from the arguments to log
 * @param logArguments 
 */
const handleLogArguments = (logArguments?: unknown[]) => {

    const logObjects = [];

    let logFontColor = defaultLogFontColor;
    let logBackgroundColor = defaultLogBackgroundColor;

    const argumentsLength = logArguments.length;

    let i;

    for (i = 0; i < argumentsLength; i++) {

        const argument = logArguments[i];

        if (typeof argument === 'string') {

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

export { log };
