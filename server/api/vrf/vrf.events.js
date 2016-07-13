/**
 * Vrf model events
 */

'use strict';

import {EventEmitter} from 'events';
import Vrf from './vrf.model';
const VrfEvents = new EventEmitter();

// set max event listeners (0 == unlimited)
VrfEvents.setMaxListeners(0);

// model events
const events = {
  'save': 'save',
  'remove': 'remove'
};

// register the event emitter to the model events
for (let e in events) {
  let event = events[e];
  Vrf.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    VrfEvents.emit(event + ':' + doc._id, doc);
    VrfEvents.emit(event, doc);
  }
}

export default VrfEvents;
