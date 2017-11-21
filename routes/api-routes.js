const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models');
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
                var newUserName = result.name;
                var newUserEmail = result.email;
                var token = jwt.sign({id: newUserId, name: newUserName}, 'secret', {expiresIn: '1h'}); // replace key 'secret' later
                
                res.status(200).send({auth: true, token: token});
                // var id = result.id;
                // res.redirect('/user/' + id);
            });
        });
    });

    // login
    app.post('/login', (req, res)=>{
        var password = req.body.password;

        // search database for entered email
        db.Parent.findAll({
            where: {
                email: req.body.email
            }
        })
        .then((result)=>{
            
            // if email not registered
            if (result.length === 0) {
                return res.status(401).json({message: 'user not found'});
            }
            else {
                var hash = result[0].password;

                // compare entered password with saved password
                bcrypt.compare(password, hash, (err, match)=>{
                    if (err) throw err;
                    
                    if (!match) {
                        return res.status(401).json({message: 'wrong password'});
                    }
                    else {
                        var id = result[0].id;
                        var name = result[0].name;
                        var email = result[0].email;

                        var token = jwt.sign({id: id, name: name, email: email}, 'secret', {expiresIn: '1h'}); // replace key 'secret' later
                        
                        res.status(200).send({auth: true, token: token});
                      
                        // return res.status(200).json({message: 'you have successfully logged in'});
                    }
                });
            }
        });
    });

    // user page
    app.post('/user', (req, res)=>{
        // verify token
        // show user's page
        console.log(req.body.token);
        var token = req.body.token;
        jwt.verify(token, 'secret', (err, decoded)=>{
            if (err) throw err;
            console.log(decoded);
            console.log('id got back: ' + decoded.id);
        });
        res.redirect('/');
    });

    // log out
    app.post('/logout', (req, res)=>{
        res.status(200).send({auth: false, token: null});
    });
};