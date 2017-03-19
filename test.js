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
            if (i <=2) {
                promlist.push(this.getPromise(zipcodes[i]));
            } else {
                promlist.push(axios.get("https://maps.googleapis.com/maps/api/geocode/json1"));
            }

        }

        return promlist;
    }
}

test = new TestUtils();

promisetools.retryUntilSuccess(arguments,test.getPromise,{}).then(function(resp){
    console.log(resp);
}).catch(function(resp){
    console.log(resp);
});

