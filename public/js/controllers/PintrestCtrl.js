'use strict';

angular.module('Pinterest', [])

.controller('PinterestCtrl',function($scope, pinterestService, $window, dateService){

  var pinDate = dateService

  // get all pins only once
  // $scope.pins; // needed to access pins outside function...
  pinterestService.getBoard(function(pins){
    $scope.pins = pins;
  })

  // use pinterest url to redirect to pinterest page
  $scope.gotoPins = function(location){
    $window.open(location)
  }

// NEW ITEM TAG 1 WEEK
$scope.newItem = function(createdAt){
  var newItem = dateService.compareDate(createdAt);
  return newItem
}

}) // module


