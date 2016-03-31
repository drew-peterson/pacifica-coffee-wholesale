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
  })
// ========================================

// angular reverse row...
.filter('reverse', function() {
  return function(items) {
    return items.slice().reverse();
  };
});


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
	CC.filterBy = {
		regions: [ {name: 'Blends', region: []},{name: 'Indonesia', region: []},{name:'Central/South America', region:[]}, {name:'Africa', region:[]}],
		roasts: [ {name: 'Full City Roast', roast:[]},{name:"City Roast", roast: []}, {name:"French Roast", roast:[]}]
	}; // Coffee Filter

	// GET ALL ITEMS ===========================================
	itemsService.get().success(function(data){
		CC.items = data.coffees;
		createFilter();
	})
	.error(function(data){
		console.log(' get error');   
	});

	// Add To bag ============================================

	CC.addTobag = function(item){
		var idx = checkIndex(item);
		if(idx == -1){ // item does not exist
			CC.bag.push(item);
		}
		updateTotal();
	};

	// Remove From bag ============================================
	CC.removeFromBag = function(item){
		console.log('remove from bag ' + item)
		var idx = checkIndex(item);
		if(idx >= 0){	
			CC.bag.splice(idx, 1);
		};
		console.log('bag', CC.bag) 
		updateTotal();
	};

	// UPDATE BAG ==================================================
	CC.updateBag = function(item){
		updateTotal();
	}

	// get item index for bag ==================================
	var checkIndex = function(item){
		var idx = CC.bag.indexOf(item);
		return idx
	};

	var updateTotal = function(){
		CC.total = {amount: 0,total: 0} // total
		CC.bag.forEach(function(item){
			var total = item.price * item.qty;
			CC.total.amount += Number(item.qty);
			CC.total.total += total;
		});
	}

	// Filter ===============
	var createFilter = function(){
		CC.items.forEach(function(coffee){
			var region = coffee.region; // region
			var roast = coffee.roast; // roast
			 
			regionFilter(region, coffee);
			roastFilter(roast, coffee);
		});
	};

	// Coffee Region filter =====================

	var regionFilter = function(region, coffee){
		var regions = CC.filterBy.regions;

		for(var i=0; i<regions.length; i++){
			var exists = regions[i].name === region;

			if(exists){
				regions[i].region.push(coffee);
			}
		}
	};

	// Coffee roastFilter push ==================
	var roastFilter = function(roast, coffee){
	var roasts = CC.filterBy.roasts;

		for(var i=0; i<roasts.length; i++){

			var exists = roasts[i].name === roast;

			if(exists){
				roasts[i].roast.push(coffee);
			}
		}
	};
}); // end of ctrl

angular.module('HomeCtrl', [])
.controller('HomeCtrl',function(){}); 



angular.module('NavCtrl',[])

.directive('navigation',function(){
	return {  
		scope: true,
		replace: true,
		controller: function(){},
		link: function(scope, elem, attrs){

			var active;
			var navBtn = elem.find('.nav-open');
			var home = navBtn.parent().find('.title');
			var mask = $('.mask-overlay');
			
			// Mobile Menu
			navBtn.on('click',function(){

				var sideNav = elem.find('#sideNav');
				var link = sideNav.find('.link');
				var iconText = elem.find('#sideNav .iconText');

				if(!active){
					sideNav.addClass('showSideNavM');
					iconText.addClass('showIconText');
					mask.addClass('show');
					active = true;
				}else{
					sideNav.removeClass('showSideNavM');
					sideNav.removeClass('showSideNavD');
					iconText.removeClass('showIconText'); 
					mask.removeClass('show');
					active = false;
					// removeAll(sideNav, iconText, mask);
				}

				// on home btn click remove everything
				home.on('click',function(){
					sideNav.removeClass('showSideNavM');
					sideNav.removeClass('showSideNavD');
					iconText.removeClass('showIconText');
					mask.removeClass('show'); 
					active = false;
					// removeAll(sideNav, iconText, mask);
				})

				// set active to false on link click;
				link.on('click', function(){
					mask.removeClass('show');
					active = false;
				})
				mask.on('click',function(){
					sideNav.removeClass('showSideNavM');
					sideNav.removeClass('showSideNavD');
					iconText.removeClass('showIconText');
					mask.removeClass('show'); 
					active = false;
					// removeAll(sideNav, iconText, mask);
				})
			})

				// disable mouseenter event on touch devices prevents apple....
				if($(window).width() >= 768){

					navBtn.on('mouseenter',function(){
						var sideNav = elem.find('#sideNav');
						var iconText = $('#sideNav .iconText');
						var mask = $('.mask-overlay');
						
						sideNav.addClass('showSideNavD');
						mask.addClass('show');

						sideNav.on('mouseenter',function(){
							iconText.addClass('showIconText');
							sideNav.addClass('showSideNavM');
						});

						sideNav.on('mouseleave',function(){
							mask.removeClass('show');
							sideNav.removeClass('showSideNavD');
							sideNav.removeClass('showSideNavM');
							iconText.removeClass('showIconText');
						});
					});

					navBtn.on('mouseleave',function(){
						var sideNav = elem.find('#sideNav');
						sideNav.removeClass('showSideNavD');
					});
				}

			var removeAll = function(sideNav, iconText, mask){
				sideNav.removeClass('showSideNavM');
				sideNav.removeClass('showSideNavD');
				iconText.removeClass('showIconText');
				mask.removeClass('show'); 
				active = false;
			}
		},
		templateUrl: 'views/nav/nav.html'
	} 
})

