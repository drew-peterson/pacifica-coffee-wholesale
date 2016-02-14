angular.module('fasionistaApp')

  // card
  .directive('cardInner',function(){
    return{
      controllerAs: 'cardCtrl',
      templateUrl: '/views/partials/_card.html',

      controller: function(){
        this.fullName = "Drew Peterson";

        this.test = [1,2,3];

    } // end of controller
  }; // end of return
}); // end of directive
