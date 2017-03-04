const request = require('supertest');
const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;

const app = require('../index');
const SearchComponent = require("./router");

describe('Search page', function() {

  it('should display the page', function(done) {
    request(app)
    .get('/search')
    .expect('Content-Type', /html/)
    .expect(200, done);
  });
});
