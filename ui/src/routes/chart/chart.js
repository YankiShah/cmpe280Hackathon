'use strict';

angular.module('routerApp')
    .controller('ChartCtrl', function ($scope, $timeout, $rootScope, $mdSidenav, $log, $state, $document, $stateParams, $mdDialog, APIService, GeneralService) {
        var vm = this;

        function createChart() {
            Highcharts.chart('containerx', {

                title: {
                    text: 'California Reservoirs Water Level, 2010-2017'
                },

                subtitle: {
                    text: 'Source: http://cdec.water.ca.gov/queryTools.html'
                },

                yAxis: {
                    title: {
                        text: 'Water level'
                    }
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle'
                },
                chart: {
                    zoomType: 'x'
                },

                plotOptions: {
                    series: {
                        pointStart: 2010
                    }
                },

                series: [{
                    name: 'Reservoir 1',
                    data: [43934, 52503, 57177, 69658, 97031, 119931, 237133, 354175]
                }, {
                    name: 'Reservoir 2',
                    data: [24916, 44064, 59742, 39851, 32490, 50282, 68121, 30434]
                }, {
                    name: 'Reservoir 3',
                    data: [31744, 47722, 56005, 39771, 20185, 24377, 32147, 49387]
                }]

            });
        }

        function createChart2(){
            Highcharts.setOptions({
                global: {
                    useUTC: false
                }
            });

            // Create the chart
            Highcharts.stockChart('container', {
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
                },

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

                title: {
                    text: 'Reservior 1 live water levels'
                },

                exporting: {
                    enabled: false
                },

                series: [{
                    name: 'Random data',
                    data: (function () {
                        // generate an array of random data
                        var data = [],
                            time = (new Date()).getTime(),
                            i;

                        for (i = -99; i <= 0; i += 1) {
                            data.push([
                                time + i * 100,
                                Math.round(Math.random() * 10)
                            ]);
                        }
                        return data;
                    }())
                }]
            });

            Highcharts.stockChart('container1', {
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
                },

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

                title: {
                    text: 'Reservior 2 live water levels'
                },

                exporting: {
                    enabled: false
                },

                series: [{
                    name: 'Random data',
                    data: (function () {
                        // generate an array of random data
                        var data = [],
                            time = (new Date()).getTime(),
                            i;

                        for (i = -99; i <= 0; i += 1) {
                            data.push([
                                time + i * 100,
                                Math.round(Math.random() * 10)
                            ]);
                        }
                        return data;
                    }())
                }]
            });
            Highcharts.stockChart('container2', {
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
                },

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

                title: {
                    text: 'Reservior 3 live water levels'
                },

                exporting: {
                    enabled: false
                },

                series: [{
                    name: 'Random data',
                    data: (function () {
                        // generate an array of random data
                        var data = [],
                            time = (new Date()).getTime(),
                            i;

                        for (i = -99; i <= 0; i += 1) {
                            data.push([
                                time + i * 100,
                                Math.round(Math.random() * 10)
                            ]);
                        }
                        return data;
                    }())
                }]
            });


        }

        function createChart3(){
            var gauge1 = loadLiquidFillGauge("fillgauge1", NewValue());
            var config1 = liquidFillGaugeDefaultSettings();

            config1.circleColor = "#FF7777";
            config1.textColor = "#FF4444";
            config1.waveTextColor = "#FFAAAA";
            config1.waveColor = "#FFDDDD";
            config1.circleThickness = 0.2;
            config1.textVertPosition = 0.2;
            config1.waveAnimateTime = 1000;

            var gauge2 = loadLiquidFillGauge("fillgauge2", NewValue());
            var config2 = liquidFillGaugeDefaultSettings();
            config2.circleColor = "#FF7777";
            config2.textColor = "#FF4444";
            config2.waveTextColor = "#FFAAAA";
            config2.waveColor = "#FFDDDD";
            config2.circleThickness = 0.2;
            config2.textVertPosition = 0.2;
            config2.waveAnimateTime = 1000;

            var gauge3 = loadLiquidFillGauge("fillgauge3", NewValue());
            var config3 = liquidFillGaugeDefaultSettings();
            config3.circleColor = "#FF7777";
            config3.textColor = "#FF4444";
            config3.waveTextColor = "#FFAAAA";
            config3.waveColor = "#FFDDDD";
            config3.circleThickness = 0.2;
            config3.textVertPosition = 0.2;
            config3.waveAnimateTime = 1000;

            function NewValue(){
                if(Math.random() > .5){
                    return Math.round(Math.random()*100);
                } else {
                    return (Math.random()*100).toFixed(1);
                }
            }
        }

        $timeout(function () {
            createChart();
            createChart2();
            createChart3();
        })
    });
