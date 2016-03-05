var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var methodOverride = require('method-override');
var compression = require('compression');
var fs = require('fs');


app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var port = process.env.PORT || 3000;

// prerender.io
app.use(require('prerender-node').set('prerenderToken', 'EDCiXmecUrcmqYK7hZ5M'));

app.use(compression()); //gzip compression
app.use(express.static(__dirname + '/public')); // add /dist/ for production

// routes ==================================================
// require('./app/routes')(app); // configure our routes

app.listen(port);
console.log("drew -- listening on node server port 3000");

// expose app
module.exports = app;

