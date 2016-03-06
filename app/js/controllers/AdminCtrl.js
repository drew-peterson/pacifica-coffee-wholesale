angular.module('AdminCtrl',[])

.controller('AdminCtrl', function(itemsService, $scope){    
	
	$scope.items; // holds all the items...  

	// triggers for hidding and showing
	$scope.triggers = {    
		showAdd: false,  
		showMenu: false
	}

	// GET ALL ITEMS ===========================================
  
	var getItems = function(){ 
		itemsService.get().success(function(data){
			console.log("get success");
			$scope.items = data.coffees;  
		})
		.error(function(data){
			console.log(' get error');  
		})
	}();
})








