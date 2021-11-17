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

  it('valid signup', async () => {
    let dataToSend = { username: 'user1', password: '01234567890123', email: 'fake@email.com' };
    
    try {
      const res = await request('http://localhost:5000/users').post('/signup').send(dataToSend);
      expect(res.statusCode).to.equal(201);
      expect(res.body.user).to.exist
      expect(res.body.message).to.equal('signup successful!')
    } catch (err) {
      console.log(err);
    }
  })

  it('user is authenticated', async () => {
    let dataToSend = { username: 'user1', password: '01234567890123', email: 'fake@email.com' };
    let loginData = { email: dataToSend.email, password: dataToSend.password }
    await request('http://localhost:5000/users').post('/signup').send(dataToSend);

    try {
      const res = await request('http://localhost:5000/users').post('/login').send(loginData);
      expect(res.status).to.equal(200)
      expect(res.body.message).to.equal('Login successful!')
    } catch (err) {
      console.log(err)
    }
  })

  it("is expected to throw error if email is wrong", async () => {
    let dataToSend = { username: 'user1', password: '01234567890123', email: 'fake@email.com' };
    let loginData = { email: 'wrong@email.com', password: dataToSend.password }
    await request('http://localhost:5000/users').post('/signup').send(dataToSend);

    try {
      const res = await request('http://localhost:5000/users').post('/login').send(loginData);
      expect(res.status).to.equal(401)
      expect(res.body.message).to.equal('incorrect email or password')
    } catch (err) {
      console.log(err)
    }
  })

  it("is expected to throw error if password is wrong", async () => {
    let dataToSend = { username: 'user1', password: '01234567890123', email: 'fake@email.com' };
    let loginData = { email: dataToSend.email, password: 'wrongpassword1234' }
    await request('http://localhost:5000/users').post('/signup').send(dataToSend);

    try {
      const res = await request('http://localhost:5000/users').post('/login').send(loginData);
      expect(res.status).to.equal(401)
      expect(res.body.message).to.equal('incorrect email or password')
    } catch (err) {
      console.log(err)
    }
  })
})