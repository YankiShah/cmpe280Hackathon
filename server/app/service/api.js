'use strict';

const _ = require('lodash');

const args = require('app/args');
const logger = require('app/logger').getLogger('m.service');

var service = {};

function escapeRegExp(str) {
  return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
};

service.replaceAll = function (str, find, replace) {
  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
};

service.replaceParams = function (str, params) {
  for (var i = 0; i < params.length; i++) {
    str = service.replaceAll(str, '{' + i + '}', params[i]);
  }
  return str;
};

service.queryExecute = function (conn, sqlStatement, tableName) {
  console.log(sqlStatement);
  return conn.query(sqlStatement)
    .then(function (databases) {
      if (args.isVerbose()) {
        logger.debug(tableName + ': ', JSON.stringify(databases));
      }
      var result = [];
      _.forEach(databases, function (db) {
        result.push(db);
      });
      return result;
    })
    .finally(function () {
      // release the db connection
      conn.release();
    });
}

module.exports = service;
