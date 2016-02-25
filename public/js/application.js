angular.module('pacificaApp',
  [
  'ngAnimate',
  'MainCtrl',
  'ui.router',
  'appRoutes',

  ])


// Capitialize =========================
.filter('capitalize', function() {
    return function(input, all) {
      var reg = (all) ? /([^\W_]+[^\s-]*) */g : /([^\W_]+[^\s-]*)/;
      return (!!input) ? input.replace(reg, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}) : '';
    };
  });

// ========================================

angular.module('MainCtrl', [])

.controller('MainCtrl',function(
  $scope,
  $window
  ){


});
angular.module('appRoutes', [])

.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home',{
      url: '/',
      templateUrl: '../views/home/home.html' 
    })
   .state('coffee',{
      url: '/coffee',
      templateUrl: '../views/coffee/coffee.html'  
    })
    .state('bag',{
      url: '/bag',
      templateUrl: '../views/bag/bag.html' 
    })
   

    // GoogleBot SEO
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');

});

//# sourceMappingURL=application.js.map
