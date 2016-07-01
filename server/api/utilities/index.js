'use strict';

var express = require('express');
var controller = require('./util.controller');
import * as auth from '../../auth/auth.service';

var router = express.Router();

// uncomment in production
// router.get('/', auth.isAuthenticated(), controller.exec);

router.post('/', controller.exec);

module.exports = router;
