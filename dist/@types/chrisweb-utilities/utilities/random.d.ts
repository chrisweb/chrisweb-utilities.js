/**
 * returns a random integer that lies between min (included) and max (included)
 * @param min
 * @param max
 */
declare const randomInteger: (min?: number, max?: number) => number;
declare const choice: (sequence?: unknown[]) => unknown;
export { randomInteger, choice };
