angular.module('HomeCtrl').directive('videoHero', function(){ 
	return {
		restrict: 'AE', 
		replace: true,
		link: function(scope, elem, attr){ 

			// play video when it buffers
			var video = document.getElementById('bgvid');
			var chrome = navigator.appVersion.indexOf('Chrome');

			// if Chrome Else
			// if(chrome >= 0){
			// 	video.addEventListener('canplay', function(){},false);
			// 	video.addEventListener('progress', function(){
			// 		// if(Math.round(video.buffered.end(0)) === 8){
			// 		// 	video.play(); 
			// 		// }else{
			// 		// 	console.log('buffering')
			// 		// }
			// 	});
			// 	// video.play();
			// }else{
				video.oncanplaythrough = function() { 
    				video.play(); 
				};
				
			// }
		},
		templateUrl: "views/home/youtube.html" 
	}
}); 