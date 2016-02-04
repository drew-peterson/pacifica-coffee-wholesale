'use strict';

angular.module('Pinterest', [])

.controller('PinterestCtrl',function($scope, pinterestService, $window){

  // get all pins only once
  pinterestService.getBoard(function(pins){
    $scope.pins = pins;
    console.log($scope.pins)
  })


  // use pinterest url to redirect to pinterest page
  $scope.gotoPins = function(location){
    $window.open(location)
  }
}) // module


