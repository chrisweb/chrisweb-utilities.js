import { decodeUri } from './uri';

/**
 *
 * get url parameters
 *
 */
const getUrlParameters = (query: string = ''): string[] => {

    if (query === '') {

        if (window !== undefined) {
            query = window.location.search.substring(1);
        } else {
            throw 'you must provide a query to parse';
        }

    }

    const search = /([^&=]+)=?([^&]*)/g;
    const urlParams: any = {};
    const parameters = search.exec(query);
    let i;

    for (i = 0; i <= parameters.length; i++) {

        const parameter = parameters[i];

        urlParams[parameter[1]] = decodeUri(parameter[2]);

    }

    return urlParams;

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

    return decodeURIComponent(results[2].replace(/\+/g, ' '));

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
