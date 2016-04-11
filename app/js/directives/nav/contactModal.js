angular.module('NavCtrl')
.directive('contactModal', function($animate){
	return {
		replace: true,
		restrict: 'E',
		templateUrl: 'views/nav/contactModal.html',
		link: function(scope, elem, attrs){

			var mask = $('.mask-overlay');

			$('.subNav.contact').on('click',function(){
				var modal = $('#nav .baseModal');
				var nav = $('#sideNav');


				scope.$apply(function(){
					$animate.addClass(modal, 'show');
					$animate.removeClass(mask, 'show');
					$animate.removeClass(nav, 'showSideNavM');
				})


				$('.baseModal .close').on('click', function(){
					
					$('body').css('overflow', 'initial');
					scope.$apply(function(){
						$animate.removeClass(modal, 'show');
					})
				})
				
			});
		}
	}  
})