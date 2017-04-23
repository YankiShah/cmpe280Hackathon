'use strict';

const _ = require('lodash');

const args = require('app/args');
const db = require('app/db');
const logger = require('app/logger').getLogger('m.service');
const tables = require('app/config/config').TABLES;

const generalService = require('app/service/general');
const apiService = require('app/service/api');

/**
 * @name ShowDatabasesOptions
 * @property {string} [pattern] the search pattern
 */

/**
 * Statement for databases matched with pattern
 * @type {string}
 */
const TABLE_NAME = tables.HUB;
const SQL_SELECT_ALL = [
  'SELECT h.*,s.name AS status_name',
  'FROM `' + TABLE_NAME + '` AS h, `' + tables.STATUS_TYPE + '` AS s',
  'WHERE h.status_id = s.id',
].join('\n');

const SQL_CREATE = [
  'INSERT INTO `' + TABLE_NAME + '`',
  '(`mac_address`, `lat`, `lng`, `status_id`)',
  'VALUES("{0}",{1},"{2}", {3})'
].join('\n');

module.exports.selectAll = function () {
  return db.getConnection()
    .then(function (conn) {
      var sqlStatement = SQL_SELECT_ALL;
      return apiService.queryExecute(conn, sqlStatement, TABLE_NAME);
    });
};


module.exports.create = function (mac, lat, lng, status_id) {
  return db.getConnection()
    .then(function (conn) {
      var sqlStatement = SQL_CREATE;
      sqlStatement = generalService.replaceParams(sqlStatement, [mac, lat, lng, status_id]);
      return apiService.queryExecute(conn, sqlStatement, TABLE_NAME);
    });
};
