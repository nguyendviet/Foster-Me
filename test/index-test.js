var Nightmare = require('nightmare');
var expect = require('chai').expect;

describe('Foster Me Homepage', function() {
  
    this.timeout(30000);

    it('should submit users details to database', (done)=>{
        Nightmare({show: true})
        .goto('http://localhost:3000/')
        .wait('.name-signup')
        .type('.name-signup', 'Nick Nightmare')
        .type('.email-signup', 'nick@nightm.are')
        .type('.password-signup', 'nickpassword')
        .type('.address-signup', '9005 Red Branch Rd A, Columbia, MD 21045')
        .type('.phone-signup', '4107729677')
        .click('.btn-signup')
        .then(function(title) {
            done();
        });
    });
});
