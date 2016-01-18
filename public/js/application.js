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
    .state('state2', {
      url: '/test',
      controller: 'MainCtrl',
      template: "<h1>hello from state 2 </h1>"
    })

  })
//# sourceMappingURL=application.js.map
