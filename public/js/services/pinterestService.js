'use strict';

angular.module('Pinterest')

.factory('pinterestService', function(){

  var boardUrl = 'https://api.pinterest.com/v1/boards/543176473746760468/pins/?access_token=ATqC1gzDTvxL0zf-1wfyp-SdFCe3FCx7yHOmO5hC0EfPzMArmQAAAAA&fields=id%2Clink%2Cnote%2Curl%2Cimage';

  var promise,
      pins;

return {

      async: function(){

        var promise = $http.get(boardUrl)
        .then(function(response){
          pins = pins.concat(response.data);
          pins = pins.pins[0]['data'];

          return pins;
        }); // then
      return promise;
    }
  }
}) // end of factory =========================
