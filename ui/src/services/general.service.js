(function (routerApp) {
    "use strict"
    routerApp.service('GeneralService', function ($http, $rootScope, $q, $mdToast) {

        var self = {};

        function escapeRegExp(str) {
            return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
        };

        self.replaceAll = function (str, find, replace) {
            return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
        };

        self.replaceParams = function (str, params) {
            for (var i = 0; i < params.length; i++) {
                str = self.replaceAll(str, '{' + i + '}', params[i]);
            }
            return str;
        };

        self.getDateRangeOfCurrentMonth = function () {
            var date = new Date(), y = date.getFullYear(), m = date.getMonth();
            return {
                start: new Date(y, m, 1),
                end: new Date(y, m + 1, 0)
            };
        };

        self.getDateRangeOfCurrentYear = function () {
            var date = new Date(), y = date.getFullYear();
            return {
                start: new Date(y, 0, 1),
                end: new Date(y, 12, 0)
            };
        };

        self.getDateRangeOfCurrentWeek = function () {
            return {
                start: moment().day(1).toDate(),
                end: moment().day(7).toDate()
            };
        };

        self.getDateRangeOfYesterday = function () {
            var d = moment().add(-1, 'days').toDate();
            var start = new Date(d);
            start.setHours(0, 0, 0, 0);

            var end = new Date(d);
            end.setHours(23, 59, 59, 999);
            return {
                start: start,
                end: end
            };
        };

        self.getDateRangeOfToday = function () {
            var start = new Date();
            start.setHours(0, 0, 0, 0);

            var end = new Date();
            end.setHours(23, 59, 59, 999);
            return {
                start: start,
                end: end
            };
        };

        self.showSimpleAlert = function (text, parent, position) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent(text)
                    .position(position)
                    .parent(parent)
                    .hideDelay(3000)
            );
        }

        function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
            var R = 6371; // Radius of the earth in km
            var dLat = deg2rad(lat2 - lat1);  // deg2rad below
            var dLon = deg2rad(lon2 - lon1);
            var a =
                    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
                    Math.sin(dLon / 2) * Math.sin(dLon / 2)
                ;
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            var d = R * c; // Distance in km
            return d;
        }

        function deg2rad(deg) {
            return deg * (Math.PI / 180)
        }

        self.checkStoreGeo = function (lat, lng) {
            function getLocation($resolve) {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function (position) {
                        return showPosition(position, $resolve);
                    }, function (error) {
                        return showError(error, $resolve);
                    });
                } else {
                    alert("Geolocation is not supported by this browser.");
                }
            }

            function showPosition(position, $resolve) {
                var d = getDistanceFromLatLonInKm(position.coords.latitude, position.coords.longitude, lat, lng);
                console.log("distance is " + d);
                if (d <= MAX_RANGE_GEO) {
                    $resolve({
                        status: true
                    });
                } else {
                    $resolve({
                        status: false,
                        message: "Your location is too far from the store"
                    });
                }
            }

            function showError(error, $resolve) {
                var errorMessage = "";
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage = "User denied the request for Geolocation."
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMessage = "Location information is unavailable."
                        break;
                    case error.TIMEOUT:
                        errorMessage = "The request to get user location timed out."
                        break;
                    case error.UNKNOWN_ERROR:
                        errorMessage = "An unknown error occurred."
                        break;
                }
                console.log(errorMessage);
                $resolve({
                    status: false,
                    message: errorMessage
                })
            }

            return $q(function (resolve) {
                getLocation(resolve);
            });

        }

        self.testCoordinate = function (str) {
            return /^\[(\-?\d+(\.\d+)?),\s*(\-?\d+(\.\d+)?)\]$/.test(str);
        }


        return self;
    });
})(routerApp);