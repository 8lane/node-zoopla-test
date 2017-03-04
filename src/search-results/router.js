const express = require('express');
const app = require('../index');
const router = express.Router();

exports.index = function(req, res) {
  res.render('search-results/results', { searchResults: req.app.get('searchResults') });
};
