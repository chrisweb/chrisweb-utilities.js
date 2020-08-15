/**
 * pauses your script for a given time, returns a promise that you can use to do so
 * @param ms 
 */
const sleep = (ms: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export { sleep };