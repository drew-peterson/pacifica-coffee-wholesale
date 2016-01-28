'use strict';

angular.module('fasionistaApp')

.factory('scrollEvent', function(){

  return {
    getEl: function(className){
      console.log('get element scroll')
      var el = $(className);

      if (el.length >= 1) {
        return el.offset().top -= 300;
      }
    }

  } // end of return
})