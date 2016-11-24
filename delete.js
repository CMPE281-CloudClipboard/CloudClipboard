var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-west-2",
   accessKeyId: 'AKIAIYGGV5YVEKAFYQQA',  // can omit access key and secret key 
  secretAccessKey: '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'
});

var docClient = new AWS.DynamoDB.DocumentClient();

var table = "Users";

var email = "jay@gmail.com";


var params = {
    TableName:table,
    Key:{
        "email": email
    }
    
};
console.log("email" + email);
console.log("Attempting a conditional delete...");
docClient.delete(params, function(err, data) {
    if (err) {
        console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
    }
});