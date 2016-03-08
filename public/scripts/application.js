angular.module('pacificaApp',
  [
  'ngAnimate',
  'ui.router', 
  'appRoutes',  
  'NavCtrl',
  'ngTouch',  
  'HomeCtrl', 
  'AdminCtrl',
  'CoffeeCtrl'
  ])

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

	// GET ALL ITEMS ===========================================
	itemsService.get().success(function(data){
		console.log("get success");
		$scope.items = data.coffees;  
	})
	.error(function(data){
		console.log(' get error');  
	})
	
})









angular.module('CoffeeCtrl', [])

.controller('CoffeeCtrl', function(itemsService, $scope){
	var CC = this;
	CC.items; // all items
	CC.bag = []; // bag
	CC.drew = "Drew petersion"

	// GET ALL ITEMS ===========================================
	itemsService.get().success(function(data){
		console.log("get success");
		CC.items = data.coffees;  
	})
	.error(function(data){
		console.log(' get error');   
	});

	// Add To bag ============================================
	CC.addTobag = function(item){
		var idx = checkIndex(item);
		if(idx == -1){
			CC.bag.push(item);
			console.log('added ' + item.name + " qty: " + item.qty );
		}
	};

	// Remove From bag ============================================
	CC.removeFrombag = function(item){
		var idx = checkIndex(item);
		if(idx >= 0){
			CC.bag.splice(idx, 1);
			console.log('removed ' + item.name);
		};
	};


	var checkIndex = function(item){
		var idx = CC.bag.indexOf(item);
		return idx
	};

}); // end of ctrl


angular.module('HomeCtrl', [])
.controller('HomeCtrl',function(){}); 



angular.module('NavCtrl',[])

.controller('NavCtrl', function($scope){
	$scope.actve;
	$scope.hover; 
})


angular.module('appRoutes', [])

