const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const sinonStubPromise = require('sinon-stub-promise');
const sinonChai = require("sinon-chai");
const request = require('request');

chai.should();
chai.use(sinonChai);
sinonStubPromise(sinon);

const SearchController = require('./search');
const ApiController = require('./api');

let res = {
  viewName: '', viewData: '',
  render: (view, viewData) => {
    res.viewName = view;
    res.viewData = viewData;
  },
  redirect: (view) => {
    res.viewName = view
  }
};

let req = {
  query: {},
  app: {
    searchResults: null,
    set: (key, value) => req.app[key] = value
  }
}

describe('Search Controller', function() {
  describe('when not searching for anything', function() {
    beforeEach(function() {
      SearchController.init(req, res);
    });

    it('should display the search page', function() {
      let expectedView = 'search/search';
      expect(res.viewName).to.be.equal(expectedView);
    });

    it('should not display a no results found message', function() {
      expect(res.viewData).to.be.undefined; // Assert
    });
  });

  describe('When searching for any post code', function() {
    afterEach(function() {
      ApiController.fetchResults.restore();
    });

    it('should call the api with the searched area', function() {
      let spy = sinon.spy(ApiController, 'fetchResults');
      let req = { query: { searchValue: 'N11' } }

      SearchController.init(req, res);

      ApiController.fetchResults.called.should.be.true;
      ApiController.fetchResults.should.be.calledWith(req.query.searchValue);
    });
  });

  describe('When searching for results that do not exist', function() {
    beforeEach(function() {
      sinon.stub(ApiController, 'fetchResults').returns(
        new Promise(function(resolve, reject){
          reject(null);
        })
      );

      req.query.searchValue = 'doesnotexist';
      SearchController.init(req, res);
    });

    afterEach(function() {
      ApiController.fetchResults.restore();
    });

    it('should re-load the search page', function() {
      let expectedView = 'search/search';
      expect(res.viewName).to.be.equal(expectedView);
    });

    it('should display a no results found message', function() {
      let expectedResult = { noResultsFound: true };
      expect(res.viewData).to.be.eql(expectedResult);
    });
  })

  describe('When searching for results that exist', function() {
    beforeEach(function() {
      sinon.stub(ApiController, 'fetchResults').returns(
        new Promise((resolve, reject) => resolve(require('../data/data.json')))
      );

      req.query.searchValue = 'N11';

      SearchController.process(req, res);
    });

    afterEach(function() {
      ApiController.fetchResults.restore();
    });

    it('should redirect to the results page', function(done) {
      let expectedView = '/results';
      expect(res.viewName).to.be.equal(expectedView);
      done();
    });

    it('should save the results', function() {
      let expectedResults = require('../data/data.json');
      expect(req.app.searchResults).to.be.equal(expectedResults);
    });
  });

});
