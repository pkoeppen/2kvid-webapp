'use strict';

angular.module('2kvidWebApp')
  .filter('logFilter', () => {
    return function (log) {

      if ( log.length ) {

      	console.log(JSON.stringify(log, null, 4));

      	let formatted = '';
      	for (let i = 0; i < log.length; i++ ) {

      		switch(log[i].type) {
      			case 'msg':
      				formatted += '<div class="log-msg">'+log[i].data+'</div>';
      				break;
      			case 'scs':
      				formatted += '<div class="log-scs">'+log[i].data+'</div>';
      				break;
      			case 'err':
      				formatted += '<div class="log-err">'+log[i].data+'</div>';
      				break;
      			default:
      				// add break between log groups
      				formatted += '<br />';
      		}
      	}

      	return formatted;

      } else {
      	return log;
      }
    };
  });