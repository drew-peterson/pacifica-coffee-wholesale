angular.module('NavCtrl',[])

.controller('NavCtrl', function($scope){


	$scope.openNav = function(){
		console.log('click')
		$scope.active = true;
	}
})