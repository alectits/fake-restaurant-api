var assert = require('assert');
var request = require('supertest');
var chai = require('chai');
var expect = chai.expect;
var should = chai.should;
const app = require('../app');

describe('ADMIN', () => {
  it('should GET all the orders', (done) => {
    request(app)
      .get('/admin/orders/?token=admin')
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.a('array');
        done();
      });
  });
  it('should GET single order', (done) => {
    request(app)
      .get('/admin/orders/2/?token=admin')
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.id).to.be.a('number');
        expect(res.body.client).to.be.a('string');
        expect(res.body.items).to.be.a('array');
        expect(res.body.price).to.be.a('number');
        done();
      });
  });
  it('shoiuld GET single order with a not found product', (done) => {
    request(app)
      .get('/admin/orders/18/?token=admin')
      .set('Accept', 'application/json')
      .expect(404)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  it('should GET single orders with a string id', (done) => {
    request(app)
      .get('/admin/orders/ciao/?token=admin')
      .set('Accept', 'application/json')
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  it('should DELETE single order', (done) => {
    request(app)
      .delete('/admin/orders/1/?token=admin')
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

});
