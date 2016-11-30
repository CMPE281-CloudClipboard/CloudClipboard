"use strict";
var mq_client = require('../rpc/client');
var copypasteController = require('./copyPasteCtrl');

//-----function to create JSON for alarm data -------------//
var loggedIn = false;
exports.doLogin = function(req, res){
  var loginSucess = false;
  console.log("In doLogin");
  var email = req.param("email");
  var password = req.param("password");
  var loginJSON = {"email" : email};

  mq_client.make_request('LOGIN_QUEUE', loginJSON, function (err, results) {
        if(err)
		{
			throw err;
		}
		else
		{

			if(results.userDetails.Item.password == password){
				console.log("login results");
				req.clipBoardSession.email = results.userDetails.Item.email;
				copypasteController.email = req.clipBoardSession.email;
				loggedIn = true;
				req.clipBoardSession.fname = results.userDetails.Item.first_name;
				req.clipBoardSession.lname = results.userDetails.Item.last_name;
				var json_responses = {"passwordMatched" : true,"results":results.userDetails.Item};
				res.send(json_responses);
			}else{
				console.log("Invalid password");
				var json_responses = {"passwordMatched" : false};
				res.send(json_responses);
			}

		}
    });
}

exports.getLoggedInFlag = function(){
	return loggedIn;
}

exports.doSignup = function(req, res){
	var email = req.param("email");
	var pwd = req.param("password");
	var fname = req.param("firstname");
	var lname = req.param("lastname");

	var signupJSON = {
		"email": email,
        "first_name": fname,
        "last_name": lname,
        "password": pwd,
        "fav_flag" : 0
	};
	console.log(signupJSON);

	mq_client.make_request('SIGNUP_QUEUE', signupJSON, function (err, results) {
        if(err)
		{
			throw err;
		}
		else
		{
			console.log("signup results");
			req.clipBoardSession.email = email;
			copypasteController.email = req.clipBoardSession.email;
			loggedIn = true;
			req.clipBoardSession.fname = fname;
			req.clipBoardSession.lname = lname;
			var json_responses = {"signup" : true};
			res.send(json_responses);
		}
    });
}