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

  it('valid data POST request', async () => {
    let dataToSend = { username: 'user1', password: '01234567890123', email: 'fake@email.com' };
    
    try {
      const res = await request('http://localhost:5000/users').post('/new').send(dataToSend);
      expect(res.statusCode).to.equal(201);
      expect(res.body.username).to.equal('user1')
      expect(res.body.password).not.to.equal('01234567890123')
      expect(res.body.password).to.have.lengthOf(60)
      expect(res.body.email).to.equal('fake@email.com')
    } catch (err) {
      console.log(err);
    }
  })
})