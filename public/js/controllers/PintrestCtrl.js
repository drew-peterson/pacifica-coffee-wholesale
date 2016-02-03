'use strict';

angular.module('Pinterest', [])

.controller('PinterestCtrl',function($http, $scope, pinterestService, $window){

  // get all pins only once
  pinterestService.getBoard(function(pins){
    $scope.pins = pins;
  })

  // use pinterest url to redirect to pinterest page
  $scope.gotoPins = function(location){
    $window.open(location)
  }

// on state change && document has finnished loading
// normal jquery ready doesnt work...
angular.element(document).ready(function(){
  $scope.loaded = true;
});

})


