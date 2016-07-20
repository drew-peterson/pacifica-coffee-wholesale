
angular.module('CoffeeCtrl')

.directive('coffeeBagItem', function(){
	return { 
		scope:true,
		// replace: true,
		restrict: 'AE',
		controller: function(){
			var ctrl = this;

			ctrl.options = [
				{name: 1,value: 1},{name: 2,value: 2},{name: 3,value: 3},{name: 4,value: 4},{name: 5,value: 5},{name: 6,value: 6},{name: 7,value: 7},{name: 8,value: 8},{name: 9,value: 9},{name: 10,value: 10},{name: 15,value: 15},{name: 20,value: 20},
			]

			ctrl.remove = function(coffee){
				ctrl.removeFromBag({coffee:coffee}); // has to be object...
			}

			ctrl.update = function(coffee){
				ctrl.updateBag({coffee:coffee})
			}
		}, 
		controllerAs: 'ctrl',
		bindToController: {
			item: '=',
			removeFromBag: '&',
			updateBag: '&'
		},
		link: function(scope, el, attrs){},
		templateUrl: "views/coffee/coffeeBagItem.html" 
	} 
});


// hide show menu.....


