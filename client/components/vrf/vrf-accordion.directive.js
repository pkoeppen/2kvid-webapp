'use strict';

angular.module('2kvidWebApp')
  .directive('vrfAccordionActive', () => ({
    templateUrl: 'components/vrf/vrf-accordion.html',
    scope: true,
    restrict: 'E',
    controller: 'VrfAccordionController',
    link: function(scope) {
    	scope.active = true;
    }
  }))
  .directive('vrfAccordionComplete', () => ({
    templateUrl: 'components/vrf/vrf-accordion.html',
    scope: true,
    restrict: 'E',
    controller: 'VrfAccordionController',
    link: function(scope) {
    	scope.active = false;
    }
  }));
