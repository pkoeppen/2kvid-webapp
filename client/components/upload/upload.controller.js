'use strict';

class UploadController {

  constructor($scope, Upload, Modal, $timeout) {

    $scope.$watch('files', function () {
        $scope.upload($scope.files);
    });
    $scope.$watch('file', function () {
        if ($scope.file != null) {
            $scope.files = [$scope.file]; 
        }
    });
    $scope.log = '';

    $scope.upload = function (files) {
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
              var file = files[i];
              if (!file.$error) {
                Upload.upload({
                    url: '/api/vrf/upload',
                    data: { file: file }
                }).then(function (res) {
                    $timeout(function() {
                        $scope.log = 'file: ' +
                        res.config.data.file.name +
                        ', Response: ' + JSON.stringify(res.data) +
                        '\n' + $scope.log;

                        var newVrf = res.data;
                        Modal.vrf.edit(newVrf)();

                    });
                }, null, function (evt) {
                    var progressPercentage = parseInt(100.0 *
                    		evt.loaded / evt.total);
                    $scope.log = 'progress: ' + progressPercentage + 
                    	'% ' + evt.config.data.file.name + '\n' + 
                      $scope.log;
                });
              }
            }
        }
    };

  }

}

angular.module('2kvidWebApp')
  .controller('UploadController', UploadController);
