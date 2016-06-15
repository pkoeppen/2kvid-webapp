'use strict';

angular.module('2kvidWebApp')
  .config(function($stateProvider) {
    $stateProvider.state('main', {
      url: '/main',
      template: '<main></main>'
    });
  });
