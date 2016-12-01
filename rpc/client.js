
var amqp = require('amqp');
var connection = amqp.createConnection({host: 'MQLB-845752088.us-west-2.elb.amazonaws.com'
                                            , port: 5672
                                            , login: 'jay'
                                            , password: 'jay'
                                            , connectionTimeout: 10000
                                            , authMechanism: 'AMQPLAIN'
                                            , vhost: '/'
                                            , noDelay: true
                                            , ssl: { enabled : false }
                                        });

// var connection = amqp.createConnection({host:'127.0.0.1'});
var rpc = new (require('./amqprpc'))(connection);

//make request to rabbitmq
function make_request(queue_name, msg_payload, callback){
    console.log("inside client");

    rpc.makeRequest(queue_name, msg_payload, function(err, response){
        if(err)
            console.error(err);
        else{
            console.log("response", response);
            callback(null, response);
        }
    });
}





exports.make_request = make_request;
