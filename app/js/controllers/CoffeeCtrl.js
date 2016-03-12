angular.module('CoffeeCtrl', [])

.controller('CoffeeCtrl', function(itemsService, $scope){
	var CC = this;
	CC.items; // all items
	CC.bag = []; // bag

	// GET ALL ITEMS ===========================================
	itemsService.get().success(function(data){
		CC.items = data.coffees;  
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

}); // end of ctrl

