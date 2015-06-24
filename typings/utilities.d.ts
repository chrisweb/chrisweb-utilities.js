// Type definitions for es6-promise
// Project: https://github.com/chrisweb/chrisweb-utilities.js
// Definitions by: Chris Weber <https://chris.lu>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

declare module utilities {

    var version: number;
    var logFontColor: string;
    var logBackgroundColor: string;
    var logSpecial: boolean;
    var logVerbose: boolean;

    /**
     * create a div an insert the messages in div
     * can be usefull on mobile if no other console is available
     */
    function htmlLog(logObjects: string[], logObjectsLength: number, logFontColor: string, logBackgroundColor: string): void;

    /**
     * nodejs logging to file
     */
    function fileLog(logObjects: string[], logObjectsLength: number, logFontColor: string): void;

    /**
     * log messages
     */
    function log(...args:Array<any>): void;

    /**
     * get the client side (browser) colors
     */
    function getClientColors(logFontColor: string, logBackgroundColor: string): Object;

    /**
     * get the colors for the backend (server) console
     */
    function getServerColors(logFontColor: string, logBackgroundColor: string): Object;

    /**
     * extract the color infos from the arguments to log
     */
    function handleLogArguments(logArguments: string): Object;

    /**
     * returns the timestamp of right now for browser that dont support
     * es5 Date.now
     */
    function getTimestamp(): number;

    /**
     * extracts html elements (and their content) from strings
     */
    function removeElements(text: string, removeTextBetweenTags: boolean): string;

    /**
     * returns a universally unique identifier
     */
    function generateUUID(): number;

    /**
     * removes everything that is a not an alpha or numeric character, plus
     * the characters if any got specified as second argument
     */
    function filterAlphaNumericPlus(inputString: string, specialCharacters: string): string | boolean;

    /**
     * decode uri
     */
    function decodeUri(uri: string): string;

    /**
     * encode uri
     */
    function encodeUri(uri: string): string;

    /**
     * find and remove an array entry
     */
    function arrayRemove(array: Array<any>, removeMe: any): Array<any>;

    /**
     * capitalise first letter of a string
     */
    function capitaliseFirstLetter(string: string): string;

    /**
     * get url parameters
     */
    function getUrlParameters(query: string): Object;

    /**
     * does a string contain another string
     */
    function stringContains(string: string, contains: string): boolean;

    /**
     * get the index of a substring in a string with optional nth time it occurs
     */
    function getSubstringIndex(string: string, substring: string, nthTime: number): number;

    /**
     * does the script run on the server
     */
    function isServer(): boolean;

    /**
     * does the script run in a client
     */
    function isClient(): boolean;

}

declare module 'chrisweb.utilities' {
    export = utilities;
}
