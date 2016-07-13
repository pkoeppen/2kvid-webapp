'use strict';

angular.module('2kvidWebApp')
  .directive('vrfAccordionActive', ['appConfig', (appConfig) => ({
    templateUrl: 'components/vrf/vrf-accordion.html',
    scope: true,
    restrict: 'E',
    link: function(scope) {
    	scope.active = true;
    },
    controller: 'VrfAccordionController'
  })])
  .directive('vrfAccordionComplete', ['appConfig', (appConfig) => ({
    templateUrl: 'components/vrf/vrf-accordion.html',
    scope: true,
    restrict: 'E',
    link: function(scope) {
    	scope.active = false;
    },
    controller: 'VrfAccordionController'
  })]);
