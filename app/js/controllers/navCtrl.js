angular.module('NavCtrl',[])

.directive('navigation',function(){
	return {  
		scope: true,
		replace: true,
		controller: function($scope){
			$scope.active = false;
		},
		controllerAs: 'ctrl',
		link: function(scope, elem, attrs){
			// var active;
			var navBtn = elem.find('.nav-open');
			var home = navBtn.parent().find('.title');
			var mask = $('.mask-overlay');
			var body = $('body');
			
			// Mobile Menu
			navBtn.on('click',function(){
				var sideNav = elem.find('#sideNav');
				var link = sideNav.find('.link');
				var iconText = elem.find('#sideNav .iconText');

				if(!scope.active){
					sideNav.addClass('showSideNavM');
					iconText.addClass('showIconText');
					mask.addClass('show');
					body.css('overflow', 'hidden');
					scope.active = true;
					
				}else{
					removeAll(sideNav, iconText, mask);
				}

				// on home btn click remove everything
				home.on('click',function(){
					removeAll(sideNav, iconText, mask);
				})

				// set active to false on link click;
				link.on('click', function(){
					mask.removeClass('show');
					scope.active = false;
				})
				mask.on('click',function(){
					removeAll(sideNav, iconText, mask);
				})
			})

				// disable mouseenter event on touch devices prevents apple....
				if($(window).width() >= 768){

					navBtn.on('mouseenter',function(){
						var sideNav = elem.find('#sideNav');
						var iconText = $('#sideNav .iconText');
						var mask = $('.mask-overlay');
						
						sideNav.addClass('showSideNavD');
						mask.addClass('show');
						body.css('overflow', 'hidden');

						sideNav.on('mouseenter',function(){
							mask.addClass('show');
							iconText.addClass('showIconText');
							sideNav.addClass('showSideNavM');
							body.css('overflow', 'hidden');
						});

						sideNav.on('mouseleave',function(){
							removeAll(sideNav, iconText, mask);
							var modal = $('.baseModal').hasClass('show');
							if(modal){
								$('body').css('overflow', 'hidden');
							}
						});
					});

					navBtn.on('mouseleave',function(){
						body.css('overflow', 'initial');
						var sideNav = elem.find('#sideNav');
						sideNav.removeClass('showSideNavD');
						mask.removeClass('show');
					});
				}

			var removeAll = function(sideNav, iconText, mask){
				body.css('overflow', 'initial'); 
				mask.removeClass('show');
				sideNav.removeClass('showSideNavM showSideNavD');
				iconText.removeClass('showIconText');
				scope.active = false;
			}
		},
		templateUrl: 'views/nav/nav.html'
	} 
})

.directive('sideNav',function(){
	return {
		// scope: true,
		replace: true,
		require: '^navigation',
		controller: function(){},
		link: function(scope, elem, attrs, navigation){
			var link = elem.find('.nav-link');
			var sideNav = $('#sideNav');
			var iconText = $('#sideNav .iconText');

			// Hide side nav when link is pressed...
			link.on('click',function(){
				$('.mask-overlay').removeClass('show'); // hide the mask
				sideNav.removeClass('showSideNavM showSideNavD');
				iconText.removeClass('showIconText');

				var coffeeLink = $(this).hasClass('coffee-link');
				if(coffeeLink){
					$('body').css('overflow', "initial");
				};
			}) 
		},
		templateUrl: 'views/nav/sideNav.html'
	} 
})

