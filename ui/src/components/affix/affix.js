(function (routerApp) {
    "use strict"

    routerApp.directive('affixer', function ($window, $rootScope, $timeout) {
        return {
            restrict: 'A',
            link: function ($scope, $element) {
                var win = angular.element($window);
                var topOffset = $element[0].offsetTop;
                console.debug(topOffset);

                function affixElement() {

                    // console.log($window.pageYOffset, topOffset);
                    // console.log($element);
                    if ($window.pageYOffset > topOffset) {
                        $element.css('position', 'fixed');
                        $element.css('top', '0px');
                    } else {
                        $element.css('position', '');
                        $element.css('top', '');
                    }
                }

                $rootScope.$on('$stateChangeStart',
                    function (event, toState, toParams, fromState, fromParams) {
                        win.unbind('scroll', affixElement);
                    });
                $timeout(function () {
                    topOffset = $element[0].offsetTop;
                    affixElement();
                    win.bind('scroll', affixElement);
                });
            }
        };
    })
})(routerApp);