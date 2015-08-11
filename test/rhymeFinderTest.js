var expect = require('chai').expect;

var db = 'MB.Test';
var RhymeFinder = require('../lib/rhymeFinder').RhymeFinder;
console.log(RhymeFinder);

describe('RhymeFinder', function() {

    var RF =  new RhymeFinder(db);
    console.log(RF);
    describe('#masculine', function(done) {

        
        RF.masculine('duck', function(err, rhymes) {
            expect(err).to.be.null;
            
            expect(rhymes).to.be.an('array');
            
            done();
        });
    });
});
