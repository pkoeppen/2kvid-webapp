'use strict';

angular.module('2kvidWebApp')
  .factory('Modal', function($rootScope, $uibModal, appConfig, Vrf, User) {
    /**
     * Opens a modal
     * @param  {Object} scope      - an object to be merged with modal's scope
     * @param  {String} modalClass - (optional) class(es) to be applied to the modal
     * @return {Object}            - the instance $uibModal.open() returns
     */
    function openModal(scope = {}, templateUrl = 'components/modal/modal-default.html', modalClass = 'modal-default') {
      var modalScope = $rootScope.$new();
      modalScope.franchises = appConfig.franchises;
      modalScope.users = User.query();

      angular.extend(modalScope, scope);

      return $uibModal.open({
        templateUrl: templateUrl,
        windowClass: modalClass,
        scope: modalScope
      });
    }

    // Public API here
    return {

      /* VRF modals */
      vrf: {

        /**
         * Create a function to open a modal to edit a VRF
         * @param  {Object} vrf     - the VRF data being created or updated
         * @param  {Object} isNew   - determines the endpoint (create or update)
         * @return {Function}       - the function that opens the modal
         */
        edit() {

          // TODO:
          // Unbind VRF model in modal template so that it
          // doesn't update in the main template as you type

          return function(vrf={}, isNew=true) {

            if (isNew) {
              vrf.active = true; 
              vrf.fileUrl = vrf.fileUrl || ''; }

            if (!vrf.hasOwnProperty('onit')) { vrf.onit = []; }

            var editVrfModal = openModal({
              modal: {
                vrf: vrf,
                dismissable: true,
                title: isNew ? 'Edit New VRF' : 'Edit VRF',
                buttons: [{
                  classes: 'btn-danger',
                  text: 'Save',
                  click: function(e) {
                    editVrfModal.close(e);
                  }
                }, {
                  classes: 'btn-default',
                  text: 'Cancel',
                  click: function(e) {
                    editVrfModal.dismiss(e);
                  }
                }],
                toggleOnIt: function(user) {
                  var i = this.vrf.onit.indexOf(user.name);
                  if ( i > -1 ) { 
                    this.vrf.onit.splice(i, 1); }
                  else { 
                    this.vrf.onit.push(user.name); }
                },
                toggleUrgent: function() {
                  this.vrf.urgent = !this.vrf.urgent;
                }
              }
            }, 'components/modal/modal-edit-vrf.html', 'modal-danger');

            editVrfModal.result.then(function(event) {
              return isNew ? Vrf.save(vrf) : Vrf.update(vrf);
            });
          };
        },

        complete() {
          return function(vrf) {
            vrf.active = false;
            return Vrf.update(vrf);
          };
        },

        delete() {
          return function(vrf) {
            var confirmDeleteModal = openModal({
              modal: {
                vrf: vrf,
                dismissable: true,
                title: 'Confirm Deletion',
                html: 'Are you sure you want to delete this VRF?',
                buttons: [{
                  classes: 'btn-danger',
                  text: 'Delete',
                  click: function(e) {
                    confirmDeleteModal.close(e);
                  }
                }, {
                  classes: 'btn-default',
                  text: 'Cancel',
                  click: function(e) {
                    confirmDeleteModal.dismiss(e);
                  }
                }]
              }
            }, 'components/modal/modal-default.html', 'modal-danger');

            confirmDeleteModal.result.then(function(event) {
              return Vrf.delete(vrf);
            });
          };
        }
      },
    };
  });
