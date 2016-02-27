'use strict';

module.exports = function(app){

  app.get('/api/items', function(req, res){
  	res.sendFile('items.json', {root: 'config'})
  });

  app.get('*', function(req, res) {
    res.sendFile('index.html', {root: 'public'}); // load our public/index.html file
    // 'dist/public' -- for productions
  });

}
