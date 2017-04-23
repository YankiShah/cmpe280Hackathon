/*
 * smartFarm - https://github.com/smartfarm/smart-farm.git
 *
 * Copyright (c) 2017 smartFarm
 */

/**
 * The application of express.
 *
 * @module sf/application
 *
 * @requires body-parser
 * @requires express
 * @requires q
 * @requires module:sf/info
 * @requires module:sf/config-util
 * @requires module:sf/logger
 * @requires module:sf/middleware
 * @requires module:sf/router/mysql
 */

'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const Q = require('q');

const info = require('app/info');
const configUtil = require('app/config-util');
const logger = require('app/logger').getLogger('sf');

const middleware = require('app/middleware');

const routerMySQL = require('app/router/mysql');

const wsService = require('app/service/ws');

const app = express();

const DEFAULT_HOST = 'localhost';

/**
 * starts the application.
 *
 * @param {object} settings
 * @return {promise} the promise resolve callback is returns after the application is listening.
 */
module.exports.start = function (settings) {

  // add the config instance under "config".
  app.set('settings', settings);
  // set the application title
  app.set('title', info.getAppTitle());

  // Middlewares...
  //ALLOW JS connect
  app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    // res.setHeader('Access-Control-Allow-Credentials', false);

    // Pass to next layer of middleware
    next();
  });

  app.use(middleware.measureTime());

  app.use(bodyParser.json());

  // Routers...

  app.use('/', routerMySQL);

  // Start WS


  // TODO Add here your routers


  // Endpoints...

  /**
   * @api {get} /about About
   * @apiName GetAbout
   * @apiGroup System
   * @apiDescription Shows the information about the application
   * @apiVersion 0.0.1
   * @apiExample {curl} Example usage:
   *     curl -i http://localhost:18080/about
   *
   * @apiSuccess {String} name the application name
   * @apiSuccess {String} title the title of the application
   * @apiSuccess {String} version the version of the application
   * @apiSuccess {String} vendor the author / company of the application
   * @apiSuccess {String} description a short description.
   *
   * @apiSuccessExample {json} Success response:
   *     HTTP/1.1 200 OK
   *     {
   *       "name": "dummy-rest",
   *       "title": "Dummy Rest Interface",
   *       "version": "0.0.1",
   *       "vendor": "Dummy <dummy@example.com>",
   *       "description": "This is a dummy service",
   *       "build": "20161004-133401"
   *     }
   */
  app.get('/about', function about(req, res) {
    res.send({
      name: info.getAppName(),
      title: info.getAppTitle(),
      version: info.getAppVersion(),
      vendor: info.getAppVendor(),
      description: info.getAppDescription(),
      build: info.getBuildTimestamp()
    });
  });

  // Starting...

  // get the port and host
  const port = configUtil.getSetting(settings, 'server.port', 0);
  const host = configUtil.getSetting(settings, 'server.host', DEFAULT_HOST);

  const done = Q.defer();

  if (port > 0) {
    // starts the listening of the express application...
    var server = app.listen(port, function () {
      logger.info('Server is listen http://', host, ':', port);
      done.resolve(true);
    });

    wsService.start(server);
  } else {
    // missing the port for the server...
    process.nextTick(function () {
      done.reject('Missing the setting property "server.port"!');
    });
  }

  return done.promise;
};
