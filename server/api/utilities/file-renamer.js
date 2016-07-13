'use strict';

const fs = require('fs'),
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

  try { 
    fs.accessSync(args.rootDir, fs.F_OK);
  }
  catch (e) { 
    return cb({
      log: [{ type: 'err', data: 'Location unavailable.'}]
    });
  }

  let walker,
      log = [],
      listFiles = [],
      listDirs = [],
      re = new RegExp(args.inText, 'i');

  let opts = {
    listeners: {

      // logic for directories
      directories: (root, dirStatsArray, next) => {
        if ( args.hasOwnProperty('renameDirs') && args.renameDirs && isRoot(args, root) ) {
          for ( let i in dirStatsArray ) {
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
        let name = fileStats.name;
        if ( re.test(name) && isRoot(args,root) ) {
          if ( !args.hasOwnProperty('limitExt') || (args.hasOwnProperty('limitExt') && name.endsWith(args.limitExt)) ) {
            listFiles.push({
              root: root,
              name: name
            });
          }
        }
        next();
      },

      // error stuff, I don't even know if this works
      errors: (root, nodeStatsArray, next) => {
        for ( let i in nodeStatsArray ) {
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
    for ( let i in list ) {
      let node = list[i];
      let pathOld = path.join(node.root, node.name),
          pathNew = path.join(node.root, node.name.replace(re, args.outText));
      try {
        fs.renameSync(pathOld, pathNew);
        log.push({
          type: 'scs',
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

export default renameFiles;