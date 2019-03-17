/**
 *
 * does the script run on the server
 *
 */
declare const isServer: () => boolean;
/**
 *
 * does the script run in a client
 *
 */
declare const isClient: () => boolean;
export { isServer, isClient };
