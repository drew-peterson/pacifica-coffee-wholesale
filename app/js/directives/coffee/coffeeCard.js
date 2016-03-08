angular.module('CoffeeCtrl')

.directive('coffeeCard', function(){
	return {
		replace: true,
		restrict: 'AE',
		scope: true,
		controller: function(){
			this.test = "drew peterson" 
		},
		controllerAs: 'ctrl',
		bindToController: {
			item: '=',
			removeFromBag: '&',
			addToBag: '&' 
		},
		templateUrl: 'views/coffee/coffee-card.html'
	}
});
