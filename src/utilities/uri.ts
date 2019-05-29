/**
 *
 * decode uri
 *
 */
const decodeUri = (inputString: string) => {

    const plusRegularExpression = /\+/g;

    // replace addition symbol with a space
    return decodeURIComponent(inputString.replace(plusRegularExpression, ' '));

}

/**
 *
 * encode uri
 *
 */
const encodeUri = (inputString: string) => {

    const findRegularExpression = /[!'\(\)~]|%20|%00/g;
    const replaceList: any = {
        '!': '%21',
        "'": '%27',
        '(': '%28',
        ')': '%29',
        '~': '%7E',
        '%20': '+',
        '%00': '\x00'
    };

    return encodeURIComponent(inputString).replace(findRegularExpression, replaceList);

}

export { decodeUri, encodeUri };
