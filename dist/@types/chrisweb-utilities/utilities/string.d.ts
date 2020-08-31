/**
 * filters a string
 * removes everything that is a not an alpha or numeric character, plus
 * the characters if any got specified as second argument
 * @param inputString
 * @param specialCharacters
 */
declare const filterAlphaNumericPlus: (inputString: string, specialCharacters?: string) => string | boolean;
/**
 * capitalise first letter of a string
 * @param inputString
 */
declare const capitaliseFirstLetter: (inputString: string) => string;
/**
 * does a string contain another string
 * @param inputString
 * @param contains
 */
declare const stringContains: (inputString: string, contains: string) => boolean;
/**
 * get the index of a substring in a string with optional nth time it occurs
 * @param inputString
 * @param substring
 * @param nthTime
 */
declare const getSubstringIndex: (inputString: string, substring: string, nthTime: number) => number;
/**
 * replace the placeholder(s) with some value
 * @param input
 * @param replacements
 */
declare const replacePlaceholders: (input: string, replacements: string) => string;
/**
 * remove all spaces from a string
 * @param input
 */
declare const removeAllSpaces: (input: string) => string;
export { filterAlphaNumericPlus, capitaliseFirstLetter, stringContains, getSubstringIndex, replacePlaceholders, removeAllSpaces };
