angular.module('CoffeeCtrl', [])

.controller('CoffeeCtrl', function(itemsService, $scope){
	var CC = this;
	CC.items; // all items
	CC.cart = 0;
	$scope.cart = 0;

	// GET ALL ITEMS ===========================================
	itemsService.get().success(function(data){
		console.log("get success");
		CC.items = data.coffees;  
	})
	.error(function(data){
		console.log(' get error');   
	});

	// Add To Cart ============================================
	CC.addToCart = function(item){
		console.log('add')
		CC.cart += 1;
		$scope.cart += 1;
	};

	CC.add = function(){
		CC.cart += 1;
	}
	CC.remove = function(){
		CC.cart -= 1;
	}

	// Remove From Cart ============================================
	CC.removeFromCart = function(item){
		console.log('remove');
		$scope.cart -= 1;
		CC.cart -= 1;
		// var idx = CC.cart.indexOf(item);
		// if(idx >= 0){
		// 	CC.items.splice(idx, 1);
		// 	console.log(item.name + ' removed...')
		// };
	};

});

