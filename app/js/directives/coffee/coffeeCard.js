angular.module('CoffeeCtrl').directive('coffeeCard', function(){
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
});