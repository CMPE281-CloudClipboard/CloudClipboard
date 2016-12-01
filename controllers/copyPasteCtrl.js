"use strict";
var sqlite3 = require('sqlite3').verbose();
var moment = require('moment');

var mq_client = require('../rpc/client');
var sqs_sns_publish = require('../publish');
exports.email;

exports.copyClipboard = function(copiedText){
	var copyJSON = {"text" : copiedText, "email" : this.email, "fav_flag" : 0};
 	console.log("copy JSON===>> "+ JSON.stringify(copyJSON));
	sqs_sns_publish.publish(copiedText, function (err, results) {
		
        if(err)
		{
			throw err;
		}
		else
		{
			// console.log("Message has been successfully published");
		}

    });

	mq_client.make_request('COPY_QUEUE', copyJSON, function (err, results) {
        if(err)
		{
			throw err;
		}
		else
		{
			//console.log("content copied");
		}
    });
}




exports.getHistory = function(req, res){
	var resData = [];
	var db = new sqlite3.Database('temp.db');
	db.serialize(function() {
		db.all("SELECT TIMESTAMP, TEXT, FAV_FLAG FROM CLIPBOARD_HISTORY", function(err, results) {
	      if(err){
					console.log(err);
				}else{
					if(results.length > 0){
						for(var i = 0; i < results.length; i++){
							var row = results[i];

							//Convert favClass
							var favClass = "glyphicon-star-empty";
							if(row.FAV_FLAG == 1) favClass = "glyphicon-star";

							//Calculate duration
							var duration = moment.duration(Date.now() - row.TIMESTAMP);
							duration = duration.humanize();
							var rowJSON = {"timestamp" : row.TIMESTAMP, "duration" : duration, "text" : row.TEXT, "favClass" : favClass};
							resData.push(rowJSON);
						}
					}
				}
				res.send(resData);
	  });
	});
	db.close();
}



exports.getFav = function(req, res){
	var resData = [];
	var db = new sqlite3.Database('temp.db');
	db.serialize(function() {
		db.all("SELECT TIMESTAMP, TEXT FROM CLIPBOARD_HISTORY WHERE FAV_FLAG = 1", function(err, results) {
	      if(err){
					console.log(err);
				}else{
					if(results.length > 0){
						for(var i = 0; i < results.length; i++){
							var row = results[i];

							//Convert favClass
							var favClass = "glyphicon-star";

							//Calculate duration
							var duration = moment.duration(Date.now() - row.TIMESTAMP);
							duration = duration.humanize();
							var rowJSON = {"timestamp" : row.TIMESTAMP, "duration" : duration, "text" : row.TEXT, "favClass" : favClass};
							resData.push(rowJSON);
						}
					}
				}
				res.send(resData);
	  });
	});
	db.close();
}



exports.deleteHistory = function(req, res){
	var timestamp = req.body.timestamp;
	var db = new sqlite3.Database('temp.db');
	db.serialize(function() {
		db.all("DELETE FROM CLIPBOARD_HISTORY WHERE TIMESTAMP="+timestamp, function(err, results) {
	      if(err){
					console.log(err);
					res.status(500).send();
				}else{
					res.status(200).send();
				}
	  });
	});
	db.close();
}



exports.favHistory = function(req, res){
	var timestamp = req.body.timestamp;
	var favflag = req.body.favflag;
	var db = new sqlite3.Database('temp.db');
	db.serialize(function() {
		db.all("UPDATE CLIPBOARD_HISTORY SET FAV_FLAG = " + favflag + " WHERE TIMESTAMP="+timestamp, function(err, results) {
	      if(err){
					console.log(err);
					res.status(500).send();
				}else{
					res.status(200).send();
				}
	  });
	});
	db.close();
}
