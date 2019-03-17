/**
 *
 * extracts html elements (and their content) from strings
 *
 */
const removeElements = (text: string, removeTextBetweenTags: boolean): string => {

    if (removeTextBetweenTags === false) {

        // replace single tags
        text = text.replace(/<[^>]*>?/g, '');

    } else {

        // replace all tags and whats inside
        text = text.replace(/<[^>]*>[^>]*<\/[^>]*>?/g, '');

        // replace single tags
        text = text.replace(/<[^>]*>?/g, '');

    }

    return text;

};

export { removeElements };
