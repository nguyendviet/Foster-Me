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
                console.log(decoded);
                console.log('id got back: ' + decoded.id);

                // search for user id in database
                db.Parent.findAll({
                    where: {
                        id: decoded.id
                    }
                })
                .then((user)=>{
                    console.log(JSON.stringify(user));
                    console.log('\nuser name: ' + user[0].name);
                    var userName = user[0].name;
                    var userObj = {
                        name: userName
                    }
                    res.render('user', userObj);
                });
            });
        }
    });

    app.get('/error', (req, res)=>{
        res.render('error');
    });
};