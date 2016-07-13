'use strict';

class VrfAccordionController {

  constructor($scope, appConfig, Upload) {

    $scope.filt = {};

    for ( var key in appConfig.franchises ) {
      $scope.filt[key] = true;
    }

    $scope.toggleFilt = function() {
      for ( var key in $scope.filt ) {
        $scope.filt[key] = !$scope.filt[key];
      }
    };

    $scope.uploadTo = function (file, id) {

      if (!file.$error) {

        Upload.upload({
            url: '/api/vrf/'+id+'/upload',
            data: { file: file }
        }).then(function (res) {

          // stuff here
          console.log('uploaded');

        });
      }
    };

  }
}

angular.module('2kvidWebApp')
  .controller('VrfAccordionController', VrfAccordionController);
