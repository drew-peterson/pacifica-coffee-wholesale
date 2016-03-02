angular.module('AdminCtrl')
.directive('adminSideMenu', function($animate){ 
	return {
		restrict: 'AE',
		scope: { 
			itemData: '=',
			saveItems: '=',
			triggers: '=',
		},
		templateUrl: "../../views/admin/adminSideMenu.html", 
		controller: function($scope){},
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