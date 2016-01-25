angular.module('Pinterest')

.factory('pinterestService', function($http){
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
    } // ========================================= - A

}) // end of factory =========================
