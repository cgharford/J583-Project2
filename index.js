// External requirements and dependencies
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

// List page for posts
app.get('/users', user.list);
// Create a new post
app.post('/users', user.create);
// Edit individual post
app.post('/users/:id', user.update);
// View individual post
app.get('/users/:id', user.show);
// Delete a post
app.get('/users/delete/:id', user.remove);

// Connect to mongo db and listen on port 3000
db.connect('mongodb://localhost:27017/test', function(err) {
    console.log("MongoDB connected...");
    app.listen(3000, function() {
        console.log("Express started...");
    });
});
