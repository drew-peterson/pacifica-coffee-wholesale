angular.module('CoffeeCtrl')

// learn More Parent Directive
.directive('learnMore',function(){
	return {
		// scope: true,
		bindToController: {
			roast: '&',
		},
		controllerAs: 'ctrl',
		controller: function(){}, 
		link: function(scope,elem, attrs){

			$('.lmBtn').on('click', 'h4', function(){
			
				// finds the closest filter Title when contains the roast
				var filterTitle = $(this).closest('.card-wrapper').find('.filterTitle').text()
				// search for a modal that contains the data attribute of the filterTitle
				var modal = $("[data-roast='" + filterTitle +"']");
				// becomes avaiblef from ng-if and now we show it.
				modal.addClass('showModal');
				// prevent body scroll
				$('body').css('overflow','hidden');
			})

			// close click....
			$('.learnMoreModalWrap').on('click', '.close', function(){
				$('.learnMoreModal').removeClass('showModal');

				$('body').css('overflow','initial');
			})

		},
		templateUrl: 'views/coffee/learnMore.html' 
	}
})

// Full City Roast
.directive('learnMoreFCR',function(){
	return {
		replace: true,
		templateUrl: "views/coffee/learnMore/fullCityRoast.html"
	}
})

// City Roast
.directive('learnMoreCR',function(){
	return {
		replace: true,
		templateUrl: "views/coffee/learnMore/cityRoast.html" 
	}
})

// French Roast
.directive('learnMoreFR',function(){
	return {
		replace: true,
		templateUrl: "views/coffee/learnMore/frenchRoast.html"
	}
})
