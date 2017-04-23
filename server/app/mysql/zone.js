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
const TABLE_NAME = tables.ZONE;
const SQL_SELECT_ALL = [
  'SELECT *',
  'FROM `' + TABLE_NAME + '`'
].join('\n');
const SQL_CREATE = [
  'INSERT INTO `' + TABLE_NAME + '`',
  '(`name`, `polygon`, `crop_name`)',
  'VALUES("{0}","{1}","{2}")'
].join('\n');

module.exports.selectAll = function () {
  return db.getConnection()
    .then(function (conn) {
      var sqlStatement = SQL_SELECT_ALL;
      return apiService.queryExecute(conn, sqlStatement, TABLE_NAME);
    });
};

module.exports.create = function (name, polygon, crop_name) {
  return db.getConnection()
    .then(function (conn) {
      var sqlStatement = SQL_CREATE;
      sqlStatement = generalService.replaceParams(sqlStatement, [name, polygon, crop_name]);
      return apiService.queryExecute(conn, sqlStatement, TABLE_NAME);
    });
};
