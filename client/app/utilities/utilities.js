'use strict';

// uncomment for production
// angular.module('2kvidWebApp')
// 	.config(function($stateProvider) {
// 	$stateProvider.state('util', {
// 	  url: '/util',
// 	  template: '<utilities></utilities>',
// 	  authenticate: 'user'
// 	});
// });

angular.module('2kvidWebApp')
.config(function($stateProvider) {
	$stateProvider.state('utilities', {
	  url: '/utilities',
	  template: '<utilities></utilities>'
	});
});
