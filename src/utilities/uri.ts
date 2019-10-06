/**
 *
 * decode uri
 *
 */
const decodeUri = (inputString: string): string => {

    const plusRegularExpression = /\+/g;

    // replace addition symbol with a space
    return decodeURIComponent(inputString.replace(plusRegularExpression, ' '));

}

/**
 *
 * encode uri
 *
 */
const encodeUri = (inputString: string): string => {

    const findRegularExpression = /[!'\(\)~]|%20|%00/g;
    const replaceList: any = {
        '!': '%21',
        "'": '%27',
        '(': '%28',
        ')': '%29',
        '~': '%7E',
        '%20': '+',
        '%00': '+'
    };

    return encodeURIComponent(inputString).replace(findRegularExpression, (match) => { return replaceList[match]; });

}

export { decodeUri, encodeUri };
