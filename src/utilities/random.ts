/**
 * returns a random integer that lies between min (included) and max (included)
 * @param min 
 * @param max 
 */
const randomInteger = (min = 0, max = Infinity): number => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const choice = (sequence: unknown[] = []): unknown => {
    return sequence[Math.floor(Math.random() * sequence.length)];
}

export { randomInteger, choice }