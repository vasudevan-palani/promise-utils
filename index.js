var sleep = require('sleep');

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
    returnFirstFailure: function(promiseList, options) {

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
    returnFirstSuccess: function(promiseList, options) {
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
    retryUntilSuccess: function(promise, options) {

    }
}
