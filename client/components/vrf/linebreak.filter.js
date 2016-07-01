'use strict';

angular.module('2kvidWebApp')
  .filter('linebreak', () => {
    return function (text) {
      if (!text) { return text; }
      // return text.replace(/(\n?\r)+/g, '<br />');
      return text.replace(/\n?\r/g, '<br />');
    };
  });