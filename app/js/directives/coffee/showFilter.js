angular.module('CoffeeCtrl')
.directive('showFilter',function(){
	return {
		scope: true,
		restrict: 'A',
		link: function(scope, elem, attrs){
			var btn = elem.find('h3');

			// btn.on('click',function(){
			// 	var card = elem.find('.coffee-card');
			// 	card.toggleClass('filter');
			// })
		}
	}
})