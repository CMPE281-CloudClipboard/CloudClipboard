var AWS = require('aws-sdk'); 
var util = require('util');
var fs = require('fs');
var async = require('async');
var key = require('./key');

//configure AWS
AWS.config.update({
	accessKeyId: key.keyJSON.accessKeyId,  // can omit access key and secret key
	secretAccessKey: key.keyJSON.secretAccessKey,
    "region": "us-east-1"   
});

var sns = new AWS.SNS();
var sqs = new AWS.SQS();
var config = {};

function createTopic(callback) {
	sns.createTopic({
		'Name': 'CloudClipperTopic1'
	}, function (err, result) {
	    if (err !== null) {
	      console.log(util.inspect(err));
	      return callback(err);
	    }
	    console.log(util.inspect(result));
	    config.TopicArn = result.TopicArn;
	    callback();
	});
}

function createQueue(callback) {
	sqs.createQueue({
		'QueueName': 'CloudClipperQueue1'
	}, function (err, result) {
	    if (err !== null) {
	      console.log(util.inspect(err));
	      return callback(err);
	    }
	    console.log(util.inspect(result));
	    config.QueueUrl = result.QueueUrl;
	    callback();
	});
}

function getQueueAttr(callback) {
	sqs.getQueueAttributes({
		QueueUrl: config.QueueUrl,
		AttributeNames: ["QueueArn"]
	}, function (err, result) {
	    if (err !== null) {
	      console.log(util.inspect(err));
	      return callback(err);
	    }
	    console.log(util.inspect(result));
	    config.QueueArn = result.Attributes.QueueArn;
	    callback();
	});
}


function snsSubscribe(callback) {
	sns.subscribe({
		'TopicArn': config.TopicArn,
		'Protocol': 'sqs',
		'Endpoint': config.QueueArn
	}, function (err, result) {
		if (err !== null) {
			console.log(util.inspect(err));
			return callback(err);
		}
		console.log(util.inspect(result));
		callback();
	});
}

function setQueueAttr(callback) {
	var queueUrl = config.QueueUrl;
	var topicArn = config.TopicArn;
	var sqsArn = config.QueueArn;
	var attributes = {
	    "Version": "2008-10-17",
	    "Id": sqsArn + "/SQSDefaultPolicy",
	    "Statement": [{
	      "Sid": "Sid" + new Date().getTime(),
	      "Effect": "Allow",
	      "Principal": {
	        "AWS": "*"
	      },
	      "Action": "SQS:SendMessage",
	      "Resource": sqsArn,
	      "Condition": {
	        "ArnEquals": {
	          "aws:SourceArn": topicArn
	        }
	      }
	    }
	  ]
	};
	sqs.setQueueAttributes({
		QueueUrl: queueUrl,
		Attributes: {
			'Policy': JSON.stringify(attributes)
		}
	}, function (err, result) {
		if (err !== null) {
			console.log(util.inspect(err));
			return callback(err);
		}
		console.log(util.inspect(result));
		callback();
	});
}

function writeConfigFile(callback) {
	fs.writeFile('./configs/config.json', JSON.stringify(config, null, 4), function(err) {
    if(err) {
      return callback(err);
    }
    console.log("config saved to config.json");
    callback();
  }); 
}
async.series([createTopic, createQueue, getQueueAttr, snsSubscribe, setQueueAttr, writeConfigFile]);