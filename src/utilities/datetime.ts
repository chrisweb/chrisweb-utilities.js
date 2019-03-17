/**
 * returns the timestamp for any date or for now(), also works with browsers that dont support es5 Date.now
 */
export function getTimestamp(dateString: string|number = ''): number {

    let timestamp: number;

    if (dateString === '') {
        timestamp = new Date().getTime();
    } else {
        let date = new Date(dateString);
        timestamp = date.getTime();
    }

    return timestamp;

}