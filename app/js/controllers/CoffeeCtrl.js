angular.module('CoffeeCtrl', [])

.controller('CoffeeCtrl', function(itemsService, $scope){
	var CC = this;
	CC.items; // all items
	CC.bag = []; // bag
	CC.filterBy = {
		regions: [ {name: 'Blends', region: []},{name: 'Indonesia', region: []},{name:'Central/South America', region:[]}, {name:'Africa', region:[]}],
		roasts: []
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
