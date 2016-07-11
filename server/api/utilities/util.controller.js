/**
 * Using Rails-like standard naming convention for endpoints.
 * POST    /api/util              ->  exec
 */

'use strict';

var fs = require('fs'),
  path = require('path'),
  walk = require('walk');

/**
* Renames files and folders on the N:\ drive
* @param {Object} args     - parameters for renaming behavior
* @param {Function} cb     - callback for async resolve()ing
*/
function renameFiles(args, cb) {

  function isRoot(a,r) {
    // checks rootOnly property, defaults to true
    return a.hasOwnProperty('rootOnly') && a.rootOnly
            ? path.normalize(a.rootDir) === path.normalize(r)
            : true;
  }

  try { fs.accessSync(args.rootDir, fs.F_OK); }
  catch (e) { return cb({ log: [{ type: 'err', data: 'Location unavailable.'}] }); }

  var walker,
      log = [],
      listFiles = [],
      listDirs = [],
      re = new RegExp(args.inText, 'i');

  var opts = {
    listeners: {
      // logic for directories
      directories: (root, dirStatsArray, next) => {
        if ( args.hasOwnProperty('renameDirs') && args.renameDirs && isRoot(args, root) ) {
          for ( var i in dirStatsArray ) {
            if ( re.test(dirStatsArray[i].name) ) {
              listDirs.push({
                root: root,
                name: dirStatsArray[i].name
              });
            }
          }
        }
        next();
      },
      // logic for (individual) files
      file: (root, fileStats, next) => {
        if ( re.test(fileStats.name) && isRoot(args,root) ) {
          if ( !args.hasOwnProperty('limitExt') || (args.hasOwnProperty('limitExt') && files[i].endsWith(args.limitExt)) ) {
            listFiles.push({
              root: root,
              name: fileStats.name
            });
          }
        }
        next();
      },
      // error stuff, I don't even know if this works
      errors: (root, nodeStatsArray, next) => {
        for ( var i in nodeStatsArray ) {
          log.push({
            type: 'err',
            data: nodeStatsArray[i].error.message
          });
        }
        next();
      }
    }
  };

  walker = walk.walkSync(args.rootDir, opts);

  // rename files first, then directories
  [listFiles, listDirs].map(list => {
  for ( var i in list ) {
      var node = list[i];
      var pathOld = path.join(node.root, node.name),
          pathNew = path.join(node.root, node.name.replace(re, args.outText));
      try {
        fs.renameSync(pathOld, pathNew);
        log.push({
          type: 'msg',
          data: 'Renamed: ' + pathOld + ' >> ' + pathNew
        });
      } catch (error) {
        log.push({
          type: 'err',
          data: error.message
        });
      }
    }
  });

  return cb({ log: log.length ? log : [{ type: 'msg', data: 'No matches.'}] });
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
