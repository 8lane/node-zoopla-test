const ApiController = require('./api');

module.exports.init = function(req, res) {
  if(!req.query.searchValue) {
    res.render('search/search');
  } else {
    exports.process(req, res);
  }
};

module.exports.process = function(req, res) {
  let searchTerm = req.query.searchValue;

  ApiController.fetchResults(searchTerm)
    .then((results) => onReturnedResults(results), (err) => onNoResults());

  function onReturnedResults(results) {
    res.redirect('/results');
    req.app.set('searchResults', results);
  }

  function onNoResults() {
    res.render('search/search', { noResultsFound: true });
  }
};
