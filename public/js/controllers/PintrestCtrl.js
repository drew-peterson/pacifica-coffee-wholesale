'use strict';

angular.module('Pinterest', [])

.controller('PinterestCtrl',function($http, $scope, pinterestService){

  $scope.pins;


  var getPins = function(){
    pinterestService.getBoard()
    .then(function(data){
      $scope.pins = data;
      console.log(data)
    });
  };

  // call function when page loads, angular way...
  $scope.$on('$viewContentLoaded', function(){

    // only hit api once unless page refresh...
    if( !$scope.pins){
      getPins();
    }

  });

})
