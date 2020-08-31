/**
 * returns a random integer that lies between min (included) and max (included)
 * @param min
 * @param max
 */
declare const randomInteger: (min?: number, max?: number, prng?: typeof Math) => number;
declare const choice: (sequence?: unknown[], prng?: typeof Math) => unknown;
export { randomInteger, choice };
