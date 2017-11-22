const jwt = require('jsonwebtoken');
const db = require('../models');
const verify = require('./verify.js');

module.exports = (app)=>{
    app.get('/', (req, res)=>{
        res.render('index');
    });

    app.get('/user/:token', (req, res)=>{
        var token = req.params.token;

        // check if token exists
        if (!token) {
            res.status(401).redirect('/error');
        }
        else {
            // decode token
            jwt.verify(token, 'secret', (err, decoded)=>{
                if (err) throw err;
                console.log('\n====================\nuser-token decoded:\n');
                console.log('id decoded: ' + decoded.id);

                var userType = decoded.userType;

                // check the table where user belongs
                if (userType == 'parent') {
                    console.log('look for user in parent table');
                    db.Parent.findAll({
                        where: {
                            id: decoded.id
                        }
                    })
                    .then((parent)=>{
                        var parentId = parent[0].id;
                        var parentName = parent[0].name;
                        var userObj = {
                            userType: 'parent',
                            id: parentId,
                            name: parentName
                        }
                        res.render('user', userObj);
                    });
                }
                else {
                    console.log('look for user in shelter table');
                    db.Shelter.findAll({
                        where: {
                            id: decoded.id
                        }
                    })
                    .then((shelter)=>{
                        var shelterId = shelter[0].id;
                        var shelterName = shelter[0].name;
                        
                        var userObj = {
                            userType: 'shelter',
                            id: shelterId,
                            name: shelterName
                        }
                        res.render('user', userObj);
                    });
                }
            });
        }
    });

    app.get('/error', (req, res)=>{
        res.render('error');
    });

    app.get('/deleted', (req, res)=>{
        res.render('deleted');
    });
};