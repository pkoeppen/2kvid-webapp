'use strict';

(function() {

  class UtilitiesController {

    constructor($http, $scope, Upload, Modal) {
      this.$http = $http;

      $scope.log = '';
      $scope.limitExt = 'none';
      $scope.rootOnly = true;

      $scope.renameFiles = function(form) {        
        if (form.$valid) {
          var pkg = {
            cmd: 'rename',
            args: {
              rootDir: $scope.rootDir,
              inText: $scope.inText,
              outText: $scope.outText,
              limitExt: $scope.limitExt == 'none' ? undefined : $scope.limitExt,
              renameDirs: $scope.renameDirs,
              rootOnly: $scope.rootOnly
            }
          };
          // console.log(JSON.stringify(pkg, null, 4));
          // return;
          $http.post('/api/util', pkg)
          .then(res => {
            $scope.log = JSON.stringify(res.data, null, 4) + '\n' + $scope.log;
          });
        }
      }
    }

  }

  angular.module('2kvidWebApp')
    .component('utilities', {
      templateUrl: 'app/utilities/utilities.html',
      controller: UtilitiesController
    });
})();
