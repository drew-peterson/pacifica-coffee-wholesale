'use strict';

var mongoose = require('mongoose');

var coffeeSchema = mongoose.Schema({
	name: String,
    price: Number,
    description: String,
    region: String,
    roast: String
});

var model = mongoose.model('Coffee', coffeeSchema);

module.exports = model;