'use strict';

var Coffee = require('../models/coffee.js');

var coffees = [
	{
		"name": "French Roast",
		"price": "12",
		"description": "tastes good",
		"region": "europe",
		"roast": "City Roast"
	},
	{
		"name": "sumatra",
		"price": "13",
		"description": "africa",
		"region": "aftica",
		"roast": "City Roast" 
	}


]

coffees.forEach(function(coffee){

	Coffee.find({'name': coffee.name}, function(err, coffees){
		if(!err && !coffees.length){
			console.log('seed file ran!!!')
			Coffee.create({
				name: coffee.name,
				price: coffee.price,
				description: coffee.description,
				region: coffee.region,
				roast: coffee.roast,
			});
		}else {
			console.log("seed file not ran");
		};
	});
})