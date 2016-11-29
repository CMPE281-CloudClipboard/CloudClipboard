"use strict";
var mq_client = require('../rpc/client');
//var sqs_sns_inititate = require('../create');
//var config = {};
//var sqs_sns_publish = require('../publish');
//var sqs_sns_consume = require('../consume');
var PubNub = require('pubnub');
exports.email;

exports.copyClipboard = function(copiedText){
	
	var copyJSON = {"text" : copiedText, "email" : this.email, "fav_flag" : 0};

	/*sqs_sns_publish.publish(copiedText, function (err, results) {
		console.log(copiedText);
        if(err)
		{
			throw err;
		}
		else
		{
			console.log("Message has been successfully published");
		}
    }); 
	sqs_sns_consume.getMessages(); */


	publish(copiedText);
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


function publish(copyMessage) {
   
    var pubnub = new PubNub({
        publishKey : 'pub-c-8f2f4abc-3d06-4b2d-87c6-e3d09aa02466',
        subscribeKey : 'sub-c-48891760-b609-11e6-b37b-02ee2ddab7fe'
    });
       
    function publishSampleMessage() {
        console.log("Since we're publishing on subscribe connectEvent, we're sure we'll receive the following publish.");
        var publishConfig = {
            channel : "hello_world",
            message : copyMessage
        }
        pubnub.publish(publishConfig, function(status, response) {
            console.log(status, response);
        })
    }
       
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
    });
};