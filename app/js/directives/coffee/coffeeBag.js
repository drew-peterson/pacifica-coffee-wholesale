angular.module('CoffeeCtrl')

.directive('coffeeBag', function($document, $window){
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


			// remove BagBar when at bottom ==========
			
			var footer = $('#footer');
			var bar = $('#coffee .coffee-details');
				
			$document.on('scroll',function(){
				var footerHeight = footer.offset().top
				var windowHeight = $(window).height();
				var scroll = $document.scrollTop();
				var pos = footerHeight - scroll;
				var nBar = $('#notificationBar');

				if((pos + 100) <= windowHeight){
					bar.fadeOut();
					nBar.fadeOut()
				}else{
					bar.fadeIn();
					nBar.fadeIn()
				}
			})


		},
		templateUrl: "views/coffee/coffeeBag.html"
	} 
});