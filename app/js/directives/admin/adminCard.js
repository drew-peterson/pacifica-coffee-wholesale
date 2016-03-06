'use strict';

angular.module('AdminCtrl').directive('adminCard', function($animate){
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
		templateUrl: "views/admin/adminCard.html"
	}
})