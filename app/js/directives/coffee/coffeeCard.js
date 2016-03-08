angular.module('CoffeeCtrl')

.directive('coffeeCard', function(){
	return {
		replace: true,
		restrict: 'AE',
		scope: true,
		controller: 'CoffeeCtrl',
		controllerAs: 'CC',
		bindToController: {
			item: '=',
			removeFromCart: '&',
			addToCart: '&' 
		},
		templateUrl: 'views/coffee/coffee-card.html'
	}
});