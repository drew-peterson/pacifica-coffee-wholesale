angular.module('pacificaApp')
.service('sessionService', function($http){ 
  return {
    loggedIn: false,
    login: function(data){  
      return $http.post('admin/login', data);
    },
    delete: function(data, id){
      return $http.put('admin/logout/' + id, data);
    }
  }
});