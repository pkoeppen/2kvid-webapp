'use strict';

var express = require('express');
var controller = require('./vrf.controller');
import * as auth from '../../auth/auth.service';

var router = express.Router();

router.get('/', auth.isAuthenticated(), controller.index);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', auth.isAuthenticated(), controller.create);
router.put('/:id', auth.isAuthenticated(), controller.update);
router.patch('/:id', auth.isAuthenticated(), controller.update);
router.delete('/:id', auth.isAuthenticated(), controller.destroy);
router.post('/parse', auth.isAuthenticated(), controller.parse);
router.post('/:id/upload', auth.isAuthenticated(), controller.upload);

/*
When a user submits a new VRF, the file is uploaded to the server,
parsed, and sent back for further editing before being saved. Upon
clicking "Save," the VRF JSON data is sent back to the server with
the temporary path of the previous file upload. The file is then
saved to the server.
*/

module.exports = router;
