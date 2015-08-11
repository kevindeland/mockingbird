
module.exports.countVowels = function(string) {
    
    var syllables = [];
    var tokens = string.split(' ');
    tokens.forEach(function(token) {
        if(isNumber(token[2])) {
            token = token.substring(0,2);
            
            if(isVowel(token)) {
                syllables.push(token);
            }
        }
           
           
    });

    return syllables;
    
};

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
