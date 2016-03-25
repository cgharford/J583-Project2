var db = require('../config/db');

exports.list = function(req, res) {
    var collection = db.get().collection('users');

    // collection.remove({});

    collection.find({}).toArray(function(err, results) {
        res.render('user/list', {users: results});
    });
};

exports.show = function(req, res) {
    var collection = db.get().collection('users');
    req.params.id = encodeURIComponent(req.params.id);

    collection.find({"title": req.params.id}).limit(1).toArray(function(err, results) {
        res.render('user/show', {user: results[0]});
    });
};

exports.update = function(req, res) {
    var collection = db.get().collection('users');

    var titleDecoded = req.body.titleDecoded;
    var titleEncoded = encodeURIComponent(req.body.titleDecoded);
    var date = getCurrentDate();

    collection.updateOne(
        {titleDecoded: req.params.id},
        {
            $set: {
                title: titleEncoded,
                author: req.body.author,
                category: req.body.category,
                content: req.body.content,
                thumbnailImage: req.body.thumbnailImage,
                createdDate: date,
                titleDecoded: titleDecoded
            }
        }
    );

    res.redirect('/users/' + titleEncoded);
};

exports.form = function(req, res) {
    res.render('user/form');
}

exports.create = function(req, res) {
    var collection = db.get().collection('users');

    var titleEncoded = encodeURIComponent(req.body.title);
    var date = getCurrentDate();

    collection.insert({
        title: titleEncoded,
        author: req.body.author,
        category: req.body.category,
        content: req.body.content,
        thumbnailImage: req.body.thumbnailImage,
        createdDate: date,
        titleDecoded: req.body.title
    });

    res.redirect('/users');
};

exports.remove = function(req, res) {
    var collection = db.get().collection('users');

    collection.removeOne({
        titleDecoded: req.params.id
    });

    return res.redirect('/users');
};

getCurrentDate = function(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!

    var yyyy = today.getFullYear();
    if(dd<10){
        dd='0'+dd
    }
    if(mm<10){
        mm='0'+mm
    }
    var today = mm+'/'+dd+'/'+yyyy;
    return today;
}
