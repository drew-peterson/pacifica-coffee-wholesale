angular.module('NavCtrl')
.directive('contactModal', function(){
	return {
		replace: true,
		restrict: 'E',
		templateUrl: 'views/nav/contactModal.html',
		link: function(scope, elem, attrs){

			$('.subNav.contact').on('click',function(){
				console.log('click')
			})
		}
	}  
})