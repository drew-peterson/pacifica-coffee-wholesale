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

angular.module('AdminCtrl',[])

.controller('AdminCtrl', function(itemsService, $scope){ 
	
	$scope.items; // holds all the items...

	// get all items in json file
	var getItems = function(){
		itemsService.get().success(function(data){
			console.log("get success");
			$scope.items = data; 
		})
		.error(function(data){
			console.log(' get error');  
		})
	}();

	// write to json file
	$scope.saveItems = function(){ 
		itemsService.post($scope.items).success(function(response){
			console.log('Post success');
			console.log(response); 

			$scope.items = response;
		})
		.error(function(data){
			console.log(' post error');
		})
	}

})

.directive('itemCard', function(){
	return {
		restrict: 'A', 
		replace: true, 
		scope: {
			'itemData': '=itemData',
			'updateItems': '=updateItems',
			'allItems': '=allItems' 
		},
		controller: function($scope){
			$scope.itemData; // all items
			$scope.allItems; // not really needed
			$scope.updateItems; // function to save items
		},
		templateUrl: "../../views/admin/adminCard.html"

	}
})
angular.module('CoffeeCtrl', [])

.controller('CoffeeCtrl', function($scope, itemsService){
	$scope.test = 'drew peterson' 

	// Get all Items
	itemsService.get().success(function(response){
		$scope.items = response;
	});
}) // end of ctrl


// coffee card ========================== 
.directive('coffeeCard', function(){
	return {
		replace: true,
		restrict: 'A',
		scope: {
			test: '@'
		},
		controller: function($scope){
			// $scope.test = "reed peterson"
		},
		templateUrl: '../../views/coffee/coffee-card.html'
	}
})
angular.module('HomeCtrl', []) 

.controller('HomeCtrl', function($scope){ 

// dynamic ui-sref ================= 

// doesnt work...
$scope.gotoState = function(url){
	console.log('goto State: ' + url)
	$state.go(url); 
}


})

.directive('videoHero', function(){ 
	return {
		restrict: 'A',
		replace: true,
		scope: {},
		link: function(scope, elem, attr){ 
			// var editor = elem.find('#idHere')
			// editor.bind('keyup keydown, function({}))
		},
		templateUrl: "../../views/home/youtube.html" 
	}
}) 

.directive('homeCard', function(){
	return { 
		restrict: 'A',
		scope: {
			'title': '@',
			'color': '@',
			'button': '@', 
			'content': '@',
			'image': '@',
			'textColor': '@', 
			'url': '@', 
		},
		replace: true,
		link: function(scope, elem, attr){
			// var editor = elem.find('#idHere')
			// editor.bind('keyup keydown, function({}))

		},
		controller: function($scope){

		},
		templateUrl: "../../views/home/homeCard.html"
	}
})

angular.module('MainCtrl', [])

.controller('MainCtrl',function(
  $scope,
  $window
  ){


});
angular.module('NavCtrl',[])

.controller('NavCtrl', function($scope){
	$scope.actve;
	$scope.hover; 
})

.directive('toggleClass', function(){
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
	
			element.bind('click', function(){
				var isMobile = event.sourceCapabilities.firesTouchEvents;
				if(isMobile){
					
					$('#sideNav').removeClass('hover');
					$('#sideNav').toggleClass('active');	

					$('#main').on('click', function(){
						$('#sideNav').removeClass('hover');
						$('#sideNav').removeClass('active');

						// remove listner
						$(this).off()						
						
					})
				}
				
				
			});
		}
	}
});
angular.module('appRoutes', [])

.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home',{
      url: '/',
      templateUrl: '../views/home/home.html', 
      controller: 'HomeCtrl'
    })
   .state('coffee',{
      url: '/coffee',
      templateUrl: '../views/coffee/coffee.html'  
    })
    .state('bag',{
      url: '/bag',
      templateUrl: '../views/bag/bag.html' 
    })
    .state('admin',{
      url: '/admin',
      templateUrl: '../views/admin/admin.html',
      controller: 'AdminCtrl',
      controllerAs: 'admin'
    })
   

    // GoogleBot SEO
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');

});

//# sourceMappingURL=application.js.map
