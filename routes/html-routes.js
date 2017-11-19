const db = require('../models');

module.exports = (app)=>{
    app.get('/', (req, res)=>{
        res.render('index');
    });

    app.get('/user/:id', (req, res)=>{
        var userInfo = {
            data: userName
        };
        res.render('user', userInfo);
    });
};