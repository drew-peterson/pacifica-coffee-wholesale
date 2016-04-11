angular.module('pacificaApp')
  .directive('modal', function(){
    return {
    	replace: true,
    	transclude: true,
    	restrict: 'E',
    	templateUrl: 'views/components/baseModal.html'
    };
  }); 