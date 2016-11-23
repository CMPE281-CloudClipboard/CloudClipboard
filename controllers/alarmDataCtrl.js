"use strict";

var alarmlogDB = require('../models/alarmlogDB');


//-----function to create JSON for alarm data -------------//
exports.getAlarms = function(req, res){

  alarmlogDB.getAlarmsDataFromDB(function(result, error){
    if ( result.rows.length > 0 ) {
      console.log(result);
    } else {
      console.log("No results");
    }
    res.send(result.rows);
  });
};


//-----function to create JSON for alarm lot data -------------//
exports.getAlarmsLot = function(req, res){

  alarmlogDB.getAlarmsLotDataFromDB(function(result, error){
    if ( result.rows.length > 0 ) {
      console.log(result);
    } else {
      console.log("No results");
    }
    res.send(result.rows);
  });
};
