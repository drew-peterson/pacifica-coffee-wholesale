angular.module('AdminCtrl',[])

.service('itemsService', function($http){
	return {
		get: function(){
			console.log('inside get')
			return $http.get('api/items'); 
		}
	}
})
.controller('AdminCtrl', function(itemsService, $scope){ 
	
	$scope.items;
	$scope.test = "drew peterson"


	itemsService.get().success(function(data){
		$scope.items = data; 
	})
	.error(function(data){
		console.log('error' + data)
	})
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
		template: "<div>items: {{itemsData.name}} || {{itemsData.price}} </div>"

	}
})