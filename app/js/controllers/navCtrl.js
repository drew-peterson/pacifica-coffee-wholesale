angular.module('NavCtrl',[])

.directive('navigation',function(){
	return {
		scope: true,
		replace: true,
		controller: function(){},
		link: function(scope, elem, attrs){},
		templateUrl: 'views/nav/nav.html'
	} 
})

.directive('sideNav',function(){
	return {
		scope: true,
		replace: true,
		controller: function(){},
		link: function(scope, elem, attrs){},
		templateUrl: 'views/nav/sideNav.html'
	} 
})

