import { getTimestamp } from './utilities/datetime';
import { isServer, isClient } from './utilities/platform';
import { getUrlParameters, getUrlParameterByName, replaceUrlParameter } from './utilities/url';
import { decodeUri, encodeUri } from './utilities/uri';
import { remove, isArray, includes, find, flat } from './utilities/array';
import { filterAlphaNumericPlus, capitaliseFirstLetter, stringContains, getSubstringIndex, replacePlaceholders } from './utilities/string';
import { generateUUID } from './utilities/uuid';
import { removeElements } from './utilities/html';
import { log } from './utilities/log';
import { sleep } from './utilities/helpers';

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
    remove,
    isArray,
    includes,
    find,
    flat,
    filterAlphaNumericPlus,
    capitaliseFirstLetter,
    stringContains,
    getSubstringIndex,
    replacePlaceholders,
    generateUUID,
    removeElements,
    log,
    sleep
};
