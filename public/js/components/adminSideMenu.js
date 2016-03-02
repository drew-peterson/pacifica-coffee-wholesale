angular.module('AdminCtrl')
.directive('adminSideMenu', function(){
	return {
		restrict: 'AE',
		scope: { 
			itemData: '=',
			saveItems: '=',
			triggers: '='
		},
		templateUrl: "../../views/admin/adminSideMenu.html", 
		controller: function($scope){},
		link: function(scope, elem, attrs){
			var close = elem.find('.close');
			var outerEl = $('#admin .admin-card-wrapper')

			close.on('click', function(){
				outerEl.removeClass('showMenuActive');
			})
		},

	} // end of return
})