
var AlchemyAPI = require('alchemy-api');
var alchemy = new AlchemyAPI('e39bd83160377abbf87bb61156870bc47f30841e');


//var urls = require('../mockingbird/urls').urls;

var lines = require('../files/sentences').samples;

var keyStore = require('../data-access');
var rhymes = require('../rhymes');

/*
keyStore.getNounKeys(function(err, results) {
    console.log(results);
});
return;
*/

lines.forEach(function(url) {
    
    alchemy.relations(url, {}, function(err, response) {
        if(err) {
            console.log(err);
            return;
        }

//        console.log(response);

        if(!response.relations) {
            console.log('wtf', JSON.stringify(Object.keys(response)));
            return;
        }
        response.relations.forEach(function(relation) {
  //          console.log(relation);
            var subject = relation.subject.text;
            var tokens = subject.split(' ');
            
            if (!relation.action)
                return; // no action
            
            var action =  relation.action.lemmatized;
            var actionTokens = action.split(' ');
            action = actionTokens[actionTokens.length - 1];
            
            if(tokens.length >= 1) {
                console.log(subject, (action ? '----' + action : ''));
                
    /*            keyStore.updateNoun(subject, action, function(err, result) {
                    if(err) {console.log(err); return;}
                    console.log(result);
                });
      */      }
            
            //        console.log(relation.action);
        });
    });
});

// keywords, concepts
/*alchemy.entities('John Boehner and Barack Obama were hanging out', {knowledgeGraph: 1}, function(err, response) {
    
    if(err) {
        
        console.log(err);
        return;

    }
    response.entities.forEach(function(entity) {
        console.log(entity.knowledgeGraph);
    });
//    console.log(response);
});*/


