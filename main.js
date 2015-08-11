var THIS_DB = process.argv[2];
if(!THIS_DB) {
    console.log('ERROR: please pass valid DB name');
    return;
}

var async = require('async');

var AlchemyAPI = require('alchemy-api');
var alchemy = new AlchemyAPI('e39bd83160377abbf87bb61156870bc47f30841e');

var sentences = require('./files/sentences').samples;
var keyStore = require('./data-access');


sentences.forEach(function(sentence) {
    
    async.waterfall([
        // Step 1... get sentence relations
        function(next) {
            alchemy.relations(sentence, {}, next);
        },
        
        function(alchemyRes, next) {
            
            if(!alchemyRes.relations) next('No relations found');
            
        },
        function(wat, next) {
            console.log(wat);
            next(null);
        }
        
        
    ], function(err, endResult) {
        if(err) {
            console.log('ERROR');
            console.log(err);
            return;
        }
        console.log(endResult);
        console.log('DONE');
    });
});

