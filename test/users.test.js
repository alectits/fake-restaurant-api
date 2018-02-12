var assert = require('assert');
var request = require('supertest');
var chai = require('chai');
var expect = chai.expect;
var should = chai.should;
const app = require('../app');

describe('USERS', () => {

  it('should GET all his products', (done) => {
    request(app)
      .get('/users/orders?token=pippo')
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.a('array');
        done();
      });
  });

  it('should add a new order', (done) => {
    request(app)
      .post('/users/?token=sempronio')
      .set('Accept', 'application/json')
      .send({
        'price': 250,
        'items': [
          'pane',
          'pasta'
        ]
      })
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});
