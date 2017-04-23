var routerApp = angular.module('routerApp', ['ngMessages', 'ui.router', 'ngMaterial', 'angular-loading-bar', 'ngAnimate', 'md.data.table', 'ngMap']);

routerApp.config(function ($stateProvider, $locationProvider, $urlRouterProvider, cfpLoadingBarProvider, $mdThemingProvider) {
    cfpLoadingBarProvider.includeSpinner = false;

    $urlRouterProvider.otherwise('/');
    $urlRouterProvider.when('/', '/map');

    $stateProvider
        .state('main', {
            url: '',
            abstract: true,
            templateUrl: 'src/routes/main/main.html',
            controllerAs: 'vm',
            controller: 'MainCtrl',
        })
        .state('main.home', {
            url: '/home',
            templateUrl: 'src/routes/home/home.html',
            controllerAs: 'vm',
            controller: 'HomeCtrl',
        })
        .state('main.map', {
            url: '/map',
            templateUrl: 'src/routes/map/map.html',
            controllerAs: 'vm',
            controller: 'MapCtrl',
        })
        .state('main.chart', {
            url: '/chart',
            templateUrl: 'src/routes/chart/chart.html',
            controllerAs: 'vm',
            controller: 'ChartCtrl',
        })
        .state('main.team', {
            url: '/team',
            templateUrl: 'src/routes/team/team.html',
        })
    ;


    /*color*/

    $mdThemingProvider.theme('forest')
        .primaryPalette('brown')
        .accentPalette('green');

}).run(function ($rootScope) {
    $rootScope.$on('$stateChangeSuccess',
        function (event, toState, toParams, fromState, fromParams, options) {
            // console.log(toState);
        });

    $rootScope.$on('$stateChangeStart',
        function (event, toState, toParams, fromState, fromParams, options) {
            // console.log(toState);
        })

});
