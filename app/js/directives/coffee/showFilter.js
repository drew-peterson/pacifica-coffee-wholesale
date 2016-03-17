angular.module('CoffeeCtrl')
.directive('showFilter',function(){
	return {
		scope: true,
		restrict: 'A',
		link: function(scope, elem, attrs){
			var region = elem.find('.region');
			var roast = elem.find('.roast');
			var btns = elem.find('.filterBtn');

			region.on('click',function(event){
				var wrapper = $('.card-wrapper');
				var hasClass = $(this).hasClass('active')

				if(!hasClass){
					btns.removeClass('active');
					$(this).addClass('active'); 

					wrapper.fadeOut();
					$('.regionCards').fadeIn();
				}
			})

			roast.on('click',function(event){
				var wrapper = $('.card-wrapper');
				var hasClass = $(this).hasClass('active')
				if(!hasClass){
					btns.removeClass('active');
					$(this).addClass('active');

					wrapper.fadeOut();
					$('.roastCards').fadeIn();
				}
			})


		}
	}
})