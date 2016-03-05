angular.module('NavCtrl',[])

.controller('NavCtrl', function($scope){
	$scope.actve;
	$scope.hover; 
})

.directive('toggleClass', function(){
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
	
			element.bind('click', function(){
				var isMobile = event.sourceCapabilities.firesTouchEvents;
				if(isMobile){
					
					$('#sideNav').removeClass('hover');
					$('#sideNav').toggleClass('active');	

					$('#main').on('click', function(){
						$('#sideNav').removeClass('hover');
						$('#sideNav').removeClass('active');

						// remove listner
						$(this).off()						
						
					})
				}
				
				
			});
		}
	}
});