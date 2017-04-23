(function (routerApp) {
    "use strict"

    routerApp.directive('userCard', function () {
        return {
            templateUrl: 'src/components/card/usercard.html',
            restrict: 'E',
            replace: true,
            scope: {
                name: '@',
                theme: '@'
            },
            controller: function ($scope) {
                $scope.theme = $scope.theme || 'default';
            }
        };
    });

})(routerApp);