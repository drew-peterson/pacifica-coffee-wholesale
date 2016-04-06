angular.module('appRoutes', [])

.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home',{
      url: '/',
      templateUrl: '../views/home/home.html', 
      controller: 'HomeCtrl',
      controllerAs: 'home'
    })
   .state('coffee',{
      url: '/coffee',
      templateUrl: '../views/coffee/coffee.html',
      controllerAs: 'CC',
      controller: 'CoffeeCtrl'  
    })
    .state('bag',{
      url: '/bag',
      templateUrl: '../views/bag/bag.html',
      controllerAs: 'bag' 
    })
    .state('admin',{
      url: '/admin',
      templateUrl: '../views/admin/admin.html',
      controller: 'AdminCtrl',
      controllerAs: 'admin'
    })
   

    // GoogleBot SEO
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');
})

// Scroll to top on state change ==================================

.directive('scrollTopOnStateChange', function($rootScope){
  return {
    restict: 'A',
    link: function(scope, elem, attrs){
      // Scroll to top
      $rootScope.$on('$stateChangeSuccess', function() {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
      })
    }
  }
})
