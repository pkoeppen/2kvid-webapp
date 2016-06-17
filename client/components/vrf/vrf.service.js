'use strict';

angular.module('2kvidWebApp')
  .factory('Vrf', function() {

    return {

      save(vrf) {
        alert('Saving new VRF');
        return;
      },

      update(vrf) {
        alert('Updating existing VRF');
        return;
      }
    };
  });
