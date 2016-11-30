"use strict";
var sqlite3 = require('sqlite3').verbose();
var moment = require('moment');

var mq_client = require('../rpc/client');
//var sqs_sns_inititate = require('../create');
//var config = {};
var sqs_sns_publish = require('../publish');
//var sqs_sns_consume = require('../consume');
//var PubNub = require('pubnub');
exports.email;

exports.copyClipboard = function(copiedText){
	var copyJSON = {"text" : copiedText, "email" : this.email, "fav_flag" : 0};
 	console.log("copy JSON===>> "+ JSON.stringify(copyJSON));
	sqs_sns_publish.publish(copiedText, function (err, results) {
		//console.log(copiedText);
        if(err)
		{
			throw err;
		}
		else
		{
			// console.log("Message has been successfully published");
		}

    });


  var date = new Date();
  var email_ts = this.email + date;
	var check;
	var db = new sqlite3.Database('temp.db');
	db.serialize(function() {
	  db.run("CREATE TABLE if not exists CLIPBOARD_HISTORY (EMAIL_TIMESTAMP TEXT, TIMESTAMP DATETIME, TEXT TEXT,EMAIL TEXT,FAV_FLAG INT)");
	  var stmt = db.prepare("INSERT INTO CLIPBOARD_HISTORY VALUES (?,?,?,?,?)");
	  //for (var i = 0; i < 10; i++) {
      stmt.run(email_ts,date,copiedText,this.email,0);
	  //}
	  stmt.finalize();

	  // db.each("SELECT * FROM CLIPBOARD_HISTORY", function(err, row) {
	  //     console.log(row.TEXT + ": " + row.EAMIL_TIMESTAMP);
	  // });
	});

	db.close();
	//sqs_sns_consume.getMessages();


	//publish(copiedText);

	/*sqs_sns_inititate.createTopic(this.email, function (err, results) {
        if(err)
		{
			throw err;
		}
		else
		{
			config.TopicArn = results.TopicArn;
			console.log("Topic created");
		}
    });
	sqs_sns_inititate.createQueue(this.email, function (err, results) {
        if(err)
		{
			throw err;
		}
		else
		{
			config.QueueUrl = results.QueueUrl;
			console.log("Queue created");
		}
    });
	sqs_sns_inititate.getQueueAttr(config.QueueUrl, function (err, results) {
        if(err)
		{
			throw err;
		}
		else
		{
			config.QueueArn = results.Attributes.QueueArn;
			console.log("Fetched queue attributes");
		}
    });
	sqs_sns_inititate.snsSubscribe(config.TopicArn, config.QueueArn, function (err, results) {
        if(err)
		{
			throw err;
		}
		else
		{
			console.log("Successfully subscribed");
		}
    });
	sqs_sns_inititate.setQueueAttr(config.QueueUrl, config.TopicArn, config.QueueArn, function (err, results) {
        if(err)
		{
			throw err;
		}
		else
		{
			console.log("Queue attributes set successfully");
		}
    });
	sqs_sns_inititate.writeConfigFile(config, function (err, results) {
        if(err)
		{
			throw err;
		}
    });*/
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

/*
function publish(copyMessage) {

    var pubnub = new PubNub({
        publishKey : 'pub-c-8f2f4abc-3d06-4b2d-87c6-e3d09aa02466',
        subscribeKey : 'sub-c-48891760-b609-11e6-b37b-02ee2ddab7fe'
    });


    //console.log("Since we're publishing on subscribe connectEvent, we're sure we'll receive the following publish.");
    /*var publishConfig = {
        channel : "hello_world",
        message : copyMessage
    }
    pubnub.publish(publishConfig, function(status, response) {
        console.log("Status"+JSON.stringify(status));
        console.log("response"+JSON.stringify(response));
    })
    */
    /*
    pubnub.addListener({
        status: function(statusEvent) {
            if (statusEvent.category === "PNConnectedCategory") {
                publishSampleMessage();
            }
        },
        message: function(message) {
            console.log("New Message!!", message);
        },
        presence: function(presenceEvent) {
            // handle presence
        }
    })
    console.log("Subscribing..");
    pubnub.subscribe({
        channels: ['hello_world']
    }); */

/*
};
*/
