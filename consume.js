var AWS = require('aws-sdk'); 
var util = require('util');
var key = require('./key-AWS');
var copyPasteCtrl = require('./controllers/copyPasteCtrl');
var index = require('./index');
var sqlite3 = require('sqlite3').verbose();
const {clipboard} = require('electron')
//var config = require('./configs/config.json');

//configure AWS
AWS.config.update({
	accessKeyId: key.keyJSON.accessKeyId,  // can omit access key and secret key
	secretAccessKey: key.keyJSON.secretAccessKey,
    "region": "us-east-1"   
});

var sqs = new AWS.SQS();

exports.getMessages = function(queueUrl){
	var receiveMessageParams = {
		QueueUrl : queueUrl,
		MaxNumberOfMessages: 10
	};
	sqs.receiveMessage(receiveMessageParams, function(err, data) {
		if (data && data.Messages && data.Messages.length > 0) {
			for (var i=0; i < data.Messages.length; i++) {

				var textMessage = JSON.parse(data.Messages[i].Body).Message;
				console.log('textMessage:' + textMessage);
				var date = new Date();
  				var email_ts = copyPasteCtrl.email + date;

				var db = new sqlite3.Database('temp.db');
				db.serialize(function() {
				  
				  var stmt = db.prepare("INSERT INTO CLIPBOARD_HISTORY VALUES (?,?,?,?,?)");
			      stmt.run(email_ts,date,textMessage,copyPasteCtrl.email,0);
				  stmt.finalize();

				});

				db.close();

				clipboard.writeText(textMessage);
				console.log("inserted to clipboard");
				var deleteMessageParams = {
		        	QueueUrl: queueUrl,
		        	ReceiptHandle: data.Messages[i].ReceiptHandle
		      	};
		      	sqs.deleteMessage(deleteMessageParams, function(err, data) {
				  	console.log("deleted message");
				});
			}
		}else{
			console.log("Waiting..");
		}
	});
};
