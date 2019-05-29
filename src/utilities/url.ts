import { decodeUri, encodeUri } from './uri';

/**
 *
 * get url parameters
 *
 */
const getUrlParameters = (query: string = ''): { [s: string]: string; } => {

    const urlParameters: { [s: string]: string; } = {};

    if (query !== '' && typeof query === 'string') {

        const questionmarkIndex = query.indexOf('?');

        // if -1 there is no questionmark, skip, all is fine
        // else just keep what comes after the questionmark
        if (questionmarkIndex !== -1) {
            query = query.slice(questionmarkIndex+1);
        }

        const pairs: string[] = query.split('&');
        let i;

        for (i = 0; i < pairs.length; i++) {

            const pair: string = pairs[i];
            const equalIndex: number = pair.indexOf('=');
            let parameterKey: string = '';
            let parameterValue: string = '';

            if (equalIndex > -1) {
                parameterKey = pair.slice(0, equalIndex);
                parameterValue = pair.slice(equalIndex+1);
            } else {
                parameterKey = pair;
            }

            urlParameters[decodeUri(parameterKey)] = decodeUri(parameterValue);
        }

    }

    return urlParameters;

};

/**
 *
 * URL utility to get a parameter by name from an URL
 *
 */
const getUrlParameterByName = (name: string, url: string): string => {

    if (!url) {
        url = window.location.href;
    }

    name = name.replace(/[\[\]]/g, '\\$&');

    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
    const results = regex.exec(url);

    if (!results) {
        return null;
    }

    if (!results[2]) {
        return '';
    }

    return decodeUri(results[2]);

};


/**
 *
 * URL utility to replace a given parameter
 *
 */
const replaceUrlParameter = (url: string, paramName: string, paramValue: string|number): string => {

    const pattern = new RegExp('\\b(' + paramName + '=).*?(&|$)');

    if (url.search(pattern) >= 0) {
        return url.replace(pattern, '$1' + paramValue + '$2');
    }

    return url + (url.indexOf('?') > 0 ? '&' : '?') + paramName + '=' + paramValue;

};

export { getUrlParameters, getUrlParameterByName, replaceUrlParameter };
