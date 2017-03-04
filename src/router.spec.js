const request = require('supertest');
const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const app = require('./index');

describe('Default Route', function() {
  describe('Given I enter a path in browser\'s address bar', function() {
    describe('And path is not "results" or "search"', function() {
      it('should display the 404 page', function(done) {
        request(app)
          .get('/notapage')
          .expect('Content-Type', /html/)
          .expect(200, done);
      });
    });
  });
});

describe('API Route', function() {
  describe('When requesting for properties data', function() {
    it('should output the data in json', function(done) {
      request(app)
        .get('/api/search')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });
});
