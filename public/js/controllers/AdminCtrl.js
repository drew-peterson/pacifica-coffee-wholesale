angular.module('AdminCtrl',[])

.service('itemsService', function($http){
	return {
		get: function(){
			return $http.get('api/items'); 
		},
		post: function(data){ 
			return $http.post('api/items' , JSON.stringify(data));
		}
	}
})
.controller('AdminCtrl', function(itemsService, $scope){ 
	
	$scope.items;
	$scope.test = [{name: 'drew'}]

	 // create watch function to load up new files when they change...

	// get all items in json file
	$scope.getItems = function(){
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
			'itemData': '=itemData',
			'updateItems': '=updateItems',
			'allItems': '=allItems' 
		},
		controller: function($scope){
			$scope.itemData;
			$scope.allItems;
			$scope.updateItems;
		},
		templateUrl: "../../views/admin/adminCard.html"

	}
})