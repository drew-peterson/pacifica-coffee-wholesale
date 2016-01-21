angular.module('NavCtrl', [])

.controller('NavCtrl', function($scope, scrollService){
  $scope.navLinks = ['about', 'consignment', 'directions'];

  // toggle class
  $scope.mobileNav = function(){
    $scope.navActive = !$scope.navActive;
  }

})

// custom directive ======================

// directive is not really needed but i wanted practice
.directive('mainNav', function(scrollService){
  // this functions like jquery you do not call this it just runs
  var openNav = function(scope, element, attrs){
    // jquery only works inside
    var btn = $('.nav-open');
    var dh = $('.dNav');

    btn.on('click', function(){
      var mh = $('#mobileNav');

      if(mh.hasClass('openNav')){
        scrollService.disableScroll();
      }else{
        mh.css('background-color', '');
        scrollService.enableScroll();
      }
    }) // click

  }; // end of link

  return {
    restrict: 'E',
    templateUrl: 'views/navigation/index.html',
    link: openNav
  };
});