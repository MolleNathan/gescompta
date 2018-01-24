const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
var mongoose = require('mongoose');

const app            = express();

const port = 8000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require('./app/routes')(app, {});
app.listen(port, function() {
    console.log('We are live on ' + port);
});

var db = mongoose.connection;
mongoose.connect('mongodb://localhost/gescompta');

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    'were connected!'
});