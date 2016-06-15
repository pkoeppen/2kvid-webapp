'use strict';

angular.module('2kvidWebApp.auth', ['2kvidWebApp.constants', '2kvidWebApp.util',
    'ngCookies', 'ui.router'
  ])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
