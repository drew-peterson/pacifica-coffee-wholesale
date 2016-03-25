angular.module('NavCtrl',[])

.directive('navigation',function(){
	return {  
		scope: true,
		replace: true,
		controller: function(){},
		link: function(scope, elem, attrs){

			var active;
			var navBtn = elem.find('.nav-open');
			var home = navBtn.parent().find('.title');
			var mask = $('.mask-overlay');
			
			// Mobile Menu
			navBtn.on('click',function(){
				var sideNav = elem.find('#sideNav');
				var link = sideNav.find('.link');
				var iconText = elem.find('#sideNav .iconText');

				if(!active){
					sideNav.addClass('showSideNavM');
					iconText.addClass('showIconText');
					mask.addClass('show');
					active = true;
				}else{
					sideNav.removeClass('showSideNavM');
					sideNav.removeClass('showSideNavD');
					iconText.removeClass('showIconText'); 
					mask.removeClass('show');
					active = false;
					// removeAll(sideNav, iconText, mask);
				}
				// on home btn click remove everything
				home.on('click',function(){
					sideNav.removeClass('showSideNavM');
					sideNav.removeClass('showSideNavD');
					iconText.removeClass('showIconText');
					mask.removeClass('show'); 
					active = false;
					// removeAll(sideNav, iconText, mask);
				})
				// set active to false on link click;
				link.on('click', function(){
					mask.removeClass('show');
					active = false;
				})
				mask.on('click',function(){
					sideNav.removeClass('showSideNavM');
					sideNav.removeClass('showSideNavD');
					iconText.removeClass('showIconText');
					mask.removeClass('show'); 
					active = false;
					// removeAll(sideNav, iconText, mask);
				})
			})

			navBtn.on('mouseenter',function(){
				var sideNav = elem.find('#sideNav');
				var iconText = $('#sideNav .iconText');
				var mask = $('.mask-overlay');
				
				sideNav.addClass('showSideNavD');
				mask.addClass('show');

				sideNav.on('mouseenter',function(){
					iconText.addClass('showIconText');
					sideNav.addClass('showSideNavM');
				})

				sideNav.on('mouseleave',function(){
					mask.removeClass('show');
					sideNav.removeClass('showSideNavD');
					sideNav.removeClass('showSideNavM');
					iconText.removeClass('showIconText');
					
				})

			})

			navBtn.on('mouseleave',function(){
				var sideNav = elem.find('#sideNav');
				sideNav.removeClass('showSideNavD');
			})

			var removeAll = function(sideNav, iconText, mask){
				console.log('removeAll')
				sideNav.removeClass('showSideNavM');
				sideNav.removeClass('showSideNavD');
				iconText.removeClass('showIconText');
				mask.removeClass('show'); 
				active = false;
			}
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
				sideNav.removeClass('showSideNavM');
				sideNav.removeClass('showSideNavD');
				iconText.removeClass('showIconText'); 
			})

		},
		templateUrl: 'views/nav/sideNav.html'
	} 
})

