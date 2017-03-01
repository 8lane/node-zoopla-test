var express = require('express');
var app = require('../index');
var router = express.Router();
var config = require('../config');

function searchResults(req, res) {
  res.render('search-results/results', { searchResults: app.get('searchResults') });
}

router.get('/', searchResults);

module.exports = router;
