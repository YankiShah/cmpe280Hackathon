'use strict';

angular.module('routerApp')
    .controller('MainCtrl', function ($scope, $timeout, $rootScope, $mdSidenav, $log, $state, WSService, $stateParams, $mdDialog, APIService, GeneralService) {
        var vm = this;

        $scope.toggleLeft = buildDelayedToggler('left');
        $scope.toggleRight = buildToggler('right');
        $scope.isOpenLeft = function () {
            return $mdSidenav('left').isOpen();
        };
        $scope.isOpenRight = function () {
            return $mdSidenav('right').isOpen();
        };

        $scope.close = function () {
            // Component lookup should always be available since we are not using `ng-if`
            $mdSidenav('left').close()
                .then(function () {
                    $log.debug("close LEFT is done");
                });
        };

        /**
         * Supplies a function that will continue to operate until the
         * time is up.
         */
        function debounce(func, wait, context) {
            var timer;

            return function debounced() {
                var context = $scope,
                    args = Array.prototype.slice.call(arguments);
                $timeout.cancel(timer);
                timer = $timeout(function () {
                    timer = undefined;
                    func.apply(context, args);
                }, wait || 10);
            };
        }

        /**
         * Build handler to open/close a SideNav; when animation finishes
         * report completion in console
         */
        function buildDelayedToggler(navID) {
            return debounce(function () {
                // Component lookup should always be available since we are not using `ng-if`
                $mdSidenav(navID)
                    .toggle()
                    .then(function () {
                        $log.debug("toggle " + navID + " is done");
                    });
            }, 200);
        }

        function buildToggler(navID) {
            return function () {
                // Component lookup should always be available since we are not using `ng-if`
                $mdSidenav(navID)
                    .toggle()
                    .then(function () {
                        $log.debug("toggle " + navID + " is done");
                    });
            };
        }

        /*fn*/

        vm.addingHubOnMap = function () {
            console.log("adding hub");
        }

        vm.addingZoneOnMap = function () {
            console.log("adding zone");
        }

        function Zone(obj) {
            this.id = obj.id;
            this.name = obj.name;
            this.crop_name = obj.crop_name;
            this.polygon = obj.polygon;
        }

        function Hub(obj) {
            this.id = obj.id;
            this.lat = obj.lat;
            this.lng = obj.lng;
            this.mac_address = obj.mac_address;
            this.status_id = obj.status_id;
            this.status_name = obj.status_name;
        }

        // function loadZones() {
        //     $rootScope.zoneList = [];
        //     return APIService.getZones().success(function (rs) {
        //         console.log(rs);
        //         if (rs.status == 'ok') {
        //             var array = [];
        //             _.forEach(rs.zones, function (e) {
        //                 array.push(new Zone(e));
        //             });
        //             $rootScope.zoneList = array;
        //         }
        //     })
        // }
        //
        // function loadHubs() {
        //     $rootScope.hubList = [];
        //     return APIService.getHubs().success(function (rs) {
        //         console.log(rs);
        //         if (rs.status == 'ok') {
        //             var array = [];
        //             _.forEach(rs.hubs, function (e) {
        //                 array.push(new Hub(e));
        //             });
        //             $rootScope.hubList = array;
        //         }
        //     })
        // }

        $timeout(function () {
            // loadZones();
            // loadHubs();
            WSService.startWS();
        })
    });
