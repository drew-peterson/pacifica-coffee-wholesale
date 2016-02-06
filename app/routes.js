'use strict';

module.exports = function(app){

  app.get('*', function(req, res) {
    res.sendFile('index.html', {root: '/public'}); // load our public/index.html file
  });
}
