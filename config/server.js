var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var methodOverride = require('method-override');
var compression = require('compression');


app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(compression()); //gzip compression
app.use(require('prerender-node').set('prerenderToken', 'EDCiXmecUrcmqYK7hZ5M')); // prerender.io

var port = process.env.PORT || 3000;


app.use('/', express.static('public')); // add /dist/ for production

app.listen(port, function(){
	console.log("drew -- listening on node server port 3000");
}); 

// expose app
module.exports = app;

