/**
 * finds "removeMe" and removes it from the array
 * @param array
 * @param removeMe
 */
declare const removeString: (myArray: string[], removeMe: string) => string[];
/**
 * is array with polyfill for older browsers
 * @param input
 */
declare const isArray: (input: unknown) => boolean;
declare global {
    interface Array<T> {
        includes(valueToFind: string, fromIndex?: number): boolean;
    }
}
/**
 * finds "toFind" in an array, starting at an optional index
 * @param inputArray
 * @param toFind
 * @param fromIndex
 */
declare const includes: (inputArray: [], toFind: string, fromIndex?: number) => boolean;
/**
 *
 * @param inputArray
 * @param predicate
 * @param args
 */
declare const find: (inputArray: [], predicate: (this: void, value: never, index: number, obj: never[]) => value is never, args?: any) => never | undefined;
declare global {
    interface Array<T> {
        flat(depth: number): [];
    }
}
/**
 * array flat polyfill, if depth is unknow set it to "Infinity"
 * @param inputArray
 * @param depth
 */
declare const flat: (inputArray: [], depth?: number) => [];
export { removeString, isArray, includes, find, flat };
