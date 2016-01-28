'use strict';

angular.module('fasionistaApp')

.factory('scrollEvent', function(){

  return {
    getEl: function(className){

      var el = $(className);

      if (el.length >= 1) {
        return el.offset().top -= 400;
      }
    }

  } // end of return
})