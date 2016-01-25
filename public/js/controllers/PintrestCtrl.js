'use strict';

angular.module('Pinterest', [])

.controller('PinterestCtrl',function($http, $scope, pinterestService){

  $scope.pins = [];

  $scope.getBoard = function(){
    pinterestService.async()
    .then(function(data){
      console.log(data);
      $scope.pins = data;
    });
  };
})
