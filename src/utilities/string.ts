/**
 * filters a string
 * removes everything that is a not an alpha or numeric character, plus
 * the characters if any got specified as second argument
 * @param inputString 
 * @param specialCharacters 
 */
const filterAlphaNumericPlus = (inputString: string, specialCharacters?: string): string|boolean => {

    if (typeof (inputString) === 'string' && inputString.length > 0) {

        let outputString;

        if (specialCharacters !== undefined) {

            const regex = RegExp('[^a-z0-9' + specialCharacters + ']', 'gi');

            outputString = inputString.replace(regex, '');

        } else {
            outputString = inputString.replace(/[^a-z0-9]/gi, '');
        }

        return outputString;

    }

    return false;

};

/**
 * capitalise first letter of a string
 * @param inputString 
 */
const capitaliseFirstLetter = (inputString: string): string => {

    return inputString.charAt(0).toUpperCase() + inputString.slice(1);

};

/**
 * does a string contain another string
 * @param inputString 
 * @param contains 
 */
const stringContains = (inputString: string, contains: string): boolean => {

    if (typeof inputString !== 'string') {
        throw 'input is not a string';
    }

    if (inputString.indexOf(contains) > -1) {
        return true;
    } else {
        return false;
    }

};

/**
 * get the index of a substring in a string with optional nth time it occurs
 * @param inputString 
 * @param substring 
 * @param nthTime 
 */
const getSubstringIndex = (inputString: string, substring: string, nthTime: number): number => {

    let times = 0;
    let index = null;

    if (nthTime === 0) {
        nthTime = 1;
    }

    while (times < nthTime && index !== -1) {

        index = inputString.indexOf(substring, index + 1);
        times++;

    }

    return index;

};

/**
 * replace the placeholder(s) with some value
 * @param input 
 * @param replacements 
 */
const replacePlaceholders = (input: string, replacements: string): string => {

    let output = input;

    if (typeof input === 'string' && typeof replacements === 'object') {

        output = input.replace(/\b\w+?\b/g, function replacePlaceHolder(placeholder) {
            return Object.prototype.hasOwnProperty.call(replacements, placeholder) ? replacements[placeholder] : placeholder;
        });

    }

    return output;

};

/**
 * remove all spaces from a string
 * @param input
 */
const removeAllSpaces = (input: string): string => {
    return input.replace(/\s/g,'');
};

export { filterAlphaNumericPlus, capitaliseFirstLetter, stringContains, getSubstringIndex, replacePlaceholders, removeAllSpaces };
