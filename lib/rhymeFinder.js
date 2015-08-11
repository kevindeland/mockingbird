
var data = require('../data-access');
var client = require('../conf/redis').client;

function RhymeFinder(db) {
    this.db = db;
}

var removeNumbers = false;

/**
 * find all masculine rhymes 
 * duck, truck, muck, fuck, etc
 */
RhymeFinder.prototype.masculine = function(word, callback) {
    var self = this;
    console.log('finding masculine rhymes for', word);
    
    var key =  'MB.Pron.' + word.toUpperCase();
    console.log(key);

    data.getPron(word, function(err, pron) {
        if(err) {
            console.log(err);
            callback(err);
            return;
        }
        console.log('wtf');
        console.log(pron);
            
        // split into syllables
        var sylls = pron.split(' ');
        console.log(sylls);
        // start on last symbol
        var index = sylls.length - 1;
        var rhymeRegex = self.db + '.*';
        var endRhyme = '';
        var done = false;
        
        while(!done && index > -1) {
            var syll = sylls[index];
            console.log(syll);
            
            
            if(isNumber(syll[2])) {
                var syllNoAccent = syll.substring(0,2);
                if(removeNumbers) {
                    syll = syllNoAccent
                }

                if(isVowel(syllNoAccent)) {
                    done = true;
                }
            }
            endRhyme = '.' + syll + endRhyme;
            index--;
        }
        console.log(endRhyme);
        rhymeRegex += endRhyme;
        console.log(rhymeRegex);
        
        // once you get the keys, get their associated words
        client.keys(rhymeRegex, function(err, keys) {
            
            if(err) {
                console.log(err);
                return;
            } else if(keys.length == 0) {
                callback(null, [])
                return;
            }

            console.log(keys);
            var rhymingWords = [];
            keys.forEach(function(key) {
                client.get(key, function(err, word) {
                    rhymingWords.push(word);
                    console.log(rhymingWords.length + '/' + keys.length);
                    if(rhymingWords.length == keys.length) 
                        callback(null, rhymingWords);
                });
            });
                
        });
    });
};

/**
 * approximate rhymes, i.e. last syllable
 * FIXME doesn't match quite right
 */
RhymeFinder.prototype.approximate = function(word, callback) {
    var self = this;
    console.log('finding approximate rhymes for', word);
    
    var key =  'MB.Pron.' + word.toUpperCase();
//    console.log(key);

    data.getPron(word, function(err, pron) {
        if(err) {
//            console.log(err);
            callback(err);
            return;
        }
//        console.log('wtf');
//        console.log(pron);
            
        // split into syllables
        var sylls = pron.split(' ');
//        console.log(sylls);
        // start on last symbol
        var index = sylls.length - 1;
        var rhymeRegex = self.db + '.*';
        var endRhyme = '';
        var done = false;
        
        while(!done && index > -1) {
            var syll = sylls[index];
//            console.log(syll);
            
            
            if(isNumber(syll[2])) {
                var syllNoAccent = syll.substring(0,2);
                if(removeNumbers) {
                    syll = syllNoAccent
                }

                if(isVowel(syllNoAccent)) {
                    done = true;
                    endRhyme = '.' + syll + '*';
                }
            }
            index--;
        }
//        console.log(endRhyme);
        rhymeRegex += endRhyme;
//        console.log(rhymeRegex);
        
        // once you get the keys, get their associated words
        client.keys(rhymeRegex, function(err, keys) {
            
            var rhymingWords = [];
            keys.forEach(function(key) {
                client.get(key, function(err, word) {
                    rhymingWords.push(word);
                    if(rhymingWords.length == keys.length) 
                        callback(null, rhymingWords);
                });
            });
                
        });
    });
};


module.exports = {
    RhymeFinder: RhymeFinder
}

function isNumber(sym) {
    return sym == '0' || sym == '1' || sym == '2';
}

function isVowel(syll) {
    return phones[syll] == 'vowel';
}

var phones = {
    'AA':	'vowel',
    'AE':	'vowel',
    'AH':	'vowel',
    'AO':	'vowel',
    'AW':	'vowel',
    'AY':	'vowel',
    'B':	'stop',
    'CH':	'affricate',
    'D':	'stop',
    'DH':	'fricative',
    'EH':	'vowel',
    'ER':	'vowel',
    'EY':	'vowel',
    'F':	'fricative',
    'G':	'stop',
    'HH':	'aspirate',
    'IH':	'vowel',
    'IY':	'vowel',
    'JH':	'affricate',
    'K':	'stop',
    'L':	'liquid',
    'M':	'nasal',
    'N':	'nasal',
    'NG':	'nasal',
    'OW':	'vowel',
    'OY':	'vowel',
    'P':	'stop',
    'R':	'liquid',
    'S':	'fricative',
    'SH':	'fricative',
    'T':	'stop',
    'TH':	'fricative',
    'UH':	'vowel',
    'UW':	'vowel',
    'V':	'fricative',
    'W':	'semivowel',
    'Y':	'semivowel',
    'Z':	'fricative',
    'ZH':	'fricative'
}
