[![Dependencies](https://david-dm.org/chrisweb/chrisweb-utilities.js/status.svg)](https://david-dm.org/chrisweb/chrisweb-utilities.js)
[![DevDependencies](https://david-dm.org/chrisweb/chrisweb-utilities.js/dev-status.svg)](https://david-dm.org/chrisweb/chrisweb-utilities.js)
[![GitHub release](https://img.shields.io/github/release/chrisweb/chrisweb-utilities.js.svg)](https://github.com/chrisweb/chrisweb-utilities.js/releases)
[![GitHub file size in bytes](https://img.shields.io/github/size/chrisweb/chrisweb-utilities.js/dist/index.esm.js.svg)](https://github.com/chrisweb/chrisweb-utilities.js)
[![Module formats](https://img.shields.io/badge/module%20formats-ESM%20+%20UMD-green.svg)](https://github.com/chrisweb/chrisweb-utilities.js/tree/master/dist)
[![GitHub license](https://img.shields.io/github/license/chrisweb/chrisweb-utilities.js.svg)](https://github.com/chrisweb/chrisweb-utilities.js/blob/master/LICENSE)
[![issues / PRs](https://img.shields.io/badge/issues%20/%20PRs-welcome-green.svg)](https://github.com/chrisweb/chrisweb-utilities.js/issues/new/choose)

# chrisweb utilities.js

Javascript utilities belt for very specific tasks.

main goal(s):
* console log wrapper for colored log messages
* utilities belt: javascript collection of useful functions that are useful for specific situations, so a lot more specific than underscore
* should work in the browser as well in nodejs

## usage

@TODO

## build

install the latest nodejs (if you haven't already) [nodejs](https://nodejs.org)  
update npm to latest version

`npm install npm@latest -g`

install the dependencies

`npm install`

to lint the typescript files

`npm run lint`

run the tests  

`npm run test`

to build the distributions (es6 module (esm.js) and the UMD version)

`npm run build`

or by using yarn  

`yarn build`

## development

in devlopment you can use watch to rebuild every time you edit a typescript file

`npm run watch`

you can also use watch for the test suite  

`npm run watch:test`

## contributing

Bug reports, tests, fixes, new features and all kind of comments / feedback are welcome 😃 [Submit a feature request or bug issue](https://github.com/chrisweb/chrisweb-utilities.js/issues/new/choose)

## testing setup notes

I used the [jest testing framework](https://jestjs.io/)

I added the jest typescript types and the [ts-jest package](https://github.com/kulshekhar/ts-jest)  

installed dependencies:  

`npm install --save-dev jest @types/jest ts-jest`

command to create a basic jest.config.js file:  

`npx ts-jest config:init	yarn ts-jest config:init`

If you use VSCode, consider using the [vscode jest extension](https://github.com/jest-community/vscode-jest)

Besides reading the official documentation, you can check out this quick [introduction to jest](https://flaviocopes.com/jest/)  blog post

## linting setup notes

	> we plan to deprecate TSLint and focus our efforts instead on improving ESLint’s TypeScript support  
    
Their [blog post](https://medium.com/palantir/tslint-in-2019-1a144c2317a9) announcing that [TSLint](https://github.com/palantir/tslint) will be deprecated in 2019 and you should switch to [ESLint](https://github.com/eslint/eslint) when TSLint is officially deprecated  

TSlint will be deprecated [github ticket](https://github.com/palantir/tslint/issues/4534)  

## features

### utilities.log
Colored console log messages for the browser and / or nodejs
```
  utilities.log('foo', 'bar', 'fontColor:red', 'backgroundColor:blue');
```

**Suppported colors**

* red
* green
* yellow
* blue
* magenta
* cyan
* white
* black

**logging in floating html div (client)**
If you are on mobile device and wan't to show the messages in a floating div over the page then set logSpecial to true
```
utilities.logSpecial = true
```

**logging in a file (server)**
If want every message to logged in file, then enable logSpecial (currently only winston is supported)
```
utilities.logSpecial = true
```

**logging in a file (server) but not in the console**
```
utilities.logSpecial = true
utilities.logVerbose = false
```
### removeElements
removes html elements from a sting (and their content) from strings
set second parameter "removeTextBetweenTags" to false to keep the text between the opening and closing html tag
### generateUUID
returns a universally unique identifier
### filterAlphaNumericPlus
filters a string
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
### replace placholder(s)
first parameter is a string and second parameter an object where the keys are the placeholder that need to get replaced and the value is the replacement (replacement can be a string or number)
### remove the content between two "markers"
