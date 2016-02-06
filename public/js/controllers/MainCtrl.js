angular.module('MainCtrl', [])

.controller('MainCtrl',function(
  $scope,
  scrollEvent,
  $window
  ){


// direction images
  $scope.directionImages = [
    {img: '/../img/sign1.jpeg',
    desc: 'Find the Sign'},
    {img: '/../img/sign2.jpeg',
    desc: 'Welcome'},
   {img:'/../img/parking1.jpeg',
    desc: 'Great Parking!'},
   {img:'/../img/parking2.jpeg',
    desc: 'Plently of open space'}
  ];

  // Scroll Event =============================

   $scope.sEvent = {
    home: {},
    about: {},
    consignment: {
      col2: scrollEvent.getEl('#consignment .col-2'),
      col4: scrollEvent.getEl('#consignment .col-4')
    },
    directions: {
      imgs: scrollEvent.getEl('#directions .cardContainer')
    }

  }; //sEvent

  // Get scroll =================================
  $scope.curPos = 0;

  $window.onscroll = function(){
    $scope.curPos = document.body.scrollTop || document.documentElement.scrollTop || 0;
    // console.log("pos: " + $scope.curPos);
    $scope.$digest();

  };
  // =============================================


// if statements can also work with $scope.watch() and the varible has to be changed in html
//$scope.watch('varName',function(newVal, OldVal){if(x){$scope.varName = 'test'}})

});