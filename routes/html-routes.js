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

                var userType = decoded.userType;

                // user is a parent
                if (userType == 'parent') {
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
                // user is a shelter
                else {
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