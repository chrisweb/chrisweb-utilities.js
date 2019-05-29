/**
 *
 * array related functions
 *
 */
declare const remove: (array: string[], removeMe: string) => void;
declare const isArray: (input: any) => boolean;
declare global {
    interface Array<T> {
        includes(valueToFind: string, fromIndex?: number): boolean;
    }
}
declare const includes: (inputArray: [], valueToFind: string, fromIndex?: number) => boolean;
declare const find: (inputArray: [], predicate: any, args: any) => {};
declare global {
    interface Array<T> {
        flat(depth: number): [];
    }
}
/**
 *
 * array flat polyfill, if depth is unknow set it to "Infinity"
 *
 */
declare const flat: (inputArray: [], depth: any) => [];
export { remove, isArray, includes, find, flat };
