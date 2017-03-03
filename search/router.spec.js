var chai = require('chai');
var should = chai.should();
var expect = chai.expect;
var sinon = require('sinon');
var request = require('supertest');
var app = require('express');

describe('BookRoute', function() {
    request(app)
        .get('/api/books')
        .expect('Content-Type', /json/)
        .expect('Content-Length', '4')
        .expect(200, "ok")
        .end(function(err, res){
           if (err) throw err;
        });

        it('should lolol', function() {
          let test = 123;
          expect(test).to.be.equal(123);
        });
});
