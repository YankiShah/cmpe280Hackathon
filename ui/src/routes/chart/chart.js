'use strict';

angular.module('routerApp')
    .controller('ChartCtrl', function ($scope, $timeout, $rootScope, $mdSidenav, $log, $state, $document, $stateParams, $mdDialog, APIService, GeneralService) {
        var vm = this;

        Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });

// Create the chart
//         var chart = Highcharts.stockChart('container', {
//             chart: {
//                 height: 400,
//                 events: {
//                     load: function () {
//
//                         // set up the updating of the chart each second
//                         var series = this.series[0];
//                         setInterval(function () {
//                             var x = (new Date()).getTime(), // current time
//                                 y = Math.round(Math.random() * 100);
//                             series.addPoint([x, y], true, true);
//                         }, 1000);
//                     }
//                 }
//             },
//
//             rangeSelector: {
//                 buttons: [{
//                     count: 1,
//                     type: 'minute',
//                     text: '1M'
//                 }, {
//                     count: 5,
//                     type: 'minute',
//                     text: '5M'
//                 }, {
//                     type: 'all',
//                     text: 'All'
//                 }],
//                 inputEnabled: false,
//                 selected: 0
//             },
//
//             title: {
//                 text: 'Live random data'
//             },
//
//             exporting: {
//                 enabled: false
//             },
//
//             series: [{
//                 name: 'Random data',
//                 data: (function () {
//                     // generate an array of random data
//                     var data = [],
//                         time = (new Date()).getTime(),
//                         i;
//
//                     for (i = -999; i <= 0; i += 1) {
//                         data.push([
//                             time + i * 1000,
//                             Math.round(Math.random() * 100)
//                         ]);
//                     }
//                     return data;
//                 }())
//             }]
//         });

        function createChart() {

            vm.chart = Highcharts.stockChart('container', {

                rangeSelector: {
                    buttons: [{
                        count: 1,
                        type: 'minute',
                        text: '1M'
                    }, {
                        count: 5,
                        type: 'minute',
                        text: '5M'
                    }, {
                        type: 'all',
                        text: 'All'
                    }],
                    inputEnabled: false,
                    selected: 0
                },
                yAxis: {
                    plotLines: [{
                        value: 0,
                        width: 2,
                        color: 'silver'
                    }]
                },
                plotOptions: {
                    series: {
                        //important for solve bug of multi series with ws
                        showInNavigator: true
                    }
                },
                exporting: {
                    buttons: {
                        contextButton: {
                            //only print
                            menuItems: [Highcharts.getOptions().exporting.buttons.contextButton.menuItems[0]]
                        }
                    }
                },
                legend: {
                    enabled: true,
                    align: 'bottom',
                    backgroundColor: '#FCFFC5',
                    borderColor: 'black',
                    borderWidth: 2,
                    layout: 'vertical',
                    verticalAlign: 'top',
                    y: 50,
                    shadow: true
                },

                // tooltip: {
                //     formatter: function () {
                //         var s = '<tspan style="font-size: 10px">' + 'UTC 00:00 | ' + Highcharts.dateFormat('%A, %b %e %Y, %H:%M:%S', this.x) + '</tspan><br/>';
                //         s += '<tspan style="font-size: 10px">' + 'Local ' + GeneralService.getCurrentTimeZone() + " | " + moment(this.x).format('dddd, MMM DD YYYY, HH:mm:ss') + '</tspan><br/>';
                //         $.each(this.points, function () {
                //             var e = this;
                //             s += '<span style="color:' + e.point.color + '">' + e.series.name + '</span>: <b>' + Math.round(e.point.y * 100) / 100 + '</b> ';
                //             var foundObj = _.find(vm.chartData, function (el) {
                //                 return el.name === e.series.name;
                //             });
                //             if (typeof foundObj !== 'undefined') {
                //                 s += "(" + foundObj.unit + ")";
                //             }
                //             s += '<br/>';
                //         });
                //
                //         return s;
                //     }
                // },


                series: [{
                    name: 'Random data',
                    data: (function () {
                        // generate an array of random data
                        var data = [],
                            time = (new Date()).getTime(),
                            i;

                        for (i = -999; i <= 0; i += 1) {
                            data.push([
                                time + i * 1000,
                                Math.round(Math.random() * 100)
                            ]);
                        }
                        return data;
                    }())
                }],
                chart: {
                    events: {
                        load: function () {
                            // set up the updating of the chart each second
                            var series = this.series[0];
                            setInterval(function () {
                                var x = (new Date()).getTime(), // current time
                                    y = Math.round(Math.random() * 100);
                                series.addPoint([x, y], true, true);
                            }, 1000);
                        }
                    }
                }
            }, function (chart) {

            });

        }

        $timeout(function () {
            createChart();
        })
    });
