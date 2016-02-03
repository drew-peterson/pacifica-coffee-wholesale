'use strict';

angular.module('Pinterest')

.factory('pinterestService', function($http){

// 543176473746760468 //- old board
  var boardUrl = 'https://api.pinterest.com/v1/boards/419538590226392216/pins/?access_token=ATqC1gzDTvxL0zf-1wfyp-SdFCe3FCx7yHOmO5hC0EfPzMArmQAAAAA&fields=id%2Clink%2Cnote%2Curl%2Cimage';

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
        })
      }
    }
  }
}) // end of factory =========================


// how to return promise from promise;
// http://stackoverflow.com/questions/12505760/processing-http-response-in-service

// updated verion... prevent multiple api calls
// http://stackoverflow.com/questions/31556184/calling-http-only-once-in-a-controller
