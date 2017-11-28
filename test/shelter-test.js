var Nightmare = require('nightmare');
var expect = require('chai').expect;

describe('Foster Me - shelter user', function() {
  
    this.timeout(30000);

    it('should signup an animal shelter then logout', (done)=>{
        Nightmare({show: true})
        .goto('http://localhost:3000/')
        .wait('.btn-shelter')
        .wait(1000 * 2)
        .click('.btn-shelter')
        .type('.name-signup', 'Meow Meow Hotel')
        .type('.email-signup', 'meow@mmhotel.com')
        .type('.password-signup', 'donotkillmeow')
        .type('.address-signup', '2112 18 St NW #1, Washington, DC 20009')
        .type('.phone-signup', '2026387470')
        .click('.btn-signup-shelter')
        .wait(1000 * 3)
        .wait('.btn-logout')
        .click('.btn-logout')
        .then(()=>{
            done();
        });
    });

    it('should login as an animal shelter then delete account', (done)=>{
        Nightmare({show: true})
        .goto('http://localhost:3000/')
        .wait('.email-login')
        .wait(1000 * 2)
        .type('.email-login', 'meow@mmhotel.com')
        .type('.password-login', 'donotkillmeow')
        .click('.btn-login')
        .wait('.btn-delete-account')
        .click('.btn-delete-account')
        .wait(1000 * 2)
        .click('.btn-cancel-delete-account')
        .wait(1000 * 2)
        .click('.btn-delete-account')
        .wait(1000 * 2)
        .click('.btn-confirm-delete-account')
        .then(()=>{
            done();
        });
    });
});
