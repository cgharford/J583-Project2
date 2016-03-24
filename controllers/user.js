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

    collection.find({"title": req.params.id}).limit(1).toArray(function(err, results) {
        res.render('user/show', {user: results[0]});
    });
};

exports.update = function(req, res) {
    var collection = db.get().collection('users');

    var date = getCurrentDate();

    collection.updateOne(
        {title: req.params.id},
        {
            $set: {
                title: req.body.title,
                author: req.body.author,
                category: req.body.category,
                content: req.body.content,
                thumbnailImage: req.body.thumbnailImage,
                createdDate: date
            }
        }
    );

    res.redirect('/users');
};

exports.form = function(req, res) {
    res.render('user/form');
}

exports.create = function(req, res) {
    // $('.error-alert').append("heyyy");
    // console.log($('#error-alert').css("color"));
    // var title = $('#title').val();
    // if (title == null || title == "") {
    //     // $('#error-alert').removeClass("hidden");
    //     return;
    // }
    console.log("req:" + req.body.title + "!")

    var collection = db.get().collection('users');

    var date = getCurrentDate();

    collection.insert({
        title: req.body.title,
        author: req.body.author,
        category: req.body.category,
        content: req.body.content,
        thumbnailImage: req.body.thumbnailImage,
        createdDate: date
    });

    res.redirect('/users');
};

exports.remove = function(req, res) {
    var collection = db.get().collection('users');

    collection.removeOne({
        title: req.params.id
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
    var today = dd+'/'+mm+'/'+yyyy;
    return today;
}
