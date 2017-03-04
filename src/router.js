const express = require('express')
const join = require('path').join;
const config = require('./config');

const router = new express.Router()

function apiRoute(req, res) {
  res.sendFile(__dirname + '/data/data.json');
}

function defaultRoute(req, res) {
  res.render(config.paths.viewsDir + '/404');
}

router.get('/api/search', apiRoute);
router.get('*', defaultRoute);

module.exports = router;
