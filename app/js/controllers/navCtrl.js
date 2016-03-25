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
			
			// Mobile Menu
			navBtn.on('click',function(){
<<<<<<< HEAD
				console.log('click', active)
=======
>>>>>>> development
				var sideNav = elem.find('#sideNav');
				var link = sideNav.find('.link');
				var iconText = elem.find('#sideNav .iconText'); 

				if(!active){
					sideNav.addClass('showSideNavM');
					iconText.addClass('showIconText'); 
					active = true;
					console.log('if', active);
				}else{
					sideNav.removeClass('showSideNavM');
					sideNav.removeClass('showSideNavD');
					iconText.removeClass('showIconText'); 
					active = false;
					console.log('else', active);
				}
<<<<<<< HEAD

=======
				// on home btn click remove everything
				home.on('click',function(){
					sideNav.removeClass('showSideNavM');
					sideNav.removeClass('showSideNavD');
					iconText.removeClass('showIconText'); 
					active = false;
				})
>>>>>>> development
				// set active to false on link click;
				link.on('click', function(){
					active = false;
				})
			})

			navBtn.on('mouseenter',function(){
				var sideNav = elem.find('#sideNav');
				var iconText = $('#sideNav .iconText');
				
				sideNav.addClass('showSideNavD');

				sideNav.on('mouseenter',function(){
					iconText.addClass('showIconText');
					sideNav.addClass('showSideNavM');
				})

				sideNav.on('mouseleave',function(){
					sideNav.removeClass('showSideNavD');
					sideNav.removeClass('showSideNavM');
					iconText.removeClass('showIconText');
					
				})

			})

			navBtn.on('mouseleave',function(){
				var sideNav = elem.find('#sideNav');
				sideNav.removeClass('showSideNavD');
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
				sideNav.removeClass('showSideNavM');
				sideNav.removeClass('showSideNavD');
				iconText.removeClass('showIconText'); 
			})

		},
		templateUrl: 'views/nav/sideNav.html'
	} 
})

