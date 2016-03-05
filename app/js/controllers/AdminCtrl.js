angular.module('AdminCtrl',[])

.controller('AdminCtrl', function(itemsService, $scope){  
	
	$scope.items; // holds all the items...

	// triggers for hidding and showing
	$scope.triggers = {
		showAdd: false,  
		showMenu: false
	}

	// GET ALL ITEMS ===========================================
  
	var getItems = function(){ 
		itemsService.get().success(function(data){
			console.log("get success");
			$scope.items = data.coffees;  
		})
		.error(function(data){
			console.log(' get error');  
		})
	}();
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
		controller: function($scope, itemsService){
			$scope.newItem = {
				name: 'Name',
				price: "Price",
				description: 'description',
				region: "region",
				roast: "roast"
			};
			// create new item
			$scope.addItem = function(){	
				var newItem = JSON.stringify($scope.newItem);

				itemsService.post(newItem).success(function(response){
					$scope.allData.unshift(response.coffees); // add to top of list;
				})
				.error(function(data){
					console.log(' post error');
				}) 
			}
		},
		templateUrl: '../../views/admin/addItem.html'
	}
})



