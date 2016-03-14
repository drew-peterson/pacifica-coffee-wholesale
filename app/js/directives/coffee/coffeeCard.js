angular.module('CoffeeCtrl')

.directive('coffeeCard', function(){
	return {
		replace: true,
		restrict: 'AE',
		scope: true,
		controller: function(){
			var ctrl = this;

			ctrl.add = function(coffee){
				ctrl.addToBag({coffee:coffee});
			} 
		},
		controllerAs: 'ctrl',
		bindToController: {
			addToBag: '&'  
		},
		link: function(scope, elem, attrs){},
		templateUrl: 'views/coffee/coffee-card.html'
	}
});
