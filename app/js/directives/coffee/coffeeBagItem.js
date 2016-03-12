
angular.module('CoffeeCtrl')

.directive('coffeeBagItem', function(){
	return { 
		scope:true,
		replace: true,
		restrict: 'AE',
		controller: function(){
			var ctrl = this;

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


