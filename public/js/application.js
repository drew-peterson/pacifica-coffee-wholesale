angular.module('MainCtrl', [])

.controller('MainCtrl',function($scope){
  $scope.test = "hello this is a test";
  $scope.name = "reed Peterson";
});
angular.module('fasionistaApp', ['MainCtrl', 'ui.router'])

//# sourceMappingURL=application.js.map