.directive('sideNav',function(){
	return {
		scope: true,
		replace: true,
		controller: function(){},
		link: function(scope, elem, attrs){
			var link = elem.find('.link a');
			var sideNav = $('#sideNav');
			var iconText = $('#sideNav .iconText'); 

			// Hide side nav when link is pressed...
			link.on('click',function(){
				sideNav.removeClass('showSideNavM');
				sideNav.removeClass('showSideNavD');
				iconText.removeClass('showIconText'); 
			})  

		},
		templateUrl: 'views/nav/sideNav.html'
	} 
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
				roast: "roast",
				image: "image" 
			};
			// create new item
			$scope.addItem = function(){	
				console.log($scope.newItem);
				var newItem = JSON.stringify($scope.newItem);

				itemsService.post(newItem).success(function(response){
					$scope.allData.unshift(response.coffees); // add to top of list;
				})
				.error(function(data){
					console.log(' post error');
				}) 
			} 
		},
		link: function(scope, elem, attrs){
			document.getElementById('photoUpload').addEventListener('change', readUrl, true);

			function readUrl(){
				var file = document.getElementById('photoUpload').files[0];
				var reader = new FileReader();
 				reader.onloadend = function(){ 
				document.getElementById('uploadPreview').style.backgroundImage = "url(" + reader.result + ")";        
		    	scope.newItem.image = reader.result;
		   }
		    
		   if(file){
		      reader.readAsDataURL(file);
		    }else{
					console.log('else')
				}
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
angular.module('AdminCtrl')

.directive('adminSideMenu', function($animate, itemsService){ 
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

.directive('coffeeBag', function($document, $window){
	return {
		scope:true,
		replace: true,
		restrict: 'AE', 
		controller: function(){}, 
		controllerAs: 'ctrl',
		bindToController: {}, 
		link: function(scope, el, attrs){
			var open = $('.viewBag');
			var close = $('.bag-close-wrap');
			var bag = $('#coffeeBag');
			var mask = $('.coffeeMask');

			open.on('click', function(){
				console.log('open')
				bag.addClass('toggle');
				mask.addClass('mask-overlay');
			})

			close.on('click',function(){
				bag.removeClass('toggle');
				mask.removeClass('mask-overlay');
			})

			mask.on('click',function(){
				bag.removeClass('toggle');
				mask.removeClass('mask-overlay');
			})


			// remove BagBar when at bottom ==========
			
			var footer = $('#footer');
			var bar = $('#coffee .coffee-details');
				
			$document.on('scroll',function(){
				var footerHeight = footer.offset().top
				var windowHeight = $(window).height();
				var scroll = $document.scrollTop();
				var pos = footerHeight - scroll;
				var nBar = $('#notificationBar');

				if((pos + 100) <= windowHeight){
					bar.fadeOut();
					nBar.fadeOut()
				}else{
					bar.fadeIn();
					nBar.fadeIn()
				}
			})


		},
		templateUrl: "views/coffee/coffeeBag.html"
	} 
});

angular.module('CoffeeCtrl')

.directive('coffeeBagItem', function(){
	return { 
		scope:true,
		replace: true,
		restrict: 'AE',
		controller: function(){
			var ctrl = this;

			ctrl.remove = function(coffee){
				ctrl.removeFromBag({coffee:coffee}); // has to be object...
			}

			ctrl.update = function(coffee){
				ctrl.updateBag({coffee:coffee})
			}
		}, 
		controllerAs: 'ctrl',
		bindToController: {
			item: '=',
			removeFromBag: '&',
			updateBag: '&'
		},
		link: function(scope, el, attrs){},
		templateUrl: "views/coffee/coffeeBagItem.html" 
	} 
});


// hide show menu.....



angular.module('CoffeeCtrl')

.directive('coffeeCard', function(nService){
	return {
		replace: true,
		restrict: 'AE',
		scope: true,
		controller: function(){
			var ctrl = this;

			ctrl.add = function(coffee){
				ctrl.addToBag({coffee:coffee});

				// notifcation
				nService.addItem( coffee.name + ' Added');
			} 
		},
		controllerAs: 'ctrl',
		bindToController: {
			addToBag: '&'  
		},
		link: function(scope, elem, attrs){},
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
				var margin= $(first).css('marginLeft').replace('px','');
				console.log('css margin: ' + margin);

				if(idx >= 0){
					marginLeft= (Number(margin) - 120);
					$(first).css('margin-left', marginLeft +'px');

					console.log("left: " + marginLeft);
				}else{
					if(margin != '0'){
						marginLeft= (Number(margin) + 120);
						$(first).css('margin-left', marginLeft +'px');

						console.log("right: " + marginLeft);
					}
				}
			}) // end of click
		}
	}
}) 
angular.module('CoffeeCtrl')

// learn More Parent Directive
.directive('learnMore',function(){
	return {
		// scope: true,
		bindToController: {
			roast: '&',
		},
		controllerAs: 'ctrl',
		controller: function(){}, 
		link: function(scope,elem, attrs){

			$('.lmBtn').on('click', 'h4', function(){
			
				// finds the closest filter Title when contains the roast
				var filterTitle = $(this).closest('.card-wrapper').find('.filterTitle').text()
				// search for a modal that contains the data attribute of the filterTitle
				var modal = $("[data-roast='" + filterTitle +"']");
				// becomes avaiblef from ng-if and now we show it.
				modal.addClass('showModal');
				// prevent body scroll
				$('body').css('overflow','hidden');
			})

			// close click....
			$('.learnMoreModalWrap').on('click', '.close', function(){
				$('.learnMoreModal').removeClass('showModal');

				$('body').css('overflow','initial');
			})

		},
		templateUrl: 'views/coffee/learnMore.html' 
	}
})

// Full City Roast
.directive('learnMoreFCR',function(){
	return {
		replace: true,
		templateUrl: "views/coffee/learnMore/fullCityRoast.html"
	}
})

// City Roast
.directive('learnMoreCR',function(){
	return {
		replace: true,
		templateUrl: "views/coffee/learnMore/cityRoast.html" 
	}
})

// French Roast
.directive('learnMoreFR',function(){
	return {
		replace: true,
		templateUrl: "views/coffee/learnMore/frenchRoast.html"
	}
})

angular.module('CoffeeCtrl')
.service('nService',function(){
	return {
		notifications: undefined,
		addItem: function(notice){
			this.notifications = notice;
		}
	}
})
.directive('notificationBar',function($timeout, nService){
	return{
		scope: true,
		replace: true,
		controllerAs: 'ctrl',
		controller: function($scope){
			ctrl = this;
			ctrl.notification; // hold the updated notificatiton

			// pass vars between directives use service!!! this will watch for changes
			// $watch('nService.notifcations') way does not work....
			$scope.$watch(function(){
				return nService.notifications;
			},function(newVal, oldVal){
				ctrl.existing = oldVal;
				ctrl.notification = newVal;

				console.log('=========')
				console.log('existing ' + ctrl.existing)
				console.log('notification ' + ctrl.notification)
			}, true); // true is important
		},
		link: function(scope,elem,attrs){},
		templateUrl: 'views/coffee/notificationBar.html'
	}
})

// Hide show bar when variable changes....
.directive('animateOnChange', function($animate,$timeout) {
	return function(scope, elem, attr) {
		scope.$watch(attr.animateOnChange, function(nv,ov) {
			var c = 'show';
			$animate.addClass(elem,c).then(function() {
				$timeout(function() {$animate.removeClass(elem,c)});
			});
		});
	}	
})











angular.module('CoffeeCtrl')
.directive('showFilter',function(){
	return {
		scope: true,
		restrict: 'A',
		link: function(scope, elem, attrs){
			var region = elem.find('.region');
			var roast = elem.find('.roast');
			var btns = elem.find('.filterBtn');

			region.on('click',function(event){
				var wrapper = $('.card-wrapper');
				var hasClass = $(this).hasClass('active')

				if(!hasClass){
					btns.removeClass('active');
					$(this).addClass('active'); 

					wrapper.hide();
					$('.regionCards').fadeIn();
				}
			})

			roast.on('click',function(event){
				var wrapper = $('.card-wrapper');
				var hasClass = $(this).hasClass('active')
				if(!hasClass){
					btns.removeClass('active');
					$(this).addClass('active');

					wrapper.hide();
					$('.roastCards').fadeIn();
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
