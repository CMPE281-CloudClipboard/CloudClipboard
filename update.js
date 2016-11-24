var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-west-2",
  accessKeyId: '',  // can omit access key and secret key 
  secretAccessKey: ''
});

var docClient = new AWS.DynamoDB.DocumentClient()

var table = "Users";

var email = "jay@gmail.com";
var first_name = "Jay";
var last_name = "Bhorania";
var password = "qwer1234";


var params = {
    TableName:table,
    Key:{
        "email": email,
    },
    Item:{
        "email": email,
        "first_name": first_name,
        "last_name": last_name,
        "password": password
    }

};

console.log("Updating the item...");
docClient.put(params, function(err, data) {
    if (err) {
        console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
    }
});