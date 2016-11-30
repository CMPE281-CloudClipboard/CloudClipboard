var AWS = require('aws-sdk'); 
var util = require('util');
var key = require('./key-AWS');
//var config = require('./configs/config.json');

//configure AWS
AWS.config.update({
	accessKeyId: key.keyJSON.accessKeyId,  // can omit access key and secret key
	secretAccessKey: key.keyJSON.secretAccessKey,
    "region": "us-east-1"   
});

var sqs = new AWS.SQS();

var receiveMessageParams = {
	QueueUrl: 'https://sqs.us-east-1.amazonaws.com/803959939392/sdf3sdcomasd',
	MaxNumberOfMessages: 10
};

exports.getMessages = function(){
	sqs.receiveMessage(receiveMessageParams, function(err, data) {
		if (data && data.Messages && data.Messages.length > 0) {
			for (var i=0; i < data.Messages.length; i++) {
				console.log("Message "+i+1+" "+JSON.stringify(data.Messages[i]));
				//console.log("do something with the message here...");
				// Delete the message when we've successfully processed it
				var deleteMessageParams = {
		        	QueueUrl: config.QueueUrl,
		        	ReceiptHandle: data.Messages[i].ReceiptHandle
		      	};
		      	sqs.deleteMessage(deleteMessageParams, function(err, data) {
				  	console.log("deleted message");
				  	console.log(data);
				});
			}
			//getMessages();
		}else{
			console.log("Waiting..");
			//setTimeout(getMessages, 100);
		}
	});
};
