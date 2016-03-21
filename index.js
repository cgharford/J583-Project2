var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var db = require('./config/db');
var user = require('./controllers/user');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

app.get('/users', user.list); //list page

app.get('/user/new', user.form); //new action
app.post('/users', user.create); //new action

app.post('/users/:id', user.update); //edit action
app.get('/users/:id', user.show); //edit form

app.get('/users/delete/:id', user.remove); //delete action

db.connect('mongodb://localhost:27017/test', function(err) {
    console.log("MongoDB connected...");
    app.listen(3000, function() {
        console.log("Express started...");
    });
});
