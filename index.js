var sleep = require('sleep');
var lodash = require('lodash');

module.exports = {
    all: function(promiseList, options) {

        let list = promiseList;

        let successlist = [];
        let rejectlist = [];

        return new Promise(function(resolve, reject) {

            for (let i = 0; i < list.length; i++) {
                list[i].then(function(resp) {
                    successlist[successlist.length] = resp;
                    if (successlist.length + rejectlist.length == list.length) {
                        resolve({ 'success': successlist, 'fail': rejectlist });
                    }

                }, function(resp) {
                    rejectlist[rejectlist.length] = resp;
                    if (successlist.length + rejectlist.length == list.length) {
                        resolve({ 'success': successlist, 'fail': rejectlist });
                    }
                });
            }

        });
    },
    firstFailure: function(promiseList, options) {

        let list = promiseList;

        let successlist = [];
        let rejectlist = [];
        return new Promise(function(resolve, reject) {

            for (let i = 0; i < list.length; i++) {
                list[i].then(function(resp) {
                    successlist[successlist.length] = resp;
                    if (successlist.length + rejectlist.length == list.length) {
                        reject({ 'success': successlist, 'fail': rejectlist });
                    }

                }, function(resp) {
                    resolve(resp);
                });
            }

        });
    },
    firstSuccess: function(promiseList, options) {
        let list = promiseList;

        let successlist = [];
        let rejectlist = [];
        return new Promise(function(resolve, reject) {

            for (let i = 0; i < list.length; i++) {
                list[i].then(function(resp) {
                    successlist[successlist.length] = resp;
                    resolve(resp);

                }, function(resp) {
                    rejectlist[rejectlist.length] = resp;
                    if (successlist.length + rejectlist.length == list.length) {
                        reject({ 'success': successlist, 'fail': rejectlist });
                    }
                });
            }

        });

    },
    retryUntilSuccess: function(arguments,promisify, options) {
        let maxretry = options.maxretry || 3;
        let interval = options.interval || 5;

        let count = 1;

        return new Promise(function(resolve, reject) {

            let kofn = function(resp) {
                if (maxretry > count) {
                    count ++ ;
                    sleep.sleep(interval);
                    let prom = promisify(arguments);
                    prom.then(function(resp) {
                        resolve(resp);
                    }, kofn);
                }
                else {
                    reject(options);
                }
            }

            let prom = promisify(arguments);
            prom.then(function(resp) {
                resolve(resp);
            }, kofn);
        });
    },
    sequenceAll: function(variables, promisify, options) {

        let list = lodash.clone(variables);


        let successlist = [];
        let rejectlist = [];

        return new Promise(function(resolve, reject) {

            let okfn = function(resp) {
                successlist.push(resp);
                if (successlist.length + rejectlist.length == list.length) {
                    resolve({ 'success': successlist, 'fail': rejectlist });
                } else {
                    if (variables.length > 0) {
                        let varItem = variables.splice(0, 1);
                        let prom = promisify(varItem[0]);
                        prom.then(okfn, kofn);
                    }
                }
            }

            let kofn = function(resp) {
                rejectlist.push(resp);
                if (successlist.length + rejectlist.length == list.length) {
                    resolve({ 'success': successlist, 'fail': rejectlist });
                } else {
                    if (variables.length > 0) {
                        let varItem = variables.splice(0, 1);
                        let prom = promisify(varItem[0]);
                        prom.then(okfn, kofn);
                    }
                }
            }

            let varItem = variables.splice(0, 1);
            let prom = promisify(varItem[0]);
            prom.then(okfn, kofn);
        });

    }
}
