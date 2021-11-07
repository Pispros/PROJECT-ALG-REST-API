/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newCategorie;

describe('Categorie API:', function() {
  describe('GET /api/categories', function() {
    var categories;

    beforeEach(function(done) {
      request(app)
        .get('/api/categories')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          categories = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(categories).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/categories', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/categories')
        .send({
          name: 'New Categorie',
          info: 'This is the brand new categorie!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newCategorie = res.body;
          done();
        });
    });

    it('should respond with the newly created categorie', function() {
      expect(newCategorie.name).to.equal('New Categorie');
      expect(newCategorie.info).to.equal('This is the brand new categorie!!!');
    });
  });

  describe('GET /api/categories/:id', function() {
    var categorie;

    beforeEach(function(done) {
      request(app)
        .get(`/api/categories/${newCategorie._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          categorie = res.body;
          done();
        });
    });

    afterEach(function() {
      categorie = {};
    });

    it('should respond with the requested categorie', function() {
      expect(categorie.name).to.equal('New Categorie');
      expect(categorie.info).to.equal('This is the brand new categorie!!!');
    });
  });

  describe('PUT /api/categories/:id', function() {
    var updatedCategorie;

    beforeEach(function(done) {
      request(app)
        .put(`/api/categories/${newCategorie._id}`)
        .send({
          name: 'Updated Categorie',
          info: 'This is the updated categorie!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedCategorie = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedCategorie = {};
    });

    it('should respond with the updated categorie', function() {
      expect(updatedCategorie.name).to.equal('Updated Categorie');
      expect(updatedCategorie.info).to.equal('This is the updated categorie!!!');
    });

    it('should respond with the updated categorie on a subsequent GET', function(done) {
      request(app)
        .get(`/api/categories/${newCategorie._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let categorie = res.body;

          expect(categorie.name).to.equal('Updated Categorie');
          expect(categorie.info).to.equal('This is the updated categorie!!!');

          done();
        });
    });
  });

  describe('PATCH /api/categories/:id', function() {
    var patchedCategorie;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/categories/${newCategorie._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Categorie' },
          { op: 'replace', path: '/info', value: 'This is the patched categorie!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedCategorie = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedCategorie = {};
    });

    it('should respond with the patched categorie', function() {
      expect(patchedCategorie.name).to.equal('Patched Categorie');
      expect(patchedCategorie.info).to.equal('This is the patched categorie!!!');
    });
  });

  describe('DELETE /api/categories/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/categories/${newCategorie._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when categorie does not exist', function(done) {
      request(app)
        .delete(`/api/categories/${newCategorie._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
