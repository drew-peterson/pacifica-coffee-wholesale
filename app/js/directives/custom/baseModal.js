angular.module('pacificaApp')
  .directive('modal', function($animate){
    return {
    	replace: true,
    	transclude: true, // allows parent child directives...
    	restrict: 'E',
    	link: function(scope, elem, attrs){
    		var modal = $('#nav .baseModal');
    		var mask = $('.baseModal .modalMask');

    		// mask
    		mask.on('click',function(){
    			closeModal();
    		});

    		// close btn
			$('.baseModal .close').on('click', function(){
				closeModal();
			});

			function closeModal(){
				scope.$apply(function(){
					$animate.removeClass(modal, 'show');
					$('body').css('overflow', 'initial');
				})
			};
    	},
    	templateUrl: 'views/components/baseModal.html'
    };
  }); 