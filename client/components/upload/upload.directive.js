'use strict';

angular.module('2kvidWebApp')
  .directive('upload', () => ({
    templateUrl: 'components/upload/upload.html',
    restrict: 'E',
    controller: 'UploadController'
  }));
