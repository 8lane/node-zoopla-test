const router = require('express').Router();
const app = require('../index');
const config = require('../config');
const request = require('request');

function handleSearch(req, res) {
  let searchTerm = req.query.searchValue;

  fetchResults(searchTerm)
    .then((results) => onReturnedResults(results),
          (err) => onNoResults());

  function onReturnedResults(results) {
    app.set('searchResults', results);
    res.redirect('/results');
  }

  function onNoResults() {
    res.render('search/search', { noResultsFound: true });
  }
}

function fetchResults(searchTerm) {
  return new Promise(function(resolve, reject) {
    request({
      url: 'http://localhost:8080/api/search',
      method: 'GET'
    }, function(err, response, body) {
      let data = JSON.parse(body);
      if(data.area === searchTerm) {
        resolve(data)
      } else {
        reject(null);
      }
    });
  });
}

function searchForm(req, res) {
  if(!req.query.searchValue) {
    res.render('search/search');
  } else {
    handleSearch(req, res);
  }
}

router.get('/', searchForm);

module.exports = router;
