## Synopsis

This project is aimed at providing utility functions in handling promises / array of promises.

## Code Example

In the below example, we can see a way to chain multiple promises.  The promise chain behaves as follows

1. Trigger the first promise with the input arguments.
2. Output of first promise is merged with initial set of arguments
3. Output of Step2, is given as input to second promise
4. Output of second promoise is merged with initial set of arguments + output of first promise
5. ...

With the above method, we can effective solve simple workflows.

```

// To chain a bunch of promises see below example.
//
let getPromise1 = function(props) {
    return new Promise(function(resolve, reject) {
        axios.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + props.zipcode).then(function() {
            resolve({ zipcode: '33178' });

        }, function(resp) {
            reject(resp);
        });;
    });
}
let getPromise2 = function(props) {
    return new Promise(function(resolve, reject) {
        axios.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + props.zipcode).then(function() {
            resolve({ zipcode: '97658' });

        }, function(resp) {
            reject(resp);
        });;
    });
}
let getPromise3 = function(props) {
    return new Promise(function(resolve, reject) {
        axios.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + props.zipcode).then(function() {
            resolve({ zipcode: '02345' });

        }, function(resp) {
            reject(resp);
        });;
    });
}


promiseutils.chain({ zipcode: '33025' }, [getPromise1, getPromise2, getPromise3]).then(function(resp) {
    console.log("RESOLVING");
}).catch(function(resp) {
    console.log(resp);
});

```

The below way is the standard behaviour of an array of promises with a race
```

// To race to first successfuly promise
//
//	- promises ( list of all promises )
//	- options ( List of options for future use )
//	returns the response of the first successful promise
//
promiseutils.race(promises,options).then(function(resp){
    //Handle success
}).catch(function(resp){
    //Handle failure
});

// To race to first failed promise
//
//	- promises ( list of all promises )
//	- options ( List of options - for future use )
//	returns the response of the first failed promise
//
promiseutils.raceToFail(promises,options).then(function(resp){
    //Handle success
}).catch(function(resp){
    //Handle failure
});

```

Below is a way where we can sequence a list of promises to be executed one after another.

```

// To sequence all the promises one after the another
//
//	- variables ( Array of variables , For each variable a promise will be created using promiseFn )
//	- promiseFn ( This function will involved to get an instance of promise )
//	- options ( List of options, interval : seconds to wait before retry )
//	returns an array of all responses
//
promiseutils.seq(variables,promiseFn,options).then(function(resp){
    //Handle success
}).catch(function(resp){
    //Handle failure
});

// To retry a promise a number of times
//
//	- arguments ( The inputs required to create a promise )
//	- promiseFn ( This function will involved to get an instance of promise )
//	- options ( List of options, maxretry : number of retries, interval : seconds to wait before retry )
//	returns the response of the successfull try
//
promiseutils.retry(arguments,promiseFn,options).then(function(resp){
    //Handle success
}).catch(function(resp){
    //Handle failure
});

```

## Installation

To include this source in your nodejs application

Step1 :
```
npm install promiseutils
```

Step2 :

```
promiseutils = require('promiseutils');
```

## License

MIT License.
