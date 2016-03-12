
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
		}, 
		controllerAs: 'ctrl',
		bindToController: {
			item: '=',
			removeFromBag: '&'
		},
		link: function(scope, el, attrs){},
		templateUrl: "views/coffee/coffeeBagItem.html" 
	} 
});


// hide show menu.....


