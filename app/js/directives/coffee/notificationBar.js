angular.module('CoffeeCtrl')
.service('nService',function(){
	return {
		notifications: undefined,
		addItem: function(notice){
			this.notifications = notice;
		}
	}
})
.directive('notificationBar',function($timeout, nService){
	return{
		scope: true,
		replace: true,
		controllerAs: 'ctrl',
		controller: function($scope){
			ctrl = this;
			ctrl.notification; // hold the updated notificatiton

			// pass vars between directives use service!!! this will watch for changes
			// $watch('nService.notifcations') way does not work....
			$scope.$watch(function(){
				return nService.notifications;
			},function(newVal){
				console.log(newVal)
				ctrl.notification = newVal;
			}, true); // true is important
		},
		link: function(scope,elem,attrs){},
		templateUrl: 'views/coffee/notificationBar.html'
	}
})