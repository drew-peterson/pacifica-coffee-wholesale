'use strict';

var mongoose = require('mongoose');

var adminSchema = mongoose.Schema({
	username: String,
	password: String
});

var model = mongoose.model('Admin', adminSchema);
module.exports = model;
