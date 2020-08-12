/**
 *
 * file log
 * nodejs logging to file
 *
 */
const fileLog = (logObjects: unknown, logObjectsLength: number, logFontColor: string): void => {

    console.log(logObjects);
    console.log(logObjectsLength);
    console.log(logFontColor);

    throw new Error('sorry this feature is broken');

    try {

        /*var winston = require('winston');

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

        }*/

    } catch (e) {

        // winston is not installed

    }

};

export { fileLog };
