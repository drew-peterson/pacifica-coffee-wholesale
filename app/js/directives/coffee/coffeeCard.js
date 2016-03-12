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
		link: function(scope, elem, attrs){
			var btn = elem.find('button');

			btn.on('click',function(){
				var bag = $('#coffeeBag');
				var toggle = bag.hasClass('toggle');

				if(toggle){
					bag.addClass('bounce');

					setTimeout(function(){
						bag.removeClass('bounce');
					},600)
				}

			})
		},
		templateUrl: 'views/coffee/coffee-card.html'
	}
});
