'use strict';

module.exports = function(app){

  app.get('*', function(req, res) {
    res.sendFile('index.html', {root: 'dist/public'}); // load our public/index.html file
    // 'dist/public' -- for productions
  });
}
