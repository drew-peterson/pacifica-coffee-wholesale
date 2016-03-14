'use strict';


var Coffee = require('../models/coffee.js');

var coffees = require('./coffees.json'); // test data

// open mongo shell with mongo + db has to be running

coffees.forEach(function(coffee){

	Coffee.find({'name': coffee.name}, function(err, coffees){
		if(!err && !coffees.length){
			Coffee.create({
				name: coffee.name,
				price: coffee.price,
				description: coffee.description,
				region: coffee.region,
				roast: coffee.roast,
				image: coffee.image
			});
		}
	});
})