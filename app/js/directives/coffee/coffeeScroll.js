angular.module('CoffeeCtrl')

.directive('scrollItem',function(){
	return {
		restrict: 'AE',
		controller: function(){},
		link: function(scope, elem, attrs){
			var btn = attrs.class;
			var idx = btn.indexOf('left');

			elem.on('click',function(){
				var first = $('.bagItem')[0]; // first item
				var margin= $(first).css('marginLeft').replace('px','');
				console.log('css margin: ' + margin);

				if(idx >= 0){
					marginLeft= (Number(margin) - 120);
					$(first).css('margin-left', marginLeft +'px');

					console.log("left: " + marginLeft);
				}else{
					if(margin != '0'){
						marginLeft= (Number(margin) + 120);
						$(first).css('margin-left', marginLeft +'px');

						console.log("right: " + marginLeft);
					}
				}
			}) // end of click
		}
	}
}) 