'use strict';

const version = require('../../../package.json').version;

exports = module.exports = {
  version,
  userRoles: ['guest', 'user', 'admin'],
  franchises: {
  	'bborn': 'Battleborn',
  	'civ6': 'Civilization VI',
  	'mafia3': 'Mafia III',
    "mktg": "Marketing",
  	'nhlsuper': 'NHL 2K SuperCard',
  	'nba2k17': 'NBA 2K17',
  	'wwe2k17': 'WWE 2K17',
  	'wwesuper': 'WWE 2K SuperCard',
  	'xcom2': 'XCOM 2'
  }
};
