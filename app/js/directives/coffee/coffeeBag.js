angular.module('CoffeeCtrl')

.directive('coffeeBag', function(){
	return {
		scope:true,
		replace: true,
		restrict: 'AE', 
		controller: function(){}, 
		controllerAs: 'ctrl',
		bindToController: {}, 
		link: function(scope, el, attrs){},
		templateUrl: "views/coffee/coffeeBag.html"
	} 
});