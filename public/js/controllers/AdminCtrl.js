angular.module('AdminCtrl',[])

.controller('AdminCtrl', function(itemsService, $scope){ 
	
	$scope.items; // holds all the items...

	// triggers for hidding and showing
	$scope.triggers = {
		showAdd: false, 
		showMenu: false
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

.directive('itemCard', function($animate){
	return {
		restrict: 'AE', 
		replace: true, 
		scope: {
			'itemData': '=',
			'triggers': '=', 
			'saveItems': '=',
			'allData': '='
		},
		controller: function($scope){},
		link: function(scope, elem, attrs){
			var openBtn = elem.find('#adminShowMenu');
			var menu = elem.find('.admin-push-menu');

			// open menu -- close menu is in adminsideMenu.js
			openBtn.on('click', function(){
				scope.$apply(function(){
					$animate.addClass(menu, 'showMenu');
				})
			})
		},
		templateUrl: "../../views/admin/adminCard.html"
	}
})

// add new item
.directive('addItem', function(){
	return {
		restrict: 'AE',
		replace: true,
		scope: {
			triggers: '=',
			allData: '=',
			saveItems:'='
		},
		controller: function($scope){
			$scope.newItem = {
				name: 'Name',
				price: "Price",
				description: 'description'
			};

			$scope.addItem = function(){
				$scope.allData.push($scope.newItem)
				$scope.saveItems();
			}
		},
		templateUrl: '../../views/admin/addItem.html'
	}
})




