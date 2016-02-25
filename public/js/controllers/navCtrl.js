angular.module('NavCtrl',[])

.controller('NavCtrl', function($scope){
	$scope.actve;
	$scope.hover;
})

.directive('toggleClass', function(){
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			var body = $('body');

			element.bind('click', function(){
				var isMobile = event.sourceCapabilities.firesTouchEvents;
				if(isMobile){
					$('#sideNav').removeClass('hover');
					$('#sideNav').toggleClass('active');
				}
				
				
			});
		}
	}
});