chrisweb utilities.js 0.1.4
===========================

Javascript utilities belt for very specific tasks. Testing, fixes and comments are welcome.

main goal(s):
* console log wrapper for colored log messages
* utilities belt: javascript collection of useful functions that are useful for specific situations, so a lot more specific than underscore
* should work in the browser as well in nodejs

sub goal(s):
* create UMD build using grunt

# features

### utilities.log
Colored console log messages for the browser and or nodejs (iojs)
```
  utilities.log('foo', 'bar', 'fontColor:red', 'backgroundColor:blue');
```
<br>
**Suppported colors**

* red
* green
* yellow
* blue
* magenta
* cyan
* white
* black
<br><br>
**logging in floating html div (client)**
If you are on mobile device and wan't to show the messages in a floating div over the page then set logSpecial to true
```
utilities.logSpecial = true
```
<br>
**logging in a file (server)**
If want every message to logged in file, then enable logSpecial (currently only winston is supported)
```
utilities.logSpecial = true
```
<br>
**logging in a file (server) but not in the console**
```
utilities.logSpecial = true
utilities.logVerbose = false
```
### removeElements
extracts html elements (and their content) from strings
### generateUUID
returns a universally unique identifier
### filterAlphaNumericPlus
filters a string
<br>
removes everything that is a not an alpha or numeric character and also optionally the characters that got specified as second argument
### decodeUri
decode uri
### encodeUri
encode uri
### arrayRemove
remove an something at an unknown index from an array
### capitaliseFirstLetter
capitalise first letter of a string
### getUrlParameters
get url parameters
### stringContains
does a string contain another string
### getSubstringIndex
get the index of a substring in a string with optional nth time it occurs
### isServer
does the script run on the server
### isClient
does the script run in a client
### replace placholder
first parameter is a string and second parameter an object where the keys are the placeholder that need to get replaced and the value is the replacement (replacement can be a string or number)