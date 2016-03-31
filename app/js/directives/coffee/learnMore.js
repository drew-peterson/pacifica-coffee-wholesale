angular.module('CoffeeCtrl')

// learn More Parent Directive
.directive('learnMore',function(){
	return {
		scope: true,
		bindToController: {
			roast: '&'
		},
		controllerAs: 'ctrl',
		controller: function(){}, 
		link: function(scope,elem, attrs){

			var btn = $('.lmBtn');
			btn.on('click', 'h4', function(){
				$('.learnMoreModal').css('visibility', 'visible')

				$('body').css('overflow','hidden');
			})


			// close click....
			$('.learnMoreModalWrap').on('click', '.close', function(){
				$('.learnMoreModal').css('visibility', 'hidden')

				$('body').css('overflow','initial');
			})

		},
		templateUrl: 'views/coffee/learnMore.html' 
	}
})

// Full City Roast
.directive('learnMoreFCR',function(){
	return {
		templateUrl: "views/coffee/learnMore/fullCityRoast.html"
	}
})

// City Roast
.directive('learnMoreCR',function(){
	return {
		templateUrl: "views/coffee/learnMore/cityRoast.html" 
	}
})

// French Roast
.directive('learnMoreFR',function(){
	return {
		templateUrl: "views/coffee/learnMore/frenchRoast.html"
	}
})
