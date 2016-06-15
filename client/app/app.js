'use strict';

angular.module('2kvidWebappApp', ['2kvidWebappApp.auth', '2kvidWebappApp.admin',
    '2kvidWebappApp.constants', 'ngCookies', 'ngResource', 'ngSanitize', 'btford.socket-io',
    'ui.router', 'ui.bootstrap', 'validation.match'
  ])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(true);
  });
