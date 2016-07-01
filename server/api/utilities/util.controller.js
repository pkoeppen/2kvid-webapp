/**
 * Using Rails-like standard naming convention for endpoints.
 * POST    /api/util              ->  exec
 */

'use strict';

var fs = require('fs'),
  path = require('path');

function respondWithOutput(res, statusCode) {
  statusCode = statusCode || 200;
  return function(output) {
    if (output) {
      res.status(statusCode).json(output);
    }
  };
}

function renameFiles(args, cb) {
  fs.readdir(args.rootDir, (err, files) => {
    if (err) { return cb({ error: err.message }); }
    var log = [];
    for (var i in files) {
      var re = new RegExp(args.inText, 'i');

      // logic tests
      if (re.test(files[i])) {
        var match = true,
            pathOld = path.join(args.rootDir, files[i]),
            pathNew = path.join(args.rootDir, files[i].replace(re, args.outText));

        // CONTINUE HERE
        if ( args.hasOwnProperty('limitExt') && !files[i].endsWith(args.limitExt) )           { match = false; }
        else if ( args.hasOwnProperty('includeDirs') && !fs.statSync(pathOld).isDirectory() ) { match = false; }

        if (match) {
          try {
            fs.renameSync(pathOld, pathNew);
            log.push('Renamed: ' + pathOld + ' >> ' + pathNew);
          } catch (e) {
            return cb({
              error: e.message,
              log: log
            });
          }
        }
      }
    }
    cb({ log: log.length ? log : ['No matches.']});
  });
}

/**
* Execute a VidProd utility function
* @param  {Object} pkg      - the utility package with command and args
* @return {Promise}         - returns a Promise
*/
function execUtility(pkg) {
  return new Promise((resolve, reject) => {
    switch (pkg.cmd) {
      case 'rename':
        renameFiles(pkg.args, output => resolve(output));
        break;
      case 'foo':
        resolve({foo:'bar'});
        break;
    }
  });
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
