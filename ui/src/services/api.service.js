(function (routerApp) {
    "use strict"
    routerApp.service('APIService', function ($http, GeneralService) {
        var QUERIES = QUERY_LIST;
        var self = {};

        self.getZones = function () {
            return $http.get(QUERIES.ZONE.GET_ALL);
        }

        self.getHubs = function () {
            return $http.get(QUERIES.HUB.GET_ALL);
        }

        self.getReservoirs = function () {
            return $http.get(QUERIES.reservoir.GET_ALL);
        }

        return self;
    });
})(routerApp);