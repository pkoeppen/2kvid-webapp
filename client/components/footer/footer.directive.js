'use strict';

angular.module('2kvidWebApp')
  .directive('footer', ['appConfig', (appConfig) => ({
      templateUrl: 'components/footer/footer.html',
      restrict: 'E',
      link: function(scope, element) {
        element.addClass('footer');
        scope.version = appConfig.version;
      }
    })]
  );
