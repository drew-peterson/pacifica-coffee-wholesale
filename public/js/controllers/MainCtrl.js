angular.module('MainCtrl', [])

.controller('MainCtrl',function($scope, $location){


  $scope.directionImages = [
    {img: '/../img/sign1.jpeg',
    desc: 'Find the Sign'},
    {img: '/../img/sign2.jpeg',
    desc: 'Welcome'},
   {img:'/../img/parking1.jpeg',
    desc: 'Great Parking!'},
   {img:'/../img/parking2.jpeg',
    desc: 'Plently of open space'}
  ]

// if statements only work with $scope.watch() and the varible has to be changed in html
//$scope.watch('varName',function(newVal, OldVal){if(x){$scope.varName = 'test'}})

});