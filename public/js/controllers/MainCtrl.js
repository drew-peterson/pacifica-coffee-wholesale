angular.module('MainCtrl', [])

.controller('MainCtrl',function($scope, $location){

  $scope.navC = '';
  if($location.$$path == '/about'){
    $scope.navC = "#E91E63";
  }

// if statements only work with $scope.watch() and the varible has to be changed in html
//$scope.watch('varName',function(newVal, OldVal){if(x){$scope.varName = 'test'}})

});