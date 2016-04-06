angular.module('pacificaApp')
.directive('mainFooter',function(){
	return {
		replace: true,
		restrict: 'AE',
		templateUrl: 'views/footer/footer.html',
	}
})
