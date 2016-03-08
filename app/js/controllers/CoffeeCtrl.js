angular.module('CoffeeCtrl', [])

.controller('CoffeeCtrl', function(itemsService, $scope){
	var CC = this;
	CC.items; // all items
	CC.bag = 0; 

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
		console.log('add')
		CC.bag += 1;
		$scope.bag += 1;
	};

	// Remove From bag ============================================
	CC.removeFrombag = function(item){
		console.log('removed from bag...');
		$scope.bag -= 1;
		CC.bag -= 1;
		// var idx = CC.bag.indexOf(item);
		// if(idx >= 0){
		// 	CC.items.splice(idx, 1);
		// 	console.log(item.name + ' removed...')
		// };
	};

});

