var expect = require('chai').expect;
var RhymeFinder = require('../lib/rhymeFinder').RhymeFinder;

var RF = new RhymeFinder('MB.Pron');

describe('masculine', function() {
    
    it('should return an array of masculine rhymes', function(done) {
        
        RF.masculine('duck', function(err, res) {
            expect(err).to.be.null;
            console.log(res);
            expect(res).to.be.an('array');

            done();
        });
    });
});


describe('approximate', function() {
    
    it('should return an array', function(done) {
        
        RF.approximate('duck', function(err, res) {
            expect(err).to.be.null;
            console.log(res);
            expect(res).to.be.an('array');
        });
     
    });
});

