'use strict';

// uncomment for production
// angular.module('2kvidWebApp')
// .config(function($stateProvider) {
// 	$stateProvider.state('main', {
// 	  url: '/main',
// 	  template: '<main></main>',
// 	  authenticate: 'user'
// 	});
// });

angular.module('2kvidWebApp')
.config(function($stateProvider) {
	$stateProvider.state('main', {
	  url: '/main',
	  template: '<main></main>'
	});
});
