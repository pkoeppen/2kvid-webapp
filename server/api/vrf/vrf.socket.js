/**
 * Broadcast updates to client when the model changes
 */

'use strict';

import VrfEvents from './vrf.events';

// model events to emit
const events = ['save', 'remove'];

export function register(socket) {
  
  // bind model events to socket events
  for (let i = 0, eventsLength = events.length; i < eventsLength; i++) {
    let event = events[i];
    let listener = createListener('vrf:' + event, socket);

    VrfEvents.on(event, listener);
    socket.on('disconnect', removeListener(event, listener));
  }
}


function createListener(event, socket) {
  return function(doc) {
    socket.emit(event, doc);
  };
}

function removeListener(event, listener) {
  return function() {
    VrfEvents.removeListener(event, listener);
  };
}
