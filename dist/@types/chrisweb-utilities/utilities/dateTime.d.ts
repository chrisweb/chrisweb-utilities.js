/**
 * returns the timestamp for any date or for now(), also works with browsers that dont support es5 Date.now
 */
declare const getTimestamp: (dateString?: string | number) => number;
export { getTimestamp };
