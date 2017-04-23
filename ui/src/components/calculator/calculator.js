(function (routerApp) {
    "use strict"

    routerApp.directive('calculatorComp', function () {
        return {
            templateUrl: 'src/components/calculator/calculator.html',
            replace: true,
            scope: {
                "ok": "=",
                "price": "="
            },
            controllerAs: 'vmCalculator',
            controller: vmCalculator
        };
    });

    routerApp.directive('calculatorCompNo', function () {
        return {
            templateUrl: 'src/components/calculator/calculatorNo.html',
            replace: true,
            scope: {
                "ok": "=",
                "price": "=",
                "text": "=",
                "cancel": "="
            },
            controllerAs: 'vmCalculator',
            controller: vmCalculator,
        };
    });

    var vmCalculator = function ($scope, $timeout, APIService, $rootScope) {
        var vm = this;
        $scope.$watch(function () {
            return $scope.price;
        }, function (newV, oldV) {
            if (typeof newV != 'undefined') {
                vm.result = newV;
            }
        });

        $scope.$watch(function () {
            return $scope.text;
        }, function (newV, oldV) {
            if (typeof newV != 'undefined') {
                vm.equation = newV;
            }
        });

        vm.equation = "";
        vm.result = 0;
        vm.clear = function () {
            vm.equation = "";
            calculateResult();
            if ($scope.cancel) {
                $scope.cancel();
            }
        };
        vm.addNumber = function (n) {
            if (n == '=') {

            } else {
                if (!isNaN(parseFloat(n)) && isFinite(n) || n == ".") {
                    vm.equation += n;
                } else {
                    vm.equation += " " + n + " ";
                }

            }
            calculateResult();

        }

        vm.removeBackNumber = function () {
            while (vm.equation.substr(vm.equation.length - 1) == " ") {
                vm.equation = vm.equation.slice(0, -1);
            }
            vm.equation = vm.equation.slice(0, -1);
            calculateResult();
            event.preventDefault();
        }

        vm.ok = function () {
            if ($scope.ok) {
                $scope.ok(vm.result);
            }
            vm.clear();
            event.preventDefault();
        }

        function calculateResult() {
            var tmp = vm.equation;
            while (tmp.substr(tmp.length - 1) == " " || ['+', '-'].indexOf(tmp.substr(tmp.length - 1)) > -1) {
                tmp = tmp.slice(0, -1);
            }
            if (tmp.length) {
                vm.result = Math.round(math.eval(tmp) * 100) / 100;
            } else {
                vm.result = 0;
            }
            if (typeof $scope.text !== 'undefined') {
                $scope.text = vm.equation;
            }
        }

    };
})(routerApp);