'use strict';

angular.module('2kvidWebappApp.auth', ['2kvidWebappApp.constants', '2kvidWebappApp.util',
    'ngCookies', 'ui.router'
  ])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
