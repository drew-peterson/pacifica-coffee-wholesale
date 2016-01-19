angular.module('MainCtrl', [])

.controller('MainCtrl',function($scope, $location){

  $scope.navC = '';
  if($location.$$path == '/about'){
    $scope.navC = "#C2185B";
  }

// if statements only work with $scope.watch() and the varible has to be changed in html
//$scope.watch('varName',function(newVal, OldVal){if(x){$scope.varName = 'test'}})

});
angular.module('fasionistaApp', ['MainCtrl', 'ui.router', 'appRoutes'])

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

//# sourceMappingURL=application.js.map
