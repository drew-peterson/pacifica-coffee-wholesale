angular.module('MainCtrl', [])

.controller('MainCtrl',function(
  $scope,
  scrollEvent,
  $window
  ){


  // Scroll Event =============================

   $scope.sEvent = {
    home: {},
    about: {},
    consignment: {
      col2: scrollEvent.getEl('#consignment .col-2'),
      col4: scrollEvent.getEl('#consignment .col-4')
    },
    directions: {}

  }

  // console.log('col-2: ' + $scope.sEvent.consignment.col2);

  $scope.curPos = 0;

  $window.onscroll = function(){
    $scope.curPos = document.body.scrollTop
                    || document.documentElement.scrollTop
                    || 0;
    // console.log("pos: " + $scope.curPos);
    $scope.$digest();

  };
  // =============================================


// if statements can also work with $scope.watch() and the varible has to be changed in html
//$scope.watch('varName',function(newVal, OldVal){if(x){$scope.varName = 'test'}})

});