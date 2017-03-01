var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var request = require('request');
var path = require('path');
var http = require('http');
var hbs = require('express-hbs');

const CLIENT_PATH = path.resolve(__dirname, '..' + '/client');
const VIEWS_PATH = CLIENT_PATH + '/views'

app.use(bodyParser.urlencoded({ extended: true }));

// app.set('views', path.resolve(__dirname, '..' + '/client/views/'));
// app.engine('html', require('ejs').renderFile);

app.set('view engine', 'hbs'); /* Set view engine */

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
    res.render('partials/no-results');
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
    console.log('RESULTS: ', app.get('searchResults'));
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
