angular.module('NavCtrl',[])

.controller('NavCtrl', function($scope){
	$scope.actve;
	$scope.hover

	$scope.checkNav = function(event){
		var el = document.getElementById('sideNav').classList;
		var h = $scope.hover;
		var a = $scope.active;
		var type = event.type

		if(type == 'mouseover'){
			// mouse over menu
			if(h){
				$scope.hover = false;
				$scope.active = true;
			}

		}else{
		// click event
		$scope.hover = false;

			// 
			if(!a){
				// close menu
				$scope.active = !$scope.active;
			}
		}

		// $scope.$watch('el', function(newValue, oldValue){
		// 	console.log('new: ' + newValue); 
		// 	console.log('old: ' + oldValue);
		// })

		console.log(el);
		console.log('active: ' + $scope.active);
		console.log('hover: ' + $scope.hover);
	}


})