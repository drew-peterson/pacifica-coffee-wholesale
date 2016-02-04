'use strict';

angular.module('Pinterest', [])

.controller('PinterestCtrl',function($scope, pinterestService, $window, dateService){

  // get all pins only once
  $scope.pins; // needed to access pins outside function...
  pinterestService.getBoard(function(pins){
    $scope.pins = pins;
  })

  // use pinterest url to redirect to pinterest page
  $scope.gotoPins = function(location){
    $window.open(location)
  }


}) // module


