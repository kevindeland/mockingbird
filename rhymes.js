/**
 * This file is for accessing the RHYME API, which is no longer needed
 */

var request = require('request');

var rhymes = function(word, callback) {

    var params = {
        url : 'http://rhymebrain.com/talk?function=getRhymes',
        method: 'GET'
    }
    params.url += '&word=' + word;

    request(params, function(err, res, rhymes) {
        if(err) {
            console.log(err);
            callback(err);
            return;
        }
        
        callback(null, rhymes);
    });
};

var info = function(word, callback) {

    var params = {
        url : 'http://rhymebrain.com/talk?function=getWordInfo',
        method: 'GET'
    }
    params.url += '&word=' + word;

    request(params, function(err, res, info) {
        if(err) {
            console.log(err);
            callback(err);
            return;
        }
        
        callback(null, info);
    });
};

var rhymes = [
    'king', 'ring', 'bring', 'sting', 'luck', 'pluck', 'duck', 'suck', 'muck', 'rich', 'switch', 'snitch', 'glitch', 'batch', 'match', 'hatch', 'stock', 'lock', 'flock', 'spree', 'tree', 'freeh', 'night', 'tight', 'flight', 'redneck'
]

var rapgod = 'laptop in back pocket half-cock it fat knot rap profit';
var pools = 'vibe eyes arrives capitalize advice';

rapgod.split(' ').forEach(function(gat) {
    
    info(gat, function(err, info) {
        var json = JSON.parse(info);
        console.log(json.word, '---', json.pron);
    });

});
return;
rhymes('king', function(err, words) {
    var json = JSON.parse(words);
    json.forEach(function(word) {
        console.log(word.word);
    });
});

module.exports = {
    getRhymes: rhymes
}
