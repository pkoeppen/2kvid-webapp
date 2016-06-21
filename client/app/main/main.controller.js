'use strict';

(function() {

  class MainController {

    constructor($http, $scope, Auth, Modal, socket) {
      this.$http = $http;
      this.getCurrentUser = Auth.getCurrentUser;
      this.socket = socket;
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
        .then(response => {
          this.Vrfs = response.data;
          this.socket.syncUpdates('vrf', this.Vrfs);
        });
    }

    addNote(vrf) {
      var updatedNotes;
      updatedNotes = vrf.notes;
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
