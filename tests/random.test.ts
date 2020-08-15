import { randomInteger } from '../src/utilities/random';

test('test if random number is greater or equal than 1 and less or equal than 5', () => {
    const randomIntegerResult = randomInteger(1,5);
    expect(randomIntegerResult).toBeGreaterThanOrEqual(1)
    expect(randomIntegerResult).toBeLessThanOrEqual(5);
});