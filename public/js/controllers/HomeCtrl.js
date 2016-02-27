angular.module('HomeCtrl', [])

.controller('HomeCtrl', function($scope){
// Card vars ==============
	$scope.title;
	$scope.content;
	$scope.button;
	$scope.color;
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
		},
		replace: true,
		link: function(scope, elem, attr){
			// var editor = elem.find('#idHere')
			// editor.bind('keyup keydown, function({}))
		},
		templateUrl: "../../views/home/homeCard.html"
	}
})
