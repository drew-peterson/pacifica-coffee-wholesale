angular.module('CoffeeCtrl', [])

.controller('CoffeeCtrl', function(itemsService, $scope){
	var CC = this;
	CC.items; // all items
	CC.bag = []; // bag
	CC.filterBy = {
		regions: [],
		roasts: []
	}; // Coffee Filter

	// GET ALL ITEMS ===========================================
	itemsService.get().success(function(data){
		CC.items = data.coffees;


		CC.items.map(function(coffee){
			var region = coffee.region.toLowerCase(); // region
			var roast = coffee.roast.toLowerCase(); // roast
			
			regionFilter(region, coffee);
			roastFilter(roast, coffee);

		}); // map end
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

	// Coffee Regionfilter push ==================

	var regionFilter = function(region,coffee){
		var regions = CC.filterBy.regions;
		// if it exists
		if(regions[region]){
			regions[region].push(coffee);
		// if it does not
		}else{
			// create new region array
			regions[region] = [];
			regions[region].push(coffee);
		};
	};

	// Coffee roastFilter push ==================

	var roastFilter = function(roast,coffee){
		var roasts = CC.filterBy.roasts;
		// if it exists
		if(roasts[roast]){
			roasts[roast].push(coffee);
		// if it does not
		}else{
			// create new roast array
			roasts[roast] = [];
			roasts[roast].push(coffee);
		};
	};

}); // end of ctrl

