/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/vrf              ->  index
 * POST    /api/vrf              ->  create
 * GET     /api/vrf/:id          ->  show
 * PUT     /api/vrf/:id          ->  update
 * DELETE  /api/vrf/:id          ->  destroy
 */

'use strict';

import config from '../../config/environment';
import _ from 'lodash';
import Vrf from './vrf.model';
import handleUpload from './pdf-upload';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      return res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    // Mongoose won't update the "onit" array (let alone 
    // any updated array of equal length) without this line
    updated.markModified('onit');
    return updated.save()
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    console.log(err);
    console.error(err.stack);
    res.status(statusCode).send(err);
  };
}

// Gets a list of VRFs
export function index(req, res) {
  return Vrf.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single VRF from the DB
export function show(req, res) {
  return Vrf.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new VRF in the DB
export function create(req, res) {
  return handleUpload(req.body)
  .then((newVrf) => { return Vrf.create(newVrf); })
  .then(respondWithResult(res, 201))
  .catch(handleError(res));
}

// Updates an existing VRF in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Vrf.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a VRF from the DB
export function destroy(req, res) {
  return Vrf.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
