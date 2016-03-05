'use strict';

var mongoose = require('mongoose');
var URI = process.env.MONGOLAB_URI || 'mongodb://localhost/pacifica-coffee';

// set up mongo database run with mongod
mongoose.connect(URI, function(err){
	if(err){
		console.log("failed to log MongoDB");
		console.log(err);
	}else{
		console.log("drew -- MongoDB Running Successfully!"); 
	}
})