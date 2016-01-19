angular.module('MainCtrl', [])

.controller('MainCtrl',function($scope){
  $scope.test = "hello this is a test";
  $scope.name = "reed Peterson";
});
angular.module('fasionistaApp', ['MainCtrl', 'ui.router', 'appRoutes'])
angular.module('appRoutes', [])

.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('index', {
      url: '/',
      controller: 'MainCtrl',
      templateUrl: '../views/home/index.html'
    })
    .state('about', {
      url: '/about',
      controller: 'MainCtrl',
      templateUrl: "../views/about/index.html"
    })

  })
//# sourceMappingURL=application.js.map
