type TReplaceList = {
    [key: string]: string
}

/**
 *
 * decode uri
 *
 */
const decodeUri = (inputString: string): string => {

    const plusRegularExpression = /\+/g;

    // replace addition symbol with a space
    return decodeURIComponent(inputString.replace(plusRegularExpression, ' '));

};

/**
 *
 * encode uri
 *
 */
const encodeUri = (inputString: string): string => {

    const findRegularExpression = /[!'()~]|%20|%00/g;
    const replaceList: TReplaceList = {
        '!': '%21',
        // tslint:disable-next-line
        "'": '%27',
        '(': '%28',
        ')': '%29',
        '~': '%7E',
        '%20': '+',
        '%00': '+'
    };

    return encodeURIComponent(inputString).replace(findRegularExpression, (match) => { return replaceList[match]; });

};

export { decodeUri, encodeUri };
