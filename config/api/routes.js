'use strict';

var fs = require('fs');
var express = require('express');
var app = express();
var Coffee = require('../models/coffee.js');

// AUTH
var bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'oregon_beavers';

module.exports = function(app){

// GET =========================================================

  app.get('/api/coffees', function(req, res){
    Coffee.find({}, function(err,coffees){
      if(err){
        res.status(500).json({message: err.message});
      }else {
        res.json({coffees: coffees});
      }
    })
  })

// POST  =========================================================
 app.post('/api/coffees', function(req, res){
    var coffee = req.body;
    Coffee.create({
      name: coffee.name,
      price: coffee.price, 
      description: coffee.description,
      region: coffee.region,
      roast: coffee.roast,
      image: coffee.image
    }, function(err,coffees){
      if(err){
        res.status(500).json({message: err.message});
      }else {
        res.json({coffees: coffees, message: "Coffee Added"});
      };
    });
  });

// PUT =========================================================
app.put('/api/coffees/:id', function(req, res){
    var id = req.params.id; 
    var coffee = req.body;

    if(coffee && coffee._id !== id){ 
      res.status(500).json({err: "id does not match"})
    }
    Coffee.findByIdAndUpdate(id, coffee, {new: true}, function(err,coffee){
      if(err){
        res.status(500).json({message: err.message});
      }else {
        res.json({coffee: coffee, message: "Coffee updated"});
      };
    });
  });

// DELETE =========================================================
app.delete('/api/coffees/:id', function(req, res){
    var id = req.params.id; 

    Coffee.findByIdAndRemove(id, function(err,coffees){
      if(err){
        res.status(500).json({message: err.message});
      }else {
        res.json({message: "Coffee deleted"});
      };
    });
  });

// ADMIN =========================================================





 app.post('/admin/create', function(req, res){
    var newAdmin = req.body;


    bcrypt.genSalt(saltRounds, function(err, salt) {
      bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
     // Store hash in your password DB.
      });
    });

    Admin.create({
      username: newAdmin.username,
      password: newAdmin.password
    }, function(err,coffees){
      if(err){
        res.status(500).json({message: err.message});
      }else {
        res.json({coffees: coffees, message: "Coffee Added"});
      };
    });
  });
  



  app.get('*', function(req, res) {
    res.sendFile('index.html', {root: 'public'}); // load our public/index.html file
    // 'dist/public' -- for productions
  });

}

