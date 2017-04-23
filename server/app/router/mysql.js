/*
 * smartFarm - https://github.com/smartfarm/smart-farm.git
 *
 * Copyright (c) 2017 smartFarm
 */

/**
 * @module sf/router/mysql
 *
 * @requires express
 * @requires sf/executor
 * @requires sf/service/show-databases
 */

'use strict';

const express = require('express');

const executor = require('app/executor');
const reservoir = require('app/mysql/reservoir');
// const zone = require('app/mysql/zone');
// const hub = require('app/mysql/hub');
// const sensor = require('app/mysql/sensor');
const httpStatus = require('app/http-status');
const wsService = require('app/service/ws');
const simulatorService = require('app/service/simulator');
//
// Router: /mysql
//
const router = express.Router({
  caseSensitive: true,
  mergeParams: true,
  strict: true
});


router.get('/reservoirs', function (req, res) {
  executor.execute(req, res, function (sender) {
    sender(reservoir.selectAll(), 'reservoirs');
  });
});

function startE() {
  reservoir.selectAll().then(function (rs) {
    var array = rs;
    console.log(array);
    array.forEach(function (e) {
      simulatorService.add(e, function (el, value) {
        console.log(el, value);
        wsService.sendMessage("message", {key: el.reservoirId, value: value})
      });
    });

    simulatorService.start();

  })
}

setTimeout(function () {
  startE();
}, 2000);

/*router.get('/sensors', function (req, res) {
 executor.execute(req, res, function (sender) {
 sender(sensor.selectAll(), 'sensor_types');
 });
 });

 router.post('/sensors', function (req, res) {
 executor.execute(req, res, function (sender) {
 var data = req.body;
 sender(sensor.create(data.name, parseInt(data.sensor_type_id), parseInt(data.status_id)
 , parseInt(data.hub_id), parseFloat(data.min), parseFloat(data.max)), 'sensors');
 });
 });

 router.get('/sensors/types', function (req, res) {
 executor.execute(req, res, function (sender) {
 sender(sensor_type.selectAll(), 'sensor_types');
 });
 });

 router.get('/zones', function (req, res) {
 executor.execute(req, res, function (sender) {
 sender(zone.selectAll(), 'zones');
 });
 });

 router.post('/zones', function (req, res) {
 executor.execute(req, res, function (sender) {
 var data = req.body;
 sender(zone.create(data.name, data.polygon, data.crop_name), 'zones');
 });
 });

 router.get('/hubs', function (req, res) {
 executor.execute(req, res, function (sender) {
 sender(hub.selectAll(), 'hubs');
 });
 });

 router.post('/hubs', function (req, res) {
 executor.execute(req, res, function (sender) {
 var data = req.body;
 sender(hub.create(data.mac, parseFloat(data.lat), parseFloat(data.lng), parseInt(data.status_id)), 'hubs');
 });
 });*/

router.post('/ws/public', function (req, res) {
  executor.execute(req, res, function (sender) {
    var data = req.body;
    console.log(data);
    wsService.sendMessage(data.key, data.message);
    res.status(httpStatus.OKAY).send({
      status: "ok"
    });
  });
});

//
// Exports the router
//
module.exports = router;
