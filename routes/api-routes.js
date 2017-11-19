const db = require('../models');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = (app)=>{
    // sign up
    app.post('/signup', (req, res)=>{
        var password = req.body.password;

        bcrypt.hash(password, saltRounds, (err, hash)=>{
            if (err) throw err;
            
            db.Parent.create({
                name: req.body.name,
                email: req.body.email,
                password: hash,
                address: req.body.address,
                phone: req.body.phone,
                cat: req.body.cat,
                dog: req.body.dog
            })
            .then((result)=>{
                console.log('\n==============================\n');
                console.log(JSON.stringify(result));
                console.log('\nid got: ' + result.id);
                var newUserId = result.id;
                res.redirect('/user/' + newUserId);
            });
        });
    });

    // login
    app.post('/login', (req, res)=>{
        var password = req.body.password;

        db.Parent.findAll({
            where: {
                email: req.body.email
            }
        }).then((result)=>{
            
            if (result.length === 0) {
                return res.send('user not found');
            }
            else {
                var hash = result[0].password;

                bcrypt.compare(password, hash, (err, match)=>{
                    if (err) throw err;
                    if (!match) {
                        return res.send('wrong password');
                    }
                    else {
                        return res.send('welcome!');
                    }
                });
            }
        });
    });
};