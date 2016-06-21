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
      title: 'Mafia III VRF Test',
      from: 'Mafia Team',
      for: 'mafia3',
      date: Date.now(),
      due: Date.now(),
      body: 'Fake body message for Test VRF 1',
      notes: [
        {
          date: Date.now(),
          author: 'Kenny',
          body: 'Translations here: N:\\2KGNOV\\VidProd\\vtrak_c\\Mafia III\\_translations\\Announce Trailer\\MafiaIII_AnnounceTrailer_Localization.xlsx',
          important: true
        },
        {
          date: Date.now(),
          author: 'Kenny',
          body: 'And the textless render-- N:\\2KGNOV\\VidProd\\vtrak_c\\Mafia III\\_edits\\Announce Trailer\\Project_Whiskey_FINAL_ProRes.mov',
          important: false
        }
      ],
      onit: [
        'Kenny',
        'Doug'
      ],
      urgent: true,
      active: true
    }, {
      title: 'Battleborn VRF Test',
      from: 'BB Team',
      for: 'bborn',
      date: Date.now(),
      due: Date.now(),
      body: 'Fake body message for Test VRF 2',
      notes: [
        {
          date: Date.now(),
          author: 'Pete',
          body: 'Note body for super fake placeholder note',
          important: false
        },
        {
          date: Date.now(),
          author: 'Kenny',
          body: 'Note body for super fake placeholder note',
          important: true
        },
        {
          date: Date.now(),
          author: 'Dom',
          body: 'Note body for super fake placeholder note',
          important: true
        }
      ],
      onit: [
        'Nick',
        'Mike',
        'Eric',
        'Dom'
      ],
      urgent: false,
      active: true
    });
  });

User.find({}).remove()
  .then(() => {
    User.create({
      provider: 'local',
      role: 'admin',
      name: 'Pete',
      email: 'peter.koeppen@2k.com',
      password: 'pass'
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Kenny',
      email: 'kenneth.crosbie@2k.com',
      password: 'pass'
    }, {
      provider: 'local',
      role: 'user',
      name: 'Doug',
      email: 'doug.tyler@2k.com',
      password: 'pass'
    }, {
      provider: 'local',
      role: 'user',
      name: 'Nick',
      email: 'nick.pylvanainen@2k.com',
      password: 'pass'
    }, {
      provider: 'local',
      role: 'user',
      name: 'Mike',
      email: 'mike.regelean@2k.com',
      password: 'pass'
    }, {
      provider: 'local',
      role: 'user',
      name: 'Eric',
      email: 'eric.neff@2k.com',
      password: 'pass'
    }, {
      provider: 'local',
      role: 'user',
      name: 'Patrick',
      email: 'patrick.starr@2k.com',
      password: 'pass'
    }, {
      provider: 'local',
      role: 'user',
      name: 'Evan',
      email: 'evan.falco@2k.com',
      password: 'pass'
    }, {
      provider: 'local',
      role: 'user',
      name: 'Dom',
      email: 'dom.hassett@2k.com',
      password: 'pass'
    })
    .then(() => {
      console.log('finished populating users');
    });
  });
