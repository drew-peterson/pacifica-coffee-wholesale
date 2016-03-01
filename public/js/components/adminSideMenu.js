angular.module('AdminCtrl')
.directive('adminSideMenu', function(){
	return {
		replace: 'true',
		restrict: 'AE',
		scope: { 
			itemData: '='	
		},
		templateUrl: "../../views/admin/adminSideMenu.html", 
		controller: function($scope){},
		link: function(scope, elem, attrs){},

	} // end of return
})