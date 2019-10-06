/**
 *
 * does the script run on the server
 *
 */
const isServer = (): boolean => {

    if (typeof (global) === 'object') {
        return true;
    } else {
        return false;
    }

    };

    /**
     *
     * does the script run in a client
     *
     */
    const isClient = (): boolean => {

        return !isServer();

    };

export { isServer, isClient };
