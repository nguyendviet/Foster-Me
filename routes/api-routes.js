const db = require('../models');

module.exports = (app)=>{
    // add new parents
    app.post('/signup', (req, res)=>{
        db.Parent.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            address: req.body.address,
            phone: req.body.phone
        })
        .then((result)=>{
            res.redirect('/');
        });
    });
};