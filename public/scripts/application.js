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
})



angular.module('AdminCtrl',[])

.controller('AdminCtrl', function(itemsService, $scope, sessionService){    
	
	$scope.items; // holds all the items...  

	// triggers for hidding and showing
	$scope.triggers = {    
		showAdd: false,  
		showMenu: false
	}

	// GET ALL ITEMS ===========================================
	itemsService.get().success(function(data){
		$scope.items = data.coffees;

		$scope.loggedIn = sessionService.loggedIn;  
	})
	.error(function(data){
		console.log(' get error');  
	})


	// WATCH for logged in success for sessionService
	$scope.$watch(function(){
		return sessionService.loggedIn;
	},function(newVal, oldVal){
		$scope.loggedIn = newVal;
	}, true); // true is important
	
})









angular.module('CoffeeCtrl', [])

.controller('CoffeeCtrl', function(itemsService, $scope, localStorageService){
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
			setLocalStorage(item); 
		}
		updateTotal();

	};

	// Remove From bag ============================================
	CC.removeFromBag = function(item){
		var idx = checkIndex(item);
		if(idx >= 0){	
			CC.bag.splice(idx, 1);
		};
		localStorageService.delete(item);
		updateTotal();
	};

	// UPDATE BAG ==================================================
	CC.updateBag = function(item){
		localStorageService.update(item);
		updateTotal();
	}

	// get item index for bag ==================================
	var checkIndex = function(item){
		var names = [];
		// hash keys change from some reason, would be better to use id instead of name though
		CC.bag.forEach(function(item){
			names.push(item.name);
		})
		var idx = names.indexOf(item.name);
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

	// LocalStorage ===========================================

	var setLocalStorage = function(item){
		var coffeeItems = localStorageService.set(item);
	}

	// saves bag on refresh and page leave...
	checkLocalStorage = function(){
		var ls = localStorageService.get()
		if(ls){
			CC.bag = ls
			updateTotal();
		};
	}()

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
		controller: function($scope){
			$scope.active = false; 
		},
		controllerAs: 'ctrl',
		link: function(scope, elem, attrs){
			// var active;
			var navBtn = elem.find('.nav-open');
			var home = navBtn.parent().find('.title');
			var mask = $('.mask-overlay');
			var body = $('body');
			
			// Mobile Menu
			navBtn.on('click',function(){
				var sideNav = elem.find('#sideNav');
				var link = sideNav.find('.link');
				var iconText = elem.find('#sideNav .iconText');

				if(!scope.active){
					sideNav.addClass('showSideNavM');
					iconText.addClass('showIconText');
					mask.addClass('show');
					body.css('overflow', 'hidden');
					scope.active = true;
					
				}else{
					removeAll(sideNav, iconText, mask);
				}

				// on home btn click remove everything
				home.on('click',function(){
					removeAll(sideNav, iconText, mask);
				})

				// set active to false on link click;
				link.on('click', function(){
					mask.removeClass('show');
					scope.active = false;
				})
				mask.on('click',function(){
					removeAll(sideNav, iconText, mask);
				})
			})

				// NOT Touch Device Check 
				if($(window).width() >= 768 && window.navigator.maxTouchPoints <= 0){

					navBtn.on('mouseenter',function(){
						var sideNav = elem.find('#sideNav');
						var iconText = $('#sideNav .iconText');
						var mask = $('.mask-overlay');
						
						sideNav.addClass('showSideNavD');
						mask.addClass('show');
						body.css('overflow', 'hidden');

						sideNav.on('mouseenter',function(){
							mask.addClass('show');
							iconText.addClass('showIconText');
							sideNav.addClass('showSideNavM');
							body.css('overflow', 'hidden');
						});

						sideNav.on('mouseleave',function(){
							removeAll(sideNav, iconText, mask);
							var modal = $('.baseModal').hasClass('show');
							if(modal){
								$('body').css('overflow', 'hidden');
							}
						});
					});

					navBtn.on('mouseleave',function(){
						body.css('overflow', 'initial');
						var sideNav = elem.find('#sideNav');
						sideNav.removeClass('showSideNavD');
						mask.removeClass('show');
					});
				}

			var removeAll = function(sideNav, iconText, mask){
				body.css('overflow', 'initial'); 
				mask.removeClass('show');
				sideNav.removeClass('showSideNavM showSideNavD');
				iconText.removeClass('showIconText');
				scope.active = false;
			}
		},
		templateUrl: 'views/nav/nav.html'
	} 
})

