var Nightmare = require('nightmare');
var expect = require('chai').expect;

describe('Foster Me - parent user', function() {
  
    this.timeout(30000);

    it('should try to login as a wrong username', (done)=>{
        Nightmare({show: true})
        .goto('http://localhost:3000/')
        .wait('.email-login')
        .wait(1000 * 2)
        .type('.email-login', 'beatrice@gmail.com')
        .type('.password-login', 'beatricepassword')
        .click('.btn-login')
        .wait(1000 * 3)
        .then(()=>{
            done();
        });
    });

    it('should singup a foster parent to database then logout', (done)=>{
        Nightmare({show: true})
        .goto('http://localhost:3000/')
        .wait('.btn-parent')
        .wait(1000 * 2)
        .click('.btn-parent')
        .type('.name-signup', 'Amy Foster')
        .type('.email-signup', 'amy@gmail.com')
        .type('.password-signup', 'amypassword')
        .type('.address-signup', '9005 Red Branch Rd A, Columbia, MD 21045')
        .type('.phone-signup', '4107729677')
        .click('.btn-signup-parent')
        .wait('.btn-logout')
        .click('.btn-logout')
        .then(()=>{
            done();
        });
    });

    it('should log user in and try to change password and logout', (done)=>{
        Nightmare({show: true})
        .goto('http://localhost:3000/')
        .wait('.email-login')
        .wait(1000 * 2)
        .type('.email-login', 'amy@gmail.com')
        .type('.password-login', 'amypassword')
        .click('.btn-login')
        .wait('.password-new1')
        .wait(1000 * 2)
        .type('.password-new1', 'anewpassword')
        .type('.password-new2', 'awrongpassword')
        .click('.btn-save-password')
        .wait(1000 * 3)
        .click('.btn-logout')
        .then(()=>{
            done();
        });
    });

    it('should log user in and change password and logout', (done)=>{
        Nightmare({show: true})
        .goto('http://localhost:3000/')
        .wait('.email-login')
        .wait(1000 * 2)
        .type('.email-login', 'amy@gmail.com')
        .type('.password-login', 'amypassword')
        .click('.btn-login')
        .wait('.password-new1')
        .type('.password-new1', 'anewpassword')
        .type('.password-new2', 'anewpassword')
        .click('.btn-save-password')
        .wait(1000 * 3)
        .click('.btn-logout')
        .then(()=>{
            done();
        });
    });

    it('should log user in with the new password and logout', (done)=>{
        Nightmare({show: true})
        .goto('http://localhost:3000/')
        .wait('.email-login')
        .wait(1000 * 2)
        .type('.email-login', 'amy@gmail.com')
        .type('.password-login', 'anewpassword')
        .click('.btn-login')
        .then(()=>{
            done();
        });
    });

    it('should try to sign in with the old password or a wrong password', (done)=>{
        Nightmare({show: true})
        .goto('http://localhost:3000/')
        .wait('.email-login')
        .wait(1000 * 2)
        .type('.email-login', 'amy@gmail.com')
        .type('.password-login', 'amypassword')
        .click('.btn-login')
        .then(()=>{
            done();
        });
    });
});
