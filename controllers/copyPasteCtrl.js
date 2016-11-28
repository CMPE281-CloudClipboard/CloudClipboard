"use strict";
var mq_client = require('../rpc/client');
//var sqs_sns_inititate = require('../create');
//var config = {};
//var sqs_sns_publish = require('../publish');
exports.email;

exports.copyClipboard = function(copiedText){

	var copyJSON = {"text" : copiedText, "email" : this.email, "fav_flag" : 0};
	// sqs_sns_publish.publish(copiedText, function (err, results) {
  //       if(err)
	// 	{
	// 		throw err;
	// 	}
	// 	else
	// 	{
	// 		console.log("Message has been successfully published");
	// 	}
  //   });
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
			console.log("content copied");
		}
    });
}
