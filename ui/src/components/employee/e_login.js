(function (routerApp) {
    "use strict"

    routerApp.directive('eLogin', function () {
        return {
            templateUrl: 'src/components/employee/e_login.html',
            replace: true,
            controllerAs: "vmELogin",
            controller: function ($scope, $timeout, APIService, $sce, $mdToast) {
                var vm = this;
                vm.$sce = $sce;
                vm.ACTIONS = {
                    changePassword: {
                        text: "Change Password"
                    },
                    checkIn: {
                        text: "Check Work-In"
                    },
                    checkOut: {
                        text: "Check Work-Out"
                    }
                };

                vm.ok = function () {
                    // console.log(vm.selectedUser);
                    // console.log(vm.password);
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
                        loadWorkInOut();
                    }

                    switch (vm.message) {
                        case vm.ACTIONS.checkIn.text:
                            APIService.accountWorkIn(vm.selectedUser.username, vm.password).then(handleMessage, handleMessage).then(function () {
                                vm.password = "";
                            });
                            break;
                        case vm.ACTIONS.checkOut.text:
                            APIService.accountWorkOut(vm.selectedUser.username, vm.password).then(handleMessage, handleMessage).then(function () {
                                vm.password = "";
                            });
                            break;
                    }
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

                vm.in = function () {
                    vm.message = vm.ACTIONS.checkIn.text;
                }

                vm.out = function () {
                    vm.message = vm.ACTIONS.checkOut.text;
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
                    return vm.selectedUser;
                }, function (newV, oldV) {
                    if (typeof newV !== 'undefined') {
                        loadWorkInOut();
                    }
                });

                $scope.$watch(function () {
                    return vm.password;
                }, function (newV, oldV) {
                    console.log(newV);
                });

                function loadWorkInOut() {
                    APIService.getLastAccountWorkIn(vm.selectedUser.id).success(function (rs) {
                        if (rs.inout.length) {
                            vm.lastWorkIn = rs.inout[0];
                        }
                    });
                    APIService.getLastAccountWorkOut(vm.selectedUser.id).success(function (rs) {
                        if (rs.inout.length) {
                            vm.lastWorkOut = rs.inout[0];
                        }
                    });
                }

                function reset() {
                    vm.password = "";
                    // vm.showActionsPanel = false;
                    vm.message = "";
                    vm.messageAction = "";
                }

                function getUsers() {
                    APIService.getAllUsers().success(function (rs) {
                        console.log(rs);
                        if (rs.status == "ok") {
                            // var array = _.map(rs.users, function (o) {
                            //     return _.pick(o, 'first_name', 'last_name', 'username', 'role_name', 'avatar');
                            // });
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