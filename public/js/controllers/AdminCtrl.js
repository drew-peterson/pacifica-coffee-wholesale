angular.module('AdminCtrl',[])

.controller('AdminCtrl', function(itemsService, $scope){ 
	
	$scope.items; // holds all the items...

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
		restrict: 'A', 
		replace: true, 
		scope: {
			'itemData': '=',
		},
		controller: function($scope){
		},
		templateUrl: "../../views/admin/adminCard.html"

	}
})




