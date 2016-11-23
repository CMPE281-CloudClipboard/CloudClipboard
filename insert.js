var AWS = require("aws-sdk");
//var awsConfig = require("aws-config");

// awsConfig({
//   region: 'us-west-2',                  // explicitly set AWS region 
//   sslEnabled: true,                    // override whether SSL is enabled 
//   maxRetries: 3,                       // override the number of retries for a request 
//   accessKeyId: 'AKIAIYGGV5YVEKAFYQQA',  // can omit access key and secret key 
//   secretAccessKey: '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',   // if relying on a profile or IAM 
//   profile: 'default',             // name of profile from ~/.aws/credentials 
//   timeout: 15000                       // optional timeout in ms. Will use AWS_TIMEOUT 
// });

AWS.config.update({
  region: "us-west-2",
  accessKeyId: 'AKIAIYGGV5YVEKAFYQQA',  // can omit access key and secret key 
  secretAccessKey: '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'
 // endpoint: "arn:aws:dynamodb:us-west-2:823146787824:table/Users"
});
//AWS.config = awsConfig();
//var dynamo = new AWS.DynamoDB(awsConfig({timeout: 5000}));


var docClient = new AWS.DynamoDB.DocumentClient();

var table = "Users";

var email = "gaurav@gmail.com";
var first_name = "gaurav1";
var last_name = "chodwadia";
var password = "abcd123";

var params = {
    TableName:table,
    Item:{
        "email": email,
        "first_name": first_name,
        "last_name": last_name,
        "password": password
    }
};

console.log("Adding a new item...");
docClient.put(params, function(err, data) {
    if (err) {
        console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Added item:", JSON.stringify(data, null, 2));
    }
});