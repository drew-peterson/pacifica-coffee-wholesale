angular.module('AdminCtrl')
.directive('adminSideMenu', function($animate){ 
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
			var item = $scope.itemData;
			$scope.deleteItem = function(){
				var id = $scope.allData.indexOf(item);
				$scope.allData.splice(id, 1);
				// save
				$scope.saveItems();  
			}
		},
		link: function(scope, elem, attrs){
			var close = elem.find('.close');
			var menu = elem.parent();
			var overlay = $('.mask');

			// hide menu on close and overlay
			close.on('click', function(){ hideMenu(); })
			overlay.on('click', function(){ hideMenu() })

			function hideMenu(){
				scope.$apply(function(){
					$animate.removeClass(menu, 'showMenu');
				})
			}
		},

	} // end of return
})