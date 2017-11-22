const db = require('../models');
const verify = require('./verify.js');

module.exports = (app)=>{
    app.get('/', (req, res)=>{
        res.render('index');
    });


    app.get('/user/:id:token', (req, res)=>{
        
        console.log('request got: ' + req);
        console.log('request params: ' + JSON.stringify(req.params));
        console.log('token: ' + req.params.token);

        db.Parent.findAll({
            where: {
                id: req.params.id
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
};