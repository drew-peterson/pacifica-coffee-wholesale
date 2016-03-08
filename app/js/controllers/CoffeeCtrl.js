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

