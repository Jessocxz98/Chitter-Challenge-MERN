const expect = require('chai').expect;
const request = require('supertest');
const mongoose = require('mongoose');

require('dotenv').config({ path: '../../../../.env' })

const mongooseConnect = require('../../database/dbConnect');

describe('peep routes', () => {

  before((done) => {
    mongooseConnect.dbConnect();
    done();
  })

  beforeEach((done) => {
    mongoose.connect(mongooseConnect.uri, () => {
      mongoose.connection.db.collection('peeps').deleteMany(() => {
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
      .get('/peeps')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  })

  it('valid data POST request', async () => {
    let dataToSend = { text: 'hello', userId: 'user_1' };
    
    try {
      const res = await request('http://localhost:5000/peeps').post('/new').send(dataToSend);
      expect(res.statusCode).to.equal(201);
      expect(res.body).to.contain(dataToSend);
    } catch (err) {
      console.log(err.message);
    }
  })
})