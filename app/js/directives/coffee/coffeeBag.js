
angular.module('CoffeeCtrl')

.directive('coffeeBag', function(){
	return {
		scope:true,
		replace: true,
		restrict: 'AE',
		controller: function(){},
		controllerAs: 'ctrl',
		bindToController: {
			item: '=',
			removeFromBag: '&'
		},
		link: function(){},
		template: "<span ng-click='ctrl.removeFromBag(ctrl.item)'>{{ctrl.item.name}}</span>"
	}
});
