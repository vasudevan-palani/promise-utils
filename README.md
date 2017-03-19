## Synopsis

This project is aimed at providing utility functions in handling promises / array of promises.

## Code Example

```

// To sequence all the promises one after the another
//
//	- variables ( Array of variables , For each variable a promise will be created using promiseFn )
//	- promiseFn ( This function will involved to get an instance of promise )
//	- options ( List of options, interval : seconds to wait before retry )
//
promiseutils.sequenceAll(variables,promiseFn,options).then(function(resp){
    //Handle success
}).catch(function(resp){
    //Handle failure
});

// To retry a promise a number of times
//
//	- arguments ( The inputs required to create a promise )
//	- promiseFn ( This function will involved to get an instance of promise )
//	- options ( List of options, maxretry : number of retries, interval : seconds to wait before retry )
//
promiseutils.retryUntilSuccess(arguments,promiseFn,options).then(function(resp){
    //Handle success
}).catch(function(resp){
    //Handle failure
});

```

## Motivation

A short description of the motivation behind the creation and maintenance of the project. This should explain **why** the project exists.

## Installation

To include this source in your nodejs application

Step1 :
- npm install promise-utils

Step2 :

```
promiseutils = require('promise-utils');
```

## API Reference

Depending on the size of the project, if it is small and simple enough the reference docs can be added to the README. For medium size to larger projects it is important to at least provide a link to where the API reference docs live.

## Tests

Describe and show how to run the tests with code examples.

## Contributors

Let people know how they can dive into the project, include important links to things like issue trackers, irc, twitter accounts if applicable.

## License

A short snippet describing the license (MIT, Apache, etc.)