angular.module('AdminCtrl')
.directive('adminLogin',function(sessionService){
	return {
		scope: true,
		replace: true,
		controller: function($scope){
			loginCtrl = this;
			loginCtrl.test = "Drew Peterson"

			loginCtrl.admin = {
				username: '',
				password: '',
				loggedIn: sessionService.loggedIn
			};

			loginCtrl.login = function(){
				console.log('click')
				sessionService.login(loginCtrl.admin).success(function(response){

				sessionService.loggedIn = response.status;
				sessionService.userId = response.userId;

				}).error(function(error){
					console.log(error);
				})
			};
		},
		controllerAs: 'loginCtrl',
		bindToControler: {},
		templateUrl: 'views/admin/login.html'
	}
});