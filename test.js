var promisetools = require('./index.js');
require('axios-debug-log');
var axios = require('axios');



var zipcodes = [33025, 33178, 33123, 33078];

function TestUtils() {
    this.getPromise = function(name) {
        return axios.get("https://maps.googleapis.com/maps/api/geocode/json1?address=" + name);
    }
    this.getPromiseList = function() {
        let promlist = [];
        for (let i = 0; i < zipcodes.length; i++) {
            if (i <= 2) {
                promlist.push(this.getPromise(zipcodes[i]));
            } else {
                promlist.push(axios.get("https://maps.googleapis.com/maps/api/geocode/json1"));
            }

        }

        return promlist;
    }
}

test = new TestUtils();


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

//To seuqence all
//
// promisetools.seq(zipcodes,test.getPromise,{interval:2}).then(function(resp){
//     console.log(resp);
// }).catch(function(resp){
//     console.log(resp);
// });

//To seuqence all
//
promisetools.chain({ zipcode: '33025' }, [getPromise1, getPromise2, getPromise3]).then(function(resp) {
    console.log("RESOLVING");
}).catch(function(resp) {
    console.log(resp);
});

// retryUntilSuccess Example
//
// promisetools.retry("33025",test.getPromise,{}).then(function(resp){
//     console.log(resp);
// }).catch(function(resp){
//     console.log(resp);
// });
