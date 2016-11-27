"use strict";
var mq_client = require('../rpc/client');

//-----function to create JSON for alarm data -------------//
exports.doLogin = function(req, res){
  var loginSucess = false;
  console.log("In doLogin");
  var username = req.param("username");
  var password = req.param("password");
  var loginJSON = {"email" : username}; 

  mq_client.make_request('LOGIN_QUEUE', loginJSON, function (err, results) {
        if(err)
		{
			throw err;
		}
		else
		{

			if(results.userDetails.Item.password == password){
				console.log("Passwords matched");
				var json_responses = {"passwordMatched" : true,"results":results.userDetails.Item};
				console.log(results.userDetails.Item);
				res.send(json_responses);
			}else{
				console.log("Invalid password");
				var json_responses = {"passwordMatched" : false};
				res.send(json_responses);
			}
			
		}
    });
}