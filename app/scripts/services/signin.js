'use strict';

angular.module('eventAngularApp')
.factory('signinService',function ($http) {

  var obj = {

    postData: function(data) {

      function success (response) {
        return response;
      }

      function failure(response) {
        return response;
      }
      var params = data;
      return $http.post('http://localhost:3000/'+'api/v1/accounts',params).then(success,failure);
    },
  }
  return obj;

});
