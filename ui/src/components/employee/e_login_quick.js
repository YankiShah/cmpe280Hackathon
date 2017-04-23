(function (routerApp) {
    "use strict"

    routerApp.directive('eLoginQuick', function () {
        return {
            templateUrl: 'src/components/employee/e_login_quick.html',
            replace: true,
            scope: {
                callback: "="
            },
            controllerAs: "vmELogin",
            controller: function ($scope, $rootScope, $timeout, APIService, $sce, $mdToast) {
                var vm = this;
                vm.$sce = $sce;

                vm.ok = function () {
                    function handleMessage(rs) {
                        console.log(rs);
                        if (rs.data.status === "ok") {
                            $mdToast.show(
                                $mdToast.simple()
                                    .textContent("Successful")
                                    .action('Close')
                                    .highlightAction(true)
                                    .hideDelay(10000)
                                    .highlightClass('md-green')// Accent is used by default, this just demonstrates the usage.
                                    .position("top right")
                                    .parent(".e-login-wrapper")
                            );

                            if ($scope.callback) {
                                $scope.callback(rs.data.user)
                            }
                        }

                        if (rs.data.status === "error") {
                            $mdToast.show(
                                $mdToast.simple()
                                    .textContent(rs.data.message)
                                    .action('Close')
                                    .highlightAction(true)
                                    .hideDelay(10000)
                                    .highlightClass('md-blue')// Accent is used by default, this just demonstrates the usage.
                                    .position("top right")
                                    .parent(".e-login-wrapper")
                            );

                        }
                    }

                    APIService.accountLoginById(vm.selectedUser.id, vm.password).then(handleMessage, handleMessage).then(function () {
                        vm.password = "";
                    });
                }

                vm.convertPassword = function (p) {
                    if (typeof p !== 'undefined')
                        return Array(p.length + 1).join("&#9733;");
                    return "";
                };

                vm.select = function (u) {
                    console.log(u);
                    vm.selectedUser = u;
                    vm.showActionsPanel = true;
                }

                vm.clearAction = function () {
                    console.log("clear");
                    reset();
                }

                vm.back = function () {
                    vm.showActionsPanel = false;
                    vm.selectedUser = {};
                    reset();
                }

                /*watch*/


                $scope.$watch(function () {
                    return vm.password;
                }, function (newV, oldV) {
                    console.log(newV);
                });

                function reset() {
                    vm.password = "";
                }

                function getUsers() {
                    APIService.getAllUsers().success(function (rs) {
                        console.log(rs);
                        if (rs.status == "ok") {
                            vm.users = _.filter(rs.users, function (e) {
                                return e.role_name === "EMPLOYEE";
                            });
                            console.log(vm.users);
                        }
                    })
                }

                $timeout(function () {
                    getUsers();
                    reset();
                });
            }
        };
    });
})(routerApp);