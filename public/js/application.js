angular.module('pacificaApp',
  [
  'ngAnimate',
  'MainCtrl',
  'ui.router',
  'appRoutes',
  'NavCtrl'

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
angular.module('NavCtrl',[])

.controller('NavCtrl', function($scope){
	$scope.actve;
	$scope.hover

	$scope.checkNav = function(event){
		var el = document.getElementById('sideNav').classList;
		var h = $scope.hover;
		var a = $scope.active;
		var type = event.type

		if(type == 'mouseover'){
			// mouse over menu
			if(h){
				$scope.hover = false;
				$scope.active = true;
			}

		}else{
		// click event
		$scope.hover = false;

			// 
			if(!a){
				// close menu
				$scope.active = !$scope.active;
			}
		}

		// $scope.$watch('el', function(newValue, oldValue){
		// 	console.log('new: ' + newValue); 
		// 	console.log('old: ' + oldValue);
		// })

		console.log(el);
		console.log('active: ' + $scope.active);
		console.log('hover: ' + $scope.hover);
	}


})
angular.module('appRoutes', [])

.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home',{
      url: '/',
      templateUrl: '../views/home/home.html' 
    })
   .state('coffee',{
      url: '/coffee',
      templateUrl: '../views/coffee/coffee.html'  
    })
    .state('bag',{
      url: '/bag',
      templateUrl: '../views/bag/bag.html' 
    })
   

    // GoogleBot SEO
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');

});

//# sourceMappingURL=application.js.map
