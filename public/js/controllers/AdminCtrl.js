angular.module('AdminCtrl',[])

.controller('AdminCtrl', function(itemsService, $scope){ 
	
	$scope.items; // holds all the items...

	// triggers for hidding and showing
	$scope.triggers = {
		showMenu: false,
		overlay: false
	}

	// get all items in json file
	var getItems = function(){ 
		itemsService.get().success(function(data){
			console.log("get success");
			$scope.items = data; 
		})
		.error(function(data){
			console.log(' get error');  
		})
	}();

	// write to json file
	$scope.saveItems = function(){ 
		itemsService.post($scope.items).success(function(response){
			console.log('Post success');
			console.log(response); 

			$scope.items = response;
		})
		.error(function(data){
			console.log(' post error');
		}) 
	}

})

.directive('itemCard', function(){
	return {
		restrict: 'AE', 
		replace: true, 
		scope: {
			'itemData': '=',
			'triggers': '=', 
			'saveItems': '=',
		},
		controller: function($scope){
		},
		link: function(scope, elem, attrs){},
		templateUrl: "../../views/admin/adminCard.html"

	}
})




