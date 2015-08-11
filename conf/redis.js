var redis = require('redis');
var credentials, client;
if(process.env.VCAP_SERVICES) {
    if(process.env['redis-2.6'])  {
	credentials = process.env['redis-2.6'][0].credentials;
	client = redis.createClient(credentials.port, credentials.host);
    }
    else 
	client = null

} else {
    client = redis.createClient();
}


module.exports.client = client;
