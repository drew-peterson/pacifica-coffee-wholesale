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
    .state('items', {
      url: '/items',
      controller: 'PinterestCtrl',
      templateUrl: '../views/items/index.html'
    })
    .state('test', {
      url: '/test',
      controller: 'MainCtrl',
      templateUrl: '../views/test/index.html'
    });

  });
