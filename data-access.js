var client = require('./conf/redis').client;
// ------------------------------------
// --------Noun Verb---------------------
// ------------------------------------

var getNounKeys = function(callback) {
    var search = nounKey('*');
    client.keys(search, callback);
}

var getNoun = function(noun, callback) {
    var key = nounKey(noun);
    client.get(key, callback);
}

var addNoun = function(noun, verb, callback) {
    var key = nounKey(noun);
    var val = JSON.stringify({
        rels: [verb],
        rhymes: []
    });
    client.set(key, val, callback);
}

var updateNoun = function(noun, verb, callback) {
    getNoun(noun, function(err, string) {
        if(err) callback(err);
        else if (string == null) {
            addNoun(noun, verb, callback);
        } else {
            var json = JSON.parse(string);
            json.rels.push(verb);
            var updateNoun = JSON.stringify(json);
            
            var key = nounKey(noun);
            client.set(key, updateNoun, callback);
        }
    });
}

var getPron = function(word, callback) {
    var key = pronKey(word);
//    console.log('ayy lmao');
    client.get(key, callback);
}

// ------------------------------------
// --------helpers---------------------
// ------------------------------------
function nounKey(noun) {return 'MB.Nouns.' + noun};
function verbKey(verb) {return 'MB.Verbs.' + verb};
function pronKey(word) {return 'MB.Pron.' + word.toUpperCase()};

function e(fun) { return function(err, res) { if(err) console.log(err); else fun(res) } };

// exports
module.exports = {
    getNounKeys: getNounKeys,
    getNoun: getNoun,
    addNoun: addNoun,
    updateNoun: updateNoun,
    getPron: getPron
}

return;
var subject = 'mockingbird';
addNoun(subject, 'sing', e(function(res) {
    console.log(res);
    updateNoun(subject, 'fly', e(function(res2) {
        console.log(res2);
        getNoun(subject, e(function(res3) {
            console.log(res3);
        }));
    }));
}));


return;
postNewNoun('mockingbird', 'sing', e(function(res) {
    
    getNoun('mockingbird', e(function(hey){
        console.log(hey);
    }));
}));

return;
client.get('MB.Test.x', function(err, val) {
    console.log(val);
    console.log(val.rels);
    
    var obj = JSON.parse(val);
    obj.rels.push('y');
    var json = JSON.stringify(obj);
    
    client.set('MB.Test.x', json, function(err, res) {
        console.log(err);
        console.log(res);
    });
});
return;

client.set('MB.Test.x', JSON.stringify(initialJSON), function(err, hi) {
    console.log(err);
    console.log(hi);
})


console.log(JSON.parse('{"rels": [], "rhymes": []}'));
return;

                  
