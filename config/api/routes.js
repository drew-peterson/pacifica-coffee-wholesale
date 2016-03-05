'use strict';

var fs = require('fs');
var express = require('express');
var app = express();
var Coffee = require('../models/coffee.js');

module.exports = function(app){

// GET =========================================================
  app.get('/api/items', function(req, res){
    res.sendFile('test.json', {root: 'config'}) 
  });

  app.post('/api/items', function(req,res){
    var data = req.body;                                             
  fs.writeFile('config/test.json', JSON.stringify(data, null, 4), function(err){
    if (err){
      console.error(err); 
    }
    res.json(data);
  })
  });
// TEST =========================================================

app.get('/api/coffee', function(req, res){
  Coffee.find({}, function(err,coffees){
    if(err){
      res.status(500).json({message: err.message});
    }else {
      res.json({coffees: coffees});
    }
  })
})

  app.get('*', function(req, res) {
    res.sendFile('index.html', {root: 'public'}); // load our public/index.html file
    // 'dist/public' -- for productions
  });

}

