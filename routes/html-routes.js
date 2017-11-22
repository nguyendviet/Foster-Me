const jwt = require('jsonwebtoken');
const db = require('../models');
const verify = require('./verify.js');

module.exports = (app)=>{
    app.get('/', (req, res)=>{
        res.render('index');
    });


    app.get('/user/:token', (req, res)=>{
        
        // console.log('request got: ' + req);
        // console.log('headers ' + JSON.stringify(req.headers));
        // console.log('\nnow this is the headers token: ' + req.headers.token);
        // console.log('request params: ' + JSON.stringify(req.params));
        // console.log('token: ' + req.params.token);

        // var token = req.headers.token;

        var token = req.params.token;

        // check if token exists
        if (!token) {
            // res.status(401).send({message: 'Unauthorised connection.'});
            res.status(401).redirect('/error');
        }
        else {
            // res.status(200).send({message: 'Welcome!'});
            // search database with the provided user id

            // decode token
            jwt.verify(token, 'secret', (err, decoded)=>{
                if (err) throw err;
                console.log('\n====================\nuser-token decoded:\n');
                console.log(decoded);
                console.log('id decoded: ' + decoded.id);
                console.log('email decoded: ' + decoded.email);

                // search for user id in parent table
                db.Parent.findAll({
                    where: {
                        email: decoded.email
                    }
                })
                .then((parent)=>{
                    // if cannot find in parent table
                    if (parent.length === 0) {
                        // find in shelter table
                        db.Shelter.findAll({
                            where: {
                                email: decoded.email
                            }
                        }).then((shelter)=>{
                            var shelterName = shelter[0].name;
                            var userObj = {
                                name: shelterName
                            }
                            res.render('user', userObj);
                        });
                    }
                    else {
                        console.log(JSON.stringify(parent));
                        console.log('\nuser name: ' + parent[0].name);
                        var parentName = parent[0].name;
                        var userObj = {
                            name: parentName
                        }
                        res.render('user', userObj);
                    }
                });
            });
        }
    });

    app.get('/error', (req, res)=>{
        res.render('error');
    });
};