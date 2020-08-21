/**
 * get url parameters
 * @param query
 */
declare const getUrlParameters: (query?: string) => {
    [s: string]: string;
};
/**
 * URL utility to get a parameter by name from an URL
 * @param name
 * @param url
 */
declare const getUrlParameterByName: (name: string, url: string) => string;
/**
 * URL utility to replace a given parameter
 * @param url
 * @param paramName
 * @param paramValue
 */
declare const replaceUrlParameter: (url: string, paramName: string, paramValue: string | number) => string;
export { getUrlParameters, getUrlParameterByName, replaceUrlParameter };
