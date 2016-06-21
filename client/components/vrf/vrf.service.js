'use strict';

angular.module('2kvidWebApp')
  .factory('Vrf', function($http) {

    return {

      save(vrfData) {
        $http.post('/api/vrf/', vrfData)
        .then(res => {
          if (res.status != 201) {
            // error modal
          }
        });
      },

      update(vrf) {
        $http.put('/api/vrf/' + vrf._id, vrf)
        .then(res => {
          if (res.status != 201) {
            // error modal
          }
        });
      },

      delete(vrf) {
        $http.delete('/api/vrf/' + vrf._id, vrf)
        .then(res => {
          if (res.status != 201) {
            // error modal
          }
        });
      }
    };
  });
