var assert = require('assert');
var request = require('supertest');
var chai = require('chai');
var expect = chai.expect;
var should = chai.should;
const app = require('../app');

describe('ADMIN', () => {
  it('GET all products', (done) => {
    request(app)
      .get('/admin/products/?token=admin')
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.a('array');
        done();
      });
  });
  it('GET single product', (done) => {
    request(app)
      .get('/admin/products/2/?token=admin')
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
      .get('/admin/products/10/?token=admin')
      .set('Accept', 'application/json')
      .expect(404)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  it('GET single product with a string id', (done) => {
    request(app)
      .get('/admin/products/ciao/?token=admin')
      .set('Accept', 'application/json')
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  it('DELETE single product', (done) => {
    request(app)
      .delete('/admin/products/1/?token=admin')
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  it('POST add new product', (done) => {
    request(app)
      .post('/admin/products/?token=admin')
      .set('Accept', 'application/json')
      .send({
        name: 'Nintendo',
        price: 250.90,
        amount: 10
      })
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});
