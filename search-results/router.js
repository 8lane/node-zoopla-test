const express = require('express');
const app = require('../index');
const router = express.Router();
const config = require('../config');

function searchResults(req, res) {
  res.render('search-results/results', { searchResults: app.get('searchResults') });
}

router.get('/', searchResults);

module.exports = router;
