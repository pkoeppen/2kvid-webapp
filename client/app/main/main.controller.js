'use strict';

(function() {

  class MainController {

    constructor($http, $scope, Auth, Modal, appConfig, socket) {
      this.$http = $http;
      this.socket = socket;
      this.getCurrentUser = Auth.getCurrentUser;

      this.franchises = appConfig.franchises;
      this.Vrfs = [];

      this.edit = Modal.vrf.edit();
      this.complete = Modal.vrf.complete();
      this.delete = Modal.vrf.delete();

      $scope.$on('$destroy', function() {
        socket.unsyncUpdates('vrf');
      });
    }

    $onInit() {
      this.$http.get('/api/vrf')
        .then(res => {
          this.Vrfs = res.data;
          this.socket.syncUpdates('vrf', this.Vrfs);
        });
    }

    addNote(vrf) {
      var updatedNotes = vrf.notes;

      updatedNotes.push({
        date: Date.now(),
        author: this.getCurrentUser().name,
        body: vrf.newNote,
        important: true
      });

      this.$http.put('/api/vrf/' + vrf._id, {
        notes: updatedNotes
      });

      vrf.newNote = '';
    }

  }

  angular.module('2kvidWebApp')
    .component('main', {
      templateUrl: 'app/main/main.html',
      controller: MainController
    });
})();
