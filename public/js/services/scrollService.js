'use strict';

angular.module('fasionistaApp')

.factory('scrollService',function(){
  return {
     disableScroll: function(){
      $('html, body').css(
        {
        'overflow': 'hidden',
        'height': '100%'
      });
    },
    enableScroll: function(){
      $('html, body').css(
        {
       'overflow': 'auto',
       'height': 'auto'
       });
    }
  }
})