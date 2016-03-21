var db = require('../config/db');

exports.list = function(req, res) {
    var collection = db.get().collection('users');

    collection.find({}).toArray(function(err, results) {
        res.render('user/list', {users: results});
    });
};

exports.show = function(req, res) {
    var collection = db.get().collection('users');

    collection.find({"title": req.params.id}).limit(1).toArray(function(err, results) {
        res.render('user/show', {user: results[0]});
    });
};

exports.update = function(req, res) {
    var collection = db.get().collection('users');

    //note about xss and sanitization
    collection.updateOne(
        {username: req.params.id},
        {
            $set: {
                title: req.body.title,
                author: req.body.author,
                category: req.body.category,
                content: req.body.content,
                thumbnailImage: req.body.thumbnailImage,
                createdDate: req.body.createdDate
            }
        }
    );

    res.redirect('/users');
};

exports.form = function(req, res) {
    res.render('user/form');
}

exports.create = function(req, res) {
    var collection = db.get().collection('users');

    //note about xss and sanitization
    collection.insert({
        title: req.body.title,
        author: req.body.author,
        category: req.body.category,
        content: req.body.content,
        thumbnailImage: req.body.thumbnailImage,
        createdDate: req.body.createdDate
    });

    res.redirect('/users');
};

exports.remove = function(req, res) {
    var collection = db.get().collection('users');

    //note about xss and sanitization
    collection.removeOne({
        username: req.params.id
    });

    return res.redirect('/users');
};
