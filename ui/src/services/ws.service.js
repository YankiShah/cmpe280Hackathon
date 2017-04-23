(function (routerApp) {
    "use strict"
    routerApp.service('WSService', function ($http, $rootScope, $q, $mdToast, APIService) {

        var self = {};
        var list = {};

        self.add = function (key, obj, callback) {
            list[key] = {
                obj: obj,
                callback: callback
            }
        }

        self.startWS = function () {
            var socket = io('http://localhost:3000');
            socket.on('connect', function () {
                console.log("connect");
            });

            socket.on('message', function (msg) {
                // console.log('message: ' + msg);
                msg = JSON.parse(msg);
                if (Object.keys(list).length && typeof msg.key !== 'undefined') {
                    var found = list[msg.key];
                    if (typeof found !== 'undefined') {
                        found.callback(msg, found);
                    }
                }
            });

            socket.on('event', function (data) {
            });

            socket.on('disconnect', function () {
            });
        }

        return self;

    });
})(routerApp);