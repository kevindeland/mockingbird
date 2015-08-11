
var pron = require('../data-access').getPron;
var vows = require('../lib/pronouncer').countVowels;

describe('eminem', function() {
    it('should do idk what', function(done) {
        
        var line = 'knees weak arms are heavy vomit on his sweater already moms spaghetti';

        line.split(' ').forEach(function(word) {
            
            pron(word, function(err, res) {
                console.log(res);
                var sylls = vows(res);
                console.log(sylls);

                done();
            });
        });
    });
});
