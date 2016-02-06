(function(){'use strict';})();

angular.module('fasionistaApp',
  [
  'ngAnimate',
  'NavCtrl',
  'MainCtrl',
  'ui.router',
  'appRoutes',
  'Pinterest', // pinerest ctrl, inject module not ctrl,

  ])

// RUN METHOD called after .config =============

.run(function($rootScope){
  // auto scroll will keep page position, this will scroll to top of page on state change...
  $rootScope.$on('$stateChangeSuccess', function() {
   document.body.scrollTop = document.documentElement.scrollTop = 0;
});

})


//========================================


// Capitialize =========================
.filter('capitalize', function() {
    return function(input, all) {
      var reg = (all) ? /([^\W_]+[^\s-]*) */g : /([^\W_]+[^\s-]*)/;
      return (!!input) ? input.replace(reg, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}) : '';
    };
  });

// ========================================
