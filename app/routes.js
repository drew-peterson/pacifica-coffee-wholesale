'use strict';

var fs = require('fs');

module.exports = function(app){

  app.get('/api/items', function(req, res){
  	res.sendFile('items.json', {root: 'config'}) 
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

  app.get('*', function(req, res) {
    res.sendFile('index.html', {root: 'public'}); // load our public/index.html file
    // 'dist/public' -- for productions
  });

}
