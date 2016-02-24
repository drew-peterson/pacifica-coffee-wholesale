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
    .state('root',{
      url: '',
      abstract: true,
      views: {
        'nav': {
          templateUrl: '../views/nav/nav.html'
        },
        'footer': {
          templateUrl: '../views/footer/footer.html'
        }
      }
    })
    .state('root.home', {
      url: '/',
      views: {
        'container@': {
          templateUrl: '../views/home.html'
        }
      }
    })

    .state('root.about',{
      url: '/about',
      views: {
        'container@': {
          templateUrl: '../views/about/about.html'
        }
      }
    })
   

    // GoogleBot SEO
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');

});

//# sourceMappingURL=application.js.map
