const ApiController = require('./api');

module.exports.search = function(req, res) {
  if(!req.query.searchValue) {
    res.render('search/search');
  } else {
    handleSearch(req, res);
  }

  function handleSearch(req, res) {
    let searchTerm = req.query.searchValue;

    ApiController.fetchResults(searchTerm)
      .then((results) => onReturnedResults(results), (err) => onNoResults());

    function onReturnedResults(results) {
      req.app.set('searchResults', results);
      res.redirect('/results');
    }

    function onNoResults() {
      res.render('search/search', { noResultsFound: true });
    }
  }

};
