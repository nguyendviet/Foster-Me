const db = require('../models');

module.exports = (app)=>{
    app.get('/', (req, res)=>{
        res.render('index');
    });

    app.get('/user/:id', (req, res)=>{
        db.Parent.findAll({
            where: {
                id: req.params.id
            }
        }).then((user)=>{
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