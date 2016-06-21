'use strict';

var app = require('../..');
import request from 'supertest';

var newVrf;

describe('VRF API:', function() {

  describe('GET /api/vrf', function() {
    var vrfs;

    beforeEach(function(done) {
      request(app)
        .get('/api/vrf')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          vrfs = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(vrfs).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/vrf', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/vrf')
        .send({
          name: 'New VRF',
          info: 'This is the brand new VRF!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newVrf = res.body;
          done();
        });
    });

    it('should respond with the newly created VRF', function() {
      expect(newVrf.name).to.equal('New VRF');
      expect(newVrf.info).to.equal('This is the brand new VRF!!!');
    });

  });

  describe('GET /api/vrf/:id', function() {
    var vrf;

    beforeEach(function(done) {
      request(app)
        .get('/api/vrf/' + newVrf._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          vrf = res.body;
          done();
        });
    });

    afterEach(function() {
      vrf = {};
    });

    it('should respond with the requested VRF', function() {
      expect(vrf.name).to.equal('New VRF');
      expect(vrf.info).to.equal('This is the brand new VRF!!!');
    });

  });

  describe('PUT /api/vrf/:id', function() {
    var updatedVrf;

    beforeEach(function(done) {
      request(app)
        .put('/api/vrf/' + newVrf._id)
        .send({
          name: 'Updated VRF',
          info: 'This is the updated VRF!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedVrf = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedVrf = {};
    });

    it('should respond with the updated VRF', function() {
      expect(updatedVrf.name).to.equal('Updated VRF');
      expect(updatedVrf.info).to.equal('This is the updated VRF!!!');
    });

  });

  describe('DELETE /api/vrf/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/vrf/' + newVrf._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when VRF does not exist', function(done) {
      request(app)
        .delete('/api/vrf/' + newVrf._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
