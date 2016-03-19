angular.module('NavCtrl',[])

.directive('navigation',function(){
	return { 
		scope: true,
		replace: true,
		controller: function(){},
		link: function(scope, elem, attrs){
			var navBtn = elem.find('.nav-li');
			
			// Mobile Menu
			navBtn.on('click',function(){
				var sideNav = elem.find('#sideNav');
				var iconText = elem.find('#sideNav .iconText'); 

				sideNav.toggleClass('showSideNavM');
				iconText.toggleClass('showIconText'); 
			})
		},
		templateUrl: 'views/nav/nav.html'
	} 
})

.directive('sideNav',function(){
	return {
		scope: true,
		replace: true,
		controller: function(){},
		link: function(scope, elem, attrs){
			var link = elem.find('.link a');
			var sideNav = $('#sideNav');
			var iconText = $('#sideNav .iconText'); 

			// Hide side nav when link is pressed...
			link.on('click',function(){
				sideNav.toggleClass('showSideNavM');
				iconText.toggleClass('showIconText'); 
			})

		},
		templateUrl: 'views/nav/sideNav.html'
	} 
})

