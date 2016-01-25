'use strict';

angular.module('fasionistaApp')

.factory('pinterestService', function(){
  return {

    // Get Fashionista Board ======================== - A
    getBoard: function(){
      return $http.get({
        method: 'GET',
        url: '/'
      })
      .then(
        function successCallback(response){
          console.log('Success: ' + response)
      },
      function errorCallback(response){
        console.log('Error: ' + response);
      })
    }  // ========================================= - A
  }  // end of return
}) // end of factory =========================
