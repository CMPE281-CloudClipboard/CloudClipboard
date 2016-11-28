var AWS = require('aws-sdk'); 
var util = require('util');
var key = require('./key');
var config = require('./configs/config.json');

//configure AWS
AWS.config.update({
	accessKeyId: key.keyJSON.accessKeyId,  // can omit access key and secret key
	secretAccessKey: key.keyJSON.secretAccessKey,
    "region": "us-east-1"   
});

var sns = new AWS.SNS();

function publish(message) {
  var publishParams = { 
    TopicArn : config.TopicArn,
    Message: message
  };

  sns.publish(publishParams, function(err, data) {
    process.stdout.write(".");
    //console.log(data);
  });
}

for (var i=0; i < 500; i++) {
  publish("message: " + i);
}
