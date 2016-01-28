'use strict';

angular.module('fasionistaApp')

  // card
  .directive('cardInner',function(){
    return{
      controllerAs: 'cardCtrl',
      controller: function(){
        this.fullName = 'Drew Peterson';
      },
      // restrict: 'E',
      templateUrl: '/views/partials/_card.html'
    }
  })
