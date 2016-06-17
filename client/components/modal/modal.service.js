'use strict';

angular.module('2kvidWebApp')
  .factory('Modal', function($rootScope, $uibModal, Vrf) {
    /**
     * Opens a modal
     * @param  {Object} scope      - an object to be merged with modal's scope
     * @param  {String} modalClass - (optional) class(es) to be applied to the modal
     * @return {Object}            - the instance $uibModal.open() returns
     */
    function openModal(scope = {}, templateUrl = 'components/modal/modal-default.html', modalClass = 'modal-default') {
      var modalScope = $rootScope.$new();

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
         * @param  {Object} vrf     - the VRF data being edited/saved
         * @return {Function}       - the function to open the modal
         */
        edit(vrf={}, isNew=true) {

          return function() {
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
                }]
              }
            }, 'components/modal/modal-edit-vrf.html', 'modal-danger');

            editVrfModal.result.then(function(event) {
              return isNew ? Vrf.save(vrf) : Vrf.update(vrf);
            });
          };
        }
      },
    };
  });
