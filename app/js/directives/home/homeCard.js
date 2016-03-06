angular.module('HomeCtrl').directive('homeCard', function(){
	return { 
		restrict: 'AE', 
		replace: true,
		scope: {
			'title': '@',
			'color': '@',
			'button': '@', 
			'content': '@',
			'image': '@',
			'textColor': '@', 
			'url': '@',  
		},
		templateUrl: "views/home/homeCard.html" 
	}
})