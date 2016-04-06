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

// CREATE ADMINS
var Admin = require('../models/adminUser.js');
var bcrypt = require('bcrypt');
const saltRounds = 10;

var admins = [
	{
		'username': 'drewP',
		'password': 'peteand07'
	},
	{
		'username': 'gregG',
		'password': 'goBeavers'
	}
]

admins.forEach(function(newAdmin){

	Admin.findOne({username: newAdmin.username},function(err, user){
      if(!user){
        bcrypt.genSalt(saltRounds, function(err, salt) {
          bcrypt.hash(newAdmin.password, salt, function(err, hash) {
          // Store hash in your password DB.
            Admin.create({
              username: newAdmin.username,
              password: hash
              },function(err, admin){
              if(err){
                console.log(error, err);
              }
            });
          });
        }); // end of bcrypt
      } else {
       // user already exists
      }
    })
})
























