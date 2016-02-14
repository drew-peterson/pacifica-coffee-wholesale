angular.module('fasionistaApp')

  // card
  .directive('cardInner',function(){
    return{
      controllerAs: 'cardCtrl',
      templateUrl: '/views/partials/_card.html'
  }; // end of return
}); // end of directive
