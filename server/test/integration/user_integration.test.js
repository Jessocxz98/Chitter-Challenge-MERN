const expect = require('chai').expect;
const request = require('supertest');
const mongoose = require('mongoose');

require('dotenv').config({ path: '../../../../.env' })

const mongooseConnect = require('../../database/dbConnect');

describe('user model', () => {
  before((done) => {
    mongooseConnect.dbConnect();
    done();
  })

  beforeEach((done) => {
    mongoose.connect(mongooseConnect.uri, () => {
      mongoose.connection.db.collection('users').deleteMany(() => {
        done();
      });
    });
  })

  after((done) => {
    mongooseConnect.dbClose();
    done();
  })

  it('responds with json', (done) => {
    request('http://localhost:5000')
      .get('/users')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  })
})