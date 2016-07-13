/**
 * Using Rails-like standard naming convention for endpoints.
 * POST    /api/util              ->  exec
 */

'use strict';

const fs = require('fs'),
      path = require('path'),
      walk = require('walk');

import renameFiles from './file-renamer'

/**
* ### Execute a VidProd utility function
*
* @param  {Object} pkg      - the utility package with command and args
* @return {Promise}         - returns a Promise
*/
function execUtility(pkg) {
  return new Promise((resolve, reject) => {
    switch (pkg.cmd) {

      case 'rename':
        renameFiles(pkg.args, output => resolve(output));
        break;

    }
  });
}

function respondWithOutput(res, statusCode) {
  statusCode = statusCode || 200;
  return function(output) {
    if (output) {
      res.status(statusCode).json(output);
    }
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

export function exec(req, res) {
  return execUtility(req.body)
  .then(respondWithOutput(res))
  .catch(handleError(res));
}
