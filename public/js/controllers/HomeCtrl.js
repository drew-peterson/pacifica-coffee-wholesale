angular.module('HomeCtrl', []) 

.controller('HomeCtrl', function($scope){ 

// dynamic ui-sref ================= 

// doesnt work...
$scope.gotoState = function(url){
	console.log('goto State: ' + url)
	$state.go(url); 
}


})

.directive('videoHero', function(){ 
	return {
		restrict: 'A',
		replace: true,
		scope: {},
		link: function(scope, elem, attr){ 
			// var editor = elem.find('#idHere')
			// editor.bind('keyup keydown, function({}))
		},
		templateUrl: "../../views/home/youtube.html" 
	}
}) 

.directive('homeCard', function(){
	return { 
		restrict: 'A',
		scope: {
			'title': '@',
			'color': '@',
			'button': '@', 
			'content': '@',
			'image': '@',
			'textColor': '@', 
			'url': '@', 
		},
		replace: true,
		link: function(scope, elem, attr){
			// var editor = elem.find('#idHere')
			// editor.bind('keyup keydown, function({}))

		},
		controller: function($scope){

		},
		templateUrl: "../../views/home/homeCard.html"
	}
})
