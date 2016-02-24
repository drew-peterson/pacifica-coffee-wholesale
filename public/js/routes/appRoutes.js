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
