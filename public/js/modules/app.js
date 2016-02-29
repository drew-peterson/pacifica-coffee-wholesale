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

// Get and Save items ==========================
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



// Lazy Load ======================================
  .directive('lazyLoad', function($document, $window){
    return {
      restrict: 'AE', 
      scope: {},
      controller: function($scope){
        $scope.fullName = "Drew peterson";
      },
      link: function(scope, elem, attrs){
        var parent = $(elem).parent(); // image is hiden so we need container
        var elPos = $(parent).offset().top; // position of parent
        var windowHeight = $($window).height();

        var barPos;
        var position;

        var loaded; // load image only once
      
        var offset = 100; // so the element is visible on page by 100px


        // scroll event
        $document.bind('scroll', function(){
          var barPos = $($document).scrollTop(); // scrollbar pos
          var position = elPos - barPos;
          
          if( ((position + offset) <= windowHeight) ){
            if(!loaded){
              loadImage();
            }
          }
        });
        // load Images =================
        var loadImage = function(){
            $(elem).fadeIn();
            console.log('loading image');
            loaded = true;
        }

      } // end of link
    } // end of return
}) // end of directive
// ===============================================


// Capitialize =========================
.filter('capitalize', function() {
    return function(input, all) {
      var reg = (all) ? /([^\W_]+[^\s-]*) */g : /([^\W_]+[^\s-]*)/;
      return (!!input) ? input.replace(reg, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}) : '';
    };
  });

// ========================================
