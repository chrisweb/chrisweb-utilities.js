/**
 * html log
 * create a div an insert the messages in div
 * can be usefull on mobile if no other console is available
 * @param logObjects
 * @param logObjectsLength
 * @param logFontColor
 * @param logBackgroundColor
 */
declare const htmlLog: (logObjects: string[], logObjectsLength: number, logFontColor: string, logBackgroundColor: string) => void;
/**
 * extracts html elements (and their content) from strings
 * @param rawText
 * @param extendedEscape
 * @param myEscapeList
 */
declare const safeUnescape: (rawText: string, extendedEscape: boolean, myEscapeList: string[]) => string;
export { htmlLog, safeUnescape };
