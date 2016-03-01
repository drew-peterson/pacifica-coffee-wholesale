angular.module('AdminCtrl')
.directive('adminSideMenu', function(){
	return {
		replace: 'true',
		restrict: 'AE',
		scope: { 
			itemData: '='	
		},
		templateUrl: "../../views/admin/adminSideMenu.js",
		controller: function($scope){
			$scope.showMenu;
		},
		link: function(scope, elem, attrs){},

	} // end of return
})