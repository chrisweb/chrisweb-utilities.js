/**
 *
 * decode uri
 *
 */
const decodeUri = (uri: string): string => {

    // replace addition symbol with a space
    const additionToSpace = '/\+/g';

    return decodeURIComponent(uri.replace(additionToSpace, ' '));

};

/**
 *
 * encode uri
 *
 */
const encodeUri = (uri: string): string => {

    return encodeURIComponent(uri);

};

export { decodeUri, encodeUri };
