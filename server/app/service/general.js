'use strict';


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
  return str
};

service.convertDate = function (timeStamp) {
  var date = new Date(parseInt(timeStamp)).toISOString();
  return date;
}

service.convertDate10 = function (timeStamp) {
  var date = new Date(parseInt(timeStamp)).toISOString();
  return date.substring(0, 10);
}

service.getDateRangeOfToday = function () {
  var start = new Date();
  start.setHours(0, 0, 0, 0);

  var end = new Date();
  end.setHours(23, 59, 59, 999);
  return {
    start: start,
    end: end
  };
};

module.exports = service;
