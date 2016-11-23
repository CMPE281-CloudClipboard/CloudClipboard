"use strict";

var filePath = "./models/alarmlog.js";
var database = require('../configs/database');
var cassandra = require('cassandra-driver');
//Connect to the cluster
var client = new cassandra.Client({contactPoints: [database.dbURL], keyspace: 'lamscope'});


//----------------------get alarm chart data-------------//
exports.getErrorAlarmDataFromDB = function(queryJSON, callback){

  var startTime = queryJSON.startTime;
  var endTime = queryJSON.endTime;

  var queryString = "select * from alarm_log WHERE severity = 'Error' and post_time >= '"+startTime+"' AND  post_time <= '"+endTime+"' ALLOW FILTERING;";
  client.execute(queryString, function (error, result) {
      if (!error){
          if ( !(result.rows.length > 0) ) {
              console.log("No results for the query:"+ queryString);
              console.log("File: " + filePath);
              console.log("Function: getEventDataFromDB Location 1");
          }
      }else{
          console.log(error);
          console.log("File: " + filePath);
          console.log("Function: getEventDataFromDB Location 2");
      }
      callback(result, error);
  });
};



//-----------------get alarm data------------------------------------//
exports.getAlarmsDataFromDB = function(callback){
  var queryString = "select * from alarm_log where severity = 'Error' allow filtering";
  client.execute(queryString, function (error, result) {
      if (!error){
          if ( !(result.rows.length > 0) ) {
              console.log("No results for the query: queryString");
              console.log("File: " + filePath);
              console.log("Function: getEventDataFromDB Location 1");
          }
      }else{
          console.log(error);
          console.log("File: " + filePath);
          console.log("Function: getEventDataFromDB Location 2");
      }
      callback(result, error);
  });
};


//-----------------get alarm lot data------------------------------------//
exports.getAlarmsLotDataFromDB = function(callback){
  var queryString = "select * from lot_log;";
  client.execute(queryString, function (error, result) {
      if (!error){
          if ( !(result.rows.length > 0) ) {
              console.log("No results for the query: queryString");
              console.log("File: " + filePath);
              console.log("Function: getEventDataFromDB Location 1");
          }
      }else{
          console.log(error);
          console.log("File: " + filePath);
          console.log("Function: getEventDataFromDB Location 2");
      }
      callback(result, error);
  });
};
