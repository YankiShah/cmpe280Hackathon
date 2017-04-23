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
const TABLE_NAME = tables.SENSOR;

const SQL_SELECT_ALL = [
  'SELECT s.*, st.name AS sensor_type, ss.name AS status_name, hi.value, hi.date_time',
  'FROM `sensor`AS s',
  'LEFT JOIN',
  '(',
  'SELECT *',
  'from (select * from `sensor_history` order by date_time DESC) x',
  'group by sensor_id',
  ') AS hi',
  'ON s.id = hi.sensor_id',
  ', `sensor_type` AS st, `hub` AS h, `status_type` AS ss',
  'WHERE s.hub_id = h.id AND s.sensor_type_id = st.id AND s.status_id = ss.id',
].join('\n');


const SQL_CREATE = [
  'INSERT INTO `' + TABLE_NAME + '`',
  '(`name`, `sensor_type_id`, `status_id`, `hub_id`, `min`, `max`)',
  'VALUES("{0}",{1},{2},{3},{4},{5})'
].join('\n');


module.exports.selectAll = function () {
  return db.getConnection()
    .then(function (conn) {
      var sqlStatement = SQL_SELECT_ALL;
      return apiService.queryExecute(conn, sqlStatement, TABLE_NAME);
    });
};

module.exports.create = function (name, sensor_type_id, status_id, hub_id, min, max) {
  return db.getConnection()
    .then(function (conn) {
      var sqlStatement = SQL_CREATE;
      sqlStatement = generalService.replaceParams(sqlStatement, [name, sensor_type_id, status_id, hub_id, min, max]);
      return apiService.queryExecute(conn, sqlStatement, TABLE_NAME);
    });
};
