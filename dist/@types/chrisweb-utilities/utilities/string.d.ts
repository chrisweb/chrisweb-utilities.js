/**
 *
 * filters a string
 * removes everything that is a not an alpha or numeric character, plus
 * the characters if any got specified as second argument
 *
 */
declare const filterAlphaNumericPlus: (inputString: string, specialCharacters: string) => string | boolean;
/**
 *
 * capitalise first letter of a string
 *
 */
declare const capitaliseFirstLetter: (inputString: string) => string;
/**
 *
 * does a string contain another string
 *
 */
declare const stringContains: (inputString: string, contains: string) => boolean;
/**
 *
 * get the index of a substring in a string with optional nth time it occurs
 *
 */
declare const getSubstringIndex: (inputString: string, substring: string, nthTime: number) => number;
/**
 *
 * replace the placeholder(s) with some value
 *
 */
declare const replacePlaceholders: (input: string, replacements: any) => string;
export { filterAlphaNumericPlus, capitaliseFirstLetter, stringContains, getSubstringIndex, replacePlaceholders };
