angular.module('CoffeeCtrl', [])

.controller('CoffeeCtrl', function($scope, itemsService){
	$scope.test = 'drew peterson' 

	// Get all Items
	itemsService.get().success(function(response){
		$scope.items = response; 
	});
});

