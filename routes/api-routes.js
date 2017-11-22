const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models');
const saltRounds = 10;

module.exports = (app)=>{
    // sign up - parent
    app.post('/signup/parent', (req, res)=>{

        console.log('\nemail submitted: ' + req.body.email);

        // look in database if email registered
        db.Parent.findAll({
            where: {
                email: req.body.email
            }
        })
        .then((result)=>{
            // if found matching email
            if (result.length !== 0) {
                return res.send({message: 'Email already registered.'});
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
                        console.log('\n==============================\n');
                        console.log(JSON.stringify(result));
                        console.log('\nid got: ' + result.id);

                        var token = jwt.sign({userType: 'parent', id: result.id}, 'secret', {expiresIn: '1h'});

                        res.redirect('/user/' + token);
        
                        // create login details
                        // var userInfo = {
                        //     email: result.email,
                        //     password: result.password
                        // };
        
                        // // send new user's info back to client side to login
                        // res.json(userInfo);
        
        
                        // var newUserId = result.id;
                        // var newUserName = result.name;
                        // var newUserEmail = result.email;
                        // var token = jwt.sign({id: newUserId, name: newUserName}, 'secret', {expiresIn: '1h'}); // replace key 'secret' later
                        
                        // res.status(200).send({auth: true, token: token});
                        // var id = result.id;
                        // res.redirect('/user/' + id);
                    });
                });
            }
        });
    });

    // sign up - shelter
    app.post('/signup/shelter', (req, res)=>{
        
        console.log('\nemail submitted: ' + req.body.email);

        // look in database if email registered
        db.Shelter.findAll({
            where: {
                email: req.body.email
            }
        })
        .then((result)=>{
            // if found matching email
            if (result.length !== 0) {
                return res.send({message: 'Email already registered.'});
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
                        console.log('\n==============================\n');
                        console.log(JSON.stringify(result));
                        console.log('\nid got: ' + result.id);

                        var token = jwt.sign({userType: 'shelter', id: result.id}, 'secret', {expiresIn: '1h'});

                        res.redirect('/user/' + token);
                    });
                });
            }
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
                        res.status(401).send({message: 'user not found'});
                    }
                    // if email registered as shelter
                    else {
                        var hash = shelter[0].password;
                        
                        // compare entered password with saved password
                        bcrypt.compare(password, hash, (err, match)=>{
                            if (err) throw err;
                            
                            if (!match) {
                                res.status(401).send({message: 'wrong password'});
                            }
                            else {
                                var id = shelter[0].id;
                                var name = shelter[0].name;
                                var token = jwt.sign({userType: 'shelter', id: id}, 'secret', {expiresIn: '1h'}); // replace key 'secret' later
                                
                                // send token to client side to have secure connection before redirect to user's page
                                res.status(200).send({auth: true, token: token, name: name});
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
                        res.status(401).send({message: 'wrong password'});
                    }
                    else {
                        var id = parent[0].id;
                        var name = parent[0].name;
                        var token = jwt.sign({userType: 'parent', id: id}, 'secret', {expiresIn: '1h'}); // replace key 'secret' later
                        
                        // send token to client side to have secure connection before redirect to user's page
                        res.status(200).send({auth: true, token: token, name: name});
                      
                        // return res.status(200).json({message: 'you have successfully logged in'});
                    }
                });
            }
        });
    });

    // user page
    // app.post('/user', (req, res)=>{
    //     // verify token
    //     // show user's page
    //     console.log(req.body.token);
    //     var token = req.body.token;
    //     jwt.verify(token, 'secret', (err, decoded)=>{
    //         if (err) throw err;
    //         console.log(decoded);
    //         console.log('id got back: ' + decoded.id);
    //         res.send({
    //             url:'/user/' + decoded.id,
    //             token: token
    //         });
    //     });
        
    // });

    // logout
    app.post('/logout', (req, res)=>{
        res.redirect('/');
    });

    // change password
    app.put('/user', (req, res)=>{

        var newPassword = req.body.password;

        bcrypt.hash(newPassword, saltRounds, (err, hash)=>{
            if (err) throw err;
            
        });

        db.Parent.update(req.body.password,{
            where: {
                email: req.body.email
            }
        })
        .then((parent)=>{
            if (parent === 0) {
                db.Shelter.destroy({
                    where: {
                        email: req.body.email
                    }
                })
                .then((shelter)=>{
                    console.log('shelter account deleted');
                    // res.redirect('/');
                    // res.send({message: 'shelter account deleted'});
                    res.redirect('/deleted');
                });
            }
            else {
                console.log('result from delete request: ' + parent);
                console.log('parent account deleted');
                // res.redirect('/');
                // res.send({message: 'parent account deleted'});
                res.redirect('/deleted');
            }
        });
    });

    // delete account
    app.delete('/user', (req, res)=>{
        var userType = req.body.userType;

        if (userType == 'parent') {
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