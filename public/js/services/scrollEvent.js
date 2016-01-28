'use strict';

angular.module('fasionistaApp')

.factory('scrollEvent', function(){

  return {
    getEl: function(className){
      var el =  dcoment.getElementByClassName(className).offset().top
      return el;
    }

  } // end of return
})