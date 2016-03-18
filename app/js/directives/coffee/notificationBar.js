angular.module('CoffeeCtrl')
.directive('notificationBar',function($timeout){
	return{
		scope:true,
		replace: true,
		link: function(scope,elem,attrs){

			// item updated ========
			$('#coffeeBag').on('change', 'select', function(){
				elem.addClass('showNotification');
				elem.find('.update').show();
				$timeout(function() {
					elem.removeClass('showNotification');
					elem.find('.update').hide();
				}, 2000);
			})



			// how show adde item =================
			$('.card-wrapper').on('click','.coffee-card .add', function(){

				elem.addClass('showNotification');
				elem.find('.add').show();
				$timeout(function() {
					elem.removeClass('showNotification');
					elem.find('.add').hide();
				}, 2000);
			});
		},
		templateUrl: 'views/coffee/notificationBar.html'
	}
})