angular.module('CoffeeCtrl', [])

.controller('CoffeeCtrl', function($scope, itemsService){
	$scope.test = 'drew peterson' 

	// Get all Items
	itemsService.get().success(function(response){
		$scope.items = response;
	});
}) // end of ctrl


// coffee card ========================== 
.directive('coffeeCard', function(){
	return {
		replace: true,
		restrict: 'A',
		scope: {
			test: '@'
		},
		controller: function($scope){
			// $scope.test = "reed peterson"
		},
		templateUrl: '../../views/coffee/coffee-card.html'
	}
})