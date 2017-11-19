const db = require('../models');

module.exports = (app)=>{
    // add new parents
    app.post('/signup', (req, res)=>{
        db.Parent.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            address: req.body.address,
            phone: req.body.phone,
            cat: req.body.cat,
            dog: req.body.dog
        })
        .then((result)=>{
            console.log('\n==============================\n');
            console.log(JSON.stringify(result));
            console.log('\nid got: ' + result.id);
            var newUserId = result.id;
            res.redirect('/user/' + newUserId);
        });
    });
};