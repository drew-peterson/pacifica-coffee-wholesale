angular.module('CoffeeCtrl')

.directive('coffeeCard', function(nService, $document){
	return {
		replace: true,
		restrict: 'AE',
		scope: true,
		controller: function(){
			var ctrl = this;

			ctrl.add = function(coffee){
				ctrl.addToBag({coffee:coffee});

				// notifcation
				nService.addItem( coffee.name + ' Added');
			} 
		},
		controllerAs: 'ctrl',
		bindToController: {
			addToBag: '&'   
		},
		link: function(scope, elem, attrs){
		},
		templateUrl: 'views/coffee/coffee-card.html'
	}
});
