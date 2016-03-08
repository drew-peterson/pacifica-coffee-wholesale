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
				var margin = $(first).css('margin-left');
				var width = $(first).width();

				console.log(margin);
				if(idx >= 0){
					marginLeft= '-33.333%';
					$(first).css('margin-left', marginLeft);
				}else{
					marginLeft= '0%';
					$(first).css('margin-left', marginLeft);
				}


			})
		}
	}
}) 