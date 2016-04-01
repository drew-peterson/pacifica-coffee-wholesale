angular.module('pacificaApp')

.service('localStorageService', function(){ 
  return {
    get: function(){
      return localStorage.getItem('pacificaWholesaleBag');
    },
    set: function(data){
      // get localStorage
      var coffeeItems = JSON.parse(this.get());

      // if there are more then 1 item in bag
      if(coffeeItems && coffeeItems.length >= 1){
        
        // data vs localObject does not equal...
        var coffeeNames = []
        coffeeItems.forEach(function(item){
          coffeeNames.push(item.name)
        })

        var idx = coffeeNames.indexOf(data.name);
             
        if(idx == -1){ // item does not exist
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
    } // set
  }
})