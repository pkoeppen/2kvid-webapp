'use strict';

(function() {

  class MainController {

    constructor($http, $scope, socket) {
      this.$http = $http;
      this.socket = socket;
      this.Vrfs = [];

      $scope.$on('$destroy', function() {
        socket.unsyncUpdates('vrf');
      });
    }

    $onInit() {
      this.$http.get('/api/vrf')
        .then(response => {
          this.Vrfs = response.data;
          this.socket.syncUpdates('vrf', this.Vrfs);
        });
    }

    addVrf() {
      if (this.newVrf) {
        this.$http.post('/api/vrf', {
          name: this.newVrf
        });
        this.newVrf = '';
      }
    }

    deleteVrf(vrf) {
      this.$http.delete('/api/vrf/' + vrf._id);
    }
  }

  angular.module('2kvidWebappApp')
    .component('main', {
      templateUrl: 'app/main/main.html',
      controller: MainController
    });
})();
