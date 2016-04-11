angular.module('pacificaApp')
  .directive('modal', function(){
    return {
    	replace: true,
    	transclude: true, // allows parent child directives...
    	restrict: 'E',
    	templateUrl: 'views/components/baseModal.html'
    };
  }); 