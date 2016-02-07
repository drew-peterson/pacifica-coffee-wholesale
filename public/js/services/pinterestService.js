angular.module('Pinterest')

.factory('pinterestService', function($http){

// 543176473746760468 //- old board
// 419538590226392216 // new board
  var boardUrl = 'https://api.pinterest.com/v1/boards/419538590226392216/pins/?access_token=Ab0MbkYBo-jCHN19exz6LsyGvRFaFC_OyS9S6gRC0EfPzMArmQAAAAA&fields=created_at%2Cimage%2Clink%2Cnote%2Curl';


  var pins = [];

return {
    getBoard: function(callback){
      // callback is the anonymouse function from ctrl
      var cb = callback || angular.noop;

      if(pins.length !== 0){
        cb(pins); // service does not reset so pins contain api data
      }else{
        $http.get(boardUrl)
        .success(function(response){
           pins = pins.concat(response.data);
          cb(pins); // calling the cb function and passing in data
        })
        .error(function(){
          cb();
        });
      }
    }
  };
}); // end of factory =========================


// how to return promise from promise;
// http://stackoverflow.com/questions/12505760/processing-http-response-in-service

// updated verion... prevent multiple api calls
// http://stackoverflow.com/questions/31556184/calling-http-only-once-in-a-controller
