/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Vrf from '../api/vrf/vrf.model';
import User from '../api/user/user.model';

Vrf.find({}).remove()
  .then(() => {
    Vrf.create({
      title: 'Test VRF Title 1',
      from: 'Requester 1',
      for: 'For Franchise 1',
      date: Date.now(),
      due: Date.now(),
      body: 'Fake body message for Test VRF 1',
      notes: [
        {
          date: Date.now(),
          author: 'Note 1 author',
          body: 'Note body for super fake placeholder note',
          important: true
        },
        {
          date: Date.now(),
          author: 'Note 2 author',
          body: 'Note body for super fake placeholder note',
          important: false
        }
      ],
      onit: [
        'Dude 1',
        'Dude 2'
      ],
      active: true
    }, {
      title: 'Test VRF Title 2',
      from: 'Requester 2',
      for: 'For Franchise 2',
      date: Date.now(),
      due: Date.now(),
      body: 'Fake body message for Test VRF 2',
      notes: [
        {
          date: Date.now(),
          author: 'Note 1 author',
          body: 'Note body for super fake placeholder note',
          important: false
        },
        {
          date: Date.now(),
          author: 'Note 2 author',
          body: 'Note body for super fake placeholder note',
          important: true
        },
        {
          date: Date.now(),
          author: 'Note 3 author',
          body: 'Note body for super fake placeholder note',
          important: true
        }
      ],
      onit: [
        'Dude 1',
        'Dude 2',
        'Dude 3'
      ],
      active: false
    });
  });

User.find({}).remove()
  .then(() => {
    User.create({
      provider: 'local',
      name: 'Test User',
      email: 'test@example.com',
      password: 'test'
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Kenneth',
      email: 'kenneth.crosbie@2k.com',
      password: 'admin'
    })
    .then(() => {
      console.log('finished populating users');
    });
  });
