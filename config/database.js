'use strict';

var mongoose = require('mongoose');

// set up mongo database run with mongod
mongoose.connect('mongodb://localhost/pacifica-coffee', function(err){
	if(err){
		console.log("failed to log MongoDB");
		console.log(err);
	}else{
		console.log("drew -- MongoDB Running Successfully!");
	}
})