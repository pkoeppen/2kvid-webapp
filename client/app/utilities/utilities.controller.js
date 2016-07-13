'use strict';

(function() {

  class UtilitiesController {

    constructor($http, $scope) {
      this.$http = $http;

      $scope.log = [];
      $scope.limitExt = 'none';
      $scope.extensions = [
        'aep',
        'mov',
        'mp4',
        'prproj',
        'psd',
        'txt'
      ];

      $scope.clearLog = function() {
        $scope.log = [];
      }

      $scope.renameFiles = function(form) {        
        if (form.$valid) {

          let pkg = {
            cmd: 'rename',
            args: {
              rootDir: $scope.rootDir,
              inText: $scope.inText,
              outText: $scope.outText,
              limitExt: $scope.limitExt === 'none'
                        ? undefined
                        : $scope.limitExt,
              renameDirs: $scope.renameDirs,
              rootOnly: $scope.rootOnly
            }
          };

          $http.post('/api/util', pkg)
          .then(res => {
            $scope.log = res.data.log.concat([{}], $scope.log);
          });
        }
      };
    }

  }

  angular.module('2kvidWebApp')
    .component('utilities', {
      templateUrl: 'app/utilities/utilities.html',
      controller: UtilitiesController
    });
})();
