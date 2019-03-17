/**
 *
 * get url parameters
 *
 */
declare const getUrlParameters: (query?: string) => string[];
/**
 *
 * URL utility to get a parameter by name from an URL
 *
 */
declare const getUrlParameterByName: (name: string, url: string) => string;
/**
 *
 * URL utility to replace a given parameter
 *
 */
declare const replaceUrlParameter: (url: string, paramName: string, paramValue: string | number) => string;
export { getUrlParameters, getUrlParameterByName, replaceUrlParameter };
