'use strict';

angular.module('Pinterest')

.factory('dateService', function(){

  return {

    compareDate: function(created_at){
      var oneWeek = 604800000; // 1 week in milisec 604800000
      var now = Date.now();
      var createdAt = Date.parse(created_at);

      var newItemCutOff = oneWeek + createdAt;

      return now < newItemCutOff; // if true show new items
    }
  }

});