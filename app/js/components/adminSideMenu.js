angular.module('AdminCtrl')
.directive('adminSideMenu', function($animate, itemsService){ 
	return {
		restrict: 'AE', 
		scope: { 
			itemData: '=', 
			saveItems: '=',
			triggers: '=',
			allData: '=' 
		}, 
		templateUrl: "../../views/admin/adminSideMenu.html", 
		controller: function($scope){
			var item = JSON.stringify($scope.itemData);
			var itemId = $scope.itemData._id;
			$scope.changed;

			//update Item =============================
			$scope.updateItem = function(){	
				if($scope.changed){
					itemsService.post(item, itemId).success(function(response){
						$scope.allData.push(response.coffees)
					}).error(function(response){
						console.log('update fail');
					})
				}
			}

			// Delete Item ============================
			$scope.deleteItem = function(){
				var id = $scope.allData.indexOf(item);

					$scope.allData.splice(id, 1);

				itemsService.delete(item, itemId).success(function(response){
					console.log('delete successful')
				}).error(function(response){
					console.log('delete fail')
				})
			}
		},
		link: function(scope, elem, attrs){
			var close = elem.find('.close');
			var remove = elem.find('.delete');
			var menu = elem.parent();
			var overlay = $('.mask');

			// hide menu on close and overlay
			close.on('click', function(){ hideMenu(); })
			remove.on('click', function(){ hideMenu(); })
			overlay.on('click', function(){ hideMenu() })

			function hideMenu(){
				scope.$apply(function(){
					$animate.removeClass(menu, 'showMenu');
				})
			}
		},

	} // end of return
})