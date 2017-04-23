'use strict';

const _ = require('lodash');

const args = require('app/args');
const logger = require('app/logger').getLogger('m.service');
const ws = require('app/service/ws');

var service = {};

var intervalTime = 1000;
var queuesList = [];
var mainQueue = null;

function reset() {
  clearInterval(mainQueue);
  mainQueue = null;
}

function startQueue() {
  mainQueue = setInterval(function () {
    if (queuesList.length) {
      var q = queuesList.pop();
      executeQueue(q);
      queuesList.unshift(q);
    }
  }, intervalTime);

}

function executeQueue(queue) {
  if (queue.callback) {
    queue.callback(queue.key, getRandomInt(90000, 100000));
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

service.start = function () {
  console.log("start");
  console.log(mainQueue);
  if (mainQueue == null) {
    startQueue();
  }
};

service.stop = function () {
  reset();
};

service.clearAll = function () {
  reset();
  queuesList = [];
}

service.add = function (key, callback) {
  queuesList.push({
    key: key,
    callback: callback
  })
}


module.exports = service;
