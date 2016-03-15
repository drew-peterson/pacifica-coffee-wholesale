angular.module('CoffeeCtrl')

.directive('coffeeBag', function(){
	return {
		scope:true,
		replace: true,
		restrict: 'AE', 
		controller: function(){}, 
		controllerAs: 'ctrl',
		bindToController: {}, 
		link: function(scope, el, attrs){
			var open = $('.viewBag');
			var close = $('.bag-close-wrap');
			var bag = $('#coffeeBag');
			var mask = $('.coffeeMask');

			open.on('click', function(){
				console.log('open')
				bag.addClass('toggle');
				mask.addClass('mask-overlay');
			})

			close.on('click',function(){
				bag.removeClass('toggle');
				mask.removeClass('mask-overlay');
			})

			mask.on('click',function(){
				bag.removeClass('toggle');
				mask.removeClass('mask-overlay');
			})
		},
		templateUrl: "views/coffee/coffeeBag.html"
	} 
});