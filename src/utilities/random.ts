/**
 * returns a random integer that lies between min (included) and max (included)
 * @param min 
 * @param max 
 */
const randomInteger = (min = 0, max = Infinity, prng?: typeof Math): number => {
    // support for custom PRNGs, like https://www.npmjs.com/package/seedrandom
    if (prng) {
        prng.floor(prng.random() * (max - min + 1) + min);
    } else {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}

const choice = (sequence: unknown[] = [], prng?: typeof Math): unknown => {
    // support for custom PRNGs, like https://www.npmjs.com/package/seedrandom
    if (prng) {
        return sequence[prng.floor(prng.random() * sequence.length)];
    } else {
        return sequence[Math.floor(Math.random() * sequence.length)];
    }
}

export { randomInteger, choice }