const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const app = require('../index');
const SearchRouter = require("./router");

var req = {
  app: { get: () => require('../data/data.json') }
};

var res = {
  viewName: '', data : {},
  render: function(view, viewData) {
    this.viewData = viewData;
  }
};

describe('Search results page', function() {
  it('should render results', function(done) {
    let data = { searchResults: require('../data/data.json') }; // Arrange
    SearchRouter.index(req, res); // Act
    expect(res.viewData).to.eql(data); // Assert
    done();
  });

  it('should display', function(done) {
    request(app)
    .get('/results')
    .expect('Content-Type', /html/)
    .expect(200, done)
  });
});
