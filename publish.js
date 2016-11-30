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

var sns = new AWS.SNS();

exports.publish = function(message, callback) {
  var publishParams = { 
	  TopicArn : 'arn:aws:sns:us-east-1:803959939392:demo',
	  Message: message
  };
  sns.publish(publishParams, function(err, result) {
  	console.log(publishParams.message);
	  if (err !== null) {
			console.log(util.inspect(err));
			return callback(err);
	  }
	  //console.log(util.inspect(result));
	  callback(null, result);
  });
}
