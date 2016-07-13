'use strict';

class VrfUploadController {

  constructor($scope, Upload, Modal, $timeout) {
    $scope.edit = Modal.vrf.edit();

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

            var spinner = document.getElementById('upload-spinner');

            // make it spin while loading
            spinner.className = 
                spinner.className
                .replace(/\bfa-plus\b/, 'fa-plus spinning');

            for (var i = 0; i < files.length; i++) {

              var file = files[i];

              if (!file.$error) {

                Upload.upload({
                    url: '/api/vrf/parse',
                    data: { file: file }
                }).then(function (res) {

                    $timeout(function() {

                        // stop spinning
                        spinner.className = 
                            spinner.className
                            .replace(/\bfa-plus spinning\b/, 'fa-plus');

                        $scope.log = 'file: ' +
                        res.config.data.file.name +
                        ', Response: ' + JSON.stringify(res.data, null, 4) +
                        '\n' + $scope.log;

                        var newVrf = res.data;
                        $scope.edit(newVrf);
                    });

                }, null, function (evt) {

                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);

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
  .controller('VrfUploadController', VrfUploadController);
