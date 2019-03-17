/**
 *
 * array related functions
 *
 */
const arrayRemove = (array: string[], removeMe: string): void => {

    const index = array.indexOf(removeMe);

    if (index > -1) {
        array.splice(index, 1);
    }

};

export { arrayRemove };
