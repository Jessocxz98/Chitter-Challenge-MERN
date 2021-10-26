const expect = require('chai').expect;
const request = require('supertest');
require('dotenv').config({ path: '../../../../.env' })

const mongooseConnect = require('../../database/dbConnect');
const Peep = require('../../database/models/peep_schema')


describe('POST: /new route to insert data', () => {

  before((done) => {
    mongooseConnect.dbConnect();
    done();
  })

  after((done) => {
    mongooseConnect.dbClose();
    done();
  })

  it('valid data', async () => {
    let toSendData = new Peep({ text: 'hello', userId: 'user1' });
    
    try {
      const res = await request('http://localhost:5000/peeps').post('/new').send(toSendData);
      console.log('res: ', res.body);
      expect(res.statusCode).to.equal(201);
      expect(res.body.text).to.equal('hello');
    } catch (err) {
      console.log(err.message);
    }
  })

})