angular.module('pacificaApp')

.service('itemsService', function($http){ 
  return {
    get: function(){
      return $http.get('/api/coffees'); 
    },
    post: function(data){  
      return $http.post('api/coffees', data);
    },
    put: function(data, id){
      return $http.put('api/coffees/' + id, data);
    },
    delete: function(id){  
      return $http.delete('api/coffees/' + id);
    }
  }
})