.directive('sideNav',function(){
	return {
		// scope: true,
		replace: true,
		require: '^navigation',
		controller: function(){},
		link: function(scope, elem, attrs, navigation){
			var link = elem.find('.nav-link');
			var sideNav = $('#sideNav');
			var iconText = $('#sideNav .iconText');

			// Hide side nav when link is pressed...
			link.on('click',function(){
				closeAll();
			});

			var closeAll = function(){
				var coffeeLink = $(this).hasClass('contact');
				scope.active = false; // reset the active state in navctrl
				$('.mask-overlay').removeClass('show'); // hide the mask
				sideNav.removeClass('showSideNavM showSideNavD');
				iconText.removeClass('showIconText');
				$('body').css('overflow', "initial");
				
				if(coffeeLink){
					$('body').css('overflow', 'hidden');
				};
			};
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
})

// Scroll to top on state change ==================================

.directive('scrollTopOnStateChange', function($rootScope){
  return {
    restict: 'A',
    link: function(scope, elem, attrs){
      // Scroll to top
      $rootScope.$on('$stateChangeSuccess', function() {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
      })
    }
  }
})

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
angular.module('pacificaApp')

.service('localStorageService', function(){ 
  
  return {
    idx: function(item){
      var ls = this.get();
      var coffeeNames = [];

      ls.forEach(function(item){
        coffeeNames.push(item.name)
      })
      return coffeeNames.indexOf(item.name);
    },
    get: function(){
      var ls = JSON.parse(localStorage.getItem('pacificaWholesaleBag'));
      return ls
    },
    set: function(data){
      // get localStorage
      var coffeeItems = this.get();

      // if there are more then 1 item in bag
      if(coffeeItems && coffeeItems.length >= 1){
        if(this.idx(data)){ // item does not exist
          coffeeItems.push(data);
        }         
    // NEW BAG
      }else{
        coffeeItems = [];
        coffeeItems.push(data);
      }
      // set the localStorage
      localStorage.setItem('pacificaWholesaleBag', JSON.stringify(coffeeItems));
      return coffeeItems;
    }, // set
    update: function(item){
      console.log('updating?', item)
      var coffeeItems = this.get();
      var idx = this.idx(item);

      coffeeItems[idx] = item;
      localStorage.setItem('pacificaWholesaleBag', JSON.stringify(coffeeItems));
    },
    delete: function(item){
      var coffeeItems = this.get();
      var idx = this.idx(item);

      coffeeItems.splice(idx, 1);

      localStorage.setItem('pacificaWholesaleBag', JSON.stringify(coffeeItems));
    }
  }
})
angular.module('pacificaApp')
.service('sessionService', function($http){ 
  return {
    loggedIn: false,
    userId: '',
    login: function(data){
    	var sData = JSON.stringify(data);
    	return $http.post('admin/login', sData);
    },
    delete: function(data, id){
      return $http.put('admin/logout/' + id, data);
    }
  }
});
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
				image: null
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

 				scope.$apply(function(){
					document.getElementById('uploadPreview').style.backgroundImage = "url(" + reader.result + ")";        
			    	scope.newItem.image = reader.result;
 				}) 
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
.directive('adminLogin',function(sessionService, $animate){
	return {
		scope: true,
		replace: true,
		controller: function($scope){
			loginCtrl = this;

			loginCtrl.admin = {
				username: '',
				password: '',
			};

			loginCtrl.login = function(){
				loginCtrl.message = "";
				sessionService.login(loginCtrl.admin).success(function(response){
					sessionService.loggedIn = response.status;
					sessionService.userId = response.userId;

					loginCtrl.message = response.message;
					
				}).error(function(error){
					console.log(error);
				})
			};
		},
		link: function(scope, elem, attrs){

			var message = elem.find('.message');
			scope.$watch('loginCtrl.message', function(newVal, oldVal){
				if(newVal){
					console.log('changed')
					$animate.addClass(message, 'activeMessage')
					.then(function() {
						$animate.removeClass(message, 'activeMessage hideMessage');
					});	
				}; // if
				
			}, true); // watch

		},
		controllerAs: 'loginCtrl',
		templateUrl: 'views/admin/login.html'
	}
});
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
			var body = $('body');

			open.on('click', function(){
				console.log('open')
				bag.addClass('toggle');
				mask.addClass('mask-overlay');
				body.css('overflow', 'hidden');
			})

			close.on('click',function(){
				bag.removeClass('toggle');
				mask.removeClass('mask-overlay');
				body.css('overflow', 'initial');
			})

			mask.on('click',function(){
				bag.removeClass('toggle');
				mask.removeClass('mask-overlay');
				body.css('overflow', 'initial');
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

			ctrl.options = [
				{name: 1,value: 1},{name: 2,value: 2},{name: 3,value: 3},{name: 4,value: 4},{name: 5,value: 5},{name: 6,value: 6},{name: 7,value: 7},{name: 8,value: 8},{name: 9,value: 9},{name: 10,value: 10},{name: 15,value: 15},{name: 20,value: 20},
			]

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

.directive('coffeeCard', function(nService, $document){
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
		link: function(scope, elem, attrs){
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
		replace: true,
		bindToController: {
			roast: '&',
			region: '&'
		},
		controllerAs: 'ctrl',
		controller: function(){}, 
		link: function(scope,elem, attrs){
			var mask = $('.coffeeMask')

			// learn more btn show modal 
			$('.lmBtn').on('click', function(){
				// finds the closest filter Title which contains the roast or region
				var filterTitle = $(this).closest('.card-wrapper').find('.filterTitle').text()
				openModal(filterTitle);
			})

			// close click....
			$('.learnMoreModalWrap').on('click', '.close', function(){
				closeModal();
			})

			// close on mask click
			mask.on('click', function(){
				closeModal();
			})


			function openModal(filterTitle){
				// search for a modal that contains the data attribute of the filterTitle
				var modal = $("[data-roast='" + filterTitle +"']");
				// becomes avaiblef from ng-if and now we show it.
				modal.addClass('showModal');
				// prevent body scroll
				mask.addClass('mask-overlay');

				$('body').css('overflow','hidden');
			}

			function closeModal(){
				$('.learnMoreModal').removeClass('showModal');
				mask.removeClass('mask-overlay');
				$('body').css('overflow','initial');
			}

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

// REGION ================ 

// Blends
.directive('learnMoreBlends',function(){
	return {
		replace: true,
		templateUrl: "views/coffee/learnMore/blends.html"
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
			if(nv != ov){
				$animate.addClass(elem, 'show').then(function() {
					$timeout(function() {$animate.removeClass(elem, 'show')});
				});
			};
		});
	};	
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
angular.module('pacificaApp')
  .directive('modal', function($animate){
    return {
    	replace: true,
    	transclude: true, // allows parent child directives...
    	restrict: 'E',
    	link: function(scope, elem, attrs){
    		var modal = $('#nav .baseModal');
    		var mask = $('.baseModal .modalMask');

    		// mask
    		mask.on('click',function(){
    			closeModal();
    		});

    		// close btn
			$('.baseModal .close').on('click', function(){
				closeModal();
			});

			function closeModal(){
				scope.$apply(function(){
					$animate.removeClass(modal, 'show');
					$('body').css('overflow', 'initial');
				})
			};
    	},
    	templateUrl: 'views/components/baseModal.html'
    };
  }); 
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
        $document.on('scroll', function(){ 
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
angular.module('pacificaApp')
.directive('mainFooter',function(){
	return {
		replace: true,
		restrict: 'AE',
		templateUrl: 'views/footer/footer.html',
	}
})

angular.module('HomeCtrl')
.directive('homeCard', function(){
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
angular.module('NavCtrl')
.directive('contactModal', function($animate){
	return {
		replace: true,
		restrict: 'E',
		require: '^navigation', // bring in navigation directive
		templateUrl: 'views/nav/contactModal.html',
		controller: function($scope){
		},
		link: function(scope, elem, attrs, navigation){
			var subNav = $('.subNav.contact');
			subNav.on('click',function(){
				var modal = $('#nav .baseModal');
				scope.$apply(function(){
					$animate.addClass(modal, 'show');
				})				
			});
		}
	}  
})
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
