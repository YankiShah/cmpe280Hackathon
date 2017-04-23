(function (routerApp) {
    "use strict"

    routerApp.directive('fieldMap', function () {
        return {
            templateUrl: 'src/components/fieldMap/fieldMap.html',
            controllerAs: "vm",
            scope: {
                "placeMarkerCallback": "=",
                "placePolygonCallback": "="
            },
            controller: function ($scope, $timeout, APIService, $sce, $mdToast, GeneralService) {
                var vm = this;
                vm.googleMapsUrl = "https://maps.googleapis.com/maps/api/js?key=" + GOOGLE_MAPS_KEY + "&libraries=visualization,drawing";
                vm.drawer = {
                    mode: null,
                    show: true
                }
                vm.customMarker = null;
                vm.drawingManager = null;

                vm.editableFruitNames = ['Apple', 'Banana', 'Orange'];

                vm.placeMarker = function () {
                    vm.showCreateHubForm = true;
                    if (vm.customMarker)
                        vm.customMarker.setMap(null);
                    vm.customMarker = new google.maps.Marker({
                        // draggable: true, position: e.latLng, map: scope.map,
                        draggable: true, position: $scope.map.center, map: $scope.map,
                        animation: google.maps.Animation.DROP
                    });

                    if ($scope.placeMarkerCallback) {
                        $scope.placeMarkerCallback();
                    }
                }

                vm.drawPolygon = function () {
                    vm.showCreateZoneForm = true;
                    console.log(vm.drawingManager);
                    vm.drawingManager.setDrawingMode(google.maps.drawing.OverlayType.POLYGON);
                    if ($scope.placePolygonCallback) {
                        $scope.placePolygonCallback();
                    }

                }

                vm.onMapOverlayCompleted = function (e) {
                    if (vm.customShape)
                        vm.customShape.setMap(null);
                    vm.customShape = e.overlay;
                    console.log(vm.customShape);
                    // var array = [];
                    // var paths = vm.customShape.getPath();
                    // console.log(paths);
                    // for (var i = 0; i < paths.length; i++) {
                    //     array.push([paths.getAt(i).lat(), paths.getAt(i).lng()]);
                    // }
                    // if (vm.customShape)
                    //     vm.customShape.setMap(null);
                    // scope.array = array;
                    // if (scope.callback)
                    //     scope.callback(array);
                };

                vm.createNewZone = function () {
                    if (!$scope.createZoneForm.$valid) {
                        GeneralService.showSimpleAlert('Please fill in all required fields!', '[name=createZoneForm]', 'top right')
                    } else {
                        var hasBadCoordinate = _.some(vm.addZoneCtrl.coordinates, function (e) {
                            return !GeneralService.testCoordinate(e);
                        })
                        if (hasBadCoordinate) {
                            GeneralService.showSimpleAlert('Please fix invalid coordinate', '[name=createZoneForm]', 'top right')
                        } else {

                        }
                        console.log(hasBadCoordinate);
                    }
                }

                vm.createNewHub = function () {
                    if (!$scope.createHubForm.$valid) {
                        GeneralService.showSimpleAlert('Please fill in all required fields!', '[name=createHubForm]', 'top right')
                    } else {
                    }
                }

                vm.reset = function () {
                    vm.showCreateZoneForm = false;
                    vm.showCreateHubForm = false;

                    vm.addZoneCtrl = {
                        coordinates: ["[1, 3]", "[2, 3]"],
                        addChip: function (chip, index) {
                            console.log(chip, index);
                        },
                        data: {}
                    }

                    vm.addHubCtrl = {
                        data: {}
                    }

                }

                $scope.$on('mapInitialized', function (event, map) {
                    $scope.map = map;

                    vm.drawingManager = new google.maps.drawing.DrawingManager({
                        drawingMode: null,//google.maps.drawing.OverlayType.MARKER,
                        drawingControl: false,
                        drawingControlOptions: {
                            // position: google.maps.ControlPosition.TOP_CENTER,
                            drawingModes: ['polygon']
                        },
                        polygonOptions: {fillColor: '#EF5350', strokeColor: '#EF5350', draggable: true}
                    });

                    console.log(vm.drawingManager);

                    vm.drawingManager.setMap(map);
                });

                $scope.$on('$stateChangeSuccess',
                    function (event, toState, toParams, fromState, fromParams, options) {
                        vm.reset();
                    });

                $timeout(function () {
                    vm.reset();
                });
            }
        };
    });
})(routerApp);