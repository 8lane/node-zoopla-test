const router = require('express').Router();
const app = require('../index');
const config = require('../config');
const request = require('request');
const controller = require('../controllers/search');

router.get('/', controller.search);

module.exports = router;
