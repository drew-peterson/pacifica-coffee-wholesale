angular.module('AdminCtrl',[])

.service('itemsService', function($http){
	return {
		get: function(){
			console.log('inside get')
			return $http.get('api/items'); 
		},
		post: function(data){
			var data = {
				name: 'drew peterson',
				price: '100'
			}
			console.log('data')
			return $http.post('api/items' , JSON.stringify(data));
		}
	}
})
.controller('AdminCtrl', function(itemsService, $scope){ 
	
	$scope.items;
	$scope.test = "drew peterson" 

	// get all items in json file
	itemsService.get().success(function(data){
		$scope.items = data; 
	})
	.error(function(data){
		console.log('error')
	})

	// write to json file
	var saveItems = function(){
		itemsService.post("drew peterson").success(function(response){
			console.log('success')
			console.log(respose);
		})
		.error(function(data){
			console.log('error')
		})
	}()

})

.directive('itemCard', function(){
	return {
		restrict: 'A', 
		replace: true, 
		scope: {
			'itemsData': '=itemsData'
		},
		controller: function($scope){
			$scope.itemsData
		},
		templateUrl: "../../views/admin/adminCard.html"

	}
})