'use strict';

angular.module('Pinterest')

.factory('pinterestService', function($http){

  var boardUrl = 'https://api.pinterest.com/v1/boards/543176473746760468/pins/?access_token=ATqC1gzDTvxL0zf-1wfyp-SdFCe3FCx7yHOmO5hC0EfPzMArmQAAAAA&fields=id%2Clink%2Cnote%2Curl%2Cimage';

  var pins = [];

return {
    getBoard: function(callback){
      var cb = callback || angular.noop;

      if(pins.length !== 0){
        cb(pins);
        console.log('api not hit')
      }else{
        console.log('api hit')
        $http.get(boardUrl)
        .success(function(response){
           pins = pins.concat(response.data);
          cb(pins);
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
