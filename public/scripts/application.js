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
      return $http.get('/api/coffees'); 
    },
    post: function(data){  
      return $http.post('api/coffees', data);
    }
  }
})
// ===============================================



// Lazy Load ======================================

// lazy-load attr on image or background, must have parent...

  .directive('lazyLoad', function($document, $window){
    return {
      restrict: 'AE', 
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
          var position = elPos - barPos; // elment pos from bottom of window
          
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

	// triggers for hidding and showing
	$scope.triggers = {
		showAdd: false, 
		showMenu: false
	}

	// GET ===========================================

	var getItems = function(){ 
		itemsService.get().success(function(data){
			console.log("get success");
			$scope.items = data.coffees;  
		})
		.error(function(data){
			console.log(' get error');  
		})
	}();

	// write to json file ======================

	$scope.saveItems = function(newItem){
		
		var newItem = JSON.stringify(newItem);
		itemsService.post(newItem).success(function(response){ 
			$scope.items.unshift(response.coffees);
		})
		.error(function(data){
			console.log(' post error');
		}) 
	}
})

.directive('itemCard', function($animate){
	return {
		restrict: 'AE', 
		replace: true, 
		scope: {
			'itemData': '=',
			'triggers': '=', 
			'saveItems': '=',
			'allData': '='
		},
		controller: function($scope){},
		link: function(scope, elem, attrs){
			var openBtn = elem.find('#adminShowMenu');
			var menu = elem.find('.admin-push-menu');

			// open menu -- close menu is in adminsideMenu.js
			openBtn.on('click', function(){
				scope.$apply(function(){
					$animate.addClass(menu, 'showMenu');
				})
			})
		},
		templateUrl: "../../views/admin/adminCard.html"
	}
})

// add new item
.directive('addItem', function(){
	return {
		restrict: 'AE',
		replace: true,
		scope: {
			triggers: '=',
			allData: '=',
			saveItems:'='
		},
		controller: function($scope){
			$scope.newItem = {
				name: 'Name',
				price: "Price",
				description: 'description',
				region: "region",
				roast: "roast"
			};

			$scope.addItem = function(){	
				$scope.saveItems($scope.newItem);
			}
		},
		templateUrl: '../../views/admin/addItem.html'
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

.controller('HomeCtrl', function($scope){}) // end of controller

.directive('videoHero', function(){ 
	return {
		restrict: 'A',
		replace: true,
		scope: {},
		link: function(scope, elem, attr){ 

			// play video when it buffers
			var video = document.getElementById('bgvid');
			var chrome = navigator.appVersion.indexOf('Chrome');
			// if Chrome Else
			if(chrome != 0){
				setTimeout(function(){
					console.log('play')
					video.play();
				},3000)
			}else{
				video.oncanplaythrough = function() {
    				video.play(); 
				};
				
			}
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

angular.module('AdminCtrl')
.directive('adminSideMenu', function($animate){ 
	return {
		restrict: 'AE', 
		scope: { 
			itemData: '=',
			saveItems: '=',
			triggers: '=',
			allData: '=' 
		},
		templateUrl: "../../views/admin/adminSideMenu.html", 
		controller: function($scope){
			var item = $scope.itemData;
			$scope.changed;

			//update Item =============================
			$scope.updateItem = function(){	
				if($scope.changed){
					$scope.saveItems();
				}
			}


			// Delete Item ============================
			$scope.deleteItem = function(){
				var id = $scope.allData.indexOf(item);
				$scope.allData.splice(id, 1);
				// save
				$scope.saveItems();  
			}
		},
		link: function(scope, elem, attrs){
			var close = elem.find('.close');
			var menu = elem.parent();
			var overlay = $('.mask');

			// hide menu on close and overlay
			close.on('click', function(){ hideMenu(); })
			overlay.on('click', function(){ hideMenu() })

			function hideMenu(){
				scope.$apply(function(){
					$animate.removeClass(menu, 'showMenu');
				})
			}
		},

	} // end of return
})
//# sourceMappingURL=application.js.map
