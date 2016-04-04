angular.module('pacificaApp')
.service('sessionService', function($http){ 
  return {
    loggedIn: false,
    userId: '',
    login: function(data){
    	var sData = JSON.stringify(data);
    	return $http.post('admin/login', sData);
    },
    delete: function(data, id){
      return $http.put('admin/logout/' + id, data);
    }
  }
});