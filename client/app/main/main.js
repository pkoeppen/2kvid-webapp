'use strict';

angular.module('2kvidWebappApp')
  .config(function($stateProvider) {
    $stateProvider.state('main', {
      url: '/main',
      template: '<main></main>'
    });
  });
