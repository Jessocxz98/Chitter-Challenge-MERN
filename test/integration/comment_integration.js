const expect = require('chai').expect;
const request = require('supertest');
const mongoose = require('mongoose');
const { SignupUser, PostPeep } = require('../test_helpers')

const mongooseConnect = require('../../database/dbConnect');

describe('comment routes', () => {

  before((done) => {
    mongooseConnect.dbConnect();
    done()
  })

  beforeEach((done) => {
    mongoose.connect(mongooseConnect.uri, () => {
      mongoose.connection.db.collection('comments').deleteMany(() => {
        done();
      });
    });
  })

  after((done) => {
    mongooseConnect.dbClose();
    done();
  })

  it('is expected to create a new comment', async () => {
    const user = await SignupUser();
    const peep = await PostPeep(user.id)
    let dataToSend = { text: 'Hello to you too', userId: peep.userId, peepId: peep._id }

    try {
      const res = await request('http://localhost:5000/api/comments').post('/').send(dataToSend);
      expect(res.body.text).to.equal('Hello to you too');
      expect(res.body.username).to.equal('user3')
    }
    catch (err) {
      console.log(err.message)
    }
  })
})