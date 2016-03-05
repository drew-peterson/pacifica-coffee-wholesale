'use strict';

var fs = require('fs');
var express = require('express');
var app = express();
var Coffee = require('../models/coffee.js');

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

// Post =========================================================
  app.post('/api/items', function(req,res){ 
    var data = req.body;                                             
    fs.writeFile('config/test.json', JSON.stringify(data, null, 4), function(err){
      if (err){
        console.error(err); 
      }
      res.json(data);
    })
  });

// PUT ===========================================================



// DELETE =========================================================

// TEST =========================================================
  app.post('/api/coffees', function(req, res){
    var coffee = req.body;
    console.log("post: " + coffee)
    Coffee.create({
      name: coffee.name,
      price: coffee.price,
      description: coffee.description,
      region: coffee.region,
      roast: coffee.roast
    }, function(err,coffees){
      if(err){
        res.status(500).json({message: err.message});
      }else {
        res.json({coffees: coffees, message: "Coffee Added"});
      }
    })
  })



  app.get('*', function(req, res) {
    res.sendFile('index.html', {root: 'public'}); // load our public/index.html file
    // 'dist/public' -- for productions
  });

}

