angular.module('NavCtrl')
.directive('contactModal', function($animate){
	return {
		replace: true,
		restrict: 'E',
		require: '^navigation', // bring in navigation directive
		templateUrl: 'views/nav/contactModal.html',
		controller: function($scope){
		},
		link: function(scope, elem, attrs, navigation){
			var mask = $('.mask-overlay');

			$('.subNav.contact').on('click',function(){
				var modal = $('#nav .baseModal');

				scope.$apply(function(){
					$animate.addClass(modal, 'show');
					// $animate.removeClass(mask, 'show');
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