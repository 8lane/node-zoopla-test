var express = require('express');
var app = express();
var request = require('request');
var path = require('path');
var hbs = require('express-hbs');
var hbsHelpers = require(__dirname + '/handlebars-helpers');

const CLIENT_PATH = path.resolve(__dirname, '..' + '/client');
const VIEWS_PATH = CLIENT_PATH + '/views';

/* Set view engine */
app.set('view engine', 'hbs');

/* Configure view engine */
app.engine('hbs', hbs.express4({
  defaultLayout: VIEWS_PATH + '/layouts/default.hbs',
  partialsDir: VIEWS_PATH + '/partials',
  layoutsDir: VIEWS_PATH + '/layouts'
}));

/* Set views path */
app.set('views', VIEWS_PATH);

/* Search Route */
app.get('/search', function(req, res){
  console.log(req.query);

  if(!req.query.searchValue) {
    res.render('partials/search');
  } else {
    handleSearch(req, res);
  }
});

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
    res.render('partials/search', { noResultsFound: true });
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

/* Results Route */
app.get('/results', function(req, res) {
  res.render('partials/results', { searchResults: app.get('searchResults') });
});

/* API Route */
app.get('/api/search', function(req, res) {
  res.sendFile(path.resolve('./server/data/data.json'));
});

/* Default Route */
app.get('*', function(req, res) {
  res.render('partials/404');
});

app.listen(8080);
