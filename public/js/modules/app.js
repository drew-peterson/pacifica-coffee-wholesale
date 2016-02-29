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



// Lazy Load======================================
  .directive('lazyLoad', function($document, $window){
    return {
      restrict: 'AE', 
      scope: {},
      controller: function($scope){
        $scope.fullName = "Drew peterson";
      },
      link: function(scope, elem, attrs){
        var barPos;
        var position;
        var elPos = $(elem).offset().top; // position of element
        var windowHeight = $($window).height();

        // scroll event
        $document.bind('scroll', function(){
          var barPos = $($document).scrollTop(); // scrollbar pos
          var position = elPos - barPos;
      
          if( ((position + 100) <= windowHeight) ){
            loadImage();
            if(position <= 0){ hideImage();}
          }  
        });

        // load Images =================
        var loadImage = function(){
          console.log('loading image');
          // $(elem).css('background-color', 'red');
        }
        // hide Images =================
        var hideImages = function(){
          console.log('image hidden')
          // $(elem).css('background-color', 'red');
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
