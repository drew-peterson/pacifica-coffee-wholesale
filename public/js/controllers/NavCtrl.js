angular.module('NavCtrl', [])

.controller('NavCtrl', function($scope){
  $scope.navLinks = ['about', 'consignment', 'directions'];

  // toggle class
  $scope.mobileNav = function(){
    $scope.navActive = !$scope.navActive;
  }
})

// custom directive ======================
.directive('mainNav', function(){

  // this functions like jquery you do not call this it just runs
  var openNav = function(scope, element, attrs){
    // jquery only works inside
    var btn = $('.nav-open');
    var dh = $('.dNav');

    btn.on('click', function(){
      var mh = $('#mobileNav');

      if(mh.hasClass('openNav')){
        whiteDiv();
        disableScroll();
      }else{
        mh.css('background-color', '');
        whiteDiv();
        enableScroll();
      }
    }) // click


    var whiteDiv = function(){
      var mn = $('#mobileNav');
      var overlay = $('.header-overlay')

      if(overlay.hasClass('is-active')){
        overlay.removeClass('is-active');

      }else{
        overlay.addClass('is-active');
      }
    } // whitediv

    var disableScroll = function(){
      $('html, body').css(
        {
        'overflow': 'hidden',
        'height': '100%'
      });
    }
    var enableScroll = function(){
      $('html, body').css(
        {
       'overflow': 'auto',
       'height': 'auto'
       });
    }

  }; // end of link

  return {
    restrict: 'E',
    templateUrl: 'views/navigation/index.html',
    link: openNav
  };
});