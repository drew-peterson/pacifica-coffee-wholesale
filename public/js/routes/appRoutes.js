angular.module('appRoutes', [])

.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('index', {
      url: '/',
      controller: 'MainCtrl',
      templateUrl: '../views/home/index.html',
      data: {
        tabIndex: 'tab0'
      }
    })
    .state('about', {
      url: '/about',
      controller: 'MainCtrl',
      templateUrl: "../views/about/index.html",
      data: {
        tabIndex: 'tab1'
      }
    })

  })
