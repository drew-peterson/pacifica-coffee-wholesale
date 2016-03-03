angular.module('HomeCtrl', []) 

.controller('HomeCtrl', function($scope){}) // end of controller

.directive('videoHero', function(){ 
	return {
		restrict: 'A',
		replace: true,
		scope: {},
		link: function(scope, elem, attr){ 

			// play video when it buffers
			var video = document.getElementById('bgvid');
			video.oncanplaythrough = function() {
				console.log('video playing');
    			video.play();
			};
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
