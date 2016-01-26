'use strict';

angular.module('NavCtrl', [])

.controller('NavCtrl', function($scope, scrollService, $location){

  $scope.navC = '';

  $scope.navLinks = [
    {
      state:'about',
      navC: '#E91E63'
    },
      {
      state: 'items',
      navC: '#727272'
    },
    {
      state: 'consignment',
      navC: '#4CAF50'
    },
    {
      state: 'directions',
      navC: '#F8BBD0'
    }
  ];

  // toggle class
  $scope.mobileNav = function(event){
    // master toggle...
    $scope.navActive = !$scope.navActive;
    // get btn class
    var btn = event.srcElement.parentElement.className

    // disable enable scrolling
    if(!$scope.navActive || btn === 'home'){
      // scrollService.enableScroll(); // need to get better
    }else{
      // scrollService.disableScroll(); // ned to get better
    }
    if(btn === 'home' && $scope.navActive){
      $scope.navActive = !$scope.navActive;
    }
  } // end of mobile nav


  $scope.changeBackground = function(color){

    if(!$scope.navC){
      $scope.navC = '#E91E63' // clicked from home page or any page
    }else{
      $scope.navC = color || $scope.navC
    }
  }


  // check background @url and set color

  var currentUrl = $location.$$path;

  if(currentUrl === '/about'){
    $scope.navC = '#E91E63';

  }else if(currentUrl === '/consignment'){
    $scope.navC = '#4CAF50';

  }else if(currentUrl === '/directions'){
    $scope.navC = '#F8BBD0'
  }
}) // end of ctrl ===================



// custom directive ======================

// directive is not really needed but i wanted practice
.directive('mainNav', function(scrollService){
  // this functions like jquery you do not call this it just runs
  var openNav = function(scope, element, attrs){
    // jquery only works inside
    var btn = $('.nav-open');
    var dh = $('.dNav');

    // you could do btn clicks and stuch here....

  }; // end of link

  return {
    restrict: 'E',
    templateUrl: 'views/navigation/index.html',
    link: openNav
  };
});