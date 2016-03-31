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

			$('.lmBtn').on('click', 'h4', function(){
				$('.learnMoreModal').css('visibility', 'visible')
			})


			// close click....
			$('.learnMoreModalWrap').on('click', '.close', function(){
				$('.learnMoreModal').css('visibility', 'hidden')
			})

			// remove scrollablility....
			// $('body').css('overflow','hidden');
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
