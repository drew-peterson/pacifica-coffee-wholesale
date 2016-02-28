angular.module('pacificaApp',
  [
  'ngAnimate',
  'MainCtrl',
  'ui.router',
  'appRoutes',
  'NavCtrl',
  'ngTouch', 
  'HomeCtrl',
  'AdminCtrl'
  ])

// get and save items ==========================
.service('itemsService', function($http){
  return {
    get: function(){
      return $http.get('api/items'); 
    },
    post: function(data){ 
      return $http.post('api/items' , JSON.stringify(data));
    }
  }
})
// ===============================================


// Capitialize =========================
.filter('capitalize', function() {
    return function(input, all) {
      var reg = (all) ? /([^\W_]+[^\s-]*) */g : /([^\W_]+[^\s-]*)/;
      return (!!input) ? input.replace(reg, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}) : '';
    };
  });

// ========================================
