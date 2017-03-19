var promisetools = require('./index.js');
var axios = require('axios');


var zipcodes = [33025, 33178, 33123, 33078];

function TestUtils() {
    this.getPromise = function(name) {
        return axios.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + name);
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

var test = new TestUtils();


var promiseList = test.getPromiseList();

promisetools.firstSuccess(promiseList).then(function(resp) {
    console.log(resp);
});
