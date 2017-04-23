'use strict';

angular.module('routerApp')
    .controller('MapCtrl', function ($scope, $timeout, $rootScope, $mdSidenav, $log, $state, $document, $stateParams, $mdDialog, APIService, GeneralService) {
        var vm = this;
        $timeout(function () {
            var socket = io('http://localhost:3000');
            socket.on('connect', function () {
                console.log("connect");
            });

            socket.on('message', function (msg) {
                console.log('message: ' + msg);
            });

            socket.on('event', function (data) {
            });
            socket.on('disconnect', function () {
            });
        });
    });
