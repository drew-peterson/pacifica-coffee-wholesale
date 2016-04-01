angular.module('pacificaApp')

.service('localStorageService', function(){ 
  
  return {
    idx: function(item){
      var ls = this.get();
      var coffeeNames = [];

      ls.forEach(function(item){
        coffeeNames.push(item.name)
      })
      return coffeeNames.indexOf(item.name);
    },
    get: function(){
      var ls = JSON.parse(localStorage.getItem('pacificaWholesaleBag'));
      return ls
    },
    set: function(data){
      // get localStorage
      var coffeeItems = this.get();

      // if there are more then 1 item in bag
      if(coffeeItems && coffeeItems.length >= 1){
        if(this.idx(data)){ // item does not exist
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
    }, // set
    update: function(item){
      var coffeeItems = this.get();
      var idx = this.idx(item);

      coffeeItems[idx] = item;

      localStorage.setItem('pacificaWholesaleBag', JSON.stringify(coffeeItems));
    },
    delete: function(item){
      var coffeeItems = this.get();
      var idx = this.idx(item);

      coffeeItems.splice(idx, 1);

      localStorage.setItem('pacificaWholesaleBag', JSON.stringify(coffeeItems));
    }
  }
})