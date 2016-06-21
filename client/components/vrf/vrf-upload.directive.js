'use strict';

angular.module('2kvidWebApp')
  .directive('vrfUpload', () => ({
    templateUrl: 'components/vrf/vrf-upload.html',
    restrict: 'E',
    controller: 'VrfUploadController'
  }));
