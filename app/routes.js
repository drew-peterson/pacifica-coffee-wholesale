'use strict';

var fs = require('fs');

module.exports = function(app){

  app.get('/api/items', function(req, res){
  	console.log('get hit')
  	res.sendFile('items.json', {root: 'config'})
  });

  app.post('/api/items', function(req,res){
  	console.log('post hit')
  	var data = req.body                                             
  	
  	
 	fs.writeFile('config/test.json', data, function(err){
 		if (err){
 			console.error(err); 
 		}
 	})
  });

  app.get('*', function(req, res) {
  	console.log('all hit')
    res.sendFile('index.html', {root: 'public'}); // load our public/index.html file
    // 'dist/public' -- for productions
  });

}
