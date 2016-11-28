var AWS = require('aws-sdk'); 
var util = require('util');
var fs = require('fs');
var key = require('./key-AWS');

//configure AWS
AWS.config.update({
	accessKeyId: key.keyJSON.accessKeyId,  // can omit access key and secret key
	secretAccessKey: key.keyJSON.secretAccessKey,
    "region": "us-east-1"   
});

var sns = new AWS.SNS();
var sqs = new AWS.SQS();

function createTopic(topicName, callback) {
	sns.createTopic({
		'Name': topicName
	}, function (err, result) {
	    if (err !== null) {
	      console.log(util.inspect(err));
	      return callback(err);
	    }
	    //console.log(util.inspect(result));
	    callback(null, result.TopicArn);
	});
}

function createQueue(queueName, callback) {
	sqs.createQueue({
		'QueueName': queueName
	}, function (err, result) {
	    if (err !== null) {
	      console.log(util.inspect(err));
	      return callback(err);
	    }
	    //console.log(util.inspect(result));
	    callback(null, result.QueueUrl);
	});
}

function getQueueAttr(queueURL, callback) {
	sqs.getQueueAttributes({
		QueueUrl: queueURL,
		AttributeNames: ["QueueArn"]
	}, function (err, result) {
	    if (err !== null) {
	      console.log(util.inspect(err));
	      return callback(err);
	    }
	    //console.log(util.inspect(result));
	    callback(null, result.Attributes.QueueArn);
	});
}


function snsSubscribe(topicArn, queueArn, callback) {
	sns.subscribe({
		'TopicArn': topicArn,
		'Protocol': 'sqs',
		'Endpoint': queueArn
	}, function (err, result) {
		if (err !== null) {
			console.log(util.inspect(err));
			return callback(err);
		}
		//console.log(util.inspect(result));
		callback(null, result);
	});
}

function setQueueAttr(queueURL, topicArn, queueArn, callback) {
	var queueUrl = queueURL;
	var topicArn = topicArn;
	var sqsArn = queueArn;
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
		//console.log(util.inspect(result));
		callback(null, result);
	});
}

function writeConfigFile(config, callback) {
	fs.writeFile('./configs/config.json', JSON.stringify(config, null, 4), function(err) {
    if(err) {
      return callback(err);
    }
    console.log("config saved to config.json");
    callback();
  }); 
}