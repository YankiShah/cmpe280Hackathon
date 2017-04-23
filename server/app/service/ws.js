'use strict';

const _ = require('lodash');

const args = require('app/args');
const logger = require('app/logger').getLogger('m.service');
const express = require('express');
const app = express();

var service = {};

var io;

service.start = function (server) {
  io = require('socket.io').listen(server);

  io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('disconnect', function () {
      console.log('user disconnected');
    });
  });

};

service.sendMessage = function (key, value) {
  io.emit(key, JSON.stringify(value));
};

module.exports = service;
