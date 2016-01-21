angular.module('MainCtrl', [])

.controller('MainCtrl',function($scope, $location){

  $scope.navC = '';
  if($location.$$path == '/about'){
    $scope.navC = "#E91E63";
  }

// if statements only work with $scope.watch() and the varible has to be changed in html
//$scope.watch('varName',function(newVal, OldVal){if(x){$scope.varName = 'test'}})

});
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
angular.module('fasionistaApp', ['NavCtrl','MainCtrl', 'ui.router', 'appRoutes'])


// Capitialize =========================
.filter('capitalize', function() {
    return function(input, all) {
      var reg = (all) ? /([^\W_]+[^\s-]*) */g : /([^\W_]+[^\s-]*)/;
      return (!!input) ? input.replace(reg, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}) : '';
    }
  });

// ========================================

angular.module('appRoutes', [])

.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('index', {
      url: '/',
      controller: 'MainCtrl',
      templateUrl: '../views/home/index.html',

    })
    .state('about', {
      url: '/about',
      controller: 'MainCtrl',
      templateUrl: "../views/about/index.html",

    })
    .state('consignment', {
      url: '/consignment',
      controller: 'MainCtrl',
      templateUrl: "../views/consignment/index.html",
    })
    .state('directions', {
      url: '/directions',
      controller: 'MainCtrl',
      templateUrl: "../views/directions/index.html",
    })

  })

angular.module('fasionistaApp')

.factory('scrollService', function(){
  return {
     disableScroll: function(){
      $('html, body').css(
        {
        'overflow': 'hidden',
        'height': '100%'
      });
    },
    enableScroll: function(){
      $('html, body').css(
        {
       'overflow': 'auto',
       'height': 'auto'
       });
    }
  }
})
//# sourceMappingURL=application.js.map
