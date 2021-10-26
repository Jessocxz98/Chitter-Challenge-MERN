const expect = require('chai').expect;
const request = require('supertest');
const mongoose = require('mongoose');

const mongooseConnect = require('../../database/dbConnect');
const Peep = require('../../models/peep_model')
require('dotenv').config({ path: '../../../../.env' })

describe('POST: /new route to insert data', () => {
  before((done) => {
    mongooseConnect.dbConnect()
      .once('open', () => done())
      .on('error', (error) => {
          done(error);
      });
  })

  beforeEach((done) => {
    mongoose.connection.db.listCollections({name: 'peeps'})
      .next((error, collection) => {
        if (collection) {
          mongoose.connection.db.dropCollection('peeps')
            .then(() => done())
            .catch((err) => done(err));
        } else {
          done(error);
        }
      })
  })

  after(() => {
    mongooseConnect.dbClose();
  })

  it('valid data', async () => {
    let toSendData = Peep({ text: 'Test 1', userId: 'User1' });
    
    try {
      const res = await request('http://localhost:5000/peeps').post('/new').send(toSendData);
      console.log('res: ', res);
      expect(res.statusCode).to.equal(201);
      expect(res.body).to.include(toSendData);
    } catch (err) {
      console.log(err.message);
    }
  })

})