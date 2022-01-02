/**
 * finds "removeMe" and removes it from the array
 * @param array 
 * @param removeMe 
 */
const removeString = (myArray: string[], removeMe: string): string[] => {

    const index = myArray.indexOf(removeMe);

    if (index > -1) {
        myArray.splice(index, 1);
    }

    return myArray;

};

/**
 * is array with polyfill for older browsers
 * @param input
 */
const isArray = (input: unknown): boolean => {

    // MDN is array documentation: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray

    if (!Array.isArray) {
        return Object.prototype.toString.call(input) === '[object Array]';
    } else {
        return Array.isArray(input);
    }

};

declare global  {
    // eslint-disable-next-line @typescript-eslint/naming-convention
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
const includes = (inputArray: [], toFind: string, fromIndex?: number): boolean => {

    // MDN includes documentation: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes

    if (!Array.prototype.includes) {

        // https://tc39.github.io/ecma262/#sec-array.prototype.includes

        if (this == null) {
            throw new TypeError('"this" is null or not defined');
        }

        // 1. Let O be ? ToObject(this value)
        const o = Object(this);

        // 2. Let len be ? ToLength(? Get(O, "length"))
        const len = o.length >>> 0;

        // 3. If len is 0, return false
        if (len === 0) {
            return false;
        }

        // 4. Let n be ? ToInteger(fromIndex)
        //    (If fromIndex is undefined, this step produces the value 0.)
        const n = fromIndex | 0;

        // 5. If n ≥ 0, then
        //  a. Let k be n.
        // 6. Else n < 0,
        //  a. Let k be len + n.
        //  b. If k < 0, let k be 0.
        let k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

        // 7. Repeat, while k < len
        while (k < len) {
            // a. Let elementK be the result of ? Get(O, ! ToString(k))
            // b. If SameValueZero(valueToFind, elementK) is true, return true
            if (sameValueZero(o[k], toFind)) {
                return true;
            }
            // c. Increase k by 1
            k++;
        }

        // 8. Return false
        return false;
    } else {
        const n = fromIndex | 0;
        return inputArray.includes(toFind, n);
    }
};

const sameValueZero = (x: unknown, y: unknown): boolean => {
    return x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y));
};

/**
 * 
 * @param inputArray 
 * @param predicate 
 * @param args 
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
const find = (inputArray: [], predicate: (this: void, value: never, index: number, obj: never[]) => value is never, args?: any): never | undefined => {

    // MDN find documentation: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find

    if (!Array.prototype.find) {

        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find

        // 1. Let O be ? ToObject(this value)
        if (this == null) {
            throw new TypeError('"this" is null or not defined');
        }

        const o = Object(this);

        // 2. Let len be ? ToLength(? Get(O, "length"))
        const len = o.length >>> 0;

        // 3. If IsCallable(predicate) is false, throw a TypeError exception
        if (typeof predicate !== 'function') {
            throw new TypeError('predicate must be a function');
        }

        // 4. If thisArg was supplied, let T be thisArg; else let T be undefined
        const thisArg = args[1];

        // 5. Let k be 0.
        let k = 0;

        // 6. Repeat, while k < len
        while (k < len) {
            // a. Let Pk be ! ToString(k)
            // b. Let kValue be ? Get(O, Pk)
            // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »))
            // d. If testResult is true, return kValue
            const kValue = o[k];
            if (predicate.call(thisArg, kValue, k, o)) {
                return kValue;
            }
            // e. Increase k by 1
            k++;
        }

        // 7. Return undefined
        return undefined;

    } else {
        // eslint-disable-next-line
        return inputArray.find(predicate, args);
    }
};

declare global  {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    interface Array<T> {
        flat(depth: number): [];
    }
}

/**
 * array flat polyfill, if depth is unknow set it to "Infinity"
 * @param inputArray 
 * @param depth 
 */
const flat = (inputArray: [], depth = Infinity): [] => {

    // MDN flat documentation: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat

    if (!Array.prototype.flat) {
        return flatten(inputArray, Math.floor(depth) || 1);
    } else {
        return inputArray.flat(depth);
    }

};

/**
 * flattens a multidimensional array
 * @param inputArray 
 * @param depth 
 */
const flatten = (inputArray: [], depth = Infinity): [] => {

    const flattend: [] = [];

    for (const el of inputArray) {
        if (isArray(el) && depth > 0) {
            flatten(el, depth - 1);
        } else {
            flattend.push(el);
        }
    }

    return flattend;

};

export { removeString, isArray, includes, find, flat };
