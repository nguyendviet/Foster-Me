const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models');
const saltRounds = 10;

module.exports = (app)=>{
    // sign up - parent
    app.post('/signup', (req, res)=>{
        var usertype = req.body.usertype;
        console.log('\n==================\nuser type sign up: ' + JSON.stringify(req.body));
        console.log('\n==========\nusertype: ' + usertype);

        // if user sign up as parent
        if (usertype == 'parent') {
            // look in database if email registered
            db.Parent.findAll({
                where: {
                    email: req.body.email
                }
            })
            .then((result)=>{
                // if found matching email
                if (result.length !== 0) {
                    res.send({message: 'Your email is already registered.'});
                }
                // if email not registered
                else {
                    var password = req.body.password;
                    
                    // encrypt password before saving
                    bcrypt.hash(password, saltRounds, (err, hash)=>{
                        if (err) throw err;
                        
                        // save user's info into database
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
                            var token = jwt.sign({usertype: 'parent', id: result.id}, 'secret', {expiresIn: '1h'});
                            // response with token
                            res.redirect('/user/' + token);
                        });
                    });
                }
            });
        }
        // if user sign up as shelter
        else {
            // look in database if email registered
            db.Shelter.findAll({
                where: {
                    email: req.body.email
                }
            })
            .then((result)=>{
                // if found matching email
                if (result.length !== 0) {
                    res.send({message: 'Your email is already registered.'});
                }
                // if email not registered
                else {
                    var password = req.body.password;
                    
                    // encrypt password before saving
                    bcrypt.hash(password, saltRounds, (err, hash)=>{
                        if (err) throw err;
                        
                        // save user's info into database
                        db.Shelter.create({
                            name: req.body.name,
                            email: req.body.email,
                            password: hash,
                            address: req.body.address,
                            phone: req.body.phone
                        })
                        .then((result)=>{
                            var token = jwt.sign({usertype: 'shelter', id: result.id}, 'secret', {expiresIn: '1h'});
                            // response with token
                            res.redirect('/user/' + token);
                        });
                    });
                }
            });
        }
    });

    // login
    app.post('/login', (req, res)=>{
        var password = req.body.password;

        // search parent table for entered email
        db.Parent.findAll({
            where: {
                email: req.body.email
            }
        })
        .then((parent)=>{
            // if email not registered as parent
            if (parent.length === 0) {
                // look in shelter table
                db.Shelter.findAll({
                    where: {
                        email: req.body.email
                    }
                }).then((shelter)=>{
                    // if email not registered as shelter also
                    if (shelter.length === 0) {
                        res.status(401).send({message: 'User not found.'});
                    }
                    // if email registered as shelter
                    else {
                        var hash = shelter[0].password;
                        
                        // compare entered password with saved password
                        bcrypt.compare(password, hash, (err, match)=>{
                            if (err) throw err;
                            
                            if (!match) {
                                res.status(401).send({message: 'Wrong password.'});
                            }
                            else {
                                var id = shelter[0].id;
                                var token = jwt.sign({usertype: 'shelter', id: id}, 'secret', {expiresIn: '1h'}); // replace key 'secret' later
                                
                                // send token to client side to have secure connection before redirect to user's page
                                res.status(200).send({auth: true, token: token});
                            }
                        });
                    }
                });
            }
            // if email registered as parent
            else {
                var hash = parent[0].password;

                // compare entered password with saved password
                bcrypt.compare(password, hash, (err, match)=>{
                    if (err) throw err;
                    
                    if (!match) {
                        res.status(401).send({message: 'Wrong password.'});
                    }
                    else {
                        var id = parent[0].id;
                        var token = jwt.sign({usertype: 'parent', id: id}, 'secret', {expiresIn: '1h'}); // replace key 'secret' later
                        
                        // send token to client side to have secure connection before redirect to user's page
                        res.status(200).send({auth: true, token: token});
                    }
                });
            }
        });
    });

    // logout
    app.post('/logout', (req, res)=>{
        res.redirect('/');
    });

    // change password
    app.put('/user', (req, res)=>{
        var usertype = req.body.usertype;
        var userId = req.body.id;
        var newPassword = req.body.password;

        // encrypt password
        bcrypt.hash(newPassword, saltRounds, (err, hash)=>{
            if (err) throw err;
            
            // save encrypted password to the right user
            if (usertype == 'parent') {
                db.Parent.update(
                    {
                        password: hash
                    }, {
                        where: {
                            id: userId
                        }
                    }
                )
                .then((parent)=>{
                    res.json(parent);
                });
            }
            else {
                db.Shelter.update(
                    {
                        password: hash
                    },{
                        where: {
                            id: userId
                        }
                    }
                )
                .then((shelter)=>{
                    res.json(shelter);
                })
            }
        });
    });

    // delete account
    app.delete('/user', (req, res)=>{
        var usertype = req.body.usertype;

        if (usertype == 'parent') {
            console.log('look in parent table to delete user');
            db.Parent.destroy({
                where: {
                    id: req.body.id
                }
            })
            .then((confirm)=>{
                res.json(confirm);
            })
        }
        else {
            console.log('look in shelter table to delete user');
            db.Shelter.destroy({
                where: {
                    id: req.body.id
                }
            })
            .then((confirm)=>{
                res.json(confirm);
            });
        }
    })
};