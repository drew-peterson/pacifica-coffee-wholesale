angular.module('AdminCtrl')
.directive('adminLogin',function(){
	return {
		scope: true,
		replace: true,
		controller: function(){
			login = this;

			login.admin = {
				username: 'username',
				password: 'password'
			}
		},
		bindToControler: {},
		templateUrl: 'views/admin/login.html'
	}
})