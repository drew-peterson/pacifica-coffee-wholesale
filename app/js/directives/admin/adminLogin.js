angular.module('AdminCtrl')
.directive('adminLogin',function(sessionService, $animate){
	return {
		scope: true,
		replace: true,
		controller: function($scope){
			loginCtrl = this;

			loginCtrl.admin = {
				username: '',
				password: '',
			};

			loginCtrl.login = function(){
				loginCtrl.message = "";
				sessionService.login(loginCtrl.admin).success(function(response){
					sessionService.loggedIn = response.status;
					sessionService.userId = response.userId;

					loginCtrl.message = response.message;
					
				}).error(function(error){
					console.log(error);
				})
			};
		},
		link: function(scope, elem, attrs){

			var message = elem.find('.message');
			scope.$watch('loginCtrl.message', function(newVal, oldVal){
				if(newVal){
					console.log('changed')
					$animate.addClass(message, 'activeMessage')
					.then(function() {
						$animate.removeClass(message, 'activeMessage hideMessage');
					});	
				}; // if
				
			}, true); // watch

		},
		controllerAs: 'loginCtrl',
		templateUrl: 'views/admin/login.html'
	}
});