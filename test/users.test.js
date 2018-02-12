var assert = require('assert');
var request = require('supertest');
var chai = require('chai');
var expect = chai.expect;
var should = chai.should;
const app = require('../app');

describe('USERS', () => {
  it('GET all products ', (done) => {
    request(app)
      .get('/users/products?token=pippo')
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.a('array');
        done();
      });
  });
  it('GET single product ', (done) => {
    request(app)
      .get('/users/products/2?token=pippo')
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.id).to.be.a('number');
        expect(res.body.name).to.be.a('string');
        expect(res.body.amount).to.be.a('number');
        expect(res.body.price).to.be.a('number');
        done();
      });
  });
  it('GET single product with a not found product', (done) => {
    request(app)
      .get('/users/products/10?token=pippo')
      .set('Accept', 'application/json')
      .expect(404)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  it('GET single product with a string id ', (done) => {
    request(app)
      .get('/users/products/ciao?token=pippo')
      .set('Accept', 'application/json')
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  it('POST buy a product ', (done) => {
    request(app)
      .post('/users/buy?token=sempronio')
      .set('Accept', 'application/json')
      .send({'id': 2})
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});

