var AWS = require('aws-sdk'); 
var util = require('util');
var key = require('./key-AWS');
var config = require('./configs/config.json');

//configure AWS
AWS.config.update({
	accessKeyId: key.keyJSON.accessKeyId,  // can omit access key and secret key
	secretAccessKey: key.keyJSON.secretAccessKey,
    "region": "us-east-1"   
});

var sqs = new AWS.SQS();

var receiveMessageParams = {
	QueueUrl: config.QueueUrl,
	MaxNumberOfMessages: 10
};

function processAndDeleteMessages() {
	sqs.receiveMessage(receiveMessageParams, function(err, data) {
		if (data && data.Messages && data.Messages.length > 0) {
			for (var i=0; i < data.Messages.length; i++) {
				console.log("Message "+i+1+" "+data.Messages[i]);
				console.log("Do something with the message here...");
				console.log("Message processed successfully");
				// Delete the message when we've successfully processed it
				var deleteMessageParams = {
		        	QueueUrl: config.QueueUrl,
		        	ReceiptHandle: data.Messages[i].ReceiptHandle
		      	};
		      	sqs.deleteMessage(deleteMessageParams, function(err, data) {
				  	console.log("Message deleted successfully");
				});
			}
			processAndDeleteMessages();
		}else{
			console.log("Waiting..");
			setTimeout(processAndDeleteMessages, 100);
		}
	});
}

setTimeout(processAndDeleteMessages, 100);