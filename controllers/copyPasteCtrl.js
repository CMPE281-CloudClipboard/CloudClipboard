"use strict";
var mq_client = require('../rpc/client');

exports.email;

exports.copyClipboard = function(copiedText){
	
	var copyJSON = {"text" : copiedText, "email" : this.email, "fav_flag" : 0};
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
