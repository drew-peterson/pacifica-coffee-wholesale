angular.module('HomeCtrl').directive('videoHero', function(){ 
	return {
		restrict: 'AE', 
		replace: true,
		link: function(scope, elem, attr){ 

			// play video when it buffers
			var video = document.getElementById('bgvid');
			var chrome = navigator.appVersion.indexOf('Chrome');

			video.oncanplaythrough = function() { 
				video.play(); 
			};
				
		},
		templateUrl: "views/home/youtube.html" 
	}
}); 