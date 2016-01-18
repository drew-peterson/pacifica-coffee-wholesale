angular.module('appRoutes', [])

.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('index', {
      url: '/',
      controller: 'MainCtrl',
      templateUrl: '../views/home/index.html'
    })
    .state('state2', {
      url: '/test',
      controller: 'MainCtrl',
      template: "<h1>hello from state 2 </h1>"
    })

  })