angular.module('AdminCtrl')
.directive('adminLogin',function(sessionService){
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
				console.log('click')
				sessionService.login(loginCtrl.admin).success(function(response){
					console.log(response)
					sessionService.loggedIn = response.status;
					sessionService.userId = response.userId;

					loginCtrl.message = response.message;

				}).error(function(error){
					console.log(error);
				})
			};
		},
		controllerAs: 'loginCtrl',
		templateUrl: 'views/admin/login.html'
	}
});