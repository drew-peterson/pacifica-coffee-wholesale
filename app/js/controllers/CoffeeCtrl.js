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
