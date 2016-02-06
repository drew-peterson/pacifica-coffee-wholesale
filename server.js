var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var methodOverride = require('method-override');

var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/dist/public')); // add /dist/ for production

// routes ==================================================
require('./app/routes')(app); // configure our routes

app.listen(port);
console.log("drew -- listening on node server port 3000");

// expose app
exports = module.exports = app;