.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home',{
      url: '/',
      templateUrl: '../views/home/home.html', 
      controller: 'HomeCtrl',
      controllerAs: 'home'
    })
   .state('coffee',{
      url: '/coffee',
      templateUrl: '../views/coffee/coffee.html',
      controllerAs: 'CC',
      controller: 'CoffeeCtrl'  
    })
    .state('bag',{
      url: '/bag',
      templateUrl: '../views/bag/bag.html',
      controllerAs: 'bag' 
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

angular.module('pacificaApp')

.service('itemsService', function($http){ 
  return {
    get: function(){
      return $http.get('/api/coffees'); 
    },
    post: function(data){  
      return $http.post('api/coffees', data);
    },
    put: function(data, id){
      return $http.put('api/coffees/' + id, data);
    },
    delete: function(id){  
      return $http.delete('api/coffees/' + id);
    }
  }
})
angular.module('AdminCtrl').directive('addItem', function(){
	return {
		restrict: 'AE',
		replace: true,
		scope: {
			triggers: '=', 
			allData: '=',
			saveItems:'='
		},
		controller: function($scope, itemsService){
			$scope.newItem = {
				name: 'Name',
				price: "Price",
				description: 'description',
				region: "region",
				roast: "roast"
			};
			// create new item
			$scope.addItem = function(){	
				var newItem = JSON.stringify($scope.newItem);

				itemsService.post(newItem).success(function(response){
					$scope.allData.unshift(response.coffees); // add to top of list;
				})
				.error(function(data){
					console.log(' post error');
				}) 
			}
		},
		templateUrl: 'views/admin/addItem.html'
	}
})
'use strict';

angular.module('AdminCtrl').directive('adminCard', function($animate){
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
		templateUrl: "views/admin/adminCard.html"
	}
})
angular.module('AdminCtrl').directive('adminSideMenu', function($animate, itemsService){ 
	return {
		restrict: 'AE', 
		scope: { 
			itemData: '=', 
			saveItems: '=',
			triggers: '=',
			allData: '='   
		}, 
		templateUrl: "views/admin/adminSideMenu.html", 
		controller: function($scope){
			// var item = JSON.stringify($scope.itemData);
			var item = $scope.itemData;
			var itemId = $scope.itemData._id; 
			$scope.changed;

			//update Item =============================
			$scope.updateItem = function(){	
				if($scope.changed){ 
					itemsService.put(item, itemId).success(function(response){
						// scope has already need changed to reflect new item
					}).error(function(response){
						console.log('update fail');
					});
				};
			};

			// Delete Item ============================
			$scope.deleteItem = function(){
				var id = $scope.allData.indexOf(item);
				// remove from arrary;	
				$scope.allData.splice(id, 1);
				
				itemsService.delete(itemId).success(function(response){
					console.log('delete successful')
				}).error(function(response){
					console.log('delete fail')
				});
			};
		},
		link: function(scope, elem, attrs){
			var close = elem.find('.close');
			var remove = elem.find('.delete');
			var adminUpdate = elem.find('.adminUpdate')
			var menu = elem.parent();
			var overlay = $('.mask');

			// hide menu on close and overlay
			close.on('click', function(){ hideMenu(); })
			remove.on('click', function(){ hideMenu(); })
			overlay.on('click', function(){ hideMenu() })
			adminUpdate.on('click', function(){ hideMenu() })

			function hideMenu(){
				scope.$apply(function(){
					$animate.removeClass(menu, 'showMenu');
				})
			}
		},

	} // end of return
})

angular.module('CoffeeCtrl')

.directive('coffeeBag', function(){
	return {
		scope:true,
		replace: true,
		restrict: 'AE',
		controller: function(){},
		controllerAs: 'ctrl',
		bindToController: {
			item: '=',
			removeFromBag: '&'
		},
		link: function(scope, el, attrs){},
		templateUrl: "views/coffee/coffeeBag.html"
	}
});

angular.module('CoffeeCtrl')

.directive('coffeeCard', function(){
	return {
		replace: true,
		restrict: 'AE',
		scope: true,
		controller: function(){
			this.test = "drew peterson" 
		},
		controllerAs: 'ctrl',
		bindToController: {
			item: '=',
			removeFromBag: '&',
			addToBag: '&' 
		},
		templateUrl: 'views/coffee/coffee-card.html'
	}
});

angular.module('CoffeeCtrl')

.directive('scrollItem',function(){
	return {
		restrict: 'AE',
		controller: function(){},
		link: function(scope, elem, attrs){
			var btn = attrs.class;
			var idx = btn.indexOf('left');

			elem.on('click',function(){

				var first = $('.bagItem')[0]; // first item
				var margin = $(first).css('margin-left');
				var width = $(first).width();

				console.log(margin);
				if(idx >= 0){
					marginLeft= '-33.333%';
					$(first).css('margin-left', marginLeft);
				}else{
					marginLeft= '0%';
					$(first).css('margin-left', marginLeft);
				}


			})
		}
	}
}) 
// Lazy Load ======================================
// lazy-load attr on image or background, must have parent...
angular.module('pacificaApp')
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
angular.module('HomeCtrl').directive('homeCard', function(){
	return { 
		restrict: 'AE', 
		replace: true,
		scope: {
			'title': '@',
			'color': '@',
			'button': '@', 
			'content': '@',
			'image': '@',
			'textColor': '@', 
			'url': '@',  
		},
		templateUrl: "views/home/homeCard.html" 
	}
})
angular.module('HomeCtrl').directive('videoHero', function(){ 
	return {
		restrict: 'AE', 
		replace: true,
		link: function(scope, elem, attr){ 

			// play video when it buffers
			var video = document.getElementById('bgvid');
			var chrome = navigator.appVersion.indexOf('Chrome');
			// if Chrome Else
			if(chrome != 0){	
				video.play(); 
			}else{
				video.oncanplaythrough = function() {
    				video.play(); 
				};
				
			}
		},
		templateUrl: "views/home/youtube.html" 
	}
}); 
angular.module('NavCtrl').directive('toggleClass', function(){
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
	
			// clicking ham menu in mobile mode only
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
					});
				};
			});
		} // end of link
	}
});
//# sourceMappingURL=application.js.map
