import { getTimestamp } from './utilities/datetime';
import { isServer, isClient } from './utilities/platform';
import { getUrlParameters, getUrlParameterByName, replaceUrlParameter } from './utilities/url';
import { decodeUri, encodeUri } from './utilities/uri';
import { arrayRemove } from './utilities/array';
import { filterAlphaNumericPlus, capitaliseFirstLetter, stringContains, getSubstringIndex, replacePlaceholders } from './utilities/string';
import { generateUUID } from './utilities/uuid';
import { removeElements } from './utilities/html';
import { log } from './utilities/log';

const version = '1.0.0';

export {
    version,
    getTimestamp,
    isServer,
    isClient,
    getUrlParameters,
    getUrlParameterByName,
    replaceUrlParameter,
    decodeUri,
    encodeUri,
    arrayRemove,
    filterAlphaNumericPlus,
    capitaliseFirstLetter,
    stringContains,
    getSubstringIndex,
    replacePlaceholders,
    generateUUID,
    removeElements,
    log
};
