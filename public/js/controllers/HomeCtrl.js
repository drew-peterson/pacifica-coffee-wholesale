angular.module('HomeCtrl', [])

.controller('HomeCtrl', function($scope){
	$scope.test = "drew peterson"
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