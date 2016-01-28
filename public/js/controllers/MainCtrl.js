angular.module('MainCtrl', [])

.controller('MainCtrl',function(
  $scope,
  scrollEvent,
  $window
  ){


  // Scroll Event =============================

  var elements = {
    home: {},
    about: {},
    consignment: {},
    directions: {}

  }

  $scope.curPos = 0;

  $window.onscroll = function(){
    $scope.curPos = document.body.scrollTop
                    || document.documentElement.scrollTop
                    || 0;
    console.log("pos: " + $scope.curPos);
    $scope.$digest(); //

  };
  // =============================================


// if statements can also work with $scope.watch() and the varible has to be changed in html
//$scope.watch('varName',function(newVal, OldVal){if(x){$scope.varName = 'test'}})

});