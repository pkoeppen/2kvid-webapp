/**
 * Vrf model events
 */

'use strict';

import {EventEmitter} from 'events';
import Vrf from './vrf.model';
var VrfEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
VrfEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Vrf.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    VrfEvents.emit(event + ':' + doc._id, doc);
    VrfEvents.emit(event, doc);
  }
}

export default VrfEvents;
