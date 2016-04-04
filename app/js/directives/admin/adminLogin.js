angular.module('AdminCtrl')
.directive('adminLogin',function(sessionService){
	return {
		scope: true,
		replace: true,
		controller: function(){
			loginCtrl = this;

			loginCtrl.admin = {
				username: 'username',
				password: 'password'
			};

			loginCtrl.login = function(){
				sessionService.login().success(function(response){
					debugger
				})
			};
		},
		bindToControler: {},
		templateUrl: 'views/admin/login.html'
	}
});