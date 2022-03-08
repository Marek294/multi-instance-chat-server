const express = require('express');
const asyncMiddleware = require('../../../middlewares/async');
const { validator } = require('../../../../utils/validation');
const hello = require('./hello');

const router = express.Router();

router.get(
  '/hello',
  hello.limiter,
  validator.query(hello.validation),
  asyncMiddleware(hello.controller),
);

module.exports = router;
