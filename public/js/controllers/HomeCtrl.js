angular.module('HomeCtrl', [])

.controller('HomeCtrl', function($scope){
// Card vars ==============
	$scope.title;
	$scope.content;
	$scope.button;
	$scope.color;
	$scope.image;
// =======================
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
		},
		replace: true,
		link: function(scope, elem, attr){
			// var editor = elem.find('#idHere')
			// editor.bind('keyup keydown, function({}))
		},
		templateUrl: "../../views/home/homeCard.html"
	}
})
