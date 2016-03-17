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
			var region = coffee.region.toLowerCase(); // region
			var roast = coffee.roast.toLowerCase(); // roast
			
			regionFilter(region, coffee);
			roastFilter(roast, coffee);

		}); // map end
	};

	// Coffee Regionfilter push ==================

	// CC.filterBy = {
	// 	regions: [
	// 		{ blends: [coffee, coffee] },
	// 		{ indosia: [coffee, coffee] },
	// 	]
	// }

	var regionFilter = function(region, coffee){
		var regions = CC.filterBy.regions;
		var item = {};

		// first time around...
		console.log('length: ' + regions.length);

		if(regions.length === 0){
			console.log('first')
			item[region] = [];
			item[region].push(coffee);
			regions.push(item);
		}else{	
			for(var i = 0; i < regions.length; i ++){
				console.log('region: ' + region)
		
				if(regions[i].hasOwnProperty(region)){
					console.log('exists');
					regions[i][region].push(coffee);
				}else{
					console.log('not')
					item[region] = [];
					item[region].push(coffee);
					regions.push(item);
				}	
			}
		}


		// if(true){
		// 	console.log('does not exists')
		// 	item[region] = [];
		// 	item[region].push(coffee);
		// 	regions.push(item);

		// }else{

		// }
	};

	// Coffee roastFilter push ==================

	var roastFilter = function(roast,coffee){
		var roasts = CC.filterBy.roasts;

		roasts.forEach(function(roast){
			// if roast exists
			if(roasts[roast]){
				roasts[roast].push(coffee);
			}else{
				roasts[roast] = [];
				roasts[roast].push(coffee);
			}
		})
	};

}); // end of ctrl
